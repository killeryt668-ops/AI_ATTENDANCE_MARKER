const API_BASE = window.location.origin.includes('5173') 
  ? 'http://localhost:5000/api' 
  : '/api';

const WS_BASE = window.location.origin.includes('5173')
  ? 'ws://localhost:5000/ws'
  : `ws://${window.location.host}/ws`;

export const api = {
  // Session
  getCurrentSession: async () => {
    const res = await fetch(`${API_BASE}/session/current`);
    return res.json();
  },

  controlSession: async (action, speedMultiplier, durationMinutes) => {
    const res = await fetch(`${API_BASE}/session/control`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, speedMultiplier, durationMinutes })
    });
    return res.json();
  },

  // NFC Tap
  tapNfc: async (data) => {
    const res = await fetch(`${API_BASE}/nfc/tap`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // AI Dwell Tracking
  trackDwell: async (detectedStudentIds, deltaSeconds, isLiveWebcam = false, cameraSource = 'NIR_ARRAY') => {
    const res = await fetch(`${API_BASE}/ai/track-dwell`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ detectedStudentIds, deltaSeconds, isLiveWebcam, cameraSource })
    });
    return res.json();
  },

  // Ephemeral Exceptions & 12h TTL
  getExceptions: async () => {
    const res = await fetch(`${API_BASE}/exceptions`);
    return res.json();
  },

  reviewException: async (id, decision, facultyId = 'FAC001', notes = '') => {
    const res = await fetch(`${API_BASE}/exceptions/${id}/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ decision, facultyId, notes })
    });
    return res.json();
  },

  // Students & CE Grades
  getStudents: async () => {
    const res = await fetch(`${API_BASE}/students`);
    return res.json();
  },

  getStudentDetails: async (id) => {
    const res = await fetch(`${API_BASE}/students/${id}`);
    return res.json();
  },

  updateCeGrades: async (id, scores) => {
    const res = await fetch(`${API_BASE}/students/${id}/ce-grades`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(scores)
    });
    return res.json();
  },

  // Hardware & Offline
  getHardwareTelemetry: async () => {
    const res = await fetch(`${API_BASE}/hardware`);
    return res.json();
  },

  toggleOfflineMode: async () => {
    const res = await fetch(`${API_BASE}/hardware/toggle-offline`, {
      method: 'POST'
    });
    return res.json();
  },

  // Privacy Audits & Manual Purge
  getPrivacyAudits: async () => {
    const res = await fetch(`${API_BASE}/privacy/audits`);
    return res.json();
  },

  purgePrivacyNow: async () => {
    const res = await fetch(`${API_BASE}/privacy/purge-now`, {
      method: 'POST'
    });
    return res.json();
  },

  // Timetable
  getTimetable: async () => {
    const res = await fetch(`${API_BASE}/timetable`);
    return res.json();
  }
};

// WebSocket Manager
export class WebSocketClient {
  constructor(onMessage) {
    this.onMessage = onMessage;
    this.ws = null;
    this.connected = false;
    this.reconnectTimeout = null;
  }

  connect() {
    try {
      this.ws = new WebSocket(WS_BASE);

      this.ws.onopen = () => {
        this.connected = true;
        console.log('[WS] Connected to AI Attendance Edge Server');
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (this.onMessage) this.onMessage(data);
        } catch (e) {
          console.error('[WS] Parse error:', e);
        }
      };

      this.ws.onclose = () => {
        this.connected = false;
        this.reconnectTimeout = setTimeout(() => this.connect(), 2000);
      };

      this.ws.onerror = (err) => {
        console.warn('[WS] Connection issue, retrying...', err);
        this.ws.close();
      };
    } catch (e) {
      this.reconnectTimeout = setTimeout(() => this.connect(), 2000);
    }
  }

  send(type, payload) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload }));
    }
  }

  disconnect() {
    if (this.reconnectTimeout) clearTimeout(this.reconnectTimeout);
    if (this.ws) this.ws.close();
  }
}
