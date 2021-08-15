import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../../assets/styles/colors";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingTop: 16,
  },
  button: {
    width: windowWidth - 32,
    height: 56,
    borderRadius: 8,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EE0033",
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
    color: colors.white,
  },
  card: {
    width: "80%",
    aspectRatio: 1.5,
    borderRadius: 8,
    overflow: "hidden",
    alignSelf: "center",
    backgroundColor: colors.coolGray100,
  },
  cardAbsView: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    position: "absolute",
    justifyContent: "flex-end",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.coolGray900,
  },
  imageWrapper: {
    width: "100%",
    height: "100%",
  },
  image: {
    flex: 1,
    width: null,
    height: null,
  },
});

export default styles;
