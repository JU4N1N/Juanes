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
          red: '#EF4444',
          dark: '#111827',
          primary: "#f97316",
          secondary: "#f5efe6",
          sidebar: "#fffaf3"
        }
      },
    },
  },
  plugins: [],
}