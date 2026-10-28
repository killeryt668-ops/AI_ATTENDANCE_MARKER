import React from 'react';
import { 
  User, 
  Wifi, 
  ShieldCheck, 
  QrCode, 
  CheckCircle2, 
  Award, 
  ChevronDown, 
  Lock, 
  FileCheck 
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import IconBadge from './common/IconBadge';

export default function ProfileView({ 
  currentStudent, 
  students, 
  onSelectStudent,
  currentRole 
}) {
  const student = currentStudent || students[0] || {
    id: 'STU101',
    name: 'Alex Mercer',
    roll_no: '2026-CS-01',
    class_id: 'CS401',
    nfc_uid: 'NFC-7A39B1',
    current_attendance_pct: 95.8
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16 animate-fade-in">
      
      {/* 1. Header with Student Profile Switcher */}
      <div className="glass-panel p-5 rounded-3xl border border-blue-500/25 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30">
            DIGITAL CREDENTIAL
          </span>
          <h2 className="text-xl font-black text-white mt-1 flex items-center gap-2">
            <IconBadge icon={User} size="xs" variant="blue" />
            <span>{currentRole === 'FACULTY' ? 'Faculty Profile & Digital Key' : 'Student Profile & Digital ID Pass'}</span>
          </h2>
        </div>

        {/* Profile Switcher */}
        {currentRole !== 'FACULTY' && (
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-400 font-medium">Switch Profile:</label>
            <div className="relative">
              <select
                value={student.id}
                onChange={(e) => onSelectStudent(e.target.value)}
                className="text-xs rounded-xl px-3 py-2 pr-8 bg-[#060913] border border-blue-500/30 text-white font-mono font-bold appearance-none focus:outline-none focus:border-blue-400"
              >
                {students.map((s) => (
                  <option key={s.id} value={s.id} className="bg-slate-900 text-slate-200">
                    {s.name} ({s.roll_no})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-blue-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>
        )}
      </div>

      {/* 2. Holographic Digital ID Card */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        
        {/* Pass Card */}
        <div className="md:col-span-3 glass-panel rounded-3xl p-6 border border-blue-500/30 relative overflow-hidden flex flex-col justify-between shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(59,130,246,0.2)]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
          
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-400">
                <Wifi className="w-4 h-4 rotate-90" />
                <span>UNISYNC DIGITAL IDENTITY PASS</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">ISO 14443A • 2026</span>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-400 p-[1.5px] shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                <div className="w-full h-full bg-[#060913] rounded-[14px] flex items-center justify-center font-black text-xl text-white">
                  {currentRole === 'FACULTY' ? 'EV' : student.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-black text-white">
                  {currentRole === 'FACULTY' ? 'Dr. Evelyn Vance' : student.name}
                </h3>
                <div className="text-xs font-mono text-slate-300">
                  {currentRole === 'FACULTY' ? 'Faculty ID: FAC-001' : `Roll No: ${student.roll_no}`}
                </div>
                <div className="text-xs font-mono font-bold text-blue-400 mt-1">
                  NFC UID: {currentRole === 'FACULTY' ? 'NFC-FAC-9901' : student.nfc_uid}
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#060913]/70 border border-white/5">
                <span className="text-slate-400 block text-[11px]">Department</span>
                <span className="text-white font-bold">Computer Science</span>
              </div>
              <div className="p-3 rounded-xl bg-[#060913]/70 border border-white/5">
                <span className="text-slate-400 block text-[11px]">Academic Year</span>
                <span className="text-white font-bold">2026 Batch</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-mono">Status: <strong className="text-blue-400">Verified Active</strong></span>
            <span className="text-slate-400 font-mono">Touchless 2FA Enrolled</span>
          </div>
        </div>

        {/* QR Code Pass */}
        <div className="md:col-span-2 glass-panel rounded-3xl p-6 border border-blue-500/20 flex flex-col items-center justify-center text-center">
          <div className="text-xs font-mono font-bold text-slate-300 mb-4 flex items-center gap-1.5">
            <QrCode className="w-4 h-4 text-blue-400" />
            <span>Mobile Doorway Check-In Code</span>
          </div>

          <div className="p-4 rounded-2xl bg-white p-3 shadow-[0_0_25px_rgba(59,130,246,0.25)]">
            <QRCodeSVG 
              value={`UNISYNC_2FA:${currentRole === 'FACULTY' ? 'FAC001' : student.id}:${student.nfc_uid}`}
              size={135}
              fgColor="#060913"
              bgColor="#ffffff"
            />
          </div>

          <span className="text-[11px] text-slate-400 mt-4 font-mono">
            Scan at Hall 304 doorway optical terminal for instantaneous 2FA check-in.
          </span>
        </div>

      </div>

      {/* 3. Ephemeral Biometric Privacy Guarantee */}
      <div className="glass-panel rounded-3xl p-6 border border-blue-500/20">
        <div className="flex items-center gap-3 mb-2">
          <IconBadge icon={Lock} size="sm" variant="blue" />
          <div>
            <h3 className="text-sm font-bold text-white">12-Hour Ephemeral Zero-Retention Privacy Protocol</h3>
            <p className="text-xs text-slate-400">Institutional Biometric Ethics & GDPR Compliance Certification</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-2xl bg-[#060913]/60 border border-white/5 space-y-1">
            <span className="text-blue-400 font-bold block flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Volatile RAM Only
            </span>
            <p className="text-slate-300 text-[11px]">Raw camera video frames are processed in-memory and purged immediately.</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#060913]/60 border border-white/5 space-y-1">
            <span className="text-blue-400 font-bold block flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 12h Auto-Shredder
            </span>
            <p className="text-slate-300 text-[11px]">Exception triage snapshots automatically auto-erase after 12 hours with zero persistent backup.</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#060913]/60 border border-white/5 space-y-1">
            <span className="text-blue-400 font-bold block flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Student Control
            </span>
            <p className="text-slate-300 text-[11px]">Minute-by-minute dwell logs are fully transparent and dispute-appealable within 24 hours.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
