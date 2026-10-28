import React, { useState } from 'react';
import { 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertOctagon, 
  FileText, 
  Award, 
  MessageSquare, 
  Send, 
  X,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import IconBadge from './common/IconBadge';

export default function ProgressView({ currentStudent }) {
  const [appealModalOpen, setAppealModalOpen] = useState(false);
  const [appealReason, setAppealReason] = useState('');
  const [appealSent, setAppealSent] = useState(false);

  const student = currentStudent || {
    id: 'STU101',
    name: 'Alex Mercer',
    roll_no: '2026-CS-01',
    current_attendance_pct: 95.8,
    total_sessions: 24,
    attended_sessions: 23,
    ce_assignment_score: 94,
    ce_quiz_score: 92,
    ce_project_score: 96
  };

  const isLowAttendance = student.current_attendance_pct < 75.0;
  const attendedCount = student.attended_sessions || 23;
  const missedCount = (student.total_sessions || 24) - attendedCount;

  const mockTimeline = [
    { id: 1, course: 'CS401: AI & Neural Systems', date: 'Today, 10:00 AM', tap: '10:01:14 AM', dwell: '45.8 mins', status: 'PRESENT' },
    { id: 2, course: 'CS402: Computer Vision', date: 'Yesterday, 02:00 PM', tap: '02:02:10 PM', dwell: '45.1 mins', status: 'PRESENT' },
    { id: 3, course: 'CS403: Distributed Edge AI', date: '14 Sep, 11:00 AM', tap: '11:04:30 AM', dwell: '38.2 mins', status: 'REVIEW_REQUIRED' },
    { id: 4, course: 'CS404: Hardware Accelerators', date: '12 Sep, 09:00 AM', tap: null, dwell: '0 mins', status: 'ABSENT' }
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
    <div className="space-y-6 pb-16 animate-fade-in">
      
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30">
              ACADEMIC STANDING & ANALYTICS
            </span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <IconBadge icon={TrendingUp} size="sm" variant="blue" />
            <span>Attendance Progress & Continuous Evaluation</span>
          </h2>
        </div>

        <button
          onClick={() => setAppealModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#0B1120] hover:bg-blue-600/20 text-blue-300 border border-blue-500/30 text-xs font-bold flex items-center gap-2 transition-all self-start sm:self-auto shadow-sm"
        >
          <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
          <span>Submit Attendance Appeal</span>
        </button>
      </div>

      {/* 2. Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Attendance Percentage Card */}
        <div className="glass-panel rounded-3xl p-6 border border-blue-500/20 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-mono text-slate-400 uppercase font-semibold">Overall Attendance</span>
            <IconBadge icon={Award} size="xs" variant="blue" />
          </div>
          <div className="my-4">
            <div className={`text-4xl font-black font-mono ${isLowAttendance ? 'text-rose-400' : 'text-blue-400'}`}>
              {student.current_attendance_pct}%
            </div>
            <p className="text-xs text-slate-300 mt-1 font-medium">
              {isLowAttendance ? '⚠️ Below 75% requirement' : 'Eligible for end-semester examinations'}
            </p>
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            {attendedCount} Attended • {missedCount} Missed • Total: {student.total_sessions || 24}
          </div>
        </div>

        {/* Weighted CE Grade Card */}
        <div className="glass-panel rounded-3xl p-6 border border-blue-500/20 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-mono text-slate-400 uppercase font-semibold">Continuous Evaluation</span>
            <IconBadge icon={CheckCircle2} size="xs" variant="blue" />
          </div>
          <div className="my-4">
            <div className="text-4xl font-black font-mono text-white">
              {((student.ce_assignment_score * 0.3) + (student.ce_quiz_score * 0.3) + (student.ce_project_score * 0.4)).toFixed(1)}%
            </div>
            <p className="text-xs text-blue-400 mt-1 font-medium">
              Weighted Grade: A (Excellent Performance)
            </p>
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Asg: {student.ce_assignment_score} • Qz: {student.ce_quiz_score} • Prj: {student.ce_project_score}
          </div>
        </div>

        {/* 2FA Reliability Card */}
        <div className="glass-panel rounded-3xl p-6 border border-blue-500/20 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-mono text-slate-400 uppercase font-semibold">Anti-Proxy Integrity</span>
            <IconBadge icon={ShieldCheck} size="xs" variant="blue" />
          </div>
          <div className="my-4">
            <div className="text-4xl font-black font-mono text-blue-400">
              99.4%
            </div>
            <p className="text-xs text-slate-300 mt-1 font-medium">
              Zero buddy-punching incidents detected
            </p>
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            12-Hour Volatile TTL Zero-Retention Active
          </div>
        </div>

      </div>

      {/* 3. Component Breakdown Progress Bars */}
      <div className="glass-panel rounded-3xl p-6 border border-blue-500/20">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <IconBadge icon={TrendingUp} size="xs" variant="blue" />
          <span>Continuous Evaluation Rubric Breakdown</span>
        </h3>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-mono text-slate-300 mb-1.5">
              <span>Laboratory & Programming Assignments (30% weight)</span>
              <strong className="text-blue-400">{student.ce_assignment_score}%</strong>
            </div>
            <div className="w-full h-2.5 bg-[#060913] rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-blue-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.6)]" 
                style={{ width: `${student.ce_assignment_score}%` }} 
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono text-slate-300 mb-1.5">
              <span>Continuous Topic Quizzes & Participation (30% weight)</span>
              <strong className="text-sky-300">{student.ce_quiz_score}%</strong>
            </div>
            <div className="w-full h-2.5 bg-[#060913] rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-sky-400 rounded-full shadow-[0_0_12px_rgba(56,189,248,0.6)]" 
                style={{ width: `${student.ce_quiz_score}%` }} 
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono text-slate-300 mb-1.5">
              <span>Capstone AI Computer Vision Project (40% weight)</span>
              <strong className="text-white">{student.ce_project_score}%</strong>
            </div>
            <div className="w-full h-2.5 bg-[#060913] rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.4)]" 
                style={{ width: `${student.ce_project_score}%` }} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Session History Log Table */}
      <div className="glass-panel rounded-3xl p-6 border border-blue-500/20 overflow-hidden">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <IconBadge icon={FileText} size="xs" variant="blue" />
              <span>Session Attendance Log & Verification Breakdown</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Continuous 45-minute dwell verification recorded by overhead AI array.</p>
          </div>
          <span className="text-xs font-mono text-blue-400 font-bold hidden sm:inline">
            Minimum Required: 45m Dwell
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#060913] text-slate-400 uppercase border-b border-white/10">
              <tr>
                <th className="px-4 py-3 font-semibold">Course</th>
                <th className="px-4 py-3 font-semibold">Date & Time</th>
                <th className="px-4 py-3 font-semibold">Door NFC 2FA</th>
                <th className="px-4 py-3 font-semibold">Class Dwell Time</th>
                <th className="px-4 py-3 text-right font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockTimeline.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3.5 font-sans font-medium text-white">{item.course}</td>
                  <td className="px-4 py-3.5 text-slate-400">{item.date}</td>
                  <td className="px-4 py-3.5">
                    {item.tap ? (
                      <span className="text-blue-400 font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> {item.tap}
                      </span>
                    ) : (
                      <span className="text-rose-400 font-medium">Missing Tap</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 font-bold text-white">{item.dwell}</td>
                  <td className="px-4 py-3.5 text-right">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      item.status === 'PRESENT'
                        ? 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                        : item.status === 'REVIEW_REQUIRED'
                        ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                        : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
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
          <div className="w-full max-w-lg rounded-3xl border border-blue-500/30 bg-[#0B1120] p-6 shadow-2xl relative">
            <button
              onClick={() => setAppealModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-2">
              <IconBadge icon={MessageSquare} size="sm" variant="blue" />
              <h3 className="text-base font-bold text-white">Submit Attendance Appeal</h3>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Your appeal will be routed to Dr. Evelyn Vance with your recorded doorway NFC tap and classroom camera dwell vector.
            </p>

            {appealSent ? (
              <div className="p-4 rounded-2xl bg-blue-500/15 border border-blue-500/30 text-blue-300 text-center space-y-2 animate-fade-in">
                <CheckCircle2 className="w-8 h-8 text-blue-400 mx-auto" />
                <div className="font-bold text-sm">Dispute Appeal Transmitted</div>
                <div className="text-xs text-slate-300">Ticket #DISP-2026-99 logged. Faculty will review within 24 hours.</div>
              </div>
            ) : (
              <form onSubmit={handleSendAppeal} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Session</label>
                  <input 
                    type="text" 
                    readOnly 
                    value="CS401: AI & Neural Systems (Hall 304)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#060913] border border-white/10 text-xs text-slate-200 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Reason / Explanation</label>
                  <textarea
                    rows={3}
                    value={appealReason}
                    onChange={(e) => setAppealReason(e.target.value)}
                    placeholder="E.g., I arrived at 10:01 AM and sat in Section B row 3. The camera may have had brief obstruction during project presentation."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#060913] border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
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
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all"
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
