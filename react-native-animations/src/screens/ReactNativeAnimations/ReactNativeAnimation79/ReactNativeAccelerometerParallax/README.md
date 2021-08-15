# Usage

```tsx
import React from "react";
import { ParallaxProvider } from "react-native-accelerometer-parallax";

const App = () => {
  return (
    <ParallaxProvider>
      <SomeStack />
    </ParallaxProvider>
  );
};

export default App;
```

### Get context value to use animated value (hook shared value from

```tsx
import { useParallax } from "react-native-accelerometer-parallax";

const Screen = () => {
  const { animStyle } = useParallax();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Parallax text test</Text>
    </View>
  );
};
```

### Wrap your some component to Animated.View from [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated) and pass animated style to style prop

```tsx
import React from "react";
import { useParallax } from "react-native-accelerometer-parallax";
import Animated from "react-native-reanimated";
import { View, Text } from "react-native";
import { ParallaxProvider } from "react-native-accelerometer-parallax";

const Screen = () => {
  const { animStyle } = useParallax();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Animated.View style={animStyle}>
        <Text>Parallax text test</Text>
      </Animated.View>
    </View>
  );
};

const App = () => {
  return (
    <ParallaxProvider>
      <Screen />
    </ParallaxProvider>
  );
};

export default App;
```

# Documentation.

### 1. useParallax(config: **ParallaxConfig**): **ParallaxObject**

**ParallaxConfig**

- sensitivity: number - (default 1, sensitivity accelerometer rotate and multiple to animate shared value )

**ParallaxObject**

- animStyle: {transform:[{translateX: number},{translateY: number}]} (for pass to Animated.View style prop)

- posX: Animated.SharedValue<number> (for use it or interpolate, for example style={{opacity: posY.value}})

- posY: Animated.SharedValue<number> (equal posX)
