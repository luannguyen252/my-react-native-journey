import { createTheme, createText, createBox } from '@shopify/restyle';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const theme = createTheme({
  colors: {
    primary: '#181059',
    secondary: '#F5F5F9',
    white: '#FFFFFF',
    dark: '#1A1A1A',
    text: '#757575',
    veryLightPurple: '#ABA3CF',
    purple: '#7a33ff',
    yellow: '#FDCA00',
    red: '#F44336',
    green: '#4CD964',
    lightGrey: '#ABABAC',
  },
  constants: {
    screenPadding: 40,
    screenWidth: width - 40,
  },
  spacing: {
    s: 5,
    m: 10,
    l: 15,
    xl: 20,
    xxl: 30,
    xxxl: 40,
  },
  borderRadii: {
    none: 0,
    s: 5,
    m: 10,
    l: 15,
    xl: 20,
  },
  textVariants: {
    h1Max: {
      fontSize: 32,
      fontFamily: 'SofiaPro-Bold',
    },
    h1: {
      fontSize: 28,
      fontFamily: 'SofiaPro-Bold',
    },
    h1M: {
      fontSize: 28,
      fontFamily: 'SofiaPro-Medium',
    },
    h2: {
      fontSize: 22,
      fontFamily: 'SofiaPro-Medium',
    },
    h2B: {
      fontSize: 22,
      fontFamily: 'SofiaPro-Bold',
    },
    h3: {
      fontSize: 20,
      fontFamily: 'SofiaPro-Medium',
    },
    b1: {
      fontSize: 17,
      fontFamily: 'SofiaPro-Medium',
    },
    b1B: {
      fontSize: 17,
      fontFamily: 'SofiaPro-Bold',
    },
    b2: {
      fontSize: 15,
      fontFamily: 'SofiaPro-Regular',
    },
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
});

export type Theme = typeof theme;
export const Text = createText<Theme>();
export const Box = createBox<Theme>();
export default theme;
