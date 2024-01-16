import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        aside: '#F2EAE1',
        secondary: '#FEAF00',
        tertiary: '#C4C4C4',
        main: "#F8F8F8",
        line: '#E5E5E5',
        students: "#F0F9FF",
        course: "#FEF6FB",
        payments: "#FEFBEC",
        mainTitle: "#ACACAC",
        placeholder: "#CDCDCD",
        label: "#6C6C6C"
      },
    },
  },
  plugins: [],
};

export default config;
