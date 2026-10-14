import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ResultType } from '../types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export const RESULT_TYPES: Array<{
  value: ResultType;
  label: string;
  code: string;
  description: string;
}> = [
  { value: 'points', label: 'Points Decision', code: 'PTS', description: 'Won by points at match completion' },
  { value: 'tech', label: 'Technical Superiority / Gap', code: 'TECH', description: 'Point difference or dominance limit reached' },
  { value: 'fall', label: 'Stoppage / Knockout / Pin', code: 'STOP', description: 'Match-ending decisive finish' },
  { value: 'walkover', label: 'Walkover / Forfeit', code: 'W/O', description: 'Opponent conceded or did not contest' },
  { value: 'dq', label: 'Disqualification', code: 'DSQ', description: 'Disqualified for violation or penalties' },
];

export function getResultLabel(type?: ResultType): string {
  if (!type) return '';
  const match = RESULT_TYPES.find((r) => r.value === type);
  return match ? `${match.label} (${match.code})` : type;
}
