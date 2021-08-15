import { ViewStyle, TextStyle, Dimensions, StyleSheet } from "react-native";
const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");

interface Style {
  bottomContainer: ViewStyle;
  backgroundStyle: ViewStyle;
  footnoteTextStyle: TextStyle;
  topHeaderContainer: ViewStyle;
  smallTitleTextStyle: TextStyle;
  largeTitleTextStyle: TextStyle;
}

export function _shadowStyle(shadowColor) {
  return {
    shadowColor,
    shadowRadius: 12,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 8,
    },
  };
}

export default StyleSheet.create<Style>({
  backgroundStyle: {
    borderRadius: 12,
    width: ScreenWidth - 32,
    height: ScreenHeight * 0.5,
  },
  topHeaderContainer: {
    margin: 16,
    width: ScreenWidth * 0.7,
  },
  smallTitleTextStyle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
    textTransform: "uppercase",
    color: "#ebe8f9",
    opacity: 0.8,
  },
  largeTitleTextStyle: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "bold",
    color: "#fffdfe",
    opacity: 0.9,
  },
  bottomContainer: {
    left: 16,
    bottom: 16,
    width: "90%",
    position: "absolute",
  },
  footnoteTextStyle: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "400",
    color: "#fffdfe",
  },
});
