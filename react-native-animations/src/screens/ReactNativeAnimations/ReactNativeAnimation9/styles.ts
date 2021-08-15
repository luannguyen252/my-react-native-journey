import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../assets/styles/colors";
const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollViewContainer: {
    padding: 20,
  },
  featuredImage: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    marginRight: 20,
    borderRadius: 10,
  },
  bottomActions: {
    height: 80,
    backgroundColor: "rgba(255, 255, 255, 1)",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  image: {
    width: "100%",
    height: height * 0.4,
    resizeMode: "cover",
    marginBottom: 20,
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: "800",
    marginVertical: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 30,
  },
  paragraph: {
    flex: 1,
    marginBottom: 10,
    // fontFamily: 'Georgia'
    fontSize: 14,
    lineHeight: 16 * 1.5,
  },
  icon: {
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
