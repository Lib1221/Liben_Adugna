/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Clean Black & Yellow palette
        yellow: {
          50: '#FFFEF5',
          100: '#FFFDE8',
          200: '#FFF9C4',
          300: '#FFF59D',
          400: '#FFEE58',
          500: '#FFEB3B',
          600: '#FDD835',
          700: '#FBC02D',
          800: '#F9A825',
          900: '#F57F17',
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
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 235, 59, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 235, 59, 0.5)' }
        },
      },
      boxShadow: {
        'yellow': '0 0 20px rgba(255, 235, 59, 0.2)',
        'yellow-lg': '0 0 40px rgba(255, 235, 59, 0.3)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
};
