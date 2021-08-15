import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../assets/styles/colors";
const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default styles;
