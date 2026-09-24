import React, { useState } from 'react';
import { AuthService } from '../../services/authService';
import { Shield, User, Lock, AlertCircle, ArrowRight, BookOpen } from 'lucide-react';

interface AdminWebLoginPageProps {
  onLoginSuccess: () => void;
  onViewStudentMode?: () => void;
}

export const AdminWebLoginPage: React.FC<AdminWebLoginPageProps> = ({
  onLoginSuccess,
  onViewStudentMode,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const success = AuthService.login(username, password);
    if (success) {
      onLoginSuccess();
    } else {
      setErrorMsg('Invalid administrator credentials. Please check your username and password.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center p-4 relative overflow-hidden selection:bg-amber-500 selection:text-slate-950">
      {/* Luxury hairline gold runner */}
      <div className="luxury-flow-line h-[2px] absolute top-0 left-0 right-0 opacity-90 z-20" />

      {/* Atmospheric lighting glows */}
      <div className="absolute top-0 right-0 -mt-24 -mr-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-24 -ml-24 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-7 sm:p-9 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative z-10 backdrop-blur-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
        {/* App Logo & Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-[2px] shadow-xl shadow-amber-500/20">
            <img
              src="/brand/app-icon.jpg"
              alt="Ethiopian Textbooks Logo"
              className="w-full h-full object-cover rounded-[22px]"
            />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-black uppercase tracking-wider mb-2">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Official Admin Studio</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Notice & Broadcast Deck
            </h1>
            <p className="text-xs text-slate-300/90 mt-1 max-w-xs leading-relaxed">
              Log in to broadcast real-time notifications and manage official study notices for all students nationwide.
            </p>
          </div>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-150">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300">
              Admin Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                required
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/40 font-semibold"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                required
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/40 font-semibold"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 rounded-2xl text-xs font-black shadow-lg shadow-amber-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>Enter Admin Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Optional Student Mode Link */}
        {onViewStudentMode && (
          <div className="pt-2 text-center border-t border-slate-800/80">
            <button
              type="button"
              onClick={onViewStudentMode}
              className="text-[11px] text-slate-400 hover:text-slate-200 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Switch to Student App Preview</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
