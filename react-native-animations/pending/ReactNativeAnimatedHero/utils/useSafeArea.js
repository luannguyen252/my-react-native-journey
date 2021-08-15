import memoizeOne from "memoize-one";
import { Dimensions } from "react-native";
import { normalize } from "./normalizeSizes";

export const useSafeArea = memoizeOne((value, position = "top") => {
  const { height } = Dimensions.get("window");
  const hasHinge = height >= 812;
  if (hasHinge) {
    if (position === "top") {
      return normalize(value + 44);
    }
    if (position === "bottom") {
      return normalize(value + 34);
    }
  }
  return normalize(value);
});
