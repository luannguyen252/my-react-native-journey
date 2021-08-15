import { createTheme, createText, createBox } from '@shopify/restyle';

const palette = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',

  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  black: '#0B0B0B',
  white: '#F0F2F3',
};

const theme = createTheme({
  colors: {
    primary: '#2CB9B0',
    white: 'white',
    secondary: '#0C0D34',
    danger: '#FF0058',
    text: 'rgba(12, 13, 52, 0.7)',
    grey: '#F4F0EF',
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  borderRadii: {
    none: 0,
    s: 4,
    m: 10,
    l: 25,
    xl: 75,
  },
  textVariants: {
    hero: {
      fontSize: 80,
      lineHeight: 80,
      fontFamily: 'SFProDisplay-Bold',
      color: 'white',
    },
    title1: {
      fontSize: 28,
      fontFamily: 'SFProDisplay-Semibold',
      color: 'secondary',
    },
    title2: {
      fontSize: 24,
      lineHeight: 30,
      fontFamily: 'SFProDisplay-Semibold',
      color: 'secondary',
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: 'SFProDisplay-Regular',
      color: 'secondary',
    },
    button: {
      fontSize: 15,
      fontFamily: 'SFProDisplay-Medium',
      color: 'text',
    },
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
});

export type Theme = typeof theme;
export const Box = createBox<Theme>();
export const Text = createText<Theme>();
export default theme;
