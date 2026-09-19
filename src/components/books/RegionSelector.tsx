import React from 'react';
import { ETHIOPIAN_REGIONS } from '../../data/regions';
import { RegionId } from '../../types/book';
import { useTranslation } from '../../i18n/useTranslation';
import { MapPin, CheckCircle } from 'lucide-react';

interface RegionSelectorProps {
  selectedRegion: RegionId | 'all';
  onSelectRegion: (regionId: RegionId | 'all') => void;
  compact?: boolean;
}

export const RegionSelector: React.FC<RegionSelectorProps> = ({
  selectedRegion,
  onSelectRegion,
  compact = false,
}) => {
  const { language, t } = useTranslation();

  const getRegionName = (reg: typeof ETHIOPIAN_REGIONS[0]) => {
    switch (language) {
      case 'am':
        return reg.nameAmharic;
      case 'om':
        return reg.nameOromo;
      case 'ti':
        return reg.nameTigrinya;
      case 'so':
        return reg.nameSomali;
      default:
        return reg.name;
    }
  };

  if (compact) {
    return (
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => onSelectRegion('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            selectedRegion === 'all'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
              : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <span>{t('allRegions')}</span>
        </button>
        {ETHIOPIAN_REGIONS.map((reg) => {
          const isSelected = selectedRegion === reg.id;
          return (
            <button
              key={reg.id}
              onClick={() => onSelectRegion(reg.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isSelected
                  ? `${reg.badgeColor} shadow-sm ring-2 ring-offset-1 ring-emerald-500`
                  : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <span>{getRegionName(reg)}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Ethiopian Regions & Regional Bureaus
            </h3>
            <p className="text-xs text-slate-500">
              Select your region to explore customized regional curriculum & mother-tongue textbooks
            </p>
          </div>
        </div>
        {selectedRegion !== 'all' && (
          <button
            onClick={() => onSelectRegion('all')}
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Show All Regions
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
        <button
          onClick={() => onSelectRegion('all')}
          className={`p-3 rounded-2xl text-left border text-xs font-semibold transition-all relative ${
            selectedRegion === 'all'
              ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-emerald-500'
              : 'bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-emerald-400'
          }`}
        >
          <div className="text-base mb-1">🇪🇹</div>
          <div className="font-bold">{t('allRegions')}</div>
          <div className="text-[10px] text-slate-400 font-normal mt-0.5">Nationwide + All Bureaus</div>
          {selectedRegion === 'all' && (
            <CheckCircle className="w-3.5 h-3.5 absolute top-2 right-2 text-emerald-400" />
          )}
        </button>

        {ETHIOPIAN_REGIONS.map((reg) => {
          const isSelected = selectedRegion === reg.id;
          return (
            <button
              key={reg.id}
              onClick={() => onSelectRegion(reg.id)}
              className={`p-3 rounded-2xl text-left border text-xs font-medium transition-all relative ${
                isSelected
                  ? `${reg.badgeColor} border-transparent shadow-md ring-2 ring-offset-2 ring-emerald-500`
                  : 'bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="font-bold text-xs truncate">{getRegionName(reg)}</div>
              <div className={`text-[10px] truncate mt-0.5 ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                {reg.id === 'addis_ababa' || reg.id === 'dire_dawa' ? 'Chartered City' : (reg.capital || 'Regional State')}
              </div>
              {isSelected && (
                <CheckCircle className="w-3.5 h-3.5 absolute top-2 right-2 text-white" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
