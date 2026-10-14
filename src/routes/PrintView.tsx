import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTournamentStore } from '../store/useTournamentStore';
import { RoundColumn } from '../components/bracket/RoundColumn';
import { Connectors } from '../components/bracket/Connectors';
import { ThirdPlaceSection } from '../components/bracket/ThirdPlaceSection';
import { Button } from '../components/ui/Button';
import { Printer, ArrowLeft } from 'lucide-react';
import { formatDate } from '../lib/utils';
import { Player } from '../types';

export const PrintView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { categories, tournament } = useTournamentStore();

  const activeCategories = id
    ? categories.filter((c) => c.id === id)
    : categories.filter((c) => c.fixture !== null);

  return (
    <div className="bg-white min-h-screen p-8 text-slate-900 print:p-0">
      {/* Print Trigger bar - hidden during print */}
      <div className="mb-6 flex items-center justify-between border-b pb-4 print:hidden">
        <Link to="/">
          <Button variant="outline" size="sm" icon={<ArrowLeft className="h-4 w-4" />}>
            Back to App
          </Button>
        </Link>
        <Button
          variant="primary"
          size="sm"
          icon={<Printer className="h-4 w-4" />}
          onClick={() => window.print()}
        >
          Print Now
        </Button>
      </div>

      {activeCategories.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          No categories with active fixtures found.
        </div>
      ) : (
        activeCategories.map((category) => {
          const fixture = category.fixture;
          if (!fixture) return null;

          const playersMap = new Map<string, Player>();
          category.players.forEach((p) => playersMap.set(p.id, p));

          return (
            <div
              key={category.id}
              className="page-break mb-12 border-b border-slate-300 pb-12 print:mb-0 print:border-none print:pb-0"
              style={{ pageBreakAfter: 'always' }}
            >
              {/* Header */}
              <div className="mb-6 border-b-2 border-slate-800 pb-3 flex justify-between items-end">
                <div>
                  <h1 className="text-xl font-black uppercase tracking-wider text-slate-900">
                    {tournament.name}
                  </h1>
                  <h2 className="text-lg font-bold text-blue-700">{category.name}</h2>
                </div>
                <div className="text-right text-xs text-slate-500">
                  {tournament.venue && <div>Venue: {tournament.venue}</div>}
                  {tournament.date && <div>Date: {formatDate(tournament.date)}</div>}
                  <div>Total Players: {category.players.length}</div>
                </div>
              </div>

              {/* Bracket */}
              <div className="relative flex items-stretch gap-12 py-4 overflow-visible">
                {fixture.rounds.map((round) => (
                  <RoundColumn
                    key={round.index}
                    round={round}
                    playersMap={playersMap}
                    totalRounds={fixture.rounds.length}
                    onMatchClick={() => {}}
                  />
                ))}
              </div>

              {/* Third Place */}
              <ThirdPlaceSection
                category={category}
                playersMap={playersMap}
                onMatchClick={() => {}}
              />
            </div>
          );
        })
      )}
    </div>
  );
};
