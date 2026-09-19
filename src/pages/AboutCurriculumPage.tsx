import React from 'react';
import { useTranslation } from '../i18n/useTranslation';
import { ETHIOPIAN_REGIONS } from '../data/regions';
import { ETHIOPIAN_SUBJECTS } from '../data/subjects';
import {
  BookOpen,
  GraduationCap,
  Award,
  Globe,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Sparkles,
} from 'lucide-react';

export const AboutCurriculumPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white p-8 sm:p-12 border border-slate-800 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30 text-xs font-bold">
          <span>🇪🇹</span>
          <span>Ministry of Education (MOE) Educational Framework</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
          {t('curriculumOverviewTitle')}
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
          {t('curriculumOverviewDesc')}
        </p>
      </div>

      {/* Structure of General Education in Ethiopia */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Secondary & Preparatory Education Structure
            </h2>
            <p className="text-xs text-slate-500">
              The Ethiopian 6-2-4 Education Reform System (Grades 9–12)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-extrabold text-xs rounded-full">
                Grades 9 – 10
              </span>
              <span className="text-xs font-bold text-slate-400">General Secondary</span>
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Core High School Foundations
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              In Grades 9 and 10, all students study a common foundational curriculum spanning Physics, Chemistry, Biology, Mathematics, Citizenship, English, Information Technology, Economics, Geography, and History.
            </p>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Foundational STEM labs, molecular chemistry, kinematics & cell biology</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Preparation and career guidance for Grade 11-12 stream placement</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-extrabold text-xs rounded-full">
                Grades 11 – 12
              </span>
              <span className="text-xs font-bold text-slate-400">Preparatory & Matric</span>
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Stream Specialization & ESSLCE University Entrance
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Students branch into <strong>Natural Science</strong> (Physics, Chemistry, Biology, Advanced Math) or <strong>Social Science</strong> (Economics, Geography, History, Social Math). Grade 12 concludes with the ESSLCE National Exam.
            </p>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Grade 12 ESSLCE testing cumulative high school knowledge (Grades 9–12)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Targeted preparation for higher education and university degree placement</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Regional Educational Bureaus Adaptation */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Regional State Education Bureau Adaptations
            </h2>
            <p className="text-xs text-slate-500">
              Mother-tongue instruction & localized curriculum modules across Ethiopia
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ETHIOPIAN_REGIONS.map((reg) => (
            <div
              key={reg.id}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-slate-900 dark:text-white">
                  {reg.name}
                </h4>
              </div>
              {reg.id === 'addis_ababa' || reg.id === 'dire_dawa' ? (
                <div className="text-[11px] font-semibold text-sky-600 dark:text-sky-400">
                  Chartered City Administration
                </div>
              ) : reg.id === 'national' ? (
                <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  Seat of Federal Government: {reg.capital}
                </div>
              ) : reg.capital ? (
                <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  Capital: {reg.capital}
                </div>
              ) : null}
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                {reg.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Principles */}
      <section className="bg-emerald-50 dark:bg-emerald-950/30 rounded-3xl p-8 border border-emerald-200 dark:border-emerald-900/60 space-y-4">
        <h3 className="font-extrabold text-lg text-emerald-950 dark:text-emerald-200 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span>Core Educational Objectives of the Ethiopian Curriculum</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-700 dark:text-slate-300">
          <div className="p-4 bg-white/80 dark:bg-slate-900/80 rounded-2xl border border-emerald-100 dark:border-emerald-900/40">
            <div className="font-bold text-sm text-emerald-800 dark:text-emerald-300 mb-1">
              Scientific Temper
            </div>
            Fostering critical problem-solving, laboratory safety, and inquiry-based STEM capabilities.
          </div>
          <div className="p-4 bg-white/80 dark:bg-slate-900/80 rounded-2xl border border-emerald-100 dark:border-emerald-900/40">
            <div className="font-bold text-sm text-emerald-800 dark:text-emerald-300 mb-1">
              Vocational & Tech Readiness
            </div>
            Equipping youth with practical hands-on skills in agriculture, digital literacy, and business.
          </div>
          <div className="p-4 bg-white/80 dark:bg-slate-900/80 rounded-2xl border border-emerald-100 dark:border-emerald-900/40">
            <div className="font-bold text-sm text-emerald-800 dark:text-emerald-300 mb-1">
              Civic & Ethical Values
            </div>
            Promoting constitutional democracy, peace, unity in diversity, and national development.
          </div>
        </div>
      </section>
    </div>
  );
};
