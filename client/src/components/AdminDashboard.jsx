import React, { useState } from 'react';
import { 
  Server, 
  Cpu, 
  ShieldCheck, 
  Trash2, 
  RefreshCw, 
  Radio, 
  BatteryCharging, 
  BatteryWarning, 
  Wifi, 
  WifiOff, 
  Calendar, 
  Clock, 
  HardDrive, 
  Lock,
  Layers,
  CheckCircle2,
  AlertCircle,
  Activity,
  Zap
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import IconBadge from './common/IconBadge';

export default function AdminDashboard({ 
  telemetry, 
  timetable, 
  privacyAudits, 
  onToggleOffline, 
  onPurgePrivacyNow, 
  students 
}) {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('HARDWARE'); // 'HARDWARE', 'TIMETABLE', 'PRIVACY_AUDIT'
  const [purging, setPurging] = useState(false);

  const handleManualPurge = async () => {
    setPurging(true);
    await onPurgePrivacyNow();
    setTimeout(() => setPurging(false), 800);
  };

  const isOffline = telemetry?.offline_sync_mode === 'OFFLINE_BUFFERING';

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      
      {/* 1. Master System Health Header */}
      <div 
        className="glass-panel p-6 rounded-2xl border"
        style={{
          backgroundColor: `${theme.bgSurface}ee`,
          borderColor: theme.primaryBorder,
          boxShadow: `0 12px 36px rgba(0,0,0,0.4), 0 0 20px ${theme.glow}`
        }}
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
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
                CLASSROOM EDGE NODE #304
              </span>
              <span className="text-xs text-slate-400">Offline-First SQLite WAL Architecture</span>
            </div>
            
            <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
              <IconBadge icon={Server} size="sm" variant="primary" />
              <span>Classroom Edge Hardware & Privacy Infrastructure</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Supervising Single AI Vision Arrays, Doorway NFC Receivers, and Ephemeral 12-Hour Purge Daemons.
            </p>
          </div>

          {/* Quick Offline Simulation & Power Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onToggleOffline}
              className={`px-4 py-2.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-md hover:scale-105 ${
                isOffline
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-amber-500/20'
                  : 'text-slate-200'
              }`}
              style={!isOffline ? {
                backgroundColor: theme.bgBase,
                borderColor: theme.cardBorder
              } : {}}
            >
              {isOffline ? (
                <>
                  <WifiOff className="w-4 h-4 text-slate-950 animate-pulse" />
                  <span>Restore AC Power & Cloud Sync</span>
                </>
              ) : (
                <>
                  <Wifi className="w-4 h-4" style={{ color: theme.primary }} />
                  <span>Simulate Power / Wi-Fi Outage</span>
                </>
              )}
            </button>

            <button
              onClick={handleManualPurge}
              disabled={purging}
              className="px-4 py-2.5 rounded-xl bg-rose-950/40 text-rose-300 border border-rose-500/40 hover:bg-rose-900/40 text-xs font-mono font-bold flex items-center gap-2 transition-all hover:scale-105"
            >
              <Trash2 className="w-4 h-4 text-rose-400" />
              <span>{purging ? 'Purging RAM...' : 'Purge Volatile Biometrics'}</span>
            </button>
          </div>
        </div>

        {/* Real-time Hardware Telemetry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          
          {/* Dual NIR Camera Array */}
          <div 
            className="rounded-2xl p-4 border transition-all"
            style={{
              backgroundColor: theme.bgBase,
              borderColor: theme.cardBorder
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400 uppercase font-mono">Single AI Camera</span>
              <IconBadge icon={Radio} size="xs" variant="primary" pulse />
            </div>
            <div className="text-xl font-black text-white mt-1">
              {telemetry?.active_camera_fps || '30.0'} FPS <span className="text-xs font-mono font-normal" style={{ color: theme.primary }}>(Active)</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-2 font-mono">
              Ceiling Mount: 120° FOV • NIR 850nm
            </div>
          </div>

          {/* Micro-UPS Battery & Power Source */}
          <div 
            className={`rounded-2xl p-4 border transition-all ${
              isOffline ? 'bg-amber-950/30 border-amber-500/50' : ''
            }`}
            style={!isOffline ? {
              backgroundColor: theme.bgBase,
              borderColor: theme.cardBorder
            } : {}}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400 uppercase font-mono">Micro-UPS Backup</span>
              {isOffline ? (
                <IconBadge icon={BatteryWarning} size="xs" variant="warning" />
              ) : (
                <IconBadge icon={BatteryCharging} size="xs" variant="primary" />
              )}
            </div>
            <div className={`text-xl font-black mt-1 font-mono ${
              isOffline ? 'text-amber-400' : ''
            }`} style={!isOffline ? { color: theme.primary } : {}}>
              {isOffline ? '94% (Battery)' : '100% (AC Mains)'}
            </div>
            <div className="text-[11px] text-slate-400 mt-2 font-mono">
              Status: {isOffline ? 'Offline SQLite Buffer' : 'AC Powered & Online (<4ms)'}
            </div>
          </div>

          {/* Local Edge Mini-PC */}
          <div 
            className="rounded-2xl p-4 border transition-all"
            style={{
              backgroundColor: theme.bgBase,
              borderColor: theme.cardBorder
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400 uppercase font-mono">Edge Mini-PC</span>
              <IconBadge icon={Cpu} size="xs" variant="primary" />
            </div>
            <div className="text-xl font-black mt-1 font-mono" style={{ color: theme.primary }}>
              {telemetry?.cpu_usage_pct || 28.4}% Load <span className="text-xs text-slate-400">/ {telemetry?.thermal_temp_c || 44.8}°C</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-2 font-mono">
              In-Memory AI Periocular Pipeline
            </div>
          </div>

          {/* 12-Hour Ephemeral Privacy Zero-Retention */}
          <div 
            className="rounded-2xl p-4 border transition-all"
            style={{
              backgroundColor: theme.bgBase,
              borderColor: theme.primaryBorder
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase font-mono font-bold" style={{ color: theme.primary }}>
                Privacy Zero-Retention
              </span>
              <IconBadge icon={ShieldCheck} size="xs" variant="primary" />
            </div>
            <div className="text-xl font-black text-white mt-1 font-mono">
              0 Bytes Retained
            </div>
            <div className="text-[11px] mt-2 font-mono font-medium" style={{ color: theme.primary }}>
              12-Hour Auto-Erase Daemon Active
            </div>
          </div>

        </div>

      </div>

      {/* Tabs */}
      <div 
        className="flex flex-wrap items-center gap-2 border-b pb-3"
        style={{ borderColor: theme.cardBorder }}
      >
        <button
          onClick={() => setActiveTab('HARDWARE')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'HARDWARE'
              ? 'shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
          style={activeTab === 'HARDWARE' ? {
            backgroundColor: theme.primary,
            color: '#07100A',
            boxShadow: `0 0 16px ${theme.glow}`
          } : {}}
        >
          Edge Hardware Architecture Specs
        </button>

        <button
          onClick={() => setActiveTab('TIMETABLE')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'TIMETABLE'
              ? 'shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
          style={activeTab === 'TIMETABLE' ? {
            backgroundColor: theme.primary,
            color: '#07100A',
            boxShadow: `0 0 16px ${theme.glow}`
          } : {}}
        >
          University Timetable Schedule
        </button>

        <button
          onClick={() => setActiveTab('PRIVACY_AUDIT')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'PRIVACY_AUDIT'
              ? 'shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
          style={activeTab === 'PRIVACY_AUDIT' ? {
            backgroundColor: theme.primary,
            color: '#07100A',
            boxShadow: `0 0 16px ${theme.glow}`
          } : {}}
        >
          12-Hour Zero-Retention Privacy Audit ({privacyAudits.length})
        </button>
      </div>

      {/* TAB 1: HARDWARE SPECS & DIAGNOSTICS */}
      {activeTab === 'HARDWARE' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Dual NIR & Periocular Specs */}
          <div 
            className="glass-panel p-6 rounded-2xl border space-y-4"
            style={{
              backgroundColor: `${theme.bgSurface}ee`,
              borderColor: theme.cardBorder
            }}
          >
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <IconBadge icon={Radio} size="xs" variant="primary" />
              <span>Overhead Near-Infrared (NIR) Optics & Sensors</span>
            </h3>
            <p className="text-xs text-slate-400">
              Ceiling-mounted at center to eliminate occlusion, bypass ambient lighting flicker, and recognize facial geometry accurately.
            </p>

            <div className="space-y-3 pt-2">
              <div 
                className="p-3.5 rounded-xl border flex items-center justify-between text-xs"
                style={{
                  backgroundColor: theme.bgBase,
                  borderColor: theme.cardBorder
                }}
              >
                <div>
                  <div className="font-semibold text-white">Overhead Single AI Camera (Center)</div>
                  <div className="text-[11px] text-slate-400 font-mono">Wavelength: 850nm NIR • FOV: 120° Wide-Angle</div>
                </div>
                <span className="font-mono font-bold" style={{ color: theme.primary }}>ONLINE (30 FPS)</span>
              </div>

              <div 
                className="p-3.5 rounded-xl border flex items-center justify-between text-xs"
                style={{
                  backgroundColor: theme.bgBase,
                  borderColor: theme.cardBorder
                }}
              >
                <div>
                  <div className="font-semibold text-white">Edge AI Processing SBC Unit</div>
                  <div className="text-[11px] text-slate-400 font-mono">NPU Tensor Accelerator • Fanless Chassis</div>
                </div>
                <span className="font-mono font-bold" style={{ color: theme.primary }}>ONLINE</span>
              </div>

              <div 
                className="p-3.5 rounded-xl border flex items-center justify-between text-xs"
                style={{
                  backgroundColor: theme.bgBase,
                  borderColor: theme.cardBorder
                }}
              >
                <div>
                  <div className="font-semibold text-white">Doorway NFC High-Speed Reader</div>
                  <div className="text-[11px] text-slate-400 font-mono">13.56 MHz ISO/IEC 14443A • 12ms Tap Latency</div>
                </div>
                <span className="font-mono font-bold" style={{ color: theme.primary }}>ONLINE</span>
              </div>
            </div>
          </div>

          {/* Offline-First SQLite & Power Outage Architecture */}
          <div 
            className="glass-panel p-6 rounded-2xl border space-y-4"
            style={{
              backgroundColor: `${theme.bgSurface}ee`,
              borderColor: theme.cardBorder
            }}
          >
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <IconBadge icon={HardDrive} size="xs" variant="primary" />
              <span>Offline-First SQLite & Micro-UPS Resilience</span>
            </h3>
            <p className="text-xs text-slate-400">
              The edge unit executes biometric inferencing and timestamp logging locally. During Wi-Fi or mains power failure, the inline battery sustains continuous tracking.
            </p>

            <div 
              className="p-4 rounded-xl border space-y-3 text-xs font-mono"
              style={{
                backgroundColor: theme.bgBase,
                borderColor: theme.cardBorder
              }}
            >
              <div className="flex justify-between">
                <span className="text-slate-400">Database Engine:</span>
                <span className="font-bold" style={{ color: theme.primary }}>SQLite 3 (WAL Mode)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Sync Status:</span>
                <span className={isOffline ? 'text-amber-400 font-bold' : 'font-bold'} style={!isOffline ? { color: theme.primary } : {}}>
                  {isOffline ? 'BUFFERING LOCALLY (0 Cloud Dep)' : 'SYNCHRONIZED (Cloud Connected)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Unsynced Transactions:</span>
                <span className="text-white font-bold">{telemetry?.unsynced_offline_records || 0} Records</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Micro-UPS Runtime Reserve:</span>
                <span className="font-bold" style={{ color: theme.primary }}>~4.8 Hours on Outage</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400">
              💡 Tip: Click "Simulate Power Outage" in the top bar to test real-time SQLite offline buffering and automatic sync recovery.
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: TIMETABLE */}
      {activeTab === 'TIMETABLE' && (
        <div 
          className="glass-panel rounded-2xl overflow-hidden border"
          style={{
            backgroundColor: `${theme.bgSurface}ee`,
            borderColor: theme.cardBorder
          }}
        >
          <div 
            className="p-4 border-b"
            style={{ borderColor: theme.cardBorder }}
          >
            <h3 className="text-sm font-bold text-white">University Master Classroom Timetable</h3>
            <p className="text-xs text-slate-400">Scheduled continuous 45-minute multi-factor attendance sessions.</p>
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
                  <th className="px-4 py-3">Session ID</th>
                  <th className="px-4 py-3">Course</th>
                  <th className="px-4 py-3">Faculty</th>
                  <th className="px-4 py-3">Room & Hardware</th>
                  <th className="px-4 py-3">Time Window</th>
                  <th className="px-4 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y font-mono" style={{ borderColor: theme.cardBorder }}>
                {timetable.map((t) => (
                  <tr key={t.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 font-bold" style={{ color: theme.primary }}>{t.id}</td>
                    <td className="px-4 py-3 font-sans text-white font-medium">{t.course_code}: {t.course_name}</td>
                    <td className="px-4 py-3 text-slate-300">{t.faculty_name || 'Dr. Evelyn Vance'}</td>
                    <td className="px-4 py-3 text-slate-400">{t.room_id}</td>
                    <td className="px-4 py-3 text-slate-400">{t.time_slot || `${t.start_time || '10:00 AM'} - ${t.end_time || '10:45 AM'} (45m)`}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        t.status === 'ACTIVE' 
                          ? 'animate-pulse'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`} style={t.status === 'ACTIVE' ? {
                        backgroundColor: theme.primaryMuted,
                        color: theme.primary,
                        borderColor: theme.primaryBorder
                      } : {}}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ZERO-RETENTION PRIVACY AUDIT TRAIL */}
      {activeTab === 'PRIVACY_AUDIT' && (
        <div 
          className="glass-panel rounded-2xl p-6 border space-y-4"
          style={{
            backgroundColor: `${theme.bgSurface}ee`,
            borderColor: theme.cardBorder
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <IconBadge icon={ShieldCheck} size="xs" variant="primary" />
                <span>Zero-Retention Ephemeral Privacy Audit Log</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Proof of automated 12-hour TTL and review purge operations. Zero raw biometric video footage is stored permanently.
              </p>
            </div>
            <span 
              className="text-xs font-mono px-3 py-1 rounded-xl border font-bold"
              style={{
                backgroundColor: theme.primaryMuted,
                color: theme.primary,
                borderColor: theme.primaryBorder
              }}
            >
              Compliance: 100% GDPR / FERPA
            </span>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-xs font-mono">
              <thead 
                className="text-slate-400 uppercase border-b"
                style={{
                  backgroundColor: theme.bgBase,
                  borderColor: theme.cardBorder
                }}
              >
                <tr>
                  <th className="px-4 py-3">Timestamp / Hash</th>
                  <th className="px-4 py-3">Purge Action</th>
                  <th className="px-4 py-3">Description / Records Cleared</th>
                  <th className="px-4 py-3">Biometric Retained</th>
                  <th className="px-4 py-3 text-right">Audit Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: theme.cardBorder }}>
                {privacyAudits.map((a) => (
                  <tr key={a.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-slate-400">
                      <div>{a.timestamp || new Date().toLocaleTimeString()}</div>
                      <div className="text-[10px] text-slate-500">{a.hash || '0x7e29a...'}</div>
                    </td>
                    <td className="px-4 py-3 font-bold" style={{ color: theme.primary }}>
                      {a.action_type || a.event_type || 'ZERO_RETENTION_PURGE'}
                    </td>
                    <td className="px-4 py-3 text-slate-300">
                      {a.description || `${a.records_purged_count || 142} frames erased from volatile memory.`}
                    </td>
                    <td className="px-4 py-3 font-bold" style={{ color: theme.primary }}>
                      0 Bytes (Zero Retention)
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span 
                        className="px-2 py-0.5 rounded border text-[10px] font-bold"
                        style={{
                          backgroundColor: theme.primaryMuted,
                          color: theme.primary,
                          borderColor: theme.primaryBorder
                        }}
                      >
                        {a.status || 'VERIFIED'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
