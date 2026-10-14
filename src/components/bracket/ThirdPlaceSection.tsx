import React from 'react';
import { Award, Trophy, Medal } from 'lucide-react';
import { Category, Match, Player } from '../../types';
import { MatchCard } from './MatchCard';

interface ThirdPlaceSectionProps {
  category: Category;
  playersMap: Map<string, Player>;
  onMatchClick: (match: Match) => void;
}

export const ThirdPlaceSection: React.FC<ThirdPlaceSectionProps> = ({
  category,
  playersMap,
  onMatchClick,
}) => {
  const fixture = category.fixture;
  if (!fixture || category.thirdPlaceMode === 'none') return null;

  // Bronze playoff match mode
  if (category.thirdPlaceMode === 'bronze-match' && fixture.thirdPlace) {
    const match = fixture.thirdPlace;
    const p1 = match.p1.playerId ? playersMap.get(match.p1.playerId) || null : null;
    const p2 = match.p2.playerId ? playersMap.get(match.p2.playerId) || null : null;
    const winner = match.winnerId ? playersMap.get(match.winnerId) : null;

    return (
      <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-3">
          <Medal className="h-4 w-4 text-amber-700" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Bronze Medal Playoff (3rd Place)
          </h4>
        </div>

        <div className="flex flex-col items-center">
          <MatchCard
            match={match}
            player1={p1}
            player2={p2}
            roundIndex={0}
            totalRounds={1}
            onClick={() => onMatchClick(match)}
          />

          {winner && (
            <div className="mt-2.5 flex items-center gap-1.5 px-3 py-1 bg-amber-100/80 border border-amber-300 rounded-full text-xs font-bold text-amber-950">
              <Award className="h-3.5 w-3.5 text-amber-700" />
              <span>Bronze Medalist: {winner.name}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Two bronze medals mode
  if (category.thirdPlaceMode === 'two-bronze' && fixture.twoBronze) {
    const l1 = fixture.twoBronze.loser1Id ? playersMap.get(fixture.twoBronze.loser1Id) : null;
    const l2 = fixture.twoBronze.loser2Id ? playersMap.get(fixture.twoBronze.loser2Id) : null;

    return (
      <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-3">
          <Medal className="h-4 w-4 text-amber-700" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Bronze Medalists (Semi-Final Losers)
          </h4>
        </div>

        <div className="flex items-center gap-4 flex-wrap justify-center">
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-amber-200 bg-amber-50/70 text-xs">
            <div className="h-7 w-7 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center font-bold">
              🥉
            </div>
            <div>
              <div className="font-bold text-slate-900">
                {l1 ? l1.name : <span className="text-slate-400 italic">Semi-final 1 Loser (TBD)</span>}
              </div>
              {l1?.club && <div className="text-[10px] text-slate-500">{l1.club}</div>}
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-amber-200 bg-amber-50/70 text-xs">
            <div className="h-7 w-7 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center font-bold">
              🥉
            </div>
            <div>
              <div className="font-bold text-slate-900">
                {l2 ? l2.name : <span className="text-slate-400 italic">Semi-final 2 Loser (TBD)</span>}
              </div>
              {l2?.club && <div className="text-[10px] text-slate-500">{l2.club}</div>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
