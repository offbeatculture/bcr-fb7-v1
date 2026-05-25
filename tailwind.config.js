/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FBF7F0',
          100: '#F6EFE3',
          200: '#EDE2CD',
        },
        ink: {
          900: '#13110E',
          800: '#1F1C17',
          700: '#3A342B',
          500: '#6E6557',
        },
        teal: {
          deep: '#0E5448',
          forest: '#0A3D34',
          mist: '#D7E6E1',
        },
        rose: {
          saree: '#C94B6D',
          soft: '#E8B5C2',
        },
        gold: {
          DEFAULT: '#C7995A',
          deep: '#9B7235',
        },
        sand: '#E8D9C4',
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Manrope"', 'ui-sans-serif', 'system-ui'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.18 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.55' },
          '50%': { transform: 'scale(1.08)', opacity: '0.9' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.35', filter: 'blur(18px)' },
          '50%': { opacity: '0.85', filter: 'blur(24px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        breathe: 'breathe 6s ease-in-out infinite',
        glowPulse: 'glowPulse 4s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
        floaty: 'floaty 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
