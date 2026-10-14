import { describe, it, expect } from 'vitest';
import { getMatchCode, getMatchSection } from '../exportExcel';
import { Match } from '../../types';

function createSlot(playerId: string | null = null, isBye = false) {
  return { playerId, isBye };
}

describe('Match Code and Section Identification', () => {
  it('correctly assigns QF1..QF4, SF1..SF2, and F codes in a standard bracket', () => {
    // Suppose total rounds = 5 (32 players: R32, R16, QF, SF, F)
    const totalRounds = 5;

    // Finals (roundIndex 4)
    const finalMatch: Match = {
      id: 'm-f',
      round: 4,
      index: 0,
      p1: createSlot(),
      p2: createSlot(),
      status: 'pending',
    };
    expect(getMatchCode(finalMatch, 4, totalRounds, true)).toBe('F');

    // Semifinals (roundIndex 3)
    const sf1: Match = {
      id: 'm-sf1',
      round: 3,
      index: 0,
      p1: createSlot(),
      p2: createSlot(),
      status: 'pending',
    };
    const sf2: Match = {
      id: 'm-sf2',
      round: 3,
      index: 1,
      p1: createSlot(),
      p2: createSlot(),
      status: 'pending',
    };
    expect(getMatchCode(sf1, 3, totalRounds)).toBe('SF1');
    expect(getMatchCode(sf2, 3, totalRounds)).toBe('SF2');

    // Quarterfinals (roundIndex 2)
    const qf1: Match = {
      id: 'm-qf1',
      round: 2,
      index: 0,
      p1: createSlot(),
      p2: createSlot(),
      status: 'pending',
    };
    const qf2: Match = {
      id: 'm-qf2',
      round: 2,
      index: 1,
      p1: createSlot(),
      p2: createSlot(),
      status: 'pending',
    };
    const qf3: Match = {
      id: 'm-qf3',
      round: 2,
      index: 2,
      p1: createSlot(),
      p2: createSlot(),
      status: 'pending',
    };
    const qf4: Match = {
      id: 'm-qf4',
      round: 2,
      index: 3,
      p1: createSlot(),
      p2: createSlot(),
      status: 'pending',
    };
    expect(getMatchCode(qf1, 2, totalRounds)).toBe('QF1');
    expect(getMatchCode(qf2, 2, totalRounds)).toBe('QF2');
    expect(getMatchCode(qf3, 2, totalRounds)).toBe('QF3');
    expect(getMatchCode(qf4, 2, totalRounds)).toBe('QF4');

    // Round of 16 (roundIndex 1)
    const r16_1: Match = {
      id: 'm-r16-1',
      round: 1,
      index: 0,
      p1: createSlot(),
      p2: createSlot(),
      status: 'pending',
    };
    expect(getMatchCode(r16_1, 1, totalRounds)).toBe('R16-1');

    // 3rd Place Match
    const bronzeMatch: Match = {
      id: 'm-3p',
      round: 4,
      index: 0,
      p1: createSlot(),
      p2: createSlot(),
      status: 'pending',
      isThirdPlace: true,
    };
    expect(getMatchCode(bronzeMatch, 4, totalRounds)).toBe('3P');
  });

  it('correctly maps 128-player draw into 4 QF sections and Finals', () => {
    // 128 players: 7 rounds (R0 = 64 matches, R1 = 32, R2 = 16, R3 = 8, R4 = 4 QF, R5 = 2 SF, R6 = 1 F)
    const totalRounds = 7;

    const makeMatch = (round: number, index: number): Match => ({
      id: `m-${round}-${index}`,
      round,
      index,
      p1: createSlot(),
      p2: createSlot(),
      status: 'pending',
    });

    expect(getMatchSection(makeMatch(0, 0), 0, totalRounds)).toBe('QF1');
    expect(getMatchSection(makeMatch(0, 15), 0, totalRounds)).toBe('QF1');
    expect(getMatchSection(makeMatch(0, 16), 0, totalRounds)).toBe('QF2');
    expect(getMatchSection(makeMatch(0, 31), 0, totalRounds)).toBe('QF2');
    expect(getMatchSection(makeMatch(0, 32), 0, totalRounds)).toBe('QF3');
    expect(getMatchSection(makeMatch(0, 47), 0, totalRounds)).toBe('QF3');
    expect(getMatchSection(makeMatch(0, 48), 0, totalRounds)).toBe('QF4');
    expect(getMatchSection(makeMatch(0, 63), 0, totalRounds)).toBe('QF4');

    // In Round 4 (Quarterfinal round: 4 matches):
    expect(getMatchSection(makeMatch(4, 0), 4, totalRounds)).toBe('QF1');
    expect(getMatchSection(makeMatch(4, 1), 4, totalRounds)).toBe('QF2');
    expect(getMatchSection(makeMatch(4, 2), 4, totalRounds)).toBe('QF3');
    expect(getMatchSection(makeMatch(4, 3), 4, totalRounds)).toBe('QF4');

    // In Round 5 (Semifinals):
    expect(getMatchSection(makeMatch(5, 0), 5, totalRounds)).toBe('FINALS');
    expect(getMatchSection(makeMatch(5, 1), 5, totalRounds)).toBe('FINALS');

    // In Round 6 (Final):
    expect(getMatchSection(makeMatch(6, 0), 6, totalRounds)).toBe('FINALS');
  });
});
