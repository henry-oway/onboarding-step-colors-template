import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {}
  },
  darkMode: "class",
  plugins: [heroui({
    themes: {
      dark: {
        extend: 'dark',
        colors: {
          background: '#1A1D24',
          'background-dark': '#111416',
          foreground: '#ffffff',
          content1: '#292E38',
          content2: '#1A1D24',
          content3: '#3a4454',
          content4: '#4a5568',
          divider: '#3a4454'
        }
      }
    }
  })]
}
