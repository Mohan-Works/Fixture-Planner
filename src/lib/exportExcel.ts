import * as XLSX from 'xlsx';
import { Category, Match, Player, TournamentInfo } from '../types';

export interface MatchExportRow {
  'Match Code': string;
  'Stage / Round': string;
  'Match #': number;
  'Player 1': string;
  'Club / State 1': string;
  'Score 1': string | number;
  'Score 2': string | number;
  'Player 2': string;
  'Club / State 2': string;
  'Winner': string;
  'Decision / Method': string;
  'Status': string;
}

/**
 * Returns standard tournament stage code (e.g. QF1, SF1, F, R16-1, etc.)
 */
export function getMatchCode(
  match: Match,
  roundIndex: number,
  totalRounds: number,
  isFinal?: boolean
): string {
  if (match.isThirdPlace) return '3P';

  const roundsFromEnd = totalRounds - 1 - roundIndex;
  if (isFinal || roundsFromEnd === 0) return 'F';
  if (roundsFromEnd === 1) return `SF${match.index + 1}`;
  if (roundsFromEnd === 2) return `QF${match.index + 1}`;
  if (roundsFromEnd === 3) return `R16-${match.index + 1}`;
  if (roundsFromEnd === 4) return `R32-${match.index + 1}`;
  if (roundsFromEnd === 5) return `R64-${match.index + 1}`;
  if (roundsFromEnd === 6) return `R128-${match.index + 1}`;

  return `R${roundIndex + 1}-${match.index + 1}`;
}

/**
 * Determines which section/quadrant of the bracket a match belongs to.
 * Returns 'QF1' | 'QF2' | 'QF3' | 'QF4' | 'FINALS'
 */
export function getMatchSection(
  match: Match,
  roundIndex: number,
  totalRounds: number
): 'QF1' | 'QF2' | 'QF3' | 'QF4' | 'FINALS' {
  if (match.isThirdPlace || roundIndex >= totalRounds - 2) {
    return 'FINALS';
  }

  const qfRoundIndex = totalRounds - 3;
  if (qfRoundIndex < 0) {
    return 'FINALS';
  }

  const stepDiff = qfRoundIndex - roundIndex;
  const matchesPerQuadrantInRound = Math.pow(2, stepDiff);
  const quadrant = Math.floor(match.index / matchesPerQuadrantInRound);

  if (quadrant === 0) return 'QF1';
  if (quadrant === 1) return 'QF2';
  if (quadrant === 2) return 'QF3';
  return 'QF4';
}

function formatMatchRow(
  m: Match,
  roundIndex: number,
  totalRounds: number,
  roundName: string,
  playerMap: Map<string, Player>
): MatchExportRow {
  const isFinal = roundIndex === totalRounds - 1;
  const code = getMatchCode(m, roundIndex, totalRounds, isFinal);

  const p1 = m.p1.playerId ? playerMap.get(m.p1.playerId) : null;
  const p2 = m.p2.playerId ? playerMap.get(m.p2.playerId) : null;

  const p1Name = p1 ? p1.name : m.p1.isBye ? 'BYE' : 'TBD';
  const p2Name = p2 ? p2.name : m.p2.isBye ? 'BYE' : 'TBD';

  const p1Club = p1?.club || '—';
  const p2Club = p2?.club || '—';

  let winnerName = 'Pending';
  if (m.winnerId) {
    const winnerPlayer = playerMap.get(m.winnerId);
    winnerName = winnerPlayer ? winnerPlayer.name : m.winnerId;
  } else if (m.status === 'bye') {
    winnerName = p1Name !== 'BYE' ? p1Name : p2Name;
  }

  return {
    'Match Code': code,
    'Stage / Round': roundName,
    'Match #': m.index + 1,
    'Player 1': p1Name,
    'Club / State 1': p1Club,
    'Score 1': m.score1 !== undefined ? m.score1 : '',
    'Score 2': m.score2 !== undefined ? m.score2 : '',
    'Player 2': p2Name,
    'Club / State 2': p2Club,
    Winner: winnerName,
    'Decision / Method': m.resultType || '',
    Status: m.status.toUpperCase(),
  };
}

function setColumnWidths(ws: XLSX.WorkSheet, data: any[]) {
  if (!data || data.length === 0) return;
  const colNames = Object.keys(data[0]);
  ws['!cols'] = colNames.map((key) => {
    let maxLen = key.length;
    data.forEach((row) => {
      const val = row[key];
      if (val !== undefined && val !== null) {
        const strLen = String(val).length;
        if (strLen > maxLen) maxLen = strLen;
      }
    });
    return { wch: Math.min(Math.max(maxLen + 3, 10), 40) };
  });
}

/**
 * Exports full tournament workbook with sectioned sheets (Overview, Players, QF1, QF2, QF3, QF4, Finals, Master)
 */
export function exportCategoryExcel(category: Category, tournament?: TournamentInfo): void {
  const wb = XLSX.utils.book_new();
  const playerMap = new Map(category.players.map((p) => [p.id, p]));
  const fixture = category.fixture;

  // 1. Overview Sheet
  const metaData = [
    { Property: 'Tournament Name', Value: tournament?.name || 'Tournament Championship' },
    { Property: 'Scheduled Date', Value: tournament?.date || '—' },
    { Property: 'Venue & Location', Value: tournament?.venue || '—' },
    { Property: 'Organizer / Federation', Value: tournament?.organizer || '—' },
    { Property: 'Category Name', Value: category.name },
    { Property: 'Age Group', Value: category.ageGroup },
    { Property: 'Gender Classification', Value: category.gender || 'Men / Boys' },
    {
      Property: 'Weight Division',
      Value: `${category.weightMin ?? 0} - ${category.weightMax ?? 'Unlimited'} kg`,
    },
    { Property: 'Total Registered Players', Value: category.players.length },
    {
      Property: 'Knockout Fixture Status',
      Value: fixture ? (fixture.locked ? 'Locked' : 'Drawn / In Progress') : 'Not Drawn',
    },
    { Property: 'Bracket Size Slots', Value: fixture ? `${fixture.size} Slots` : '—' },
  ];
  const wsMeta = XLSX.utils.json_to_sheet(metaData);
  setColumnWidths(wsMeta, metaData);
  XLSX.utils.book_append_sheet(wb, wsMeta, 'Overview');

  // 2. Players Roster Sheet
  const playersData = category.players.map((p, index) => {
    return {
      'Sr No': index + 1,
      'Player Name': p.name,
      'Club / State / Team': p.club || '—',
      'Weight (kg)': p.weight ?? '—',
      'DOB / Age': p.dob || '—',
    };
  });
  const wsPlayers = XLSX.utils.json_to_sheet(playersData);
  setColumnWidths(wsPlayers, playersData);
  XLSX.utils.book_append_sheet(wb, wsPlayers, 'Players Roster');

  // 3. Multi-Sheet Sectioned Knockout Fixture
  if (fixture) {
    const totalRounds = fixture.rounds.length;
    const hasQuarterFinals = totalRounds >= 3;

    const allMatchesList: MatchExportRow[] = [];
    const qf1Matches: MatchExportRow[] = [];
    const qf2Matches: MatchExportRow[] = [];
    const qf3Matches: MatchExportRow[] = [];
    const qf4Matches: MatchExportRow[] = [];
    const finalsMatches: MatchExportRow[] = [];

    // Process all rounds
    fixture.rounds.forEach((round) => {
      round.matches.forEach((m) => {
        const row = formatMatchRow(m, round.index, totalRounds, round.name, playerMap);
        allMatchesList.push(row);

        const section = getMatchSection(m, round.index, totalRounds);
        if (section === 'QF1') qf1Matches.push(row);
        else if (section === 'QF2') qf2Matches.push(row);
        else if (section === 'QF3') qf3Matches.push(row);
        else if (section === 'QF4') qf4Matches.push(row);
        else finalsMatches.push(row);
      });
    });

    // Bronze match if active
    if (fixture.thirdPlace) {
      const tp = fixture.thirdPlace;
      const tpRow = formatMatchRow(
        tp,
        totalRounds - 1,
        totalRounds,
        '3rd Place Bronze Medal Playoff',
        playerMap
      );
      finalsMatches.push(tpRow);
      allMatchesList.push(tpRow);
    }

    // Add Section sheets if category has Quarterfinals (8+ players)
    if (hasQuarterFinals) {
      if (qf1Matches.length > 0) {
        const wsQF1 = XLSX.utils.json_to_sheet(qf1Matches);
        setColumnWidths(wsQF1, qf1Matches);
        XLSX.utils.book_append_sheet(wb, wsQF1, 'Section 1 - QF1');
      }

      if (qf2Matches.length > 0) {
        const wsQF2 = XLSX.utils.json_to_sheet(qf2Matches);
        setColumnWidths(wsQF2, qf2Matches);
        XLSX.utils.book_append_sheet(wb, wsQF2, 'Section 2 - QF2');
      }

      if (qf3Matches.length > 0) {
        const wsQF3 = XLSX.utils.json_to_sheet(qf3Matches);
        setColumnWidths(wsQF3, qf3Matches);
        XLSX.utils.book_append_sheet(wb, wsQF3, 'Section 3 - QF3');
      }

      if (qf4Matches.length > 0) {
        const wsQF4 = XLSX.utils.json_to_sheet(qf4Matches);
        setColumnWidths(wsQF4, qf4Matches);
        XLSX.utils.book_append_sheet(wb, wsQF4, 'Section 4 - QF4');
      }
    }

    // Finals Stage Sheet (SF1, SF2, 3P, Final F)
    if (finalsMatches.length > 0) {
      const wsFinals = XLSX.utils.json_to_sheet(finalsMatches);
      setColumnWidths(wsFinals, finalsMatches);
      XLSX.utils.book_append_sheet(wb, wsFinals, 'Finals Stage (SF & F)');
    }

    // Master Match Sheet
    const wsAllMatches = XLSX.utils.json_to_sheet(allMatchesList);
    setColumnWidths(wsAllMatches, allMatchesList);
    XLSX.utils.book_append_sheet(wb, wsAllMatches, 'Master Bracket');
  }

  const safeFilename = `${category.name.replace(/[^a-zA-Z0-9_-]/g, '_')}_Tournament_Fixtures.xlsx`;
  XLSX.writeFile(wb, safeFilename);
}

/**
 * Exports a single designated section as its own Excel file (e.g. QF1 only, or Finals only)
 */
export function exportSingleSectionExcel(
  category: Category,
  sectionTarget: 'QF1' | 'QF2' | 'QF3' | 'QF4' | 'FINALS',
  tournament?: TournamentInfo
): void {
  const wb = XLSX.utils.book_new();
  const playerMap = new Map(category.players.map((p) => [p.id, p]));
  const fixture = category.fixture;

  if (!fixture) return;

  const totalRounds = fixture.rounds.length;
  const sectionMatches: MatchExportRow[] = [];

  fixture.rounds.forEach((round) => {
    round.matches.forEach((m) => {
      const section = getMatchSection(m, round.index, totalRounds);
      if (section === sectionTarget) {
        sectionMatches.push(formatMatchRow(m, round.index, totalRounds, round.name, playerMap));
      }
    });
  });

  if (sectionTarget === 'FINALS' && fixture.thirdPlace) {
    sectionMatches.push(
      formatMatchRow(
        fixture.thirdPlace,
        totalRounds - 1,
        totalRounds,
        '3rd Place Bronze Medal Playoff',
        playerMap
      )
    );
  }

  const sheetTitle =
    sectionTarget === 'FINALS'
      ? 'Finals Stage (SF & F)'
      : `Section - ${sectionTarget}`;

  const ws = XLSX.utils.json_to_sheet(sectionMatches);
  setColumnWidths(ws, sectionMatches);
  XLSX.utils.book_append_sheet(wb, ws, sheetTitle);

  const safeFilename = `${category.name.replace(/[^a-zA-Z0-9_-]/g, '_')}_${sectionTarget}.xlsx`;
  XLSX.writeFile(wb, safeFilename);
}
