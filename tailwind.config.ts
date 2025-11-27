import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette INSES 2025
        crimson: {
          DEFAULT: '#D80536',
          light: '#EE2449',
          dark: '#B00429',
        },
        rose: {
          DEFAULT: '#EE2449',
          light: '#FF4D6D',
          dark: '#D80536',
        },
        pearl: {
          DEFAULT: '#EDF2F4',
          light: '#F8FAFB',
          dark: '#E1E8EB',
        },
        'slate-blue': {
          DEFAULT: '#8D9AAE',
          light: '#A8B5C9',
          dark: '#6B7892',
        },
        navy: {
          DEFAULT: '#2B2E42',
          light: '#3D4158',
          dark: '#1C1E2E',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui'],
        inter: ['var(--font-inter)'],
        poppins: ['var(--font-poppins)'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #D80536 0%, #EE2449 50%, #2B2E42 100%)',
        'gradient-overlay': 'linear-gradient(180deg, rgba(43, 46, 66, 0.9) 0%, rgba(216, 5, 54, 0.8) 100%)',
      },
    },
  },
  plugins: [],
};

export default config;

