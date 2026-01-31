/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        khmer: ['"Noto Sans Khmer"', "sans-serif"],
        battambang: ['"Battambang"', "cursive"],
      },
      colors: {
        primary: "#2563eb",
        secondary: "#64748b",
      },
    },
  },
  plugins: [
    
  ],
}

