import { describe, it, expect } from 'vitest';
import { generateFixture, setWinner, resetMatchResult, hasDownstreamResults } from '../bracket';
import { Player } from '../../types';

function createMockPlayers(count: number): Player[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `p-${i + 1}`,
    name: `Player ${i + 1}`,
    club: `Club ${(i % 4) + 1}`,
    weight: 60 + (i % 10),
  }));
}

describe('Bracket Generation Algorithm', () => {
  it('throws error if players < 2', () => {
    expect(() => generateFixture(createMockPlayers(0))).toThrow();
    expect(() => generateFixture(createMockPlayers(1))).toThrow();
  });

  const testCounts = [2, 3, 5, 8, 11, 16, 17, 33, 64];
  testCounts.forEach((count) => {
    it(`correctly calculates size and byes for n = ${count}`, () => {
      const players = createMockPlayers(count);
      const fixture = generateFixture(players);
      const expectedSize = 2 ** Math.ceil(Math.log2(count));
      const expectedByes = expectedSize - count;

      expect(fixture.size).toBe(expectedSize);

      const round0 = fixture.rounds[0];
      const byeMatches = round0.matches.filter((m) => m.status === 'bye');
      expect(byeMatches.length).toBe(expectedByes);
    });
  });

  it('ensures no match contains two byes', () => {
    [3, 5, 7, 11, 13, 21, 45].forEach((count) => {
      const players = createMockPlayers(count);
      const fixture = generateFixture(players);
      fixture.rounds[0].matches.forEach((m) => {
        const byesInMatch = (m.p1.isBye ? 1 : 0) + (m.p2.isBye ? 1 : 0);
        expect(byesInMatch).toBeLessThanOrEqual(1);
      });
    });
  });

  it('ensures every player appears exactly once in round 1', () => {
    const players = createMockPlayers(11);
    const fixture = generateFixture(players);
    const round0 = fixture.rounds[0];

    const playerIds = new Set<string>();
    round0.matches.forEach((m) => {
      if (m.p1.playerId) playerIds.add(m.p1.playerId);
      if (m.p2.playerId) playerIds.add(m.p2.playerId);
    });

    expect(playerIds.size).toBe(11);
    players.forEach((p) => {
      expect(playerIds.has(p.id)).toBe(true);
    });
  });

  it('ensures bye players are automatically present in round 2 right after generation', () => {
    const players = createMockPlayers(11); // size 16, 5 byes
    const fixture = generateFixture(players);

    const round0 = fixture.rounds[0];
    const round1 = fixture.rounds[1];

    const byeMatches = round0.matches.filter((m) => m.p2.isBye);
    expect(byeMatches.length).toBe(5);

    byeMatches.forEach((m) => {
      const feederWinnerId = m.p1.playerId;
      const nextMatch = round1.matches[Math.floor(m.index / 2)];
      const slot = m.index % 2 === 0 ? nextMatch.p1 : nextMatch.p2;
      expect(slot.playerId).toBe(feederWinnerId);
    });
  });

  it('produces different shuffles on multiple calls', () => {
    const players = createMockPlayers(16);
    const order1 = generateFixture(players).rounds[0].matches.map((m) => m.p1.playerId).join(',');
    let different = false;
    for (let i = 0; i < 5; i++) {
      const order2 = generateFixture(players).rounds[0].matches.map((m) => m.p1.playerId).join(',');
      if (order1 !== order2) {
        different = true;
        break;
      }
    }
    expect(different).toBe(true);
  });

  it('advances winners correctly and clears downstream matches when winner changes', () => {
    const players = createMockPlayers(4); // 2 rounds: Semi-finals, Final
    const fixture = generateFixture(players);

    const match0 = fixture.rounds[0].matches[0];
    const match1 = fixture.rounds[0].matches[1];
    const finalMatch = fixture.rounds[1].matches[0];

    // Win match 0 with p1
    const p1Id = match0.p1.playerId!;
    const p2Id = match0.p2.playerId!;
    setWinner(fixture, match0, p1Id, 10, 2, 'tech');

    expect(match0.winnerId).toBe(p1Id);
    expect(finalMatch.p1.playerId).toBe(p1Id);
    expect(finalMatch.status).toBe('pending');

    // Win match 1 with p1
    const m1WinnerId = match1.p1.playerId!;
    setWinner(fixture, match1, m1WinnerId, 4, 0, 'fall');
    expect(finalMatch.p2.playerId).toBe(m1WinnerId);
    expect(finalMatch.status).toBe('ready');

    // Now play the final match!
    setWinner(fixture, finalMatch, p1Id, 8, 4, 'points');
    expect(finalMatch.winnerId).toBe(p1Id);
    expect(finalMatch.status).toBe('done');

    // Check downstream detection
    expect(hasDownstreamResults(fixture, match0)).toBe(true);

    // Now change winner of match 0 to p2Id
    setWinner(fixture, match0, p2Id, 5, 8, 'points');

    // Downstream final should be cleared and reset with new participant
    expect(finalMatch.p1.playerId).toBe(p2Id);
    expect(finalMatch.winnerId).toBeUndefined();
    expect(finalMatch.score1).toBeUndefined();
    expect(finalMatch.score2).toBeUndefined();
    expect(finalMatch.status).toBe('ready');
  });

  it('handles third place bronze match advancement', () => {
    const players = createMockPlayers(4);
    const fixture = generateFixture(players, 'bronze-match');

    expect(fixture.thirdPlace).toBeDefined();

    const m0 = fixture.rounds[0].matches[0];
    const m1 = fixture.rounds[0].matches[1];

    setWinner(fixture, m0, m0.p1.playerId!, 5, 0);
    expect(fixture.thirdPlace!.p1.playerId).toBe(m0.p2.playerId);

    setWinner(fixture, m1, m1.p2.playerId!, 3, 6);
    expect(fixture.thirdPlace!.p2.playerId).toBe(m1.p1.playerId);
    expect(fixture.thirdPlace!.status).toBe('ready');
  });
});
