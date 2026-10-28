import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  Eye, 
  Radio, 
  ShieldAlert, 
  Sparkles, 
  UserCheck, 
  Wifi, 
  Layers, 
  Maximize2, 
  Smartphone, 
  Play, 
  Users, 
  AlertTriangle,
  Flame,
  CheckCircle2,
  XCircle,
  Video,
  FileVideo,
  Lock
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import IconBadge from './common/IconBadge';

export default function CameraMonitoringStation({ 
  students, 
  session, 
  onTapNfc, 
  onTrackDwell, 
  onSwitchToMobile 
}) {
  const { theme } = useTheme();
  const [cameraSource, setCameraSource] = useState('PROPOSAL_VIDEO'); // 'PROPOSAL_VIDEO', 'WEBCAM', 'PHONE'
  const [isNirFilterActive, setIsNirFilterActive] = useState(true);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [virtualClassActive, setVirtualClassActive] = useState(true);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Switch Video Source
  const handleSourceChange = async (source) => {
    setCameraSource(source);
    if (source === 'PROPOSAL_VIDEO') {
      if (videoRef.current) {
        videoRef.current.srcObject = null;
        videoRef.current.src = '/assets/proposal_video.mp4';
        videoRef.current.play().catch(console.warn);
        setIsWebcamActive(false);
      }
    } else if (source === 'WEBCAM') {
      startWebcam();
    } else if (source === 'PHONE') {
      onSwitchToMobile();
    }
  };

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
        audio: false
      });
      if (videoRef.current) {
        videoRef.current.src = '';
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(console.warn);
        setIsWebcamActive(true);
      }
    } catch (err) {
      console.warn('Webcam permission error:', err.message);
      handleSourceChange('PROPOSAL_VIDEO');
    }
  };

  useEffect(() => {
    // Default to proposal video stream
    if (videoRef.current && cameraSource === 'PROPOSAL_VIDEO') {
      videoRef.current.src = '/assets/proposal_video.mp4';
      videoRef.current.play().catch(console.warn);
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(t => t.stop());
      }
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // Canvas Tracking Loop with Theme Colors
  useEffect(() => {
    let tickCount = 0;

    const renderLoop = () => {
      tickCount++;
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;

        ctx.clearRect(0, 0, w, h);

        if (isNirFilterActive) {
          ctx.fillStyle = `${theme.primary}0a`;
          ctx.fillRect(0, 0, w, h);
        }

        // Reticle
        const faceX = w * 0.32;
        const faceY = h * 0.22;
        const faceW = w * 0.36;
        const faceH = h * 0.52;

        ctx.strokeStyle = theme.primary;
        ctx.lineWidth = 2;
        ctx.strokeRect(faceX, faceY, faceW, faceH);

        // Corner Reticle Accents
        const cLen = 14;
        ctx.fillStyle = theme.primary;
        ctx.fillRect(faceX - 2, faceY - 2, cLen, 3);
        ctx.fillRect(faceX - 2, faceY - 2, 3, cLen);
        ctx.fillRect(faceX + faceW - cLen + 2, faceY - 2, cLen, 3);
        ctx.fillRect(faceX + faceW - 1, faceY - 2, 3, cLen);
        ctx.fillRect(faceX - 2, faceY + faceH - 1, cLen, 3);
        ctx.fillRect(faceX - 2, faceY + faceH - cLen + 2, 3, cLen);
        ctx.fillRect(faceX + faceW - cLen + 2, faceY + faceH - 1, cLen, 3);
        ctx.fillRect(faceX + faceW - 1, faceY + faceH - cLen + 2, 3, cLen);

        // Periocular points
        const eyeY = faceY + faceH * 0.35;
        ctx.fillStyle = theme.primary;
        ctx.beginPath();
        ctx.arc(faceX + faceW * 0.3, eyeY, 4, 0, Math.PI * 2);
        ctx.arc(faceX + faceW * 0.7, eyeY, 4, 0, Math.PI * 2);
        ctx.fill();

        // Target Tag
        const student101 = students.find(s => s.id === 'STU101') || students[0];
        const liveDwell = student101?.dwell_minutes || 0;

        ctx.fillStyle = 'rgba(7, 16, 10, 0.9)';
        ctx.fillRect(faceX, faceY - 26, faceW, 22);
        ctx.fillStyle = theme.primary;
        ctx.font = 'bold 11px Inter, monospace';
        ctx.fillText(`ID: ${student101?.name || 'Alex Mercer'} (99.2% NIR)`, faceX + 6, faceY - 11);

        ctx.fillStyle = liveDwell >= 45 ? `${theme.primary}f0` : 'rgba(245, 158, 11, 0.9)';
        ctx.fillRect(faceX, faceY + faceH + 4, faceW, 20);
        ctx.fillStyle = '#07100A';
        ctx.font = 'bold 10px Inter, monospace';
        ctx.fillText(`Dwell: ${liveDwell}m / 45m ${liveDwell >= 45 ? '(PRESENT)' : '(TRACKING)'}`, faceX + 6, faceY + faceH + 18);
      }

      if (tickCount % 90 === 0 && session?.status === 'ACTIVE') {
        const detectedIds = ['STU101'];
        if (virtualClassActive) {
          detectedIds.push('STU102', 'STU103', 'STU104', 'STU106');
        }
        onTrackDwell(detectedIds, 1.5, isWebcamActive);
      }

      animationFrameRef.current = requestAnimationFrame(renderLoop);
    };

    animationFrameRef.current = requestAnimationFrame(renderLoop);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [students, session, isNirFilterActive, virtualClassActive, isWebcamActive, theme]);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      
      {/* 1. Header with Camera View Controls */}
      <div 
        className="glass-panel p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 border"
        style={{
          backgroundColor: `${theme.bgSurface}ee`,
          borderColor: theme.primaryBorder,
          boxShadow: `0 12px 36px rgba(0,0,0,0.4), 0 0 20px ${theme.glow}`
        }}
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span 
              className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border flex items-center gap-1.5"
              style={{
                backgroundColor: theme.primaryMuted,
                color: theme.primary,
                borderColor: theme.primaryBorder
              }}
            >
              <Radio className="w-3 h-3 animate-pulse" style={{ color: theme.primary }} /> SINGLE AI CAMERA HUB
            </span>
            <span className="text-xs text-slate-400">Classroom Live Monitoring & Video Stream Ingest</span>
          </div>
          <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            <IconBadge icon={Camera} size="sm" variant="primary" />
            <span>AI Continuous Camera Monitoring & Door NFC Gateway</span>
          </h2>
        </div>

        {/* Camera Source Selector */}
        <div className="flex flex-wrap items-center gap-2">
          
          <select
            value={cameraSource}
            onChange={(e) => handleSourceChange(e.target.value)}
            className="text-xs rounded-xl px-3 py-1.5 focus:outline-none font-mono font-bold border"
            style={{
              backgroundColor: theme.bgBase,
              borderColor: theme.primaryBorder,
              color: theme.primary
            }}
          >
            <option value="PROPOSAL_VIDEO" className="bg-slate-900 text-slate-200">🎬 Source: Proposal Classroom Video</option>
            <option value="WEBCAM" className="bg-slate-900 text-slate-200">💻 Source: Laptop Webcam (Live)</option>
            <option value="PHONE" className="bg-slate-900 text-slate-200">📱 Source: Connected Mobile Phone</option>
          </select>

          <button
            onClick={() => setIsNirFilterActive(!isNirFilterActive)}
            className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 border transition-all"
            style={{
              backgroundColor: isNirFilterActive ? theme.primaryMuted : theme.bgBase,
              borderColor: isNirFilterActive ? theme.primaryBorder : theme.cardBorder,
              color: isNirFilterActive ? theme.primary : '#94a3b8'
            }}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>NIR 850nm Filter {isNirFilterActive ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={() => setVirtualClassActive(!virtualClassActive)}
            className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 border transition-all"
            style={{
              backgroundColor: virtualClassActive ? theme.primaryMuted : theme.bgBase,
              borderColor: virtualClassActive ? theme.primaryBorder : theme.cardBorder,
              color: virtualClassActive ? theme.primary : '#94a3b8'
            }}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Virtual Sim: {virtualClassActive ? 'Classroom (5+)' : 'Solo Live'}</span>
          </button>
        </div>
      </div>

      {/* 2. Main Live Camera Station */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Live Camera Screen */}
        <div 
          className="lg:col-span-2 glass-panel rounded-2xl p-4 border flex flex-col justify-between relative overflow-hidden"
          style={{
            backgroundColor: theme.bgBase,
            borderColor: theme.primaryBorder
          }}
        >
          <div 
            className="flex items-center justify-between pb-3 border-b text-xs font-mono"
            style={{ borderColor: theme.cardBorder }}
          >
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 font-bold" style={{ color: theme.primary }}>
                <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: theme.primary }} />
                CAM-1: CEILING MOUNT (850nm NIR)
              </span>
              <span className="text-slate-400">30.0 FPS • ISO/NIR-Auto</span>
            </div>
            <div className="font-bold" style={{ color: theme.primary }}>
              Vision Angle: <strong className="text-white">45.0° Downward</strong>
            </div>
          </div>

          {/* Video Container & Canvas HUD */}
          <div 
            className="relative w-full aspect-video bg-black rounded-xl overflow-hidden my-3 flex items-center justify-center border"
            style={{ borderColor: theme.cardBorder }}
          >
            <video 
              ref={videoRef}
              src="/assets/proposal_video.mp4"
              playsInline
              muted
              autoPlay
              loop
              className={`absolute inset-0 w-full h-full object-cover ${
                isNirFilterActive ? 'filter grayscale contrast-125 brightness-90 hue-rotate-180' : ''
              }`}
            />

            <canvas 
              ref={canvasRef}
              width={640}
              height={360}
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
            />

            <div 
              className="absolute bottom-2 left-2 z-20 px-2 py-1 rounded text-[10px] font-mono border flex items-center gap-1.5 backdrop-blur-md"
              style={{
                backgroundColor: `${theme.bgBase}ee`,
                borderColor: theme.primaryBorder,
                color: theme.primary
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.primary }} />
              12H-TTL Ephemeral Processing (0 Bytes Retained)
            </div>

            <div 
              className="absolute inset-0 h-12 animate-scanline pointer-events-none"
              style={{
                background: `linear-gradient(to bottom, transparent, ${theme.glow}, transparent)`
              }}
            />
          </div>

          <div 
            className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400 pt-2 border-t"
            style={{ borderColor: theme.cardBorder }}
          >
            <div className="flex items-center gap-4">
              <span>Face Confidence: <strong style={{ color: theme.primary }}>99.4%</strong></span>
              <span>Head Occlusion: <strong style={{ color: theme.primaryLight }}>0.0% (NIR Active)</strong></span>
            </div>
            <div className="text-slate-300">
              Session Dwell Elapsed: <strong style={{ color: theme.primary }}>{session?.elapsed_minutes || 0} mins</strong> / 45m
            </div>
          </div>

        </div>

        {/* Right 1 Col: Interactive Doorway NFC Gateway Simulator */}
        <div 
          className="glass-panel rounded-2xl p-5 border flex flex-col justify-between"
          style={{
            backgroundColor: `${theme.bgSurface}ee`,
            borderColor: theme.cardBorder
          }}
        >
          <div>
            <div 
              className="flex items-center justify-between pb-3 border-b"
              style={{ borderColor: theme.cardBorder }}
            >
              <div className="flex items-center gap-2">
                <IconBadge icon={Wifi} size="xs" variant="primary" />
                <h3 className="text-sm font-bold text-white">Doorway NFC Scanner</h3>
              </div>
              <span 
                className="text-[10px] font-mono px-2 py-0.5 rounded border font-bold"
                style={{
                  backgroundColor: theme.primaryMuted,
                  color: theme.primary,
                  borderColor: theme.primaryBorder
                }}
              >
                12ms Gateway
              </span>
            </div>

            <p className="text-xs text-slate-400 mt-2">
              Test two-factor door check-in, buddy-punch proxy attempts, and guest student alerts.
            </p>

            {/* Quick NFC Student Buttons */}
            <div className="mt-4 space-y-2">
              <label className="text-[11px] font-mono text-slate-400 uppercase block font-semibold">
                1. Tap Valid Enrolled Student Pass:
              </label>

              <div className="grid grid-cols-2 gap-2">
                {students.slice(0, 4).map((s) => (
                  <button
                    key={s.id}
                    onClick={() => onTapNfc({ studentId: s.id, nfcUid: s.nfc_uid, faceConfidence: 0.98 })}
                    className="p-2.5 rounded-xl border text-left transition-all hover:scale-105"
                    style={{
                      backgroundColor: theme.bgBase,
                      borderColor: theme.cardBorder
                    }}
                  >
                    <div className="text-xs font-semibold text-slate-200">
                      {s.name.split(' ')[0]} ({s.roll_no.split('-')[2]})
                    </div>
                    <div className="text-[10px] font-mono font-bold" style={{ color: theme.primary }}>{s.nfc_uid}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Edge Case Testing Box */}
            <div 
              className="mt-5 p-3.5 rounded-xl border space-y-3"
              style={{
                backgroundColor: theme.bgBase,
                borderColor: theme.cardBorder
              }}
            >
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Test Security Edge Cases:</span>
              </div>

              <div>
                <button
                  onClick={() => onTapNfc({ 
                    studentId: 'STU105', 
                    nfcUid: 'NFC-3C88D2', 
                    isProxySimulated: true, 
                    faceConfidence: 0.38 
                  })}
                  className="w-full py-2 px-3 rounded-lg bg-amber-950/40 text-amber-300 border border-amber-500/40 hover:bg-amber-900/40 text-xs font-semibold flex items-center justify-between transition-all"
                >
                  <span>Simulate Buddy-Punch Proxy</span>
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                </button>
                <p className="text-[10px] text-slate-500 mt-1">
                  NFC tapped at door, but camera face does not match (creates instant Exception).
                </p>
              </div>

              <div>
                <button
                  onClick={() => onTapNfc({ 
                    studentId: 'STU202', 
                    nfcUid: 'NFC-99GUEST' 
                  })}
                  className="w-full py-2 px-3 rounded-lg bg-rose-950/40 text-rose-300 border border-rose-500/40 hover:bg-rose-900/40 text-xs font-semibold flex items-center justify-between transition-all"
                >
                  <span>Simulate Unregistered Guest (202)</span>
                  <XCircle className="w-3.5 h-3.5 text-rose-400" />
                </button>
                <p className="text-[10px] text-slate-500 mt-1">
                  Student 202 enters CS401 (101-110 class). Flags faculty without disrupting room.
                </p>
              </div>

            </div>
          </div>

          {/* Faculty Key Card */}
          <div 
            className="mt-4 pt-3 border-t"
            style={{ borderColor: theme.cardBorder }}
          >
            <button
              onClick={() => onTapNfc({ isFaculty: true, studentId: 'FAC001', nfcUid: 'NFC-FAC-9901' })}
              className="w-full py-2.5 rounded-xl text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-105"
              style={{
                backgroundColor: theme.primary,
                boxShadow: `0 0 16px ${theme.glow}`
              }}
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>Tap Faculty NFC Session Key</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
