import React, { useState } from 'react';
import { Upload, CheckCircle2 } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Player } from '../../types';

interface CsvImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (players: Array<Omit<Player, 'id'>>) => number;
}

export const CsvImportModal: React.FC<CsvImportModalProps> = ({ isOpen, onClose, onImport }) => {
  const [csvText, setCsvText] = useState('');
  const [parsedPreview, setParsedPreview] = useState<Array<Omit<Player, 'id'>>>([]);
  const [error, setError] = useState<string | null>(null);

  const parseCsv = (text: string) => {
    setError(null);
    try {
      const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
      if (lines.length === 0) {
        setParsedPreview([]);
        return;
      }

      // Check if line 0 is a header
      let startIdx = 0;
      const firstLineLower = lines[0].toLowerCase();
      let nameCol = 0;
      let clubCol = 1;
      let weightCol = 2;
      let dobCol = 3;

      if (
        firstLineLower.includes('name') ||
        firstLineLower.includes('player') ||
        firstLineLower.includes('wrestler')
      ) {
        startIdx = 1;
        const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
        headers.forEach((h, idx) => {
          if (h.includes('name') || h.includes('player') || h.includes('wrestler')) nameCol = idx;
          else if (h.includes('club') || h.includes('state') || h.includes('team')) clubCol = idx;
          else if (h.includes('weight') || h.includes('rating') || h.includes('kg')) weightCol = idx;
          else if (h.includes('dob') || h.includes('age') || h.includes('birth')) dobCol = idx;
        });
      }

      const results: Array<Omit<Player, 'id'>> = [];
      for (let i = startIdx; i < lines.length; i++) {
        const cols = lines[i].split(',').map((c) => c.trim().replace(/^["']|["']$/g, ''));
        const name = cols[nameCol];
        if (name) {
          const club = cols[clubCol] || undefined;
          const weightVal = cols[weightCol] ? parseFloat(cols[weightCol]) : undefined;
          const dob = cols[dobCol] || undefined;
          results.push({
            name,
            club,
            weight: isNaN(weightVal as number) ? undefined : weightVal,
            dob,
          });
        }
      }

      setParsedPreview(results);
    } catch (e: any) {
      setError('Could not parse CSV content: ' + e.message);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setCsvText(text);
      parseCsv(text);
    };
    reader.readAsText(file);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCsvText(e.target.value);
    parseCsv(e.target.value);
  };

  const handleImportSubmit = () => {
    if (parsedPreview.length === 0) return;
    const count = onImport(parsedPreview);
    if (count > 0) {
      setCsvText('');
      setParsedPreview([]);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Import Players from CSV"
      subtitle="Upload or paste comma-separated player data (Name, Club, Weight/Rating, DOB)"
      maxWidth="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleImportSubmit}
            disabled={parsedPreview.length === 0}
            type="button"
          >
            Import {parsedPreview.length} Players
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {error && (
          <div className="rounded-lg bg-rose-50 border border-rose-200 p-2.5 text-xs text-rose-700">
            {error}
          </div>
        )}

        {/* Upload file box */}
        <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 rounded-xl hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/30 cursor-pointer transition-colors text-center">
          <Upload className="h-6 w-6 text-slate-400 mb-1" />
          <span className="text-sm font-semibold text-slate-700">Choose a CSV file</span>
          <span className="text-xs text-slate-400">or drag and drop here</span>
          <input type="file" accept=".csv,text/csv" onChange={handleFileUpload} className="hidden" />
        </label>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">
              Or Paste CSV Data Directly
            </span>
            <span className="text-xs text-slate-400">Columns: Name, Club, Weight, DOB</span>
          </div>
          <textarea
            rows={5}
            className="block w-full rounded-lg border border-slate-300 p-2.5 text-xs font-mono text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder={`Name,Club,Weight,DOB\nAlex Johnson,Metro Club,65,2003-07-16\nLiam Smith,United Sports,65,1999-12-12`}
            value={csvText}
            onChange={handleTextChange}
          />
        </div>

        {/* Preview Table */}
        {parsedPreview.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 mb-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Parsed {parsedPreview.length} players ready to import:</span>
            </div>
            <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] sticky top-0">
                  <tr>
                    <th className="px-3 py-2">#</th>
                    <th className="px-3 py-2">Player Name</th>
                    <th className="px-3 py-2">Club / Team</th>
                    <th className="px-3 py-2">Weight / Rating</th>
                    <th className="px-3 py-2">DOB</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {parsedPreview.slice(0, 15).map((p, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="px-3 py-1.5 text-slate-400">{idx + 1}</td>
                      <td className="px-3 py-1.5 font-medium text-slate-900">{p.name}</td>
                      <td className="px-3 py-1.5 text-slate-500">{p.club || '—'}</td>
                      <td className="px-3 py-1.5 text-slate-500">{p.weight ? `${p.weight} kg` : '—'}</td>
                      <td className="px-3 py-1.5 text-slate-500">{p.dob || '—'}</td>
                    </tr>
                  ))}
                  {parsedPreview.length > 15 && (
                    <tr>
                      <td colSpan={5} className="px-3 py-2 text-center text-slate-400 italic bg-slate-50">
                        ...and {parsedPreview.length - 15} more
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
