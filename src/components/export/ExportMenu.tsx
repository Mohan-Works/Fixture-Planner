import React, { useState } from 'react';
import {
  FileText,
  Printer,
  ChevronDown,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Category, TournamentInfo } from '../../types';
import { exportVectorBracketPdf } from '../../lib/exportPdf';

interface ExportMenuProps {
  category: Category;
  tournament?: TournamentInfo;
  bracketElementRef: React.RefObject<HTMLDivElement>;
  onExportSectionPdf?: (section: 'ALL' | 'QF1' | 'QF2' | 'QF3' | 'QF4' | 'FINALS', label: string) => Promise<void>;
}

export const ExportMenu: React.FC<ExportMenuProps> = ({
  category,
  tournament,
  bracketElementRef,
  onExportSectionPdf,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const fixture = category.fixture;
  const hasQuarterFinals = fixture && fixture.rounds.length >= 3;

  const handleFullPdf = async () => {
    try {
      setIsExporting(true);
      setIsOpen(false);
      if (onExportSectionPdf) {
        await onExportSectionPdf('ALL', 'Full Fixture');
      } else {
        await exportVectorBracketPdf(category, tournament, {
          section: 'ALL',
          sectionLabel: 'Complete Fixture',
        });
      }
    } catch (e) {
      console.error(e);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleSectionPdf = async (
    section: 'QF1' | 'QF2' | 'QF3' | 'QF4' | 'FINALS',
    label: string
  ) => {
    try {
      setIsExporting(true);
      setIsOpen(false);
      if (onExportSectionPdf) {
        await onExportSectionPdf(section, label);
      } else {
        await exportVectorBracketPdf(category, tournament, {
          section,
          sectionLabel: label,
        });
      }
    } catch (e) {
      console.error(e);
      alert('Error generating section PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    setIsOpen(false);
    window.print();
  };

  return (
    <div className="relative inline-block text-left">
      <Button
        variant="primary"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isExporting}
        icon={<FileText className="h-4 w-4 text-white" />}
        className="font-bold shadow-xs"
      >
        <span>{isExporting ? 'Generating PDF...' : 'Export PDF (A4)'}</span>
        <ChevronDown className="h-3 w-3 text-white/80 ml-1" />
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-1.5 w-64 rounded-2xl bg-white p-2 shadow-2xl border border-slate-200 z-30 animate-in fade-in zoom-in-95 text-xs">
            {/* Header info */}
            <div className="px-2.5 py-1.5 border-b border-slate-100 flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                A4 PDF Exports
              </span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700">
                Auto Landscape/Portrait
              </span>
            </div>

            {/* Complete Bracket PDF */}
            <button
              onClick={handleFullPdf}
              className="flex w-full items-start gap-2.5 rounded-xl p-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-950 transition-colors text-left mt-1"
            >
              <FileText className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <span className="font-bold text-slate-900 block">
                  Export Complete Bracket (A4)
                </span>
                <span className="text-[11px] text-slate-500 block leading-tight mt-0.5">
                  Complete tournament fixture scaled to single A4 sheet
                </span>
              </div>
            </button>

            {/* Particular Section PDF Exports */}
            {hasQuarterFinals && onExportSectionPdf && (
              <div className="my-1.5 py-1.5 border-t border-b border-slate-100">
                <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Layers className="h-3 w-3 text-amber-500" />
                  <span>Section PDF Exports (A4)</span>
                </div>

                <div className="grid grid-cols-2 gap-1 px-1 mt-1">
                  <button
                    onClick={() => handleSectionPdf('QF1', 'Section 1 - QF1')}
                    className="px-2 py-1.5 rounded-lg bg-amber-50/80 hover:bg-amber-100 text-amber-950 font-bold text-[11px] text-left transition-colors flex items-center justify-between"
                  >
                    <span>Section 1 (QF1)</span>
                  </button>

                  <button
                    onClick={() => handleSectionPdf('QF2', 'Section 2 - QF2')}
                    className="px-2 py-1.5 rounded-lg bg-amber-50/80 hover:bg-amber-100 text-amber-950 font-bold text-[11px] text-left transition-colors flex items-center justify-between"
                  >
                    <span>Section 2 (QF2)</span>
                  </button>

                  <button
                    onClick={() => handleSectionPdf('QF3', 'Section 3 - QF3')}
                    className="px-2 py-1.5 rounded-lg bg-amber-50/80 hover:bg-amber-100 text-amber-950 font-bold text-[11px] text-left transition-colors flex items-center justify-between"
                  >
                    <span>Section 3 (QF3)</span>
                  </button>

                  <button
                    onClick={() => handleSectionPdf('QF4', 'Section 4 - QF4')}
                    className="px-2 py-1.5 rounded-lg bg-amber-50/80 hover:bg-amber-100 text-amber-950 font-bold text-[11px] text-left transition-colors flex items-center justify-between"
                  >
                    <span>Section 4 (QF4)</span>
                  </button>
                </div>

                <div className="px-1 mt-1.5">
                  <button
                    onClick={() => handleSectionPdf('FINALS', 'Finals Stage - SF and Final')}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-950 font-bold text-[11px] text-left transition-colors flex items-center justify-between"
                  >
                    <span>Finals Stage (SF1, SF2 & Final F)</span>
                  </button>
                </div>
              </div>
            )}

            {/* Print */}
            <button
              onClick={handlePrint}
              className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors mt-0.5"
            >
              <Printer className="h-4 w-4 text-slate-600 shrink-0" />
              <span>Print Fixture (A4)</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
