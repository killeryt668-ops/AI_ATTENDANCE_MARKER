import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Radio, 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  Monitor, 
  User, 
  ArrowRight,
  Wifi,
  AlertTriangle
} from 'lucide-react';
import IconBadge from './common/IconBadge';

export default function HomeView({ 
  currentStudent, 
  session, 
  currentRole, 
  onNavigate, 
  onSimulateCheckIn 
}) {
  const [tappedSuccess, setTappedSuccess] = useState(false);

  const handleTap = () => {
    onSimulateCheckIn();
    setTappedSuccess(true);
    setTimeout(() => setTappedSuccess(false), 3000);
  };

  const isLowAttendance = (currentStudent?.current_attendance_pct || 95.8) < 75.0;

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      
      {/* 1. Hero Card - Deep Black Glass & Electric Blue Accents */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-blue-500/25">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-sky-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30">
              <Radio className="w-3.5 h-3.5 animate-pulse text-blue-400" />
              <span>Single-Camera Continuous Monitoring Active</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-white">{currentRole === 'FACULTY' ? 'Dr. Evelyn Vance' : currentStudent?.name || 'Alex Mercer'}</span>
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {currentRole === 'FACULTY' 
                ? 'Your lecture session CS401 is running. Overhead camera is actively logging dwell accumulation and anti-proxy verification.'
                : 'Your attendance is verified via doorway Near-Infrared 2FA and continuous classroom dwell tracking. 100% ephemeral zero-retention.'}
            </p>
          </div>

          {/* Quick Check-in CTA Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <button
              onClick={handleTap}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-sm shadow-[0_0_25px_rgba(59,130,246,0.4)] flex items-center justify-center gap-2.5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Wifi className="w-4 h-4 rotate-90" />
              <span>{tappedSuccess ? 'Doorway 2FA Verified!' : 'Simulate Doorway NFC Tap'}</span>
            </button>
          </div>
        </div>

        {/* Real-time Confirmation Toast inside hero */}
        {tappedSuccess && (
          <div className="mt-4 p-3 rounded-xl bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-semibold flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
            <span>NFC badge tapped at Hall 304 Doorway. Periocular Near-Infrared confidence: 99.4%. Dwell accumulation started!</span>
          </div>
        )}
      </div>

      {/* 2. Active Session Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Live Class Tracking */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 border border-blue-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <IconBadge icon={Clock} size="sm" variant="blue" />
                <div>
                  <h3 className="text-sm font-bold text-white">Live Classroom Session</h3>
                  <p className="text-xs text-slate-400">Continuous 45-Minute AI Presence Tracking</p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30">
                ACTIVE • 45m Lecture
              </span>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#060913]/70 border border-white/5 space-y-1">
                <span className="text-xs text-slate-400 font-mono">Course Code & Title</span>
                <div className="text-base font-bold text-white">{session?.course_code || 'CS401'}: {session?.course_name || 'AI & Neural Systems'}</div>
                <div className="text-xs text-blue-400 font-medium">Room: Hall 304 (Single Camera Array)</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#060913]/70 border border-white/5 space-y-1">
                <span className="text-xs text-slate-400 font-mono">Lead Instructor</span>
                <div className="text-base font-bold text-white">{session?.faculty_name || 'Dr. Evelyn Vance'}</div>
                <div className="text-xs text-slate-400">Department of Computer Science & AI</div>
              </div>
            </div>

            {/* Dwell Progress Bar */}
            <div className="mt-5 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300">Classroom Dwell Elapsed:</span>
                <strong className="text-blue-400">{session?.elapsed_minutes || 32.5} mins / 45 mins (72%)</strong>
              </div>
              <div className="w-full h-3 rounded-full bg-[#060913] border border-white/10 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-sky-400 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-500"
                  style={{ width: '72%' }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 font-mono pt-1">
                <span className="text-rose-400">&lt; 30m: Absent</span>
                <span className="text-amber-400">30–44m: Review Flag</span>
                <span className="text-blue-400 font-bold">≥ 45m: Verified Present</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-slate-400">Want full classroom attendance controls?</span>
            <button
              onClick={() => onNavigate('MONITOR')}
              className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 transition-colors"
            >
              <span>Open Faculty Monitor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right 1 Col: Overall Standing Summary */}
        <div className="glass-panel rounded-3xl p-6 border border-blue-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-white/10">
              <IconBadge icon={Award} size="sm" variant="blue" />
              <div>
                <h3 className="text-sm font-bold text-white">Academic Standing</h3>
                <p className="text-xs text-slate-400">Exam Eligibility Baseline: ≥75%</p>
              </div>
            </div>

            {/* Circular Percentage Ring */}
            <div className="flex flex-col items-center justify-center py-6">
              <div className="relative w-36 h-36 rounded-full border-4 border-blue-500/30 flex flex-col items-center justify-center bg-[#060913] shadow-[0_0_30px_rgba(59,130,246,0.25)]">
                <span className="text-3xl font-black text-white font-mono">
                  {currentStudent?.current_attendance_pct || 95.8}%
                </span>
                <span className="text-[11px] text-blue-400 font-bold uppercase tracking-wider mt-0.5">
                  Eligible
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2.5 rounded-xl bg-[#060913]/60 border border-white/5">
                <span className="text-slate-400">Sessions Attended:</span>
                <strong className="text-white font-mono">{currentStudent?.attended_sessions || 23} / {currentStudent?.total_sessions || 24}</strong>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#060913]/60 border border-white/5">
                <span className="text-slate-400">Continuous Assessment:</span>
                <strong className="text-blue-400 font-mono">94.2% (Grade: A)</strong>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('PROGRESS')}
            className="w-full mt-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all"
          >
            <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
            <span>View Full Attendance Progress</span>
          </button>
        </div>

      </div>

      {/* 3. Quick Action Cards - 3 Clean Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div 
          onClick={() => onNavigate('PROGRESS')}
          className="glass-card rounded-2xl p-5 border cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <IconBadge icon={TrendingUp} size="md" variant="blue" />
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
          </div>
          <h4 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">Progress & Logs</h4>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Review detailed weekly attendance trends, session history, and continuous evaluation marks.
          </p>
        </div>

        <div 
          onClick={() => onNavigate('MONITOR')}
          className="glass-card rounded-2xl p-5 border cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <IconBadge icon={Monitor} size="md" variant="blue" />
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
          </div>
          <h4 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">Faculty Monitor</h4>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Live classroom grid, 45-minute progression timer, and 1-click proxy exception triage panel.
          </p>
        </div>

        <div 
          onClick={() => onNavigate('PROFILE')}
          className="glass-card rounded-2xl p-5 border cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <IconBadge icon={User} size="md" variant="white" />
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>
          <h4 className="text-base font-bold text-white group-hover:text-white transition-colors">Student Profile & Pass</h4>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Access your digital NFC student pass, QR code credential, and biometric privacy assurances.
          </p>
        </div>

      </div>

    </div>
  );
}
