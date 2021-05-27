import React from "react";
import { StyleSheet } from "react-native";

const flexboxview1_style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-end",
    flexDirection: "column-reverse",
    flexWrap: "nowrap",
    backgroundColor: "#8ed1fc",
  },
  text1: {
    flex: -1,
    fontSize: 20,
    fontWeight: "900",
    fontFamily: "Rubik-Regular",
    backgroundColor: "#00d084",
    margin: 16,
    padding: 16,
  },
  text2: {
    flex: -1,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Rubik-Regular",
    color: "#c4def6",
    backgroundColor: "#1273de",
    margin: 16,
    padding: 16,
  },
  text3: {
    flex: 1,
    fontSize: 12,
    fontWeight: "200",
    fontFamily: "Rubik-Regular",
    color: "#697689",
    backgroundColor: "#d4c4fb",
    margin: 16,
    padding: 16,
  },
});

const flexboxview2_style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    flexDirection: "column",
    overflow: "visible",
    flexWrap: "wrap",
    backgroundColor: "#8ed1fc",
  },
  img_static: {
    flex: 1,
    width: undefined,
    height: 150,
    resizeMode: "cover",
  },
  img_network: {
    flex: 1,
    resizeMode: "contain",
  },
  text1: {
    flex: -1,
    alignSelf: "flex-end",
    fontSize: 20,
    fontWeight: "900",
    fontFamily: "Rubik-Regular",
    backgroundColor: "#00d084",
    margin: 16,
    padding: 16,
  },
  text2: {
    flex: -1,
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Rubik-Regular",
    color: "#c4def6",
    backgroundColor: "#1273de",
    margin: 16,
    padding: 16,
  },
  text3: {
    flex: -1,
    fontSize: 12,
    fontWeight: "200",
    fontFamily: "Rubik-Regular",
    color: "#697689",
    backgroundColor: "#d4c4fb",
    margin: 16,
    padding: 16,
  },
  text4: {
    color: "#1273de",
    backgroundColor: "rgba(212, 196, 251, 0.5)",
    fontSize: 12,
    fontWeight: "200",
    fontFamily: "Rubik-Regular",
    padding: 16,
  },
});

const router_style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c1e1c5",
  },
  text1: {
    flex: -1,
    color: "#1273de",
    backgroundColor: "#d4c4fb",
    fontSize: 18,
    fontWeight: "200",
    fontFamily: "Rubik-Regular",
    padding: 16,
  },
});

const mainview_style = StyleSheet.create({
  v_container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c1e1c5",
  },
  welcome: {
    flex: -1,
    fontSize: 20,
    color: "#006b7699",
    fontFamily: "Rubik-Regular",
    fontWeight: "500",
    margin: 8,
  },
  instructions: {
    flex: -1,
    margin: 8,
    fontFamily: "Rubik-Regular",
    fontSize: 12,
    color: "rgba(33, 150, 243, 0.6)",
  },
  h_container: {
    flex: -1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "stretch",
    backgroundColor: "#fef3bd",
    padding: 16,
  },
  image: {
    flex: -1,
    margin: 8,
    height: 100,
    width: 75,
    resizeMode: "contain",
  },
  image2: {
    flex: -1,
    height: 100,
    width: 150,
    resizeMode: "contain",
  },
});

function mainview_style_image(width: number, height: number) {
  return StyleSheet.create({
    imageSize: {
      width: width,
      height: height,
    },
    padding: {
      marginTop: 8,
    },
  });
}

export {
  mainview_style,
  mainview_style_image,
  flexboxview1_style,
  flexboxview2_style,
  router_style,
};
