import store from "./store";
import { Alert } from "react-native";

const commonColors = {
  good: "#32cd32",
  dull: "#ffa500",
  rusty: "#dc143c",
  notQuiteBlack: "#111",
  notQuiteWhite: "#eee"
};

const normal = {
  //blue highlights
  primary: "#42a5f5",
  light: "#80d6ff",
  dark: "#0077c2",
  //whites
  white: "#fff",
  lessWhite: "#eee",
  evenLessWhite: "#ccc",
  ...commonColors
};

const nightShade = {
  //red highlights
  primary: "#b71c1c",
  light: "#f05545",
  dark: "#7f0000",
  //darks
  lightDark: "#263238",
  mediumDark: "#4f5b62",
  darkDark: "#1c2226",
  ...commonColors
};

export default normal;
// export default (store.getState().theme === "normal" ? normal : nightShade);
