/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: [
        '"Inter"',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      petrona: ['Petrona', 'serif'],
      firaCode: ['Fira Code', 'monospace']
    },
    
    colors: {
      'storybook-default':{
        'heading' : '#111B29',
      },
      'discord':'#5865F2',

      'base': {
        '0': '#FFFFFF',
        '1000': '#000615',
        '10000':'#000000'
      },
      'neutral': {
        0: '#FFFFFF',
        50: '#F9FAFB',
        100: '#F3F4F6',
        150: '#ECEDF0',
        200: '#E5E7EB',
        300: '#D2D6DB',
        400: '#9DA4AE',
        500: '#6C737F',
        600: '#4D5761',
        700: '#384250',
        800: '#1F2A37',
        850: '#18222F',
        900: '#111927',
        950: '#0D1420',
        1000: '#000615',
      },

      'blue': {
        100: '#F0F4FF',
        200: '#DFE8FF',
        300: '#C6D6FF',
        400: '#80A3FF',
        500: '#3970FD',
        600: '#1E56E3',
        700: '#0D41C6',
        800: '#00288E',
        900: '#001C63',
      },

      'purple': {
        100: '#F7F2FF',
        200: '#EDE1FF',
        300: '#DBC6FF',
        400: '#B487FF',
        500: '#8C49FA',
        600: '#712BE3',
        700: '#5E13D7',
        800: '#3F01A6',
        900: '#29006B',
      },

      'cyan': {
        100: '#E3FAFF',
        200: '#C2F4FF',
        300: '#93ECFF',
        400: '#3ECAE8',
        500: '#0E96B2',
        600: '#04758D',
        700: '#005A6C',
        800: '#003945',
        900: '#00232B',
      },

      'green': {
        100: '#DAFFF4',
        200: '#B8FBE7',
        300: '#91F5D7',
        400: '#39DAAA',
        500: '#0EA578',
        600: '#027D59',
        700: '#006043',
        800: '#003C2B',
        900: '#00281D',
      },
      'pink': {
        100: '#FFEDF4',
        200: '#FFD9E7',
        300: '#FFBCD6',
        400: '#F677AA',
        500: '#E13A7C',
        600: '#C21E5F',
        700: '#A50A48',
        800: '#71002C',
        900: '#49001D',
        'meetup': '#F64060'
      },
      'amber': {
        100: '#FFF3D4',
        200: '#FFE4B0',
        300: '#FFCE70',
        400: '#FFA81B',
        500: '#E07900',
        600: '#B85800',
        700: '#993700',
        800: '#782400',
        900: '#471500',
      },
      'yellow': {
        100: '#FFF9C7',
        200: '#FFEF93',
        300: '#FFDF5A',
        400: '#FBCB3A',
        500: '#EBB230',
        600: '#CA8924',
        700: '#A1611A',
        800: '#854D18',
      },
      'orange': {
        100: '#FFEDD7',
        200: '#FED7AD',
        300: '#FDB97A',
        400: '#FB9147',
        500: '#F87229',
        600: '#E9571F',
        700: '#C14018',
        800: '#993418',
      },
      'red': {
        100: '#FEE2E2',
        200: '#FECACB',
        300: '#FBA5A6',
        400: '#F77173',
        500: '#EE4447',
        600: '#DB252B',
        700: '#B81B20',
        800: '#981A1E',
        
      },
    },
    letterSpacing: {
      tightest: '-.02em',
      tighter: '-.015em',
      tight: '-.01em',
      normal: '0',
      wide: '.01em',
      wider: '.05em',
      widest: '.1em',
    },

    lineHeight: {
      'leading-none': '1',
      'leading-tight': '1.1',
      'leading-snug':'1.2',
      'leading-normal':'1.3',
      'leading-relaxed':'1.4',
      'leading-loose':'1.5',
    },
    extend: {
      boxShadow: {
        'sh1': '0px -1px 3px rgba(28, 38, 63, 0.1), 0px -1px 2px rgba(28, 38, 63, 0.06)',
        'home-drop': '0px 10px 30px 0px rgba(0, 0, 0, 0.16)'
      },
      screens: {
        'mb-s': '360px',
        'mb-m':'400px',
        'tb': '600px',
        'tb-m': '800px',
        'tb-l': '905px',
        'tb-xl':'970px',
        'db-s':'1024px',
        'db': '1240px',
        'db-l': '2560px'
      },
      animation: {
        // Bounces 5 times 1s equals 5 seconds
        'bounce-short': 'bounce 1s ease-in-out 3'
      },
      fontSize: {
        //ToDo: convert them to rem
        // h1-style
        'hds-m-h1': ['3rem', {
          lineHeight: '1.25',
          letterSpacing: '-0.02em',
          fontWeight: '700',
        }],
        'hds-t-h1': ['3rem', {
          lineHeight: '1.25',
          letterSpacing: '-0.02em',
          fontWeight: '700',
        }],
        'hds-d-h1': ['4rem', {
          lineHeight: '1.125',
          letterSpacing: '-0.02em',
          fontWeight: '700',
        }],
        // add more for more breakpoints

        
        // h2-style
        'hds-m-h2': ['2.25rem', {
          lineHeight: '3rem',
          letterSpacing: '-0.02em',
          fontWeight: '700',
        }],
        'hds-t-h2': ['2.25rem', {
          lineHeight: '3rem',
          letterSpacing: '-0.02em',
          fontWeight: '700',
        }],
        'hds-d-h2': ['3rem', {
          lineHeight: '1.25',
          letterSpacing: '-0.02em',
          fontWeight: '700',
        }],
        // add more for more breakpoints

        // h3-style
        'hds-m-h3': ['1.875rem', {
          lineHeight: '2.5rem',
          letterSpacing: '-0.02em',
          fontWeight: '700',
        }],
        'hds-t-h3': ['1.875rem', {
          lineHeight: '2.5rem',
          letterSpacing: '-0.02em',
          fontWeight: '700',
        }],
        'hds-d-h3': ['2.25rem', {
          lineHeight: '3rem',
          letterSpacing: '-0.02em',
          fontWeight: '700',
        }],
        // add more for more breakpoints

        // h4-style
        'hds-m-h4': ['1.25rem', {
          lineHeight: '2rem',
          letterSpacing: '-0.02em',
          fontWeight: '600',
        }],
        'hds-t-h4': ['1.25rem', {
          lineHeight: '2rem',
          letterSpacing: '-0.02em',
          fontWeight: '600',
        }],
        'hds-d-h4': ['1.5rem', {
          lineHeight: '2.25rem',
          letterSpacing: '-0.02em',
          fontWeight: '600',
        }],
        // add more for more breakpoints

        // h5-style
        'hds-m-h5': ['1.125rem', {
          lineHeight: '1.75rem',
          letterSpacing: '-0.02em',
          fontWeight: '600',
        }],
        'hds-t-h5': ['1.125rem', {
          lineHeight: '1.75rem',
          letterSpacing: '-0.02em',
          fontWeight: '600',
        }],
        'hds-d-h5': ['1.25rem', {
          lineHeight: '2rem',
          letterSpacing: '-0.02em',
          fontWeight: '600',
        }],
        // add more for more breakpoints

        // h6-style
        'hds-m-h6': ['0.75rem', {
          lineHeight: '1.25rem',
          letterSpacing: '0.08em',
          fontWeight: '700',
        }],
        'hds-t-h6': ['0.75rem', {
          lineHeight: '1.25rem',
          letterSpacing: '0.08em',
          fontWeight: '700',
        }],
        'hds-d-h6': ['0.875', {
          lineHeight: '1.25',
          letterSpacing: '0.08em',
          fontWeight: '700',
        }],
        // add more for more breakpoints


        // h6-style
        'hds-m-h7': ['0.75rem', {
          lineHeight: '1.25rem',
          letterSpacing: '0.08em',
          fontWeight: '700',
        }],
        'hds-t-h7': ['0.75rem', {
          lineHeight: '1.25rem',
          letterSpacing: '0.08em',
          fontWeight: '700',
        }],
        'hds-d-h7': ['0.75', {
          lineHeight: '1.25',
          letterSpacing: '0.08em',
          fontWeight: '700',
        }],
        // add more for more breakpoints

        // sub-style
        'hds-m-sub1': ['1.25rem', {
          lineHeight: '2rem',
          letterSpacing: '-0.01em',
          fontWeight: '400',
        }],
        'hds-t-sub1': ['1.25rem', {
          lineHeight: '2rem',
          letterSpacing: '-0.01em',
          fontWeight: '400',
        }],
        'hds-d-sub1': ['1.5rem', {
          lineHeight: '2.25rem',
          letterSpacing: '-0.02em',
          fontWeight: '400',
        }],
        // add more for more breakpoints

        // sub2-style
        'hds-m-sub2': ['1.125rem', {
          lineHeight: '1.75rem',
          letterSpacing: '-0.01em',
          fontWeight: '400',
        }],
        'hds-t-sub2': ['1.125rem', {
          lineHeight: '1.75rem',
          letterSpacing: '-0.01em',
          fontWeight: '400',
        }],

        'hds-d-sub2': ['1.25rem', {
          lineHeight: '2rem',
          letterSpacing: '-0.01em',
          fontWeight: '400',
        }],
  
        // add more for more breakpoints

        // body1-style
        'hds-m-body1': ['0.938rem', {
          lineHeight: '1.625rem',
          letterSpacing: '-0.01em',
          fontWeight: '400',
        }],
        'hds-t-body1': ['1rem', {
          lineHeight: '1.75rem',
          letterSpacing: '-0.01em',
          fontWeight: '400',
        }],
        'hds-d-body1': ['1rem', {
          lineHeight: '1.75rem',
          letterSpacing: '-0.01em',
          fontWeight: '400',
        }],
        // add more for more breakpoints

        // body1-medium-style
        'hds-m-body1-medium': ['0.938rem', {
          lineHeight: '1.625rem',
          letterSpacing: '-0.01em',
          fontWeight: '500',
        }],
        'hds-t-body1-medium': ['1rem', {
          lineHeight: '1.75rem',
          letterSpacing: '-0.01em',
          fontWeight: '500',
        }],
        'hds-d-body1-medium': ['1rem', {
          lineHeight: '1.75rem',
          letterSpacing: '-0.01em',
          fontWeight: '500',
        }],
        // add more for more breakpoints
       
        // body1-semi-bold-style
        'hds-m-body1-semi-bold': ['0.938rem', {
          lineHeight: '1.625rem',
          letterSpacing: '-0.01em',
          fontWeight: '600',
        }],
        'hds-t-body1-semi-bold': ['1rem', {
          lineHeight: '1.75rem',
          letterSpacing: '-0.01em',
          fontWeight: '600',
        }],
        'hds-d-body1-semi-bold': ['1rem', {
          lineHeight: '1.75rem',
          letterSpacing: '-0.01em',
          fontWeight: '600',
        }],
        // add more for more breakpoints
       
        // body1-bold-style
        'hds-m-body1-bold': ['0.938rem', {
          lineHeight: '1.625rem',
          letterSpacing: '-0.01em',
          fontWeight: '700',
        }],
        'hds-t-body1-bold': ['1rem', {
          lineHeight: '1.75rem',
          letterSpacing: '-0.01em',
          fontWeight: '700',
        }],
        'hds-d-body1-bold': ['1rem', {
          lineHeight: '1.75rem',
          letterSpacing: '-0.01em',
          fontWeight: '700',
        }],
        // add more for more breakpoints
        
        //body1-compact-styles
        // body1-compact
        'hds-m-body1c': ['0.938rem', {
          lineHeight: '1.375rem',
          letterSpacing: '-0.01em',
          fontWeight: '400',
        }],
        'hds-t-body1c': ['1rem', {
          lineHeight: '1.5rem',
          letterSpacing: '-0.01em',
          fontWeight: '400',
        }],
        'hds-d-body1c': ['1rem', {
          lineHeight: '1.5rem',
          letterSpacing: '-0.01em',
          fontWeight: '400',
        }],
        // add more for more breakpoints

        // body1-compact-medium
        'hds-m-body1c-medium': ['0.938rem', {
          lineHeight: '1.375rem',
          letterSpacing: '-0.01em',
          fontWeight: '500',
        }],
        'hds-t-body1c-medium': ['1rem', {
          lineHeight: '1.5rem',
          letterSpacing: '-0.01em',
          fontWeight: '500',
        }],
        'hds-d-body1c-medium': ['1rem', {
          lineHeight: '1.5rem',
          letterSpacing: '-0.01em',
          fontWeight: '500',
        }],
        // add more for more breakpoints

        // body1-compact-semi-bold
        'hds-m-body1c-semi-bold': ['0.938rem', {
          lineHeight: '1.375rem',
          letterSpacing: '-0.01em',
          fontWeight: '600',
        }],
        'hds-t-body1c-semi-bold': ['1rem', {
          lineHeight: '1.5rem',
          letterSpacing: '-0.01em',
          fontWeight: '600',
        }],
        'hds-d-body1c-semi-bold': ['1rem', {
          lineHeight: '1.5rem',
          letterSpacing: '-0.01em',
          fontWeight: '600',
        }],
        // add more for more breakpoints

        // body1-compact-bold
        'hds-m-body1c-bold': ['0.938rem', {
          lineHeight: '1.375rem',
          letterSpacing: '-0.01em',
          fontWeight: '700',
        }],
        'hds-t-body1c-bold': ['1rem', {
          lineHeight: '1.5rem',
          letterSpacing: '-0.01em',
          fontWeight: '700',
        }],
        'hds-d-body1c-bold': ['1rem', {
          lineHeight: '1.5rem',
          letterSpacing: '-0.01em',
          fontWeight: '700',
        }],
        // add more for more breakpoints

        // body2-style
        'hds-m-body2': ['0.875rem', {
          lineHeight: '1.5rem',
          letterSpacing: '',
          fontWeight: '400',
        }],
        'hds-t-body2': ['0.938rem', {
          lineHeight: '1.625rem',
          letterSpacing: '-0.01em',
          fontWeight: '400',
        }],
        'hds-d-body2': ['0.938rem', {
          lineHeight: '1.625rem',
          letterSpacing: '-0.01em',
          fontWeight: '400',
        }],
        // add more for more breakpoints

        // body2-medium-style
        'hds-m-body2-medium': ['0.875rem', {
          lineHeight: '1.5rem',
          letterSpacing: '',
          fontWeight: '500',
        }],
        'hds-t-body2-medium': ['0.938rem', {
          lineHeight: '1.625rem',
          letterSpacing: '-0.01em',
          fontWeight: '500',
        }],
        'hds-d-body2-medium': ['0.938rem', {
          lineHeight: '1.625rem',
          letterSpacing: '-0.01em',
          fontWeight: '500',
        }],
        // add more for more breakpoints

        // body2-semi-bold-style
        'hds-m-body2-semi-bold': ['0.875rem', {
          lineHeight: '1.5rem',
          letterSpacing: '',
          fontWeight: '600',
        }],
        'hds-t-body2-semi-bold': ['0.938rem', {
          lineHeight: '1.625rem',
          letterSpacing: '-0.01em',
          fontWeight: '600',
        }],
        'hds-d-body2-semi-bold': ['0.938rem', {
          lineHeight: '1.625rem',
          letterSpacing: '-0.01em',
          fontWeight: '600',
        }],
        // add more for more breakpoints

        // body2-bold-style
        'hds-m-body2-bold': ['0.875rem', {
          lineHeight: '1.5rem',
          letterSpacing: '',
          fontWeight: '700',
        }],
        'hds-t-body2-bold': ['0.938rem', {
          lineHeight: '1.625rem',
          letterSpacing: '-0.01em',
          fontWeight: '700',
        }],
        'hds-d-body2-bold': ['0.938rem', {
          lineHeight: '1.625rem',
          letterSpacing: '-0.01em',
          fontWeight: '700',
        }],
        // add more for more breakpoints
        
        // body2-compact-styles
        'hds-m-body2c': ['0.875rem', {
          lineHeight: '1.25rem',
          letterSpacing: '',
          fontWeight: '400',
        }],
        'hds-t-body2c': ['0.938rem', {
          lineHeight: '1.375rem',
          letterSpacing: '-0.01em',
          fontWeight: '400',
        }],
        'hds-d-body2c': ['0.938rem', {
          lineHeight: '1.375rem',
          letterSpacing: '-0.01em',
          fontWeight: '400',
        }],
        // add more for more breakpoints

        // body2-compact-medium
        'hds-m-body2c-medium': ['0.875rem', {
          lineHeight: '1.25rem',
          letterSpacing: '',
          fontWeight: '500',
        }],
        'hds-t-body2c-medium': ['0.938rem', {
          lineHeight: '1.375rem',
          letterSpacing: '-0.01em',
          fontWeight: '500',
        }],
        'hds-d-body2c-medium': ['0.938rem', {
          lineHeight: '1.375rem',
          letterSpacing: '-0.01em',
          fontWeight: '500',
        }],
        // add more for more breakpoints

        // body2-compact-semi-bold
        'hds-m-body2c-semi-bold': ['0.875rem', {
          lineHeight: '1.25rem',
          letterSpacing: '',
          fontWeight: '600',
        }],
        'hds-t-body2c-semi-bold': ['0.938rem', {
          lineHeight: '1.375rem',
          letterSpacing: '-0.01em',
          fontWeight: '600',
        }],
        'hds-d-body2c-semi-bold': ['0.938rem', {
          lineHeight: '1.375rem',
          letterSpacing: '-0.01em',
          fontWeight: '600',
        }],
        // add more for more breakpoints

        // body2-compact-bold
        'hds-m-body2c-bold': ['0.875rem', {
          lineHeight: '1.25rem',
          letterSpacing: '',
          fontWeight: '700',
        }],
        'hds-t-body2c-bold': ['0.938rem', {
          lineHeight: '1.375rem',
          letterSpacing: '-0.01em',
          fontWeight: '700',
        }],
        'hds-d-body2c-bold': ['0.938rem', {
          lineHeight: '1.375rem',
          letterSpacing: '-0.01em',
          fontWeight: '700',
        }],
        // add more for more breakpoints

        // body3-style
        'hds-m-body3': ['0.875rem', {
          lineHeight: '1.5rem',
          letterSpacing: '',
          fontWeight: '400',
        }],
        'hds-t-body3': ['0.875rem', {
          lineHeight: '1.5rem',
          letterSpacing: '',
          fontWeight: '400',
        }],
        'hds-d-body3': ['0.875rem', {
          lineHeight: '1.5rem',
          letterSpacing: '',
          fontWeight: '400',
        }],
        // add more for more breakpoints

        // body3-medium-style
        'hds-m-body3-medium': ['0.875rem', {
          lineHeight: '1.5rem',
          letterSpacing: '',
          fontWeight: '500',
        }],
        'hds-t-body3-medium': ['0.875rem', {
          lineHeight: '1.5rem',
          letterSpacing: '',
          fontWeight: '500',
        }],
        'hds-d-body3-medium': ['0.875rem', {
          lineHeight: '1.5rem',
          letterSpacing: '',
          fontWeight: '500',
        }],
        // add more for more breakpoints

         // body3-semi-bold-style
         'hds-m-body3-semi-bold': ['0.875rem', {
          lineHeight: '1.5rem',
          letterSpacing: '',
          fontWeight: '600',
        }],
        'hds-t-body3-semi-bold': ['0.875rem', {
          lineHeight: '1.5rem',
          letterSpacing: '',
          fontWeight: '600',
        }],
        'hds-d-body3-semi-bold': ['0.875rem', {
          lineHeight: '1.5rem',
          letterSpacing: '',
          fontWeight: '600',
        }],
        // add more for more breakpoints

        // body3-bold-style
        'hds-m-body3-bold': ['0.875rem', {
          lineHeight: '1.5rem',
          letterSpacing: '',
          fontWeight: '700',
        }],
        'hds-t-body3-bold': ['0.875rem', {
          lineHeight: '1.5rem',
          letterSpacing: '',
          fontWeight: '700',
        }],
        'hds-d-body3-bold': ['0.875rem', {
          lineHeight: '1.5rem',
          letterSpacing: '',
          fontWeight: '700',
        }],
        // add more for more breakpoints

         // body3-compact
         'hds-m-body3c': ['0.875rem', {
          lineHeight: '1.25rem',
          letterSpacing: '',
          fontWeight: '400',
        }],
        'hds-t-body3c': ['0.875rem', {
          lineHeight: '1.25rem',
          letterSpacing: '',
          fontWeight: '400',
        }],
        'hds-d-body3c': ['0.875rem', {
          lineHeight: '1.25rem',
          letterSpacing: '',
          fontWeight: '400',
        }],
        // add more for more breakpoints

         // body3-compact-medium
         'hds-m-body3c-medium': ['0.875rem', {
          lineHeight: '1.25rem',
          letterSpacing: '',
          fontWeight: '500',
        }],
        'hds-t-body3c-medium': ['0.875rem', {
          lineHeight: '1.25rem',
          letterSpacing: '',
          fontWeight: '500',
        }],
        'hds-d-body3c-medium': ['0.875rem', {
          lineHeight: '1.25rem',
          letterSpacing: '',
          fontWeight: '500',
        }],
        // add more for more breakpoints

         // body3-compact-semi-bold
         'hds-m-body3c-semi-bold': ['0.875rem', {
          lineHeight: '1.25rem',
          letterSpacing: '',
          fontWeight: '600',
        }],
        'hds-t-body3c-semi-bold': ['0.875rem', {
          lineHeight: '1.25rem',
          letterSpacing: '',
          fontWeight: '600',
        }],
        'hds-d-body3c-semi-bold': ['0.875rem', {
          lineHeight: '1.25rem',
          letterSpacing: '',
          fontWeight: '600',
        }],
        // add more for more breakpoints

         // body3-compact-bold
         'hds-m-body3c-bold': ['0.875rem', {
          lineHeight: '1.25rem',
          letterSpacing: '',
          fontWeight: '700',
        }],
        'hds-t-body3c-bold': ['0.875rem', {
          lineHeight: '1.25rem',
          letterSpacing: '',
          fontWeight: '700',
        }],
        'hds-d-body3c-bold': ['0.875rem', {
          lineHeight: '1.25rem',
          letterSpacing: '',
          fontWeight: '700',
        }],
        // add more for more breakpoints

        // quote-style
        'hds-m-quote': ['1.125rem', {
          lineHeight: '1.75rem',
          letterSpacing: '-0.01em',
          fontWeight: '400',
          fontStyle: 'italic',
        }],
        'hds-t-quote': ['1.125rem', {
          lineHeight: '1.75rem',
          letterSpacing: '-0.01em',
          fontWeight: '400',
          fontStyle: 'italic',
        }],
        'hds-d-quote': ['1.5rem', {
          lineHeight: '2.25rem',
          letterSpacing: '-0.01em',
          fontWeight: '400',
          fontStyle: 'italic',
        }],
        // add more for more breakpoints

        // code1-style
        'hds-m-code1': ['0.938rem', {
          lineHeight: '1.625rem',
          letterSpacing: '-0.01em',
          fontWeight: '450',
        }],
        'hds-t-code1': ['1rem', {
          lineHeight: '1.75rem',
          letterSpacing: '-0.01em',
          fontWeight: '400',
        }],
        'hds-d-code1': ['1rem', {
          lineHeight: '1.75rem',
          letterSpacing: '-0.01em',
          fontWeight: '400',
        }],
        // add more for more breakpoints

        // code2-style
        'hds-m-code2': ['0.875rem', {
          lineHeight: '1.5rem',
          letterSpacing: '',
          fontWeight: '450',
        }],
        'hds-t-code2': ['0.938rem', {
          lineHeight: '1.625rem',
          letterSpacing: '-0.01em',
          fontWeight: '400',
        }],
        'hds-d-code2': ['0.938rem', {
          lineHeight: '1.625rem',
          letterSpacing: '-0.01em',
          fontWeight: '400',
        }],
        // add more for more breakpoints

      },
    }
  },
  variants: {
    fill: ['hover', 'focus'], // this line does the trick
  },
}