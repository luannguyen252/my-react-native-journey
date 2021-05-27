import "@expo/match-media";
import { useMediaQuery } from "react-responsive";

export default function ReactNativeMediaQueries() {
  const isTabletOrMobileDevice = useMediaQuery({
    maxDeviceWidth: 1224,
    query: "(max-device-width: 1224px)",
  });

  if (isTabletOrMobileDevice) {
    return <Text>Hi Mobile Users 👋</Text>;
  }

  return <Text>👋 Hello Desktop People</Text>;
}
