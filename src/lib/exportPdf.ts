import jsPDF from 'jspdf';
import { Category, Match, Player, Round, TournamentInfo, Fixture } from '../types';
import { getMatchCode, getMatchSection } from './exportExcel';

export interface VectorPdfExportOptions {
  section?: 'ALL' | 'QF1' | 'QF2' | 'QF3' | 'QF4' | 'FINALS';
  sectionLabel?: string;
  forceOrientation?: 'landscape' | 'portrait';
}

/**
 * Truncates text with an ellipsis if it exceeds the specified maximum width in points.
 */
export function truncateText(pdf: jsPDF, text: string, maxWidth: number): string {
  if (pdf.getTextWidth(text) <= maxWidth) return text;
  let truncated = text;
  while (truncated.length > 0 && pdf.getTextWidth(truncated + '...') > maxWidth) {
    truncated = truncated.slice(0, -1);
  }
  return truncated.length > 0 ? truncated + '...' : text;
}

/**
 * Resolves placeholder text for unassigned bracket slots.
 * E.g., 'Winner of QF1', 'Winner of SF1', 'Runner-up of SF1', etc.
 */
export function getSlotPlaceholder(
  match: Match,
  slotNum: 1 | 2,
  roundIndex: number,
  totalRounds: number,
  isFinal?: boolean
): string {
  if (match.isThirdPlace) {
    return slotNum === 1 ? 'Runner-up of SF1' : 'Runner-up of SF2';
  }

  const roundsFromEnd = totalRounds - 1 - roundIndex;

  if (isFinal || roundsFromEnd === 0) {
    return slotNum === 1 ? 'Winner of SF1' : 'Winner of SF2';
  }

  if (roundsFromEnd === 1) {
    if (match.index === 0) {
      return slotNum === 1 ? 'Winner of QF1' : 'Winner of QF2';
    } else {
      return slotNum === 1 ? 'Winner of QF3' : 'Winner of QF4';
    }
  }

  if (roundsFromEnd === 2) {
    const feederNum = match.index * 2 + slotNum;
    return `Winner of R16-${feederNum}`;
  }

  if (roundIndex > 0) {
    const feederNum = match.index * 2 + slotNum;
    return `Winner of Match #${feederNum}`;
  }

  return 'TBD';
}

interface MatchPosition {
  x: number;
  y: number;
  centerY: number;
}

/**
 * Renders a single match as a crisp, neat small box with slot divider, player names, and scores.
 */
function drawMatchBox(
  pdf: jsPDF,
  match: Match,
  boxX: number,
  boxY: number,
  boxW: number,
  boxH: number,
  playersMap: Map<string, Player>,
  roundIndex: number,
  totalRounds: number,
  isFinal?: boolean,
  isThirdPlace?: boolean
) {
  const p1 = match.p1;
  const p2 = match.p2;

  const player1 = p1.playerId ? playersMap.get(p1.playerId) : undefined;
  const player2 = p2.playerId ? playersMap.get(p2.playerId) : undefined;

  const p1Win = Boolean(match.winnerId && p1.playerId && match.winnerId === p1.playerId);
  const p2Win = Boolean(match.winnerId && p2.playerId && match.winnerId === p2.playerId);

  const p1Placeholder = getSlotPlaceholder(match, 1, roundIndex, totalRounds, isFinal);
  const p2Placeholder = getSlotPlaceholder(match, 2, roundIndex, totalRounds, isFinal);

  // 1. Box Background & Crisp Border (clean white background, dark slate border)
  pdf.setFillColor(255, 255, 255);
  pdf.setDrawColor(71, 85, 105); // slate-600
  pdf.setLineWidth(0.75);
  pdf.rect(boxX, boxY, boxW, boxH, 'FD');

  // 2. Horizontal divider between Slot 1 and Slot 2
  const midY = boxY + boxH / 2;
  pdf.setDrawColor(203, 213, 225); // slate-300
  pdf.setLineWidth(0.5);
  pdf.line(boxX, midY, boxX + boxW, midY);

  // 3. Small Match Stage Tag above the box (e.g. QF1, SF1, F)
  const matchCode = isThirdPlace ? '3P' : getMatchCode(match, roundIndex, totalRounds, isFinal);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(6);
  pdf.setTextColor(100, 116, 139); // slate-500
  pdf.text(matchCode, boxX + boxW - 2, boxY - 2.5, { align: 'right' });

  // 4. Winner highlight accent stripe (on left edge of winning slot)
  if (p1Win) {
    pdf.setFillColor(37, 99, 235); // blue-600
    pdf.rect(boxX, boxY, 2.5, boxH / 2, 'F');
  }
  if (p2Win) {
    pdf.setFillColor(37, 99, 235); // blue-600
    pdf.rect(boxX, midY, 2.5, boxH / 2, 'F');
  }

  // --- Slot 1 Content ---
  // Seed / Slot index
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(6.5);
  pdf.setTextColor(148, 163, 184); // slate-400
  pdf.text('1', boxX + 4.5, boxY + boxH * 0.32);

  // Name & Club
  let p1DisplayName: string;
  if (player1) {
    p1DisplayName = player1.club ? `${player1.name} (${player1.club})` : player1.name;
  } else if (p1.isBye) {
    p1DisplayName = 'BYE';
  } else {
    p1DisplayName = p1Placeholder;
  }

  pdf.setFont('helvetica', p1Win ? 'bold' : 'normal');
  pdf.setFontSize(7.5);
  if (p1Win) {
    pdf.setTextColor(15, 23, 42); // slate-900 bold
  } else if (p1.isBye || !p1.playerId) {
    pdf.setTextColor(100, 116, 139); // slate-500
  } else {
    pdf.setTextColor(51, 65, 85); // slate-700
  }

  const p1Truncated = truncateText(pdf, p1DisplayName, boxW - 38);
  pdf.text(p1Truncated, boxX + 11.5, boxY + boxH * 0.32);

  // Score 1
  let p1Score = '';
  if (match.score1 !== undefined) {
    p1Score = String(match.score1);
  } else if (p1.isBye) {
    p1Score = '-';
  } else if (match.status === 'ready' || match.status === 'done') {
    p1Score = '-';
  }

  if (p1Score) {
    pdf.setFont('helvetica', p1Win ? 'bold' : 'normal');
    pdf.setFontSize(7.5);
    pdf.setTextColor(15, 23, 42);
    pdf.text(p1Score, boxX + boxW - 4, boxY + boxH * 0.32, { align: 'right' });
  }

  // --- Slot 2 Content ---
  // Seed / Slot index
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(6.5);
  pdf.setTextColor(148, 163, 184); // slate-400
  pdf.text('2', boxX + 4.5, boxY + boxH * 0.82);

  // Name & Club
  let p2DisplayName: string;
  if (player2) {
    p2DisplayName = player2.club ? `${player2.name} (${player2.club})` : player2.name;
  } else if (p2.isBye) {
    p2DisplayName = 'BYE';
  } else {
    p2DisplayName = p2Placeholder;
  }

  pdf.setFont('helvetica', p2Win ? 'bold' : 'normal');
  pdf.setFontSize(7.5);
  if (p2Win) {
    pdf.setTextColor(15, 23, 42);
  } else if (p2.isBye || !p2.playerId) {
    pdf.setTextColor(100, 116, 139);
  } else {
    pdf.setTextColor(51, 65, 85);
  }

  const p2Truncated = truncateText(pdf, p2DisplayName, boxW - 38);
  pdf.text(p2Truncated, boxX + 11.5, boxY + boxH * 0.82);

  // Score 2
  let p2Score = '';
  if (match.score2 !== undefined) {
    p2Score = String(match.score2);
  } else if (p2.isBye) {
    p2Score = '-';
  } else if (match.status === 'ready' || match.status === 'done') {
    p2Score = '-';
  }

  if (p2Score) {
    pdf.setFont('helvetica', p2Win ? 'bold' : 'normal');
    pdf.setFontSize(7.5);
    pdf.setTextColor(15, 23, 42);
    pdf.text(p2Score, boxX + boxW - 4, boxY + boxH * 0.82, { align: 'right' });
  }
}

/**
 * Renders a single page containing a clean vector bracket tree with lines and small boxes.
 */
function renderBracketPage(
  pdf: jsPDF,
  category: Category,
  tournament: TournamentInfo | undefined,
  displayRounds: Round[],
  totalRounds: number,
  pageIndex: number,
  totalPages: number,
  sectionCode: string,
  sectionLabelText: string,
  includeThirdPlace: boolean
) {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const marginLeft = 28;
  const marginRight = 28;
  const marginTop = 24;
  const marginBottom = 20;

  const playersMap = new Map<string, Player>();
  category.players.forEach((p) => playersMap.set(p.id, p));

  // --- Official Tournament Header ---
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8);
  pdf.setTextColor(100, 116, 139); // slate-500
  pdf.text('TOURNAMENT KNOCKOUT FIXTURE', marginLeft, marginTop + 6);

  // Tournament Name
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(14);
  pdf.setTextColor(15, 23, 42); // slate-900
  const tournamentTitle = tournament?.name || 'TournaX Championship Tournament';
  pdf.text(tournamentTitle, marginLeft, marginTop + 22);

  // Category and Metadata
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.setTextColor(37, 99, 235); // blue-600
  const categoryHeader = `${category.name}  •  ${category.ageGroup}  •  ${category.gender || 'Men / Boys'}`;
  pdf.text(categoryHeader, marginLeft, marginTop + 36);

  // Right Side Header Metadata
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8);
  pdf.setTextColor(71, 85, 105);

  const metaRightParts: string[] = [];
  if (tournament?.date) metaRightParts.push(`Date: ${tournament.date}`);
  if (tournament?.venue) metaRightParts.push(`Venue: ${tournament.venue}`);
  if (metaRightParts.length > 0) {
    pdf.text(metaRightParts.join('  |  '), pageWidth - marginRight, marginTop + 10, { align: 'right' });
  }

  const fixtureSize = category.fixture ? category.fixture.size : category.players.length;
  pdf.text(
    `Total Players: ${category.players.length}  |  ${fixtureSize}-Slot Knockout Bracket`,
    pageWidth - marginRight,
    marginTop + 22,
    { align: 'right' }
  );

  // Prominent Section Badge
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(9);
  pdf.setTextColor(180, 83, 9); // amber-700
  pdf.text(`[ ${sectionLabelText} ]`, pageWidth - marginRight, marginTop + 36, { align: 'right' });

  // Divider Line
  pdf.setDrawColor(203, 213, 225); // slate-300
  pdf.setLineWidth(0.75);
  pdf.line(marginLeft, marginTop + 44, pageWidth - marginRight, marginTop + 44);

  // --- Bracket Tree Layout Calculations ---
  const usableTop = marginTop + 64;
  const usableBottom = pageHeight - marginBottom - 18;
  const usableHeight = usableBottom - usableTop;
  const usableWidth = pageWidth - marginLeft - marginRight;

  const numRounds = displayRounds.length;
  if (numRounds === 0) return;

  // Compute column width and gap
  let boxWidth = 140;
  if (numRounds <= 2) {
    boxWidth = 160;
  } else if (numRounds === 3) {
    boxWidth = 150;
  } else if (numRounds === 4) {
    boxWidth = 138;
  } else {
    boxWidth = 118;
  }

  const colGap =
    numRounds > 1
      ? Math.max(38, (usableWidth - numRounds * boxWidth) / (numRounds - 1))
      : 0;

  // Compute vertical box height based on first round matches
  const numMatches0 = Math.max(1, displayRounds[0].matches.length);
  const stepY0 = usableHeight / numMatches0;
  const boxHeight = Math.min(34, Math.max(22, stepY0 - 8));

  // Map to store calculated match positions
  const matchPosMap = new Map<string, MatchPosition>();

  // 1. Position Round 0 matches evenly
  const colX0 = marginLeft;
  displayRounds[0].matches.forEach((m, idx) => {
    const centerY = usableTop + (idx + 0.5) * stepY0;
    const y = centerY - boxHeight / 2;
    matchPosMap.set(m.id, { x: colX0, y, centerY });
  });

  // 2. Position subsequent round matches based on parent matches
  for (let r = 1; r < numRounds; r++) {
    const colX = marginLeft + r * (boxWidth + colGap);
    const prevRound = displayRounds[r - 1];
    const currentRound = displayRounds[r];

    currentRound.matches.forEach((m, mIdx) => {
      // Find parent matches from the previous round
      const parent1Index = m.index * 2;
      const parent2Index = m.index * 2 + 1;

      const p1Match = prevRound.matches.find((pm) => pm.index === parent1Index);
      const p2Match = prevRound.matches.find((pm) => pm.index === parent2Index);

      let centerY: number;
      if (p1Match && p2Match && matchPosMap.has(p1Match.id) && matchPosMap.has(p2Match.id)) {
        const p1Y = matchPosMap.get(p1Match.id)!.centerY;
        const p2Y = matchPosMap.get(p2Match.id)!.centerY;
        centerY = (p1Y + p2Y) / 2;
      } else if (p1Match && matchPosMap.has(p1Match.id)) {
        centerY = matchPosMap.get(p1Match.id)!.centerY;
      } else if (p2Match && matchPosMap.has(p2Match.id)) {
        centerY = matchPosMap.get(p2Match.id)!.centerY;
      } else {
        const step = usableHeight / currentRound.matches.length;
        centerY = usableTop + (mIdx + 0.5) * step;
      }

      const y = centerY - boxHeight / 2;
      matchPosMap.set(m.id, { x: colX, y, centerY });
    });
  }

  // --- 3. Draw Connecting Bracket Lines ---
  pdf.setDrawColor(71, 85, 105); // slate-600
  pdf.setLineWidth(0.85);

  for (let r = 1; r < numRounds; r++) {
    const colX = marginLeft + r * (boxWidth + colGap);
    const prevRound = displayRounds[r - 1];
    const currentRound = displayRounds[r];

    currentRound.matches.forEach((m) => {
      const parent1Index = m.index * 2;
      const parent2Index = m.index * 2 + 1;

      const p1Match = prevRound.matches.find((pm) => pm.index === parent1Index);
      const p2Match = prevRound.matches.find((pm) => pm.index === parent2Index);

      const currPos = matchPosMap.get(m.id);
      if (!currPos) return;

      if (p1Match && p2Match && matchPosMap.has(p1Match.id) && matchPosMap.has(p2Match.id)) {
        const p1Pos = matchPosMap.get(p1Match.id)!;
        const p2Pos = matchPosMap.get(p2Match.id)!;
        const prevRightX = p1Pos.x + boxWidth;
        const midX = prevRightX + colGap / 2;

        // Horizontal line from parent 1 right edge to midX
        pdf.line(prevRightX, p1Pos.centerY, midX, p1Pos.centerY);
        // Horizontal line from parent 2 right edge to midX
        pdf.line(prevRightX, p2Pos.centerY, midX, p2Pos.centerY);
        // Vertical connecting bar
        pdf.line(midX, p1Pos.centerY, midX, p2Pos.centerY);
        // Horizontal branch to child match left edge
        pdf.line(midX, currPos.centerY, colX, currPos.centerY);
      } else if (p1Match && matchPosMap.has(p1Match.id)) {
        const p1Pos = matchPosMap.get(p1Match.id)!;
        pdf.line(p1Pos.x + boxWidth, p1Pos.centerY, colX, currPos.centerY);
      } else if (p2Match && matchPosMap.has(p2Match.id)) {
        const p2Pos = matchPosMap.get(p2Match.id)!;
        pdf.line(p2Pos.x + boxWidth, p2Pos.centerY, colX, currPos.centerY);
      }
    });
  }

  // --- 4. Draw Column Headers and Match Boxes ---
  displayRounds.forEach((round, rIdx) => {
    const colX = marginLeft + rIdx * (boxWidth + colGap);

    // Column Header
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(30, 41, 59); // slate-800
    pdf.text(round.name.toUpperCase(), colX + boxWidth / 2, usableTop - 8, { align: 'center' });

    pdf.setDrawColor(226, 232, 240); // slate-200
    pdf.setLineWidth(0.5);
    pdf.line(colX + 8, usableTop - 4, colX + boxWidth - 8, usableTop - 4);

    // Matches in this column
    const isFinalRound = rIdx === numRounds - 1 && sectionCode === 'ALL';
    round.matches.forEach((m) => {
      const pos = matchPosMap.get(m.id);
      if (!pos) return;
      drawMatchBox(
        pdf,
        m,
        pos.x,
        pos.y,
        boxWidth,
        boxHeight,
        playersMap,
        round.index,
        totalRounds,
        isFinalRound
      );
    });
  });

  // --- 5. For Section Exports (QF1, QF2, QF3, QF4), draw feeder destination arrow ---
  if (['QF1', 'QF2', 'QF3', 'QF4'].includes(sectionCode)) {
    const lastRound = displayRounds[displayRounds.length - 1];
    const qfMatch = lastRound?.matches[0];
    if (qfMatch && matchPosMap.has(qfMatch.id)) {
      const qfPos = matchPosMap.get(qfMatch.id)!;
      const arrowStartX = qfPos.x + boxWidth;
      const arrowEndX = arrowStartX + 26;

      pdf.setDrawColor(37, 99, 235); // blue-600
      pdf.setLineWidth(1.2);
      pdf.line(arrowStartX, qfPos.centerY, arrowEndX, qfPos.centerY);

      // Arrow head
      pdf.line(arrowEndX, qfPos.centerY, arrowEndX - 4, qfPos.centerY - 3);
      pdf.line(arrowEndX, qfPos.centerY, arrowEndX - 4, qfPos.centerY + 3);

      const targetSemi = sectionCode === 'QF1' || sectionCode === 'QF2' ? 'Semifinal 1 (SF1)' : 'Semifinal 2 (SF2)';
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7.5);
      pdf.setTextColor(37, 99, 235);
      pdf.text(`Advances to ${targetSemi}`, arrowEndX + 6, qfPos.centerY + 2.5);
    }
  }

  // --- 6. 3rd Place Match (Bronze Playoff) ---
  if (includeThirdPlace && category.fixture?.thirdPlace && category.thirdPlaceMode === 'bronze-match') {
    const tpMatch = category.fixture.thirdPlace;
    const tpX = marginLeft + (numRounds - 1) * (boxWidth + colGap);
    const tpY = pageHeight - marginBottom - boxHeight - 8;

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(6.5);
    pdf.setTextColor(180, 83, 9); // amber-700
    pdf.text('3RD PLACE BRONZE PLAYOFF', tpX + boxWidth / 2, tpY - 3, { align: 'center' });

    drawMatchBox(
      pdf,
      tpMatch,
      tpX,
      tpY,
      boxWidth,
      boxHeight,
      playersMap,
      totalRounds - 1,
      totalRounds,
      false,
      true
    );
  }

  // --- Footer ---
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7);
  pdf.setTextColor(148, 163, 184); // slate-400
  pdf.text('TournaX Tournament Planner  •  Official Knockout Fixture Sheet (A4 Vector Format)', marginLeft, pageHeight - 8);
  pdf.text(`Page ${pageIndex} of ${totalPages}`, pageWidth - marginRight, pageHeight - 8, { align: 'right' });
}

/**
 * Generates an A4 PDF of the tournament bracket using pure vector lines and neat small boxes.
 * Text is 100% scalable vector font (never blurry or pixelated).
 */
export async function exportVectorBracketPdf(
  category: Category,
  tournament?: TournamentInfo,
  options?: VectorPdfExportOptions
): Promise<void> {
  const fixture = category.fixture;
  if (!fixture || fixture.rounds.length === 0) {
    throw new Error('No fixture available to export.');
  }

  const totalRounds = fixture.rounds.length;
  const requestedSection = options?.section || 'ALL';

  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'pt',
    format: 'a4',
  });

  // Handle Multi-Page Export for Complete Bracket when > 16 players
  if (requestedSection === 'ALL' && category.players.length > 16 && totalRounds >= 3) {
    // 5-Page Tournament Booklet:
    // Page 1: Section 1 (➔ QF1)
    // Page 2: Section 2 (➔ QF2)
    // Page 3: Section 3 (➔ QF3)
    // Page 4: Section 4 (➔ QF4)
    // Page 5: Finals Stage (Quarterfinals, Semifinals, Final F, 3rd Place)
    const sections: Array<{
      id: 'QF1' | 'QF2' | 'QF3' | 'QF4' | 'FINALS';
      label: string;
      rounds: Round[];
      includeThirdPlace: boolean;
    }> = [
      {
        id: 'QF1',
        label: 'Section 1 (➔ QF1)',
        rounds: getSectionRounds(fixture, 'QF1', totalRounds),
        includeThirdPlace: false,
      },
      {
        id: 'QF2',
        label: 'Section 2 (➔ QF2)',
        rounds: getSectionRounds(fixture, 'QF2', totalRounds),
        includeThirdPlace: false,
      },
      {
        id: 'QF3',
        label: 'Section 3 (➔ QF3)',
        rounds: getSectionRounds(fixture, 'QF3', totalRounds),
        includeThirdPlace: false,
      },
      {
        id: 'QF4',
        label: 'Section 4 (➔ QF4)',
        rounds: getSectionRounds(fixture, 'QF4', totalRounds),
        includeThirdPlace: false,
      },
      {
        id: 'FINALS',
        label: 'Finals Stage (QF, SF & Final F)',
        rounds: getSectionRounds(fixture, 'FINALS', totalRounds),
        includeThirdPlace: true,
      },
    ];

    const totalPages = sections.length;
    sections.forEach((sec, idx) => {
      if (idx > 0) {
        pdf.addPage('a4', 'landscape');
      }
      renderBracketPage(
        pdf,
        category,
        tournament,
        sec.rounds,
        totalRounds,
        idx + 1,
        totalPages,
        sec.id,
        sec.label,
        sec.includeThirdPlace
      );
    });
  } else {
    // Single Page Export (<=16 players or specific Section)
    const displayRounds = getSectionRounds(fixture, requestedSection, totalRounds);
    const label =
      options?.sectionLabel ||
      (requestedSection === 'ALL'
        ? 'Complete Tournament Bracket'
        : requestedSection === 'FINALS'
        ? 'Finals Stage (SF & Final F)'
        : `Section ${requestedSection}`);

    const includeThirdPlace = requestedSection === 'ALL' || requestedSection === 'FINALS';

    renderBracketPage(
      pdf,
      category,
      tournament,
      displayRounds,
      totalRounds,
      1,
      1,
      requestedSection,
      label,
      includeThirdPlace
    );
  }

  // File save name
  const cleanTitle = category.name.replace(/[^a-zA-Z0-9_-]/g, '_');
  const cleanSection = options?.sectionLabel
    ? `_${options.sectionLabel.replace(/[^a-zA-Z0-9_-]/g, '_')}`
    : requestedSection !== 'ALL'
    ? `_${requestedSection}`
    : '_Complete';

  pdf.save(`${cleanTitle}${cleanSection}_A4.pdf`);
}

/**
 * Filters the fixture rounds to include only matches belonging to the requested section.
 */
function getSectionRounds(
  fixture: Fixture,
  section: 'ALL' | 'QF1' | 'QF2' | 'QF3' | 'QF4' | 'FINALS',
  totalRounds: number
): Round[] {
  if (section === 'ALL' || totalRounds < 3) {
    return fixture.rounds;
  }

  if (section === 'FINALS') {
    // Show Quarterfinals (totalRounds - 3) through Final (totalRounds - 1)
    return fixture.rounds.filter((r) => r.index >= totalRounds - 3);
  }

  const qfRoundIndex = totalRounds - 3;
  return fixture.rounds
    .filter((r) => r.index <= qfRoundIndex)
    .map((r) => ({
      ...r,
      matches: r.matches.filter(
        (m) => getMatchSection(m, r.index, totalRounds) === section
      ),
    }))
    .filter((r) => r.matches.length > 0);
}

/**
 * Universal export function maintaining backwards compatibility.
 */
export async function exportBracketPdf(
  target: HTMLElement | Category,
  titleOrTournament?: string | TournamentInfo,
  tournamentOrOptions?: TournamentInfo | VectorPdfExportOptions,
  options?: VectorPdfExportOptions
): Promise<void> {
  // If a Category object is provided, use pure vector rendering
  if ('fixture' in target && 'players' in target) {
    const tournament =
      typeof titleOrTournament === 'object'
        ? (titleOrTournament as TournamentInfo)
        : typeof tournamentOrOptions === 'object' && !('section' in tournamentOrOptions)
        ? (tournamentOrOptions as TournamentInfo)
        : undefined;

    const exportOptions = options || (tournamentOrOptions as VectorPdfExportOptions);
    return exportVectorBracketPdf(target as Category, tournament, exportOptions);
  }

  // Fallback if target is an HTMLElement (not recommended, but supported)
  throw new Error('Vector PDF export requires a Category object with active fixture.');
}
