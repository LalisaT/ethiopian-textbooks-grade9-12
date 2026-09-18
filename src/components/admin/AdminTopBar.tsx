import React from 'react';
import { Shield, PlusCircle, LayoutDashboard, HardDrive, LogOut, Zap, UserCheck, Megaphone } from 'lucide-react';

interface AdminTopBarProps {
  storageUsedMb: number;
  customBooksCount: number;
  onOpenUploadModal: () => void;
  onOpenBatchModal: () => void;
  onOpenBroadcastModal: () => void;
  onOpenDashboard: () => void;
  onExitAdmin: () => void;
  isDashboardOpen: boolean;
}

export const AdminTopBar: React.FC<AdminTopBarProps> = ({
  storageUsedMb,
  customBooksCount,
  onOpenUploadModal,
  onOpenBatchModal,
  onOpenBroadcastModal,
  onOpenDashboard,
  onExitAdmin,
  isDashboardOpen,
}) => {
  return (
    <div className="sticky top-0 z-50 bg-slate-950 text-white border-b border-amber-500/50 shadow-2xl px-4 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Super Admin Status & Metric */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/40 text-xs font-black">
            <UserCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>ADMIN: @lalion</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300">
            <span className="flex items-center gap-1 bg-slate-900 px-2.5 py-0.5 rounded-lg border border-slate-800 font-mono">
              <HardDrive className="w-3 h-3 text-emerald-400" />
              <span>{storageUsedMb} MB Storage</span>
            </span>
            <span className="bg-slate-900 px-2.5 py-0.5 rounded-lg border border-slate-800 font-bold text-amber-400">
              {customBooksCount} Custom Uploads
            </span>
          </div>
        </div>

        {/* Right: Quick Admin Actions */}
        <div className="flex items-center gap-2">
          {/* FAST BULK BATCH UPLOAD BUTTON */}
          <button
            onClick={onOpenBatchModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 rounded-xl text-xs font-black shadow-md transition-all active:scale-95"
            title="Upload all your textbooks simultaneously in seconds"
          >
            <Zap className="w-3.5 h-3.5 text-slate-950 fill-current" />
            <span>Bulk Upload All</span>
          </button>

          {/* Broadcast Alert & Announcement Button */}
          <button
            onClick={onOpenBroadcastModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 text-white rounded-xl text-xs font-black shadow-md transition-all active:scale-95"
            title="Send push alert with sound to all devices"
          >
            <Megaphone className="w-3.5 h-3.5" />
            <span>Post Alert</span>
          </button>

          {/* Single Upload Book Button */}
          <button
            onClick={onOpenUploadModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-extrabold shadow-md transition-all active:scale-95"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Upload Single Book</span>
          </button>

          {/* Manage Catalog Dashboard Button */}
          <button
            onClick={onOpenDashboard}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              isDashboardOpen
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>{isDashboardOpen ? 'Close Dashboard' : 'Manage & Customize Books'}</span>
          </button>

          {/* Exit Admin Mode */}
          <button
            onClick={onExitAdmin}
            className="flex items-center gap-1 px-3 py-1.5 bg-rose-950/80 hover:bg-rose-900 text-rose-300 rounded-xl text-xs font-bold transition-colors border border-rose-800/60"
            title="Log out from Admin Mode"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};
