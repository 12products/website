module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-black': '#10002B',
        'brand-purple': '#9b5de5',
        'brand-pink': '#f15bb5',
        'brand-yellow': '#fee440',
        'brand-blue': '#00bbf9',
        'brand-green': '#00f5d4',
      },
      fontFamily: {
        brand: ['Roboto', 'sans-serif'],
        logo: ['Outfit', 'sans-serif'],
      },
      fontSize: {
        massive: '12rem',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
