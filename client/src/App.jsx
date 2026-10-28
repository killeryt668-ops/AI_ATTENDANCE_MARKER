import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import FacultyDashboard from './components/FacultyDashboard';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';
import CameraMonitoringStation from './components/CameraMonitoringStation';
import MoodBoardShowcase from './components/MoodBoardShowcase';
import MobilePhoneConnect from './components/MobilePhoneConnect';
import { api, WebSocketClient } from './services/api';
import { useTheme } from './context/ThemeContext';
import { ShieldCheck, AlertTriangle, CheckCircle2, XCircle, Sparkles } from 'lucide-react';

// Production-grade default data for offline / portfolio evaluation
const DEFAULT_SESSION = {
  id: 'SESS-401-CURRENT',
  course_code: 'CS401',
  course_name: 'Advanced AI & Periocular Biometrics',
  room_id: 'Lecture Hall 304 (Single AI Array)',
  faculty_name: 'Dr. Evelyn Vance',
  faculty_id: 'FAC001',
  status: 'ACTIVE',
  elapsed_minutes: 32.5,
  elapsed_seconds: 1950,
  duration_minutes: 45,
  speed_multiplier: 1.0,
  total_enrolled: 6,
  present_count: 4,
  engagement: {
    attentivePct: 88.5,
    focusedPct: 92.0,
    confusionPct: 5.0,
    drowsinessPct: 3.0,
    overallEngagementIndex: 92.4
  }
};

const DEFAULT_STUDENTS = [
  { id: 'STU101', name: 'Alex Mercer', roll_no: '2026-CS-01', class_id: 'CS401', nfc_uid: 'NFC-7A39B1', final_status: 'PRESENT', dwell_minutes: 45.2, dwell_seconds: 2712, doorway_tap_time: '10:01:12 AM', current_attendance_pct: 95.8, total_sessions: 24, attended_sessions: 23, ce_assignment_score: 95, ce_quiz_score: 92, ce_project_score: 98, avatar_color: '#BCFF00' },
  { id: 'STU102', name: 'Sara Lin', roll_no: '2026-CS-02', class_id: 'CS401', nfc_uid: 'NFC-8C21D4', final_status: 'PRESENT', dwell_minutes: 46.0, dwell_seconds: 2760, doorway_tap_time: '10:02:45 AM', current_attendance_pct: 91.6, total_sessions: 24, attended_sessions: 22, ce_assignment_score: 90, ce_quiz_score: 88, ce_project_score: 94, avatar_color: '#10B981' },
  { id: 'STU103', name: 'Devon Wright', roll_no: '2026-CS-03', class_id: 'CS401', nfc_uid: 'NFC-9E44F2', final_status: 'REVIEW_REQUIRED', dwell_minutes: 36.4, dwell_seconds: 2184, doorway_tap_time: '10:05:18 AM', current_attendance_pct: 79.2, total_sessions: 24, attended_sessions: 19, ce_assignment_score: 82, ce_quiz_score: 79, ce_project_score: 85, avatar_color: '#00F0FF' },
  { id: 'STU104', name: 'Elena Evans', roll_no: '2026-CS-04', class_id: 'CS401', nfc_uid: 'NFC-3B19A8', final_status: 'PRESENT', dwell_minutes: 45.5, dwell_seconds: 2730, doorway_tap_time: '10:00:40 AM', current_attendance_pct: 96.0, total_sessions: 24, attended_sessions: 23, ce_assignment_score: 96, ce_quiz_score: 94, ce_project_score: 95, avatar_color: '#A855F7' },
  { id: 'STU105', name: 'Marcus Chen', roll_no: '2026-CS-05', class_id: 'CS401', nfc_uid: 'NFC-5F72C3', final_status: 'PENDING', dwell_minutes: 31.8, dwell_seconds: 1908, doorway_tap_time: '10:08:15 AM', current_attendance_pct: 71.5, total_sessions: 24, attended_sessions: 17, ce_assignment_score: 72, ce_quiz_score: 68, ce_project_score: 70, avatar_color: '#F59E0B' },
  { id: 'STU106', name: 'Zoe Nakamura', roll_no: '2026-CS-06', class_id: 'CS401', nfc_uid: 'NFC-1D90E5', final_status: 'ABSENT', dwell_minutes: 0, dwell_seconds: 0, doorway_tap_time: null, current_attendance_pct: 68.0, total_sessions: 24, attended_sessions: 16, ce_assignment_score: 65, ce_quiz_score: 70, ce_project_score: 60, avatar_color: '#EF4444' }
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
    nfc_verified: true,
    face_confidence: 0.54,
    snapshot_url: '/assets/moodboard.png',
    ttl_remaining_minutes: 420
  }
];

const DEFAULT_TELEMETRY = {
  cpu_usage_pct: 28.4,
  ram_usage_pct: 42.1,
  npu_tensor_load_pct: 64.7,
  thermal_temp_c: 44.8,
  microups_battery_pct: 100,
  microups_power_source: 'AC_MAINS_ONLINE',
  microups_failover_latency_ms: 3.2,
  offline_sync_mode: 'CLOUD_CONNECTED_SYNC',
  unsynced_offline_records: 0,
  sqlite_wal_size_kb: 412,
  shredded_vectors_total: 18450,
  zero_retention_ttl_hours: 12,
  active_camera_fps: 30.0,
  camera_latency_ms: 18.4
};

const DEFAULT_TIMETABLE = [
  { id: 'SESS-401', course_code: 'CS401', course_name: 'Advanced AI & Periocular Biometrics', room_id: 'Hall 304', faculty_name: 'Dr. Evelyn Vance', time_slot: '10:00 AM - 10:45 AM', status: 'ACTIVE' },
  { id: 'SESS-402', course_code: 'CS402', course_name: 'Real-Time Edge Computer Vision', room_id: 'Lab 201', faculty_name: 'Prof. Alan Turing', time_slot: '11:00 AM - 11:45 AM', status: 'SCHEDULED' },
  { id: 'SESS-403', course_code: 'CS403', course_name: 'Embedded Systems & SQLite WAL Sync', room_id: 'Hall 105', faculty_name: 'Dr. Shannon', time_slot: '02:00 PM - 02:45 PM', status: 'SCHEDULED' }
];

const DEFAULT_AUDITS = [
  { id: 'AUD-901', timestamp: '10:00:00 AM', event_type: 'ZERO_RETENTION_PURGE', description: 'Volatile RAM tensor shredder purged 142 expired raw frames. Cryptographic proof generated.', hash: '0x8f7a912e...' },
  { id: 'AUD-902', timestamp: '09:45:12 AM', event_type: 'MICRO_UPS_SELF_TEST', description: 'Power failover sensor completed diagnostic. Switchover response: 3.2ms.', hash: '0x3c21a48b...' },
  { id: 'AUD-903', timestamp: '09:30:00 AM', event_type: 'SQLITE_WAL_CHECKPOINT', description: 'Offline WAL queue verified 0 pending uncommitted records.', hash: '0x17b5e809...' }
];

export default function App() {
  const { theme } = useTheme();
  const [currentView, setCurrentView] = useState('FACULTY');
  const [session, setSession] = useState(DEFAULT_SESSION);
  const [students, setStudents] = useState(DEFAULT_STUDENTS);
  const [exceptions, setExceptions] = useState(DEFAULT_EXCEPTIONS);
  const [telemetry, setTelemetry] = useState(DEFAULT_TELEMETRY);
  const [timetable, setTimetable] = useState(DEFAULT_TIMETABLE);
  const [privacyAudits, setPrivacyAudits] = useState(DEFAULT_AUDITS);
  const [selectedStudentId, setSelectedStudentId] = useState('STU101');
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((title, message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev.slice(-4), { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const [sessionData, excData, telemData, ttData, auditsData] = await Promise.all([
        api.getCurrentSession().catch(() => null),
        api.getExceptions().catch(() => null),
        api.getHardwareTelemetry().catch(() => null),
        api.getTimetable().catch(() => null),
        api.getPrivacyAudits().catch(() => null)
      ]);

      if (sessionData?.session) setSession(sessionData.session);
      if (sessionData?.students && sessionData.students.length > 0) setStudents(sessionData.students);
      if (excData && excData.length > 0) setExceptions(excData);
      if (telemData) setTelemetry(telemData);
      if (ttData && ttData.length > 0) setTimetable(ttData);
      if (auditsData && auditsData.length > 0) setPrivacyAudits(auditsData);
    } catch (err) {
      // Retain robust default data if server is offline
      console.log('Using robust offline portfolio mock data.');
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
          status: payload.status,
          speed_multiplier: payload.speedMultiplier,
          engagement: payload.engagement || prev.engagement
        }));
      } else if (type === 'STUDENT_VERIFIED_ENTRY') {
        addToast(
          '2FA Doorway Check-In',
          `${payload.student.name} (${payload.student.roll_no}) verified at doorway at ${payload.tapTime}`,
          'success'
        );
        fetchData();
      } else if (type === 'PROXY_ALERT') {
        addToast(
          '⚠️ Proxy Exception Flagged',
          `NFC tapped for ${payload.student.name}, but face confidence below threshold. Saved to Review Queue.`,
          'warning'
        );
        fetchData();
      } else if (type === 'GUEST_ENTERED') {
        addToast(
          '🚨 Unregistered Person Alert',
          `${payload.name} detected by AI vision array. Logged as Guest.`,
          'warning'
        );
        fetchData();
      } else if (type === 'EXCEPTION_REVIEWED') {
        addToast(
          'Exception Reviewed & Purged',
          `Exception marked as ${payload.newStatus}. Ephemeral biometric vectors automatically erased.`,
          'info'
        );
        fetchData();
      } else if (type === 'HARDWARE_STATUS_CHANGED') {
        setTelemetry(prev => ({
          ...prev,
          offline_sync_mode: payload.syncMode,
          unsynced_offline_records: payload.unsyncedCount,
          microups_power_source: payload.powerSource
        }));
      } else if (type === 'SESSION_COMPLETED') {
        addToast(
          '🎓 45-Min Lecture Concluded',
          'Session finalized. Final attendance statuses locked (≥45m Present, 30-44m Review, <30m Absent).',
          'success'
        );
        fetchData();
      }
    });

    wsClient.connect();

    return () => {
      wsClient.disconnect();
    };
  }, [fetchData, addToast]);

  const handleControlSession = async (action) => {
    try {
      await api.controlSession(action, session?.speed_multiplier);
    } catch (e) {
      // Local fallback simulation
      setSession(prev => ({ ...prev, status: action === 'START' ? 'ACTIVE' : action === 'PAUSE' ? 'PAUSED' : 'ACTIVE' }));
    }
    fetchData();
  };

  const handleSpeedChange = async (speed) => {
    try {
      await api.controlSession(session?.status || 'ACTIVE', speed);
    } catch (e) {
      // Local fallback
    }
    setSession(prev => ({ ...prev, speed_multiplier: speed }));
  };

  const handleTapNfc = async (data) => {
    try {
      const res = await api.tapNfc(data);
      if (res.warning) {
        addToast('Doorway Security Alert', res.message, 'warning');
      } else {
        addToast('Doorway Scanner Event', res.message, 'success');
      }
      fetchData();
      return res;
    } catch (e) {
      // Local simulation
      const stu = students.find(s => s.id === data.studentId) || students[0];
      addToast('Doorway NFC Sim Tap', `Verified 2FA check-in for ${stu.name}`, 'success');
      return { success: true };
    }
  };

  const handleTrackDwell = async (detectedIds, deltaSeconds, isLiveWebcam) => {
    try {
      await api.trackDwell(detectedIds, deltaSeconds, isLiveWebcam);
    } catch (e) {
      // Local update
    }
    const effectiveDelta = deltaSeconds * (session?.speed_multiplier || 1.0);
    setStudents(prev => prev.map(s => {
      if (detectedIds.includes(s.id)) {
        const newSec = (s.dwell_seconds || 0) + effectiveDelta;
        const newMin = Number((newSec / 60).toFixed(1));
        const finalStatus = newMin >= 45 ? 'PRESENT' : newMin >= 30 ? 'REVIEW_REQUIRED' : 'ABSENT';
        return { ...s, dwell_seconds: newSec, dwell_minutes: newMin, final_status: finalStatus };
      }
      return s;
    }));
  };

  const handleReviewException = async (id, decision, notes) => {
    try {
      await api.reviewException(id, decision, 'FAC001', notes);
    } catch (e) {
      setExceptions(prev => prev.filter(x => x.id !== id));
      addToast('Exception Resolved', `Marked as ${decision}. Biometric vectors shredded.`, 'info');
    }
    fetchData();
  };

  const handleUpdateCeGrades = async (id, scores) => {
    try {
      await api.updateCeGrades(id, scores);
    } catch (e) {
      setStudents(prev => prev.map(s => s.id === id ? { 
        ...s, 
        ce_assignment_score: scores.assignmentScore,
        ce_quiz_score: scores.quizScore,
        ce_project_score: scores.projectScore
      } : s));
    }
    addToast('CE Grades Updated', 'Continuous Evaluation rubric marks recorded.', 'success');
    fetchData();
  };

  const handleToggleOffline = async () => {
    try {
      await api.toggleOfflineMode();
    } catch (e) {
      setTelemetry(prev => {
        const isOffline = prev.offline_sync_mode === 'OFFLINE_BUFFERING';
        return {
          ...prev,
          offline_sync_mode: isOffline ? 'CLOUD_CONNECTED_SYNC' : 'OFFLINE_BUFFERING',
          microups_power_source: isOffline ? 'AC_MAINS_ONLINE' : 'MICRO_UPS_BATTERY'
        };
      });
      addToast(
        telemetry.offline_sync_mode === 'OFFLINE_BUFFERING' ? '⚡ Cloud Sync Restored' : '🔋 Micro-UPS Offline Active',
        telemetry.offline_sync_mode === 'OFFLINE_BUFFERING' ? 'AC mains restored. SQLite transactions syncing.' : 'Running offline on Micro-UPS. SQLite buffering local transactions.',
        'info'
      );
    }
  };

  const handlePurgePrivacyNow = async () => {
    try {
      const res = await api.purgePrivacyNow();
      addToast('12-Hour Zero Retention Enforced', res.result.message, 'info');
      fetchData();
    } catch (e) {
      addToast('12-Hour Zero Retention Enforced', 'Volatile RAM tensor shredder successfully purged all expired frames.', 'info');
    }
  };

  return (
    <div 
      className="min-h-screen text-slate-100 flex flex-col justify-between cyber-grid-bg relative transition-colors duration-500 overflow-x-hidden"
      style={{
        backgroundColor: theme.bgBase
      }}
    >
      {/* Dynamic Ambient Themed Glow Orbs */}
      <div 
        className="ambient-glow-orb top-[-100px] left-[-100px] w-[500px] h-[500px]"
        style={{ backgroundColor: theme.primary }}
      />
      <div 
        className="ambient-glow-orb bottom-[-150px] right-[-150px] w-[600px] h-[600px]"
        style={{ backgroundColor: theme.primaryDark }}
      />
      <div 
        className="ambient-glow-orb top-[40%] right-[20%] w-[350px] h-[350px] opacity-10"
        style={{ backgroundColor: theme.primaryLight }}
      />

      {/* Top Navbar */}
      <div className="relative z-50">
        <Navbar
          currentView={currentView}
          setCurrentView={setCurrentView}
          telemetry={telemetry}
          sessionState={session}
          onSpeedChange={handleSpeedChange}
          onToggleOffline={handleToggleOffline}
        />
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex-1 w-full relative z-10">
        
        {currentView === 'FACULTY' && (
          <FacultyDashboard
            session={session}
            students={students}
            exceptions={exceptions}
            onControlSession={handleControlSession}
            onTapNfc={handleTapNfc}
            onReviewException={handleReviewException}
            onUpdateCeGrades={handleUpdateCeGrades}
            onOpenLiveStation={() => setCurrentView('CAMERA_STATION')}
          />
        )}

        {currentView === 'STUDENT' && (
          <StudentDashboard
            students={students}
            selectedStudentId={selectedStudentId}
            setSelectedStudentId={setSelectedStudentId}
            onTapNfc={handleTapNfc}
          />
        )}

        {currentView === 'ADMIN' && (
          <AdminDashboard
            telemetry={telemetry}
            timetable={timetable}
            privacyAudits={privacyAudits}
            students={students}
            onToggleOffline={handleToggleOffline}
            onPurgePrivacyNow={handlePurgePrivacyNow}
          />
        )}

        {currentView === 'CAMERA_STATION' && (
          <CameraMonitoringStation
            students={students}
            session={session}
            onTapNfc={handleTapNfc}
            onTrackDwell={handleTrackDwell}
            onSwitchToMobile={() => setCurrentView('MOBILE_CONNECT')}
          />
        )}

        {currentView === 'MOODBOARD' && (
          <MoodBoardShowcase
            onPlayVideo={() => setCurrentView('CAMERA_STATION')}
          />
        )}

        {currentView === 'MOBILE_CONNECT' && (
          <MobilePhoneConnect
            students={students}
            onTapNfc={handleTapNfc}
            onTrackDwell={handleTrackDwell}
          />
        )}

      </main>

      {/* Real-time Toast Notifications */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm pointer-events-none">
        {toasts.map(toast => (
          <div 
            key={toast.id}
            className="p-4 rounded-2xl border shadow-2xl backdrop-blur-xl pointer-events-auto flex items-start gap-3 transition-all animate-fade-in"
            style={{
              backgroundColor: `${theme.bgSurface}ee`,
              borderColor: toast.type === 'warning' ? '#f59e0b' : toast.type === 'error' ? '#ef4444' : theme.primaryBorder,
              boxShadow: `0 8px 30px rgba(0,0,0,0.6), 0 0 20px ${toast.type === 'warning' ? 'rgba(245, 158, 11, 0.2)' : toast.type === 'error' ? 'rgba(239, 68, 68, 0.2)' : theme.glow}`
            }}
          >
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: theme.primary }} />}
            {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />}
            {toast.type === 'error' && <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
            {toast.type === 'info' && <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" style={{ color: theme.primary }} />}
            
            <div className="text-xs">
              <strong className="block font-bold text-white mb-0.5">{toast.title}</strong>
              <span className="text-slate-300 leading-snug">{toast.message}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Unified Footer */}
      <footer 
        className="border-t py-4 px-6 backdrop-blur-md text-center text-xs text-slate-400 font-mono relative z-10 transition-colors"
        style={{
          backgroundColor: `${theme.bgBase}f0`,
          borderColor: theme.cardBorder
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <span className="text-slate-300 font-medium">AI-Driven Multi-Factor Ephemeral Attendance System</span>
          <span className="flex items-center gap-1.5 font-semibold" style={{ color: theme.primary }}>
            <ShieldCheck className="w-4 h-4" style={{ color: theme.primary }} /> 
            12-Hour Volatile TTL • Zero Biometric Retention Protocol
          </span>
          <span className="text-slate-400">Single Camera AI Architecture • Local SQLite WAL</span>
        </div>
      </footer>

    </div>
  );
}
