import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Palette, Check, Sparkles } from 'lucide-react';

export default function ThemeSelector() {
  const { theme, currentThemeKey, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all duration-300 hover:shadow-lg backdrop-blur-md"
        style={{
          backgroundColor: theme.bgSurface,
          borderColor: theme.primaryBorder,
          color: theme.primary,
          boxShadow: `0 0 12px ${theme.primaryMuted}`
        }}
        title="Change System Color Theme"
      >
        <span 
          className="w-3 h-3 rounded-full shadow-sm"
          style={{ 
            backgroundColor: theme.primary, 
            boxShadow: `0 0 8px ${theme.primary}` 
          }}
        />
        <Palette className="w-3.5 h-3.5" />
        <span className="hidden sm:inline font-mono">{theme.name}</span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          <div 
            className="absolute right-0 mt-2 w-64 rounded-2xl border p-3 z-50 shadow-2xl backdrop-blur-xl animate-fade-in"
            style={{
              backgroundColor: `${theme.bgSurface}f5`,
              borderColor: theme.primaryBorder,
              boxShadow: `0 16px 40px rgba(0,0,0,0.8), 0 0 24px ${theme.glow}`
            }}
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b" style={{ borderColor: theme.cardBorder }}>
              <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                <Sparkles className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                <span>Unified System Theme</span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: theme.primaryMuted, color: theme.primary }}>
                All Interfaces
              </span>
            </div>

            <p className="text-[11px] text-slate-400 mb-2.5 leading-snug">
              Syncs accent color, glowing icon badges, reticles & ambient background across all 6 dashboards.
            </p>

            <div className="space-y-1.5">
              {Object.entries(themes).map(([key, t]) => {
                const isSelected = key === currentThemeKey;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setTheme(key);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all text-xs ${
                      isSelected 
                        ? 'font-bold' 
                        : 'hover:bg-white/5 opacity-80 hover:opacity-100'
                    }`}
                    style={isSelected ? {
                      backgroundColor: t.primaryMuted,
                      border: `1px solid ${t.primaryBorder}`,
                      color: t.primary
                    } : {
                      border: '1px solid transparent',
                      color: '#cbd5e1'
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <div 
                        className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 shadow-sm"
                        style={{ 
                          backgroundColor: t.primary,
                          boxShadow: `0 0 10px ${t.primary}`
                        }}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 text-slate-950 font-black" />}
                      </div>
                      <div>
                        <div className="font-semibold leading-tight text-white">{t.name}</div>
                        <div className="text-[10px] text-slate-400 line-clamp-1">{t.subtitle}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
