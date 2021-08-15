import React, { useState } from "react";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";
import LoginScreen from "./LoginScreen";

export default function ReactNativeAnimatedLoginScreen() {
  const [isReady, setIsReady] = useState(false);

  const cacheResourcesAsync = async () => {
    const images = [require("./46.jpg")];

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });

    return Promise.all([cacheImages]);
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={() => cacheResourcesAsync()}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return <LoginScreen></LoginScreen>;
}
