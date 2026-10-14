import React, { useState } from 'react';
import {
  Users,
  Search,
  Trash2,
  Edit2,
  Lock,
  AlertTriangle,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { Player } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { ConfirmModal } from '../ui/ConfirmModal';

interface PlayerListProps {
  players: Player[];
  isFixtureActive: boolean;
  onUpdatePlayer: (playerId: string, updates: Partial<Player>) => void;
  onRemovePlayer: (playerId: string) => void;
  onResetFixture: () => void;
  onOpenBulkAdd: () => void;
  onOpenCsvImport: () => void;
}

export const PlayerList: React.FC<PlayerListProps> = ({
  players,
  isFixtureActive,
  onUpdatePlayer,
  onRemovePlayer,
  onResetFixture,
  onOpenBulkAdd,
  onOpenCsvImport,
}) => {
  const [search, setSearch] = useState('');
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [editName, setEditName] = useState('');
  const [editClub, setEditClub] = useState('');
  const [editWeight, setEditWeight] = useState('');
  const [editDob, setEditDob] = useState('');
  const [playerToDelete, setPlayerToDelete] = useState<Player | null>(null);

  const filteredPlayers = players.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      (p.club && p.club.toLowerCase().includes(q))
    );
  });

  const [editError, setEditError] = useState<string | null>(null);

  const handleStartEdit = (player: Player) => {
    setEditingPlayer(player);
    setEditName(player.name);
    setEditClub(player.club || '');
    setEditWeight(player.weight ? player.weight.toString() : '');
    setEditDob(player.dob || '');
    setEditError(null);
  };

  const handleSaveEdit = () => {
    if (!editingPlayer) return;
    if (!editName.trim()) {
      setEditError('Player name is compulsory.');
      return;
    }
    onUpdatePlayer(editingPlayer.id, {
      name: editName.trim(),
      club: editClub.trim() || undefined,
      weight: editWeight ? parseFloat(editWeight) : undefined,
      dob: editDob.trim() || undefined,
    });
    setEditingPlayer(null);
  };

  return (
    <div className="space-y-4">
      {/* Alert Banners */}
      {isFixtureActive && (
        <div className="flex items-center justify-between rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-900 shadow-2xs">
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5 text-amber-600 shrink-0" />
            <div>
              <h5 className="text-sm font-bold">Roster Locked During Active Fixture</h5>
              <p className="text-xs text-amber-700 mt-0.5">
                Players cannot be added, edited, or removed while a bracket is generated.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onResetFixture}
            className="border-amber-300 bg-white hover:bg-amber-100/50 text-amber-900 shrink-0"
            icon={<RotateCcw className="h-3.5 w-3.5" />}
          >
            Reset Fixture to Edit
          </Button>
        </div>
      )}

      {players.length < 2 && !isFixtureActive && (
        <div className="flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50/70 p-4 text-blue-900 shadow-2xs">
          <AlertTriangle className="h-5 w-5 text-blue-600 shrink-0" />
          <div className="text-xs">
            <span className="font-bold">Need at least 2 players to generate a bracket.</span>{' '}
            Add players using the form above, or click Bulk Add to paste a list.
          </div>
        </div>
      )}

      {/* Roster Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700 font-bold text-xs">
              {players.length}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Registered Players</h3>
              <p className="text-[11px] text-slate-500">
                {players.length === 1 ? '1 player registered' : `${players.length} players registered`}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative min-w-[160px] sm:min-w-[200px]">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search roster..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50 focus:bg-white"
            />
          </div>

          {!isFixtureActive && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={onOpenBulkAdd}
                className="text-xs"
                icon={<Users className="h-3.5 w-3.5" />}
              >
                Bulk Add
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onOpenCsvImport}
                className="text-xs"
                icon={<Sparkles className="h-3.5 w-3.5" />}
              >
                CSV Import
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Roster Table */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs">
        {filteredPlayers.length === 0 ? (
          <div className="py-12 text-center text-slate-400">
            <Users className="h-10 w-10 mx-auto text-slate-300 mb-2 stroke-[1.5]" />
            <p className="text-sm font-medium text-slate-600">
              {players.length === 0 ? 'No players added yet' : 'No players match your search'}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {players.length === 0
                ? 'Use the form above to add participants to this division.'
                : 'Try clearing the search query.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 w-12 text-center">#</th>
                  <th className="px-4 py-3">Player Name</th>
                  <th className="px-4 py-3">Club / Team / State</th>
                  <th className="px-4 py-3">Weight / Rating</th>
                  <th className="px-4 py-3">DOB / Age</th>
                  {!isFixtureActive && <th className="px-4 py-3 text-right">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPlayers.map((player, index) => (
                  <tr key={player.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3 text-center text-xs font-semibold text-slate-400">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-900">
                      {player.name}
                    </td>
                    <td className="px-4 py-3 text-slate-600 text-xs">
                      {player.club ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                          {player.club}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-600 text-xs">
                      {player.weight ? (
                        <span className="font-medium text-slate-800">{player.weight} kg</span>
                      ) : (
                        <span className="text-slate-400 italic">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-600 text-xs">
                      {player.dob || <span className="text-slate-400 italic">—</span>}
                    </td>
                    {!isFixtureActive && (
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleStartEdit(player)}
                            className="p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            title="Edit player"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => setPlayerToDelete(player)}
                            className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Remove player"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Player Modal */}
      {editingPlayer && (
        <Modal
          isOpen={true}
          onClose={() => setEditingPlayer(null)}
          title="Edit Player Information"
          maxWidth="sm"
          footer={
            <>
              <Button variant="outline" onClick={() => setEditingPlayer(null)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSaveEdit}>
                Save Changes
              </Button>
            </>
          }
        >
          <div className="space-y-3">
            {editError && (
              <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 font-semibold">
                {editError}
              </div>
            )}
            <Input
              label="Player Name"
              value={editName}
              onChange={(e) => {
                setEditName(e.target.value);
                setEditError(null);
              }}
              required
              autoFocus
            />
            <Input
              label="Club / Team / State"
              value={editClub}
              onChange={(e) => setEditClub(e.target.value)}
            />
            <Input
              label="Weight (kg) or Rating"
              type="number"
              step="0.1"
              value={editWeight}
              onChange={(e) => setEditWeight(e.target.value)}
            />
            <Input
              label="DOB / Age"
              value={editDob}
              onChange={(e) => setEditDob(e.target.value)}
            />
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {playerToDelete && (
        <ConfirmModal
          isOpen={true}
          onClose={() => setPlayerToDelete(null)}
          onConfirm={() => {
            onRemovePlayer(playerToDelete.id);
            setPlayerToDelete(null);
          }}
          title={`Remove "${playerToDelete.name}"?`}
          description="Are you sure you want to remove this player from the roster?"
          confirmText="Remove Player"
          variant="danger"
        />
      )}
    </div>
  );
};
