/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        serif:   ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body:    ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        cream:      '#FDF8F5',
        blush:      '#F5D6DC',
        petal:      '#EBA8B8',
        dustyrose:  '#C4748A',
        rosewood:   '#8B3A52',
        champagne:  '#F7E8D4',
        gold:       '#C9A96E',
        lavender:   '#E8DCF0',
        mist:       '#F0ECF7',
      },
      boxShadow: {
        'polaroid': '0 4px 6px -1px rgba(139,58,82,0.12), 0 12px 40px -4px rgba(139,58,82,0.18), 0 0 0 1px rgba(255,255,255,0.8)',
        'card':     '0 2px 20px -2px rgba(196,116,138,0.15), 0 8px 32px -4px rgba(139,58,82,0.12)',
        'glow':     '0 0 40px rgba(235,168,184,0.4)',
      },
      animation: {
        'float-slow':  'floatSlow 6s ease-in-out infinite',
        'float-med':   'floatMed 4.5s ease-in-out infinite',
        'drift-up':    'driftUp 12s linear infinite',
        'heartbeat':   'heartbeat 1.4s ease-in-out infinite',
        'shimmer':     'shimmer 3s ease-in-out infinite',
        'petal-fall':  'petalFall 10s linear infinite',
        'pulse-soft':  'pulseSoft 3s ease-in-out infinite',
        'sparkle':     'sparkle 2s ease-in-out infinite',
        'write':       'write 2s ease-out forwards',
      },
      keyframes: {
        floatSlow: {
          '0%,100%': { transform: 'translateY(0px) rotate(-2deg)' },
          '50%':     { transform: 'translateY(-18px) rotate(2deg)' },
        },
        floatMed: {
          '0%,100%': { transform: 'translateY(0px) rotate(3deg)' },
          '50%':     { transform: 'translateY(-10px) rotate(-1deg)' },
        },
        driftUp: {
          '0%':   { transform: 'translateY(100vh) translateX(0) rotate(0deg)', opacity: '0' },
          '5%':   { opacity: '1' },
          '95%':  { opacity: '0.6' },
          '100%': { transform: 'translateY(-10vh) translateX(40px) rotate(360deg)', opacity: '0' },
        },
        heartbeat: {
          '0%,100%': { transform: 'scale(1)' },
          '15%':     { transform: 'scale(1.2)' },
          '30%':     { transform: 'scale(1)' },
          '45%':     { transform: 'scale(1.12)' },
          '60%':     { transform: 'scale(1)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        petalFall: {
          '0%':   { transform: 'translateY(-5%) translateX(0) rotate(0deg)', opacity: '0' },
          '10%':  { opacity: '0.8' },
          '90%':  { opacity: '0.4' },
          '100%': { transform: 'translateY(105vh) translateX(60px) rotate(540deg)', opacity: '0' },
        },
        pulseSoft: {
          '0%,100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%':     { opacity: '1',   transform: 'scale(1.05)' },
        },
        sparkle: {
          '0%,100%': { opacity: '0.2', transform: 'scale(0.6) rotate(0deg)' },
          '50%':     { opacity: '1',   transform: 'scale(1.3) rotate(180deg)' },
        },
        write: {
          from: { strokeDashoffset: '1000' },
          to:   { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
}
