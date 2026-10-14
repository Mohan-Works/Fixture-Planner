import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface BulkAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (names: string[], defaultClub?: string) => number;
}

export const BulkAddModal: React.FC<BulkAddModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [text, setText] = useState('');
  const [defaultClub, setDefaultClub] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const names = text
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (names.length === 0) {
      setError('Please enter at least one player name.');
      return;
    }

    const count = onAdd(names, defaultClub.trim() || undefined);
    if (count > 0) {
      setText('');
      setDefaultClub('');
      onClose();
    }
  };

  const lineCount = text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean).length;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Bulk Add Players"
      subtitle="Quickly paste a list of players (one per line)"
      maxWidth="md"
      footer={
        <>
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={lineCount === 0}
            type="button"
          >
            Add {lineCount} {lineCount === 1 ? 'Player' : 'Players'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-lg bg-rose-50 border border-rose-200 p-2.5 text-xs text-rose-700">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Player Names (1 per line)
          </label>
          <textarea
            rows={8}
            className="block w-full rounded-lg border border-slate-300 p-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
            placeholder={`Alex Johnson\nMarcus Vance\nLiam Smith\nDavid Brown\nChris Lee\nJordan Taylor`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoFocus
          />
          <div className="mt-1.5 flex justify-between text-xs text-slate-500">
            <span>Detected: {lineCount} names</span>
            <span>Duplicates in list will still be added</span>
          </div>
        </div>

        <Input
          label="Default Club / Team / State for All (Optional)"
          placeholder="e.g. City Sports Academy"
          value={defaultClub}
          onChange={(e) => setDefaultClub(e.target.value)}
        />
      </form>
    </Modal>
  );
};
