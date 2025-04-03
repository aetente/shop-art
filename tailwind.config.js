/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    keyframes: {
      'bounce2': {
        '0%': {
          transform: 'translateY(-75%)',
          'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)'
        },
        '50%': {
          transform: 'none',
          'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)'
        },
        '100%': {
          transform: 'translateY(-75%)',
          'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)'
        }
      }
    },
    animation: {
      'better-bounce': 'bounce2 1s infinite',
    },
    fontFamily: {
      sansCondensed: ['var(--font-sans-condensed) !important'],
      sansCondensedBold: ['var(--font-sans-condensed-bold) !important'],
      openSans: ['var(--font-open-sans)'],
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'animate-delay': (value) => ({
            animationDelay: value,
          }),
        },
        { values: theme('transitionDelay') }
      )
    }),
  ],
}
