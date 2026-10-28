import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  GraduationCap, 
  UserCheck, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Users,
  Search,
  ScanFace,
  KeyRound,
  CreditCard,
  Radio,
  Fingerprint
} from 'lucide-react';
import IconBadge from './common/IconBadge';

export const ALL_MEMBERS = {
  students: [
    { 
      id: 'STU101', 
      name: 'Alex Mercer', 
      email: 'alex.mercer@unisync.edu',
      role: 'STUDENT',
      roll_no: '2026-CS-01', 
      class_id: 'CS401', 
      nfc_uid: 'NFC-7A39B1', 
      current_attendance_pct: 95.8, 
      attended_sessions: 23, 
      total_sessions: 24,
      ce_assignment_score: 95, 
      ce_quiz_score: 92, 
      ce_project_score: 98,
      status: 'Eligible (95.8%)',
      avatarColor: 'from-blue-600 to-sky-400',
      tagline: 'Semester 8 • AI & Neural Systems'
    },
    { 
      id: 'STU102', 
      name: 'Sara Lin', 
      email: 'sara.lin@unisync.edu',
      role: 'STUDENT',
      roll_no: '2026-CS-02', 
      class_id: 'CS401', 
      nfc_uid: 'NFC-8C21D4', 
      current_attendance_pct: 91.6, 
      attended_sessions: 22, 
      total_sessions: 24,
      ce_assignment_score: 90, 
      ce_quiz_score: 88, 
      ce_project_score: 94,
      status: 'Eligible (91.6%)',
      avatarColor: 'from-blue-500 to-indigo-500',
      tagline: 'Semester 8 • AI & Neural Systems'
    },
    { 
      id: 'STU103', 
      name: 'Devon Wright', 
      email: 'devon.wright@unisync.edu',
      role: 'STUDENT',
      roll_no: '2026-CS-03', 
      class_id: 'CS401', 
      nfc_uid: 'NFC-9E44F2', 
      current_attendance_pct: 79.2, 
      attended_sessions: 19, 
      total_sessions: 24,
      ce_assignment_score: 82, 
      ce_quiz_score: 79, 
      ce_project_score: 85,
      status: 'Review (79.2%)',
      avatarColor: 'from-sky-600 to-blue-700',
      tagline: 'Semester 8 • AI & Neural Systems'
    },
    { 
      id: 'STU104', 
      name: 'Elena Evans', 
      email: 'elena.evans@unisync.edu',
      role: 'STUDENT',
      roll_no: '2026-CS-04', 
      class_id: 'CS401', 
      nfc_uid: 'NFC-3B19A8', 
      current_attendance_pct: 96.0, 
      attended_sessions: 23, 
      total_sessions: 24,
      ce_assignment_score: 96, 
      ce_quiz_score: 94, 
      ce_project_score: 95,
      status: 'Eligible (96.0%)',
      avatarColor: 'from-blue-600 to-cyan-500',
      tagline: 'Semester 8 • AI & Neural Systems'
    },
    { 
      id: 'STU105', 
      name: 'Marcus Chen', 
      email: 'marcus.chen@unisync.edu',
      role: 'STUDENT',
      roll_no: '2026-CS-05', 
      class_id: 'CS401', 
      nfc_uid: 'NFC-5F72C3', 
      current_attendance_pct: 71.5, 
      attended_sessions: 17, 
      total_sessions: 24,
      ce_assignment_score: 72, 
      ce_quiz_score: 68, 
      ce_project_score: 70,
      status: 'Warning (<75%)',
      avatarColor: 'from-blue-400 to-blue-800',
      tagline: 'Semester 8 • Low Attendance Review'
    },
    { 
      id: 'STU106', 
      name: 'Zoe Nakamura', 
      email: 'zoe.nakamura@unisync.edu',
      role: 'STUDENT',
      roll_no: '2026-CS-06', 
      class_id: 'CS401', 
      nfc_uid: 'NFC-1D90E5', 
      current_attendance_pct: 68.0, 
      attended_sessions: 16, 
      total_sessions: 24,
      ce_assignment_score: 65, 
      ce_quiz_score: 70, 
      ce_project_score: 60,
      status: 'Critical (<75%)',
      avatarColor: 'from-blue-500 to-slate-700',
      tagline: 'Semester 8 • Attendance Shortage'
    }
  ],
  faculty: [
    { 
      id: 'FAC001', 
      name: 'Dr. Evelyn Vance', 
      email: 'evelyn.vance@unisync.edu',
      role: 'FACULTY',
      department: 'Computer Science & AI', 
      room_assigned: 'Hall 304', 
      nfc_uid: 'NFC-FAC-9901',
      title: 'Professor & AI Lab Director',
      avatarColor: 'from-blue-600 to-indigo-600',
      tagline: 'Faculty Head • CS401 Primary Instructor'
    },
    { 
      id: 'FAC002', 
      name: 'Prof. Alan Turing', 
      email: 'alan.turing@unisync.edu',
      role: 'FACULTY',
      department: 'Computer Vision & Edge Systems', 
      room_assigned: 'Lab 201', 
      nfc_uid: 'NFC-FAC-9902',
      title: 'Senior Faculty & Research Lead',
      avatarColor: 'from-sky-600 to-blue-800',
      tagline: 'Faculty Lead • Edge Vision Systems'
    }
  ]
};

export default function LoginPage({ onLoginSuccess }) {
  const allList = [...ALL_MEMBERS.students, ...ALL_MEMBERS.faculty];
  
  // Active member for dedicated personal login page
  const [selectedMember, setSelectedMember] = useState(() => {
    // Check URL param or default to null (directory view)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const memberId = params.get('member');
      if (memberId) {
        return allList.find(m => m.id.toLowerCase() === memberId.toLowerCase()) || null;
      }
    }
    return null;
  });

  const [activeTabRole, setActiveTabRole] = useState('STUDENT'); // 'STUDENT' | 'FACULTY'
  const [searchFilter, setSearchFilter] = useState('');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStep, setVerificationStep] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Synchronize URL query param when member selection changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location);
      if (selectedMember) {
        url.searchParams.set('member', selectedMember.id);
      } else {
        url.searchParams.delete('member');
      }
      window.history.replaceState({}, '', url);
    }
  }, [selectedMember]);

  const currentMembersList = activeTabRole === 'STUDENT' ? ALL_MEMBERS.students : ALL_MEMBERS.faculty;
  const filteredMembers = currentMembersList.filter(m => 
    m.name.toLowerCase().includes(searchFilter.toLowerCase()) || 
    (m.roll_no && m.roll_no.toLowerCase().includes(searchFilter.toLowerCase())) ||
    m.id.toLowerCase().includes(searchFilter.toLowerCase())
  );

  // Trigger simulated 2FA Biometric Facial & NFC Authentication
  const handleBiometricAuth = (member) => {
    setIsVerifying(true);
    setVerificationStep('Connecting to Overhead Single-Camera Vector...');
    setErrorMsg('');

    setTimeout(() => {
      setVerificationStep(`Matching facial vector with ${member.nfc_uid}...`);
    }, 600);

    setTimeout(() => {
      setVerificationStep('Confidence: 99.4% • Zero-Retention Key Validated');
    }, 1200);

    setTimeout(() => {
      setIsVerifying(false);
      onLoginSuccess(member);
    }, 1700);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      setErrorMsg('Please enter your password.');
      return;
    }
    onLoginSuccess(selectedMember);
  };

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden blue-grid-bg">
      
      {/* Background Radial Glows */}
      <div className="ambient-glow top-1/4 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="ambient-glow bottom-1/4 right-1/4 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glassmorphism Modal Container */}
      <div className="w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-8 border border-blue-500/30 relative z-10 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(59,130,246,0.25)] animate-fade-in">
        
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-400 p-[1.5px] shadow-[0_0_25px_rgba(59,130,246,0.45)] mb-3">
            <div className="w-full h-full bg-[#060913] rounded-[14px] flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-blue-400" />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            UniSync <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">AI</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            Next-Gen Classroom Attendance & Individual Member Authentication
          </p>
        </div>

        {/* =========================================================================
            STATE 1: DEDICATED INDIVIDUAL MEMBER LOGIN PAGE (When a member is chosen)
            ========================================================================= */}
        {selectedMember ? (
          <div className="space-y-6 animate-fade-in">
            
            {/* Top Navigation Bar: Back Button & Quick Switcher Strip */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <button
                type="button"
                onClick={() => { setSelectedMember(null); setErrorMsg(''); }}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors py-1 px-2.5 rounded-lg hover:bg-white/5"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-blue-400" />
                <span>All Members Directory</span>
              </button>

              <div className="text-[11px] font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span>Dedicated Login Portal</span>
              </div>
            </div>

            {/* Quick-Switch Avatar Pills: Switch to any other member with 1 click */}
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Switch to Member:</span>
                <span className="text-slate-500">8 Members Available</span>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {allList.map((m) => {
                  const isActive = m.id === selectedMember.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => { setSelectedMember(m); setErrorMsg(''); }}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border transition-all shrink-0 text-xs ${
                        isActive 
                          ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)] font-bold' 
                          : 'bg-[#060913] border-white/10 text-slate-400 hover:text-white hover:border-blue-500/40'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center text-[10px] font-bold">
                        {m.name.split(' ').map(n => n[0]).join('')}
                      </span>
                      <span>{m.name.split(' ')[0]}</span>
                      {m.role === 'FACULTY' && (
                        <span className="text-[9px] px-1 rounded bg-blue-400/20 text-blue-300 font-mono">Fac</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Personalized Member Card with Holographic Styling */}
            <div className="glass-card rounded-2xl p-5 border border-blue-500/40 bg-gradient-to-b from-blue-950/30 to-[#0B1120]/90 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                {/* Member Avatar with glowing ring */}
                <div className="relative">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${selectedMember.avatarColor || 'from-blue-600 to-sky-400'} p-0.5 shadow-[0_0_20px_rgba(59,130,246,0.4)]`}>
                    <div className="w-full h-full bg-[#060913] rounded-[14px] flex items-center justify-center text-xl font-black text-white">
                      {selectedMember.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-blue-600 border-2 border-[#060913] flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>

                {/* Member Identity Details */}
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                    <h2 className="text-xl font-black text-white tracking-tight">
                      {selectedMember.name}
                    </h2>
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                      {selectedMember.role}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 font-medium">
                    {selectedMember.tagline || (selectedMember.role === 'STUDENT' ? `Roll No: ${selectedMember.roll_no}` : selectedMember.title)}
                  </p>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3 text-[11px] font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <CreditCard className="w-3.5 h-3.5 text-blue-400" />
                      <span>ID: <strong className="text-white">{selectedMember.id}</strong></span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Radio className="w-3.5 h-3.5 text-blue-400" />
                      <span>NFC: <strong className="text-white">{selectedMember.nfc_uid}</strong></span>
                    </span>
                    {selectedMember.role === 'STUDENT' && (
                      <span className="flex items-center gap-1 text-blue-400 font-bold">
                        <span>Attendance: {selectedMember.current_attendance_pct}%</span>
                      </span>
                    )}
                    {selectedMember.role === 'FACULTY' && (
                      <span className="flex items-center gap-1 text-blue-400 font-bold">
                        <span>Room: {selectedMember.room_assigned}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

            </div>

            {/* Error Feedback */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Authentication Action 1: Instant 2FA Biometric Face Scan + NFC */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => handleBiometricAuth(selectedMember)}
                disabled={isVerifying}
                className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-bold text-sm shadow-[0_0_25px_rgba(59,130,246,0.45)] flex items-center justify-center gap-3 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-75 relative overflow-hidden group"
              >
                {isVerifying ? (
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="font-mono text-xs">{verificationStep}</span>
                  </div>
                ) : (
                  <>
                    <ScanFace className="w-5 h-5 text-sky-200 group-hover:scale-110 transition-transform" />
                    <span>Instant 2FA Sign In as {selectedMember.name.split(' ')[0]}</span>
                    <ArrowRight className="w-4 h-4 text-sky-200" />
                  </>
                )}
              </button>
              
              <div className="text-center text-[10px] font-mono text-slate-500">
                1-Click Overhead Camera Face Vector Match + Doorway NFC Key Simulation
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 my-2 text-slate-500 text-[10px] font-mono uppercase tracking-wider">
              <div className="flex-1 h-[1px] bg-white/10" />
              <span>Or Authenticate With Password</span>
              <div className="flex-1 h-[1px] bg-white/10" />
            </div>

            {/* Authentication Action 2: Password Form */}
            <form onSubmit={handlePasswordSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  UniSync Member Email
                </label>
                <input
                  type="text"
                  value={selectedMember.email}
                  disabled
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#060913] border border-white/10 text-slate-400 text-xs font-mono cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter member password"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#060913] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all hover:border-blue-500/50"
              >
                <KeyRound className="w-3.5 h-3.5 text-blue-400" />
                <span>Verify Password & Access Portal</span>
              </button>
            </form>

          </div>
        ) : (
          /* =========================================================================
             STATE 2: ALL MEMBERS DIRECTORY (Choose which member's login page to open)
             ========================================================================= */
          <div className="space-y-5 animate-fade-in">
            
            {/* Student vs Faculty Tabs */}
            <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-[#0B1120] border border-blue-500/20 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTabRole('STUDENT')}
                className={`py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
                  activeTabRole === 'STUDENT'
                    ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.45)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Student Members ({ALL_MEMBERS.students.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTabRole('FACULTY')}
                className={`py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
                  activeTabRole === 'FACULTY'
                    ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.45)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>Faculty Members ({ALL_MEMBERS.faculty.length})</span>
              </button>
            </div>

            {/* Instruction Header */}
            <div className="flex items-center justify-between text-xs pb-1">
              <span className="text-slate-400 font-mono flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-400" />
                <span>Select a member to open their personalized login page:</span>
              </span>
            </div>

            {/* Search Filter */}
            <div className="relative">
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder={`Filter ${activeTabRole === 'STUDENT' ? 'students by name, roll no or ID...' : 'faculty by name or department...'}`}
                className="w-full px-4 py-2.5 rounded-xl bg-[#060913] border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-blue-500 font-mono"
              />
              <Search className="w-4 h-4 text-slate-500 absolute right-3.5 top-3 pointer-events-none" />
            </div>

            {/* Member Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
              {filteredMembers.map((member) => {
                const isStudent = activeTabRole === 'STUDENT';
                const isLow = isStudent && member.current_attendance_pct < 75.0;

                return (
                  <div
                    key={member.id}
                    onClick={() => setSelectedMember(member)}
                    className="glass-card rounded-2xl p-3.5 border border-white/10 hover:border-blue-400 cursor-pointer group transition-all duration-200 flex items-center justify-between gap-3 bg-[#0B1120]/60 hover:bg-[#0B1120]/90"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${member.avatarColor || 'from-blue-600 to-sky-400'} p-0.5 shadow-sm group-hover:scale-105 transition-all`}>
                        <div className="w-full h-full bg-[#060913] rounded-[10px] flex items-center justify-center font-bold text-blue-300 text-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                          {member.name}
                        </h4>
                        <div className="text-[10px] font-mono text-slate-400">
                          {isStudent ? `${member.roll_no} • ${member.class_id}` : member.department}
                        </div>
                        {isStudent ? (
                          <div className={`text-[10px] font-mono font-bold mt-0.5 ${isLow ? 'text-rose-400' : 'text-blue-400'}`}>
                            {member.status}
                          </div>
                        ) : (
                          <div className="text-[10px] font-mono text-blue-400 font-bold mt-0.5">
                            Room {member.room_assigned}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-white/5 group-hover:bg-blue-600 text-slate-400 group-hover:text-white transition-all shrink-0">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Helper Note */}
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[11px] font-mono text-blue-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Each member has a dedicated login page with personalized NFC & face recognition. Click any card to enter.</span>
            </div>

          </div>
        )}

        {/* Security & Privacy Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span className="flex items-center gap-1.5 text-blue-400">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            12-Hour Zero-Retention Protocol
          </span>
          <span>Single AI Camera 2FA</span>
        </div>

      </div>

    </div>
  );
}
