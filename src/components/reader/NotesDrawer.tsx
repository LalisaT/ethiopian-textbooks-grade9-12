import React, { useState } from 'react';
import { UserNote } from '../../types/user';
import { useTranslation } from '../../i18n/useTranslation';
import { X, Plus, Trash2, Edit2, Save, FileText, Sparkles } from 'lucide-react';

interface NotesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notes: UserNote[];
  onSaveNote: (note: { id?: string; title: string; content: string; colorTag?: string }) => void;
  onDeleteNote: (noteId: string) => void;
  unitNumber: number;
  bookTitle: string;
}

export const NotesDrawer: React.FC<NotesDrawerProps> = ({
  isOpen,
  onClose,
  notes,
  onSaveNote,
  onDeleteNote,
  unitNumber,
  bookTitle,
}) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | undefined>(undefined);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [colorTag, setColorTag] = useState<string>('blue');

  if (!isOpen) return null;

  const handleStartAdd = () => {
    setEditingNoteId(undefined);
    setNoteTitle(`Unit ${unitNumber} Key Insights`);
    setNoteContent('');
    setColorTag('blue');
    setIsEditing(true);
  };

  const handleStartEdit = (note: UserNote) => {
    setEditingNoteId(note.id);
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setColorTag(note.colorTag || 'blue');
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!noteTitle.trim() && !noteContent.trim()) return;
    onSaveNote({
      id: editingNoteId,
      title: noteTitle.trim() || `Unit ${unitNumber} Note`,
      content: noteContent,
      colorTag,
    });
    setIsEditing(false);
    setNoteTitle('');
    setNoteContent('');
    setEditingNoteId(undefined);
  };

  const tagColorThemes: Record<
    string,
    {
      label: string;
      dot: string;
      bg: string;
      border: string;
      badge: string;
      focusRing: string;
      btn: string;
      accent: string;
    }
  > = {
    emerald: {
      label: 'Green',
      dot: 'bg-emerald-500',
      bg: 'bg-emerald-50/70 dark:bg-emerald-950/20',
      border: 'border-l-4 border-l-emerald-500 border-slate-200 dark:border-slate-700',
      badge: 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800',
      focusRing: 'focus:ring-emerald-500 focus:border-emerald-500',
      btn: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20',
      accent: 'text-emerald-600 dark:text-emerald-400',
    },
    amber: {
      label: 'Amber',
      dot: 'bg-amber-500',
      bg: 'bg-amber-50/70 dark:bg-amber-950/20',
      border: 'border-l-4 border-l-amber-500 border-slate-200 dark:border-slate-700',
      badge: 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800',
      focusRing: 'focus:ring-amber-500 focus:border-amber-500',
      btn: 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-500/20',
      accent: 'text-amber-600 dark:text-amber-400',
    },
    blue: {
      label: 'Blue',
      dot: 'bg-blue-500',
      bg: 'bg-blue-50/70 dark:bg-blue-950/20',
      border: 'border-l-4 border-l-blue-500 border-slate-200 dark:border-slate-700',
      badge: 'bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-800',
      focusRing: 'focus:ring-blue-500 focus:border-blue-500',
      btn: 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20',
      accent: 'text-blue-600 dark:text-blue-400',
    },
    purple: {
      label: 'Purple',
      dot: 'bg-purple-500',
      bg: 'bg-purple-50/70 dark:bg-purple-950/20',
      border: 'border-l-4 border-l-purple-500 border-slate-200 dark:border-slate-700',
      badge: 'bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800',
      focusRing: 'focus:ring-purple-500 focus:border-purple-500',
      btn: 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/20',
      accent: 'text-purple-600 dark:text-purple-400',
    },
    rose: {
      label: 'Rose',
      dot: 'bg-rose-500',
      bg: 'bg-rose-50/70 dark:bg-rose-950/20',
      border: 'border-l-4 border-l-rose-500 border-slate-200 dark:border-slate-700',
      badge: 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800',
      focusRing: 'focus:ring-rose-500 focus:border-rose-500',
      btn: 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-500/20',
      accent: 'text-rose-600 dark:text-rose-400',
    },
  };

  const activeTheme = tagColorThemes[colorTag] || tagColorThemes.blue;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-sky-400 flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {t('notes')} - Unit {unitNumber}
              </h3>
              <p className="text-xs text-slate-400 truncate max-w-[200px]">
                {bookTitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {isEditing ? (
            <div className={`p-4 rounded-2xl border transition-all space-y-3 ${activeTheme.bg} ${activeTheme.border}`}>
              <input
                type="text"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                placeholder="Note Title / Concept..."
                className={`w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${activeTheme.focusRing}`}
              />

              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Type your study notes, formulas, or questions here..."
                rows={6}
                className={`w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 ${activeTheme.focusRing} resize-none`}
              />

              {/* Tag color selector */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">Tag Color:</span>
                {(['emerald', 'amber', 'blue', 'purple', 'rose'] as const).map((c) => {
                  const tInfo = tagColorThemes[c];
                  const isSelected = colorTag === c;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setColorTag(c)}
                      className={`w-6 h-6 rounded-full ${tInfo.dot} transition-all flex items-center justify-center ${
                        isSelected
                          ? 'ring-2 ring-offset-2 ring-slate-900 dark:ring-white scale-125 shadow-md'
                          : 'opacity-50 hover:opacity-100 hover:scale-110'
                      }`}
                      title={`${tInfo.label} Tag`}
                    >
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold ${activeTheme.btn} shadow-md transition-all active:scale-95`}
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{t('saveNote')}</span>
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleStartAdd}
              className="w-full py-3 px-4 border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-2xl text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center justify-center gap-2 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all shadow-xs"
            >
              <Plus className="w-4 h-4 text-blue-600 dark:text-sky-400" />
              <span>{t('addNote')}</span>
            </button>
          )}

          {/* Notes list */}
          {notes.length === 0 && !isEditing ? (
            <div className="text-center py-10 text-slate-400">
              <FileText className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-xs">{t('noNotesYet')}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notes.map((n) => {
                const noteTheme = tagColorThemes[n.colorTag || 'blue'] || tagColorThemes.blue;
                return (
                  <div
                    key={n.id}
                    className={`p-4 rounded-2xl ${noteTheme.bg} ${noteTheme.border} hover:shadow-md transition-all space-y-2`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${noteTheme.badge}`}>
                          {noteTheme.label}
                        </span>
                        <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                          {n.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleStartEdit(n)}
                          className="p-1 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-white/80 dark:hover:bg-slate-800"
                          title="Edit Note"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteNote(n.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-white/80 dark:hover:bg-slate-800"
                          title="Delete Note"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                      {n.content}
                    </p>
                    <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-200/50 dark:border-slate-800/60 flex items-center justify-between">
                      <span>Saved on {new Date(n.updatedAt).toLocaleDateString()}</span>
                      <span className={`text-[10px] font-bold ${noteTheme.accent}`}>Unit {n.unitNumber}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-center">
          <p className="text-[11px] text-slate-400">
            Notes are saved automatically on your device for offline study.
          </p>
        </div>
      </div>
    </div>
  );
};
