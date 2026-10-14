import { describe, it, expect, beforeEach } from 'vitest';
import { useTournamentStore } from '../../store/useTournamentStore';
import { parseJsonBackup } from '../backup';

describe('Tournament Store & Operations', () => {
  beforeEach(() => {
    useTournamentStore.getState().resetAllData();
  });

  it('adds a category and auto-formats the name', () => {
    const store = useTournamentStore.getState();
    const cat = store.addCategory({
      ageGroup: 'U19',
      weightMin: 55,
      weightMax: 65,
      gender: 'Men / Boys',
      thirdPlaceMode: 'bronze-match',
    });

    expect('id' in cat).toBe(true);
    if ('id' in cat) {
      expect(cat.name).toBe('U19 55kg to 65kg [Men / Boys]');
      expect(useTournamentStore.getState().categories.length).toBe(1);
    }
  });

  it('prevents creating duplicate category with same age, weight range, and gender', () => {
    const store = useTournamentStore.getState();
    store.addCategory({
      ageGroup: 'U19',
      weightMin: 55,
      weightMax: 65,
      gender: 'Men / Boys',
    });

    const dup = store.addCategory({
      ageGroup: 'U19',
      weightMin: 55,
      weightMax: 65,
      gender: 'Men / Boys',
    });

    expect('error' in dup).toBe(true);
    expect(useTournamentStore.getState().categories.length).toBe(1);
  });

  it('adds, updates and removes players in a category', () => {
    const store = useTournamentStore.getState();
    const cat = store.addCategory({
      ageGroup: 'U23',
      weightMin: null,
      weightMax: 57,
      gender: 'Men / Boys',
    }) as any;

    // Add player
    const res = store.addPlayer(cat.id, {
      name: 'Aman Sehrawat',
      club: 'Chhatrasal Stadium',
      weight: 57,
    });
    expect(res.error).toBeUndefined();

    let updatedCat = useTournamentStore.getState().categories.find((c) => c.id === cat.id)!;
    expect(updatedCat.players.length).toBe(1);
    const playerId = updatedCat.players[0].id;

    // Update player
    store.updatePlayer(cat.id, playerId, { club: 'Northern Railways' });
    updatedCat = useTournamentStore.getState().categories.find((c) => c.id === cat.id)!;
    expect(updatedCat.players[0].club).toBe('Northern Railways');

    // Remove player
    store.removePlayer(cat.id, playerId);
    updatedCat = useTournamentStore.getState().categories.find((c) => c.id === cat.id)!;
    expect(updatedCat.players.length).toBe(0);
  });

  it('bulk adds players successfully', () => {
    const store = useTournamentStore.getState();
    const cat = store.addCategory({
      ageGroup: 'U17',
      weightMin: null,
      weightMax: 50,
      gender: 'Women / Girls',
    }) as any;

    const names = ['Antim Panghal', 'Priya Malik', 'Komal', 'Reetika Hooda'];
    const count = store.bulkAddPlayers(cat.id, names, 'Haryana Wrestling Club');

    expect(count).toBe(4);
    const updatedCat = useTournamentStore.getState().categories.find((c) => c.id === cat.id)!;
    expect(updatedCat.players.length).toBe(4);
    expect(updatedCat.players[0].club).toBe('Haryana Wrestling Club');
  });

  it('parses and validates JSON backup format correctly', () => {
    const validJson = JSON.stringify({
      tournament: { name: 'State Trophy', date: '2026-12-01', venue: 'Stadium' },
      categories: [{ id: 'c1', name: 'U19 - 55kg', players: [], fixture: null }],
    });

    const parsed = parseJsonBackup(validJson);
    expect(parsed.tournament.name).toBe('State Trophy');
    expect(parsed.categories.length).toBe(1);

    expect(() => parseJsonBackup('invalid-json')).toThrow();
    expect(() => parseJsonBackup(JSON.stringify({ badField: true }))).toThrow();
  });
});
