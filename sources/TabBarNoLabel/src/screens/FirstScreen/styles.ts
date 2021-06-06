import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {},
  cardContainer: {
    width: windowWidth / 3,
    height: 200,
    marginRight: 16,
    borderRadius: 12,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    position: "absolute",
    zIndex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
});

export default styles;
