/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C0E8F9',       // Primary color
        secondary: '#02243D',     // Secondary color
        background: '#C0E8F9',    // Background color
        text: '#212529',          // Text color
        border: '#dee2e6',        // Border color
        success: '#28a745',       // Example success color
        danger: '#dc3545',        // Example danger color
        warning: '#ffc107',       // Example warning color
        info: '#17a2b8',          // Example info color
      },
      spacing: {
        'navbar': '4rem',         // Custom height for navbar
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'], // Custom font family
      },
      boxShadow: {
        'navbar': '0 4px 6px rgba(0, 0, 0, 0.1)', // Custom shadow for navbar
      },
      zIndex: {
        '1000': '1000',
        '999': '999'
      },
      // Adding the shake animation here
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-10px)' },
          '40%, 80%': { transform: 'translateX(10px)' },
        },
      },
      animation: {
        shake: 'shake 0.5s ease-in-out', // Adding the animation class
      }
    },
  },
  plugins: [],
}
