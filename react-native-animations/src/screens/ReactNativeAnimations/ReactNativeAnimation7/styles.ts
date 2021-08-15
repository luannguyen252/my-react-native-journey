import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../assets/styles/colors";

const { width, height } = Dimensions.get("screen");
const imageW = width * 0.7;
const imageH = imageW * 1.54;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  itemContainer: {
    width,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 20,
  },
  itemImage: {
    width: imageW,
    height: imageH,
    resizeMode: "cover",
    borderRadius: 16,
  },
});

export default styles;
