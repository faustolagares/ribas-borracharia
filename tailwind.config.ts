import type { Config } from 'tailwindcss';

export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ribas: {
          blue: '#002776',
          lightBlue: '#0044cc',
          yellow: '#FFD700',
          yellowHover: '#E6C200',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        sport: ['Chakra Petch', 'sans-serif'],
      },
      backgroundImage: {
        'carbon': "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')",
      },
      animation: {
        'spin-slow': 'spin 60s linear infinite',
      }
    },
  },
  plugins: [],
} satisfies Config;

