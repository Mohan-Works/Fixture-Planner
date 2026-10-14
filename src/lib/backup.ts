import { Category, TournamentInfo } from '../types';

export function downloadJsonBackup(data: { tournament: TournamentInfo; categories: Category[] }): void {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const dateStr = new Date().toISOString().split('T')[0];
  a.download = `wrestling_tournament_backup_${dateStr}.json`;
  a.href = url;
  a.click();
  URL.revokeObjectURL(url);
}

export function parseJsonBackup(fileContent: string): {
  tournament: TournamentInfo;
  categories: Category[];
} {
  const parsed = JSON.parse(fileContent);
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Invalid JSON structure: Expected an object');
  }

  if (!Array.isArray(parsed.categories)) {
    throw new Error('Invalid backup file: "categories" array missing');
  }

  return {
    tournament: parsed.tournament || {
      name: 'Restored Tournament',
      date: new Date().toISOString().split('T')[0],
      venue: '',
    },
    categories: parsed.categories,
  };
}
