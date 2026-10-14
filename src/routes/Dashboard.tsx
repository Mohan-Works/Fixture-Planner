import React, { useState, useMemo } from 'react';
import {
  Plus,
  Trophy,
  Users,
  GitBranch,
  CheckCircle2,
  Search,
  Calendar,
  MapPin,
  Shield,
  Layers,
} from 'lucide-react';
import { useTournamentStore } from '../store/useTournamentStore';
import { CategoryCard } from '../components/category/CategoryCard';
import { CategoryFormModal } from '../components/category/CategoryFormModal';
import { Button } from '../components/ui/Button';
import { formatDate } from '../lib/utils';

export const Dashboard: React.FC = () => {
  const { categories, tournament, addCategory } = useTournamentStore();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [ageFilter, setAgeFilter] = useState('ALL');
  const [genderFilter, setGenderFilter] = useState('ALL');

  // Stats calculation
  const totalPlayers = useMemo(() => {
    return categories.reduce((sum, c) => sum + c.players.length, 0);
  }, [categories]);

  const drawnCount = useMemo(() => {
    return categories.filter((c) => c.fixture !== null).length;
  }, [categories]);

  const completedCount = useMemo(() => {
    return categories.filter((c) => {
      if (!c.fixture || c.fixture.rounds.length === 0) return false;
      const finalMatch = c.fixture.rounds[c.fixture.rounds.length - 1].matches[0];
      return finalMatch && finalMatch.status === 'done' && finalMatch.winnerId;
    }).length;
  }, [categories]);

  const availableAgeGroups = useMemo(() => {
    const set = new Set<string>();
    categories.forEach((c) => set.add(c.ageGroup));
    return Array.from(set);
  }, [categories]);

  const filteredCategories = useMemo(() => {
    return categories.filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.ageGroup.toLowerCase().includes(search.toLowerCase()) ||
        (c.gender && c.gender.toLowerCase().includes(search.toLowerCase()));

      const matchAge = ageFilter === 'ALL' || c.ageGroup === ageFilter;
      const matchGender =
        genderFilter === 'ALL' ||
        c.gender === genderFilter ||
        (genderFilter === 'Men / Boys' && (c.gender === 'Men / Boys' || (c.gender as any) === 'Men')) ||
        (genderFilter === 'Women / Girls' && (c.gender === 'Women / Girls' || (c.gender as any) === 'Women'));

      return matchSearch && matchAge && matchGender;
    });
  }, [categories, search, ageFilter, genderFilter]);

  return (
    <div className="space-y-7">
      {/* Hero Overview Banner (Championship Overview removed) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 p-6 sm:p-8 text-white shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              {tournament.name || 'Championship Name'}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs sm:text-sm text-slate-300">
              {tournament.date && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-amber-400" />
                  <span>{formatDate(tournament.date)}</span>
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span>{tournament.venue || 'Location Name'}</span>
              </span>
              {tournament.organizer && (
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Shield className="h-4 w-4 text-emerald-400" />
                  {tournament.organizer}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="gold"
              size="lg"
              className="font-bold shadow-lg shadow-amber-500/20"
              icon={<Plus className="h-5 w-5" />}
              onClick={() => setIsAddOpen(true)}
            >
              Create Category
            </Button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Total Categories
              </div>
              <div className="text-3xl font-black text-slate-900 mt-1">{categories.length}</div>
            </div>
            <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100">
              <Layers className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-3 text-[11px] text-slate-500 font-medium flex items-center gap-1">
            <span>Age & weight groups</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Registered Players
              </div>
              <div className="text-3xl font-black text-slate-900 mt-1">{totalPlayers}</div>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <Users className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-3 text-[11px] text-slate-500 font-medium flex items-center gap-1">
            <span>Across all rosters</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Brackets Drawn
              </div>
              <div className="text-3xl font-black text-slate-900 mt-1">{drawnCount}</div>
            </div>
            <div className="p-3 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100">
              <GitBranch className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-3 text-[11px] text-slate-500 font-medium flex items-center gap-1">
            <span>{categories.length - drawnCount} pending draw</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Completed Finals
              </div>
              <div className="text-3xl font-black text-slate-900 mt-1">{completedCount}</div>
            </div>
            <div className="p-3 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100">
              <CheckCircle2 className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-3 text-[11px] text-slate-500 font-medium flex items-center gap-1">
            <span>Championships decided</span>
          </div>
        </div>
      </div>

      {/* Categories Section Header & Search/Filter Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Tournament Categories</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage player rosters and knockout brackets.
            </p>
          </div>

          <div className="text-xs font-semibold text-slate-500">
            Showing {filteredCategories.length} of {categories.length} categories
          </div>
        </div>

        {/* Filter Bar */}
        {categories.length > 0 && (
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="relative min-w-[240px] sm:min-w-[300px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by category name, age, or weight..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50 focus:bg-white transition-all font-medium"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Gender Filter (Only Men / Boys and Women / Girls) */}
              <div className="flex items-center rounded-xl bg-slate-100 p-1">
                {[
                  { value: 'ALL', label: 'All' },
                  { value: 'Men / Boys', label: 'Men / Boys' },
                  { value: 'Women / Girls', label: 'Women / Girls' },
                ].map((g) => (
                  <button
                    key={g.value}
                    onClick={() => setGenderFilter(g.value)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                      genderFilter === g.value
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>

              {/* Age Group Filter */}
              {availableAgeGroups.length > 0 && (
                <div className="flex items-center gap-1 overflow-x-auto py-1">
                  <button
                    onClick={() => setAgeFilter('ALL')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                      ageFilter === 'ALL'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    All Ages
                  </button>
                  {availableAgeGroups.map((age) => (
                    <button
                      key={age}
                      onClick={() => setAgeFilter(age)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                        ageFilter === age
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {age}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Categories Grid */}
      {categories.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-slate-300/80 bg-white p-12 sm:p-16 text-center shadow-xs">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-600 mb-5 shadow-inner">
            <Trophy className="h-10 w-10 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">No Tournament Categories Yet</h3>
          <p className="mx-auto mt-2 max-w-md text-xs sm:text-sm text-slate-500 leading-relaxed">
            Create your first category to start adding players and drawing brackets.
          </p>
          <div className="mt-7 flex justify-center">
            <Button
              variant="primary"
              size="lg"
              className="font-bold shadow-lg shadow-blue-500/20"
              icon={<Plus className="h-5 w-5" />}
              onClick={() => setIsAddOpen(true)}
            >
              Create First Category
            </Button>
          </div>
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-xs">
          <p className="text-base font-semibold text-slate-700">No categories match your filters.</p>
          <p className="text-xs text-slate-400 mt-1">Try resetting the search keyword or gender filter.</p>
          <button
            onClick={() => {
              setSearch('');
              setAgeFilter('ALL');
              setGenderFilter('ALL');
            }}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}

      {/* Add Category Modal */}
      <CategoryFormModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={addCategory}
      />
    </div>
  );
};
