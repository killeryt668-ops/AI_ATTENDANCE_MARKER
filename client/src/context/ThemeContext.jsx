import React, { createContext, useContext, useState, useEffect } from 'react';

export const THEMES = {
  lime: {
    id: 'lime',
    name: 'Electric Lime',
    subtitle: 'Official AI Attendance Master Mood Board Palette',
    primary: '#BCFF00',
    primaryLight: '#D2FF4D',
    primaryDark: '#88BD00',
    primaryMuted: 'rgba(188, 255, 0, 0.12)',
    primaryBorder: 'rgba(188, 255, 0, 0.32)',
    glow: 'rgba(188, 255, 0, 0.35)',
    glowIntense: 'rgba(188, 255, 0, 0.65)',
    bgBase: '#07100A',
    bgSurface: '#0B1510',
    bgElevated: '#112018',
    cardBorder: 'rgba(188, 255, 0, 0.2)',
    accentHue: 'lime',
  },
  cyan: {
    id: 'cyan',
    name: 'Quantum Cyan',
    subtitle: 'Hyper-Modern Arctic Vision Array',
    primary: '#00F0FF',
    primaryLight: '#66F5FF',
    primaryDark: '#00B4C2',
    primaryMuted: 'rgba(0, 240, 255, 0.12)',
    primaryBorder: 'rgba(0, 240, 255, 0.32)',
    glow: 'rgba(0, 240, 255, 0.35)',
    glowIntense: 'rgba(0, 240, 255, 0.65)',
    bgBase: '#050D14',
    bgSurface: '#081420',
    bgElevated: '#0D1E30',
    cardBorder: 'rgba(0, 240, 255, 0.2)',
    accentHue: 'cyan',
  },
  emerald: {
    id: 'emerald',
    name: 'Matrix Emerald',
    subtitle: 'Bio-Cyber Edge Intelligence',
    primary: '#10B981',
    primaryLight: '#34D399',
    primaryDark: '#059669',
    primaryMuted: 'rgba(16, 185, 129, 0.12)',
    primaryBorder: 'rgba(16, 185, 129, 0.32)',
    glow: 'rgba(16, 185, 129, 0.35)',
    glowIntense: 'rgba(16, 185, 129, 0.65)',
    bgBase: '#04120B',
    bgSurface: '#071A10',
    bgElevated: '#0C2618',
    cardBorder: 'rgba(16, 185, 129, 0.2)',
    accentHue: 'emerald',
  },
  amber: {
    id: 'amber',
    name: 'Solar Amber',
    subtitle: 'Industrial Edge & Telemetry Forge',
    primary: '#F59E0B',
    primaryLight: '#FBBF24',
    primaryDark: '#D97706',
    primaryMuted: 'rgba(245, 158, 11, 0.12)',
    primaryBorder: 'rgba(245, 158, 11, 0.32)',
    glow: 'rgba(245, 158, 11, 0.35)',
    glowIntense: 'rgba(245, 158, 11, 0.65)',
    bgBase: '#120A03',
    bgSurface: '#1A1005',
    bgElevated: '#241708',
    cardBorder: 'rgba(245, 158, 11, 0.2)',
    accentHue: 'amber',
  },
  violet: {
    id: 'violet',
    name: 'Cyber Violet',
    subtitle: 'Deep Holographic Quantum Mesh',
    primary: '#A855F7',
    primaryLight: '#C084FC',
    primaryDark: '#7E22CE',
    primaryMuted: 'rgba(168, 85, 247, 0.12)',
    primaryBorder: 'rgba(168, 85, 247, 0.32)',
    glow: 'rgba(168, 85, 247, 0.35)',
    glowIntense: 'rgba(168, 85, 247, 0.65)',
    bgBase: '#0B0516',
    bgSurface: '#120824',
    bgElevated: '#1B0C36',
    cardBorder: 'rgba(168, 85, 247, 0.2)',
    accentHue: 'violet',
  }
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [currentThemeKey, setCurrentThemeKey] = useState(() => {
    return localStorage.getItem('app_theme_key') || 'lime';
  });

  const theme = THEMES[currentThemeKey] || THEMES.lime;

  useEffect(() => {
    localStorage.setItem('app_theme_key', currentThemeKey);
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', theme.primary);
    root.style.setProperty('--theme-primary-light', theme.primaryLight);
    root.style.setProperty('--theme-primary-dark', theme.primaryDark);
    root.style.setProperty('--theme-primary-muted', theme.primaryMuted);
    root.style.setProperty('--theme-primary-border', theme.primaryBorder);
    root.style.setProperty('--theme-glow', theme.glow);
    root.style.setProperty('--theme-glow-intense', theme.glowIntense);
    root.style.setProperty('--theme-bg-base', theme.bgBase);
    root.style.setProperty('--theme-bg-surface', theme.bgSurface);
    root.style.setProperty('--theme-bg-elevated', theme.bgElevated);
    root.style.setProperty('--theme-card-border', theme.cardBorder);

    // Update body background
    document.body.style.backgroundColor = theme.bgBase;
  }, [currentThemeKey, theme]);

  return (
    <ThemeContext.Provider value={{ theme, currentThemeKey, setTheme: setCurrentThemeKey, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
