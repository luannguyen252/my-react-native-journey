import memoizeOne from "memoize-one";
import { Dimensions, Platform, PixelRatio } from "react-native";

export const normalize = memoizeOne((size) => {
  const { width: SCREEN_WIDTH } = Dimensions.get("window");

  // Based on iPhone 5S scale
  const scale = SCREEN_WIDTH / 320;

  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }

  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
});
