import React, { useRef } from "react";
import { Text, Image, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import Link from "./Link";
import { useHover } from "react-native-web-hooks";

const IMG_SIZE = 128;

export default function App() {
  const ref = useRef(null);
  const { isHovered } = useHover(ref);

  return (
    <View style={[styles.container, { flexDirection: "row" }]}>
      <Image
        draggable={false}
        ref={ref}
        source={{
          uri: "https://avatars3.githubusercontent.com/u/9664363?s=460&v=4",
        }}
        style={[
          {
            cursor: "pointer",
            width: IMG_SIZE,
            height: IMG_SIZE,
            borderRadius: IMG_SIZE / 2,
            transitionDuration: "1s",
          },
          isHovered && { transform: [{ rotate: "1080deg" }] },
        ]}
      />
      <View>
        <Link style={styles.paragraph}>Expo web Pseudo-Classes</Link>
        <Link href="https://twitter.com/baconbrix">
          {"Share if you found this helpful 👏"}
        </Link>
        <Link href="https://github.com/EvanBacon/react-native-web-hooks">
          {"Star the repo ⭐️"}
        </Link>
        <Link href="http://saiyan.netlify.com">{"Make cool websites 😍"}</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#4630EB",
    padding: 8,
  },
  paragraph: {
    marginLeft: 24,
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    // textAlign: 'center',
  },
});
