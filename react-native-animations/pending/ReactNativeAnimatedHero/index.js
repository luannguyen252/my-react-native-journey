import React from "react";
import Screen from "./components/Screen";
import Text from "./components/Text";
import SampleContent from "./components/SampleContent";
import NavigationSample from "./components/NavigationSample";

const HERO_IMAGE = require("./assets/sample.jpg");

const ReactNativeAnimatedHero = () => (
  <Screen
    navigationTitle="Screen title which spans in multiple lines"
    navigation={<NavigationSample />}
    heroImageUrl={HERO_IMAGE}
    heroContent={
      <Text size={30} color="#fff" align="center">
        Screen title which spans in multiple lines
      </Text>
    }
  >
    <SampleContent />
  </Screen>
);

export default ReactNativeAnimatedHero;
