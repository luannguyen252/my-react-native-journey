# React Native Animation

**Animated:** The Animated API is used to interactive control the specific values. It focuses on declarative relationships between inputs and outputs. It has a `start` and `stop` methods to control the time-based animation execution.

Animated exports four different animated components as `View`, `Text`, `Image` and `ScrollView`. We can also create our own animated component using `Animated.createAnimatedComponent()`.

**LayoutAnimated:** The LayoutAnimated is used to animate the global layout transactions.

## Animated Methods

`Animated.timing()`

> It animates a value over time using various easing curve, or by using own function.

`Animated.event()`

> It maps event directly to animated values.

`Animated.spring()`

> It animate the valueIt tracks the velocity of state to create fluid motion as `toValue` updates.

`Animated.decay()`

> It starts the animations with initial velocity and gradually goes slows to stop.

## Animated.timing() Example 1

```javascript
import React, { Component } from "react";
import {
  StyleSheet,
  AppRegistry,
  Text,
  View,
  Animated,
  Easing,
} from "react-native";

export default class DisplayAnImage extends Component {
  constructor() {
    super();
    this.spinValue = new Animated.Value(0); // Declare spinValue as a new Animated.Value and pass 0 (zero) in it.
  }

  componentDidMount() {
    this.spin();
  }

  // Create a spin method and call it from componentDidMount
  spin() {
    this.spinValue.setValue(0); // Set spinValue to 0 (zero)
    Animated.timing(
      // Calling Animated.timing() method, it takes two arguments:
      this.spinValue, // value
      {
        // And config object
        toValue: 1, // And setting spinValue to 1
        duration: 4000, // Within 4000 milliseconds
        easing: Easing.linear,
      }
    ).start(() => this.spin());
  }

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });

    return (
      <View style={styles.container}>
        <Animated.Image
          style={{
            width: 227,
            height: 200,
            transform: [{ rotate: spin }],
          }}
          source={require("./assets/react-logo.png")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
```

## Animated.timing() Example 2

```javascript
import React, { Component } from "react";
import {
  StyleSheet,
  AppRegistry,
  Text,
  View,
  Animated,
  Easing,
} from "react-native";

export default class DisplayAnImage extends Component {
  constructor() {
    super();
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.animate();
  } // Animate method is call from componentDidMount

  animate() {
    this.animatedValue.setValue(0);
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
    }).start(() => this.animate());
  }

  render() {
    const marginLeft = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 300],
    });

    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0],
    });

    const movingMargin = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 300, 0],
    });

    const textSize = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [18, 32, 18],
    });

    const rotateX = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ["0deg", "180deg", "0deg"],
    });

    return (
      <View style={styles.container}>
        <Animated.View // returns Animated.View
          style={{
            marginLeft,
            height: 30,
            width: 40,
            backgroundColor: "red",
          }}
        />
        <Animated.View
          style={{
            opacity,
            marginTop: 10,
            height: 30,
            width: 40,
            backgroundColor: "blue",
          }}
        />
        <Animated.View
          style={{
            marginLeft: movingMargin,
            marginTop: 10,
            height: 30,
            width: 40,
            backgroundColor: "orange",
          }}
        />
        <Animated.Text // returns Animated.Text
          style={{
            fontSize: textSize,
            marginTop: 10,
            color: "green",
          }}
        >
          Animated Text!
        </Animated.Text>
        <Animated.View
          style={{
            transform: [{ rotateX }],
            marginTop: 50,
            height: 30,
            width: 40,
            backgroundColor: "black",
          }}
        >
          <Text style={{ color: "white" }}>Hello from TransformX</Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150,
  },
});
```

## LayoutAnimation API

`LayoutAnimation` allow to globally configure, create, and update animations. This will be used for all views in the next render/layout cycle.

The `LayoutAnimation` is quite useful, it has much less control than `Animated` and other animation libraries.

To use this API in Android we need to set the following flags via `UIManager`:

```javascript
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
```

## React Native LayoutAnimation Example

```javascript
import React from "react";
import {
  NativeModules,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class App extends React.Component {
  state = {
    w: 100,
    h: 100,
  };

  _onPress = () => {
    // Animate the update
    LayoutAnimation.spring();
    this.setState({ w: this.state.w + 15, h: this.state.h + 15 });
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={[styles.box, { width: this.state.w, height: this.state.h }]}
        />
        <TouchableOpacity onPress={this._onPress}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Press me!</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: "blue",
  },
  button: {
    backgroundColor: "green",
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
```

## React Native Animations Example

```javascript
import React, { Component } from "react";
import { View, StyleSheet, Animated, TouchableOpacity } from "react-native";

class AnimationsExample extends Component {
  componentWillMount = () => {
    this.animatedWidth = new Animated.Value(50);
    this.animatedHeight = new Animated.Value(100);
  };

  animatedBox = () => {
    Animated.timing(this.animatedWidth, {
      toValue: 200,
      duration: 1000,
    }).start();
    Animated.timing(this.animatedHeight, {
      toValue: 500,
      duration: 500,
    }).start();
  };

  render() {
    const animatedStyle = {
      width: this.animatedWidth,
      height: this.animatedHeight,
    };

    return (
      <TouchableOpacity style={styles.container} onPress={this.animatedBox}>
        <Animated.View style={[styles.box, animatedStyle]} />
      </TouchableOpacity>
    );
  }
}

export default AnimationsExample;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    backgroundColor: "blue",
    width: 50,
    height: 100,
  },
});
```
