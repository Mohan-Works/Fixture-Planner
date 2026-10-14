import React, { useState, useEffect } from 'react';
import { Trophy, Calendar, MapPin, Building2, Eye, AlertTriangle } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { TournamentInfo } from '../../types';
import { formatDate } from '../../lib/utils';

interface TournamentEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  tournament: TournamentInfo;
  onSave: (info: Partial<TournamentInfo>) => void;
}

export const TournamentEditModal: React.FC<TournamentEditModalProps> = ({
  isOpen,
  onClose,
  tournament,
  onSave,
}) => {
  const [name, setName] = useState(tournament.name);
  const [date, setDate] = useState(tournament.date);
  const [venue, setVenue] = useState(tournament.venue);
  const [organizer, setOrganizer] = useState(tournament.organizer || '');

  useEffect(() => {
    if (isOpen) {
      setName(tournament.name);
      setDate(tournament.date);
      setVenue(tournament.venue);
      setOrganizer(tournament.organizer || '');
    }
  }, [isOpen, tournament]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: name.trim() || 'Championship Name',
      date,
      venue: venue.trim() || 'Location Name',
      organizer: organizer.trim(),
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Tournament Details"
      subtitle="Configure title, scheduled date, location, and organizing body"
      maxWidth="lg"
      footer={
        <>
          <Button variant="outline" size="md" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" size="md" onClick={handleSubmit} type="button">
            Save Tournament Details
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5 py-1">
        {/* Session Notice */}
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Active Session Note:</span> TournaX operates within this browser tab session. Refreshing the page, opening a new tab, or switching devices/IPs will reset all data to default values.
          </div>
        </div>

        {/* Live Preview Tile */}
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 p-4 sm:p-5 text-white border border-slate-700/80 shadow-md">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-2">
            <Eye className="h-3.5 w-3.5" />
            <span>Header Tile Live Preview</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="min-w-0">
              <h4 className="text-lg sm:text-xl font-extrabold text-white tracking-tight truncate">
                {name.trim() || 'Championship Name'}
              </h4>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-300 mt-1.5 font-medium">
                {date && (
                  <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60">
                    <Calendar className="h-3.5 w-3.5 text-amber-400" />
                    {formatDate(date)}
                  </span>
                )}
                <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60">
                  <MapPin className="h-3.5 w-3.5 text-blue-400" />
                  {venue || 'Location Name'}
                </span>
                {organizer && (
                  <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60">
                    <Building2 className="h-3.5 w-3.5 text-emerald-400" />
                    {organizer}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Championship / Tournament Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Trophy className="h-5 w-5 text-amber-500" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Championship Name"
                className="block w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 py-2.5 text-base font-semibold text-slate-900 placeholder-slate-400 shadow-xs focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Tournament Date
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Calendar className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="block w-full rounded-xl border border-slate-300 bg-white pl-10 pr-3 py-2.5 text-sm font-medium text-slate-900 shadow-xs focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Organizer / Federation
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Building2 className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={organizer}
                  onChange={(e) => setOrganizer(e.target.value)}
                  placeholder="e.g. State Sports Association"
                  className="block w-full rounded-xl border border-slate-300 bg-white pl-10 pr-3 py-2.5 text-sm font-medium text-slate-900 placeholder-slate-400 shadow-xs focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Location Name / Venue <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <MapPin className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="Location Name"
                className="block w-full rounded-xl border border-slate-300 bg-white pl-10 pr-3 py-2.5 text-sm font-medium text-slate-900 placeholder-slate-400 shadow-xs focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};
