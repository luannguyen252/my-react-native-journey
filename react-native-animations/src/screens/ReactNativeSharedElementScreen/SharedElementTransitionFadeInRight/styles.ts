import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../assets/styles/colors";
const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollViewContainer: {},
  item: {
    height: 120,
    borderRadius: 12,
    marginTop: 16,
    marginLeft: 16,
    marginRight: 0,
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
    backgroundColor: colors.orange100,
    overflow: "hidden",
  },
  image: {
    height: 120,
    width: "100%",
    resizeMode: "center",
    position: "absolute",
    bottom: 16,
    right: "-40%",
  },
  bgBox: {
    width: width / 4,
    height: width / 3,
    marginRight: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 8,
  },
  bgBoxLarge: {
    width: width / 3,
    height: width / 2,
  },
  bgBoxSmall: {
    width: width / 4.1,
    height: width / 1.75,
  },
  txtBox: {
    fontWeight: "700",
    textAlign: "center",
  },
});

export default styles;
