import Dimensions from "Dimensions";

import { StyleSheet } from "react-native";

const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const ratioX = x < 375 ? (x < 320 ? 0.75 : 0.875) : 1;
const ratioY = y < 568 ? (y < 480 ? 0.75 : 0.875) : 1;

const base_unit = 16;

const unit = base_unit * ratioX;

function em(value) {
  return unit * value;
}

export default StyleSheet.create({
  menuIcon: {},

  container: {
    flex: 1,
    justifyContent: "center",
  },
  navBar: {
    backgroundColor: "#BD5026",
  },
  navBarText: {
    color: "white",
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    fontWeight: "500",
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    padding: 10,
    paddingTop: 5,
  },
  scene: {
    flex: 1,
    paddingTop: 63,
  },
});
