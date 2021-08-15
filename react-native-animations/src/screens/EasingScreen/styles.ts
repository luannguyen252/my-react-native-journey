import { StyleSheet } from "react-native";
import colors from "../../assets/styles/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.coolGray900,
  },
  title: {
    marginTop: 10,
    textAlign: "center",
    color: colors.orange100,
  },
  boxContainer: {
    height: 160,
    alignItems: "center",
  },
  box: {
    marginTop: 32,
    borderRadius: 4,
    backgroundColor: colors.orange500,
  },
  list: {
    backgroundColor: colors.white,
  },
  listHeader: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: colors.coolGray100,
    color: colors.coolGray500,
    fontSize: 12,
    textTransform: "uppercase",
  },
  listRow: {
    padding: 8,
  },
});

export default styles;
