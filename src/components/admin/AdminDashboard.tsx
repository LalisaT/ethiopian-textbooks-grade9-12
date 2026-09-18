import React, { useState, useMemo, useRef } from 'react';
import { Book, GradeLevel, LanguageCode } from '../../types/book';
import { DbService } from '../../services/dbService';
import {
  LayoutDashboard,
  HardDrive,
  BookOpen,
  Trash2,
  Edit3,
  Download,
  PlusCircle,
  Search,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Zap,
  Layers,
  Sparkles,
  ShieldCheck,
  Upload,
} from 'lucide-react';

interface AdminDashboardProps {
  allBooks: Book[];
  customBooks: Book[];
  storageUsage: { usedBytes: number; usedMb: number; totalBooksCount: number };
  onOpenUploadModal: () => void;
  onOpenBatchModal: () => void;
  onEditBook: (book: Book) => void;
  onDeleteBook: (bookId: string) => void;
  onDeleteAllBooks: () => void;
  onRestoreDefaultBooks: () => void;
  onPreviewBook: (book: Book) => void;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  allBooks,
  customBooks,
  storageUsage,
  onOpenUploadModal,
  onOpenBatchModal,
  onEditBook,
  onDeleteBook,
  onDeleteAllBooks,
  onRestoreDefaultBooks,
  onPreviewBook,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<GradeLevel | 'all'>('all');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<'all' | 'custom' | 'system'>('all');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredBooks = useMemo(() => {
    return allBooks.filter((book) => {
      if (selectedGradeFilter !== 'all' && book.grade !== selectedGradeFilter) return false;
      const isCustom = book.id.startsWith('custom-');
      if (selectedTypeFilter === 'custom' && !isCustom) return false;
      if (selectedTypeFilter === 'system' && isCustom) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const corpus = `${book.title} ${book.titleAmharic} ${book.titleOromo} ${book.subject} Grade ${book.grade} ${book.language} ${book.regionId}`.toLowerCase();
        if (!corpus.includes(query)) return false;
      }
      return true;
    });
  }, [allBooks, selectedGradeFilter, selectedTypeFilter, searchQuery]);

  const handleExportBackup = () => {
    const dataStr = JSON.stringify(allBooks, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ethiopian_textbooks_catalog_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (Array.isArray(imported)) {
          for (const book of imported) {
            if (book.id && book.title) {
              await DbService.saveCustomBook(book);
            }
          }
          alert(`Successfully imported ${imported.length} books into the persistent catalog!`);
          window.location.reload();
        }
      } catch (err) {
        alert('Invalid JSON backup file.');
      }
    };
    reader.readAsText(file);
  };

  const handleConfirmDeleteAll = () => {
    const confirmation = window.prompt(
      '⚠️ DANGER: This will delete ALL textbooks in the catalog. Type "DELETE ALL" to confirm:'
    );
    if (confirmation === 'DELETE ALL') {
      onDeleteAllBooks();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="rounded-3xl bg-slate-950 text-white p-8 border border-amber-500/30 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/40 text-xs font-black">
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>LOGGED IN AS SUPER ADMIN (@lalion)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              Administrator Library Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Upload, edit, customize, or delete any textbook. All uploaded books are stored permanently in your local IndexedDB storage.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* FAST BULK UPLOAD BUTTON */}
            <button
              onClick={onOpenBatchModal}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-transform active:scale-95 flex items-center gap-1.5"
            >
              <Zap className="w-4 h-4 fill-current text-slate-950" />
              <span>⚡ Bulk Upload All</span>
            </button>

            <button
              onClick={onOpenUploadModal}
              className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs rounded-xl shadow-md transition-transform active:scale-95 flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Single Book</span>
            </button>

            {/* Export Backup Button */}
            <button
              onClick={handleExportBackup}
              className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-colors border border-slate-700 flex items-center gap-1.5"
              title="Download full JSON backup of catalog"
            >
              <Download className="w-3.5 h-3.5 text-sky-400" />
              <span>Export Backup (.json)</span>
            </button>

            {/* Import Backup Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-colors border border-slate-700 flex items-center gap-1.5"
              title="Import JSON catalog backup"
            >
              <Upload className="w-3.5 h-3.5 text-amber-400" />
              <span>Import Backup</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportBackup}
              accept="application/json"
              className="hidden"
            />

            <button
              onClick={onRestoreDefaultBooks}
              className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-colors border border-slate-700 flex items-center gap-1.5"
              title="Restore original system curriculum books"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restore Defaults</span>
            </button>

            <button
              onClick={handleConfirmDeleteAll}
              className="px-3.5 py-2.5 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white font-bold text-xs rounded-xl transition-colors border border-rose-600/40 flex items-center gap-1.5"
              title="Delete all books in the catalog"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete All Books</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs rounded-xl border border-slate-800"
            >
              Close
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="text-xs text-slate-400">Total Active Books</div>
            <div className="text-2xl font-black text-white mt-1">{allBooks.length}</div>
            <div className="text-[11px] text-emerald-400 mt-0.5">Grades 5, 6, 7 & 8</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="text-xs text-slate-400">Custom Uploaded</div>
            <div className="text-2xl font-black text-amber-400 mt-1">{customBooks.length}</div>
            <div className="text-[11px] text-emerald-400 mt-0.5">✓ Saved Permanently</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="text-xs text-slate-400">Storage Used</div>
            <div className="text-2xl font-black text-sky-400 mt-1">{storageUsage.usedMb} MB</div>
            <div className="text-[11px] text-slate-400 mt-0.5">IndexedDB Database</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="text-xs text-slate-400">Languages Covered</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">5 Languages</div>
            <div className="text-[11px] text-slate-400 mt-0.5">EN, AM, OM, TI, SO</div>
          </div>
        </div>
      </div>

      {/* Management Table Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search catalog to edit or delete..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Grade Filter */}
            <select
              value={selectedGradeFilter}
              onChange={(e) =>
                setSelectedGradeFilter(
                  e.target.value === 'all' ? 'all' : (parseInt(e.target.value) as GradeLevel)
                )
              }
              className="px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 border-none"
            >
              <option value="all">All Grades (9–12)</option>
              <option value="9">Grade 9</option>
              <option value="10">Grade 10</option>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
            </select>

            {/* Type Filter */}
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setSelectedTypeFilter('all')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  selectedTypeFilter === 'all'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                All ({allBooks.length})
              </button>
              <button
                onClick={() => setSelectedTypeFilter('custom')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  selectedTypeFilter === 'custom'
                    ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                Custom ({customBooks.length})
              </button>
              <button
                onClick={() => setSelectedTypeFilter('system')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  selectedTypeFilter === 'system'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                Default Curriculum
              </button>
            </div>
          </div>
        </div>

        {/* Books Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Book Title</th>
                <th className="py-3 px-4">Grade</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Language</th>
                <th className="py-3 px-4">Origin / Status</th>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredBooks.map((book) => {
                const isCustom = book.id.startsWith('custom-');
                return (
                  <tr
                    key={book.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-slate-900 dark:text-white line-clamp-1 max-w-sm">
                        {book.title}
                      </div>
                      <div className="text-[10px] text-slate-400 line-clamp-1">
                        {book.titleAmharic || book.titleOromo}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md font-extrabold text-slate-700 dark:text-slate-300">
                        Grade {book.grade}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300 capitalize">
                      {book.subject.replace('_', ' ')}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md font-mono uppercase font-bold text-[10px]">
                        {book.language}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {isCustom ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded-full font-bold text-[10px]">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Saved in DB</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 rounded-full font-bold text-[10px]">
                          <span>Standard Curriculum</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-mono">
                      {book.fileSizeMb || 15} MB
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onPreviewBook(book)}
                          className="p-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-colors"
                          title="Preview Book in Reader"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onEditBook(book)}
                          className="p-1.5 bg-amber-500/10 hover:bg-amber-500 text-amber-600 hover:text-slate-950 rounded-lg transition-colors font-bold"
                          title="Edit Book Details"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete "${book.title}"?`)) {
                              onDeleteBook(book.id);
                            }
                          }}
                          className="p-1.5 bg-rose-500/10 hover:bg-rose-600 text-rose-600 hover:text-white rounded-lg transition-colors"
                          title="Delete Book"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
