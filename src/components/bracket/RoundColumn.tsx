import React from 'react';
import { Match, Player, Round } from '../../types';
import { MatchCard } from './MatchCard';
import { cn } from '../../lib/utils';

interface RoundColumnProps {
  round: Round;
  playersMap: Map<string, Player>;
  totalRounds: number;
  onMatchClick: (match: Match) => void;
}

export const RoundColumn: React.FC<RoundColumnProps> = ({
  round,
  playersMap,
  totalRounds,
  onMatchClick,
}) => {
  const isFinal = round.index === totalRounds - 1;
  const roundsFromEnd = totalRounds - 1 - round.index;

  const getHeaderColor = () => {
    if (isFinal) return 'bg-emerald-600 text-white shadow-emerald-600/20';
    if (roundsFromEnd === 1) return 'bg-indigo-600 text-white shadow-indigo-600/20';
    if (roundsFromEnd === 2) return 'bg-amber-500 text-slate-950 shadow-amber-500/20';
    return 'bg-blue-600 text-white shadow-blue-600/20';
  };

  const getRoundDisplayName = () => {
    if (isFinal) return 'Final (F)';
    if (roundsFromEnd === 1) return 'Semifinals (SF)';
    if (roundsFromEnd === 2) return 'Quarterfinals (QF)';
    return round.name;
  };

  return (
    <div className="flex flex-col min-w-[240px] max-w-[260px] shrink-0">
      {/* Round Header Bar */}
      <div
        className={cn(
          'mb-4 rounded-xl px-4 py-2 text-center text-xs font-bold uppercase tracking-wider shadow-sm select-none transition-transform',
          getHeaderColor()
        )}
      >
        {getRoundDisplayName()}
        <span className="block text-[10px] font-normal opacity-90 lowercase mt-0.5">
          {round.matches.length} {round.matches.length === 1 ? 'match' : 'matches'}
        </span>
      </div>

      {/* Matches Column: distributed evenly */}
      <div className="flex flex-1 flex-col justify-around py-2 gap-4">
        {round.matches.map((match) => {
          const p1 = match.p1.playerId ? playersMap.get(match.p1.playerId) || null : null;
          const p2 = match.p2.playerId ? playersMap.get(match.p2.playerId) || null : null;

          return (
            <div key={match.id} className="flex justify-center my-auto py-2">
              <MatchCard
                match={match}
                player1={p1}
                player2={p2}
                isFinal={isFinal}
                roundIndex={round.index}
                totalRounds={totalRounds}
                onClick={() => onMatchClick(match)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
