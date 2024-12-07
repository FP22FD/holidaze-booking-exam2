/** @type {import('tailwindcss').Config} */

import { fontFamily } from 'tailwindcss/defaultTheme';

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        xxl: '1536px',
      },
      fontFamily: {
        sans: ['Poppins', ...fontFamily.sans], //Poppins as the default sans font
      },
      fontSize: {
        'display-1': ['3.75rem', { lineHeight: '1.1', fontWeight: '700' }], // 60px text-6xl
        'display-2': ['3rem', { lineHeight: '1.1', fontWeight: '700' }], // 48px text-5xl
        'heading-1': ['2.25rem', { lineHeight: '1.2', fontWeight: '700' }], // 36px text-4xl
        'heading-2': ['1.875rem', { lineHeight: '1.3', fontWeight: '700' }], // 30px text-3xl
        'heading-3': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }], // 24px text-2xl
        'heading-4': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }], // 20px text-xl
        'heading-5': ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }], // 18px text-lg
        'heading-6': ['1rem', { lineHeight: '1.5', fontWeight: '600' }], // 16px text-base

        'lead-paragraph': ['1.125rem', { lineHeight: '1.75', fontWeight: '400' }], // 18px text-lg

        'body-large': ['1rem', { lineHeight: '1.75', fontWeight: '400' }], // 16px text-base
        'body-normal': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }], // 14px text-sm
        'body-medium': ['0.875rem', { lineHeight: '1.75', fontWeight: '400' }], // 14px text-sm
        'body-small': ['0.75rem', { lineHeight: '1.5', fontWeight: '400' }], // 12px text-xs
      },
      spacing: {
        '2': '0.5rem', // 8px
        '4': '1rem', // 16px
        '6': '1.5rem', // 24px
        '8': '2rem', // 32px
        '10': '2.5rem', // 40px
        '12': '3rem', // 48px (new custom spacing)
        '16': '4rem', // 64px
        '20': '5rem', // 80px
        '24': '6rem', // 96px
        '32': '8rem', // 128px
      },
      colors: {
        // Main brand color
        main: {
          blue: '#215891', // Use for headers, primary buttons, navigation bar, and active states *
        },
        primary: {
          'dark-blue': '#101935', // Use for hero section background, footer, and secondary buttons *
          'light-blue': '#36A5E5', // Use for hover states, borders, and shadows on light sections *
        },
        accent: {
          pink: '#ff1464', // Use for small accents, badges, icons *
          pinkLight: 'rgba(254, 242, 242, 1)', // Use for hover effects, and alternative backgrounds
          // peach: '#FFEEA9', // Use for background highlights (testimonials, special offers) and card backgrounds
        },
        typography: {
          primary: {
            grey: '#5A5E60', // Use for body text, paragraph text, form labels, and modal backgrounds *
            white: '#FFFFFF', // Use for background page, cards, containers and also for text on dark backgrounds and buttons *
            blue: '#153A5B', // Use for body text, paragraph text, and form labels *
          },
          secondary: {
            black: '#212427', // Use for headings, subheadings, and strong contrast text *
          },
        },
        neutral: {
          white: '#FFFFFF', // Use white color for backgrounds, cards, containers, and text on dark backgrounds *
          default: '#E5E7EB', // Use grey color for borders, dividers, and input field backgrounds
          lighter: '#F9FAFB', // Use grey color for light section backgrounds and hover states
          light: '#E9ECEF', // Use grey color for light section backgrounds and hover states
          dark: '#ABB5BE', // Use grey color for secondary text or disabled elements
        },
        star: {
          bronze: '#C5832B', // Use for star icons in reviews or rating systems *
        },
        status: {
          success: {
            green: '#4D7C0F', // Use for success messages or positive action icons *
            'green-bg': '#D1E7DD', // Use for success notification backgrounds *
          },
          error: {
            red: '#B91C1C', // Use for error messages, form validation errors, and warning elements *
            'red-bg': '#F8D7DA', // Use for error notification backgrounds *
          },
        },
      },
      backgroundImage: {
        'pink-gradient': 'linear-gradient(to right, #FF1464, #EC1060)', // 600 + know
        'pink-gradient-dark': 'linear-gradient(to right, #D70049, #D70049)', // 700 + 700
        'blue-primary-dark': 'linear-gradient(to right, #153A5B, #101935)', // 700 + 700
        'auth-background': "url('/src/assets/images/auth-background.webp')", // Auth background image. Unsplash
      },
      boxShadow: {
        custom: '0 10px 20px rgba(194, 194, 194, 0.16)', // Custom shadow #C2C2C2
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        '@font-face': [
          {
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: '400',
            src: 'url("/src/assets/fonts/poppins/Poppins-Regular.ttf") format("TrueType")',
          },
          {
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: '500',
            src: 'url("/src/assets/fonts/poppins/Poppins-Medium.ttf") format("TrueType")',
          },
          {
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: '600',
            src: 'url("/src/assets/fonts/poppins/Poppins-SemiBold.ttf") format("TrueType")',
          },
          {
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: '700',
            src: 'url("/src/assets/fonts/poppins/Poppins-Bold.ttf") format("TrueType")',
          },
          {
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: '800',
            src: 'url("/src/assets/fonts/poppins/Poppins-ExtraBold.ttf") format("TrueType")',
          },
        ],
        h1: { fontFamily: 'Poppins, sans-serif' },
      });
    },
  ],
};
