/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      'blue_light': '#00AFEF',
      'blue_intermediate': '#1D5A82',
      'blue_dark': '#262642',
      'pink_light': '#EC268F',
      'red_light': '#E02023',
    },
    fontSize: {
      xs: '0.8125rem',
      sm: '0.9375rem',
      df: '1rem',
      lg: '1.25rem',
      xl: '2rem',
    }
  },
  plugins: [],
}
