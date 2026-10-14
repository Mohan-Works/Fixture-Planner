import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  Edit3,
} from 'lucide-react';
import { useTournamentStore } from '../../store/useTournamentStore';
import { TournamentEditModal } from './TournamentEditModal';
import { formatDate } from '../../lib/utils';

export const Header: React.FC = () => {
  const { tournament, updateTournament } = useTournamentStore();
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-900 text-white shadow-xl border-b border-slate-800/80 print:hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between py-2 sm:py-3 gap-2.5 sm:gap-4">
            {/* Left: Brand Identity with Logo and Name moved towards the left */}
            <div className="flex items-center shrink-0">
              <Link
                to="/"
                className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
                title="TournaX"
              >
                <div className="relative">
                  <img
                    src="/logo.jpg"
                    alt="TournaX Logo"
                    className="h-9 w-9 sm:h-12 sm:w-12 rounded-xl object-cover ring-2 ring-amber-400/40 shadow-md group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
                </div>
                <div>
                  <span className="text-lg sm:text-2xl font-black tracking-tight text-white group-hover:text-amber-400 transition-colors font-sans block leading-none">
                    TournaX
                  </span>
                  <span className="text-[9px] sm:text-[11px] uppercase font-bold tracking-widest text-amber-400/90 block mt-1">
                    Fixture Planner
                  </span>
                </div>
              </Link>
            </div>

            {/* Right/Spacious Area: Tournament Details Tile (Borderless, with Pen Icon on Right) */}
            <div
              onClick={() => setIsEditOpen(true)}
              className="group relative flex-1 w-full md:max-w-2xl lg:max-w-3xl rounded-2xl bg-slate-850 hover:bg-slate-800/95 px-3.5 sm:px-5 py-2 sm:py-2.5 transition-all cursor-pointer shadow-inner md:ml-6 active:scale-[0.99] touch-manipulation border-none"
              title="Click to edit tournament name, date, location"
            >
              <div className="flex items-center justify-between gap-2.5 sm:gap-3">
                <div className="min-w-0 flex-1">
                  {/* Tournament Title */}
                  <div className="flex items-center gap-2">
                    <h1 className="text-sm sm:text-lg lg:text-xl font-extrabold text-white tracking-tight truncate group-hover:text-amber-300 transition-colors">
                      {tournament.name || 'Championship Name'}
                    </h1>
                  </div>

                  {/* Info Badges/Text */}
                  <div className="mt-0.5 sm:mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-300">
                    {tournament.date && (
                      <span className="flex items-center gap-1.5 font-medium">
                        <Calendar className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                        <span>{formatDate(tournament.date)}</span>
                      </span>
                    )}

                    <span className="flex items-center gap-1.5 font-medium truncate max-w-xs sm:max-w-md">
                      <MapPin className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                      <span className="truncate">{tournament.venue || 'Location Name'}</span>
                    </span>
                  </div>
                </div>

                {/* Just the Pen/Pencil Icon on the Right */}
                <div className="shrink-0 flex items-center">
                  <div
                    className="p-1.5 sm:p-2 rounded-xl text-slate-400 group-hover:text-amber-400 group-hover:bg-slate-750 transition-colors"
                    title="Edit Tournament"
                  >
                    <Edit3 className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Edit Tournament Modal */}
      <TournamentEditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        tournament={tournament}
        onSave={updateTournament}
      />
    </>
  );
};
