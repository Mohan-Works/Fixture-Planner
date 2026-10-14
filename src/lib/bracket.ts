import { nanoid } from 'nanoid';
import { Fixture, Match, Player, ResultType, Round, ThirdPlaceMode } from '../types';

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 0..n-1 reordered so consecutive picks are far apart (spreads byes)
export function spreadOrder(n: number): number[] {
  if (n <= 1) return [0];
  let order = [0];
  while (order.length < n) {
    const len = order.length * 2;
    order = order.flatMap((x) => [x, len - 1 - x]);
  }
  return order.slice(0, n);
}

export function getRoundName(roundsLeft: number): string {
  switch (roundsLeft) {
    case 0:
      return 'Final';
    case 1:
      return 'Semi-finals';
    case 2:
      return 'Quarter-finals';
    default:
      return `Round of ${2 ** (roundsLeft + 1)}`;
  }
}

export function generateFixture(
  players: Player[],
  thirdPlaceMode: ThirdPlaceMode = 'none'
): Fixture {
  if (players.length < 2) {
    throw new Error('Need at least 2 players to generate a fixture');
  }

  const size = 2 ** Math.ceil(Math.log2(players.length));
  const byes = size - players.length;
  const totalRounds = Math.log2(size);
  const queue = shuffle(players);
  const pairs = size / 2;
  const byePairs = new Set(spreadOrder(pairs).slice(0, byes));

  const rounds: Round[] = Array.from({ length: totalRounds }, (_, r) => ({
    index: r,
    name: getRoundName(totalRounds - 1 - r),
    matches: Array.from({ length: size / 2 ** (r + 1) }, (_, i) => ({
      id: nanoid(),
      round: r,
      index: i,
      p1: { playerId: null },
      p2: { playerId: null },
      status: 'pending' as const,
    })),
  }));

  // Populate round 0
  rounds[0].matches.forEach((m, i) => {
    m.p1 = { playerId: queue.shift()!.id };
    if (byePairs.has(i)) {
      m.p2 = { playerId: null, isBye: true };
      m.status = 'bye';
    } else {
      m.p2 = { playerId: queue.shift()!.id };
      m.status = 'ready';
    }
  });

  const fixture: Fixture = {
    generatedAt: Date.now(),
    locked: false,
    size,
    rounds,
  };

  // Add third place structure if semi-finals exist
  if (totalRounds >= 2) {
    if (thirdPlaceMode === 'bronze-match') {
      fixture.thirdPlace = {
        id: nanoid(),
        round: -1,
        index: 0,
        p1: { playerId: null },
        p2: { playerId: null },
        status: 'pending',
        isThirdPlace: true,
      };
    } else if (thirdPlaceMode === 'two-bronze') {
      fixture.twoBronze = {
        loser1Id: null,
        loser2Id: null,
      };
    }
  }

  // Advance bye players automatically to round 1 (if multiple rounds exist)
  rounds[0].matches
    .filter((m) => m.status === 'bye')
    .forEach((m) => {
      setWinner(fixture, m, m.p1.playerId!);
    });

  return fixture;
}

/**
 * Checks if changing or resetting a match result will affect downstream played matches.
 */
export function hasDownstreamResults(f: Fixture, match: Match): boolean {
  if (match.isThirdPlace) return false;
  let currentRound = match.round;
  let currentIndex = match.index;

  while (currentRound + 1 < f.rounds.length) {
    const nextRound = f.rounds[currentRound + 1];
    const nextIndex = Math.floor(currentIndex / 2);
    const nextMatch = nextRound.matches[nextIndex];

    if (!nextMatch) break;
    if (nextMatch.status === 'done' || nextMatch.winnerId || nextMatch.score1 !== undefined) {
      return true;
    }
    currentRound++;
    currentIndex = nextIndex;
  }

  // Also check if this match was a semi-final and third-place match has been played
  const isSemiFinal = match.round === f.rounds.length - 2;
  if (isSemiFinal && f.thirdPlace) {
    if (f.thirdPlace.status === 'done' || f.thirdPlace.winnerId || f.thirdPlace.score1 !== undefined) {
      return true;
    }
  }

  return false;
}

/**
 * Clears downstream slots and match outcomes that depended on a feeder match.
 */
export function clearDownstream(f: Fixture, roundIndex: number, matchIndex: number): void {
  let currRound = roundIndex;
  let currIdx = matchIndex;

  // Clear third place if semi-final
  if (currRound === f.rounds.length - 2) {
    if (f.thirdPlace) {
      const slot = currIdx === 0 ? 'p1' : 'p2';
      f.thirdPlace[slot] = { playerId: null };
      f.thirdPlace.winnerId = undefined;
      f.thirdPlace.score1 = undefined;
      f.thirdPlace.score2 = undefined;
      f.thirdPlace.resultType = undefined;
      f.thirdPlace.status = 'pending';
    }
    if (f.twoBronze) {
      if (currIdx === 0) f.twoBronze.loser1Id = null;
      if (currIdx === 1) f.twoBronze.loser2Id = null;
    }
  }

  while (currRound + 1 < f.rounds.length) {
    const nextRound = f.rounds[currRound + 1];
    const nextIdx = Math.floor(currIdx / 2);
    const nextMatch = nextRound.matches[nextIdx];
    if (!nextMatch) break;

    const slot = currIdx % 2 === 0 ? 'p1' : 'p2';
    nextMatch[slot] = { playerId: null };
    nextMatch.winnerId = undefined;
    nextMatch.score1 = undefined;
    nextMatch.score2 = undefined;
    nextMatch.resultType = undefined;
    nextMatch.status = 'pending';

    currRound++;
    currIdx = nextIdx;
  }
}

/**
 * Sets the winner of a match, propagates to the next round (and bronze if semi-final),
 * and resets dependent downstream matches if the winner changed.
 */
export function setWinner(
  f: Fixture,
  m: Match,
  winnerId: string,
  score1?: number,
  score2?: number,
  resultType?: ResultType
): void {
  const previousWinner = m.winnerId;

  m.winnerId = winnerId;
  m.score1 = score1;
  m.score2 = score2;
  m.resultType = resultType;
  if (m.status !== 'bye') {
    m.status = 'done';
  }

  // If winner changed, clear downstream results first
  if (previousWinner && previousWinner !== winnerId) {
    clearDownstream(f, m.round, m.index);
  }

  // Propagate to next round in main bracket
  const nextRound = f.rounds[m.round + 1];
  if (nextRound) {
    const nextMatch = nextRound.matches[Math.floor(m.index / 2)];
    if (nextMatch) {
      const slot = m.index % 2 === 0 ? 'p1' : 'p2';
      nextMatch[slot] = { playerId: winnerId };
      if (nextMatch.p1.playerId && nextMatch.p2.playerId) {
        nextMatch.status = 'ready';
      }
    }
  }

  // Handle third place / two bronze if this is the semi-final
  const isSemiFinal = m.round === f.rounds.length - 2;
  if (isSemiFinal) {
    const loserId = m.p1.playerId === winnerId ? m.p2.playerId : m.p1.playerId;

    if (f.thirdPlace) {
      const slot = m.index === 0 ? 'p1' : 'p2';
      f.thirdPlace[slot] = { playerId: loserId };
      if (f.thirdPlace.p1.playerId && f.thirdPlace.p2.playerId) {
        f.thirdPlace.status = 'ready';
      }
    }

    if (f.twoBronze) {
      if (m.index === 0) f.twoBronze.loser1Id = loserId;
      if (m.index === 1) f.twoBronze.loser2Id = loserId;
    }
  }
}

export function setThirdPlaceWinner(
  f: Fixture,
  winnerId: string,
  score1?: number,
  score2?: number,
  resultType?: ResultType
): void {
  if (!f.thirdPlace) return;
  f.thirdPlace.winnerId = winnerId;
  f.thirdPlace.score1 = score1;
  f.thirdPlace.score2 = score2;
  f.thirdPlace.resultType = resultType;
  f.thirdPlace.status = 'done';
}

export function resetMatchResult(f: Fixture, matchId: string): void {
  if (f.thirdPlace && f.thirdPlace.id === matchId) {
    f.thirdPlace.winnerId = undefined;
    f.thirdPlace.score1 = undefined;
    f.thirdPlace.score2 = undefined;
    f.thirdPlace.resultType = undefined;
    f.thirdPlace.status = f.thirdPlace.p1.playerId && f.thirdPlace.p2.playerId ? 'ready' : 'pending';
    return;
  }

  for (const round of f.rounds) {
    const match = round.matches.find((m) => m.id === matchId);
    if (match) {
      clearDownstream(f, match.round, match.index);
      match.winnerId = undefined;
      match.score1 = undefined;
      match.score2 = undefined;
      match.resultType = undefined;
      match.status = match.p1.playerId && match.p2.playerId ? 'ready' : 'pending';
      return;
    }
  }
}
