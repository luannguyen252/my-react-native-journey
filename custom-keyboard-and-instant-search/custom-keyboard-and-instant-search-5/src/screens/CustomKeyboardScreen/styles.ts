import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  bottomSheetHeaderAvatarContainer: {
    alignItems: "center",
  },
  bottomSheetHeaderAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: "#F4F4F4",
  },
  bottomSheetHeaderName: {
    paddingTop: 8,
    color: "#222222",
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "700",
  },
  enterYourMoneyContainer: {
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  moneyText: {
    color: "#222222",
    fontSize: 48,
    lineHeight: 58,
    fontWeight: "700",
  },
  moneyPlaceholder: {
    color: "#E9E9E9",
    fontSize: 48,
    lineHeight: 58,
    fontWeight: "700",
  },
  moneyBarSuggestionContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F4F4",
    height: 48,
  },
  moneyBarSuggestionItem: {
    width: "33.3%",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  moneyBarSuggestionAmount: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "500",
  },
  buttonPrimaryContainer: {
    width: windowWidth - 32,
    height: 48,
    marginBottom: 16,
    backgroundColor: "#EE0033",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonPrimaryText: {
    color: "#ffffff",
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "500",
    paddingLeft: 16,
    paddingRight: 16,
  },
  customKeyboardNumericContainer: {
    marginTop: 24,
    marginBottom: 24,
  },
  numPadContainer: {
    width: "33.33%",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  numPadText: {
    color: "#222222",
    fontSize: 22,
    lineHeight: 26,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default styles;
