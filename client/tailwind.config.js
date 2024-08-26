/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        color1: '#ebdeb7',
        color2: '#1E2A5E',
        color3: '#55679C',
        color4: '#7C93C3',
      },
      screens: {
        'xxs': '450px', // min-width
      },
    },
  },
  plugins: [],
}

