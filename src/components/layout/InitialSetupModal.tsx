import React, { useState } from 'react';
import {
  AlertTriangle,
  RotateCcw,
  FileText,
  Edit3,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

interface InitialSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InitialSetupModal: React.FC<InitialSetupModalProps> = ({ isOpen, onClose }) => {
  const [hasAcknowledged, setHasAcknowledged] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!hasAcknowledged) {
      setShowWarning(true);
      return;
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-5 overflow-y-auto">
      {/* Blurred Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity animate-in fade-in"
        aria-hidden="true"
      />

      {/* Modern Alert Modal Card */}
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 px-5 py-3.5 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="/logo.jpg"
                alt="TournaX"
                className="h-9 w-9 rounded-xl object-cover ring-2 ring-amber-400/50 shadow-md"
              />
              <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white leading-none">
                TournaX
              </span>
              <p className="text-[10px] text-amber-300 font-bold uppercase tracking-wider mt-0.5">
                Session Advisory
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold">
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>Notice</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-3.5">
          <div className="flex items-start gap-3 bg-amber-50/80 p-3 rounded-2xl border border-amber-200 text-amber-950">
            <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Session Only Application
              </h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                TournaX operates strictly in your active browser session without database storage.
              </p>
            </div>
          </div>

          {/* Key Points: Short, Punchy, No Em-Dashes */}
          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <RotateCcw className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Resets on Refresh:</strong>{' '}
                <span className="text-slate-600">Reloading (F5) or opening a new tab resets data to default.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <FileText className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Export PDF (A4):</strong>{' '}
                <span className="text-slate-600">Download your bracket in A4 PDF format before closing.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <Edit3 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Edit Details:</strong>{' '}
                <span className="text-slate-600">Click the pen icon in the top header anytime to edit championship details.</span>
              </div>
            </div>
          </div>

          {/* Acknowledgment */}
          <div
            className={`p-3 rounded-2xl border transition-all ${
              showWarning && !hasAcknowledged
                ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-400/30'
                : 'bg-slate-50 border-slate-300'
            }`}
          >
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={hasAcknowledged}
                onChange={(e) => {
                  setHasAcknowledged(e.target.checked);
                  if (e.target.checked) setShowWarning(false);
                }}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer shrink-0"
              />
              <span className="text-xs font-semibold text-slate-800">
                I understand that refreshing will reset data to default
              </span>
            </label>
            {showWarning && !hasAcknowledged && (
              <p className="mt-1.5 text-xs font-bold text-rose-600 pl-6.5">
                Please check the box to continue.
              </p>
            )}
          </div>
        </div>

        {/* Action Button Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 min-h-[44px]"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>I Understand and Continue</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
