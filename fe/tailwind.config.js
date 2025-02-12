/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  important: '#root',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2196f3',
          dark: '#1976d2',
        }
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
} 