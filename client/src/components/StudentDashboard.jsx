import React, { useState } from 'react';
import { 
  AlertOctagon, 
  CheckCircle2, 
  Clock, 
  GraduationCap, 
  QrCode, 
  ShieldCheck, 
  Sparkles, 
  User, 
  Wifi, 
  FileText, 
  Award,
  ChevronDown,
  MessageSquare,
  Lock,
  Send,
  X
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useTheme } from '../context/ThemeContext';
import IconBadge from './common/IconBadge';

export default function StudentDashboard({ 
  students, 
  selectedStudentId, 
  setSelectedStudentId, 
  onTapNfc 
}) {
  const { theme } = useTheme();
  const [appealModalOpen, setAppealModalOpen] = useState(false);
  const [appealReason, setAppealReason] = useState('');
  const [appealSent, setAppealSent] = useState(false);

  const currentStudent = students.find(s => s.id === selectedStudentId) || students[0] || {
    id: 'STU101',
    name: 'Alex Mercer',
    roll_no: '2026-CS-01',
    class_id: 'CS401',
    nfc_uid: 'NFC-7A39B1',
    current_attendance_pct: 95.8,
    total_sessions: 24,
    attended_sessions: 23,
    ce_assignment_score: 94,
    ce_quiz_score: 92,
    ce_project_score: 96,
  };

  const isLowAttendance = currentStudent.current_attendance_pct < 75.0;
  const attendedCount = currentStudent.attended_sessions || Math.round((currentStudent.current_attendance_pct / 100) * (currentStudent.total_sessions || 24));
  const missedCount = (currentStudent.total_sessions || 24) - attendedCount;

  // Mock session timeline for this student
  const mockTimeline = [
    { id: 1, course: 'CS401: AI & Neural Systems', date: 'Today, 10:00 AM', tap: '10:01:14 AM', dwell: '45.8 mins', status: 'PRESENT', method: 'NFC + Dual NIR Periocular' },
    { id: 2, course: 'CS402: Computer Vision', date: 'Yesterday, 02:00 PM', tap: '02:02:10 PM', dwell: '45.1 mins', status: 'PRESENT', method: 'NFC + Dual NIR Periocular' },
    { id: 3, course: 'CS403: Distributed Edge AI', date: '14 Sep, 11:00 AM', tap: '11:04:30 AM', dwell: '38.2 mins', status: 'REVIEW_REQUIRED', method: 'Faculty Override: Approved' },
    { id: 4, course: 'CS404: Hardware Accelerators', date: '12 Sep, 09:00 AM', tap: null, dwell: '0 mins', status: 'ABSENT', method: 'No NFC / No AI Track' }
  ];

  const handleSendAppeal = (e) => {
    e.preventDefault();
    if (!appealReason.trim()) return;
    setAppealSent(true);
    setTimeout(() => {
      setAppealSent(false);
      setAppealModalOpen(false);
      setAppealReason('');
    }, 2000);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      
      {/* 1. Student Selector Bar */}
      <div 
        className="glass-panel p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 border"
        style={{
          backgroundColor: `${theme.bgSurface}ee`,
          borderColor: theme.cardBorder
        }}
      >
        <div className="flex items-center gap-3.5">
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-slate-950 text-base shadow-lg transition-transform duration-300 hover:scale-105"
            style={{ 
              backgroundColor: theme.primary,
              boxShadow: `0 0 16px ${theme.glow}`
            }}
          >
            {currentStudent.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-white">{currentStudent.name}</h2>
              <span 
                className="text-xs font-mono px-2 py-0.5 rounded-lg border font-bold"
                style={{
                  backgroundColor: theme.primaryMuted,
                  color: theme.primary,
                  borderColor: theme.primaryBorder
                }}
              >
                {currentStudent.roll_no}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Class: <span className="text-slate-200">{currentStudent.class_id}</span> • NFC UID: <span className="font-mono font-bold" style={{ color: theme.primary }}>{currentStudent.nfc_uid}</span>
            </p>
          </div>
        </div>

        {/* Switch Student Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 font-medium">Switch Student Profile:</label>
          <div className="relative">
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="text-xs rounded-xl px-3 py-2 pr-8 focus:outline-none appearance-none font-bold border"
              style={{
                backgroundColor: theme.bgBase,
                borderColor: theme.primaryBorder,
                color: theme.primary
              }}
            >
              {students.map((s) => (
                <option key={s.id} value={s.id} className="bg-slate-900 text-slate-200">
                  {s.name} ({s.roll_no}) {s.current_attendance_pct < 75 ? '⚠️ <75%' : ''}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2.5 top-2.5 pointer-events-none" style={{ color: theme.primary }} />
          </div>
        </div>
      </div>

      {/* 2. STRICT ABSENCE RED ALERT (Triggered when Attendance < 75%) */}
      {isLowAttendance ? (
        <div className="red-alert-glow rounded-2xl p-5 border border-rose-500 relative overflow-hidden">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-rose-500/20 text-rose-400 rounded-xl border border-rose-500/40">
              <AlertOctagon className="w-8 h-8 animate-pulse" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-rose-300">
                  CRITICAL ABSENCE WARNING: Attendance Below 75% Baseline ({currentStudent.current_attendance_pct}%)
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-600 text-white animate-pulse">
                  DEBARMENT RISK
                </span>
              </div>
              <p className="text-xs text-rose-200/90 mt-1 leading-relaxed">
                University academic regulations mandate a minimum of <strong>75% continuous AI-verified classroom presence</strong>. Your current standing is <strong>{currentStudent.current_attendance_pct}%</strong> ({attendedCount} of {currentStudent.total_sessions || 24} sessions attended). You must attend the next <strong>3 consecutive sessions</strong> with full 45-minute continuous dwell time to restore eligible standing.
              </p>
              <button
                onClick={() => setAppealModalOpen(true)}
                className="mt-3 px-3.5 py-1.5 rounded-lg bg-rose-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:bg-rose-500 transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" /> Submit Attendance Dispute Appeal
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div 
          className="glass-panel rounded-2xl p-4 border flex items-center justify-between"
          style={{
            backgroundColor: `${theme.bgSurface}ee`,
            borderColor: theme.primaryBorder
          }}
        >
          <div className="flex items-center gap-3">
            <IconBadge icon={CheckCircle2} size="md" variant="primary" />
            <div>
              <h4 className="text-xs font-bold text-white">Good Academic Standing (Eligible)</h4>
              <p className="text-[11px] text-slate-400">
                Attendance requirement satisfied (≥75%). You are eligible for continuous evaluation credits and end-semester examinations.
              </p>
            </div>
          </div>
          <span 
            className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl border"
            style={{
              backgroundColor: theme.primaryMuted,
              color: theme.primary,
              borderColor: theme.primaryBorder
            }}
          >
            {currentStudent.current_attendance_pct}% Satisfied
          </span>
        </div>
      )}

      {/* 3. Analytics Grid & Virtual NFC Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Gauge & Metrics Card */}
        <div 
          className="lg:col-span-2 glass-panel rounded-2xl p-6 border flex flex-col justify-between"
          style={{
            backgroundColor: `${theme.bgSurface}ee`,
            borderColor: theme.cardBorder
          }}
        >
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <IconBadge icon={Award} size="xs" variant="primary" />
              <span>Biometric Attendance Analytics & Continuous Evaluation</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Verified continuously via single ceiling AI camera & doorway NFC scanner.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
              
              {/* Total Attendance Rate */}
              <div 
                className="rounded-2xl p-4 border text-center transition-all"
                style={{
                  backgroundColor: theme.bgBase,
                  borderColor: isLowAttendance ? 'rgba(239, 68, 68, 0.4)' : theme.cardBorder
                }}
              >
                <div className="text-[11px] text-slate-400 uppercase font-mono">Attendance Rate</div>
                <div 
                  className={`text-3xl font-black mt-1 font-mono ${
                    isLowAttendance ? 'text-rose-400 animate-pulse' : ''
                  }`}
                  style={!isLowAttendance ? { color: theme.primary } : {}}
                >
                  {currentStudent.current_attendance_pct}%
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  {attendedCount} Attended / {missedCount} Missed
                </div>
              </div>

              {/* Continuous Evaluation Score */}
              <div 
                className="rounded-2xl p-4 border text-center transition-all"
                style={{
                  backgroundColor: theme.bgBase,
                  borderColor: theme.cardBorder
                }}
              >
                <div className="text-[11px] text-slate-400 uppercase font-mono">Weighted CE Score</div>
                <div className="text-3xl font-black mt-1 font-mono" style={{ color: theme.primaryLight }}>
                  {((currentStudent.ce_assignment_score * 0.3) + (currentStudent.ce_quiz_score * 0.3) + (currentStudent.ce_project_score * 0.4)).toFixed(1)}%
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  Asg: {currentStudent.ce_assignment_score} | Qz: {currentStudent.ce_quiz_score} | Prj: {currentStudent.ce_project_score}
                </div>
              </div>

              {/* 2FA Verification Reliability */}
              <div 
                className="rounded-2xl p-4 border text-center transition-all"
                style={{
                  backgroundColor: theme.bgBase,
                  borderColor: theme.cardBorder
                }}
              >
                <div className="text-[11px] text-slate-400 uppercase font-mono">Anti-Proxy Score</div>
                <div className="text-3xl font-black mt-1 font-mono" style={{ color: theme.primary }}>
                  99.4%
                </div>
                <div className="text-[10px] mt-1 font-semibold" style={{ color: theme.primary }}>
                  100% Anti-Buddy Punch
                </div>
              </div>

            </div>
          </div>

          {/* CE Component Progress Bars */}
          <div 
            className="mt-6 pt-5 border-t space-y-3"
            style={{ borderColor: theme.cardBorder }}
          >
            <div className="text-xs font-semibold text-slate-300">Continuous Evaluation Component Breakdown:</div>
            
            <div className="space-y-2.5">
              <div>
                <div className="flex justify-between text-[11px] text-slate-400 font-mono mb-1">
                  <span>Lab Assignments (30% weight)</span>
                  <span className="font-bold" style={{ color: theme.primary }}>{currentStudent.ce_assignment_score}%</span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: theme.bgBase }}>
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ 
                      width: `${currentStudent.ce_assignment_score}%`,
                      backgroundColor: theme.primary 
                    }} 
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-400 font-mono mb-1">
                  <span>Continuous Quizzes (30% weight)</span>
                  <span className="font-bold" style={{ color: theme.primaryLight }}>{currentStudent.ce_quiz_score}%</span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: theme.bgBase }}>
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ 
                      width: `${currentStudent.ce_quiz_score}%`,
                      backgroundColor: theme.primaryLight 
                    }} 
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-400 font-mono mb-1">
                  <span>Capstone AI Project (40% weight)</span>
                  <span className="font-bold" style={{ color: theme.primaryDark }}>{currentStudent.ce_project_score}%</span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: theme.bgBase }}>
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ 
                      width: `${currentStudent.ce_project_score}%`,
                      backgroundColor: theme.primaryDark 
                    }} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Virtual NFC Digital ID Pass Card */}
        <div 
          className="rounded-2xl p-6 border flex flex-col justify-between relative overflow-hidden backdrop-blur-xl"
          style={{
            backgroundColor: `${theme.bgSurface}f0`,
            borderColor: theme.primaryBorder,
            boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 20px ${theme.glow}`
          }}
        >
          <div 
            className="absolute top-0 right-0 w-36 h-36 rounded-full blur-2xl pointer-events-none opacity-20"
            style={{ backgroundColor: theme.primary }}
          />

          <div>
            <div 
              className="flex items-center justify-between pb-3 border-b"
              style={{ borderColor: theme.cardBorder }}
            >
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold" style={{ color: theme.primary }}>
                <Wifi className="w-4 h-4 rotate-90" />
                <span>NFC STUDENT PASS</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">UNIV-AI-2026</span>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-slate-950 text-xl shadow-lg border"
                style={{ 
                  backgroundColor: theme.primary,
                  borderColor: theme.primaryLight,
                  boxShadow: `0 0 16px ${theme.glow}`
                }}
              >
                {currentStudent.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h4 className="text-base font-bold text-white">{currentStudent.name}</h4>
                <div className="text-xs font-mono text-slate-400">{currentStudent.roll_no}</div>
                <div className="text-[11px] font-mono font-bold mt-0.5" style={{ color: theme.primary }}>
                  UID: {currentStudent.nfc_uid}
                </div>
              </div>
            </div>

            {/* QR / NFC Hologram */}
            <div 
              className="mt-4 p-4 rounded-xl border flex items-center justify-center transition-all hover:scale-105"
              style={{
                backgroundColor: theme.bgBase,
                borderColor: theme.cardBorder
              }}
            >
              <QRCodeSVG 
                value={`AI_ATTENDANCE:${currentStudent.id}:${currentStudent.nfc_uid}`}
                size={96}
                fgColor={theme.primary}
                bgColor="transparent"
              />
            </div>
          </div>

          <div 
            className="mt-4 pt-3 border-t space-y-2"
            style={{ borderColor: theme.cardBorder }}
          >
            <button
              onClick={() => onTapNfc({ studentId: currentStudent.id, nfcUid: currentStudent.nfc_uid })}
              className="w-full py-2.5 rounded-xl text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-lg"
              style={{
                backgroundColor: theme.primary,
                boxShadow: `0 0 16px ${theme.glow}`
              }}
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>Tap NFC at Classroom Door</span>
            </button>

            <button
              onClick={() => setAppealModalOpen(true)}
              className="w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border hover:bg-white/5 transition-all text-slate-300"
              style={{ borderColor: theme.cardBorder }}
            >
              <MessageSquare className="w-3.5 h-3.5" style={{ color: theme.primary }} />
              <span>1-Click Dispute / Appeal</span>
            </button>
          </div>

        </div>

      </div>

      {/* 4. Session-by-Session Timeline */}
      <div 
        className="glass-panel rounded-2xl p-6 border"
        style={{
          backgroundColor: `${theme.bgSurface}ee`,
          borderColor: theme.cardBorder
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <IconBadge icon={FileText} size="xs" variant="primary" />
              <span>Classroom Attendance Timeline & AI Verification Log</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Each session requires ≥45 continuous minutes detected by overhead AI vision camera.
            </p>
          </div>
          <span 
            className="text-[11px] font-mono px-2.5 py-1 rounded-lg border font-semibold flex items-center gap-1"
            style={{
              backgroundColor: theme.primaryMuted,
              color: theme.primary,
              borderColor: theme.primaryBorder
            }}
          >
            <Lock className="w-3 h-3" /> Ephemeral Vectors Purged
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
                <th className="px-4 py-3">Course & Subject</th>
                <th className="px-4 py-3">Date & Time</th>
                <th className="px-4 py-3">NFC 2FA Tap</th>
                <th className="px-4 py-3">AI NIR Dwell Time</th>
                <th className="px-4 py-3">Verification Method</th>
                <th className="px-4 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y font-mono" style={{ borderColor: theme.cardBorder }}>
              {mockTimeline.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-sans font-medium text-white">{item.course}</td>
                  <td className="px-4 py-3 text-slate-400">{item.date}</td>
                  <td className="px-4 py-3">
                    {item.tap ? (
                      <span className="flex items-center gap-1 font-bold" style={{ color: theme.primary }}>
                        <CheckCircle2 className="w-3.5 h-3.5" style={{ color: theme.primary }} /> {item.tap}
                      </span>
                    ) : (
                      <span className="text-rose-400">Missing Tap</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-bold" style={{ color: theme.primary }}>{item.dwell}</td>
                  <td className="px-4 py-3 text-slate-400 text-[11px]">{item.method}</td>
                  <td className="px-4 py-3 text-right">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      item.status === 'PRESENT'
                        ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                        : item.status === 'REVIEW_REQUIRED'
                        ? 'bg-amber-950/70 text-amber-300 border-amber-500/30'
                        : 'bg-rose-950/70 text-rose-300 border-rose-500/30'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Attendance Dispute Appeal Modal */}
      {appealModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div 
            className="w-full max-w-lg rounded-2xl border p-6 shadow-2xl relative"
            style={{
              backgroundColor: theme.bgSurface,
              borderColor: theme.primaryBorder,
              boxShadow: `0 20px 50px rgba(0,0,0,0.8), 0 0 30px ${theme.glow}`
            }}
          >
            <button
              onClick={() => setAppealModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-2">
              <IconBadge icon={MessageSquare} size="sm" variant="primary" />
              <h3 className="text-base font-bold text-white">Submit Attendance Appeal</h3>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Disputes are cryptographically forwarded to Dr. Evelyn Vance with your recorded doorway NFC tap timestamp and classroom camera dwell vector.
            </p>

            {appealSent ? (
              <div 
                className="p-4 rounded-xl border text-center space-y-2 animate-fade-in"
                style={{
                  backgroundColor: theme.primaryMuted,
                  borderColor: theme.primaryBorder,
                  color: theme.primary
                }}
              >
                <CheckCircle2 className="w-8 h-8 mx-auto" />
                <div className="font-bold text-sm">Dispute Appeal Transmitted</div>
                <div className="text-xs text-slate-300">
                  Ticket #DISP-2026-99 logged. Faculty will review within 24 hours.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendAppeal} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Session</label>
                  <input 
                    type="text" 
                    readOnly 
                    value="CS401: AI & Neural Systems (Hall 304)"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Reason / Explanation</label>
                  <textarea
                    rows={3}
                    value={appealReason}
                    onChange={(e) => setAppealReason(e.target.value)}
                    placeholder="E.g., I arrived at 10:01 AM and sat in Section B row 3. The camera may have had brief obstruction during project presentation."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border text-xs text-slate-200 focus:outline-none"
                    style={{ borderColor: theme.cardBorder }}
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setAppealModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
                    style={{
                      backgroundColor: theme.primary,
                      boxShadow: `0 0 12px ${theme.glow}`
                    }}
                  >
                    <Send className="w-3.5 h-3.5" /> Submit Appeal
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
