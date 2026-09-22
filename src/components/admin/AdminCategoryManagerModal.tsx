import React, { useState, useEffect } from 'react';
import {
  CategoryService,
  LanguageCategoryItem,
  SubjectCategoryItem,
} from '../../services/categoryService';
import {
  X,
  Plus,
  Trash2,
  Save,
  Globe,
  BookOpen,
  RotateCcw,
  Sparkles,
  Edit3,
  CheckCircle,
} from 'lucide-react';

interface AdminCategoryManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoriesUpdated: () => void;
}

export const AdminCategoryManagerModal: React.FC<AdminCategoryManagerModalProps> = ({
  isOpen,
  onClose,
  onCategoriesUpdated,
}) => {
  const [activeTab, setActiveTab] = useState<'languages' | 'subjects'>('languages');
  const [languages, setLanguages] = useState<LanguageCategoryItem[]>([]);
  const [subjects, setSubjects] = useState<SubjectCategoryItem[]>([]);

  // Language form
  const [langId, setLangId] = useState('');
  const [langName, setLangName] = useState('');
  const [langNative, setLangNative] = useState('');
  const [langRegion, setLangRegion] = useState('');
  const [langColorDot, setLangColorDot] = useState('emerald');

  // Subject form
  const [subId, setSubId] = useState('');
  const [subName, setSubName] = useState('');
  const [subNameAmharic, setSubNameAmharic] = useState('');
  const [subNameOromo, setSubNameOromo] = useState('');

  const loadData = () => {
    setLanguages(CategoryService.getLanguageCategories());
    setSubjects(CategoryService.getSubjectCategories());
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAddOrUpdateLanguage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!langName.trim()) return;

    const id = langId.trim().toLowerCase() || `lang-${Date.now()}`;
    CategoryService.saveLanguageCategory({
      id,
      name: langName,
      nativeName: langNative || langName,
      colorDot: langColorDot || 'emerald',
      region: langRegion || 'Ethiopia',
    });

    setLangId('');
    setLangName('');
    setLangNative('');
    setLangRegion('');
    setLangColorDot('emerald');
    loadData();
    onCategoriesUpdated();
  };

  const handleDeleteLanguage = (id: string) => {
    if (id === 'all') {
      alert('Cannot delete the Universal All Languages category.');
      return;
    }
    if (confirm('Delete this language category?')) {
      CategoryService.deleteLanguageCategory(id);
      loadData();
      onCategoriesUpdated();
    }
  };

  const handleAddOrUpdateSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subName.trim()) return;

    const id = subId.trim().toLowerCase().replace(/\s+/g, '_') || `sub-${Date.now()}`;
    CategoryService.saveSubjectCategory({
      id,
      name: subName,
      nameAmharic: subNameAmharic || subName,
      nameOromo: subNameOromo || subName,
    });

    setSubId('');
    setSubName('');
    setSubNameAmharic('');
    setSubNameOromo('');
    loadData();
    onCategoriesUpdated();
  };

  const handleDeleteSubject = (id: string) => {
    if (confirm('Delete this curriculum subject category?')) {
      CategoryService.deleteSubjectCategory(id);
      loadData();
      onCategoriesUpdated();
    }
  };

  const handleResetDefaults = () => {
    if (confirm('Reset categories back to standard Ethiopian Ministry defaults?')) {
      CategoryService.resetDefaults();
      loadData();
      onCategoriesUpdated();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-800 flex flex-col my-auto max-h-[90vh] text-slate-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-lg">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-white">
                Category & Regional Language Manager
              </h3>
              <p className="text-xs text-amber-400 font-bold">
                Admin Customization: Subjects & Regional Language Categories
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-800 bg-slate-950 px-6 gap-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('languages')}
            className={`py-3 flex items-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'languages'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Language & Regional Categories ({languages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('subjects')}
            className={`py-3 flex items-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'subjects'
                ? 'border-sky-400 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Curriculum Subjects ({subjects.length})</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* TAB 1: LANGUAGES */}
          {activeTab === 'languages' && (
            <div className="space-y-6">
              {/* Add / Edit Form */}
              <form onSubmit={handleAddOrUpdateLanguage} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-white flex items-center gap-1.5">
                    <Plus className="w-3.5 h-3.5 text-amber-400" />
                    <span>Add / Customize Regional Language Category</span>
                  </h4>
                  <button
                    type="button"
                    onClick={handleResetDefaults}
                    className="text-[11px] text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Defaults</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Language Name (e.g. Afaan Oromoo)</label>
                    <input
                      type="text"
                      required
                      value={langName}
                      onChange={(e) => setLangName(e.target.value)}
                      placeholder="e.g. Sidama (Sidaamu Afoo)"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Native Script Label</label>
                    <input
                      type="text"
                      value={langNative}
                      onChange={(e) => setLangNative(e.target.value)}
                      placeholder="e.g. Sidaamu Afoo / አማርኛ"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Color Accent</label>
                    <div className="flex gap-2">
                      <select
                        value={langColorDot}
                        onChange={(e) => setLangColorDot(e.target.value)}
                        className="w-24 px-2 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
                      >
                        <option value="emerald">Emerald</option>
                        <option value="blue">Blue</option>
                        <option value="amber">Amber</option>
                        <option value="purple">Purple</option>
                        <option value="orange">Orange</option>
                        <option value="red">Red</option>
                      </select>
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              {/* Language List */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-slate-300">Active Language Categories ({languages.length})</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                  {languages.map((l) => (
                    <div
                      key={l.id}
                      className="p-3 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block shrink-0"></span>
                        <div>
                          <div className="font-bold text-xs text-white">{l.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">Code: {l.id}</div>
                        </div>
                      </div>

                      {l.id !== 'all' && (
                        <button
                          onClick={() => handleDeleteLanguage(l.id)}
                          className="p-1 text-slate-500 hover:text-rose-400 rounded-lg transition-colors"
                          title="Delete category"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SUBJECTS */}
          {activeTab === 'subjects' && (
            <div className="space-y-6">
              {/* Add / Edit Form */}
              <form onSubmit={handleAddOrUpdateSubject} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-white flex items-center gap-1.5">
                    <Plus className="w-3.5 h-3.5 text-sky-400" />
                    <span>Add / Customize Curriculum Subject</span>
                  </h4>
                  <button
                    type="button"
                    onClick={handleResetDefaults}
                    className="text-[11px] text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Defaults</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Subject Name (English)</label>
                    <input
                      type="text"
                      required
                      value={subName}
                      onChange={(e) => setSubName(e.target.value)}
                      placeholder="e.g. Economics"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Amharic Name</label>
                    <input
                      type="text"
                      value={subNameAmharic}
                      onChange={(e) => setSubNameAmharic(e.target.value)}
                      placeholder="e.g. ኢኮኖሚክስ"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Afaan Oromoo Name</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={subNameOromo}
                        onChange={(e) => setSubNameOromo(e.target.value)}
                        placeholder="e.g. Ikonoomiksii"
                        className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              {/* Subject List */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-slate-300">Active Curriculum Subjects ({subjects.length})</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                  {subjects.map((s) => (
                    <div
                      key={s.id}
                      className="p-3 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-xs text-white">{s.name}</div>
                        <div className="text-[10px] text-slate-400">
                          {s.nameAmharic} • {s.nameOromo}
                        </div>
                      </div>

                      {s.isCustom && (
                        <button
                          onClick={() => handleDeleteSubject(s.id)}
                          className="p-1 text-slate-500 hover:text-rose-400 rounded-lg transition-colors"
                          title="Delete subject"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
