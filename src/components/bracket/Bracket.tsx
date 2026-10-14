import React, { useRef, useState, useMemo } from 'react';
import {
  RotateCcw,
  Lock,
  Unlock,
  Shuffle,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Trophy,
  Award,
  Layers,
} from 'lucide-react';
import { Category, Match, Player, ThirdPlaceMode } from '../../types';
import { RoundColumn } from './RoundColumn';
import { Connectors } from './Connectors';
import { ScoreModal } from './ScoreModal';
import { ThirdPlaceSection } from './ThirdPlaceSection';
import { ExportMenu } from '../export/ExportMenu';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { ConfirmModal } from '../ui/ConfirmModal';
import { useTournamentStore } from '../../store/useTournamentStore';
import { hasDownstreamResults } from '../../lib/bracket';
import { exportVectorBracketPdf } from '../../lib/exportPdf';
import { getMatchSection } from '../../lib/exportExcel';

interface BracketProps {
  category: Category;
}

export const Bracket: React.FC<BracketProps> = ({ category }) => {
  const {
    tournament,
    generateCategoryFixture,
    toggleLockFixture,
    updateThirdPlaceMode,
    recordMatchResult,
    resetCategoryMatch,
    resetCategoryFixture,
  } = useTournamentStore();

  const fixture = category.fixture;
  const bracketRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [zoom, setZoom] = useState(1);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isRedrawConfirmOpen, setIsRedrawConfirmOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [sectionFilter, setSectionFilter] = useState<'ALL' | 'QF1' | 'QF2' | 'QF3' | 'QF4' | 'FINALS'>('ALL');
  const [isExpanded, setIsExpanded] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Quick lookup map for player IDs to Player objects
  const playersMap = useMemo(() => {
    const map = new Map<string, Player>();
    category.players.forEach((p) => map.set(p.id, p));
    return map;
  }, [category.players]);

  if (!fixture) {
    return null;
  }

  const totalRounds = fixture.rounds.length;
  const hasQuarterFinals = totalRounds >= 3;

  // Filter rounds & matches by section (QF1, QF2, QF3, QF4, Finals, or Full)
  const displayedRounds = useMemo(() => {
    if (sectionFilter === 'ALL' || !hasQuarterFinals) {
      return fixture.rounds;
    }

    if (sectionFilter === 'FINALS') {
      return fixture.rounds.filter((r) => r.index >= totalRounds - 2);
    }

    const qfRoundIndex = totalRounds - 3;
    return fixture.rounds
      .filter((r) => r.index <= qfRoundIndex)
      .map((r) => ({
        ...r,
        matches: r.matches.filter(
          (m) => getMatchSection(m, r.index, totalRounds) === sectionFilter
        ),
      }))
      .filter((r) => r.matches.length > 0);
  }, [fixture.rounds, sectionFilter, hasQuarterFinals, totalRounds]);

  // Check if any match has scores or winner entered (for redraw warning)
  const hasAnyPlayedMatches = useMemo(() => {
    for (const r of fixture.rounds) {
      for (const m of r.matches) {
        if (m.status === 'done' && !m.p2.isBye) return true;
        if (m.winnerId && !m.p2.isBye) return true;
      }
    }
    if (fixture.thirdPlace?.winnerId) return true;
    return false;
  }, [fixture]);

  // Check if championship final is completed
  const finalRound = fixture.rounds[fixture.rounds.length - 1];
  const finalMatch = finalRound?.matches[0];
  const champion =
    finalMatch && finalMatch.status === 'done' && finalMatch.winnerId
      ? playersMap.get(finalMatch.winnerId)
      : null;

  const handleRedrawClick = () => {
    if (fixture.locked) return;
    if (hasAnyPlayedMatches) {
      setIsRedrawConfirmOpen(true);
    } else {
      generateCategoryFixture(category.id);
    }
  };

  const handleMatchClick = (match: Match) => {
    setSelectedMatch(match);
  };

  const currentMatchRoundName = useMemo(() => {
    if (!selectedMatch) return '';
    if (selectedMatch.isThirdPlace) return '3rd Place Bronze Match';
    const round = fixture.rounds.find((r) => r.index === selectedMatch.round);
    return round ? round.name : `Round ${selectedMatch.round + 1}`;
  }, [selectedMatch, fixture]);

  const handleExportSectionPdf = async (
    section: 'ALL' | 'QF1' | 'QF2' | 'QF3' | 'QF4' | 'FINALS',
    label: string
  ) => {
    await exportVectorBracketPdf(category, tournament, {
      section,
      sectionLabel: label,
    });
  };

  return (
    <div className="space-y-4 w-full">
      {/* Champion Banner */}
      {champion && (
        <div className="rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 p-5 text-slate-950 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-amber-400 shadow-md">
              <Trophy className="h-7 w-7" />
            </div>
            <div>
              <div className="text-xs uppercase font-extrabold tracking-widest text-slate-900/80">
                Tournament Champion
              </div>
              <div className="text-xl font-black text-slate-950 leading-tight">
                {champion.name}
              </div>
              {champion.club && (
                <div className="text-xs font-semibold text-slate-900/90">{champion.club}</div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-slate-950 text-amber-400 text-xs font-extrabold uppercase tracking-wider">
              1st Place - Gold
            </span>
          </div>
        </div>
      )}

      {/* Bracket Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs print:hidden">
        {/* Left: Fixture actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant={fixture.locked ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => toggleLockFixture(category.id)}
            icon={fixture.locked ? <Lock className="h-3.5 w-3.5 text-amber-400" /> : <Unlock className="h-3.5 w-3.5 text-slate-400" />}
          >
            {fixture.locked ? 'Fixture Locked' : 'Lock Fixture'}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleRedrawClick}
            disabled={fixture.locked}
            icon={<Shuffle className="h-3.5 w-3.5 text-slate-500" />}
            title={fixture.locked ? 'Unlock fixture to re-draw' : 'Re-draw tournament bracket'}
          >
            Re-Draw Bracket
          </Button>

          <div className="h-6 w-px bg-slate-200 hidden sm:block mx-1" />

          {/* Third place setting */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="font-semibold text-slate-500 hidden md:inline">Playoff:</span>
            <select
              value={category.thirdPlaceMode}
              disabled={fixture.locked}
              onChange={(e) => updateThirdPlaceMode(category.id, e.target.value as ThirdPlaceMode)}
              className="rounded-lg border border-slate-300 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-60"
            >
              <option value="bronze-match">Bronze Match Play-off</option>
              <option value="two-bronze">Two Bronze Medals</option>
              <option value="none">No 3rd Place Match</option>
            </select>
          </div>
        </div>

        {/* Right: Expand toggle, Zoom controls, PDF Export & Reset */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Prominent Bracket Expand Option (Default: Expanded) */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
              isExpanded
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
            }`}
            title={isExpanded ? 'Collapse bracket to standard width' : 'Expand bracket to full width'}
          >
            {isExpanded ? (
              <>
                <Minimize2 className="h-3.5 w-3.5 text-blue-200" />
                <span>Expanded View</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-blue-500 text-white uppercase tracking-wider">
                  Active
                </span>
              </>
            ) : (
              <>
                <Maximize2 className="h-3.5 w-3.5 text-slate-600" />
                <span>Expand Full</span>
              </>
            )}
          </button>

          {/* Zoom Controls */}
          <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-slate-600">
            <button
              onClick={() => setZoom((z) => Math.max(0.6, Math.round((z - 0.1) * 10) / 10))}
              className="p-1 rounded hover:bg-white text-slate-600 hover:text-slate-900 transition-colors"
              title="Zoom out"
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <span className="px-2 text-[11px] font-mono font-semibold text-slate-700 min-w-[3rem] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(1.5, Math.round((z + 0.1) * 10) / 10))}
              className="p-1 rounded hover:bg-white text-slate-600 hover:text-slate-900 transition-colors"
              title="Zoom in"
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setZoom(1)}
              className="p-1 rounded hover:bg-white text-slate-400 hover:text-slate-700 transition-colors"
              title="Reset Zoom to 100%"
            >
              <RotateCcw className="h-3 w-3" />
            </button>
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className={`p-1 rounded transition-colors ${
                isFullScreen
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'hover:bg-white text-slate-500 hover:text-slate-900'
              }`}
              title={isFullScreen ? 'Exit Full Screen' : 'Full Screen View'}
            >
              {isFullScreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
            </button>
          </div>

          <ExportMenu
            category={category}
            tournament={tournament}
            bracketElementRef={bracketRef}
            onExportSectionPdf={handleExportSectionPdf}
          />

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsResetConfirmOpen(true)}
            className="text-slate-400 hover:text-rose-600 hover:bg-rose-50"
            title="Reset fixture completely"
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Section View Navigation Bar for large brackets (8+ players) */}
      {hasQuarterFinals && (
        <div className="flex flex-wrap items-center justify-between gap-2.5 bg-slate-900 text-white px-4 py-2.5 rounded-2xl border border-slate-800 shadow-md">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-amber-400 shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Bracket Section View:
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: 'ALL', label: `Full Bracket (${category.players.length} Players)` },
              { id: 'QF1', label: 'Section 1 (➔ QF1)' },
              { id: 'QF2', label: 'Section 2 (➔ QF2)' },
              { id: 'QF3', label: 'Section 3 (➔ QF3)' },
              { id: 'QF4', label: 'Section 4 (➔ QF4)' },
              { id: 'FINALS', label: 'Finals (SF & Final F)' },
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSectionFilter(s.id as any)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  sectionFilter === s.id
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Bracket Interactive Workspace - Expansive Full Tab */}
      <div
        className={`w-full bg-slate-50/50 rounded-2xl overflow-x-auto min-h-[620px] border border-slate-200/90 shadow-2xs transition-all ${
          isFullScreen
            ? 'fixed inset-0 z-50 rounded-none border-none bg-slate-950 p-4 sm:p-6 min-h-screen overflow-auto'
            : isExpanded
            ? 'relative left-1/2 -translate-x-1/2 w-[calc(100vw-2.5rem)] max-w-[1920px] shadow-lg border-blue-200 bg-white/80 p-2 sm:p-4'
            : ''
        }`}
      >
        {isFullScreen && (
          <div className="mb-4 flex items-center justify-between pb-3 border-b border-slate-800 text-white">
            <div className="flex items-center gap-3">
              <span className="text-lg font-black text-white">
                {category.name} : Full Tab Fixture View
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-bold">
                {sectionFilter === 'ALL' ? 'Full Bracket' : `Section: ${sectionFilter}`}
              </span>
            </div>
            <button
              onClick={() => setIsFullScreen(false)}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-colors"
            >
              <Minimize2 className="h-4 w-4 text-amber-400" />
              <span>Exit Full Screen</span>
            </button>
          </div>
        )}

        <div
          ref={bracketRef}
          className="p-4 sm:p-6 bg-white inline-block min-w-full rounded-xl"
          style={{
            transform: zoom !== 1 ? `scale(${zoom})` : undefined,
            transformOrigin: 'top left',
            transition: 'transform 100ms ease-out',
          }}
        >
          {/* Printable Header */}
          <div className="mb-6 pb-4 border-b border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase font-extrabold tracking-widest text-blue-600">
                Official Knockout Bracket
              </div>
              <h2 className="text-xl font-black text-slate-900">{category.name}</h2>
              <div className="text-xs text-slate-500 mt-0.5">
                {tournament.name} • {category.players.length} Players • {fixture.size}-Slot Bracket
                {sectionFilter !== 'ALL' && (
                  <span className="ml-2 font-bold text-amber-600">
                    [Viewing: {sectionFilter === 'FINALS' ? 'Finals Stage' : `Section ${sectionFilter}`}]
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                {category.ageGroup} / {category.gender || 'Men / Boys'}
              </span>
            </div>
          </div>

          {/* Interactive Bracket Area with dynamic SVG connectors */}
          <div
            ref={containerRef}
            className="relative flex items-stretch gap-16 py-6 overflow-visible"
            style={{
              minHeight: `${
                (displayedRounds[0]?.matches.length || fixture.rounds[0].matches.length) * 85 + 120
              }px`,
            }}
          >
            {/* SVG Connector layer */}
            <Connectors
              fixture={fixture}
              containerRef={containerRef}
              zoom={zoom}
            />

            {/* Columns of each displayed round */}
            {displayedRounds.map((round) => (
              <RoundColumn
                key={round.index}
                round={round}
                playersMap={playersMap}
                totalRounds={fixture.rounds.length}
                onMatchClick={handleMatchClick}
              />
            ))}
          </div>

          {/* Third Place / Double Bronze Section: shown if ALL or FINALS */}
          {(sectionFilter === 'ALL' || sectionFilter === 'FINALS') && (
            <ThirdPlaceSection
              category={category}
              playersMap={playersMap}
              onMatchClick={handleMatchClick}
            />
          )}
        </div>
      </div>

      {/* Score Modal */}
      {selectedMatch && (
        <ScoreModal
          isOpen={true}
          onClose={() => setSelectedMatch(null)}
          match={selectedMatch}
          player1={
            selectedMatch.p1.playerId ? playersMap.get(selectedMatch.p1.playerId) || null : null
          }
          player2={
            selectedMatch.p2.playerId ? playersMap.get(selectedMatch.p2.playerId) || null : null
          }
          roundName={currentMatchRoundName}
          hasDownstreamResults={hasDownstreamResults(fixture, selectedMatch)}
          onSaveResult={(winnerId, score1, score2, resultType) => {
            recordMatchResult(
              category.id,
              selectedMatch.id,
              winnerId,
              score1,
              score2,
              resultType
            );
          }}
          onResetMatch={() => {
            resetCategoryMatch(category.id, selectedMatch.id);
          }}
        />
      )}

      {/* Redraw Confirmation Modal */}
      <ConfirmModal
        isOpen={isRedrawConfirmOpen}
        onClose={() => setIsRedrawConfirmOpen(false)}
        onConfirm={() => generateCategoryFixture(category.id)}
        title="Re-draw Bracket & Lose Entered Scores?"
        variant="warning"
        confirmText="Yes, Re-draw Bracket"
        description="Matches in this category already have recorded scores or winners. Re-drawing will generate a new randomized draw and discard all entered match results. Are you sure you want to proceed?"
      />

      {/* Reset Fixture Confirmation Modal */}
      <ConfirmModal
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={() => resetCategoryFixture(category.id)}
        title="Reset Fixture?"
        variant="danger"
        confirmText="Reset Fixture"
        description="This will remove the current bracket and all entered match scores, unlocking the roster so you can add or remove players."
      />
    </div>
  );
};
