export interface LanguageCategoryItem {
  id: string;
  name: string;
  nativeName?: string;
  colorDot?: string;
  region?: string;
  isCustom?: boolean;
}

export interface SubjectCategoryItem {
  id: string;
  name: string;
  nameAmharic?: string;
  nameOromo?: string;
  isCustom?: boolean;
}

const STORAGE_KEY_LANG_CATEGORIES = 'ethio_custom_lang_categories_v2';
const STORAGE_KEY_SUBJECT_CATEGORIES = 'ethio_custom_sub_categories_v3';

export const DEFAULT_LANGUAGE_CATEGORIES: LanguageCategoryItem[] = [
  { id: 'all', name: 'All Languages', colorDot: 'indigo', region: 'All' },
  { id: 'om', name: 'Afaan Oromoo (Oromia)', nativeName: 'Afaan Oromoo', colorDot: 'emerald', region: 'Oromia' },
  { id: 'am', name: 'Amharic (አማርኛ)', nativeName: 'አማርኛ', colorDot: 'blue', region: 'Amhara / National' },
  { id: 'en', name: 'English (National)', nativeName: 'English', colorDot: 'amber', region: 'National' },
  { id: 'ti', name: 'Tigrinya (ትግርኛ)', nativeName: 'ትግርኛ', colorDot: 'purple', region: 'Tigray' },
  { id: 'so', name: 'Somali (Af-Soomaali)', nativeName: 'Af-Soomaali', colorDot: 'orange', region: 'Somali' },
  { id: 'sid', name: 'Sidama (Sidaamu Afoo)', nativeName: 'Sidaamu Afoo', colorDot: 'red', region: 'Sidama' },
];

export const DEFAULT_ACADEMIC_SUBJECTS: SubjectCategoryItem[] = [
  { id: 'physics', name: 'Physics', nameAmharic: 'ፊዚክስ', nameOromo: 'Fiiziksii' },
  { id: 'chemistry', name: 'Chemistry', nameAmharic: 'ኬሚስትሪ', nameOromo: 'Keemistirii' },
  { id: 'biology', name: 'Biology', nameAmharic: 'ባዮሎጂ', nameOromo: 'Baayoloojii' },
  { id: 'mathematics', name: 'Mathematics (Natural)', nameAmharic: 'ሒሳብ (ተፈጥሮ ሳይንስ)', nameOromo: 'Herrega (Uumamaa)' },
  { id: 'mathematics_social', name: 'Mathematics (Social)', nameAmharic: 'ሒሳብ (ማህበራዊ ሳይንስ)', nameOromo: 'Herrega (Hawaasaa)' },
  { id: 'english', name: 'English Language', nameAmharic: 'እንግሊዝኛ ቋንቋ', nameOromo: 'Afaan Ingilizii' },
  { id: 'economics', name: 'Economics', nameAmharic: 'ኢኮኖሚክስ', nameOromo: 'Ikonomiksii' },
  { id: 'history', name: 'History', nameAmharic: 'ታሪክ', nameOromo: 'Seenaa' },
  { id: 'geography', name: 'Geography', nameAmharic: 'ጂኦግራፊ', nameOromo: 'Ji\'oogiraafii' },
  { id: 'citizenship', name: 'Citizenship Education', nameAmharic: 'የዜግነት ትምህርት', nameOromo: 'Barnoota Lammummaa' },
  { id: 'sat', name: 'Scholastic Aptitude (SAT)', nameAmharic: 'የክህሎት ፈተና (SAT)', nameOromo: "Ga'umsa Barnootaa (SAT)" },
  { id: 'it', name: 'Information Technology (IT)', nameAmharic: 'ኢንፎርሜሽን ቴክኖሎጂ', nameOromo: 'Teeknooloojii Odeeffannoo' },
];

export const CategoryService = {
  getLanguageCategories(): LanguageCategoryItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_LANG_CATEGORIES);
      if (data) {
        return JSON.parse(data);
      }
    } catch {}
    return DEFAULT_LANGUAGE_CATEGORIES;
  },

  saveLanguageCategory(cat: LanguageCategoryItem): void {
    const list = this.getLanguageCategories();
    const idx = list.findIndex((c) => c.id === cat.id);
    if (idx >= 0) {
      list[idx] = { ...cat, isCustom: true };
    } else {
      list.push({ ...cat, isCustom: true });
    }
    localStorage.setItem(STORAGE_KEY_LANG_CATEGORIES, JSON.stringify(list));
  },

  deleteLanguageCategory(id: string): void {
    const list = this.getLanguageCategories().filter((c) => c.id !== id);
    localStorage.setItem(STORAGE_KEY_LANG_CATEGORIES, JSON.stringify(list));
  },

  getSubjectCategories(): SubjectCategoryItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_SUBJECT_CATEGORIES);
      if (data) {
        const parsed: SubjectCategoryItem[] = JSON.parse(data);
        if (Array.isArray(parsed)) {
          if (!parsed.some((s) => s.id === 'sat')) {
            parsed.push({ id: 'sat', name: 'Scholastic Aptitude (SAT)', nameAmharic: 'የክህሎት ፈተና (SAT)', nameOromo: "Ga'umsa Barnootaa (SAT)" });
          }
          return parsed;
        }
      }
    } catch {}
    return DEFAULT_ACADEMIC_SUBJECTS;
  },

  saveSubjectCategory(sub: SubjectCategoryItem): void {
    const list = this.getSubjectCategories();
    const idx = list.findIndex((s) => s.id === sub.id);
    if (idx >= 0) {
      list[idx] = { ...sub, isCustom: true };
    } else {
      list.push({ ...sub, isCustom: true });
    }
    localStorage.setItem(STORAGE_KEY_SUBJECT_CATEGORIES, JSON.stringify(list));
  },

  deleteSubjectCategory(id: string): void {
    const list = this.getSubjectCategories().filter((s) => s.id !== id);
    localStorage.setItem(STORAGE_KEY_SUBJECT_CATEGORIES, JSON.stringify(list));
  },

  resetDefaults(): void {
    localStorage.removeItem(STORAGE_KEY_LANG_CATEGORIES);
    localStorage.removeItem(STORAGE_KEY_SUBJECT_CATEGORIES);
  },
};
