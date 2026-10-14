import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Users,
  GitBranch,
  Edit2,
  Sparkles,
  ArrowRight,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { useTournamentStore } from '../store/useTournamentStore';
import { PlayerForm } from '../components/players/PlayerForm';
import { PlayerList } from '../components/players/PlayerList';
import { BulkAddModal } from '../components/players/BulkAddModal';
import { CsvImportModal } from '../components/players/CsvImportModal';
import { Bracket } from '../components/bracket/Bracket';
import { CategoryFormModal } from '../components/category/CategoryFormModal';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const CategoryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    categories,
    tournament,
    updateCategory,
    addPlayer,
    updatePlayer,
    removePlayer,
    bulkAddPlayers,
    importPlayers,
    generateCategoryFixture,
    resetCategoryFixture,
  } = useTournamentStore();

  const category = categories.find((c) => c.id === id);

  const [activeTab, setActiveTab] = useState<'players' | 'fixture'>(
    category?.fixture ? 'fixture' : 'players'
  );
  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false);
  const [isBulkAddOpen, setIsBulkAddOpen] = useState(false);
  const [isCsvImportOpen, setIsCsvImportOpen] = useState(false);

  if (!category) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">Category Not Found</h2>
        <p className="text-sm text-slate-500 mt-2">The category you are looking for does not exist.</p>
        <Link to="/" className="mt-4 inline-block">
          <Button variant="primary">Return to Dashboard</Button>
        </Link>
      </div>
    );
  }

  const hasFixture = Boolean(category.fixture);
  const playerCount = category.players.length;

  const handleGenerate = () => {
    if (playerCount < 2) return;
    generateCategoryFixture(category.id);
    setActiveTab('fixture');
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-blue-600 flex items-center gap-1">
          <ChevronLeft className="h-3.5 w-3.5" />
          Dashboard
        </Link>
        <span>/</span>
        <span className="font-semibold text-slate-700 truncate">{category.name}</span>
      </div>

      {/* Category Header Card */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <Badge variant="purple" size="sm">
              {category.ageGroup}
            </Badge>
            <Badge variant="slate" size="sm">
              {category.gender || 'Men / Boys'}
            </Badge>
            <Badge variant={hasFixture ? 'blue' : 'slate'} size="sm">
              {hasFixture ? 'Fixture Drawn' : 'Roster In Preparation'}
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">{category.name}</h1>
            <button
              onClick={() => setIsEditCategoryOpen(true)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              title="Edit Category Name & Parameters"
            >
              <Edit2 className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <span>
              Weight Limit:{' '}
              <strong className="text-slate-700 font-semibold">
                {category.weightMin !== null && category.weightMax !== null
                  ? `${category.weightMin}kg to ${category.weightMax}kg`
                  : category.weightMax !== null
                  ? `Under ${category.weightMax}kg`
                  : category.weightMin !== null
                  ? `Above ${category.weightMin}kg`
                  : 'Open Weight'}
              </strong>
            </span>
            <span>•</span>
            <span>
              Playoff Mode:{' '}
              <strong className="text-slate-700 font-semibold">
                {category.thirdPlaceMode === 'bronze-match'
                  ? 'Bronze Match Playoff'
                  : category.thirdPlaceMode === 'two-bronze'
                  ? '2 Bronze Medals'
                  : 'Gold & Silver Only'}
              </strong>
            </span>
          </div>
        </div>

        {/* Right action button */}
        <div className="flex items-center gap-2.5 shrink-0">
          {hasFixture && (
            <Button
              variant="outline"
              size="sm"
              icon={<FileText className="h-4 w-4 text-rose-500" />}
              onClick={() => setActiveTab('fixture')}
            >
              Export PDF (A4)
            </Button>
          )}

          {!hasFixture && (
            <Button
              variant="primary"
              size="md"
              disabled={playerCount < 2}
              icon={<Sparkles className="h-4 w-4" />}
              onClick={handleGenerate}
            >
              Generate Fixture
            </Button>
          )}
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('players')}
          className={`flex items-center gap-2 py-3 px-5 text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'players'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="h-4 w-4" />
          <span>Players Roster</span>
          <span
            className={`px-2 py-0.5 text-xs rounded-full font-bold ${
              activeTab === 'players' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
            }`}
          >
            {playerCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('fixture')}
          className={`flex items-center gap-2 py-3 px-5 text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'fixture'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <GitBranch className="h-4 w-4" />
          <span>Knockout Fixture</span>
          {hasFixture && (
            <span
              className={`px-2 py-0.5 text-xs rounded-full font-bold ${
                activeTab === 'fixture' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
              }`}
            >
              Active
            </span>
          )}
        </button>
      </div>

      {/* Tab 1: Players Roster */}
      {activeTab === 'players' && (
        <div className="space-y-6">
          {!hasFixture && (
            <PlayerForm
              onAdd={(p) => addPlayer(category.id, p)}
              disabled={hasFixture}
            />
          )}

          <PlayerList
            players={category.players}
            isFixtureActive={hasFixture}
            onUpdatePlayer={(pid, u) => updatePlayer(category.id, pid, u)}
            onRemovePlayer={(pid) => removePlayer(category.id, pid)}
            onResetFixture={() => resetCategoryFixture(category.id)}
            onOpenBulkAdd={() => setIsBulkAddOpen(true)}
            onOpenCsvImport={() => setIsCsvImportOpen(true)}
          />

          {!hasFixture && playerCount >= 2 && (
            <div className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl shadow-xs">
              <div>
                <h4 className="text-sm font-bold text-blue-950">
                  Ready to Draw Knockout Bracket?
                </h4>
                <p className="text-xs text-blue-700 mt-0.5">
                  You have {playerCount} registered players. The system will auto-calculate byes
                  and perform an unbiased Fisher-Yates draw.
                </p>
              </div>
              <Button
                variant="primary"
                size="md"
                onClick={handleGenerate}
                icon={<Sparkles className="h-4 w-4" />}
              >
                Generate Fixture Now
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Fixture Bracket */}
      {activeTab === 'fixture' && (
        <div className="w-full -mx-1 sm:-mx-3 md:-mx-4 lg:-mx-6 px-1 sm:px-3 md:px-4 lg:px-6">
          {hasFixture ? (
            <Bracket category={category} />
          ) : (
            <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-white p-12 text-center shadow-xs">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-4">
                <GitBranch className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No Fixture Bracket Generated Yet</h3>
              <p className="mx-auto mt-1.5 max-w-md text-xs text-slate-500 leading-relaxed">
                {playerCount < 2
                  ? 'Add at least 2 players to the roster to generate the knockout tournament bracket.'
                  : `You have ${playerCount} players ready in the roster. Click below to randomly draw the knockout fixture bracket.`}
              </p>
              <div className="mt-6 flex justify-center gap-3">
                {playerCount < 2 ? (
                  <Button variant="primary" onClick={() => setActiveTab('players')}>
                    Go to Players Roster
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="lg"
                    icon={<Sparkles className="h-5 w-5" />}
                    onClick={handleGenerate}
                  >
                    Draw Knockout Bracket Now
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      <CategoryFormModal
        isOpen={isEditCategoryOpen}
        onClose={() => setIsEditCategoryOpen(false)}
        initialData={category}
        onSubmit={(data) => updateCategory(category.id, data)}
      />

      <BulkAddModal
        isOpen={isBulkAddOpen}
        onClose={() => setIsBulkAddOpen(false)}
        onAdd={(names, defaultClub) => bulkAddPlayers(category.id, names, defaultClub)}
      />

      <CsvImportModal
        isOpen={isCsvImportOpen}
        onClose={() => setIsCsvImportOpen(false)}
        onImport={(players) => importPlayers(category.id, players)}
      />
    </div>
  );
};
