import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import ParallaxScrollView from "react-native-parallax-scroll-view";

export default class ReactNativeParallaxScrollViewExample1 extends PureComponent {
  render() {
    return (
      <ParallaxScrollView
        backgroundColor="blue"
        contentBackgroundColor="pink"
        parallaxHeaderHeight={300}
        renderForeground={() => (
          <View
            style={{
              height: 300,
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>Hello World!</Text>
          </View>
        )}
      >
        <View style={{ height: 500 }}>
          <Text>Scroll me</Text>
        </View>
      </ParallaxScrollView>
    );
  }
}
