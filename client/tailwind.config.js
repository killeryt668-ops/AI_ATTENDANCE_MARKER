/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        lime: {
          DEFAULT: '#BCFF00',
          400: '#D2FF4D',
          500: '#BCFF00',
          600: '#99D600',
          900: '#1e3000',
          glow: 'rgba(188, 255, 0, 0.4)',
        },
        cyber: {
          950: '#07100A',
          900: '#0B1510',
          850: '#0F1E16',
          800: '#14271D',
          700: '#1C3527',
          600: '#2A4E3A',
          neonLime: '#BCFF00',
          neonGreen: '#10b981',
          neonAmber: '#f59e0b',
          neonRed: '#ef4444',
          neonPurple: '#a855f7',
          nirThermal: '#ff3366',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 4s linear infinite',
        'radar': 'radar 3s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        },
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        glow: {
          '0%': { opacity: 0.4 },
          '100%': { opacity: 0.9 }
        }
      }
    },
  },
  plugins: [],
}
