import { StyleSheet } from "react-native";
import colors from "../../assets/styles/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  buttonStyle: {
    backgroundColor: colors.orange600,
    padding: 8,
    marginTop: 32,
    minWidth: 250,
    borderRadius: 4,
  },
  buttonTextStyle: {
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
    textAlign: "center",
    color: colors.white,
  },
  imageStyle: {
    width: 150,
    height: 150,
    borderRadius: 6,
  },
});

export default styles;
