/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lifeline: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e', // Primary Brand Pink
          600: '#e11d48', // Deep Brand Pink
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
          glow: '#ff2a7a',
        },
        primary: '#f43f5e',
        secondary: '#e11d48',
        accent: '#fb7185',
        background: '#fff1f2',
        darkbg: '#0f172a',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'ecg-pulse': 'ecgPulse 2.5s infinite ease-in-out',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite alternate',
      },
      keyframes: {
        ecgPulse: {
          '0%': { strokeDashoffset: '1000', opacity: '0.2' },
          '50%': { strokeDashoffset: '0', opacity: '1' },
          '100%': { strokeDashoffset: '-1000', opacity: '0.2' },
        },
        glowPulse: {
          '0%': { boxShadow: '0 0 15px rgba(244, 63, 94, 0.4)' },
          '100%': { boxShadow: '0 0 35px rgba(244, 63, 94, 0.9)' },
        }
      }
    },
  },
  plugins: [],
}
