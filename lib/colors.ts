// Palette de couleurs INSES (Nouvelle identité 2025)

export const colors = {
  // #D80536 - Rouge profond (couleur principale)
  crimson: {
    DEFAULT: '#D80536',
    light: '#EE2449',
    dark: '#B00429',
  },
  // #EE2449 - Rouge vif/rose
  rose: {
    DEFAULT: '#EE2449',
    light: '#FF4D6D',
    dark: '#D80536',
  },
  // #EDF2F4 - Blanc cassé/gris très clair
  pearl: {
    DEFAULT: '#EDF2F4',
    light: '#F8FAFB',
    dark: '#E1E8EB',
  },
  // #8D9AAE - Gris bleuté
  slate: {
    DEFAULT: '#8D9AAE',
    light: '#A8B5C9',
    dark: '#6B7892',
  },
  // #2B2E42 - Bleu marine foncé
  navy: {
    DEFAULT: '#2B2E42',
    light: '#3D4158',
    dark: '#1C1E2E',
  }
};

// Classes Tailwind personnalisées pour gradients
export const gradients = {
  primary: 'from-[#D80536] via-[#EE2449] to-[#2B2E42]',
  primaryReverse: 'from-[#2B2E42] via-[#D80536] to-[#EE2449]',
  dark: 'from-[#2B2E42] via-[#1C1E2E] to-[#2B2E42]',
  light: 'from-[#EDF2F4] to-white',
  crimsonNavy: 'from-[#D80536] to-[#2B2E42]',
  roseNavy: 'from-[#EE2449] to-[#2B2E42]',
  overlay: 'from-[#2B2E42]/90 to-[#D80536]/80',
};

