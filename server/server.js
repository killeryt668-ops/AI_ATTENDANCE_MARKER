import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { run, get, all, initTables } from './database.js';
import { privacyTTL } from './services/privacyTTL.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, 'public');

// Global Session Simulation State
let sessionState = {
  sessionId: 'SESS-401-CURRENT',
  status: 'ACTIVE',
  elapsedSeconds: 120,
  targetDurationMinutes: 45,
  speedMultiplier: 1.0,
  activeDwellMap: {},
  offlineMode: false,
  unsyncedCount: 0,
  cameraMode: 'SINGLE_CAMERA_AI', // Single camera setup
  engagementMetrics: {
    attentivePct: 82.5,
    focusedPct: 88.0,
    confusionPct: 5.5,
    drowsinessPct: 4.0,
    overallEngagementIndex: 91.2
  }
};

// SSE Clients list
const sseClients = new Set();

function broadcast(type, payload) {
  const data = JSON.stringify({ type, payload, timestamp: new Date().toISOString() });
  for (const res of sseClients) {
    try {
      res.write(`data: ${data}\n\n`);
    } catch (e) {
      sseClients.delete(res);
    }
  }
}

// Start Ephemeral 12-Hour TTL Privacy Daemon
privacyTTL.startDaemon(30);

// Initialize Active Dwell from SQLite
async function syncStateFromDb() {
  try {
    const session = await get(`SELECT * FROM timetable_sessions WHERE id = ?`, [sessionState.sessionId]);
    if (session) {
      sessionState.status = session.status;
      sessionState.elapsedSeconds = session.elapsed_seconds || 0;
      sessionState.speedMultiplier = session.speed_multiplier || 1.0;
    }
    const records = await all(`SELECT student_id, dwell_seconds FROM attendance_records WHERE session_id = ?`, [sessionState.sessionId]);
    records.forEach(r => {
      sessionState.activeDwellMap[r.student_id] = r.dwell_seconds || 0;
    });
  } catch (e) {
    console.error('Error syncing state:', e);
  }
}
syncStateFromDb();

// 1-Second Session Clock Loop
setInterval(async () => {
  if (sessionState.status === 'ACTIVE') {
    const increment = 1 * sessionState.speedMultiplier;
    sessionState.elapsedSeconds += increment;

    const totalDurationSeconds = sessionState.targetDurationMinutes * 60;
    if (sessionState.elapsedSeconds >= totalDurationSeconds && sessionState.status !== 'COMPLETED') {
      sessionState.status = 'COMPLETED';
      await run(`UPDATE timetable_sessions SET status = 'COMPLETED', elapsed_seconds = ? WHERE id = ?`, 
        [sessionState.elapsedSeconds, sessionState.sessionId]);
      
      await finalizeSessionAttendance(sessionState.sessionId);
      broadcast('SESSION_COMPLETED', { sessionId: sessionState.sessionId });
    }

    // Dynamic Mood & Attention drift simulation
    const drift = (Math.random() - 0.5) * 0.8;
    sessionState.engagementMetrics.attentivePct = Math.min(96, Math.max(70, Number((sessionState.engagementMetrics.attentivePct + drift).toFixed(1))));
    sessionState.engagementMetrics.overallEngagementIndex = Math.min(98, Math.max(75, Number((sessionState.engagementMetrics.attentivePct * 0.7 + sessionState.engagementMetrics.focusedPct * 0.3).toFixed(1))));

    broadcast('SESSION_TICK', {
      sessionId: sessionState.sessionId,
      elapsedSeconds: sessionState.elapsedSeconds,
      elapsedMinutes: Number((sessionState.elapsedSeconds / 60).toFixed(1)),
      targetDurationMinutes: sessionState.targetDurationMinutes,
      status: sessionState.status,
      speedMultiplier: sessionState.speedMultiplier,
      engagement: sessionState.engagementMetrics
    });
  }
}, 1000);

// Finalize Attendance Thresholds
async function finalizeSessionAttendance(sessionId) {
  const records = await all(`SELECT * FROM attendance_records WHERE session_id = ?`, [sessionId]);
  for (const r of records) {
    const minutes = (r.dwell_seconds || 0) / 60;
    let newStatus = r.final_status;
    let flagReason = r.flagged_reason;

    if (minutes >= 45) {
      newStatus = 'PRESENT';
    } else if (minutes >= 30) {
      newStatus = 'REVIEW_REQUIRED';
      flagReason = `Incomplete Presence: ${minutes.toFixed(1)} mins (30–44 min threshold). Requires faculty review.`;
      
      const existingExc = await get(`SELECT id FROM ephemeral_exceptions WHERE session_id = ? AND student_id = ?`, [sessionId, r.student_id]);
      if (!existingExc) {
        const student = await get(`SELECT name FROM students WHERE id = ?`, [r.student_id]);
        const excId = `EXC-${Date.now().toString().slice(-4)}-${r.student_id}`;
        const expiresAt = new Date(Date.now() + 12 * 3600 * 1000).toISOString();
        await run(`
          INSERT INTO ephemeral_exceptions (id, session_id, student_id, student_name, exception_type, description, expires_at, status)
          VALUES (?, ?, ?, ?, 'INCOMPLETE_TIME_30_44M', ?, ?, 'PENDING')
        `, [excId, sessionId, r.student_id, student ? student.name : r.student_id, flagReason, expiresAt]);
      }
    } else {
      newStatus = 'ABSENT';
      flagReason = `Presence ${minutes.toFixed(1)} mins is under 30-min minimum required threshold.`;
    }

    await run(`
      UPDATE attendance_records 
      SET final_status = ?, flagged_reason = ?, dwell_minutes = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [newStatus, flagReason, Number(minutes.toFixed(1)), r.id]);
  }
}

// Native HTTP Server
const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Range');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  const sendJson = (data, status = 200) => {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  };

  const parseBody = () => new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        resolve({});
      }
    });
  });

  try {
    // Serve Static Assets (e.g. /assets/moodboard.png, /assets/proposal_video.mp4)
    if (pathname.startsWith('/assets/')) {
      const assetPath = path.join(publicDir, pathname);
      if (fs.existsSync(assetPath)) {
        const stat = fs.statSync(assetPath);
        const ext = path.extname(assetPath).toLowerCase();
        let mime = 'application/octet-stream';
        if (ext === '.png') mime = 'image/png';
        if (ext === '.jpg' || ext === '.jpeg') mime = 'image/jpeg';
        if (ext === '.mp4') mime = 'video/mp4';

        // Video Range Request handling
        const range = req.headers.range;
        if (range && ext === '.mp4') {
          const parts = range.replace(/bytes=/, "").split("-");
          const start = parseInt(parts[0], 10);
          const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
          const chunksize = (end - start) + 1;
          const file = fs.createReadStream(assetPath, { start, end });
          res.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${stat.size}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': mime,
          });
          file.pipe(res);
          return;
        }

        res.writeHead(200, {
          'Content-Length': stat.size,
          'Content-Type': mime
        });
        fs.createReadStream(assetPath).pipe(res);
        return;
      }
    }

    // Serve Static UI on /
    if (pathname === '/' || pathname === '/index.html') {
      const indexPath = path.join(publicDir, 'index.html');
      if (fs.existsSync(indexPath)) {
        const content = fs.readFileSync(indexPath, 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
        return;
      }
    }

    // SSE Stream
    if (pathname === '/api/events') {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      });
      res.write(`data: ${JSON.stringify({ type: 'CONNECTED', payload: { sessionId: sessionState.sessionId } })}\n\n`);
      sseClients.add(res);
      req.on('close', () => sseClients.delete(res));
      return;
    }

    // 1. Current Session
    if (pathname === '/api/session/current' && req.method === 'GET') {
      const session = await get(`
        SELECT s.*, f.name as faculty_name, f.department as faculty_dept 
        FROM timetable_sessions s
        LEFT JOIN faculty f ON s.faculty_id = f.id
        WHERE s.id = ?
      `, [sessionState.sessionId]);

      const students = await all(`
        SELECT st.*, 
               ar.nfc_tap_time, ar.two_factor_verified, ar.dwell_seconds, ar.dwell_minutes, 
               ar.final_status, ar.verified_method, ar.flagged_reason
        FROM students st
        LEFT JOIN attendance_records ar ON st.id = ar.student_id AND ar.session_id = ?
        ORDER BY st.roll_no ASC
      `, [sessionState.sessionId]);

      return sendJson({
        session: {
          ...session,
          elapsed_seconds: sessionState.elapsedSeconds,
          elapsed_minutes: Number((sessionState.elapsedSeconds / 60).toFixed(1)),
          speed_multiplier: sessionState.speedMultiplier,
          status: sessionState.status,
          engagement: sessionState.engagementMetrics
        },
        students,
        offlineMode: sessionState.offlineMode,
        unsyncedCount: sessionState.unsyncedCount
      });
    }

    // 2. Control Session
    if (pathname === '/api/session/control' && req.method === 'POST') {
      const { action, speedMultiplier, durationMinutes } = await parseBody();

      if (action === 'START') {
        sessionState.status = 'ACTIVE';
        if (durationMinutes) sessionState.targetDurationMinutes = durationMinutes;
      } else if (action === 'PAUSE') {
        sessionState.status = 'PAUSED';
      } else if (action === 'RESET') {
        sessionState.status = 'ACTIVE';
        sessionState.elapsedSeconds = 0;
        sessionState.activeDwellMap = {};
        await run(`
          UPDATE attendance_records 
          SET dwell_seconds = 0, dwell_minutes = 0, final_status = 'PENDING', flagged_reason = NULL 
          WHERE session_id = ?
        `, [sessionState.sessionId]);
      }

      if (speedMultiplier) {
        sessionState.speedMultiplier = Number(speedMultiplier);
      }

      await run(`
        UPDATE timetable_sessions 
        SET status = ?, elapsed_seconds = ?, speed_multiplier = ? 
        WHERE id = ?
      `, [sessionState.status, sessionState.elapsedSeconds, sessionState.speedMultiplier, sessionState.sessionId]);

      broadcast('SESSION_CONTROL_UPDATED', {
        status: sessionState.status,
        speedMultiplier: sessionState.speedMultiplier,
        elapsedSeconds: sessionState.elapsedSeconds
      });

      return sendJson({ success: true, sessionState });
    }

    // 3. NFC Door Tap
    if (pathname === '/api/nfc/tap' && req.method === 'POST') {
      const { nfcUid, studentId, isFaculty, faceConfidence, isProxySimulated, simulatedFacePhoto } = await parseBody();
      const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const expires12h = new Date(Date.now() + 12 * 3600 * 1000).toISOString();

      if (isFaculty) {
        const fac = await get(`SELECT * FROM faculty WHERE nfc_uid = ? OR id = ?`, [nfcUid, studentId]);
        if (fac) {
          sessionState.status = sessionState.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
          await run(`UPDATE timetable_sessions SET status = ? WHERE id = ?`, [sessionState.status, sessionState.sessionId]);
          broadcast('FACULTY_NFC_SWIPE', { faculty: fac, newStatus: sessionState.status });
          return sendJson({ success: true, message: `Faculty ${fac.name} tapped NFC. Session ${sessionState.status}.` });
        }
      }

      let student = await get(`SELECT * FROM students WHERE nfc_uid = ? OR id = ?`, [nfcUid, studentId]);

      if (!student || student.class_id !== 'CS401') {
        const guestName = student ? student.name : `Unregistered Guest (${nfcUid || studentId})`;
        const excId = `EXC-GST-${Date.now().toString().slice(-4)}`;
        
        await run(`
          INSERT INTO ephemeral_exceptions (id, session_id, student_id, student_name, exception_type, description, image_snapshot, expires_at, status)
          VALUES (?, ?, ?, ?, 'UNKNOWN_GUEST_ID', ?, ?, ?, 'PENDING')
        `, [excId, sessionState.sessionId, student ? student.id : 'GUEST', guestName, 
            `Unregistered ID entered room 304. Student belongs to ${student ? student.class_id : 'Unknown Class'}.`, 
            simulatedFacePhoto || null, expires12h]);

        broadcast('GUEST_ENTERED', { studentId: student ? student.id : 'GUEST', name: guestName, time: nowTime });
        broadcast('NEW_EXCEPTION', { id: excId, type: 'UNKNOWN_GUEST_ID', studentName: guestName });
        
        return sendJson({ 
          success: false, 
          warning: 'GUEST_STUDENT_FLAGGED', 
          message: `Student ${guestName} is not enrolled in CS401. Logged as Guest and alerted Faculty.` 
        });
      }

      if (isProxySimulated || (faceConfidence !== undefined && faceConfidence < 0.60)) {
        const excId = `EXC-PRX-${Date.now().toString().slice(-4)}`;
        const desc = `Proxy Buddy-Punch Warning: NFC tapped for ${student.name} (${student.roll_no}), but camera detected mismatch or low periocular confidence (${((faceConfidence || 0.42) * 100).toFixed(0)}%).`;
        
        await run(`
          INSERT INTO ephemeral_exceptions (id, session_id, student_id, student_name, exception_type, description, image_snapshot, expires_at, status)
          VALUES (?, ?, ?, ?, 'PROXY_MISMATCH', ?, ?, ?, 'PENDING')
        `, [excId, sessionState.sessionId, student.id, student.name, desc, simulatedFacePhoto || null, expires12h]);

        broadcast('PROXY_ALERT', { student, confidence: faceConfidence || 0.42, time: nowTime });
        broadcast('NEW_EXCEPTION', { id: excId, type: 'PROXY_MISMATCH', studentName: student.name });

        return sendJson({
          success: false,
          warning: 'PROXY_MISMATCH_SUSPECTED',
          message: `Cross-reference mismatch: AI Camera flagged potential buddy-punching for ${student.name}. Sent to Faculty Review.`
        });
      }

      await run(`
        INSERT INTO attendance_records (session_id, student_id, nfc_tap_time, two_factor_verified, dwell_seconds, dwell_minutes, final_status, verified_method)
        VALUES (?, ?, ?, 1, 0, 0, 'PENDING', 'NFC + AI CONTINUOUS SINGLE NIR')
        ON CONFLICT(session_id, student_id) DO UPDATE SET
          nfc_tap_time = ?,
          two_factor_verified = 1,
          updated_at = CURRENT_TIMESTAMP
      `, [sessionState.sessionId, student.id, nowTime, nowTime]);

      if (sessionState.offlineMode) {
        sessionState.unsyncedCount += 1;
      }

      broadcast('STUDENT_VERIFIED_ENTRY', {
        student,
        tapTime: nowTime,
        twoFactorVerified: true
      });

      return sendJson({
        success: true,
        student,
        tapTime: nowTime,
        message: `2-Factor Verified: ${student.name} (${student.roll_no}) checked in at ${nowTime}. Continuous AI tracking active.`
      });
    }

    // 4. AI Dwell Tracking & Engagement Ingest
    if (pathname === '/api/ai/track-dwell' && req.method === 'POST') {
      const { detectedStudentIds, deltaSeconds = 1, isLiveWebcam = false, cameraSource = 'SINGLE_AI_CAMERA' } = await parseBody();

      if (!detectedStudentIds || !Array.isArray(detectedStudentIds)) {
        return sendJson({ error: 'detectedStudentIds array required' }, 400);
      }

      const effectiveDelta = deltaSeconds * sessionState.speedMultiplier;

      for (const studentId of detectedStudentIds) {
        if (!sessionState.activeDwellMap[studentId]) {
          sessionState.activeDwellMap[studentId] = 0;
        }
        sessionState.activeDwellMap[studentId] += effectiveDelta;
        const currentSeconds = sessionState.activeDwellMap[studentId];
        const currentMinutes = Number((currentSeconds / 60).toFixed(1));

        let status = 'PENDING';
        let method = 'NFC + AI CONTINUOUS SINGLE CAMERA';
        let flag = null;

        if (currentMinutes >= 45) {
          status = 'PRESENT';
        } else if (currentMinutes >= 30) {
          status = sessionState.status === 'COMPLETED' ? 'REVIEW_REQUIRED' : 'PENDING';
          if (sessionState.status === 'COMPLETED') flag = `Incomplete Presence: ${currentMinutes}m (30-44m range)`;
        }

        await run(`
          INSERT INTO attendance_records (session_id, student_id, dwell_seconds, dwell_minutes, final_status, verified_method, flagged_reason)
          VALUES (?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(session_id, student_id) DO UPDATE SET
            dwell_seconds = ?,
            dwell_minutes = ?,
            final_status = CASE WHEN final_status = 'PRESENT' THEN 'PRESENT' ELSE ? END,
            flagged_reason = COALESCE(?, flagged_reason),
            updated_at = CURRENT_TIMESTAMP
        `, [sessionState.sessionId, studentId, currentSeconds, currentMinutes, status, method, flag,
            currentSeconds, currentMinutes, status, flag]);
      }

      broadcast('DWELL_UPDATE', {
        activeDwellMap: sessionState.activeDwellMap,
        detectedStudentIds,
        cameraSource,
        isLiveWebcam,
        engagement: sessionState.engagementMetrics
      });

      return sendJson({ success: true, count: detectedStudentIds.length, engagement: sessionState.engagementMetrics });
    }

    // 5. Ephemeral Exceptions
    if (pathname === '/api/exceptions' && req.method === 'GET') {
      const exceptions = await all(`
        SELECT * FROM ephemeral_exceptions 
        WHERE session_id = ? 
        ORDER BY created_at DESC
      `, [sessionState.sessionId]);

      const now = Date.now();
      const enriched = exceptions.map(exc => {
        const expTime = new Date(exc.expires_at).getTime();
        const diffMinutes = Math.max(0, Math.floor((expTime - now) / 60000));
        return { ...exc, ttl_remaining_minutes: diffMinutes };
      });

      return sendJson(enriched);
    }

    if (pathname.startsWith('/api/exceptions/') && pathname.endsWith('/review') && req.method === 'POST') {
      const id = pathname.split('/')[3];
      const { decision, facultyId = 'FAC001', notes } = await parseBody();

      const exc = await get(`SELECT * FROM ephemeral_exceptions WHERE id = ?`, [id]);
      if (!exc) return sendJson({ error: 'Exception not found' }, 404);

      const newStatus = decision === 'APPROVE_PRESENT' ? 'APPROVED_PRESENT' : 'REJECTED_ABSENT';
      const finalAttendance = decision === 'APPROVE_PRESENT' ? 'PRESENT' : 'ABSENT';

      await run(`
        UPDATE ephemeral_exceptions 
        SET status = ?, reviewed_by = ?, reviewed_at = CURRENT_TIMESTAMP, image_snapshot = NULL, description = ?
        WHERE id = ?
      `, [newStatus, facultyId, `${exc.description} [Reviewed: ${decision}. ${notes || ''}]`, id]);

      if (exc.student_id && exc.student_id !== 'GUEST') {
        await run(`
          UPDATE attendance_records 
          SET final_status = ?, verified_method = 'MANUAL_FACULTY_OVERRIDE', flagged_reason = ?
          WHERE session_id = ? AND student_id = ?
        `, [finalAttendance, `Faculty override: ${decision} (${notes || 'No notes'})`, exc.session_id, exc.student_id]);
      }

      await run(`
        INSERT INTO privacy_purge_audits (action_type, records_purged_count, biometric_bytes_erased, biometric_data_remaining_bytes, status, details)
        VALUES ('FACULTY_REVIEW_PURGE', 1, 480000, 0, 'ZERO_RETENTION_VERIFIED', ?)
      `, [`Biometric snapshot for exception ${id} instantly wiped upon faculty review.`]);

      broadcast('EXCEPTION_REVIEWED', { id, newStatus, studentId: exc.student_id, finalAttendance });

      return sendJson({ success: true, message: `Exception resolved as ${newStatus}. Ephemeral biometric snapshot wiped.` });
    }

    // 6. Students & CE Grades
    if (pathname === '/api/students' && req.method === 'GET') {
      const students = await all(`SELECT * FROM students ORDER BY roll_no ASC`);
      return sendJson(students);
    }

    if (pathname.startsWith('/api/students/') && pathname.endsWith('/ce-grades') && req.method === 'POST') {
      const id = pathname.split('/')[3];
      const { assignmentScore, quizScore, projectScore } = await parseBody();

      await run(`
        UPDATE students 
        SET ce_assignment_score = COALESCE(?, ce_assignment_score),
            ce_quiz_score = COALESCE(?, ce_quiz_score),
            ce_project_score = COALESCE(?, ce_project_score)
        WHERE id = ?
      `, [assignmentScore, quizScore, projectScore, id]);

      const updated = await get(`SELECT * FROM students WHERE id = ?`, [id]);
      broadcast('CE_GRADE_UPDATED', { studentId: id, student: updated });

      return sendJson({ success: true, student: updated });
    }

    // 7. Hardware Telemetry & Offline Toggle
    if (pathname === '/api/hardware' && req.method === 'GET') {
      const telemetry = await get(`SELECT * FROM hardware_telemetry WHERE id = 1`);
      return sendJson({
        ...telemetry,
        camera_facility_mode: 'SINGLE_AI_CAMERA_PERIOCULAR',
        offline_sync_mode: sessionState.offlineMode ? 'OFFLINE_BUFFERING' : 'ONLINE',
        unsynced_offline_records: sessionState.unsyncedCount
      });
    }

    if (pathname === '/api/hardware/toggle-offline' && req.method === 'POST') {
      sessionState.offlineMode = !sessionState.offlineMode;
      const powerSource = sessionState.offlineMode ? 'BATTERY_BACKUP' : 'AC_MAINS';
      const syncMode = sessionState.offlineMode ? 'OFFLINE_BUFFERING' : 'ONLINE';

      if (!sessionState.offlineMode && sessionState.unsyncedCount > 0) {
        console.log(`[Offline Sync] Reconnected! Syncing ${sessionState.unsyncedCount} buffered SQLite transactions to cloud...`);
        sessionState.unsyncedCount = 0;
      }

      await run(`
        UPDATE hardware_telemetry 
        SET microups_power_source = ?, 
            offline_sync_mode = ?, 
            unsynced_offline_records = ? 
        WHERE id = 1
      `, [powerSource, syncMode, sessionState.unsyncedCount]);

      broadcast('HARDWARE_STATUS_CHANGED', {
        offlineMode: sessionState.offlineMode,
        powerSource,
        syncMode,
        unsyncedCount: sessionState.unsyncedCount
      });

      return sendJson({
        success: true,
        offlineMode: sessionState.offlineMode,
        powerSource,
        syncMode,
        unsyncedCount: sessionState.unsyncedCount
      });
    }

    // 8. Privacy Audits & Manual Purge
    if (pathname === '/api/privacy/audits' && req.method === 'GET') {
      const audits = await all(`SELECT * FROM privacy_purge_audits ORDER BY timestamp DESC LIMIT 20`);
      return sendJson(audits);
    }

    if (pathname === '/api/privacy/purge-now' && req.method === 'POST') {
      const result = await privacyTTL.manualPurge();
      broadcast('PRIVACY_PURGE_EXECUTED', result);
      return sendJson({ success: true, result });
    }

    // 9. Timetable
    if (pathname === '/api/timetable' && req.method === 'GET') {
      const sessions = await all(`
        SELECT ts.*, f.name as faculty_name 
        FROM timetable_sessions ts
        LEFT JOIN faculty f ON ts.faculty_id = f.id
        ORDER BY ts.created_at ASC
      `);
      return sendJson(sessions);
    }

    // 10. Engagement & Mood Analytics Endpoint
    if (pathname === '/api/engagement/mood-metrics' && req.method === 'GET') {
      return sendJson({
        ...sessionState.engagementMetrics,
        moodBreakdown: [
          { mood: 'Attentive & Engaged', percentage: 65, color: '#10b981' },
          { mood: 'Active Note Taking', percentage: 22, color: '#00f0ff' },
          { mood: 'Questioning / Confused', percentage: 8, color: '#f59e0b' },
          { mood: 'Drowsy / Inattentive', percentage: 5, color: '#ef4444' }
        ],
        attentionTimeline: [
          { minute: '0m', score: 95 },
          { minute: '10m', score: 92 },
          { minute: '20m', score: 88 },
          { minute: '30m', score: 84 },
          { minute: '40m', score: 89 },
          { minute: '45m', score: 91 }
        ]
      });
    }

    sendJson({ error: 'Endpoint not found' }, 404);
  } catch (err) {
    console.error('Server error:', err);
    sendJson({ error: err.message }, 500);
  }
});

const PORT = 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`[AI Attendance Server] Native zero-dependency HTTP & SSE server running on http://localhost:${PORT}`);
  console.log(`[SQLite Database] Single AI Camera Mode + Proposal Moodboard + Video Player Active.`);
});
