/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: {
        DEFAULT: '2rem',
        lg: '20rem',
        xl: '20rem',
        '2xl': '20rem',
      },
    },
  },
  plugins: [],
};
