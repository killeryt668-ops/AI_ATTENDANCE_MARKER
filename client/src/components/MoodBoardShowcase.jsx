import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Play, 
  Maximize2, 
  Radio, 
  Cpu, 
  Layers, 
  AlertTriangle, 
  Sparkles,
  Lock,
  UserCheck,
  GraduationCap,
  LayoutDashboard,
  Camera,
  Smartphone,
  Server,
  Zap,
  HardDrive,
  Activity,
  BarChart3,
  Eye,
  Wifi,
  Database,
  Download,
  FileText
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import IconBadge from './common/IconBadge';

export default function MoodBoardShowcase({ onPlayVideo }) {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('MASTER');
  const [zoomImage, setZoomImage] = useState(false);

  const moodBoards = [
    { id: 'MASTER', label: 'Master Mood Board', icon: Sparkles },
    { id: 'FACULTY', label: 'Faculty Interface', icon: UserCheck },
    { id: 'STUDENT', label: 'Student Portal', icon: GraduationCap },
    { id: 'ADMIN', label: 'Admin Telemetry', icon: LayoutDashboard },
    { id: 'CAMERA', label: 'AI Vision Hub', icon: Camera },
    { id: 'MOBILE', label: 'Phone Connect Node', icon: Smartphone },
    { id: 'HARDWARE', label: 'External Hardware Devices', icon: Cpu }
  ];

  const handlePrintSpec = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      
      {/* Header Banner */}
      <div 
        className="glass-panel p-6 rounded-2xl border shadow-2xl relative overflow-hidden"
        style={{
          backgroundColor: `${theme.bgSurface}ee`,
          borderColor: theme.primaryBorder,
          boxShadow: `0 12px 36px rgba(0,0,0,0.5), 0 0 24px ${theme.glow}`
        }}
      >
        <div 
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ backgroundColor: theme.primary }}
        />
        
        <div 
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b relative z-10"
          style={{ borderColor: theme.cardBorder }}
        >
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
                UNIFIED CYBER DESIGN SYSTEM ({theme.name} • {theme.primary})
              </span>
              <span className="text-xs text-slate-400">Touchless Multi-Factor Verification Architecture</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
              <IconBadge icon={Sparkles} size="sm" variant="primary" />
              <span>System Concept, Interface Mood Boards & Hardware Architecture</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setZoomImage(!zoomImage)}
              className="px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all hover:scale-105"
              style={{
                backgroundColor: theme.bgBase,
                borderColor: theme.cardBorder,
                color: theme.primary
              }}
            >
              <Maximize2 className="w-4 h-4" />
              <span>{zoomImage ? 'Standard View' : 'Full Screen Master'}</span>
            </button>

            <button
              onClick={handlePrintSpec}
              className="px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all hover:scale-105 text-slate-300"
              style={{
                backgroundColor: theme.bgBase,
                borderColor: theme.cardBorder
              }}
              title="Print or Save as PDF"
            >
              <Download className="w-4 h-4" style={{ color: theme.primary }} />
              <span>Export PDF Spec</span>
            </button>

            <button
              onClick={onPlayVideo}
              className="px-4 py-2 rounded-xl text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg transition-all hover:scale-105"
              style={{
                backgroundColor: theme.primary,
                boxShadow: `0 0 16px ${theme.glow}`
              }}
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Play Proposal Video</span>
            </button>
          </div>
        </div>

        {/* Interactive Mood Board Navigation Bar - All Tabs Unified to Active Theme */}
        <div 
          className="flex flex-wrap items-center gap-2 mt-4 pt-2 border-t"
          style={{ borderColor: theme.cardBorder }}
        >
          {moodBoards.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs transition-all duration-200 ${
                  isActive
                    ? 'font-black shadow-lg'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
                style={isActive ? {
                  backgroundColor: theme.primary,
                  color: '#07100A',
                  boxShadow: `0 0 16px ${theme.glow}`
                } : {
                  backgroundColor: theme.bgBase,
                  border: `1px solid ${theme.cardBorder}`
                }}
              >
                <Icon className="w-4 h-4" style={{ color: isActive ? '#07100A' : theme.primaryLight }} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Showcase Area depending on active tab */}
      {activeTab === 'MASTER' && (
        <div className="space-y-6 animate-fade-in">
          {/* Master Infographic Image Card */}
          <div 
            className={`rounded-2xl overflow-hidden border shadow-2xl relative group transition-all duration-300 ${zoomImage ? 'p-1' : ''}`}
            style={{
              backgroundColor: theme.bgBase,
              borderColor: theme.primaryBorder
            }}
          >
            <img 
              src="/assets/moodboard.png" 
              alt="Master AI Attendance System Mood Board" 
              className="w-full h-auto object-cover rounded-xl transition-transform duration-500 group-hover:scale-[1.005]"
            />
            <div 
              className="absolute bottom-4 right-4 border px-3.5 py-2 rounded-xl text-xs font-mono flex items-center gap-2 backdrop-blur-xl"
              style={{
                backgroundColor: `${theme.bgBase}ee`,
                borderColor: theme.primaryBorder,
                color: theme.primary
              }}
            >
              <Sparkles className="w-4 h-4" style={{ color: theme.primary }} />
              <span>Master Infographic ({theme.primary} Unified)</span>
            </div>
          </div>

          {/* Color Palette Specification Card */}
          <div 
            className="glass-panel p-5 rounded-2xl border"
            style={{
              backgroundColor: `${theme.bgSurface}ee`,
              borderColor: theme.cardBorder
            }}
          >
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2 font-mono">
              <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: theme.primary }} />
              <span>ACTIVE THEME COLOR PALETTE & DESIGN SYSTEM TOKENS</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div 
                className="p-3.5 rounded-xl border"
                style={{ backgroundColor: theme.bgBase, borderColor: theme.cardBorder }}
              >
                <div 
                  className="w-full h-8 rounded-lg mb-2 border" 
                  style={{ backgroundColor: theme.bgBase, borderColor: theme.cardBorder }} 
                />
                <div className="text-xs font-bold text-white font-mono">{theme.bgBase}</div>
                <div className="text-[11px] text-slate-400">Deep Obsidian Base</div>
              </div>
              
              <div 
                className="p-3.5 rounded-xl border"
                style={{ backgroundColor: theme.bgBase, borderColor: theme.cardBorder }}
              >
                <div 
                  className="w-full h-8 rounded-lg mb-2 border" 
                  style={{ backgroundColor: theme.bgSurface, borderColor: theme.cardBorder }} 
                />
                <div className="text-xs font-bold text-white font-mono">{theme.bgSurface}</div>
                <div className="text-[11px] text-slate-400">Elevated Glass Surface</div>
              </div>

              <div 
                className="p-3.5 rounded-xl border"
                style={{ backgroundColor: theme.bgBase, borderColor: theme.cardBorder }}
              >
                <div 
                  className="w-full h-8 rounded-lg mb-2 border" 
                  style={{ backgroundColor: theme.bgElevated, borderColor: theme.primaryBorder }} 
                />
                <div className="text-xs font-bold text-white font-mono">{theme.bgElevated}</div>
                <div className="text-[11px] text-slate-400">Cyber Accent Traces</div>
              </div>

              <div 
                className="p-3.5 rounded-xl border"
                style={{ backgroundColor: theme.bgBase, borderColor: theme.primaryBorder }}
              >
                <div 
                  className="w-full h-8 rounded-lg mb-2 shadow-md" 
                  style={{ backgroundColor: theme.primary, boxShadow: `0 0 12px ${theme.glow}` }} 
                />
                <div className="text-xs font-bold font-mono" style={{ color: theme.primary }}>
                  {theme.primary}
                </div>
                <div className="text-[11px] font-semibold" style={{ color: theme.primaryLight }}>
                  Primary System Glow ({theme.name})
                </div>
              </div>
            </div>
          </div>

          {/* 6 Core Pillars Breakdown - Unified Theme Icons & Borders */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <div 
              className="p-5 rounded-2xl border transition-all hover:scale-[1.01]"
              style={{
                backgroundColor: `${theme.bgSurface}ee`,
                borderColor: theme.cardBorder
              }}
            >
              <div className="text-xs font-mono font-bold mb-2.5 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <IconBadge icon={Radio} size="xs" variant="primary" /> 
                  <span className="text-white">1. Doorway 2FA Station</span>
                </span>
                <span 
                  className="px-2 py-0.5 rounded text-[10px] font-bold border"
                  style={{
                    backgroundColor: theme.primaryMuted,
                    color: theme.primary,
                    borderColor: theme.primaryBorder
                  }}
                >
                  NFC + NIR
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Touchless dual-factor validation. Doorway NFC tap verified alongside instant Near-Infrared 850nm facial feature vectoring eliminates buddy-punching proxies in under 300ms.
              </p>
            </div>

            <div 
              className="p-5 rounded-2xl border transition-all hover:scale-[1.01]"
              style={{
                backgroundColor: `${theme.bgSurface}ee`,
                borderColor: theme.cardBorder
              }}
            >
              <div className="text-xs font-mono font-bold mb-2.5 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <IconBadge icon={Layers} size="xs" variant="primary" /> 
                  <span className="text-white">2. Single-Camera Classroom</span>
                </span>
                <span 
                  className="px-2 py-0.5 rounded text-[10px] font-bold border"
                  style={{
                    backgroundColor: theme.primaryMuted,
                    color: theme.primary,
                    borderColor: theme.primaryBorder
                  }}
                >
                  Continuous AI
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                One overhead camera monitors the whole room. AI multi-person tracking accumulates spatial dwell minutes and calculates real-time engagement heatmaps.
              </p>
            </div>

            <div 
              className="p-5 rounded-2xl border transition-all hover:scale-[1.01]"
              style={{
                backgroundColor: `${theme.bgSurface}ee`,
                borderColor: theme.cardBorder
              }}
            >
              <div className="text-xs font-mono font-bold mb-2.5 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <IconBadge icon={Clock} size="xs" variant="primary" /> 
                  <span className="text-white">3. 45-Min Attendance Logic</span>
                </span>
                <span 
                  className="px-2 py-0.5 rounded text-[10px] font-bold border"
                  style={{
                    backgroundColor: theme.primaryMuted,
                    color: theme.primary,
                    borderColor: theme.primaryBorder
                  }}
                >
                  Thresholds
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Continuous dwell threshold grading: <strong>Present (≥45m)</strong>, <strong>Faculty Review (30-44m)</strong>, and <strong>Absent (&lt;30m)</strong> with continuous evaluation marks syncing.
              </p>
            </div>

            <div 
              className="p-5 rounded-2xl border transition-all hover:scale-[1.01]"
              style={{
                backgroundColor: `${theme.bgSurface}ee`,
                borderColor: theme.cardBorder
              }}
            >
              <div className="text-xs font-mono font-bold mb-2.5 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <IconBadge icon={Lock} size="xs" variant="primary" /> 
                  <span className="text-white">4. 12-Hour Zero Retention</span>
                </span>
                <span 
                  className="px-2 py-0.5 rounded text-[10px] font-bold border"
                  style={{
                    backgroundColor: theme.primaryMuted,
                    color: theme.primary,
                    borderColor: theme.primaryBorder
                  }}
                >
                  Privacy TTL
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Volatile RAM processing discards raw video immediately. Exception review snapshots are permanently auto-purged within 12 hours with cryptographic audit trails.
              </p>
            </div>

            <div 
              className="p-5 rounded-2xl border transition-all hover:scale-[1.01]"
              style={{
                backgroundColor: `${theme.bgSurface}ee`,
                borderColor: theme.cardBorder
              }}
            >
              <div className="text-xs font-mono font-bold mb-2.5 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <IconBadge icon={Cpu} size="xs" variant="primary" /> 
                  <span className="text-white">5. Edge Micro-UPS Module</span>
                </span>
                <span 
                  className="px-2 py-0.5 rounded text-[10px] font-bold border"
                  style={{
                    backgroundColor: theme.primaryMuted,
                    color: theme.primary,
                    borderColor: theme.primaryBorder
                  }}
                >
                  Zero Downtime
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Integrated battery backup switches instantly during power cuts (&lt;4ms). Local SQLite WAL buffering records attendance offline and automatically syncs to cloud on restoration.
              </p>
            </div>

            <div 
              className="p-5 rounded-2xl border transition-all hover:scale-[1.01]"
              style={{
                backgroundColor: `${theme.bgSurface}ee`,
                borderColor: theme.cardBorder
              }}
            >
              <div className="text-xs font-mono font-bold mb-2.5 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <IconBadge icon={Sparkles} size="xs" variant="primary" /> 
                  <span className="text-white">6. Multi-Interface Ecosystem</span>
                </span>
                <span 
                  className="px-2 py-0.5 rounded text-[10px] font-bold border"
                  style={{
                    backgroundColor: theme.primaryMuted,
                    color: theme.primary,
                    borderColor: theme.primaryBorder
                  }}
                >
                  Unified Theme
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cohesive web dashboards for Faculty (session control & grading), Students (dwell timeline & dispute log), Admin (telemetry & privacy audit), and Mobile camera nodes.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* FACULTY INTERFACE MOOD BOARD */}
      {activeTab === 'FACULTY' && (
        <div className="space-y-6 animate-fade-in">
          <div 
            className="glass-panel p-6 rounded-2xl border"
            style={{
              backgroundColor: `${theme.bgSurface}ee`,
              borderColor: theme.primaryBorder
            }}
          >
            <div 
              className="flex items-center justify-between mb-4 pb-3 border-b"
              style={{ borderColor: theme.cardBorder }}
            >
              <div>
                <span 
                  className="text-xs font-mono font-bold px-2.5 py-1 rounded-full border"
                  style={{
                    backgroundColor: theme.primaryMuted,
                    color: theme.primary,
                    borderColor: theme.primaryBorder
                  }}
                >
                  INTERFACE MOOD BOARD 01
                </span>
                <h3 className="text-xl font-bold text-white mt-1">Faculty Live Control & Continuous Evaluation Dashboard</h3>
              </div>
              <div className="text-xs font-mono text-slate-400">Target Role: Professors & Course Instructors</div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div 
                className="p-4 rounded-xl border space-y-3"
                style={{ backgroundColor: theme.bgBase, borderColor: theme.cardBorder }}
              >
                <div className="text-xs font-mono font-bold flex items-center gap-1.5" style={{ color: theme.primary }}>
                  <Activity className="w-4 h-4" /> <span>Real-Time Session Controller</span>
                </div>
                <div 
                  className="p-3 rounded-lg border text-center"
                  style={{ backgroundColor: theme.bgSurface, borderColor: theme.cardBorder }}
                >
                  <div className="text-2xl font-mono font-black" style={{ color: theme.primary }}>42:18</div>
                  <div className="text-[11px] text-slate-400">Class Progress (Target: 45:00 min)</div>
                  <div className="mt-2 w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: '94%', backgroundColor: theme.primary }} />
                  </div>
                </div>
                <p className="text-xs text-slate-300">
                  Allows instructors to start/pause sessions, simulate time at 1x/10x/60x turbo for demo, and trigger immediate student check-ins.
                </p>
              </div>

              <div 
                className="p-4 rounded-xl border space-y-3"
                style={{ backgroundColor: theme.bgBase, borderColor: theme.cardBorder }}
              >
                <div className="text-xs font-mono font-bold flex items-center gap-1.5" style={{ color: theme.primary }}>
                  <BarChart3 className="w-4 h-4" /> <span>Attendance Status & Continuous Evaluation</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div 
                    className="flex justify-between p-2 rounded border"
                    style={{ backgroundColor: theme.bgSurface, borderColor: theme.cardBorder }}
                  >
                    <span className="text-slate-300">Present (≥45m)</span>
                    <strong className="font-mono" style={{ color: theme.primary }}>82% (28/34)</strong>
                  </div>
                  <div 
                    className="flex justify-between p-2 rounded border border-amber-500/20 text-amber-300"
                    style={{ backgroundColor: theme.bgSurface }}
                  >
                    <span>Review Flag (30-44m)</span>
                    <strong className="font-mono">12% (4/34)</strong>
                  </div>
                  <div 
                    className="flex justify-between p-2 rounded border border-rose-500/20 text-rose-300"
                    style={{ backgroundColor: theme.bgSurface }}
                  >
                    <span>Absent (&lt;30m)</span>
                    <strong className="font-mono">6% (2/34)</strong>
                  </div>
                </div>
                <p className="text-xs text-slate-300">
                  Instant rubric grading for CE assignments, laboratory attendance, and participation weightage.
                </p>
              </div>

              <div 
                className="p-4 rounded-xl border space-y-3"
                style={{ backgroundColor: theme.bgBase, borderColor: theme.cardBorder }}
              >
                <div className="text-xs font-mono font-bold flex items-center gap-1.5" style={{ color: theme.primary }}>
                  <AlertTriangle className="w-4 h-4 text-amber-400" /> <span>Instant Proxy Exception Triage</span>
                </div>
                <div 
                  className="p-3 rounded-lg border text-xs text-amber-200"
                  style={{ backgroundColor: theme.bgSurface, borderColor: theme.cardBorder }}
                >
                  <div className="font-bold flex items-center justify-between">
                    <span>⚠️ Mismatch: STU105</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20">Review</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1">NFC tapped at Doorway, but NIR face confidence was 0.41.</p>
                </div>
                <p className="text-xs text-slate-300">
                  1-Click approval or rejection. Review snapshots auto-destroy in 12 hours if unreviewed.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STUDENT PORTAL MOOD BOARD */}
      {activeTab === 'STUDENT' && (
        <div className="space-y-6 animate-fade-in">
          <div 
            className="glass-panel p-6 rounded-2xl border"
            style={{
              backgroundColor: `${theme.bgSurface}ee`,
              borderColor: theme.primaryBorder
            }}
          >
            <div 
              className="flex items-center justify-between mb-4 pb-3 border-b"
              style={{ borderColor: theme.cardBorder }}
            >
              <div>
                <span 
                  className="text-xs font-mono font-bold px-2.5 py-1 rounded-full border"
                  style={{
                    backgroundColor: theme.primaryMuted,
                    color: theme.primary,
                    borderColor: theme.primaryBorder
                  }}
                >
                  INTERFACE MOOD BOARD 02
                </span>
                <h3 className="text-xl font-bold text-white mt-1">Student Attendance & Biometric Privacy Portal</h3>
              </div>
              <div className="text-xs font-mono text-slate-400">Target Role: Enrolled Students</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div 
                className="p-4 rounded-xl border space-y-3"
                style={{ backgroundColor: theme.bgBase, borderColor: theme.cardBorder }}
              >
                <div className="text-xs font-mono font-bold flex items-center gap-1.5" style={{ color: theme.primary }}>
                  <BarChart3 className="w-4 h-4" /> <span>Overall Attendance Rings</span>
                </div>
                <div className="flex items-center justify-center py-4">
                  <div 
                    className="w-28 h-28 rounded-full border-4 flex flex-col items-center justify-center shadow-lg"
                    style={{
                      borderColor: theme.primary,
                      backgroundColor: theme.bgSurface,
                      boxShadow: `0 0 20px ${theme.glow}`
                    }}
                  >
                    <span className="text-2xl font-black font-mono" style={{ color: theme.primary }}>94.2%</span>
                    <span className="text-[10px] text-slate-400">Good Standing</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 text-center">
                  Threshold target: ≥75% for final exam eligibility.
                </p>
              </div>

              <div 
                className="p-4 rounded-xl border space-y-3"
                style={{ backgroundColor: theme.bgBase, borderColor: theme.cardBorder }}
              >
                <div className="text-xs font-mono font-bold flex items-center gap-1.5" style={{ color: theme.primary }}>
                  <Clock className="w-4 h-4" /> <span>Session Dwell Breakdown</span>
                </div>
                <div 
                  className="p-3 rounded-lg space-y-2 text-xs"
                  style={{ backgroundColor: theme.bgSurface }}
                >
                  <div className="flex justify-between border-b pb-1" style={{ borderColor: theme.cardBorder }}>
                    <span className="text-slate-400">Doorway Tap:</span>
                    <span className="font-mono text-white">09:02 AM (NFC+NIR)</span>
                  </div>
                  <div className="flex justify-between border-b pb-1" style={{ borderColor: theme.cardBorder }}>
                    <span className="text-slate-400">Class Dwell Time:</span>
                    <span className="font-mono font-bold" style={{ color: theme.primary }}>47.5 mins</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Status Awarded:</span>
                    <span className="font-bold" style={{ color: theme.primary }}>Present (100%)</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300">
                  Transparent minute-by-minute verification timeline visible to students.
                </p>
              </div>

              <div 
                className="p-4 rounded-xl border space-y-3"
                style={{ backgroundColor: theme.bgBase, borderColor: theme.cardBorder }}
              >
                <div className="text-xs font-mono font-bold flex items-center gap-1.5" style={{ color: theme.primary }}>
                  <ShieldCheck className="w-4 h-4" /> <span>Privacy Status & Dispute Ledger</span>
                </div>
                <div 
                  className="p-3 rounded-lg border text-xs space-y-1.5"
                  style={{ backgroundColor: theme.bgSurface, borderColor: theme.cardBorder }}
                >
                  <div className="font-bold flex items-center gap-1" style={{ color: theme.primary }}>
                    <CheckCircle2 className="w-3.5 h-3.5" /> Biometrics: Volatile RAM Purged
                  </div>
                  <p className="text-[11px] text-slate-400">Zero facial footage is stored after class concludes.</p>
                </div>
                <p className="text-xs text-slate-300">
                  Students can submit instant 1-click dispute requests with faculty within 24 hours of lecture.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADMIN SYSTEM MOOD BOARD */}
      {activeTab === 'ADMIN' && (
        <div className="space-y-6 animate-fade-in">
          <div 
            className="glass-panel p-6 rounded-2xl border"
            style={{
              backgroundColor: `${theme.bgSurface}ee`,
              borderColor: theme.primaryBorder
            }}
          >
            <div 
              className="flex items-center justify-between mb-4 pb-3 border-b"
              style={{ borderColor: theme.cardBorder }}
            >
              <div>
                <span 
                  className="text-xs font-mono font-bold px-2.5 py-1 rounded-full border"
                  style={{
                    backgroundColor: theme.primaryMuted,
                    color: theme.primary,
                    borderColor: theme.primaryBorder
                  }}
                >
                  INTERFACE MOOD BOARD 03
                </span>
                <h3 className="text-xl font-bold text-white mt-1">Administrator Telemetry, Timetable & 12h Audit Hub</h3>
              </div>
              <div className="text-xs font-mono text-slate-400">Target Role: IT Administrators & Department Heads</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div 
                className="p-4 rounded-xl border space-y-3"
                style={{ backgroundColor: theme.bgBase, borderColor: theme.cardBorder }}
              >
                <div className="text-xs font-mono font-bold flex items-center gap-1.5" style={{ color: theme.primary }}>
                  <Zap className="w-4 h-4" /> <span>Micro-UPS & Power Telemetry</span>
                </div>
                <div 
                  className="p-3 rounded-lg border space-y-2 text-xs"
                  style={{ backgroundColor: theme.bgSurface, borderColor: theme.cardBorder }}
                >
                  <div className="flex justify-between">
                    <span className="text-slate-400">Power Source:</span>
                    <span className="font-bold" style={{ color: theme.primary }}>AC Mains (100% Charged)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Failover Latency:</span>
                    <span className="font-mono text-white">&lt;4ms Seamless</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Estimated Battery Run:</span>
                    <span className="font-mono text-white">4.8 Hours</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300">
                  Real-time edge hardware battery voltage, temperature, and charging telemetry.
                </p>
              </div>

              <div 
                className="p-4 rounded-xl border space-y-3"
                style={{ backgroundColor: theme.bgBase, borderColor: theme.cardBorder }}
              >
                <div className="text-xs font-mono font-bold flex items-center gap-1.5" style={{ color: theme.primary }}>
                  <Database className="w-4 h-4" /> <span>Offline SQLite WAL Sync</span>
                </div>
                <div 
                  className="p-3 rounded-lg border space-y-2 text-xs"
                  style={{ backgroundColor: theme.bgSurface, borderColor: theme.cardBorder }}
                >
                  <div className="flex justify-between">
                    <span className="text-slate-400">Storage Engine:</span>
                    <span className="font-mono text-white">SQLite WAL Mode</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Pending Sync Queue:</span>
                    <span className="font-mono font-bold" style={{ color: theme.primary }}>0 records (Synced)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Local Integrity:</span>
                    <span className="font-bold" style={{ color: theme.primary }}>100% Verified</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300">
                  Zero data loss during campus network disconnects with auto-flush on reconnection.
                </p>
              </div>

              <div 
                className="p-4 rounded-xl border space-y-3"
                style={{ backgroundColor: theme.bgBase, borderColor: theme.cardBorder }}
              >
                <div className="text-xs font-mono font-bold flex items-center gap-1.5" style={{ color: theme.primary }}>
                  <Lock className="w-4 h-4" /> <span>12-Hour Zero Retention Audit Trail</span>
                </div>
                <div 
                  className="p-3 rounded-lg border text-xs space-y-1 font-mono"
                  style={{ backgroundColor: theme.bgSurface, borderColor: theme.cardBorder }}
                >
                  <div className="text-[11px]" style={{ color: theme.primaryLight }}>[04:00:00 UTC] Auto-Purged 14 TTL Snapshots</div>
                  <div className="text-slate-400 text-[11px]">[08:00:00 UTC] RAM Buffer Wiped Clean</div>
                  <div className="text-[11px] font-bold" style={{ color: theme.primary }}>[12:00:00 UTC] Zero Biometric Retention Verified</div>
                </div>
                <p className="text-xs text-slate-300">
                  Cryptographic log records proving institutional compliance with student privacy regulations.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CAMERA & VIDEO HUB MOOD BOARD */}
      {activeTab === 'CAMERA' && (
        <div className="space-y-6 animate-fade-in">
          <div 
            className="glass-panel p-6 rounded-2xl border"
            style={{
              backgroundColor: `${theme.bgSurface}ee`,
              borderColor: theme.primaryBorder
            }}
          >
            <div 
              className="flex items-center justify-between mb-4 pb-3 border-b"
              style={{ borderColor: theme.cardBorder }}
            >
              <div>
                <span 
                  className="text-xs font-mono font-bold px-2.5 py-1 rounded-full border"
                  style={{
                    backgroundColor: theme.primaryMuted,
                    color: theme.primary,
                    borderColor: theme.primaryBorder
                  }}
                >
                  INTERFACE MOOD BOARD 04
                </span>
                <h3 className="text-xl font-bold text-white mt-1">AI Single-Camera Multi-Person Vision & Heatmap Hub</h3>
              </div>
              <div className="text-xs font-mono text-slate-400">Target Role: AI Vision Engine & Video Pipeline</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div 
                className="p-4 rounded-xl border space-y-3"
                style={{ backgroundColor: theme.bgBase, borderColor: theme.cardBorder }}
              >
                <div className="text-xs font-mono font-bold flex items-center gap-1.5" style={{ color: theme.primary }}>
                  <Eye className="w-4 h-4" /> <span>Multi-Face Reticle HUD</span>
                </div>
                <div 
                  className="p-3 rounded-lg border text-xs space-y-1.5"
                  style={{ backgroundColor: theme.bgSurface, borderColor: theme.cardBorder }}
                >
                  <div className="font-mono font-bold flex items-center justify-between" style={{ color: theme.primary }}>
                    <span>BOX #1: STU101</span>
                    <span>98.4% Confidence</span>
                  </div>
                  <div className="font-mono flex items-center justify-between text-slate-200">
                    <span>BOX #2: STU102</span>
                    <span>94.1% Confidence</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300">
                  Overlaying neon lime bounding boxes and tracking IDs across 30+ students simultaneously.
                </p>
              </div>

              <div 
                className="p-4 rounded-xl border space-y-3"
                style={{ backgroundColor: theme.bgBase, borderColor: theme.cardBorder }}
              >
                <div className="text-xs font-mono font-bold flex items-center gap-1.5" style={{ color: theme.primary }}>
                  <Activity className="w-4 h-4" /> <span>Presence Heatmap Rendering</span>
                </div>
                <div 
                  className="p-3 rounded-lg border text-center"
                  style={{ backgroundColor: theme.bgSurface, borderColor: theme.cardBorder }}
                >
                  <div 
                    className="h-16 rounded flex items-center justify-center text-[11px] font-mono text-white border"
                    style={{
                      background: `linear-gradient(90deg, ${theme.bgBase}, ${theme.primaryMuted}, ${theme.bgBase})`,
                      borderColor: theme.primaryBorder
                    }}
                  >
                    Live Heatmap Density: 91.8%
                  </div>
                </div>
                <p className="text-xs text-slate-300">
                  Spatial color gradients pinpoint high-engagement lecture rows and vacant seat clusters.
                </p>
              </div>

              <div 
                className="p-4 rounded-xl border space-y-3"
                style={{ backgroundColor: theme.bgBase, borderColor: theme.cardBorder }}
              >
                <div className="text-xs font-mono font-bold flex items-center gap-1.5" style={{ color: theme.primary }}>
                  <Radio className="w-4 h-4" /> <span>Doorway NFC Scanner Integration</span>
                </div>
                <div 
                  className="p-3 rounded-lg border text-xs space-y-1"
                  style={{ backgroundColor: theme.bgSurface, borderColor: theme.cardBorder }}
                >
                  <div className="font-mono" style={{ color: theme.primary }}>13.56MHz RFID Reader: Active</div>
                  <div className="text-slate-300 font-mono">NIR 850nm Strobe: Synced</div>
                </div>
                <p className="text-xs text-slate-300">
                  Coordinates doorway check-in events with continuous in-seat camera tracking.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE PHONE NODE MOOD BOARD */}
      {activeTab === 'MOBILE' && (
        <div className="space-y-6 animate-fade-in">
          <div 
            className="glass-panel p-6 rounded-2xl border"
            style={{
              backgroundColor: `${theme.bgSurface}ee`,
              borderColor: theme.primaryBorder
            }}
          >
            <div 
              className="flex items-center justify-between mb-4 pb-3 border-b"
              style={{ borderColor: theme.cardBorder }}
            >
              <div>
                <span 
                  className="text-xs font-mono font-bold px-2.5 py-1 rounded-full border"
                  style={{
                    backgroundColor: theme.primaryMuted,
                    color: theme.primary,
                    borderColor: theme.primaryBorder
                  }}
                >
                  INTERFACE MOOD BOARD 05
                </span>
                <h3 className="text-xl font-bold text-white mt-1">Mobile Wireless Camera & Portable Doorway Station</h3>
              </div>
              <div className="text-xs font-mono text-slate-400">Target Role: Smartphone Nodes & Portable Classrooms</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div 
                className="p-4 rounded-xl border space-y-3"
                style={{ backgroundColor: theme.bgBase, borderColor: theme.cardBorder }}
              >
                <div className="text-xs font-mono font-bold flex items-center gap-1.5" style={{ color: theme.primary }}>
                  <Wifi className="w-4 h-4" /> <span>Low-Latency WebRTC Stream</span>
                </div>
                <div 
                  className="p-3 rounded-lg border text-xs space-y-1 text-center font-mono"
                  style={{ backgroundColor: theme.bgSurface, borderColor: theme.cardBorder }}
                >
                  <div className="font-bold" style={{ color: theme.primary }}>1080p @ 30 FPS</div>
                  <div className="text-slate-400">Latency: ~85ms Over Local Wi-Fi</div>
                </div>
                <p className="text-xs text-slate-300">
                  Enables any iOS or Android phone to act as the primary classroom AI vision sensor.
                </p>
              </div>

              <div 
                className="p-4 rounded-xl border space-y-3"
                style={{ backgroundColor: theme.bgBase, borderColor: theme.cardBorder }}
              >
                <div className="text-xs font-mono font-bold flex items-center gap-1.5" style={{ color: theme.primary }}>
                  <Radio className="w-4 h-4" /> <span>Tap-to-Checkin NFC Gateway</span>
                </div>
                <div 
                  className="p-3 rounded-lg border text-xs space-y-1 text-center"
                  style={{ backgroundColor: theme.bgSurface, borderColor: theme.cardBorder }}
                >
                  <div className="font-bold" style={{ color: theme.primary }}>Built-in Phone NFC Reader</div>
                  <div className="text-slate-300 text-[11px]">Instant Student ID badge tap at door</div>
                </div>
                <p className="text-xs text-slate-300">
                  Use phone NFC hardware directly for pop-up or temporary examination halls.
                </p>
              </div>

              <div 
                className="p-4 rounded-xl border space-y-3"
                style={{ backgroundColor: theme.bgBase, borderColor: theme.cardBorder }}
              >
                <div className="text-xs font-mono font-bold flex items-center gap-1.5" style={{ color: theme.primary }}>
                  <Zap className="w-4 h-4" /> <span>Edge Battery Optimization</span>
                </div>
                <div 
                  className="p-3 rounded-lg border text-xs space-y-1 text-center font-mono"
                  style={{ backgroundColor: theme.bgSurface, borderColor: theme.cardBorder }}
                >
                  <div className="font-bold" style={{ color: theme.primary }}>Thermal Throttle: Active</div>
                  <div className="text-slate-400">Average Battery Consumption: ~12%/hr</div>
                </div>
                <p className="text-xs text-slate-300">
                  Lightweight client inference offloads tensor calculations to local edge server.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EXTERNAL HARDWARE DEVICES MOOD BOARD */}
      {activeTab === 'HARDWARE' && (
        <div className="space-y-6 animate-fade-in">
          <div 
            className="glass-panel p-6 rounded-2xl border shadow-2xl"
            style={{
              backgroundColor: `${theme.bgSurface}ee`,
              borderColor: theme.primaryBorder
            }}
          >
            <div 
              className="flex items-center justify-between mb-4 pb-3 border-b"
              style={{ borderColor: theme.cardBorder }}
            >
              <div>
                <span 
                  className="text-xs font-mono font-black text-slate-950 px-3 py-1 rounded-full shadow-md"
                  style={{ backgroundColor: theme.primary }}
                >
                  EXTERNAL HARDWARE DEVICES MOOD BOARD
                </span>
                <h3 className="text-xl font-bold text-white mt-2">Physical Hardware Modules, Sensor Rig & Power Architecture</h3>
              </div>
              <div className="text-xs font-mono font-bold" style={{ color: theme.primary }}>
                Institutional Deployment Specification
              </div>
            </div>

            {/* Hardware Module Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              
              {/* Device 1 */}
              <div 
                className="p-4 rounded-xl border transition-all hover:scale-105 space-y-3"
                style={{ backgroundColor: theme.bgBase, borderColor: theme.cardBorder }}
              >
                <div 
                  className="h-32 rounded-lg border flex flex-col items-center justify-center p-3 text-center relative overflow-hidden"
                  style={{ backgroundColor: theme.bgSurface, borderColor: theme.cardBorder }}
                >
                  <Radio className="w-10 h-10 mb-2" style={{ color: theme.primary }} />
                  <span className="text-xs font-bold text-white">Doorway 2FA Scanner</span>
                  <span className="text-[10px] font-mono font-bold" style={{ color: theme.primary }}>13.56MHz + NIR 850nm</span>
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: theme.primary }} />
                </div>
                <div className="text-xs font-bold text-white">1. Doorway Dual-Factor Reader</div>
                <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
                  <li>ISO14443A NFC/RFID transceiver</li>
                  <li>850nm Near-Infrared sensor array</li>
                  <li>Sub-300ms vector matching</li>
                  <li>Anti-spoofing periocular validation</li>
                </ul>
              </div>

              {/* Device 2 */}
              <div 
                className="p-4 rounded-xl border transition-all hover:scale-105 space-y-3"
                style={{ backgroundColor: theme.bgBase, borderColor: theme.cardBorder }}
              >
                <div 
                  className="h-32 rounded-lg border flex flex-col items-center justify-center p-3 text-center relative overflow-hidden"
                  style={{ backgroundColor: theme.bgSurface, borderColor: theme.cardBorder }}
                >
                  <Camera className="w-10 h-10 mb-2" style={{ color: theme.primary }} />
                  <span className="text-xs font-bold text-white">Overhead AI Camera</span>
                  <span className="text-[10px] font-mono font-bold" style={{ color: theme.primary }}>4K UHD / 120° FOV</span>
                </div>
                <div className="text-xs font-bold text-white">2. Single-Camera Vision Node</div>
                <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
                  <li>120-degree wide-angle lens</li>
                  <li>Low-light NIR sensitivity</li>
                  <li>Ceiling mount center of room</li>
                  <li>Full 40+ student seat coverage</li>
                </ul>
              </div>

              {/* Device 3 */}
              <div 
                className="p-4 rounded-xl border transition-all hover:scale-105 space-y-3"
                style={{ backgroundColor: theme.bgBase, borderColor: theme.cardBorder }}
              >
                <div 
                  className="h-32 rounded-lg border flex flex-col items-center justify-center p-3 text-center relative overflow-hidden"
                  style={{ backgroundColor: theme.bgSurface, borderColor: theme.cardBorder }}
                >
                  <Cpu className="w-10 h-10 mb-2" style={{ color: theme.primary }} />
                  <span className="text-xs font-bold text-white">Edge AI Gateway</span>
                  <span className="text-[10px] font-mono font-bold" style={{ color: theme.primary }}>NPU Tensor Core + Micro-UPS</span>
                </div>
                <div className="text-xs font-bold text-white">3. Edge AI Processing Module</div>
                <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
                  <li>Rugged aluminum fanless chassis</li>
                  <li>Integrated Micro-UPS battery pack</li>
                  <li>Volatile RAM frame shredder</li>
                  <li>Zero persistent biometric storage</li>
                </ul>
              </div>

              {/* Device 4 */}
              <div 
                className="p-4 rounded-xl border transition-all hover:scale-105 space-y-3"
                style={{ backgroundColor: theme.bgBase, borderColor: theme.cardBorder }}
              >
                <div 
                  className="h-32 rounded-lg border flex flex-col items-center justify-center p-3 text-center relative overflow-hidden"
                  style={{ backgroundColor: theme.bgSurface, borderColor: theme.cardBorder }}
                >
                  <Database className="w-10 h-10 mb-2" style={{ color: theme.primary }} />
                  <span className="text-xs font-bold text-white">SQLite WAL Storage</span>
                  <span className="text-[10px] font-mono font-bold" style={{ color: theme.primary }}>Local Sync Buffer</span>
                </div>
                <div className="text-xs font-bold text-white">4. Local Offline Sync Buffer</div>
                <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
                  <li>High-speed Write-Ahead Logging</li>
                  <li>Autonomous offline buffering</li>
                  <li>Automatic cloud sync on reconnect</li>
                  <li>Zero transaction drop guarantee</li>
                </ul>
              </div>

            </div>

            {/* Hardware Interconnect Architecture */}
            <div 
              className="mt-6 p-4 rounded-xl border"
              style={{ backgroundColor: theme.bgBase, borderColor: theme.cardBorder }}
            >
              <div className="text-xs font-mono font-bold mb-2 flex items-center gap-2" style={{ color: theme.primary }}>
                <Zap className="w-4 h-4" /> <span>HARDWARE INTERCONNECT & RESILIENCE SPECIFICATION</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                The doorway 2FA scanner transmits badge signals over RS-485 / Ethernet PoE to the Edge AI Processor. The overhead AI camera feeds continuous RTSP video frames into volatile RAM buffers. If main power drops, the Micro-UPS instantly powers both camera and processor for up to 4.8 hours while SQLite WAL records transactions locally.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
