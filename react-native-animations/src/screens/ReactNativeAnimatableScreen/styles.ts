import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  fruitContainerFadeInUp: {
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
    flexDirection: "column",
  },
  fruitItemFadeInUp: {
    width: windowWidth - 32,
    height: windowWidth / 5,
    borderRadius: 8,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  fruitContainerSlideInRight: {
    marginTop: 16,
    marginLeft: 16,
    marginRight: 0,
    marginBottom: 16,
    flexDirection: "row",
  },
  fruitItemSlideInRight: {
    width: windowWidth / 4,
    height: windowWidth,
    borderRadius: 8,
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
