import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  UserCheck, 
  ShieldAlert, 
  Sparkles, 
  Edit3, 
  Save, 
  ExternalLink,
  ChevronRight,
  Radio,
  Eye,
  Trash2,
  Award,
  Users
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import IconBadge from './common/IconBadge';

export default function FacultyDashboard({ 
  session, 
  students, 
  exceptions, 
  onControlSession, 
  onTapNfc, 
  onReviewException, 
  onUpdateCeGrades,
  onOpenLiveStation 
}) {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('GRID'); // 'GRID', 'EXCEPTIONS', 'CE_GRADES'
  const [editingStudent, setEditingStudent] = useState(null);
  const [ceForm, setCeForm] = useState({ asg: '', qz: '', prj: '' });

  const elapsedMin = session?.elapsed_minutes || 0;
  const targetMin = session?.duration_minutes || 45;
  const progressPct = Math.min(100, Math.round((elapsedMin / targetMin) * 100));

  // Threshold stats
  const presentCount = students.filter(s => s.final_status === 'PRESENT' || (s.dwell_minutes || 0) >= 45).length;
  const reviewCount = students.filter(s => s.final_status === 'REVIEW_REQUIRED' || s.final_status === 'PENDING' || ((s.dwell_minutes || 0) >= 30 && (s.dwell_minutes || 0) < 45)).length;
  const absentCount = students.filter(s => s.final_status === 'ABSENT' || (s.dwell_minutes || 0) < 30).length;
  const pendingExceptions = exceptions.filter(e => e.status === 'PENDING');

  const handleStartEditing = (student) => {
    setEditingStudent(student.id);
    setCeForm({
      asg: student.ce_assignment_score,
      qz: student.ce_quiz_score,
      prj: student.ce_project_score
    });
  };

  const handleSaveCe = async (studentId) => {
    await onUpdateCeGrades(studentId, {
      assignmentScore: Number(ceForm.asg),
      quizScore: Number(ceForm.qz),
      projectScore: Number(ceForm.prj)
    });
    setEditingStudent(null);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      
      {/* 1. Session Control & Master Status Card */}
      <div 
        className="glass-panel rounded-2xl p-6 relative overflow-hidden transition-all duration-300"
        style={{
          backgroundColor: `${theme.bgSurface}ee`,
          borderColor: theme.primaryBorder,
          boxShadow: `0 12px 36px rgba(0,0,0,0.4), 0 0 24px ${theme.glow}`
        }}
      >
        <div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ backgroundColor: theme.primary }}
        />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          
          {/* Left: Class & Faculty Info */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span 
                className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border"
                style={{
                  backgroundColor: theme.primaryMuted,
                  color: theme.primary,
                  borderColor: theme.primaryBorder
                }}
              >
                {session?.course_code || 'CS401'}
              </span>
              <span className="text-xs text-slate-400">
                {session?.room_id || 'Hall 304 (Single AI Vision Array)'}
              </span>
              <span 
                className="flex items-center gap-1.5 text-xs font-mono px-2.5 py-0.5 rounded-full border font-semibold"
                style={{
                  backgroundColor: theme.primaryMuted,
                  color: theme.primary,
                  borderColor: theme.primaryBorder
                }}
              >
                <Radio className="w-3 h-3 animate-pulse" style={{ color: theme.primary }} /> Single AI Live
              </span>
            </div>
            
            <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <IconBadge icon={UserCheck} size="sm" variant="primary" />
              <span>{session?.course_name || 'AI & Neural Systems'}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Faculty: <span className="text-slate-200 font-semibold">{session?.faculty_name || 'Dr. Victor Vance'}</span> • Session Duration: 45 Minutes Continuous AI Tracking
            </p>
          </div>

          {/* Center: 45-Min Threshold Progress Dial */}
          <div 
            className="w-full lg:w-96 rounded-2xl p-4 border backdrop-blur-md"
            style={{
              backgroundColor: `${theme.bgBase}cc`,
              borderColor: theme.cardBorder
            }}
          >
            <div className="flex items-center justify-between text-xs mb-2 font-mono">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                Dwell Elapsed: <strong className="text-white">{elapsedMin}m</strong> / {targetMin}m
              </span>
              <span className="font-bold font-mono" style={{ color: theme.primary }}>
                {progressPct}% Complete
              </span>
            </div>

            {/* Threshold Progress Bar */}
            <div 
              className="w-full h-3.5 rounded-full overflow-hidden flex border"
              style={{
                backgroundColor: theme.bgBase,
                borderColor: theme.cardBorder
              }}
            >
              <div 
                className="h-full transition-all duration-500 relative"
                style={{ 
                  width: `${progressPct}%`,
                  background: `linear-gradient(90deg, ${theme.primaryDark}, ${theme.primary})`,
                  boxShadow: `0 0 12px ${theme.primary}`
                }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </div>
            </div>

            {/* Threshold Markers */}
            <div className="flex justify-between text-[10px] mt-1.5 font-mono">
              <span className="text-rose-400 font-medium">&lt; 30m: Absent</span>
              <span className="text-amber-400 font-medium">30–44m: Review Flag</span>
              <span className="font-bold" style={{ color: theme.primary }}>≥ 45m: Present</span>
            </div>
          </div>

          {/* Right: Faculty Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Faculty NFC Tap */}
            <button
              onClick={() => onTapNfc({ isFaculty: true, studentId: 'FAC001', nfcUid: 'NFC-FAC-9901' })}
              className="px-4 py-2.5 rounded-xl text-slate-950 text-xs font-black flex items-center gap-2 transition-all duration-200 hover:scale-105 shadow-lg"
              style={{
                backgroundColor: theme.primary,
                boxShadow: `0 0 16px ${theme.glow}`
              }}
            >
              <Sparkles className="w-4 h-4 text-slate-950 fill-slate-950" />
              <span>Tap Faculty NFC Key</span>
            </button>

            {/* Play / Pause */}
            {session?.status === 'ACTIVE' ? (
              <button
                onClick={() => onControlSession('PAUSE')}
                className="px-3.5 py-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <Pause className="w-4 h-4" /> Pause
              </button>
            ) : (
              <button
                onClick={() => onControlSession('START')}
                className="px-3.5 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all"
                style={{
                  backgroundColor: theme.primaryMuted,
                  borderColor: theme.primaryBorder,
                  color: theme.primary
                }}
              >
                <Play className="w-4 h-4" /> Resume
              </button>
            )}

            {/* Reset */}
            <button
              onClick={() => onControlSession('RESET')}
              title="Reset 45-min counter for a fresh test run"
              className="p-2.5 rounded-xl border text-slate-400 hover:text-white transition-all hover:scale-105"
              style={{
                backgroundColor: theme.bgSurface,
                borderColor: theme.cardBorder
              }}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Quick Stats Strip */}
        <div 
          className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mt-6 pt-5 border-t"
          style={{ borderColor: theme.cardBorder }}
        >
          <div 
            className="rounded-xl p-3.5 border transition-all"
            style={{
              backgroundColor: `${theme.bgBase}a0`,
              borderColor: theme.cardBorder
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">Enrolled Students</span>
              <IconBadge icon={Users} size="xs" variant="primary" />
            </div>
            <div className="text-xl font-black text-white mt-1">{students.length} Total</div>
          </div>

          <div 
            className="rounded-xl p-3.5 border transition-all"
            style={{
              backgroundColor: `${theme.bgBase}a0`,
              borderColor: theme.primaryBorder
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-mono font-bold" style={{ color: theme.primary }}>
                Present (≥45m)
              </span>
              <IconBadge icon={CheckCircle2} size="xs" variant="primary" />
            </div>
            <div className="text-xl font-black mt-1" style={{ color: theme.primary }}>{presentCount} Verified</div>
          </div>

          <div 
            className="rounded-xl p-3.5 border border-amber-500/30 transition-all"
            style={{ backgroundColor: `${theme.bgBase}a0` }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-amber-400 uppercase tracking-wider font-mono font-bold">
                Review (30-44m)
              </span>
              <IconBadge icon={AlertTriangle} size="xs" variant="warning" />
            </div>
            <div className="text-xl font-black text-amber-300 mt-1">{pendingExceptions.length} Exceptions</div>
          </div>

          <div 
            className="rounded-xl p-3.5 border border-rose-500/30 transition-all"
            style={{ backgroundColor: `${theme.bgBase}a0` }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-rose-400 uppercase tracking-wider font-mono font-bold">
                Absent (&lt;30m)
              </span>
              <IconBadge icon={XCircle} size="xs" variant="danger" />
            </div>
            <div className="text-xl font-black text-rose-400 mt-1">{absentCount} Deficit</div>
          </div>
        </div>

      </div>

      {/* Tab Navigation */}
      <div 
        className="flex flex-wrap items-center justify-between border-b pb-3 gap-3"
        style={{ borderColor: theme.cardBorder }}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('GRID')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'GRID' ? 'shadow-md' : 'text-slate-400 hover:text-white'
            }`}
            style={activeTab === 'GRID' ? {
              backgroundColor: theme.primaryMuted,
              color: theme.primary,
              border: `1px solid ${theme.primaryBorder}`,
              boxShadow: `0 0 14px ${theme.primaryMuted}`
            } : {
              border: '1px solid transparent'
            }}
          >
            Live Classroom Attendance Grid ({students.length})
          </button>

          <button
            onClick={() => setActiveTab('EXCEPTIONS')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'EXCEPTIONS' ? 'shadow-md' : 'text-slate-400 hover:text-white'
            }`}
            style={activeTab === 'EXCEPTIONS' ? {
              backgroundColor: theme.primaryMuted,
              color: theme.primary,
              border: `1px solid ${theme.primaryBorder}`,
              boxShadow: `0 0 14px ${theme.primaryMuted}`
            } : {
              border: '1px solid transparent'
            }}
          >
            <ShieldAlert className="w-3.5 h-3.5" style={{ color: theme.primary }} />
            <span>Exception Review Queue</span>
            {pendingExceptions.length > 0 && (
              <span 
                className="px-1.5 py-0.2 rounded-full text-[10px] font-bold"
                style={{ backgroundColor: theme.primary, color: '#07100A' }}
              >
                {pendingExceptions.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('CE_GRADES')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'CE_GRADES' ? 'shadow-md' : 'text-slate-400 hover:text-white'
            }`}
            style={activeTab === 'CE_GRADES' ? {
              backgroundColor: theme.primaryMuted,
              color: theme.primary,
              border: `1px solid ${theme.primaryBorder}`,
              boxShadow: `0 0 14px ${theme.primaryMuted}`
            } : {
              border: '1px solid transparent'
            }}
          >
            Continuous Evaluation (CE) Gradebook
          </button>
        </div>

        <button
          onClick={onOpenLiveStation}
          className="text-xs flex items-center gap-1 font-mono transition-colors font-semibold"
          style={{ color: theme.primary }}
        >
          <span>Open Live AI Camera & NFC Hub</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2. TAB CONTENT */}

      {/* TAB 1: LIVE CLASSROOM GRID */}
      {activeTab === 'GRID' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {students.map((student) => {
            const dwellMins = student.dwell_minutes || Number(((student.dwell_seconds || 0) / 60).toFixed(1));
            const dwellPct = Math.min(100, Math.round((dwellMins / 45) * 100));
            const isTapped = Boolean(student.nfc_tap_time || student.doorway_tap_time);

            // Status Styling
            let badgeBg = 'bg-slate-800 text-slate-300 border-slate-700';
            let statusText = 'Pending (0m)';

            if (student.final_status === 'PRESENT' || dwellMins >= 45) {
              badgeBg = 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40';
              statusText = 'Verified Present (≥45m)';
            } else if (student.final_status === 'REVIEW_REQUIRED' || (dwellMins >= 30 && dwellMins < 45)) {
              badgeBg = 'bg-amber-950/60 text-amber-300 border-amber-500/40';
              statusText = 'Review Flag (30-44m)';
            } else if (student.final_status === 'ABSENT' || dwellMins < 30) {
              badgeBg = 'bg-rose-950/60 text-rose-300 border-rose-500/40';
              statusText = 'Marked Absent (<30m)';
            }

            return (
              <div 
                key={student.id} 
                className="glass-card rounded-2xl p-4 border transition-all duration-200 group hover:scale-[1.02]"
                style={{
                  backgroundColor: `${theme.bgSurface}cc`,
                  borderColor: theme.cardBorder
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-slate-950 text-sm shadow-md"
                      style={{ 
                        backgroundColor: theme.primary,
                        boxShadow: `0 0 10px ${theme.glow}`
                      }}
                    >
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white transition-colors group-hover:text-white">
                        {student.name}
                      </h4>
                      <div className="text-[11px] font-mono text-slate-400">
                        {student.roll_no} • {student.id}
                      </div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${badgeBg}`}>
                    {statusText}
                  </span>
                </div>

                {/* 2-Factor Entry & Dwell Info */}
                <div className="mt-3.5 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-400 font-mono">
                    <span>Door NFC 2FA:</span>
                    {isTapped ? (
                      <span className="flex items-center gap-1 font-semibold" style={{ color: theme.primary }}>
                        <CheckCircle2 className="w-3.5 h-3.5" style={{ color: theme.primary }} /> {student.nfc_tap_time || student.doorway_tap_time}
                      </span>
                    ) : (
                      <span className="text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Not Tapped
                      </span>
                    )}
                  </div>

                  {/* Dwell Progress */}
                  <div>
                    <div className="flex items-center justify-between text-slate-300 font-mono text-[11px] mb-1">
                      <span>AI Camera Dwell:</span>
                      <strong style={{ color: theme.primary }}>{dwellMins}m / 45m ({dwellPct}%)</strong>
                    </div>
                    <div 
                      className="w-full h-2 rounded-full overflow-hidden border"
                      style={{
                        backgroundColor: theme.bgBase,
                        borderColor: theme.cardBorder
                      }}
                    >
                      <div 
                        className="h-full transition-all duration-300"
                        style={{ 
                          width: `${dwellPct}%`,
                          backgroundColor: dwellMins >= 45 ? theme.primary : dwellMins >= 30 ? '#f59e0b' : '#ef4444'
                        }}
                      />
                    </div>
                  </div>

                  {/* Verification Method / Flags */}
                  {student.flagged_reason && (
                    <div className="p-1.5 rounded-lg bg-amber-950/30 border border-amber-500/20 text-[10px] text-amber-300">
                      ⚠️ {student.flagged_reason}
                    </div>
                  )}
                </div>

                {/* Card Quick Action */}
                <div 
                  className="mt-3 pt-2.5 border-t flex items-center justify-between text-[11px]"
                  style={{ borderColor: theme.cardBorder }}
                >
                  <span className="text-slate-400 font-mono">CE Grade: {student.ce_assignment_score || 85}%</span>
                  <button
                    onClick={() => onTapNfc({ studentId: student.id, nfcUid: student.nfc_uid })}
                    className="font-semibold flex items-center gap-1 transition-colors hover:underline"
                    style={{ color: theme.primary }}
                  >
                    <span>Simulate NFC</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: EXCEPTION REVIEW QUEUE (12-Hour Ephemeral TTL) */}
      {activeTab === 'EXCEPTIONS' && (
        <div className="space-y-4">
          <div 
            className="glass-panel p-4 rounded-2xl border flex items-center justify-between"
            style={{
              backgroundColor: `${theme.bgSurface}ee`,
              borderColor: theme.primaryBorder
            }}
          >
            <div className="flex items-center gap-3">
              <IconBadge icon={ShieldAlert} size="md" variant="primary" />
              <div>
                <h4 className="text-sm font-bold text-white">12-Hour Ephemeral Zero-Retention Queue</h4>
                <p className="text-xs text-slate-400">
                  Captured biometric exception frames are temporary and permanently auto-erased upon review or at the 12-hour TTL expiration.
                </p>
              </div>
            </div>
            <span 
              className="text-xs font-mono px-2.5 py-1 rounded-xl border font-bold"
              style={{
                backgroundColor: theme.primaryMuted,
                color: theme.primary,
                borderColor: theme.primaryBorder
              }}
            >
              Zero-Retention Policy Active
            </span>
          </div>

          {exceptions.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              No pending exceptions. All student presences meet the 45-minute continuous threshold.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exceptions.map((exc) => {
                const isPending = exc.status === 'PENDING';
                const ttlHours = Math.floor((exc.ttl_remaining_minutes || 720) / 60);
                const ttlMins = (exc.ttl_remaining_minutes || 720) % 60;

                return (
                  <div 
                    key={exc.id}
                    className="rounded-2xl p-5 border transition-all"
                    style={{
                      backgroundColor: `${theme.bgSurface}ee`,
                      borderColor: isPending ? theme.primaryBorder : theme.cardBorder,
                      boxShadow: isPending ? `0 0 20px ${theme.primaryMuted}` : 'none'
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span 
                            className="text-[10px] font-mono px-2 py-0.5 rounded font-bold border"
                            style={{
                              backgroundColor: theme.primaryMuted,
                              color: theme.primary,
                              borderColor: theme.primaryBorder
                            }}
                          >
                            {exc.exception_type.replace(/_/g, ' ')}
                          </span>
                          <span className="text-xs font-mono text-slate-400">{exc.id}</span>
                        </div>
                        <h4 className="text-base font-bold text-white mt-1">
                          {exc.student_name}
                        </h4>
                      </div>

                      {/* 12h TTL Ticker */}
                      <div className="text-right font-mono">
                        <span className="text-[10px] text-slate-400 block">TTL Countdown</span>
                        <span className="text-xs font-bold flex items-center gap-1 justify-end" style={{ color: theme.primary }}>
                          <Clock className="w-3 h-3" /> {ttlHours}h {ttlMins}m left
                        </span>
                      </div>
                    </div>

                    <p 
                      className="text-xs text-slate-300 mt-2.5 p-2.5 rounded-xl border"
                      style={{
                        backgroundColor: theme.bgBase,
                        borderColor: theme.cardBorder
                      }}
                    >
                      {exc.description || `NFC badge tapped at doorway scanner (${exc.timestamp}), but periocular facial match confidence fell below threshold (${Math.round((exc.face_confidence || 0.54) * 100)}%). Requires instructor triage.`}
                    </p>

                    {/* Temporary Volatile Snapshot Placeholder */}
                    <div 
                      className="mt-3 flex items-center gap-3 p-2.5 rounded-xl border"
                      style={{
                        backgroundColor: theme.bgBase,
                        borderColor: theme.cardBorder
                      }}
                    >
                      <div className="w-12 h-12 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-500">
                        <Eye className="w-5 h-5" style={{ color: theme.primary }} />
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        <div>Volatile Frame Token: <span className="font-bold" style={{ color: theme.primary }}>NIR_PERIOCULAR_TMP_{exc.id}</span></div>
                        <div className="text-[10px] text-slate-500">Frame will auto-erase immediately upon review action</div>
                      </div>
                    </div>

                    {/* Actions */}
                    {isPending ? (
                      <div 
                        className="mt-4 pt-3 border-t flex items-center justify-end gap-2"
                        style={{ borderColor: theme.cardBorder }}
                      >
                        <button
                          onClick={() => onReviewException(exc.id, 'REJECT_ABSENT', 'Marked absent due to verification deficit')}
                          className="px-3.5 py-2 rounded-xl bg-rose-950/40 text-rose-300 border border-rose-500/30 hover:bg-rose-900/50 text-xs font-bold flex items-center gap-1 transition-all"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Reject (Mark Absent)
                        </button>

                        <button
                          onClick={() => onReviewException(exc.id, 'APPROVE_PRESENT', 'Faculty accepted excuse for time gap')}
                          className="px-4 py-2 rounded-xl text-slate-950 text-xs font-black flex items-center gap-1 shadow-md transition-all hover:scale-105"
                          style={{
                            backgroundColor: theme.primary,
                            boxShadow: `0 0 12px ${theme.glow}`
                          }}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Approve as Present
                        </button>
                      </div>
                    ) : (
                      <div className="mt-3 text-right text-xs font-mono text-slate-400">
                        Status: <strong style={{ color: theme.primary }}>{exc.status}</strong> • Biometric frame purged.
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: CONTINUOUS EVALUATION (CE) GRADEBOOK */}
      {activeTab === 'CE_GRADES' && (
        <div 
          className="glass-panel rounded-2xl overflow-hidden border"
          style={{
            backgroundColor: `${theme.bgSurface}ee`,
            borderColor: theme.cardBorder
          }}
        >
          <div 
            className="p-4 border-b flex items-center justify-between"
            style={{ borderColor: theme.cardBorder }}
          >
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <IconBadge icon={Award} size="xs" variant="primary" />
                <span>Continuous Evaluation (CE) Gradebook</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Grades automatically weighted against AI-verified continuous attendance (≥75% baseline requirement).
              </p>
            </div>
            <span 
              className="text-xs font-mono font-bold px-2 py-0.5 rounded border"
              style={{
                backgroundColor: theme.primaryMuted,
                color: theme.primary,
                borderColor: theme.primaryBorder
              }}
            >
              Weight: 40% Attendance + 60% Continuous Assessment
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead 
                className="text-slate-400 uppercase font-mono border-b"
                style={{
                  backgroundColor: theme.bgBase,
                  borderColor: theme.cardBorder
                }}
              >
                <tr>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Roll No</th>
                  <th className="px-4 py-3">Attendance %</th>
                  <th className="px-4 py-3">Assignment (30%)</th>
                  <th className="px-4 py-3">Quiz (30%)</th>
                  <th className="px-4 py-3">Project (40%)</th>
                  <th className="px-4 py-3">Weighted CE Total</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y font-mono" style={{ borderColor: theme.cardBorder }}>
                {students.map((s) => {
                  const isEditing = editingStudent === s.id;
                  const asg = isEditing ? ceForm.asg : (s.ce_assignment_score || 85);
                  const qz = isEditing ? ceForm.qz : (s.ce_quiz_score || 85);
                  const prj = isEditing ? ceForm.prj : (s.ce_project_score || 85);
                  
                  const ceAverage = Number((asg * 0.3 + qz * 0.3 + prj * 0.4).toFixed(1));
                  const isLowAttendance = s.current_attendance_pct < 75;

                  return (
                    <tr 
                      key={s.id} 
                      className="transition-colors hover:bg-white/5"
                    >
                      <td className="px-4 py-3 font-sans font-medium text-white flex items-center gap-2">
                        <div 
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] text-slate-950 font-bold"
                          style={{ backgroundColor: theme.primary }}
                        >
                          {s.name[0]}
                        </div>
                        <span>{s.name}</span>
                      </td>
                      <td className="px-4 py-3 text-slate-400">{s.roll_no}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                          isLowAttendance ? 'bg-rose-950/60 text-rose-400 border border-rose-500/30' : 'font-bold'
                        }`} style={!isLowAttendance ? { color: theme.primary } : {}}>
                          {s.current_attendance_pct}% {isLowAttendance && '⚠️ Low'}
                        </span>
                      </td>

                      {/* Editable Inputs */}
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <input
                            type="number"
                            value={ceForm.asg}
                            onChange={(e) => setCeForm({ ...ceForm, asg: e.target.value })}
                            className="w-16 px-2 py-1 bg-slate-950 border rounded font-mono"
                            style={{ borderColor: theme.primary, color: theme.primary }}
                          />
                        ) : (
                          <span className="text-slate-200">{asg}</span>
                        )}
                      </td>

                      <td className="px-4 py-3">
                        {isEditing ? (
                          <input
                            type="number"
                            value={ceForm.qz}
                            onChange={(e) => setCeForm({ ...ceForm, qz: e.target.value })}
                            className="w-16 px-2 py-1 bg-slate-950 border rounded font-mono"
                            style={{ borderColor: theme.primary, color: theme.primary }}
                          />
                        ) : (
                          <span className="text-slate-200">{qz}</span>
                        )}
                      </td>

                      <td className="px-4 py-3">
                        {isEditing ? (
                          <input
                            type="number"
                            value={ceForm.prj}
                            onChange={(e) => setCeForm({ ...ceForm, prj: e.target.value })}
                            className="w-16 px-2 py-1 bg-slate-950 border rounded font-mono"
                            style={{ borderColor: theme.primary, color: theme.primary }}
                          />
                        ) : (
                          <span className="text-slate-200">{prj}</span>
                        )}
                      </td>

                      <td className="px-4 py-3 font-bold" style={{ color: theme.primary }}>
                        {ceAverage}%
                      </td>

                      <td className="px-4 py-3 text-right">
                        {isEditing ? (
                          <button
                            onClick={() => handleSaveCe(s.id)}
                            className="px-3 py-1 text-slate-950 rounded-lg font-bold flex items-center gap-1 ml-auto shadow-sm"
                            style={{ backgroundColor: theme.primary }}
                          >
                            <Save className="w-3.5 h-3.5" /> Save
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStartEditing(s)}
                            className="text-slate-400 p-1 hover:text-white transition-colors"
                            style={{ color: theme.primary }}
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
