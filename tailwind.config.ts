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
        // Force RGB format instead of OKLAB for Turbopack compatibility
      },
    },
  },
  future: {
    // Désactiver OKLAB pour compatibilité avec html2pdf et Turbopack
    hoverOnlyWhenSupported: true,
  },
  experimental: {
    // Désactiver les fonctionnalités modernes de couleur
    optimizeUniversalDefaults: true,
  },
  corePlugins: {
    // Désactiver les plugins qui utilisent OKLAB
  },
  plugins: [],
} as any;

// Force legacy RGB color format for Tailwind v4 compatibility with Turbopack
if (typeof config === 'object') {
  (config as any).colorFormat = 'legacy';
}

export default config;
