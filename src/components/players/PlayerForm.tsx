import React, { useState } from 'react';
import { UserPlus, Shield, Scale, Calendar } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface PlayerFormProps {
  onAdd: (player: { name: string; club?: string; weight?: number; dob?: string }) => { error?: string };
  disabled?: boolean;
}

export const PlayerForm: React.FC<PlayerFormProps> = ({ onAdd, disabled }) => {
  const [name, setName] = useState('');
  const [club, setClub] = useState('');
  const [weight, setWeight] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = name.trim();
    if (!trimmed) {
      setError('Player name is required.');
      return;
    }

    const res = onAdd({
      name: trimmed,
      club: club.trim() || undefined,
      weight: weight ? parseFloat(weight) : undefined,
      dob: dob.trim() || undefined,
    });

    if (res && res.error) {
      setError(res.error);
    } else {
      setName('');
      setClub('');
      setWeight('');
      setDob('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-shadow"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
          <UserPlus className="h-4 w-4" />
        </div>
        <h4 className="text-sm font-bold text-slate-900">Add Player to Roster</h4>
      </div>

      {error && (
        <div className="mb-3 rounded-lg bg-rose-50 border border-rose-200 p-2.5 text-xs text-rose-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <Input
          label="Player Name"
          placeholder="e.g. Alex Johnson (Compulsory)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={disabled}
          required
        />
        <Input
          label="Club / Team (Optional)"
          placeholder="Club, Team, or City"
          value={club}
          onChange={(e) => setClub(e.target.value)}
          leftIcon={<Shield className="h-4 w-4" />}
          disabled={disabled}
        />
        <Input
          label="Weight (Optional)"
          placeholder="Weight in kg"
          type="number"
          step="0.1"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          leftIcon={<Scale className="h-4 w-4" />}
          disabled={disabled}
        />
        <Input
          label="Age / DOB (Optional)"
          placeholder="Age or Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          leftIcon={<Calendar className="h-4 w-4" />}
          disabled={disabled}
        />
      </div>

      <div className="mt-3 flex justify-end">
        <Button
          type="submit"
          variant="primary"
          size="sm"
          disabled={disabled || !name.trim()}
          icon={<UserPlus className="h-3.5 w-3.5" />}
        >
          Add Player
        </Button>
      </div>
    </form>
  );
};
