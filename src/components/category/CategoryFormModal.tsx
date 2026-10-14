import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Category, Gender, ThirdPlaceMode } from '../../types';
import { formatCategoryName } from '../../store/useTournamentStore';

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name?: string;
    ageGroup: string;
    weightMin: number | null;
    weightMax: number | null;
    gender: Gender;
    thirdPlaceMode: ThirdPlaceMode;
  }) => any;
  initialData?: Category | null;
}

const AGE_GROUPS = [
  { value: 'Under 14', label: 'Under 14' },
  { value: 'Under 17', label: 'Under 17' },
  { value: 'Under 19', label: 'Under 19' },
  { value: 'Under 23', label: 'Under 23' },
  { value: 'Senior', label: 'Senior' },
  { value: 'Custom', label: 'Custom' },
];

type WeightMode = 'under' | 'range' | 'above' | 'open';

export const CategoryFormModal: React.FC<CategoryFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [ageGroupSelect, setAgeGroupSelect] = useState('Under 19');
  const [customAgeGroup, setCustomAgeGroup] = useState('');
  const [gender, setGender] = useState<Gender>('Men / Boys');
  const [weightMode, setWeightMode] = useState<WeightMode>('under');
  const [weightMin, setWeightMin] = useState<string>('55');
  const [weightMax, setWeightMax] = useState<string>('65');
  const [thirdPlaceMode, setThirdPlaceMode] = useState<ThirdPlaceMode>('bronze-match');
  const [customName, setCustomName] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      const isKnownAge = AGE_GROUPS.some((g) => g.value === initialData.ageGroup);
      if (isKnownAge) {
        setAgeGroupSelect(initialData.ageGroup);
        setCustomAgeGroup('');
      } else {
        setAgeGroupSelect('Custom');
        setCustomAgeGroup(initialData.ageGroup);
      }
      setGender(initialData.gender === 'Women / Girls' ? 'Women / Girls' : 'Men / Boys');
      setThirdPlaceMode(initialData.thirdPlaceMode || 'bronze-match');
      setCustomName(initialData.name || '');

      if (initialData.weightMin !== null && initialData.weightMax !== null) {
        setWeightMode('range');
        setWeightMin(initialData.weightMin.toString());
        setWeightMax(initialData.weightMax.toString());
      } else if (initialData.weightMin === null && initialData.weightMax !== null) {
        setWeightMode('under');
        setWeightMax(initialData.weightMax.toString());
      } else if (initialData.weightMin !== null && initialData.weightMax === null) {
        setWeightMode('above');
        setWeightMin(initialData.weightMin.toString());
      } else {
        setWeightMode('open');
      }
    } else {
      setAgeGroupSelect('Under 19');
      setCustomAgeGroup('');
      setGender('Men / Boys');
      setWeightMode('under');
      setWeightMin('55');
      setWeightMax('55');
      setThirdPlaceMode('bronze-match');
      setCustomName('');
    }
    setError(null);
  }, [initialData, isOpen]);

  const effectiveAgeGroup = ageGroupSelect === 'Custom' ? customAgeGroup.trim() : ageGroupSelect;

  const effectiveWeightMin =
    weightMode === 'range' || weightMode === 'above'
      ? weightMin
        ? parseFloat(weightMin)
        : null
      : null;

  const effectiveWeightMax =
    weightMode === 'under' || weightMode === 'range'
      ? weightMax
        ? parseFloat(weightMax)
        : null
      : null;

  const previewName = formatCategoryName(
    effectiveAgeGroup || 'Under 19',
    effectiveWeightMin,
    effectiveWeightMax,
    gender
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!effectiveAgeGroup) {
      setError('Please select an age group.');
      return;
    }

    if (weightMode === 'range') {
      if (effectiveWeightMin === null || effectiveWeightMax === null) {
        setError('Please enter both minimum and maximum weight.');
        return;
      }
      if (effectiveWeightMax <= effectiveWeightMin) {
        setError('Maximum weight must be strictly greater than minimum weight.');
        return;
      }
    } else if (weightMode === 'under') {
      if (effectiveWeightMax === null || effectiveWeightMax <= 0) {
        setError('Please enter a valid weight limit.');
        return;
      }
    } else if (weightMode === 'above') {
      if (effectiveWeightMin === null || effectiveWeightMin <= 0) {
        setError('Please enter a valid minimum weight.');
        return;
      }
    }

    const res = onSubmit({
      name: customName.trim() || undefined,
      ageGroup: effectiveAgeGroup,
      weightMin: effectiveWeightMin,
      weightMax: effectiveWeightMax,
      gender,
      thirdPlaceMode,
    });

    if (res && res.error) {
      setError(res.error);
    } else {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Category' : 'Create Category'}
      subtitle="Age group, weight limit, and gender"
      maxWidth="lg"
      footer={
        <>
          <Button variant="outline" size="md" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" size="md" onClick={handleSubmit} type="button">
            {initialData ? 'Save Changes' : 'Create Category'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs font-semibold text-rose-700">
            {error}
          </div>
        )}

        {/* Larger Category Name Preview Tile */}
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-850 p-4 sm:p-5 text-white shadow-md border border-slate-750">
          <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
            Category Name Preview
          </div>
          <div className="text-lg sm:text-xl font-extrabold text-white mt-1 tracking-tight">
            {customName.trim() || previewName}
          </div>
        </div>

        {/* Age Group & Gender */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Select
              label="Age Group"
              value={ageGroupSelect}
              onChange={(e) => setAgeGroupSelect(e.target.value)}
              options={AGE_GROUPS}
            />
            {ageGroupSelect === 'Custom' && (
              <div className="mt-2">
                <Input
                  placeholder="e.g. Under 21"
                  value={customAgeGroup}
                  onChange={(e) => setCustomAgeGroup(e.target.value)}
                  autoFocus
                />
              </div>
            )}
          </div>

          <Select
            label="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value as Gender)}
            options={[
              { value: 'Men / Boys', label: 'Men / Boys' },
              { value: 'Women / Girls', label: 'Women / Girls' },
            ]}
          />
        </div>

        {/* Weight Category Mode: Under, Weight Range, Above, Open Weight */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Weight Category
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'under', label: 'Under' },
              { id: 'range', label: 'Weight Range' },
              { id: 'above', label: 'Above' },
              { id: 'open', label: 'Open Weight' },
            ].map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setWeightMode(mode.id as WeightMode)}
                className={`py-2 px-3 text-xs font-bold rounded-xl border text-center transition-all ${
                  weightMode === mode.id
                    ? 'bg-blue-50 border-blue-600 text-blue-700 ring-1 ring-blue-500 shadow-2xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* Weight Inputs */}
        {weightMode === 'under' && (
          <Input
            label="Under Weight (kg)"
            type="number"
            step="0.1"
            min="1"
            max="250"
            placeholder="e.g. 55"
            value={weightMax}
            onChange={(e) => setWeightMax(e.target.value)}
            required
          />
        )}

        {weightMode === 'range' && (
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Minimum Weight (kg)"
              type="number"
              step="0.1"
              min="1"
              max="250"
              placeholder="e.g. 55"
              value={weightMin}
              onChange={(e) => setWeightMin(e.target.value)}
              required
            />
            <Input
              label="Maximum Weight (kg)"
              type="number"
              step="0.1"
              min="1"
              max="250"
              placeholder="e.g. 65"
              value={weightMax}
              onChange={(e) => setWeightMax(e.target.value)}
              required
            />
          </div>
        )}

        {weightMode === 'above' && (
          <Input
            label="Above Minimum Weight (kg)"
            type="number"
            step="0.1"
            min="1"
            max="250"
            placeholder="e.g. 70"
            value={weightMin}
            onChange={(e) => setWeightMin(e.target.value)}
            required
          />
        )}

        {/* Third Place Format */}
        <Select
          label="Playoff Rule"
          value={thirdPlaceMode}
          onChange={(e) => setThirdPlaceMode(e.target.value as ThirdPlaceMode)}
          options={[
            { value: 'bronze-match', label: 'Bronze Match Play-off' },
            { value: 'two-bronze', label: 'Two Bronze Medals' },
            { value: 'none', label: 'None (Gold & Silver Only)' },
          ]}
        />

        {/* Optional Custom Display Name Override */}
        <Input
          label="Custom Name Override (Optional)"
          placeholder="Leave blank to use preview name"
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
        />
      </form>
    </Modal>
  );
};
