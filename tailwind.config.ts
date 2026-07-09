import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#020617',
        panel: '#0f172a',
        accent: '#38bdf8',
        accentSoft: '#0f4f8b',
      },
      boxShadow: {
        soft: '0 24px 80px rgba(15, 23, 42, 0.35)',
      },
      backgroundImage: {
        radial: 'radial-gradient(circle at top, rgba(56, 189, 248, 0.16), transparent 40%), radial-gradient(circle at 80% 20%, rgba(56, 189, 248, 0.08), transparent 25%)',
      },
    },
  },
  plugins: [],
};

export default config;
