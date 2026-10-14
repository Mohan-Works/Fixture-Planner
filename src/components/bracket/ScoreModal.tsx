import React, { useState, useEffect } from 'react';
import { Trophy, Award, Check, RotateCcw } from 'lucide-react';
import { Match, Player, ResultType } from '../../types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { RESULT_TYPES } from '../../lib/utils';
import { ConfirmModal } from '../ui/ConfirmModal';

interface ScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: Match;
  player1: Player | null;
  player2: Player | null;
  roundName: string;
  hasDownstreamResults: boolean;
  onSaveResult: (winnerId: string, score1?: number, score2?: number, resultType?: ResultType) => void;
  onResetMatch: () => void;
}

export const ScoreModal: React.FC<ScoreModalProps> = ({
  isOpen,
  onClose,
  match,
  player1,
  player2,
  roundName,
  hasDownstreamResults,
  onSaveResult,
  onResetMatch,
}) => {
  const [selectedWinnerId, setSelectedWinnerId] = useState<string>('');
  const [score1, setScore1] = useState<string>('');
  const [score2, setScore2] = useState<string>('');
  const [resultType, setResultType] = useState<ResultType>('points');
  const [error, setError] = useState<string | null>(null);
  const [isConfirmCascadeOpen, setIsConfirmCascadeOpen] = useState(false);

  useEffect(() => {
    if (match) {
      setSelectedWinnerId(match.winnerId || '');
      setScore1(match.score1 !== undefined ? match.score1.toString() : '');
      setScore2(match.score2 !== undefined ? match.score2.toString() : '');
      setResultType(match.resultType || 'points');
      setError(null);
    }
  }, [match, isOpen]);

  // When scores are typed, automatically suggest winner if valid
  const handleScore1Change = (val: string) => {
    setScore1(val);
    setError(null);
    const s1 = parseFloat(val);
    const s2 = parseFloat(score2);
    if (!isNaN(s1) && !isNaN(s2) && player1 && player2) {
      if (s1 > s2) setSelectedWinnerId(player1.id);
      else if (s2 > s1) setSelectedWinnerId(player2.id);
    }
  };

  const handleScore2Change = (val: string) => {
    setScore2(val);
    setError(null);
    const s1 = parseFloat(score1);
    const s2 = parseFloat(val);
    if (!isNaN(s1) && !isNaN(s2) && player1 && player2) {
      if (s1 > s2) setSelectedWinnerId(player1.id);
      else if (s2 > s1) setSelectedWinnerId(player2.id);
    }
  };

  const executeSave = () => {
    const s1 = score1 !== '' ? parseFloat(score1) : undefined;
    const s2 = score2 !== '' ? parseFloat(score2) : undefined;
    onSaveResult(selectedWinnerId, s1, s2, resultType);
    onClose();
  };

  const handleSaveClick = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!selectedWinnerId) {
      setError('Please select a match winner.');
      return;
    }

    const s1 = score1 !== '' ? parseFloat(score1) : undefined;
    const s2 = score2 !== '' ? parseFloat(score2) : undefined;

    // Wrestling rules: cannot have equal points without designated winner
    if (s1 !== undefined && s2 !== undefined && s1 === s2 && resultType === 'points') {
      setError('Scores cannot be tied in a match. Please adjust points or select result decision.');
      return;
    }

    // Check downstream warning: if changing winner in a match that already fed played downstream matches
    const isChangingWinner = match.winnerId && match.winnerId !== selectedWinnerId;
    if (isChangingWinner && hasDownstreamResults) {
      setIsConfirmCascadeOpen(true);
      return;
    }

    executeSave();
  };

  const p1Name = player1 ? player1.name : match.p1.isBye ? 'BYE' : 'TBD';
  const p2Name = player2 ? player2.name : match.p2.isBye ? 'BYE' : 'TBD';

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={match.isThirdPlace ? 'Bronze Medal Playoff' : roundName}
        subtitle={`Match #${match.index + 1} Result Entry`}
        maxWidth="md"
        footer={
          <div className="flex items-center justify-between w-full">
            <div>
              {match.status === 'done' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    onResetMatch();
                    onClose();
                  }}
                  className="text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                  icon={<RotateCcw className="h-3.5 w-3.5" />}
                >
                  Reset Match
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={onClose} type="button">
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSaveClick}
                disabled={!selectedWinnerId}
                type="button"
              >
                Save Result & Advance
              </Button>
            </div>
          </div>
        }
      >
        <form onSubmit={handleSaveClick} className="space-y-5">
          {error && (
            <div className="rounded-lg bg-rose-50 border border-rose-200 p-2.5 text-xs text-rose-700">
              {error}
            </div>
          )}

          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 text-center">
            Click player to designate winner or enter scores below
          </div>

          {/* Player Selection Cards */}
          <div className="space-y-3">
            {/* Player 1 */}
            <div
              onClick={() => player1 && setSelectedWinnerId(player1.id)}
              className={`cursor-pointer relative flex items-center justify-between p-3.5 rounded-xl border-2 transition-all ${
                selectedWinnerId === player1?.id
                  ? 'border-blue-600 bg-blue-50/70 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              } ${!player1 ? 'opacity-50 pointer-events-none' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-bold ${
                    selectedWinnerId === player1?.id
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-slate-300 text-slate-500'
                  }`}
                >
                  {selectedWinnerId === player1?.id ? <Check className="h-4 w-4" /> : '1'}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{p1Name}</div>
                  {player1?.club && <div className="text-xs text-slate-500">{player1.club}</div>}
                </div>
              </div>

              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <label className="text-[11px] font-bold text-slate-400 uppercase">Points:</label>
                <input
                  type="number"
                  min="0"
                  max="99"
                  value={score1}
                  onChange={(e) => handleScore1Change(e.target.value)}
                  className="w-16 rounded-lg border border-slate-300 py-1.5 px-2 text-center text-sm font-bold text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="text-center font-bold text-xs uppercase text-slate-400 my-1">vs</div>

            {/* Player 2 */}
            <div
              onClick={() => player2 && setSelectedWinnerId(player2.id)}
              className={`cursor-pointer relative flex items-center justify-between p-3.5 rounded-xl border-2 transition-all ${
                selectedWinnerId === player2?.id
                  ? 'border-blue-600 bg-blue-50/70 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              } ${!player2 ? 'opacity-50 pointer-events-none' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-bold ${
                    selectedWinnerId === player2?.id
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-slate-300 text-slate-500'
                  }`}
                >
                  {selectedWinnerId === player2?.id ? <Check className="h-4 w-4" /> : '2'}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{p2Name}</div>
                  {player2?.club && <div className="text-xs text-slate-500">{player2.club}</div>}
                </div>
              </div>

              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <label className="text-[11px] font-bold text-slate-400 uppercase">Points:</label>
                <input
                  type="number"
                  min="0"
                  max="99"
                  value={score2}
                  onChange={(e) => handleScore2Change(e.target.value)}
                  className="w-16 rounded-lg border border-slate-300 py-1.5 px-2 text-center text-sm font-bold text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Victory Decision Type */}
          <Select
            label="Method of Victory (Decision Type)"
            value={resultType}
            onChange={(e) => setResultType(e.target.value as ResultType)}
            options={RESULT_TYPES.map((rt) => ({
              value: rt.value,
              label: `${rt.label} (${rt.code})`,
            }))}
            helperText="Official tournament victory classification criteria."
          />
        </form>
      </Modal>

      {/* Downstream Reset Confirmation */}
      <ConfirmModal
        isOpen={isConfirmCascadeOpen}
        onClose={() => setIsConfirmCascadeOpen(false)}
        onConfirm={executeSave}
        title="Warning: Downstream Matches Will Reset"
        variant="danger"
        confirmText="Change Winner & Reset Later Rounds"
        description="Matches in subsequent rounds that depend on this result have already been completed. Changing the winner will clear those downstream match results and require them to be replayed. Do you wish to continue?"
      />
    </>
  );
};
