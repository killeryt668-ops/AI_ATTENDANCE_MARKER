import { DatabaseSync } from 'node:sqlite';

console.log('[SQLite Database] Initializing Edge SQLite Engine in volatile secure memory (Zero Biometric Retention Architecture)...');
const db = new DatabaseSync(':memory:');

export async function run(query, params = []) {
  try {
    const stmt = db.prepare(query);
    const result = stmt.run(...params);
    return result;
  } catch (err) {
    console.error('[DB Run Error]:', query, err.message);
    throw err;
  }
}

export async function get(query, params = []) {
  try {
    const stmt = db.prepare(query);
    const row = stmt.get(...params);
    return row;
  } catch (err) {
    console.error('[DB Get Error]:', query, err.message);
    throw err;
  }
}

export async function all(query, params = []) {
  try {
    const stmt = db.prepare(query);
    const rows = stmt.all(...params);
    return rows;
  } catch (err) {
    console.error('[DB All Error]:', query, err.message);
    throw err;
  }
}

// Initialize tables
export async function initTables() {
  try {
    db.exec(`
      CREATE TABLE IF NOT EXISTS students (
        id TEXT PRIMARY KEY,
        roll_no TEXT NOT NULL,
        name TEXT NOT NULL,
        class_id TEXT NOT NULL,
        nfc_uid TEXT NOT NULL UNIQUE,
        avatar_color TEXT DEFAULT '#00f0ff',
        total_sessions INTEGER DEFAULT 20,
        attended_sessions INTEGER DEFAULT 18,
        current_attendance_pct REAL DEFAULT 90.0,
        ce_assignment_score REAL DEFAULT 88.0,
        ce_quiz_score REAL DEFAULT 92.0,
        ce_project_score REAL DEFAULT 85.0,
        biometric_enrolled INTEGER DEFAULT 1,
        periocular_hash TEXT DEFAULT 'HASH_NIR_V7_X99'
      );

      CREATE TABLE IF NOT EXISTS faculty (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        department TEXT NOT NULL,
        nfc_uid TEXT NOT NULL UNIQUE,
        room_assigned TEXT NOT NULL,
        email TEXT
      );

      CREATE TABLE IF NOT EXISTS timetable_sessions (
        id TEXT PRIMARY KEY,
        course_code TEXT NOT NULL,
        course_name TEXT NOT NULL,
        faculty_id TEXT NOT NULL,
        room_id TEXT NOT NULL,
        start_time TEXT,
        end_time TEXT,
        duration_minutes INTEGER DEFAULT 45,
        status TEXT DEFAULT 'IDLE',
        elapsed_seconds REAL DEFAULT 0,
        speed_multiplier REAL DEFAULT 1.0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS attendance_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT NOT NULL,
        student_id TEXT NOT NULL,
        nfc_tap_time TEXT,
        two_factor_verified INTEGER DEFAULT 0,
        dwell_seconds REAL DEFAULT 0,
        dwell_minutes REAL DEFAULT 0,
        final_status TEXT DEFAULT 'PENDING',
        verified_method TEXT DEFAULT 'AI_CONTINUOUS_NIR_NFC',
        flagged_reason TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(session_id, student_id)
      );

      CREATE TABLE IF NOT EXISTS ephemeral_exceptions (
        id TEXT PRIMARY KEY,
        session_id TEXT NOT NULL,
        student_id TEXT,
        student_name TEXT,
        exception_type TEXT NOT NULL,
        description TEXT NOT NULL,
        image_snapshot TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        expires_at DATETIME NOT NULL,
        status TEXT DEFAULT 'PENDING',
        reviewed_by TEXT,
        reviewed_at DATETIME,
        ttl_remaining_minutes INTEGER DEFAULT 720
      );

      CREATE TABLE IF NOT EXISTS privacy_purge_audits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        action_type TEXT NOT NULL,
        records_purged_count INTEGER DEFAULT 0,
        biometric_bytes_erased INTEGER DEFAULT 0,
        biometric_data_remaining_bytes INTEGER DEFAULT 0,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        status TEXT DEFAULT 'ZERO_RETENTION_VERIFIED',
        details TEXT
      );

      CREATE TABLE IF NOT EXISTS hardware_telemetry (
        id INTEGER PRIMARY KEY DEFAULT 1,
        nir_camera_a_fps REAL DEFAULT 30.0,
        nir_camera_a_status TEXT DEFAULT 'ONLINE_CORNER_N',
        nir_camera_b_fps REAL DEFAULT 30.0,
        nir_camera_b_status TEXT DEFAULT 'ONLINE_CORNER_S',
        nir_periocular_mode TEXT DEFAULT '850nm / 940nm DUAL_BAND',
        nfc_gateway_status TEXT DEFAULT 'ONLINE_DOORWAY',
        edge_cpu_load REAL DEFAULT 24.5,
        edge_temp_celsius REAL DEFAULT 47.8,
        microups_battery_pct REAL DEFAULT 100.0,
        microups_power_source TEXT DEFAULT 'AC_MAINS',
        offline_sync_mode TEXT DEFAULT 'ONLINE',
        unsynced_offline_records INTEGER DEFAULT 0,
        last_heartbeat DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await seedInitialData();
  } catch (err) {
    console.error('Error initializing SQLite tables:', err);
  }
}

async function seedInitialData() {
  const count = await get('SELECT COUNT(*) as count FROM students');
  if (count && count.count > 0) return;

  console.log('[SQLite Database] Seeding initial university students, faculty, timetable & telemetry...');

  // Faculty
  await run(`
    INSERT OR REPLACE INTO faculty (id, name, department, nfc_uid, room_assigned, email)
    VALUES 
      ('FAC001', 'Dr. Victor Vance', 'Computer Science & AI', 'NFC-FAC-9901', 'Hall 304 (Dual NIR Station)', 'v.vance@university.edu'),
      ('FAC002', 'Prof. Aris Thorne', 'Computer Vision & Robotics', 'NFC-FAC-9902', 'Lab 201 (Edge AI Lab)', 'a.thorne@university.edu')
  `);

  // Default Students (Class CS401: 101 to 110 + 1 Guest student 202)
  const studentsList = [
    { id: 'STU101', roll_no: '2026-CS-01', name: 'Alex Mercer', class_id: 'CS401', nfc_uid: 'NFC-7A39B1', color: '#00f0ff', total: 24, attended: 23, pct: 95.8, asg: 94, qz: 92, prj: 96 },
    { id: 'STU102', roll_no: '2026-CS-02', name: 'Maya Chen', class_id: 'CS401', nfc_uid: 'NFC-8C42E3', color: '#10b981', total: 24, attended: 22, pct: 91.6, asg: 90, qz: 88, prj: 95 },
    { id: 'STU103', roll_no: '2026-CS-03', name: 'Liam Vance', class_id: 'CS401', nfc_uid: 'NFC-9D55F4', color: '#a855f7', total: 24, attended: 21, pct: 87.5, asg: 85, qz: 82, prj: 88 },
    { id: 'STU104', roll_no: '2026-CS-04', name: 'Sophia Patel', class_id: 'CS401', nfc_uid: 'NFC-1B77A8', color: '#f59e0b', total: 24, attended: 24, pct: 100.0, asg: 98, qz: 96, prj: 99 },
    { id: 'STU105', roll_no: '2026-CS-05', name: 'David Kim', class_id: 'CS401', nfc_uid: 'NFC-3C88D2', color: '#38bdf8', total: 24, attended: 16, pct: 66.7, asg: 72, qz: 68, prj: 70 },
    { id: 'STU106', roll_no: '2026-CS-06', name: 'Elena Rossi', class_id: 'CS401', nfc_uid: 'NFC-4E99C5', color: '#ec4899', total: 24, attended: 23, pct: 95.8, asg: 91, qz: 90, prj: 94 },
    { id: 'STU107', roll_no: '2026-CS-07', name: 'Lucas Becker', class_id: 'CS401', nfc_uid: 'NFC-5F11E6', color: '#14b8a6', total: 24, attended: 19, pct: 79.2, asg: 80, qz: 78, prj: 84 },
    { id: 'STU108', roll_no: '2026-CS-08', name: 'Zara Ahmed', class_id: 'CS401', nfc_uid: 'NFC-6A22B7', color: '#8b5cf6', total: 24, attended: 15, pct: 62.5, asg: 65, qz: 60, prj: 68 },
    { id: 'STU109', roll_no: '2026-CS-09', name: 'Marcus Brody', class_id: 'CS401', nfc_uid: 'NFC-7B33C8', color: '#06b6d4', total: 24, attended: 22, pct: 91.6, asg: 89, qz: 92, prj: 90 },
    { id: 'STU110', roll_no: '2026-CS-10', name: 'Noah Jenkins', class_id: 'CS401', nfc_uid: 'NFC-8C44D9', color: '#6366f1', total: 24, attended: 20, pct: 83.3, asg: 84, qz: 81, prj: 86 },
    { id: 'STU202', roll_no: '2026-EC-22', name: 'Devon Miles (Guest)', class_id: 'EC202', nfc_uid: 'NFC-99GUEST', color: '#e11d48', total: 18, attended: 15, pct: 83.3, asg: 80, qz: 75, prj: 80 }
  ];

  for (const s of studentsList) {
    await run(`
      INSERT OR REPLACE INTO students (id, roll_no, name, class_id, nfc_uid, avatar_color, total_sessions, attended_sessions, current_attendance_pct, ce_assignment_score, ce_quiz_score, ce_project_score, biometric_enrolled)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
    `, [s.id, s.roll_no, s.name, s.class_id, s.nfc_uid, s.color, s.total, s.attended, s.pct, s.asg, s.qz, s.prj]);
  }

  // Active Timetable Session
  await run(`
    INSERT OR REPLACE INTO timetable_sessions (id, course_code, course_name, faculty_id, room_id, start_time, end_time, duration_minutes, status, elapsed_seconds, speed_multiplier)
    VALUES 
      ('SESS-401-CURRENT', 'CS401', 'AI & Neural Systems', 'FAC001', 'Hall 304 (Dual NIR Array)', '10:00 AM', '10:45 AM', 45, 'ACTIVE', 120, 1.0),
      ('SESS-402-NEXT', 'CS402', 'Computer Vision & Edge Systems', 'FAC002', 'Hall 304 (Dual NIR Array)', '11:00 AM', '11:45 AM', 45, 'IDLE', 0, 1.0)
  `);

  // Seed Initial Attendance Records for SESS-401-CURRENT
  const records = [
    { sid: 'STU101', tap: '10:01:14', verified: 1, dwellSec: 2750, dwellMin: 45.8, status: 'PRESENT', method: 'NFC + AI CONTINUOUS NIR' },
    { sid: 'STU102', tap: '10:02:05', verified: 1, dwellSec: 2720, dwellMin: 45.3, status: 'PRESENT', method: 'NFC + AI CONTINUOUS NIR' },
    { sid: 'STU103', tap: '10:01:45', verified: 1, dwellSec: 2150, dwellMin: 35.8, status: 'REVIEW_REQUIRED', method: 'AI_FLAGGED_REVIEW', flag: 'Dwell 35.8m (30-44m range)' },
    { sid: 'STU104', tap: '10:00:50', verified: 1, dwellSec: 2800, dwellMin: 46.6, status: 'PRESENT', method: 'NFC + AI CONTINUOUS NIR' },
    { sid: 'STU105', tap: '10:18:20', verified: 1, dwellSec: 1400, dwellMin: 23.3, status: 'ABSENT', method: 'ABSENT_TIME_DEFICIT', flag: 'Dwell < 30 min' },
    { sid: 'STU106', tap: '10:03:10', verified: 1, dwellSec: 2710, dwellMin: 45.1, status: 'PRESENT', method: 'NFC + AI CONTINUOUS NIR' },
    { sid: 'STU107', tap: '10:02:40', verified: 1, dwellSec: 2300, dwellMin: 38.3, status: 'REVIEW_REQUIRED', method: 'AI_FLAGGED_REVIEW', flag: 'Dwell 38.3m (Incomplete time)' },
    { sid: 'STU108', tap: null, verified: 0, dwellSec: 0, dwellMin: 0, status: 'ABSENT', method: 'NO_NFC_NO_FACE' },
    { sid: 'STU109', tap: '10:01:55', verified: 1, dwellSec: 2740, dwellMin: 45.6, status: 'PRESENT', method: 'NFC + AI CONTINUOUS NIR' },
    { sid: 'STU110', tap: '10:04:00', verified: 1, dwellSec: 2700, dwellMin: 45.0, status: 'PRESENT', method: 'NFC + AI CONTINUOUS NIR' }
  ];

  for (const r of records) {
    await run(`
      INSERT OR REPLACE INTO attendance_records (session_id, student_id, nfc_tap_time, two_factor_verified, dwell_seconds, dwell_minutes, final_status, verified_method, flagged_reason)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, ['SESS-401-CURRENT', r.sid, r.tap, r.verified, r.dwellSec, r.dwellMin, r.status, r.method, r.flag || null]);
  }

  // Seed Ephemeral Exceptions (with 12h TTL expiry)
  const now = new Date();
  const expire12h = new Date(now.getTime() + 12 * 3600 * 1000).toISOString();
  
  await run(`
    INSERT OR REPLACE INTO ephemeral_exceptions (id, session_id, student_id, student_name, exception_type, description, expires_at, status, ttl_remaining_minutes)
    VALUES 
      ('EXC-001', 'SESS-401-CURRENT', 'STU103', 'Liam Vance', 'INCOMPLETE_TIME_30_44M', 'Student present for 35.8 mins (below 45m threshold). Stepped out for 9 mins.', ?, 'PENDING', 680),
      ('EXC-002', 'SESS-401-CURRENT', 'STU107', 'Lucas Becker', 'INCOMPLETE_TIME_30_44M', 'Student present for 38.3 mins. Left early at 10:39 AM.', ?, 'PENDING', 710),
      ('EXC-003', 'SESS-401-CURRENT', 'STU202', 'Devon Miles (Guest)', 'UNKNOWN_GUEST_ID', 'Unregistered ID 202 entered CS401 classroom. Flagged as Guest.', ?, 'PENDING', 715),
      ('EXC-004', 'SESS-401-CURRENT', 'STU105', 'David Kim', 'PROXY_MISMATCH', 'Door NFC tap logged, but face angle had low confidence (54%). Human review requested.', ?, 'PENDING', 690)
  `, [expire12h, expire12h, expire12h, expire12h]);

  // Seed Privacy Audit logs
  await run(`
    INSERT INTO privacy_purge_audits (action_type, records_purged_count, biometric_bytes_erased, biometric_data_remaining_bytes, status, details)
    VALUES 
      ('MEMORY_BUFFER_CLEAR', 1420, 2840000, 0, 'ZERO_RETENTION_VERIFIED', 'Volatile RAM frame cache purged for previous class CS302.'),
      ('12H_TTL_AUTO_PURGE', 3, 1500000, 0, 'ZERO_RETENTION_VERIFIED', 'Expired exception snapshots from yesterday auto-deleted at 02:00 AM.')
  `);

  // Initial Hardware telemetry
  await run(`
    INSERT OR REPLACE INTO hardware_telemetry (id, nir_camera_a_fps, nir_camera_a_status, nir_camera_b_fps, nir_camera_b_status, nir_periocular_mode, nfc_gateway_status, edge_cpu_load, edge_temp_celsius, microups_battery_pct, microups_power_source, offline_sync_mode, unsynced_offline_records)
    VALUES (1, 30.0, 'ONLINE_CORNER_N', 30.0, 'ONLINE_CORNER_S', '850nm / 940nm DUAL_BAND', 'ONLINE_DOORWAY', 21.8, 46.5, 100.0, 'AC_MAINS', 'ONLINE', 0)
  `);

  console.log('[SQLite Database] Database seeded successfully!');
}

initTables();

export { db };
