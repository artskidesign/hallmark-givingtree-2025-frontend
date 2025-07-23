/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Hallmark brand colors
        hallmark: {
          red: '#E31E24',
          gold: '#F4B942',
          green: '#2E5D31',
          blue: '#1E3A8A',
          purple: '#6B46C1',
        },
        // Christmas theme colors
        christmas: {
          red: '#DC2626',
          green: '#16A34A',
          gold: '#EAB308',
          silver: '#9CA3AF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'star-glow': 'starGlow 2s ease-in-out',
        'fade-in': 'fadeIn 0.8s ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        starGlow: {
          '0%': { transform: 'scale(1) rotate(0deg)', filter: 'drop-shadow(0 0 20px #FFD700)' },
          '50%': { transform: 'scale(1.2) rotate(180deg)', filter: 'drop-shadow(0 0 40px #FFD700)' },
          '100%': { transform: 'scale(1) rotate(360deg)', filter: 'drop-shadow(0 0 20px #FFD700)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-christmas': 'linear-gradient(180deg, #1e3a8a 0%, #3730a3 50%, #1e1b4b 100%)',
      },
    },
  },
  plugins: [],
  // Important: Configure to work with MUI
  corePlugins: {
    preflight: false, // Disable Tailwind's base styles to avoid conflicts with MUI
  },
}