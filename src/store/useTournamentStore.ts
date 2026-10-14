import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { Category, Fixture, Gender, Player, ResultType, ThirdPlaceMode, TournamentInfo } from '../types';
import {
  generateFixture,
  setWinner,
  setThirdPlaceWinner,
  resetMatchResult,
} from '../lib/bracket';

// Clear residual localStorage cache so browser fresh sessions always start with defaults
if (typeof window !== 'undefined' && window.localStorage) {
  try {
    localStorage.removeItem('tournax-store-v2');
    localStorage.removeItem('tournax-store');
    localStorage.removeItem('matmaster-store-v1');
  } catch {
    // Ignore storage errors
  }
}

interface TournamentState {
  tournament: TournamentInfo;
  categories: Category[];

  // Tournament info
  updateTournament: (info: Partial<TournamentInfo>) => void;

  // Categories
  addCategory: (data: {
    name?: string;
    ageGroup: string;
    weightMin: number | null;
    weightMax: number | null;
    gender?: Gender;
    thirdPlaceMode?: ThirdPlaceMode;
  }) => Category | { error: string };
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  duplicateCategory: (id: string) => Category | { error: string };

  // Players
  addPlayer: (categoryId: string, player: Omit<Player, 'id'>) => { error?: string };
  updatePlayer: (categoryId: string, playerId: string, updates: Partial<Player>) => void;
  removePlayer: (categoryId: string, playerId: string) => void;
  bulkAddPlayers: (categoryId: string, names: string[], defaultClub?: string) => number;
  importPlayers: (categoryId: string, players: Array<Omit<Player, 'id'>>) => number;

  // Fixture
  generateCategoryFixture: (categoryId: string) => void;
  toggleLockFixture: (categoryId: string) => void;
  updateThirdPlaceMode: (categoryId: string, mode: ThirdPlaceMode) => void;
  recordMatchResult: (
    categoryId: string,
    matchId: string,
    winnerId: string,
    score1?: number,
    score2?: number,
    resultType?: ResultType
  ) => void;
  resetCategoryMatch: (categoryId: string, matchId: string) => void;
  resetCategoryFixture: (categoryId: string) => void;

  // Backup & Reset
  importState: (data: { tournament: TournamentInfo; categories: Category[] }) => void;
  resetAllData: () => void;
  loadDemoData: () => void;
}

export function formatCategoryName(
  ageGroup: string,
  weightMin: number | null,
  weightMax: number | null,
  gender?: string
): string {
  let weightStr = '';
  if (weightMin === null && weightMax !== null) {
    weightStr = `Under ${weightMax}kg`;
  } else if (weightMin !== null && weightMax === null) {
    weightStr = `Above ${weightMin}kg`;
  } else if (weightMin !== null && weightMax !== null) {
    weightStr = `${weightMin}kg to ${weightMax}kg`;
  } else {
    weightStr = 'Open Weight';
  }

  const genderStr = gender ? ` [${gender}]` : '';
  return `${ageGroup} ${weightStr}${genderStr}`.trim();
}

export const DEFAULT_TOURNAMENT: TournamentInfo = {
  name: 'Championship Name',
  date: new Date().toISOString().split('T')[0],
  venue: 'Location Name',
  organizer: 'Tournament Organizer',
};

export const useTournamentStore = create<TournamentState>()((set, get) => ({
  tournament: { ...DEFAULT_TOURNAMENT },
  categories: [],

      updateTournament: (info) =>
        set((state) => ({
          tournament: { ...state.tournament, ...info },
        })),

      addCategory: (data) => {
        const { categories } = get();
        const autoName = formatCategoryName(data.ageGroup, data.weightMin, data.weightMax, data.gender);
        const name = data.name?.trim() ? data.name.trim() : autoName;

        // Check for duplicate category (same age + weight + gender)
        const isDuplicate = categories.some(
          (c) =>
            c.ageGroup.toLowerCase() === data.ageGroup.toLowerCase() &&
            c.weightMin === data.weightMin &&
            c.weightMax === data.weightMax &&
            c.gender === data.gender
        );

        if (isDuplicate) {
          return { error: 'A category with the exact same age group, weight class, and gender already exists.' };
        }

        const newCategory: Category = {
          id: nanoid(),
          name,
          ageGroup: data.ageGroup,
          weightMin: data.weightMin,
          weightMax: data.weightMax,
          gender: data.gender || 'Men / Boys',
          thirdPlaceMode: data.thirdPlaceMode || 'bronze-match',
          players: [],
          fixture: null,
          createdAt: Date.now(),
        };

        set((state) => ({
          categories: [...state.categories, newCategory],
        }));

        return newCategory;
      },

      updateCategory: (id, updates) =>
        set((state) => ({
          categories: state.categories.map((c) => {
            if (c.id !== id) return c;
            const updated = { ...c, ...updates };
            // If age or weight or gender changed and name wasn't explicitly provided, update name
            if (
              (updates.ageGroup !== undefined ||
                updates.weightMin !== undefined ||
                updates.weightMax !== undefined ||
                updates.gender !== undefined) &&
              !updates.name
            ) {
              updated.name = formatCategoryName(
                updated.ageGroup,
                updated.weightMin,
                updated.weightMax,
                updated.gender
              );
            }
            return updated;
          }),
        })),

      deleteCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
        })),

      duplicateCategory: (id) => {
        const cat = get().categories.find((c) => c.id === id);
        if (!cat) return { error: 'Category not found' };

        const newCategory: Category = {
          ...cat,
          id: nanoid(),
          name: `${cat.name} (Copy)`,
          fixture: null, // do not copy fixture
          players: cat.players.map((p) => ({ ...p, id: nanoid() })),
          createdAt: Date.now(),
        };

        set((state) => ({
          categories: [...state.categories, newCategory],
        }));

        return newCategory;
      },

      addPlayer: (categoryId, player) => {
        const cat = get().categories.find((c) => c.id === categoryId);
        if (!cat) return { error: 'Category not found' };
        if (cat.fixture) {
          return { error: 'Cannot add players while fixture is active. Reset fixture first.' };
        }

        // Check duplicate name in same category
        const trimmedName = player.name.trim();
        if (!trimmedName) return { error: 'Player name is required.' };

        const newPlayer: Player = {
          id: nanoid(),
          name: trimmedName,
          club: player.club?.trim() || undefined,
          weight: player.weight ? Number(player.weight) : undefined,
          dob: player.dob?.trim() || undefined,
        };

        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === categoryId ? { ...c, players: [...c.players, newPlayer] } : c
          ),
        }));

        return {};
      },

      updatePlayer: (categoryId, playerId, updates) =>
        set((state) => ({
          categories: state.categories.map((c) => {
            if (c.id !== categoryId || c.fixture) return c;
            return {
              ...c,
              players: c.players.map((p) => (p.id === playerId ? { ...p, ...updates } : p)),
            };
          }),
        })),

      removePlayer: (categoryId, playerId) =>
        set((state) => ({
          categories: state.categories.map((c) => {
            if (c.id !== categoryId || c.fixture) return c;
            return {
              ...c,
              players: c.players.filter((p) => p.id !== playerId),
            };
          }),
        })),

      bulkAddPlayers: (categoryId, names, defaultClub) => {
        const cat = get().categories.find((c) => c.id === categoryId);
        if (!cat || cat.fixture) return 0;

        const newPlayers: Player[] = names
          .map((n) => n.trim())
          .filter((n) => n.length > 0)
          .map((name) => ({
            id: nanoid(),
            name,
            club: defaultClub?.trim() || undefined,
          }));

        if (newPlayers.length === 0) return 0;

        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === categoryId ? { ...c, players: [...c.players, ...newPlayers] } : c
          ),
        }));

        return newPlayers.length;
      },

      importPlayers: (categoryId, playersList) => {
        const cat = get().categories.find((c) => c.id === categoryId);
        if (!cat || cat.fixture) return 0;

        const validPlayers: Player[] = playersList
          .filter((p) => p.name && p.name.trim())
          .map((p) => ({
            id: nanoid(),
            name: p.name.trim(),
            club: p.club?.trim(),
            weight: p.weight ? Number(p.weight) : undefined,
            dob: p.dob?.trim(),
          }));

        if (validPlayers.length === 0) return 0;

        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === categoryId ? { ...c, players: [...c.players, ...validPlayers] } : c
          ),
        }));

        return validPlayers.length;
      },

      generateCategoryFixture: (categoryId) => {
        const cat = get().categories.find((c) => c.id === categoryId);
        if (!cat || cat.players.length < 2) return;

        const fixture = generateFixture(cat.players, cat.thirdPlaceMode);

        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === categoryId ? { ...c, fixture } : c
          ),
        }));
      },

      toggleLockFixture: (categoryId) =>
        set((state) => ({
          categories: state.categories.map((c) => {
            if (c.id !== categoryId || !c.fixture) return c;
            return {
              ...c,
              fixture: { ...c.fixture, locked: !c.fixture.locked },
            };
          }),
        })),

      updateThirdPlaceMode: (categoryId, mode) =>
        set((state) => ({
          categories: state.categories.map((c) => {
            if (c.id !== categoryId) return c;
            return { ...c, thirdPlaceMode: mode };
          }),
        })),

      recordMatchResult: (categoryId, matchId, winnerId, score1, score2, resultType) =>
        set((state) => ({
          categories: state.categories.map((c) => {
            if (c.id !== categoryId || !c.fixture) return c;

            // Deep clone fixture to mutate cleanly
            const fixtureCopy: Fixture = JSON.parse(JSON.stringify(c.fixture));

            // Is it the third-place match?
            if (fixtureCopy.thirdPlace && fixtureCopy.thirdPlace.id === matchId) {
              setThirdPlaceWinner(fixtureCopy, winnerId, score1, score2, resultType);
            } else {
              // Find the match in rounds
              for (const round of fixtureCopy.rounds) {
                const match = round.matches.find((m) => m.id === matchId);
                if (match) {
                  setWinner(fixtureCopy, match, winnerId, score1, score2, resultType);
                  break;
                }
              }
            }

            return { ...c, fixture: fixtureCopy };
          }),
        })),

      resetCategoryMatch: (categoryId, matchId) =>
        set((state) => ({
          categories: state.categories.map((c) => {
            if (c.id !== categoryId || !c.fixture) return c;
            const fixtureCopy: Fixture = JSON.parse(JSON.stringify(c.fixture));
            resetMatchResult(fixtureCopy, matchId);
            return { ...c, fixture: fixtureCopy };
          }),
        })),

      resetCategoryFixture: (categoryId) =>
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === categoryId ? { ...c, fixture: null } : c
          ),
        })),

      importState: (data) =>
        set({
          tournament: data.tournament || DEFAULT_TOURNAMENT,
          categories: data.categories || [],
        }),

      resetAllData: () =>
        set({
          tournament: { ...DEFAULT_TOURNAMENT },
          categories: [],
        }),

      loadDemoData: () => {
        const u19Players: Player[] = [
          { id: nanoid(), name: 'Aman Sehrawat', club: 'Chhatrasal Stadium, Delhi', weight: 57 },
          { id: nanoid(), name: 'Ravi Kumar Dahiya', club: 'Northern Railway', weight: 57 },
          { id: nanoid(), name: 'Udit Kumar', club: 'Haryana Police', weight: 57 },
          { id: nanoid(), name: 'Shubham', club: 'Services Sports Control', weight: 56.8 },
          { id: nanoid(), name: 'Rahul Rathi', club: 'Delhi Wrestling Academy', weight: 57 },
          { id: nanoid(), name: 'Akash Dahiya', club: 'Guru Hanuman Akhada', weight: 56.5 },
          { id: nanoid(), name: 'Vicky Chahar', club: 'Punjab Police', weight: 57 },
          { id: nanoid(), name: 'Sumit Malik', club: 'Railway Sports Board', weight: 56.9 },
          { id: nanoid(), name: 'Naveen Malik', club: 'Air Force Sports', weight: 57 },
          { id: nanoid(), name: 'Deepak Punia', club: 'Services', weight: 57 },
          { id: nanoid(), name: 'Praveen Chahar', club: 'UP Police', weight: 56.2 },
        ];

        const u23Players: Player[] = [
          { id: nanoid(), name: 'Bajrang Punia', club: 'Railways', weight: 65 },
          { id: nanoid(), name: 'Sujeet Kalkal', club: 'Haryana', weight: 65 },
          { id: nanoid(), name: 'Rohit Singh', club: 'Services', weight: 65 },
          { id: nanoid(), name: 'Vishal Kaliraman', club: 'Army Sports', weight: 64.8 },
          { id: nanoid(), name: 'Anuj Kumar', club: 'Delhi', weight: 65 },
          { id: nanoid(), name: 'Mohit Kumar', club: 'Haryana Police', weight: 64.9 },
          { id: nanoid(), name: 'Sachin Mor', club: 'CRPF', weight: 65 },
          { id: nanoid(), name: 'Sonu', club: 'Chandigarh', weight: 65 },
        ];

        const cat1Fixture = generateFixture(u19Players, 'bronze-match');
        const cat2Fixture = generateFixture(u23Players, 'two-bronze');

        const demoCategories: Category[] = [
          {
            id: nanoid(),
            name: 'U19 Under 57kg [Men / Boys]',
            ageGroup: 'U19',
            weightMin: null,
            weightMax: 57,
            gender: 'Men / Boys',
            thirdPlaceMode: 'bronze-match',
            players: u19Players,
            fixture: cat1Fixture,
            createdAt: Date.now() - 3600000 * 2,
          },
          {
            id: nanoid(),
            name: 'U23 55kg to 65kg [Men / Boys]',
            ageGroup: 'U23',
            weightMin: 55,
            weightMax: 65,
            gender: 'Men / Boys',
            thirdPlaceMode: 'two-bronze',
            players: u23Players,
            fixture: cat2Fixture,
            createdAt: Date.now() - 3600000,
          },
          {
            id: nanoid(),
            name: 'U17 Under 50kg [Women / Girls]',
            ageGroup: 'U17',
            weightMin: null,
            weightMax: 50,
            gender: 'Women / Girls',
            thirdPlaceMode: 'bronze-match',
            players: [
              { id: nanoid(), name: 'Antim Panghal', club: 'Hisar, Haryana', weight: 49.5 },
              { id: nanoid(), name: 'Priya Malik', club: 'Nidani, Haryana', weight: 50 },
              { id: nanoid(), name: 'Komal', club: 'Meerut, UP', weight: 49 },
              { id: nanoid(), name: 'Reetika Hooda', club: 'Rohtak, Haryana', weight: 50 },
              { id: nanoid(), name: 'Savita Mor', club: 'Delhi', weight: 49.8 },
            ],
            fixture: null,
            createdAt: Date.now(),
          },
        ];

        set({
          tournament: {
            name: 'Championship Name',
            date: new Date().toISOString().split('T')[0],
            venue: 'Location Name',
            organizer: 'Tournament Organizer',
          },
          categories: demoCategories,
        });
      },
    }));
