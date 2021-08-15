# Interpolation

## Numbers And Interpolates on Interpolates

**Flip Values**

Building off of our interpolations on interpolations we can also flip numbers.

`inputRange` is only able to accept values that move in an increasing fashion.

However you may be constructing reversed animations that would require you to do an inputRange of `[1, 0]`.

To accommodate this we can interpolate to an `outputRange` that flips in reverse for us so that our animation is moving forward from `0 => 1` the interpolate will flip it to be animating from `1 => 0`, which then we can interpolate on our second animation in the correct direction `[0, 1]` but it will actually be animating in reverse.

```javascript
const animatedInterpolate = this.state.animation.interpolate({
  inputRange: [0, 1],
  outputRange: [1, 0],
});

const reversedDirection = animatedInterpolate.interpolate({
  inputRange: [0, 1],
  outputRange: [1, 0.5],
});
```

This can be confusing to understand, but just knowing that it's a thing will come in handy when you realize you need it.

**Interpolate Numbers**

Just interpolating numbers to different numbers is going to be your primary use case of using interpolate.

This may be mapping values up, down, or any direction depending on what your animation requires.

Scaling values up would look something like this. We have an inputRange that will take an animation that is animating from `0` to `1`.

```javascript
this.state.animation.interpolate({
  inputRange: [0, 1],
  outputRange: [0, 100],
});
```

Now if we were to kick off an animation

```javascript
Animated.timing(this.state.animation, {
  toValue: 1,
  duration: 1000,
}).start();
```

The output over the course of `1000ms` would churn out values like so.

```javascript
input: 0 => 0ms => output: 0
input: .1 => 100ms => output: 10
input: .2 => 200ms => output: 20
input: .3 => 300ms => output: 30
....
input: 1 => 1000ms => output: 100
```

The same goes for the opposite direction. We can scale numbers down from larger => smaller

```javascript
this.state.animation.interpolate({
  inputRange: [0, 100],
  outputRange: [0, 1],
});
```

Kicking off an animation

```javascript
Animated.timing(this.state.animation, {
  toValue: 1,
  duration: 1000,
}).start();
```

Would produce values

```javascript
input: 0 => 0ms => output: 0
input: 10 => 100ms => output: .1
input: 20 => 200ms => output: .2
input: 30 => 300ms => output: .3
....
input: 100 => 1000ms => output: 1
```

These are examples where the `inputRange` is producing a linear `outputRange`, but the `inputRange` is the only thing that needs to be moving in an increasing fashion.

The `outputRange` could be anything. The only requirement is that the `inputRange` and `outputRange` have the same number of items in their respective arrays.

Lets look at an interpolation

```javascript
this.state.animation.interpolate({
  inputRange: [0, 30, 50, 80, 100],
  outputRange: [0, -30, -50, 0, 200],
});
```

Lets take a look at what values would be produced with the animation

```javascript
Animated.timing(this.state.animation, {
  toValue: 1,
  duration: 1000,
}).start();
```

```javascript
input: 0 => 0ms => 0
input: 15 => 150ms => -15
input: 30 => 300ms => -30
input: 50 => 500ms => -50
input: 65 => 650ms => -25
input: 80 => 800ms => 0
input: 90 => 900ms => 100
input: 100 => 100ms => 200
```

As you can see our animated value only ever increased, but our `outputRange` intermediate values were interpolated correctly based upon the steps in between each range and it's targeted output range.

Understanding all the intermediate values can be necessary however, for many animations it's not critical. `Interpolate` will figure out the steps correctly based upon your duration, or spring.

Now realize that `interpolate` is returning a new `Animated.Value` so what that means is you can `interpolate` on an `interpolate`.

Lets look at an example of this.

```javascript
export default class animations extends Component {
  state = {
    animation: new Animated.Value(0),
  };

  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 1500,
    }).start(() => {
      Animated.timing(this.state.animation, {
        toValue: 2,
        duration: 300,
      }).start();
    });
  };

  render() {
    const animatedInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 300, 0],
    });

    const interpolatedInterpolate = animatedInterpolate.interpolate({
      inputRange: [0, 300],
      outputRange: [1, 0.5],
    });

    const animatedStyles = {
      transform: [{ translateY: animatedInterpolate }],
      opacity: interpolatedInterpolate,
    };
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          <Animated.View style={[styles.box, animatedStyles]} />
        </TouchableWithoutFeedback>
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
    width: 150,
    height: 150,
    backgroundColor: "tomato",
  },
});
```

Lets focus on the important piece.

Our animation is only going to 2, however our `interpolateInterpolate` is referencing the values that are in the `outputRange` of our first animated `interpolate`.

This can be a powerful tool when passing around animated interpolations.

```javascript
const animatedInterpolate = this.state.animation.interpolate({
  inputRange: [0, 1, 2],
  outputRange: [0, 300, 0],
});

const interpolatedInterpolate = animatedInterpolate.interpolate({
  inputRange: [0, 300],
  outputRange: [1, 0.5],
});
```

If you do not want to expose the original animated value, or your interpolation only operates across a specific range. You can `interpolate` an `interpolate` before passing it to something that will `interpolate` it.

Quick example, if we had an animation that went from `0` to `300`, but something required a range from `0` to `1`. We can map our desired `inputRange` to an `outputRange` that will feed into our second animation `inputRange` and derive our desired `outputRange`.

```javascript
const animatedInterpolate = this.state.animation.interpolate({
  inputRange: [0, 300],
  outputRange: [0, 1],
  extrapolate: "clamp",
});

const interpolatedInterpolate = animatedInterpolate.interpolate({
  inputRange: [0, 1],
  outputRange: [1, 0.5],
});
```

Interpolating interpolations can be challenging to wrap your head around but can be extremely powerful in practice.

## Color/Background Interpolate

Changing colors, and opacity of colors (using rgba) is another common animation in an application.

You must use `interpolate` to animate between colors.

`Animated` has special interpolations built in to be able to identify colors, and generic numeric patterns.

Using animated for colors will only work for `rbg/rgba/hcl` it will not work for `hex` colors.

So if you want to animate a color you'll need to convert your hex to one of the formats interpolation allows.

Lets look at 2 cases. RGB and RGBA interpolations.

```javascript
export default class animations extends Component {
  state = {
    animation: new Animated.Value(0),
  };

  componentDidMount() {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 1000,
    }).start();
  }

  render() {
    const bgStyle = {
      backgroundColor: this.state.animation.interpolate({
        inputRange: [0, 1],
        outputRange: ["rgba(255,99,71, 1)", "rgba(255,99,71, 0)"],
      }),
    };

    const boxStyle = {
      backgroundColor: this.state.animation.interpolate({
        inputRange: [0, 1],
        outputRange: ["rgb(99,71,255)", "rgb(255,99,71)"],
      }),
    };

    return (
      <Animated.View style={[styles.container, bgStyle]}>
        <Animated.View style={[styles.box, boxStyle]} />
      </Animated.View>
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
    height: 100,
    width: 100,
  },
});
```

We have 2 interpolations here. One for our outside and one for our box. They both start at the same color. The background though is the same color, however we only `interpolate` the alpha of the RGBA. So it will animate the opacity. Then we also animate our box from a blue-purple to the tomato background color.

This is just demonstrating that `interpolate` doesn't care about the values, it will figure it all out correctly.

# Rotation

Rotation also requires you to use `interpolate` because the `rotation` transform properties must be given a value in `degrees`, or in `radians`.

The most common is going to be `degrees`. The value provided would look like `90deg`. However you can also use `radians` if you prefer.

You may want to just do a `rotate` which will rotate both `x` and `y`. However you can additionally `rotate` each piece independently.

Lets take a look at example of animating each of these separately.

```javascript
export default class animations extends Component {
  state = {
    animation: new Animated.Value(0),
  };

  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 1500,
    }).start(() => {
      this.state.animation.setValue(0);
    });
  };

  render() {
    const xInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });

    const yInterpolate = this.state.animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ["0deg", "0deg", "180deg"],
    });

    const animatedStyles = {
      transform: [{ rotateX: xInterpolate }, { rotateY: yInterpolate }],
    };

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          <Animated.View style={[styles.box, animatedStyles]} />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
```

We `interpolate` the `x` to do a full 360 degrees, however half way through the animation we will animate the `y` 180 degrees.

## Extrapolate

The `extrapolate` key of an `interpolate` call defines how the interpolation should operate.

Additionally you can define `extrapolateLeft` and `extrapolateRight` if you need either side of the interpolation to operate differently.

When I say either side I mean depending on the direction the animated value is going will pick the correct extrapolate `left/right`.

Lets look at an example

```javascript
this.state.animation.interpolate({
  inputRange: [0, 1],
  outputRange: [0, 100],
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
});
```

Lets assume our `this.state.animation` is starting at `0`. If we trigger an animation to `2`. The `extrapolateRight` will apply once we exceed `1`. If we then animate back to `0`, once the animated value hits `0` and or goes beyond `0` then our `extrapolateLeft` will be applied.

Generally you'll define the same `extrapolate` on either side and can just use the `extrapolate` key to define that.

```javascript
this.state.animation.interpolate({
  inputRange: [0, 1],
  outputRange: [0, 100],
  extrapolate: "clamp",
});
```

There are 3 values that are accepted for extrapolation. The default is `extend`.

**Extend**

Extend tells `extrapolate` to figure out the rate of change happening once the `inputRange` is exceeded and continue to `interpolate`. Because it's the default you don't have to add it in as an `extrapolate`.

If we were to trigger an animation to `2` the interpolation will continue extending past `100`. Our value will continue on to be `200`.

```javascript
this.state.animation.interpolate({
  inputRange: [0, 1],
  outputRange: [0, 100],
});
```

Lets prove this with some code.

```javascript
import React, { Component } from "react";
import { StyleSheet, View, Animated } from "react-native";

export default class App extends Component {
  state = {
    animation: new Animated.Value(0),
  };

  componentDidMount() {
    Animated.timing(this.state.animation, {
      toValue: 2,
    }).start();
  }

  render() {
    const animatedStyles = {
      height: this.state.animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 100],
      }),
    };

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.box, animatedStyles]} />
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
    width: 100,
    backgroundColor: "tomato",
  },
});
```

Our height will start at `0`, grow to `100` via the `interpolate`, and then because the default is extend it will continue to grow at the same pace that it was previously at. So it will grow to `200` in size.

**Clamp**

Taking advantage of `extrapolate` is going to happen more with transforms than it is with height.

Often you might be scaling an animation but only from `0` to `1`. However with the `extend` `extrapolate` it could easily scale to twice the size and we do not want that.

Here is what it would look like before we apply our `clamp`, with the box growing to 2 times it's size because it still has the default `extrapolate: "extend"`.

Now we apply our clamp

```javascript
import React, { Component } from "react";
import { StyleSheet, View, Animated } from "react-native";

export default class App extends Component {
  state = {
    animation: new Animated.Value(0),
  };

  componentDidMount() {
    Animated.timing(this.state.animation, {
      toValue: 2,
    }).start();
  }

  render() {
    const animatedStyles = {
      transform: [
        {
          scale: this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: "clamp",
          }),
        },
      ],
    };

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.box, animatedStyles]} />
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
    height: 100,
    width: 100,
    backgroundColor: "tomato",
  },
});
```

And now we get the scale rising to `1` half way through the animation and stopping.

**Identity**

Once our animated value passes our `inputRange` the `identity` `extrapolate` will tell the interpolation to completely ignore the `inputRange` and just use the value of the animated value.

We can see in our code below, we are animating to `2` but our `outputRange` is only scaling the box to `.2`. Once our animated value gets to beyond `1` our `inputRange` no longer applies, and our scale will apply the value of our `this.state.animation`.

You'll see a jump in the animation from `.2` to `1` and then continue to grow to `2`.

```javascript
import React, { Component } from "react";
import { StyleSheet, View, Animated } from "react-native";

export default class App extends Component {
  state = {
    animation: new Animated.Value(0),
  };

  componentDidMount() {
    Animated.timing(this.state.animation, {
      toValue: 2,
    }).start();
  }

  render() {
    const animatedStyles = {
      transform: [
        {
          scale: this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.2],
            extrapolate: "identity",
          }),
        },
      ],
    };

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.box, animatedStyles]} />
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
    height: 100,
    width: 100,
    backgroundColor: "tomato",
  },
});
```

**Mixing Extrapolates**

Lets see what animated effects mixing `extrapolate`s can cause. We start by setting up a gesture example.

However you can see that we aren't actually attaching the gestures to the box. We are attaching them to the container element

```javascript
<View style={styles.container} {...this._panResponder.panHandlers}></View>
```

This is going to allow us to touch and drag anywhere and it'll effect the box properties.

Also for the sake of visualization I've added

```javascript
this.state.animation.y.addListener(({ value }) => {
  this.setState({
    value,
  });
});
```

DO NOT DO THIS IN PRACTICE. Calling `setState` every time the event listener is called is going to cause way too many updates in real practice. This is purely for visualizing the current value of our animation drag.

```javascript
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";

export default class App extends Component {
  state = {
    animation: new Animated.ValueXY(0),
    value: 0,
  };

  componentWillMount() {
    this.state.animation.y.addListener(({ value }) => {
      this.setState({
        value,
      });
    });

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this.state.animation.extractOffset();
      },
      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.animation.x, dy: this.state.animation.y },
      ]),
    });
  }

  render() {
    const { height } = Dimensions.get("window");

    return (
      <View style={styles.container} {...this._panResponder.panHandlers}>
        <Animated.View style={[styles.box, animatedStyle]}>
          <Text>
            {Math.round(this.state.value)}/{Math.round(height / 3)}
          </Text>
        </Animated.View>
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
    width: 75,
    height: 75,
    backgroundColor: "tomato",
  },
});
```

Now we'll setup our interpolation purely on the `y` of our drag. And cap the right side with a `clamp`. Meaning when we have dragged to the `height/3` it will stop and not scale anymore than `1`.

However as we touch and drag up and cause our `y` value to head towards `0` and then negative. Our value will continue to extend and grow. Because we are passing it into scale we will actually flip the box around.

```javascript
var scaleAndFlipOnReverse = this.state.animation.y.interpolate({
  inputRange: [0, height / 3],
  outputRange: [0.1, 1],
  extrapolateLeft: "extend",
  extrapolateRight: "clamp",
});

const animatedStyle = {
  transform: [{ scale: scaleAndFlipOnReverse }],
};
```
