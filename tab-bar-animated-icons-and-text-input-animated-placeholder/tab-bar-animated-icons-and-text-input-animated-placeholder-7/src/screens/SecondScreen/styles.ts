import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  searchInputContainter: {
    position: "relative",
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    height: 48, // bắt buộc có cho TextInputAnimatedPlaceholder
    paddingTop: 0,
    paddingLeft: 48,
    paddingRight: 16, // bắt buộc có cho TextInputAnimatedPlaceholder
    paddingBottom: 0,
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
  },
  textInput: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "400",
  },
  textPlaceholder: {
    // fontSize: 16,
    lineHeight: 20,
    fontWeight: "400",
    color: "gray",
  },
  searchInputSearchIcon: {
    width: 32,
    height: 32,
    resizeMode: "contain",
    position: "absolute",
    top: 8,
    left: 8,
    zIndex: 1,
  },
  clearInputAction: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 1,
  },
  clearInputActionIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});

export default styles;
