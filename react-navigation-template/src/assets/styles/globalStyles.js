import { StyleSheet } from "react-native";
import colors from "./colors";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
    color: colors.coolGray900,
  },
  title: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "700",
    color: colors.coolGray900,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  subTitle: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "700",
    color: colors.coolGray900,
  },
});

export default globalStyles;
