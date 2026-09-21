import React from 'react';
import { LanguageCode } from '../../types/book';
import { useTranslation } from '../../i18n/useTranslation';
import { Globe, BookOpen, CheckCircle2, MapPin } from 'lucide-react';

interface LanguageBrowseSectionProps {
  selectedLanguage: LanguageCode | 'all';
  onSelectLanguage: (lang: LanguageCode | 'all') => void;
}

const LANGUAGE_LIST: {
  code: LanguageCode | 'all';
  title: string;
  nativeTitle: string;
  flag: string;
  regions: string;
  sampleSubjects: string;
  badgeColor: string;
}[] = [
  {
    code: 'all',
    title: 'All Languages',
    nativeTitle: 'ሁሉም ቋንቋዎች / Afaanota Hunda',
    flag: 'ET',
    regions: 'Nationwide & All Regional States',
    sampleSubjects: 'All Subjects (Amharic, Oromo, Tigrinya, Somali, English)',
    badgeColor: 'from-slate-900 to-slate-800 text-white',
  },
  {
    code: 'am',
    title: 'Amharic Medium',
    nativeTitle: 'አማርኛ ቋንቋ መማሪያ መጽሐፍት',
    flag: 'AM',
    regions: 'አማራ፣ አዲስ አበባ፣ ደቡብ፣ ሲዳማ፣ ቤንሻንጉል ወዘተ',
    sampleSubjects: 'ሒሳብ፣ አጠቃላይ ሳይንስ፣ ማህበራዊ ሳይንስ፣ የዜግነት ትምህርት፣ የአካባቢ ሳይንስ',
    badgeColor: 'from-amber-600 to-yellow-700 text-white',
  },
  {
    code: 'om',
    title: 'Afaan Oromoo Medium',
    nativeTitle: 'Kitaabota Afaan Oromoo',
    flag: 'OM',
    regions: 'Mootummaa Naannoo Oromiyaa fi Finfinnee',
    sampleSubjects: 'Herrega, Saayinsii Waliigalaa, Saayinsii Hawaasaa, Barnoota Lammummaa',
    badgeColor: 'from-red-600 to-amber-700 text-white',
  },
  {
    code: 'ti',
    title: 'Tigrinya Medium',
    nativeTitle: 'መጻሕፍቲ ቋንቋ ትግርኛ',
    flag: 'TI',
    regions: 'ክልላዊ መንግስቲ ትግራይ',
    sampleSubjects: 'ሒሳብ፣ ሓፈሻዊ ሳይንስ፣ ማሕበራዊ ሳይንስ፣ ትምህርቲ ዜግነት',
    badgeColor: 'from-yellow-600 to-rose-700 text-white',
  },
  {
    code: 'so',
    title: 'Somali Medium',
    nativeTitle: 'Buugaagta Afka Soomaaliga',
    flag: 'SO',
    regions: 'Dowlad Deegaanka Soomaalida Itoobiya',
    sampleSubjects: 'Xisaab, Sayniska Guud, Cilmiga Bulshada, Waddaniyadda',
    badgeColor: 'from-teal-600 to-cyan-800 text-white',
  },
  {
    code: 'en',
    title: 'English Medium',
    nativeTitle: 'English Standard Edition',
    flag: 'EN',
    regions: 'Federal Standard / All Regions',
    sampleSubjects: 'Mathematics, General Science, Social Studies, English, Citizenship, IT, CTE',
    badgeColor: 'from-blue-600 to-indigo-800 text-white',
  },
];

export const LanguageBrowseSection: React.FC<LanguageBrowseSectionProps> = ({
  selectedLanguage,
  onSelectLanguage,
}) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Textbooks by Language (በቋንቋ ፈልግ / Afaaniin Barbaadi)
            </h3>
            <p className="text-xs text-slate-500">
              Select your language to explore textbooks taught in your mother-tongue and regional medium
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {LANGUAGE_LIST.map((langItem) => {
          const isSelected = selectedLanguage === langItem.code;
          return (
            <button
              key={langItem.code}
              onClick={() => onSelectLanguage(langItem.code)}
              className={`p-4 rounded-2xl text-left border transition-all relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-emerald-50/80 dark:bg-emerald-950/60 border-emerald-500 shadow-md ring-2 ring-emerald-500'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{langItem.flag}</span>
                    <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                      {langItem.title}
                    </span>
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  )}
                </div>

                <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-1">
                  {langItem.nativeTitle}
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mb-2 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>{langItem.regions}</span>
                </p>
              </div>

              <div className="text-[10px] text-slate-600 dark:text-slate-300 bg-white/70 dark:bg-slate-900/70 p-2 rounded-xl border border-slate-200/50 dark:border-slate-800/50 line-clamp-1 font-medium">
                {langItem.sampleSubjects}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
