import React from 'react';
import { 
  ShieldCheck, 
  Camera, 
  UserCheck, 
  GraduationCap, 
  LayoutDashboard, 
  Smartphone, 
  BatteryCharging, 
  BatteryWarning, 
  Wifi, 
  WifiOff, 
  FastForward, 
  Sparkles,
  Lock
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import ThemeSelector from './common/ThemeSelector';
import IconBadge from './common/IconBadge';

export default function Navbar({ 
  currentView, 
  setCurrentView, 
  telemetry, 
  sessionState, 
  onSpeedChange, 
  onToggleOffline 
}) {
  const { theme } = useTheme();

  const navItems = [
    { id: 'FACULTY', label: 'Faculty', icon: UserCheck },
    { id: 'STUDENT', label: 'Student', icon: GraduationCap },
    { id: 'ADMIN', label: 'Admin', icon: LayoutDashboard },
    { id: 'CAMERA_STATION', label: 'AI Camera Hub', icon: Camera },
    { id: 'MOODBOARD', label: 'Scope & Mood Boards', icon: Sparkles },
    { id: 'MOBILE_CONNECT', label: 'Phone Node', icon: Smartphone },
  ];

  return (
    <header 
      className="sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-300 px-4 py-3"
      style={{
        backgroundColor: `${theme.bgBase}ee`,
        borderColor: theme.cardBorder
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        
        {/* Brand Logo & Title */}
        <div 
          className="flex items-center space-x-3 cursor-pointer group" 
          onClick={() => setCurrentView('FACULTY')}
        >
          <div 
            className="relative flex items-center justify-center w-11 h-11 rounded-2xl p-[1.5px] transition-all duration-300 group-hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
              boxShadow: `0 0 18px ${theme.glow}`
            }}
          >
            <div 
              className="w-full h-full rounded-[14px] flex items-center justify-center transition-colors"
              style={{ backgroundColor: theme.bgSurface }}
            >
              <ShieldCheck className="w-6 h-6 transition-transform group-hover:rotate-6" style={{ color: theme.primary }} />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span 
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: theme.primary }}
              />
              <span 
                className="relative inline-flex rounded-full h-3 w-3"
                style={{ backgroundColor: theme.primary }}
              />
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold tracking-tight text-white flex items-center gap-1.5">
                NIR-OmniVerify 
                <span 
                  className="text-xs px-1.5 py-0.5 rounded font-mono font-bold border"
                  style={{
                    backgroundColor: theme.primaryMuted,
                    color: theme.primary,
                    borderColor: theme.primaryBorder
                  }}
                >
                  AI 2.0
                </span>
              </h1>
              <span 
                className="hidden sm:inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full border font-medium font-mono"
                style={{
                  backgroundColor: theme.primaryMuted,
                  color: theme.primary,
                  borderColor: theme.primaryBorder
                }}
              >
                <Lock className="w-3 h-3" style={{ color: theme.primary }} /> 12h Ephemeral TTL
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Multi-Factor Single-Camera Continuous Classroom Monitoring</p>
          </div>
        </div>

        {/* Role & Interface Nav Tabs - Unified Theming for All Interfaces */}
        <nav 
          className="flex items-center p-1 rounded-2xl border text-xs font-medium"
          style={{
            backgroundColor: theme.bgSurface,
            borderColor: theme.cardBorder
          }}
        >
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'font-extrabold shadow-lg'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
                style={isActive ? {
                  backgroundColor: theme.primary,
                  color: '#07100A',
                  boxShadow: `0 0 16px ${theme.glow}`
                } : {}}
              >
                <Icon className="w-4 h-4 shrink-0" style={isActive ? { color: '#07100A' } : { color: theme.primaryLight }} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2.5">
          
          {/* Theme Palette Switcher */}
          <ThemeSelector />

          {/* Speed Multiplier Controls */}
          <div 
            className="flex items-center border rounded-xl p-0.5 text-[11px] font-mono"
            style={{
              backgroundColor: theme.bgSurface,
              borderColor: theme.cardBorder
            }}
          >
            <span className="px-2 text-slate-400 flex items-center gap-1 hidden md:flex">
              <FastForward className="w-3 h-3" style={{ color: theme.primary }} /> Speed:
            </span>
            {[1, 10, 60].map(speed => {
              const isSelected = (sessionState?.speed_multiplier || 1) === speed;
              return (
                <button
                  key={speed}
                  onClick={() => onSpeedChange(speed)}
                  className={`px-2 py-1 rounded-lg transition-all ${
                    isSelected
                      ? 'font-bold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                  style={isSelected ? {
                    backgroundColor: speed === 60 ? '#f59e0b' : theme.primary,
                    color: '#07100A',
                    boxShadow: isSelected ? `0 0 8px ${theme.glow}` : 'none'
                  } : {}}
                >
                  {speed === 60 ? '60x Turbo' : `${speed}x`}
                </button>
              );
            })}
          </div>

          {/* Offline / Micro-UPS Status Toggle */}
          <button
            onClick={onToggleOffline}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-mono transition-all ${
              telemetry?.offline_sync_mode === 'OFFLINE_BUFFERING'
                ? 'bg-amber-950/60 border-amber-500/50 text-amber-300 animate-pulse'
                : 'text-slate-200 hover:border-slate-500'
            }`}
            style={telemetry?.offline_sync_mode !== 'OFFLINE_BUFFERING' ? {
              backgroundColor: theme.bgSurface,
              borderColor: theme.cardBorder
            } : {}}
          >
            {telemetry?.offline_sync_mode === 'OFFLINE_BUFFERING' ? (
              <>
                <BatteryWarning className="w-4 h-4 text-amber-400" />
                <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden lg:inline font-bold">UPS: 94% (SQLite Buffer)</span>
              </>
            ) : (
              <>
                <BatteryCharging className="w-4 h-4" style={{ color: theme.primary }} />
                <Wifi className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                <span className="hidden lg:inline text-slate-300 font-medium">UPS: 100% (AC Mains)</span>
              </>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
