/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Single accent. Steps below 500 are for washes and borders only; 500 is the brand.
        yellow: {
          50: '#FFF9E6',
          100: '#FFF0C2',
          200: '#FFE699',
          300: '#FFD966',
          400: '#FFD24D',
          500: '#F5B800',
          600: '#D4A000',
          700: '#B38600',
          800: '#8C6900',
          900: '#664D00',
        },
        // Neutral ramp mirrors the --text-* tokens in index.css. Tailwind's stock gray-500
        // fails 4.5:1 on our surfaces, so 400-600 are lifted; small grey text passes AA
        // without every component opting in.
        gray: {
          300: '#D4D4DA',
          400: '#B4B4BE',
          500: '#8C8C97',
          600: '#6E6E79',
          700: '#35353D',
          800: '#26262C',
        },
        // Mirrors --ground and --surface-*.
        dark: {
          50: '#2A2A31',
          100: '#232329',
          200: '#1B1B20',
          300: '#141418',
          400: '#0F0F12',
          500: '#09090B',
          600: '#070709',
          700: '#050506',
          800: '#030304',
          900: '#000000',
        },
        live: '#34D399',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      fontSize: {
        // Display steps carry their own tracking so headings never need a second class.
        'display-lg': ['clamp(2.25rem, 1.5rem + 3vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display': ['clamp(1.75rem, 1.3rem + 1.8vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        'title': ['clamp(1.35rem, 1.2rem + 0.7vw, 1.75rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
      },
      maxWidth: {
        // Body copy stops at a comfortable measure rather than running the card width.
        prose: '68ch',
      },
      transitionTimingFunction: {
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
