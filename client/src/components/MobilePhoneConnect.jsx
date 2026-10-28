import React, { useState, useEffect, useRef } from 'react';
import { 
  Smartphone, 
  Camera, 
  QrCode, 
  Wifi, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Send,
  Eye
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useTheme } from '../context/ThemeContext';
import IconBadge from './common/IconBadge';

export default function MobilePhoneConnect({ students, onTapNfc, onTrackDwell }) {
  const { theme } = useTheme();
  const [mobileUrl, setMobileUrl] = useState('');
  const [isStreamingPhone, setIsStreamingPhone] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(students[0]?.id || 'STU101');
  const [tapFeedback, setTapFeedback] = useState(null);

  const phoneVideoRef = useRef(null);

  useEffect(() => {
    // Generate clean network URL for phone scanning
    const host = window.location.hostname;
    const port = window.location.port ? `:${window.location.port}` : '';
    setMobileUrl(`${window.location.protocol}//${host}${port}`);
  }, []);

  const startPhoneCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      if (phoneVideoRef.current) {
        phoneVideoRef.current.srcObject = stream;
        phoneVideoRef.current.play();
        setIsStreamingPhone(true);
      }
    } catch (e) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (phoneVideoRef.current) {
          phoneVideoRef.current.srcObject = stream;
          phoneVideoRef.current.play();
          setIsStreamingPhone(true);
        }
      } catch (err) {
        alert('Could not open camera on this device: ' + err.message);
      }
    }
  };

  const handleMobileNfcTap = async () => {
    const student = students.find(s => s.id === selectedStudent) || students[0];
    const res = await onTapNfc({
      studentId: student.id,
      nfcUid: student.nfc_uid,
      faceConfidence: 0.97
    });
    setTapFeedback(`NFC Verified: ${student.name} tapped at doorway!`);
    setTimeout(() => setTapFeedback(null), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fade-in">
      
      {/* 1. QR Code Connect Card */}
      <div 
        className="glass-panel p-6 rounded-2xl border relative overflow-hidden"
        style={{
          backgroundColor: `${theme.bgSurface}ee`,
          borderColor: theme.primaryBorder,
          boxShadow: `0 12px 36px rgba(0,0,0,0.4), 0 0 24px ${theme.glow}`
        }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div 
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border"
              style={{
                backgroundColor: theme.primaryMuted,
                color: theme.primary,
                borderColor: theme.primaryBorder
              }}
            >
              <Smartphone className="w-3.5 h-3.5" /> Mobile Companion & Single AI Vision Node
            </div>
            
            <h2 className="text-2xl font-black text-white tracking-tight flex items-center justify-center md:justify-start gap-2">
              <IconBadge icon={Smartphone} size="sm" variant="primary" />
              <span>Connect Your Mobile Phone to the Classroom AI</span>
            </h2>
            <p className="text-xs text-slate-400 max-w-md">
              Scan this QR code with your phone camera on the same Wi-Fi network to use your phone as a mobile NFC pass or as a wireless camera node.
            </p>
            <div className="text-xs font-mono pt-1 font-bold" style={{ color: theme.primary }}>
              Direct URL: <span className="underline">{mobileUrl}</span>
            </div>
          </div>

          <div 
            className="p-4 rounded-2xl border flex flex-col items-center justify-center shadow-2xl transition-transform hover:scale-105"
            style={{
              backgroundColor: theme.bgBase,
              borderColor: theme.primaryBorder
            }}
          >
            <QRCodeSVG 
              value={mobileUrl || 'http://localhost:5173'}
              size={135}
              fgColor={theme.primary}
              bgColor="transparent"
            />
            <span className="text-[10px] font-mono text-slate-400 mt-2 font-semibold">Scan with Phone Camera</span>
          </div>
        </div>
      </div>

      {/* 2. Mobile Simulator & Phone Camera Streamer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Phone Camera Streamer */}
        <div 
          className="glass-panel p-5 rounded-2xl border flex flex-col justify-between"
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
                <IconBadge icon={Camera} size="xs" variant="primary" />
                <h3 className="text-sm font-bold text-white">Mobile Camera Vision Feed</h3>
              </div>
              <span 
                className="text-[10px] font-mono px-2 py-0.5 rounded border font-bold"
                style={{
                  backgroundColor: theme.primaryMuted,
                  color: theme.primary,
                  borderColor: theme.primaryBorder
                }}
              >
                850nm NIR Mode
              </span>
            </div>

            <p className="text-xs text-slate-400 mt-2">
              Turn this device or your connected phone into an active classroom vision sensor.
            </p>

            {/* Video Box */}
            <div 
              className="relative aspect-video rounded-xl overflow-hidden my-3 border flex items-center justify-center"
              style={{
                backgroundColor: theme.bgBase,
                borderColor: theme.cardBorder
              }}
            >
              <video 
                ref={phoneVideoRef}
                playsInline
                muted
                autoPlay
                className="w-full h-full object-cover filter grayscale contrast-150"
              />
              {!isStreamingPhone && (
                <div className="text-center p-4">
                  <Eye className="w-8 h-8 mx-auto mb-2 opacity-60" style={{ color: theme.primary }} />
                  <div className="text-xs text-slate-400 font-mono">Mobile Camera Stream Idle</div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={startPhoneCamera}
            className="w-full py-2.5 rounded-xl text-slate-950 font-black text-xs shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105"
            style={{
              backgroundColor: theme.primary,
              boxShadow: `0 0 16px ${theme.glow}`
            }}
          >
            <Camera className="w-4 h-4" />
            <span>{isStreamingPhone ? 'Camera Feed Active' : 'Start Device / Phone Camera'}</span>
          </button>
        </div>

        {/* Mobile NFC Smart Tap Simulator */}
        <div 
          className="glass-panel p-5 rounded-2xl border flex flex-col justify-between"
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
                <h3 className="text-sm font-bold text-white">Mobile Phone NFC Wallet Pass</h3>
              </div>
              <span className="text-[10px] font-mono font-bold" style={{ color: theme.primary }}>ISO 14443A</span>
            </div>

            <p className="text-xs text-slate-400 mt-2">
              Select a student to simulate tapping their phone's Apple Wallet / Google Wallet NFC pass at the classroom door.
            </p>

            <div className="mt-4 space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1 font-mono">Select Student Pass:</label>
                <select
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  className="w-full text-xs rounded-xl p-2.5 focus:outline-none font-mono font-bold border"
                  style={{
                    backgroundColor: theme.bgBase,
                    borderColor: theme.primaryBorder,
                    color: theme.primary
                  }}
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id} className="bg-slate-900 text-slate-200">
                      {s.name} ({s.roll_no}) - {s.nfc_uid}
                    </option>
                  ))}
                </select>
              </div>

              {tapFeedback && (
                <div 
                  className="p-3 rounded-xl border text-xs font-bold flex items-center gap-2 animate-bounce"
                  style={{
                    backgroundColor: theme.primaryMuted,
                    borderColor: theme.primaryBorder,
                    color: theme.primary
                  }}
                >
                  <CheckCircle2 className="w-4 h-4" style={{ color: theme.primary }} />
                  <span>{tapFeedback}</span>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleMobileNfcTap}
            className="w-full py-3 rounded-xl text-slate-950 font-black text-xs shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-105 mt-4"
            style={{
              backgroundColor: theme.primary,
              boxShadow: `0 0 16px ${theme.glow}`
            }}
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>Tap Phone NFC at Classroom Doorway</span>
          </button>
        </div>

      </div>

    </div>
  );
}
