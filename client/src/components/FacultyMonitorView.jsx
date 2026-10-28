import React, { useState } from 'react';
import { 
  Monitor, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  UserCheck, 
  ShieldAlert, 
  Eye, 
  Users, 
  Radio,
  ChevronRight,
  Wifi
} from 'lucide-react';
import IconBadge from './common/IconBadge';

export default function FacultyMonitorView({ 
  session, 
  students, 
  exceptions, 
  onControlSession, 
  onReviewException, 
  onTapNfc 
}) {
  const [isPlaying, setIsPlaying] = useState(true);

  const elapsedMin = session?.elapsed_minutes || 32.5;
  const targetMin = session?.duration_minutes || 45;
  const progressPct = Math.min(100, Math.round((elapsedMin / targetMin) * 100));

  const presentCount = students.filter(s => s.final_status === 'PRESENT' || (s.dwell_minutes || 0) >= 45).length;
  const reviewCount = students.filter(s => s.final_status === 'REVIEW_REQUIRED' || ((s.dwell_minutes || 0) >= 30 && (s.dwell_minutes || 0) < 45)).length;
  const absentCount = students.filter(s => s.final_status === 'ABSENT' || (s.dwell_minutes || 0) < 30).length;
  const pendingExceptions = exceptions.filter(e => e.status === 'PENDING');

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    onControlSession(isPlaying ? 'PAUSE' : 'START');
  };

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      
      {/* 1. Header & Live Lecture Progression Console */}
      <div className="glass-panel rounded-3xl p-6 border border-blue-500/25 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30">
                {session?.course_code || 'CS401'} • HALL 304
              </span>
              <span className="flex items-center gap-1.5 text-xs text-blue-400 font-mono">
                <Radio className="w-3 h-3 animate-pulse" /> AI Camera Array Online
              </span>
            </div>
            
            <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
              <IconBadge icon={Monitor} size="sm" variant="blue" />
              <span>Faculty Live Attendance Monitor</span>
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Instructor: <span className="text-white font-bold">{session?.faculty_name || 'Dr. Evelyn Vance'}</span> • Single Overhead AI Camera Continuous Tracking
            </p>
          </div>

          {/* Dwell Progress Bar Console */}
          <div className="w-full lg:w-96 rounded-2xl p-4 bg-[#060913]/80 border border-blue-500/20 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs mb-2 font-mono">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                Lecture Time: <strong className="text-white">{elapsedMin}m</strong> / {targetMin}m
              </span>
              <span className="text-blue-400 font-bold">{progressPct}% Complete</span>
            </div>

            <div className="w-full h-3 rounded-full bg-[#060913] border border-white/10 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-sky-400 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)] transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            <div className="flex justify-between text-[10px] text-slate-400 mt-1.5 font-mono">
              <span className="text-rose-400">&lt; 30m: Absent</span>
              <span className="text-amber-400">30–44m: Review</span>
              <span className="text-blue-400 font-bold">≥ 45m: Present</span>
            </div>
          </div>

          {/* Play / Pause Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlayback}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                isPlaying 
                  ? 'bg-[#060913] hover:bg-white/5 border border-white/10 text-white' 
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-white" />}
              <span>{isPlaying ? 'Pause Timer' : 'Resume Lecture'}</span>
            </button>
          </div>
        </div>

        {/* 4 Clean Stats Chips */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mt-6 pt-5 border-t border-white/10">
          <div className="p-3.5 rounded-2xl bg-[#060913]/60 border border-white/5 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-slate-400 uppercase font-mono font-semibold">Total Enrolled</div>
              <div className="text-xl font-black text-white mt-0.5">{students.length} Students</div>
            </div>
            <IconBadge icon={Users} size="xs" variant="white" />
          </div>

          <div className="p-3.5 rounded-2xl bg-[#060913]/60 border border-blue-500/20 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-blue-400 uppercase font-mono font-semibold">Present (≥45m)</div>
              <div className="text-xl font-black text-blue-400 mt-0.5">{presentCount} Verified</div>
            </div>
            <IconBadge icon={CheckCircle2} size="xs" variant="blue" />
          </div>

          <div className="p-3.5 rounded-2xl bg-[#060913]/60 border border-amber-500/20 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-amber-400 uppercase font-mono font-semibold">Review Flag</div>
              <div className="text-xl font-black text-amber-400 mt-0.5">{reviewCount} Pending</div>
            </div>
            <IconBadge icon={AlertTriangle} size="xs" variant="amber" />
          </div>

          <div className="p-3.5 rounded-2xl bg-[#060913]/60 border border-rose-500/20 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-rose-400 uppercase font-mono font-semibold">Absent (&lt;30m)</div>
              <div className="text-xl font-black text-rose-400 mt-0.5">{absentCount} Deficit</div>
            </div>
            <IconBadge icon={XCircle} size="xs" variant="rose" />
          </div>
        </div>

      </div>

      {/* 2. Exception Review Drawer (if any proxy flags) */}
      {pendingExceptions.length > 0 && (
        <div className="glass-panel rounded-3xl p-5 border border-amber-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IconBadge icon={ShieldAlert} size="xs" variant="amber" />
              <h3 className="text-sm font-bold text-white">Proxy Verification Flag (12h Auto-Erase)</h3>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
              Action Required
            </span>
          </div>

          {pendingExceptions.map((exc) => (
            <div key={exc.id} className="p-4 rounded-2xl bg-[#060913]/80 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-sm font-bold text-white">{exc.student_name} ({exc.roll_no})</div>
                <div className="text-xs text-slate-400 mt-0.5">
                  NFC tapped at doorway, but Near-Infrared facial confidence was {Math.round((exc.face_confidence || 0.54) * 100)}%. Requires instructor confirmation.
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                <button
                  onClick={() => onReviewException(exc.id, 'REJECT_ABSENT')}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 border border-rose-500/30 text-xs font-bold transition-all"
                >
                  Flag Absent
                </button>
                <button
                  onClick={() => onReviewException(exc.id, 'APPROVE_PRESENT')}
                  className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-[0_0_12px_rgba(59,130,246,0.4)] transition-all"
                >
                  Approve Present
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. Live Student Attendance Grid */}
      <div className="glass-panel rounded-3xl p-6 border border-blue-500/20">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <IconBadge icon={UserCheck} size="xs" variant="blue" />
              <span>Live Student Attendance & Dwell Accumulator</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Real-time attendance calculated from overhead Near-Infrared computer vision array.</p>
          </div>
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">
            Class: CS401
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {students.map((student) => {
            const dwellMins = student.dwell_minutes || Number(((student.dwell_seconds || 0) / 60).toFixed(1));
            const dwellPct = Math.min(100, Math.round((dwellMins / 45) * 100));
            const isTapped = Boolean(student.doorway_tap_time || student.nfc_tap_time);

            let statusLabel = 'Present (≥45m)';
            let statusBadge = 'bg-blue-500/15 text-blue-300 border-blue-500/30';
            let barColor = 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]';

            if (dwellMins < 30) {
              statusLabel = 'Absent (<30m)';
              statusBadge = 'bg-rose-500/15 text-rose-400 border-rose-500/30';
              barColor = 'bg-rose-500';
            } else if (dwellMins < 45) {
              statusLabel = 'Review Flag';
              statusBadge = 'bg-amber-500/15 text-amber-300 border-amber-500/30';
              barColor = 'bg-amber-500';
            }

            return (
              <div 
                key={student.id}
                className="glass-card rounded-2xl p-4 border flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center font-bold text-blue-300 text-xs shadow-sm">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white leading-tight">{student.name}</h4>
                        <span className="text-[11px] font-mono text-slate-400">{student.roll_no}</span>
                      </div>
                    </div>

                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${statusBadge}`}>
                      {statusLabel}
                    </span>
                  </div>

                  {/* Dwell details */}
                  <div className="mt-3.5 space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-300 font-mono text-[11px]">
                      <span>Camera Dwell Time:</span>
                      <strong className="text-white">{dwellMins}m / 45m ({dwellPct}%)</strong>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#060913] border border-white/5 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${barColor}`}
                        style={{ width: `${dwellPct}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400">
                    Door 2FA: {isTapped ? <span className="text-blue-400 font-semibold">Verified</span> : <span className="text-slate-500">Not Tapped</span>}
                  </span>
                  <button
                    onClick={() => onTapNfc({ studentId: student.id, nfcUid: student.nfc_uid })}
                    className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span>Simulate Tap</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
