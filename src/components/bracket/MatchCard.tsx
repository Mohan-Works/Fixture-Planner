import React from 'react';
import { Trophy, CheckCircle, Clock } from 'lucide-react';
import { Match, Player } from '../../types';
import { cn, RESULT_TYPES } from '../../lib/utils';

interface MatchCardProps {
  match: Match;
  player1: Player | null;
  player2: Player | null;
  isFinal?: boolean;
  roundIndex: number;
  totalRounds: number;
  onClick?: () => void;
  className?: string;
}

export const MatchCard: React.FC<MatchCardProps> = ({
  match,
  player1,
  player2,
  isFinal,
  roundIndex,
  totalRounds,
  onClick,
  className,
}) => {
  const isBye = match.status === 'bye';
  const isReady = match.status === 'ready';
  const isDone = match.status === 'done';
  const isPending = match.status === 'pending';

  const isClickable = !isBye && (isReady || isDone);

  const p1 = match.p1;
  const p2 = match.p2;

  // Feeder naming for undecided slots (e.g. Winner of QF1, Winner of SF1, etc.)
  const getSlotPlaceholder = (slotNum: 1 | 2): string => {
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
  };

  const p1Placeholder = getSlotPlaceholder(1);
  const p2Placeholder = getSlotPlaceholder(2);

  const p1Name = player1 ? player1.name : p1.isBye ? 'BYE' : p1Placeholder;
  const p2Name = player2 ? player2.name : p2.isBye ? 'BYE' : p2Placeholder;

  const p1Win = Boolean(match.winnerId && p1.playerId && match.winnerId === p1.playerId);
  const p2Win = Boolean(match.winnerId && p2.playerId && match.winnerId === p2.playerId);

  const resultMeta = RESULT_TYPES.find((r) => r.value === match.resultType);

  // Card theme based on round
  // Finals get special emerald styling, Semis get indigo/purple, Quarters amber, others clean slate
  const roundsFromEnd = totalRounds - 1 - roundIndex;

  // Match stage identification: QF1, QF2, SF1, SF2, F, etc.
  const getStageInfo = () => {
    if (match.isThirdPlace) {
      return {
        code: '3P',
        title: '3RD PLACE PLAYOFF',
        badgeClass: 'bg-amber-900 text-amber-100 border border-amber-300',
      };
    }
    if (isFinal || roundsFromEnd === 0) {
      return {
        code: 'F',
        title: 'FINAL',
        badgeClass: 'bg-emerald-950 text-emerald-100 border border-emerald-300',
      };
    }
    if (roundsFromEnd === 1) {
      const idx = match.index + 1;
      return {
        code: `SF${idx}`,
        title: `SEMIFINAL ${idx}`,
        badgeClass: 'bg-indigo-950 text-indigo-100 border border-indigo-300',
      };
    }
    if (roundsFromEnd === 2) {
      const idx = match.index + 1;
      return {
        code: `QF${idx}`,
        title: `QUARTERFINAL ${idx}`,
        badgeClass: 'bg-amber-950 text-amber-200 border border-amber-400',
      };
    }
    if (roundsFromEnd === 3) {
      const idx = match.index + 1;
      return {
        code: `R16-${idx}`,
        title: `ROUND OF 16 (#${idx})`,
        badgeClass: 'bg-slate-700 text-slate-100 border border-slate-600',
      };
    }
    return {
      code: `M${match.index + 1}`,
      title: `MATCH #${match.index + 1}`,
      badgeClass: 'bg-slate-200 text-slate-800 border border-slate-300',
    };
  };

  const stage = getStageInfo();

  return (
    <div
      data-match-id={match.id}
      onClick={isClickable ? onClick : undefined}
      className={cn(
        'group relative w-56 select-none rounded-xl border bg-white text-xs shadow-xs transition-all duration-150',
        isClickable ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md hover:ring-2 hover:ring-blue-400' : 'cursor-default',
        isDone ? 'border-slate-300' : 'border-slate-200',
        isFinal && isDone && 'border-emerald-400 ring-1 ring-emerald-400/40',
        className
      )}
    >
      {/* Top micro-bar: Match Number & Status */}
      <div
        className={cn(
          'flex items-center justify-between px-2 py-1 text-[10px] font-semibold rounded-t-[11px] border-b',
          isFinal
            ? 'bg-emerald-600 text-white border-emerald-700'
            : roundsFromEnd === 1
            ? 'bg-indigo-600 text-white border-indigo-700'
            : roundsFromEnd === 2
            ? 'bg-amber-500 text-slate-950 border-amber-600'
            : 'bg-slate-100 text-slate-700 border-slate-200'
        )}
      >
        <div className="flex items-center gap-1.5 font-bold min-w-0">
          <span
            className={cn(
              'px-1.5 py-0.5 rounded text-[10px] font-black tracking-wider uppercase font-mono shadow-2xs shrink-0',
              stage.badgeClass
            )}
          >
            {stage.code}
          </span>
          <span className="truncate">
            {stage.title}
          </span>
        </div>

        <div className="shrink-0 ml-1.5">
          {isDone ? (
            <span className="inline-flex items-center gap-0.5 text-[9px] uppercase font-bold tracking-wider">
              {resultMeta ? resultMeta.code.split('/')[0] : 'DONE'}
            </span>
          ) : isReady ? (
            <span className={isFinal || roundsFromEnd === 1 ? 'text-amber-200 uppercase font-bold text-[9px]' : 'text-blue-700 uppercase font-bold text-[9px]'}>Ready</span>
          ) : isBye ? (
            <span className="opacity-75 italic">BYE</span>
          ) : (
            <span className="opacity-60 flex items-center gap-0.5">
              <Clock className="h-2.5 w-2.5" /> TBD
            </span>
          )}
        </div>
      </div>

      {/* Wrestler Row 1 */}
      <div
        className={cn(
          'flex items-center justify-between px-2.5 py-2 border-b border-slate-100 transition-colors',
          p1Win && 'bg-blue-50/80 font-bold text-blue-950',
          !p1.playerId && 'text-slate-400',
          p1.isBye && 'italic text-slate-400 bg-slate-50/50'
        )}
      >
        <div className="flex items-center gap-1.5 min-w-0 pr-2">
          {p1Win && <CheckCircle className="h-3.5 w-3.5 text-blue-600 shrink-0" />}
          <div className="truncate">
            <span className={cn('block truncate', p1Win ? 'font-bold text-slate-900' : 'text-slate-700 font-medium')}>
              {p1Name}
            </span>
            {player1?.club && (
              <span className="block truncate text-[10px] text-slate-400 -mt-0.5 font-normal">
                {player1.club}
              </span>
            )}
          </div>
        </div>

        <div
          className={cn(
            'flex h-6 min-w-[24px] items-center justify-center rounded px-1.5 text-xs font-mono font-bold shrink-0',
            p1Win
              ? 'bg-blue-600 text-white shadow-2xs'
              : match.score1 !== undefined
              ? 'bg-slate-200 text-slate-800'
              : 'bg-slate-100 text-slate-400'
          )}
        >
          {match.score1 !== undefined ? match.score1 : p1.isBye ? '-' : '-'}
        </div>
      </div>

      {/* Player Row 2 */}
      <div
        className={cn(
          'flex items-center justify-between px-2.5 py-2 rounded-b-xl transition-colors',
          p2Win && 'bg-blue-50/80 font-bold text-blue-950',
          !p2.playerId && 'text-slate-400',
          p2.isBye && 'italic text-slate-400 bg-slate-50/50'
        )}
      >
        <div className="flex items-center gap-1.5 min-w-0 pr-2">
          {p2Win && <CheckCircle className="h-3.5 w-3.5 text-blue-600 shrink-0" />}
          <div className="truncate">
            <span className={cn('block truncate', p2Win ? 'font-bold text-slate-900' : 'text-slate-700 font-medium')}>
              {p2Name}
            </span>
            {player2?.club && (
              <span className="block truncate text-[10px] text-slate-400 -mt-0.5 font-normal">
                {player2.club}
              </span>
            )}
          </div>
        </div>

        <div
          className={cn(
            'flex h-6 min-w-[24px] items-center justify-center rounded px-1.5 text-xs font-mono font-bold shrink-0',
            p2Win
              ? 'bg-blue-600 text-white shadow-2xs'
              : match.score2 !== undefined
              ? 'bg-slate-200 text-slate-800'
              : 'bg-slate-100 text-slate-400'
          )}
        >
          {match.score2 !== undefined ? match.score2 : p2.isBye ? '-' : '-'}
        </div>
      </div>
    </div>
  );
};
