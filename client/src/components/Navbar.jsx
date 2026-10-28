import React from 'react';
import { 
  Home, 
  TrendingUp, 
  Monitor, 
  User, 
  ShieldCheck,
  GraduationCap,
  UserCheck,
  LogOut
} from 'lucide-react';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  currentUser,
  onLogout 
}) {
  const isFaculty = currentUser?.role === 'FACULTY';

  const navItems = [
    { id: 'HOME', label: 'Home', icon: Home },
    { id: 'PROGRESS', label: 'Progress', icon: TrendingUp },
    { id: 'MONITOR', label: 'Monitor', icon: Monitor, badge: 'Faculty' },
    { id: 'PROFILE', label: 'Profile', icon: User }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#060913]/90 backdrop-blur-xl border-b border-blue-500/20 px-4 sm:px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo - Blue & White */}
        <div 
          className="flex items-center space-x-3 cursor-pointer group" 
          onClick={() => setCurrentTab('HOME')}
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-sky-400 p-[1.5px] shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#060913] rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-blue-400 transition-transform group-hover:rotate-6" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
            </span>
          </div>

          <div>
            <h1 className="text-base font-extrabold tracking-tight text-white flex items-center gap-2">
              UniSync <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 font-mono font-bold border border-blue-500/30">AI</span>
            </h1>
            <p className="text-[11px] text-slate-400 hidden sm:block">Student & Faculty Attendance</p>
          </div>
        </div>

        {/* Clean 4 Navigation Buttons: Home, Progress, Monitor, Profile */}
        <nav className="flex items-center p-1 rounded-2xl bg-[#0B1120]/80 border border-blue-500/20 text-xs font-medium backdrop-blur-md">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white font-bold shadow-[0_0_20px_rgba(37,99,235,0.45)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-blue-400'}`} />
                <span className="hidden xs:inline">{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md ${
                    isActive ? 'bg-white/20 text-white' : 'bg-blue-500/20 text-blue-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Info Chip & Logout */}
        <div className="flex items-center gap-2.5">
          <div className="hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#0B1120] border border-blue-500/20 text-xs">
            {isFaculty ? (
              <UserCheck className="w-4 h-4 text-blue-400" />
            ) : (
              <GraduationCap className="w-4 h-4 text-blue-400" />
            )}
            <div>
              <span className="font-bold text-white block leading-tight">{currentUser?.name || 'User'}</span>
              <span className="text-[10px] text-slate-400 font-mono">{isFaculty ? 'Faculty' : currentUser?.roll_no || 'Student'}</span>
            </div>
          </div>

          <button
            onClick={onLogout}
            title="Sign Out"
            className="p-2 rounded-xl bg-[#0B1120] hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/30 text-slate-400 hover:text-rose-300 transition-all text-xs flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline font-semibold">Logout</span>
          </button>
        </div>

      </div>
    </header>
  );
}
