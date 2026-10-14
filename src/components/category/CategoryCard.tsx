import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  GitBranch,
  Lock,
  Trophy,
  Copy,
  Trash2,
  ChevronRight,
  FileSpreadsheet,
  Award,
  Edit2,
} from 'lucide-react';
import { Category } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ConfirmModal } from '../ui/ConfirmModal';
import { CategoryFormModal } from './CategoryFormModal';
import { useTournamentStore } from '../../store/useTournamentStore';
import { exportCategoryExcel } from '../../lib/exportExcel';

interface CategoryCardProps {
  category: Category;
  onEdit?: (category: Category) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const { deleteCategory, duplicateCategory, updateCategory, tournament } = useTournamentStore();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const playerCount = category.players.length;
  const fixture = category.fixture;

  // Determine champion if final is completed
  let championName: string | null = null;
  if (fixture && fixture.rounds.length > 0) {
    const finalRound = fixture.rounds[fixture.rounds.length - 1];
    const finalMatch = finalRound.matches[0];
    if (finalMatch && finalMatch.status === 'done' && finalMatch.winnerId) {
      const winner = category.players.find((p) => p.id === finalMatch.winnerId);
      championName = winner ? winner.name : 'Completed';
    }
  }

  // Determine status
  let statusBadge = (
    <Badge variant="slate" size="sm">
      Not Drawn
    </Badge>
  );

  if (fixture) {
    if (championName) {
      statusBadge = (
        <Badge variant="gold" size="sm" className="gap-1">
          <Trophy className="h-3 w-3 text-amber-600" />
          Completed
        </Badge>
      );
    } else if (fixture.locked) {
      statusBadge = (
        <Badge variant="amber" size="sm" className="gap-1">
          <Lock className="h-3 w-3 text-amber-600" />
          Locked
        </Badge>
      );
    } else {
      statusBadge = (
        <Badge variant="blue" size="sm" className="gap-1">
          <GitBranch className="h-3 w-3 text-blue-600" />
          Bracket Drawn
        </Badge>
      );
    }
  }

  return (
    <>
      <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
        <div>
          {/* Header Row */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <Badge variant="purple" size="sm">
                {category.ageGroup}
              </Badge>
              <Badge variant="slate" size="sm">
                {category.gender || 'Men / Boys'}
              </Badge>
              {statusBadge}
            </div>

            <div className="flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => duplicateCategory(category.id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Duplicate Category"
                aria-label="Duplicate category"
              >
                <Copy className="h-4 w-4" />
              </button>
              <button
                onClick={() => exportCategoryExcel(category, tournament)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                title="Export Excel (.xlsx)"
                aria-label="Export category to Excel"
              >
                <FileSpreadsheet className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsDeleteOpen(true)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                title="Delete Category"
                aria-label="Delete category"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Title Row with Edit Logo right near the name */}
          <div className="mt-3 flex items-center justify-between gap-2">
            <Link to={`/category/${category.id}`} className="block group-hover:text-blue-600 flex-1 min-w-0">
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                {category.name}
              </h3>
            </Link>
            <button
              onClick={() => setIsEditOpen(true)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors shrink-0"
              title="Edit Category Name"
              aria-label="Edit Category Name"
            >
              <Edit2 className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Champion Banner if finished */}
          {championName && (
            <div className="mt-2.5 flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-50 to-amber-100/70 border border-amber-200 px-3 py-1.5 text-xs text-amber-900 font-semibold">
              <Award className="h-4 w-4 text-amber-600 shrink-0" />
              <span className="truncate">Champion: {championName}</span>
            </div>
          )}

          {/* Meta specs */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-slate-400" />
              <span className="font-semibold text-slate-700">{playerCount}</span>
              <span>{playerCount === 1 ? 'player' : 'players'}</span>
            </div>

            {fixture && (
              <div className="flex items-center gap-1.5">
                <GitBranch className="h-4 w-4 text-blue-500" />
                <span className="font-medium text-slate-600">
                  {fixture.rounds.length} rounds ({fixture.size} bracket)
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {category.thirdPlaceMode === 'bronze-match'
              ? 'Bronze Match'
              : category.thirdPlaceMode === 'two-bronze'
              ? '2 Bronze Medals'
              : 'Gold/Silver only'}
          </span>

          <Link to={`/category/${category.id}`}>
            <Button variant="outline" size="sm" className="gap-1 group-hover:border-blue-300">
              {fixture ? 'View Fixture' : 'Manage Players'}
              <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Edit Category Modal */}
      <CategoryFormModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        initialData={category}
        onSubmit={(data) => updateCategory(category.id, data)}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => deleteCategory(category.id)}
        title={`Delete "${category.name}"?`}
        variant="danger"
        confirmText="Delete Category"
        description="This will permanently delete this category, all registered players, and its fixture bracket. This action cannot be undone."
      />
    </>
  );
};
