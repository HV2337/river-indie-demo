/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#000000',
          bgSecondary: '#050A15',
          text: '#F5F5F7',
          textMuted: '#86868B',
          accent: '#2997FF', // Apple blue accent
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(180deg, #000000 0%, #050A15 100%)',
      }
    },
  },
  plugins: [],
}
