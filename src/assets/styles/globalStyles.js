import { StyleSheet } from "react-native";
import tokens from "./tokens";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.color.tokenWhite,
  },
  bodyText: {
    fontSize: tokens.typography.tokenFontSize16,
    lineHeight: tokens.typography.tokenLineHeight24,
    fontWeight: tokens.typography.tokenFontSizeRegular,
    color: tokens.color.tokenDark,
  },
  footnoteText: {
    fontSize: tokens.typography.tokenFontSize12,
    lineHeight: tokens.typography.tokenLineHeight16,
    fontWeight: tokens.typography.tokenFontSizeRegular,
    color: tokens.color.tokenDark,
  },
  title: {
    fontSize: tokens.typography.tokenFontSize32,
    lineHeight: tokens.typography.tokenLineHeight40,
    fontWeight: tokens.typography.tokenFontSizeBold,
    color: tokens.color.tokenDark,
    paddingTop: tokens.spacing.tokenSpacing16,
    paddingLeft: tokens.spacing.tokenSpacing16,
    paddingRight: tokens.spacing.tokenSpacing16,
    paddingBottom: tokens.spacing.tokenSpacing16,
  },
  subTitle: {
    fontSize: tokens.typography.tokenFontSize24,
    lineHeight: tokens.typography.tokenLineHeight32,
    fontWeight: tokens.typography.tokenFontSizeBold,
    color: tokens.color.tokenDark,
  },
});

export default globalStyles;
