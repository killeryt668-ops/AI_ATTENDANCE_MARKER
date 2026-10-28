import React, { useState } from 'react';
import { 
  ShieldCheck, 
  GraduationCap, 
  UserCheck, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import IconBadge from './common/IconBadge';

export default function LoginPage({ onLoginSuccess }) {
  const [role, setRole] = useState('STUDENT'); // 'STUDENT' or 'FACULTY'
  const [username, setUsername] = useState('alex');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRoleSwitch = (newRole) => {
    setRole(newRole);
    setErrorMsg('');
    if (newRole === 'STUDENT') {
      setUsername('alex');
      setPassword('password123');
    } else {
      setUsername('vance');
      setPassword('password123');
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Validate credentials
      if (role === 'STUDENT') {
        if ((username === 'alex' || username === '2026-CS-01' || username === 'STU101') && password) {
          onLoginSuccess({
            role: 'STUDENT',
            id: 'STU101',
            name: 'Alex Mercer',
            roll_no: '2026-CS-01',
            class_id: 'CS401',
            nfc_uid: 'NFC-7A39B1',
            current_attendance_pct: 95.8
          });
        } else {
          setErrorMsg('Invalid student ID or password. Use demo account below.');
        }
      } else {
        if ((username === 'vance' || username === 'FAC001') && password) {
          onLoginSuccess({
            role: 'FACULTY',
            id: 'FAC001',
            name: 'Dr. Evelyn Vance',
            department: 'Computer Science & AI',
            room_assigned: 'Hall 304',
            nfc_uid: 'NFC-FAC-9901'
          });
        } else {
          setErrorMsg('Invalid faculty ID or password. Use demo account below.');
        }
      }
    }, 600);
  };

  const handleQuickDemoLogin = (demoRole) => {
    if (demoRole === 'STUDENT') {
      onLoginSuccess({
        role: 'STUDENT',
        id: 'STU101',
        name: 'Alex Mercer',
        roll_no: '2026-CS-01',
        class_id: 'CS401',
        nfc_uid: 'NFC-7A39B1',
        current_attendance_pct: 95.8
      });
    } else {
      onLoginSuccess({
        role: 'FACULTY',
        id: 'FAC001',
        name: 'Dr. Evelyn Vance',
        department: 'Computer Science & AI',
        room_assigned: 'Hall 304',
        nfc_uid: 'NFC-FAC-9901'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden blue-grid-bg">
      
      {/* Background Radial Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glassmorphism Card */}
      <div className="w-full max-w-md glass-panel rounded-3xl p-6 sm:p-8 border border-blue-500/30 relative z-10 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(59,130,246,0.25)] animate-fade-in">
        
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-400 p-[1.5px] shadow-[0_0_25px_rgba(59,130,246,0.45)] mb-3">
            <div className="w-full h-full bg-[#060913] rounded-[14px] flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-blue-400" />
            </div>
          </div>

          <h1 className="text-2xl font-black text-white tracking-tight">
            UniSync <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">AI</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            AI-Driven Multi-Factor Ephemeral Attendance Portal
          </p>
        </div>

        {/* Dual Role Tabs: Student vs Faculty */}
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-[#0B1120] border border-blue-500/20 mb-6 text-xs font-bold">
          <button
            type="button"
            onClick={() => handleRoleSwitch('STUDENT')}
            className={`py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
              role === 'STUDENT'
                ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Student Portal</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleSwitch('FACULTY')}
            className={`py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
              role === 'FACULTY'
                ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Faculty Portal</span>
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 mb-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
              {role === 'STUDENT' ? 'Student ID / Roll No' : 'Faculty ID / Username'}
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={role === 'STUDENT' ? 'e.g. 2026-CS-01 or alex' : 'e.g. FAC001 or vance'}
                className="w-full px-4 py-3 rounded-xl bg-[#060913] border border-white/10 text-white text-xs font-mono placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
              <User className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl bg-[#060913] border border-white/10 text-white text-xs font-mono placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-500 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-xs shadow-[0_0_20px_rgba(59,130,246,0.4)] flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In to {role === 'STUDENT' ? 'Student Portal' : 'Faculty Console'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* 1-Click Quick Demo Login Shortcuts */}
        <div className="mt-6 pt-5 border-t border-white/10">
          <div className="text-[11px] font-mono text-slate-400 text-center uppercase tracking-wider mb-2.5">
            Quick 1-Click Demo Login:
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('STUDENT')}
              className="p-2.5 rounded-xl bg-[#060913] hover:bg-blue-600/10 border border-blue-500/20 text-left transition-all hover:border-blue-400 group"
            >
              <div className="text-xs font-bold text-white group-hover:text-blue-400">Alex Mercer</div>
              <div className="text-[10px] text-slate-400 font-mono">Student • CS401</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('FACULTY')}
              className="p-2.5 rounded-xl bg-[#060913] hover:bg-blue-600/10 border border-blue-500/20 text-left transition-all hover:border-blue-400 group"
            >
              <div className="text-xs font-bold text-white group-hover:text-blue-400">Dr. E. Vance</div>
              <div className="text-[10px] text-slate-400 font-mono">Faculty • Hall 304</div>
            </button>
          </div>
        </div>

        {/* Security / Privacy Badge */}
        <div className="mt-5 text-center">
          <span className="text-[10px] font-mono text-slate-500 inline-flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-blue-400" />
            12-Hour Ephemeral Zero-Retention Certified
          </span>
        </div>

      </div>

    </div>
  );
}
