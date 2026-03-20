/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Elegant Gold & Black palette
        yellow: {
          50: '#FFF9E6',
          100: '#FFF0C2',
          200: '#FFE699',
          300: '#FFD966',
          400: '#FFCC33',
          500: '#F5B800',  // Main gold - elegant with black
          600: '#D4A000',
          700: '#B38600',
          800: '#8C6900',
          900: '#664D00',
        },
        dark: {
          50: '#2A2A2A',
          100: '#232323',
          200: '#1C1C1C',
          300: '#161616',
          400: '#111111',
          500: '#0A0A0A',
          600: '#080808',
          700: '#050505',
          800: '#030303',
          900: '#000000',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'shimmer': {
          '0%': { 'background-position': '-200% 0' },
          '100%': { 'background-position': '200% 0' }
        },
        'glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(245, 184, 0, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(245, 184, 0, 0.5)' }
        },
      },
      boxShadow: {
        'yellow': '0 0 20px rgba(245, 184, 0, 0.2)',
        'yellow-lg': '0 0 40px rgba(245, 184, 0, 0.3)',
        'gold': '0 0 25px rgba(245, 184, 0, 0.25)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
};
