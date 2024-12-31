/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // This tells Tailwind to scan these files for class names
  ],
    darkMode: 'class',
  theme: {
    extend: {
      colors:{
        navred:"#d33a2c",
        blue:"#244654",
        bgcolor:"#ced8ff",
        bgblack:"#222",
        background: {
          light: '#ffffff', // light mode background
          dark: '#121212',  // dark mode background
        },
        
       
      }
    },
    fontFamily: {
      title: ['Poppins', 'sans-serif'], // Set Poppins as the default sans font
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
