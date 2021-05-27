import { Dimensions } from "react-native";
const height = Dimensions.get("window").height;

export default {
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#eee"
  },
  countryRow: {
    position: "absolute",
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    top: "20%",
    left: "13%",
    right: "13%",
    height: "15%",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#ddd",
    elevation: 6,
    zIndex: 1
  },
  flagBuffer: {
    width: "5%"
  },
  flagBackground: {
    position: "absolute",
    height: height * 0.09,
    width: height * 0.09,
    borderRadius: (height * 0.09) / 2
  },
  flag: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    flex: 2,
    zIndex: 1
  },
  flagDimensions: {
    width: height * 0.06,
    height: height * 0.06
  },
  picker: {
    height: "50%",
    flex: 6
  },
  tipRow: {
    flex: 5
  },
  buffer: {
    height: "9%",
    backgroundColor: "white",
    elevation: 5
  },
  input: {
    flex: 1,
    fontSize: 30,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "white",
    elevation: 5
  },
  description: {
    flex: 5,
    marginTop: 10
  },
  errorText: {
    color: "#f00",
    fontSize: 25
  }
};
