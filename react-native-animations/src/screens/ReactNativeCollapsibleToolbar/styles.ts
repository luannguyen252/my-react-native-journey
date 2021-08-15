import { StyleSheet } from "react-native";
import colors from "../../assets/styles/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    right: 0,
  },
  headerText: {
    color: colors.white,
    fontSize: 18,
    lineHeight: 24,
    textAlign: "center",
  },
  textStyle: {
    textAlign: "center",
    color: colors.coolGray900,
    fontSize: 18,
    lineHeight: 24,
    padding: 16,
  },
});

export default styles;
