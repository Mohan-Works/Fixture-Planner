import { describe, it, expect, vi, beforeEach } from 'vitest';
import jsPDF from 'jspdf';
import {
  truncateText,
  getSlotPlaceholder,
  exportVectorBracketPdf,
} from '../exportPdf';
import { Category, Match } from '../../types';

const saveMock = vi.fn();

vi.mock('jspdf', async () => {
  const actual = await vi.importActual<any>('jspdf');
  const ActualJsPDF = actual.default || actual.jsPDF;
  function MockJsPDF(this: any, ...args: any[]) {
    const inst = new ActualJsPDF(...args);
    inst.save = saveMock;
    return inst;
  }
  MockJsPDF.prototype = ActualJsPDF.prototype;
  return {
    default: MockJsPDF,
    jsPDF: MockJsPDF,
  };
});

describe('Vector PDF Exporter (Lines & Small Boxes)', () => {
  beforeEach(() => {
    saveMock.mockClear();
  });

  it('properly truncates long text without error', () => {
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
    const shortText = 'Mohan';
    expect(truncateText(pdf, shortText, 100)).toBe('Mohan');

    const veryLongText = 'Alexander Maximillian Konstantinovich From Capital District Wrestling Academy';
    const truncated = truncateText(pdf, veryLongText, 80);
    expect(truncated.endsWith('...')).toBe(true);
    expect(pdf.getTextWidth(truncated)).toBeLessThanOrEqual(80);
  });

  it('resolves feeder placeholders for Semifinals, Finals and 3rd Place (no generic TBD)', () => {
    const totalRounds = 4; // 16 players: R16 (0), QF (1), SF (2), F (3)

    // Final (roundIndex 3)
    const finalMatch: Match = {
      id: 'm-f',
      round: 3,
      index: 0,
      p1: { playerId: null },
      p2: { playerId: null },
      status: 'pending',
    };
    expect(getSlotPlaceholder(finalMatch, 1, 3, totalRounds, true)).toBe('Winner of SF1');
    expect(getSlotPlaceholder(finalMatch, 2, 3, totalRounds, true)).toBe('Winner of SF2');

    // SF1 (roundIndex 2, index 0)
    const sf1: Match = {
      id: 'm-sf1',
      round: 2,
      index: 0,
      p1: { playerId: null },
      p2: { playerId: null },
      status: 'pending',
    };
    expect(getSlotPlaceholder(sf1, 1, 2, totalRounds)).toBe('Winner of QF1');
    expect(getSlotPlaceholder(sf1, 2, 2, totalRounds)).toBe('Winner of QF2');

    // SF2 (roundIndex 2, index 1)
    const sf2: Match = {
      id: 'm-sf2',
      round: 2,
      index: 1,
      p1: { playerId: null },
      p2: { playerId: null },
      status: 'pending',
    };
    expect(getSlotPlaceholder(sf2, 1, 2, totalRounds)).toBe('Winner of QF3');
    expect(getSlotPlaceholder(sf2, 2, 2, totalRounds)).toBe('Winner of QF4');

    // 3rd place match
    const tp: Match = {
      id: 'm-tp',
      round: 3,
      index: 0,
      p1: { playerId: null },
      p2: { playerId: null },
      status: 'pending',
      isThirdPlace: true,
    };
    expect(getSlotPlaceholder(tp, 1, 3, totalRounds)).toBe('Runner-up of SF1');
    expect(getSlotPlaceholder(tp, 2, 3, totalRounds)).toBe('Runner-up of SF2');
  });

  it('exports single-page A4 PDF for 8-player bracket without error', async () => {
    const mockCategory: Category = {
      id: 'cat-8',
      name: 'Under 19 Men - 65kg',
      ageGroup: 'Under 19',
      weightMin: 60,
      weightMax: 65,
      gender: 'Men / Boys',
      thirdPlaceMode: 'bronze-match',
      createdAt: Date.now(),
      players: [
        { id: 'p1', name: 'Player 1', club: 'Delhi' },
        { id: 'p2', name: 'Player 2', club: 'Haryana' },
        { id: 'p3', name: 'Player 3', club: 'Punjab' },
        { id: 'p4', name: 'Player 4', club: 'Maharashtra' },
        { id: 'p5', name: 'Player 5', club: 'Karnataka' },
        { id: 'p6', name: 'Player 6', club: 'Tamil Nadu' },
        { id: 'p7', name: 'Player 7', club: 'Gujarat' },
        { id: 'p8', name: 'Player 8', club: 'Kerala' },
      ],
      fixture: {
        generatedAt: Date.now(),
        locked: false,
        size: 8,
        rounds: [
          {
            index: 0,
            name: 'Quarterfinals',
            matches: [
              { id: 'qf1', round: 0, index: 0, p1: { playerId: 'p1' }, p2: { playerId: 'p2' }, status: 'ready' },
              { id: 'qf2', round: 0, index: 1, p1: { playerId: 'p3' }, p2: { playerId: 'p4' }, status: 'ready' },
              { id: 'qf3', round: 0, index: 2, p1: { playerId: 'p5' }, p2: { playerId: 'p6' }, status: 'ready' },
              { id: 'qf4', round: 0, index: 3, p1: { playerId: 'p7' }, p2: { playerId: 'p8' }, status: 'ready' },
            ],
          },
          {
            index: 1,
            name: 'Semifinals',
            matches: [
              { id: 'sf1', round: 1, index: 0, p1: { playerId: null }, p2: { playerId: null }, status: 'pending' },
              { id: 'sf2', round: 1, index: 1, p1: { playerId: null }, p2: { playerId: null }, status: 'pending' },
            ],
          },
          {
            index: 2,
            name: 'Final',
            matches: [
              { id: 'f', round: 2, index: 0, p1: { playerId: null }, p2: { playerId: null }, status: 'pending' },
            ],
          },
        ],
        thirdPlace: {
          id: 'tp',
          round: 2,
          index: 0,
          p1: { playerId: null },
          p2: { playerId: null },
          status: 'pending',
          isThirdPlace: true,
        },
      },
    };

    await exportVectorBracketPdf(mockCategory, {
      name: 'National Championship 2026',
      date: '2026-10-14',
      venue: 'Indira Gandhi Arena',
    });

    expect(saveMock).toHaveBeenCalledTimes(1);
    expect(saveMock.mock.calls[0][0]).toContain('Under_19_Men_-_65kg');
    expect(saveMock.mock.calls[0][0]).toContain('_A4.pdf');
  });

  it('exports section-specific A4 PDF for QF1 section', async () => {
    const mockCategory: Category = {
      id: 'cat-16',
      name: 'Under 17 Women - 53kg',
      ageGroup: 'Under 17',
      weightMin: 50,
      weightMax: 53,
      gender: 'Women / Girls',
      thirdPlaceMode: 'bronze-match',
      createdAt: Date.now(),
      players: Array.from({ length: 16 }, (_, i) => ({
        id: `p${i + 1}`,
        name: `Player ${i + 1}`,
        club: `State ${i + 1}`,
      })),
      fixture: {
        generatedAt: Date.now(),
        locked: false,
        size: 16,
        rounds: [
          {
            index: 0,
            name: 'Round of 16',
            matches: Array.from({ length: 8 }, (_, i) => ({
              id: `r16-${i}`,
              round: 0,
              index: i,
              p1: { playerId: `p${i * 2 + 1}` },
              p2: { playerId: `p${i * 2 + 2}` },
              status: 'ready',
            })),
          },
          {
            index: 1,
            name: 'Quarterfinals',
            matches: Array.from({ length: 4 }, (_, i) => ({
              id: `qf-${i}`,
              round: 1,
              index: i,
              p1: { playerId: null },
              p2: { playerId: null },
              status: 'pending',
            })),
          },
          {
            index: 2,
            name: 'Semifinals',
            matches: [
              { id: 'sf-0', round: 2, index: 0, p1: { playerId: null }, p2: { playerId: null }, status: 'pending' },
              { id: 'sf-1', round: 2, index: 1, p1: { playerId: null }, p2: { playerId: null }, status: 'pending' },
            ],
          },
          {
            index: 3,
            name: 'Final',
            matches: [
              { id: 'f-0', round: 3, index: 0, p1: { playerId: null }, p2: { playerId: null }, status: 'pending' },
            ],
          },
        ],
      },
    };

    await exportVectorBracketPdf(
      mockCategory,
      { name: 'National TournaX', date: '2026-10-14', venue: 'Stadium' },
      { section: 'QF1', sectionLabel: 'Section 1 (➔ QF1)' }
    );

    expect(saveMock).toHaveBeenCalledTimes(1);
    expect(saveMock.mock.calls[0][0]).toContain('Section_1');
  });

  it('exports multi-page A4 PDF booklet for 32-player complete bracket', async () => {
    const mockCategory: Category = {
      id: 'cat-32',
      name: 'Open Men - 74kg',
      ageGroup: 'Open',
      weightMin: 70,
      weightMax: 74,
      gender: 'Men / Boys',
      thirdPlaceMode: 'bronze-match',
      createdAt: Date.now(),
      players: Array.from({ length: 32 }, (_, i) => ({
        id: `p${i + 1}`,
        name: `Athlete ${i + 1}`,
        club: `Club ${i + 1}`,
      })),
      fixture: {
        generatedAt: Date.now(),
        locked: false,
        size: 32,
        rounds: [
          {
            index: 0,
            name: 'Round of 32',
            matches: Array.from({ length: 16 }, (_, i) => ({
              id: `r32-${i}`,
              round: 0,
              index: i,
              p1: { playerId: `p${i * 2 + 1}` },
              p2: { playerId: `p${i * 2 + 2}` },
              status: 'ready',
            })),
          },
          {
            index: 1,
            name: 'Round of 16',
            matches: Array.from({ length: 8 }, (_, i) => ({
              id: `r16-${i}`,
              round: 1,
              index: i,
              p1: { playerId: null },
              p2: { playerId: null },
              status: 'pending',
            })),
          },
          {
            index: 2,
            name: 'Quarterfinals',
            matches: Array.from({ length: 4 }, (_, i) => ({
              id: `qf-${i}`,
              round: 2,
              index: i,
              p1: { playerId: null },
              p2: { playerId: null },
              status: 'pending',
            })),
          },
          {
            index: 3,
            name: 'Semifinals',
            matches: [
              { id: 'sf-0', round: 3, index: 0, p1: { playerId: null }, p2: { playerId: null }, status: 'pending' },
              { id: 'sf-1', round: 3, index: 1, p1: { playerId: null }, p2: { playerId: null }, status: 'pending' },
            ],
          },
          {
            index: 4,
            name: 'Final',
            matches: [
              { id: 'f-0', round: 4, index: 0, p1: { playerId: null }, p2: { playerId: null }, status: 'pending' },
            ],
          },
        ],
      },
    };

    await exportVectorBracketPdf(mockCategory, {
      name: 'Grand Championship',
      date: '2026-10-14',
      venue: 'Main Sports Complex',
    });

    expect(saveMock).toHaveBeenCalledTimes(1);
    expect(saveMock.mock.calls[0][0]).toContain('Open_Men_-_74kg');
  });
});
