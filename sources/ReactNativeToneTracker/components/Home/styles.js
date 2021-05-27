import colors from "../../colors";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;

export default {
  parent: {
    height: "100%",
    backgroundColor: colors.lessWhite
  },
  fab: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: (width * 0.2) / 2
  },
  fabSlideAnimationWrapper: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: "6%",
    right: "7%",
    borderRadius: (width * 0.2) / 2,
    elevation: 10
  },
  fabPulseAnimationWrapper: {
    backgroundColor: colors.primary,
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: (width * 0.2) / 2
  }
};
