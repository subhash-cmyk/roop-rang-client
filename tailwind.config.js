/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Original tokens kept 100% intact so nothing existing breaks.
        roop: {
          gold: '#D4AF37',
          'gold-light': '#F5E6B8',
          'gold-deep': '#B8892F',
          pink: '#FFF0F5',
          'pink-deep': '#F8C8DC',
          cream: '#FFFBF7',
          dark: '#2D1B1E',
          rose: '#C97B84',
          // --- refined luxury additions (new keys only, non-breaking) ---
          ivory: '#FBF8F3',
          champagne: '#EFE1C8',
          charcoal: '#231A1B',
          'charcoal-soft': '#4A3A3C',
          line: '#EDE2D0',
          mist: '#F7F2EA',
        },
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        luxury: '0 10px 40px -10px rgba(212, 175, 55, 0.15)',
        card: '0 4px 24px rgba(0,0,0,0.06)',
        'card-hover': '0 24px 60px -12px rgba(45, 27, 30, 0.18)',
        'luxury-lg': '0 30px 80px -20px rgba(45, 27, 30, 0.20)',
        'inner-gold': 'inset 0 0 0 1px rgba(212,175,55,0.35)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(14px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.6s infinite linear',
        fadeUp: 'fadeUp 0.6s ease forwards',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
