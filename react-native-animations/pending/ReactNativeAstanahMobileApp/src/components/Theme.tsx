import { createTheme, createText, createBox } from "@shopify/restyle";

const theme = createTheme({
  colors: {
    primary: "#085827",
    secondary: "#c0ce65",
    white: "#ffff",
    dark: "#223263",
    grey: "#9098B1",
    light: "#ebf0ff",
    red: "#FF0058",
    yellow: "#FFC833",
    black: "#000",
  },
  spacing: {
    s: 5,
    m: 10,
    l: 15,
    xl: 20,
  },
  borderRadii: {
    none: 0,
    s: 5,
    m: 10,
    l: 15,
    xl: 20,
  },
  textVariants: {
    h1: {
      fontSize: 32,
      fontFamily: "Poppins-Bold",
      letterSpacing: 0.5,
    },
    h2: {
      fontSize: 24,
      fontFamily: "Poppins-Bold",
      letterSpacing: 1.5,
    },
    h3: {
      fontSize: 20,
      fontFamily: "Poppins-Bold",
      letterSpacing: 0.5,
    },
    h4: {
      fontSize: 16,
      fontFamily: "Poppins-Bold",
      letterSpacing: 0.5,
    },
    h5: {
      fontSize: 14,

      fontFamily: "Poppins-Bold",
      letterSpacing: 0.5,
    },
    h6: {
      fontSize: 10,
      fontFamily: "Poppins-Bold",
      letterSpacing: 0.5,
    },
    b1: {
      fontSize: 16,

      fontFamily: "Poppins-Regular",
      letterSpacing: 0.5,
    },
    b2: {
      fontSize: 14,

      fontFamily: "Poppins-Regular",
      letterSpacing: 0.5,
    },
    b3: {
      fontSize: 12,

      fontFamily: "Poppins-Regular",
      letterSpacing: 0.5,
    },
    b3B: {
      fontSize: 12,

      fontFamily: "Poppins-Bold",
      letterSpacing: 0.5,
    },
    b4: {
      fontSize: 10,

      fontFamily: "Poppins-Regular",
      letterSpacing: 0.5,
    },
    button: {
      fontSize: 14,
      fontFamily: "Poppins-Bold",
      letterSpacing: 0.5,
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
