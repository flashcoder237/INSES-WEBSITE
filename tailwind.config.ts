import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'inses-blue': {
          DEFAULT: '#0000fe',
          dark: '#0000b3',
          accent: '#02baf4',
        },
        'inses-red': {
          DEFAULT: '#B22234',
          dark: '#800020',
        },
      },
    },
  },
  plugins: [],
};

export default config;
