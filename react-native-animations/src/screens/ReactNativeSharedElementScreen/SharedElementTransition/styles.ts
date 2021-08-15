import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../assets/styles/colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.white,
  },
  color: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  colorContainer: {
    flexDirection: "row",
    marginBottom: 16,
    justifyContent: "space-evenly",
  },
  name: {
    color: colors.coolGray900,
    marginBottom: 16,
    fontSize: 16,
    fontWeight: "700",
  },
  fruit: {
    width: windowWidth - 32,
    height: 100,
    borderRadius: 8,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  fruitName: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
});

export default styles;
