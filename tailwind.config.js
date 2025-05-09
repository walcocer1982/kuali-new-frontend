/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'whatsapp-primary': '#128C7E',
        'whatsapp-light': '#25D366',
        'whatsapp-dark': '#075E54',
        'whatsapp-gray': '#F0F2F5',
        'whatsapp-textDark': '#111B21',
        'whatsapp-textGray': '#667781'
      }
    },
  },
  plugins: [],
} 