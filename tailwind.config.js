/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FDF8F0',
          100: '#FBF0DF',
          200: '#F6DFBF',
          300: '#EFC995',
          400: '#E4AB66',
          500: '#D49A3D', // Primary Warm Brass Accent
          600: '#B88028', // Darker Amber
          700: '#946319',
          800: '#794F1B',
          900: '#64421B',
        },
        dark: {
          900: '#121417', // Rich Charcoal Base
          800: '#1E2228', // Card Surface
          700: '#2A2F37', // Border Accent
          600: '#3F4754', // Subtitle text
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-outfit)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
