/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {
    colors: {
      roop: { gold: '#D4AF37', 'gold-light': '#F5E6B8', 'pink': '#FFF0F5', 'pink-deep': '#F8C8DC', 'cream': '#FFFBF7', 'dark': '#2D1B1E', 'rose': '#C97B84' }
    },
    fontFamily: { 'playfair': ['"Playfair Display"', 'serif'], 'inter': ['Inter', 'sans-serif'] },
    boxShadow: { 'luxury': '0 10px 40px -10px rgba(212, 175, 55, 0.15)', 'card': '0 4px 24px rgba(0,0,0,0.06)' }
  }},
  plugins: [],
}
