import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: 30,
    flexGrow: 1,
  },
  square: {
    flexDirection: "column",
    height: 200,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
  },
  squareText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
    textAlign: "center",
    height: 20,
  },
});

export default styles;
