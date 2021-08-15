// @flow
import { Dimensions, Easing } from "react-native";

const defaultWidth = Dimensions.get("window").width;

export default {
  defaultWidth,
  defaultHeight: defaultWidth,
  defaultInnerRadius: 0,
  defaultColors: [
    "#c23531",
    "#2f4554",
    "#61a0a8",
    "#d48265",
    "#91c7ae",
    "#749f83",
    "#ca8622",
    "#bda29a",
    "#6e7074",
    "#546570",
    "#c4ccd3"
  ],
  defaultDuration: 1000,
  defaultDelay: 0,
  defaultEasing: Easing.out(Easing.cubic)
};
