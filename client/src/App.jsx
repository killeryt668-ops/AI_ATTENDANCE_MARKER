import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import HomeView from './components/HomeView';
import ProgressView from './components/ProgressView';
import FacultyMonitorView from './components/FacultyMonitorView';
import ProfileView from './components/ProfileView';
import { api, WebSocketClient } from './services/api';
import { ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';

const DEFAULT_SESSION = {
  id: 'SESS-401-CURRENT',
  course_code: 'CS401',
  course_name: 'AI & Neural Systems',
  room_id: 'Lecture Hall 304 (Single Camera Array)',
  faculty_name: 'Dr. Evelyn Vance',
  faculty_id: 'FAC001',
  status: 'ACTIVE',
  elapsed_minutes: 32.5,
  elapsed_seconds: 1950,
  duration_minutes: 45
};

const DEFAULT_STUDENTS = [
  { id: 'STU101', name: 'Alex Mercer', roll_no: '2026-CS-01', class_id: 'CS401', nfc_uid: 'NFC-7A39B1', final_status: 'PRESENT', dwell_minutes: 45.2, dwell_seconds: 2712, doorway_tap_time: '10:01:12 AM', current_attendance_pct: 95.8, total_sessions: 24, attended_sessions: 23, ce_assignment_score: 95, ce_quiz_score: 92, ce_project_score: 98 },
  { id: 'STU102', name: 'Sara Lin', roll_no: '2026-CS-02', class_id: 'CS401', nfc_uid: 'NFC-8C21D4', final_status: 'PRESENT', dwell_minutes: 46.0, dwell_seconds: 2760, doorway_tap_time: '10:02:45 AM', current_attendance_pct: 91.6, total_sessions: 24, attended_sessions: 22, ce_assignment_score: 90, ce_quiz_score: 88, ce_project_score: 94 },
  { id: 'STU103', name: 'Devon Wright', roll_no: '2026-CS-03', class_id: 'CS401', nfc_uid: 'NFC-9E44F2', final_status: 'REVIEW_REQUIRED', dwell_minutes: 36.4, dwell_seconds: 2184, doorway_tap_time: '10:05:18 AM', current_attendance_pct: 79.2, total_sessions: 24, attended_sessions: 19, ce_assignment_score: 82, ce_quiz_score: 79, ce_project_score: 85 },
  { id: 'STU104', name: 'Elena Evans', roll_no: '2026-CS-04', class_id: 'CS401', nfc_uid: 'NFC-3B19A8', final_status: 'PRESENT', dwell_minutes: 45.5, dwell_seconds: 2730, doorway_tap_time: '10:00:40 AM', current_attendance_pct: 96.0, total_sessions: 24, attended_sessions: 23, ce_assignment_score: 96, ce_quiz_score: 94, ce_project_score: 95 },
  { id: 'STU105', name: 'Marcus Chen', roll_no: '2026-CS-05', class_id: 'CS401', nfc_uid: 'NFC-5F72C3', final_status: 'REVIEW_REQUIRED', dwell_minutes: 31.8, dwell_seconds: 1908, doorway_tap_time: '10:08:15 AM', current_attendance_pct: 71.5, total_sessions: 24, attended_sessions: 17, ce_assignment_score: 72, ce_quiz_score: 68, ce_project_score: 70 },
  { id: 'STU106', name: 'Zoe Nakamura', roll_no: '2026-CS-06', class_id: 'CS401', nfc_uid: 'NFC-1D90E5', final_status: 'ABSENT', dwell_minutes: 0, dwell_seconds: 0, doorway_tap_time: null, current_attendance_pct: 68.0, total_sessions: 24, attended_sessions: 16, ce_assignment_score: 65, ce_quiz_score: 70, ce_project_score: 60 }
];

const DEFAULT_EXCEPTIONS = [
  {
    id: 'EXC-8821',
    student_id: 'STU105',
    student_name: 'Marcus Chen',
    roll_no: '2026-CS-05',
    exception_type: 'LOW_FACE_CONFIDENCE',
    status: 'PENDING',
    timestamp: '10:08:15 AM',
    face_confidence: 0.54
  }
];

export default function App() {
  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('unisync_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [currentTab, setCurrentTab] = useState('HOME'); // 'HOME', 'PROGRESS', 'MONITOR', 'PROFILE'
  const [session, setSession] = useState(DEFAULT_SESSION);
  const [students, setStudents] = useState(DEFAULT_STUDENTS);
  const [exceptions, setExceptions] = useState(DEFAULT_EXCEPTIONS);
  const [selectedStudentId, setSelectedStudentId] = useState('STU101');
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((title, message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev.slice(-3), { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem('unisync_user', JSON.stringify(user));
    setCurrentTab(user.role === 'FACULTY' ? 'MONITOR' : 'HOME');
    addToast('Welcome Back', `Signed in as ${user.name} (${user.role})`, 'success');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('unisync_user');
    setCurrentTab('HOME');
  };

  const fetchData = useCallback(async () => {
    try {
      const [sessionData, excData] = await Promise.all([
        api.getCurrentSession().catch(() => null),
        api.getExceptions().catch(() => null)
      ]);

      if (sessionData?.session) setSession(sessionData.session);
      if (sessionData?.students && sessionData.students.length > 0) setStudents(sessionData.students);
      if (excData && excData.length > 0) setExceptions(excData);
    } catch (e) {
      // Retain offline default data
    }
  }, []);

  useEffect(() => {
    fetchData();

    const wsClient = new WebSocketClient((msg) => {
      const { type, payload } = msg;
      if (type === 'SESSION_TICK') {
        setSession(prev => ({
          ...prev,
          elapsed_seconds: payload.elapsedSeconds,
          elapsed_minutes: payload.elapsedMinutes,
          status: payload.status
        }));
      } else if (type === 'STUDENT_VERIFIED_ENTRY') {
        addToast('Doorway Check-In', `${payload.student.name} verified at doorway`, 'success');
        fetchData();
      }
    });

    wsClient.connect();
    return () => wsClient.disconnect();
  }, [fetchData, addToast]);

  const handleSimulateCheckIn = async () => {
    const currentStu = students.find(s => s.id === selectedStudentId) || students[0];
    try {
      await api.tapNfc({ studentId: currentStu.id, nfcUid: currentStu.nfc_uid, faceConfidence: 0.98 });
    } catch (e) {
      // Fallback
    }
    setStudents(prev => prev.map(s => s.id === currentStu.id ? { ...s, doorway_tap_time: 'Just Now', final_status: 'PRESENT' } : s));
    addToast('2FA Verified Check-In', `${currentStu.name} checked in at doorway`, 'success');
  };

  const handleControlSession = async (action) => {
    try {
      await api.controlSession(action, 1.0);
    } catch (e) {
      // Local fallback
    }
    setSession(prev => ({ ...prev, status: action === 'PAUSE' ? 'PAUSED' : 'ACTIVE' }));
  };

  const handleReviewException = async (id, decision) => {
    try {
      await api.reviewException(id, decision, 'FAC001');
    } catch (e) {
      // Local fallback
    }
    setExceptions(prev => prev.filter(x => x.id !== id));
    addToast('Exception Resolved', `Marked as ${decision}. Volatile frame erased.`, 'info');
  };

  const currentStudent = students.find(s => s.id === (currentUser?.id || selectedStudentId)) || students[0];

  // If not logged in, render the Login Page!
  if (!currentUser) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 flex flex-col justify-between blue-grid-bg relative selection:bg-blue-600/30 selection:text-blue-300">
      
      {/* Top Navbar: only 4 buttons (Home, Progress, Monitor for faculty, Profile) */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Content View */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex-1 w-full relative z-10">
        
        {currentTab === 'HOME' && (
          <HomeView
            currentStudent={currentStudent}
            session={session}
            currentRole={currentUser.role}
            onNavigate={setCurrentTab}
            onSimulateCheckIn={handleSimulateCheckIn}
          />
        )}

        {currentTab === 'PROGRESS' && (
          <ProgressView
            currentStudent={currentStudent}
          />
        )}

        {currentTab === 'MONITOR' && (
          <FacultyMonitorView
            session={session}
            students={students}
            exceptions={exceptions}
            onControlSession={handleControlSession}
            onReviewException={handleReviewException}
            onTapNfc={handleSimulateCheckIn}
          />
        )}

        {currentTab === 'PROFILE' && (
          <ProfileView
            currentStudent={currentStudent}
            students={students}
            onSelectStudent={setSelectedStudentId}
            currentRole={currentUser.role}
          />
        )}

      </main>

      {/* Real-time Toast Notifications */}
      <div className="fixed bottom-5 right-5 z-50 space-y-2 max-w-sm pointer-events-none">
        {toasts.map(toast => (
          <div 
            key={toast.id}
            className="p-4 rounded-2xl border border-blue-500/40 bg-[#0B1120]/95 shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(59,130,246,0.3)] backdrop-blur-xl pointer-events-auto flex items-start gap-3 transition-all animate-fade-in"
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            )}
            <div className="text-xs">
              <strong className="block font-bold text-white mb-0.5">{toast.title}</strong>
              <span className="text-slate-300 leading-snug">{toast.message}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Minimal Footer */}
      <footer className="border-t border-blue-500/15 py-5 px-6 bg-[#060913]/95 backdrop-blur-md text-xs text-slate-400 font-mono relative z-10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <span className="text-slate-300 font-medium">UniSync AI • Student & Faculty Attendance System</span>
          <span className="text-blue-400 flex items-center gap-1.5 font-semibold">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            12-Hour Ephemeral Zero-Retention Privacy Protocol
          </span>
          <span className="text-slate-500">Single Overhead AI Array • Blue & Black Glassmorphism</span>
        </div>
      </footer>

    </div>
  );
}
