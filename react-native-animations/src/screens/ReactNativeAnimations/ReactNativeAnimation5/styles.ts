import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../assets/styles/colors";
const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#faf6f4",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
  },
});

export default styles;
