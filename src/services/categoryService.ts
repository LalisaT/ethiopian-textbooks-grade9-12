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
const STORAGE_KEY_SUBJECT_CATEGORIES = 'ethio_custom_sub_categories_v2';

export const DEFAULT_LANGUAGE_CATEGORIES: LanguageCategoryItem[] = [
  { id: 'all', name: 'All Languages', colorDot: '🌐', region: 'All' },
  { id: 'om', name: 'Afaan Oromoo (Oromia)', nativeName: 'Afaan Oromoo', colorDot: '🟢', region: 'Oromia' },
  { id: 'am', name: 'Amharic (አማርኛ)', nativeName: 'አማርኛ', colorDot: '🔵', region: 'Amhara / National' },
  { id: 'en', name: 'English (National)', nativeName: 'English', colorDot: '🟡', region: 'National' },
  { id: 'ti', name: 'Tigrinya (ትግርኛ)', nativeName: 'ትግርኛ', colorDot: '🟣', region: 'Tigray' },
  { id: 'so', name: 'Somali (Af-Soomaali)', nativeName: 'Af-Soomaali', colorDot: '🟠', region: 'Somali' },
  { id: 'sid', name: 'Sidama (Sidaamu Afoo)', nativeName: 'Sidaamu Afoo', colorDot: '🔴', region: 'Sidama' },
];

export const DEFAULT_ACADEMIC_SUBJECTS: SubjectCategoryItem[] = [
  { id: 'mathematics', name: 'Mathematics', nameAmharic: 'ሒሳብ', nameOromo: 'Herrega' },
  { id: 'general_science', name: 'General Science', nameAmharic: 'አጠቃላይ ሳይንስ', nameOromo: 'Saayinsii Waliigalaa' },
  { id: 'social_studies', name: 'Social Studies', nameAmharic: 'ማህበራዊ ሳይንስ', nameOromo: 'Saayinsii Hawaasaa' },
  { id: 'citizenship', name: 'Citizenship Education', nameAmharic: 'የዜግነት ትምህርት', nameOromo: 'Barnoota Lammummaa' },
  { id: 'english', name: 'English Language', nameAmharic: 'እንግሊዝኛ ቋንቋ', nameOromo: 'Afaan Ingilizii' },
  { id: 'environmental_science', name: 'Environmental Science', nameAmharic: 'የአካባቢ ሳይንስ', nameOromo: 'Saayinsii Naannoo' },
  { id: 'it', name: 'Information Technology (IT)', nameAmharic: 'ኢንፎርሜሽን ቴክኖሎጂ', nameOromo: 'Teeknooloojii Odeeffannoo' },
  { id: 'cte', name: 'Career & Technical Education (CTE)', nameAmharic: 'የስራና ቴክኒክ', nameOromo: 'Ogummaa fi Teeknooloojii' },
  { id: 'pva', name: 'Performing & Visual Arts (PVA)', nameAmharic: 'የስነ-ጥበባት', nameOromo: 'Aartii Mul\'ataa' },
  { id: 'hpe', name: 'Health & Physical Education (HPE)', nameAmharic: 'የሰውነት ማጎልመሻና ጤና', nameOromo: 'Fayyaa fi Qor-qalbii' },
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
        return JSON.parse(data);
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
