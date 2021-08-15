# Animated Functions

## Timing

`Animated.timing` defines a way to transition an `Animated.Value` from one value to another over a period of milliseconds. It also allows for use of `easing` functions.

```javascript
Animated.timing(this._animation, {
  toValue: 100,
  duration: 1000,
}).start();
```

## Spring

`Animated.spring` defines a way to transition an `Animated.Value` based on `tension` and `friction` of a `spring`.

The `tension` defines how much energy the spring has.

The `friction` defines how quickly that energy will dissipate.

Based upon the spring formula the `Animated.Value` will bounce around like a spring until it stops.

Because this is a spring it means that the `Animated.Value` will overshoot the `toValue` that you have specified until settling to the `toValue`.

This is unlike `Animated.timing` which will not exceed the `toValue` you specified unless you provided an `easing` that caused the value to overshoot.

[Damped Spring](./assets/damped-spring.gif "Damped Spring")

Spring is the best way to simulate real physical motion in an animation. It allows for you to build out more realistic animations without having to define a duration, or guess the appropriate duration for a particular animation.

**Loose bouncy spring**

```javascript
Animated.spring(this._animation, {
  toValue: 100,
  friction: 2,
  tension: 140,
}).start();
```

**High Friction not bouncy spring**

```javascript
Animated.spring(this._animation, {
  toValue: 100,
  friction: 15,
  tension: 140,
}).start();
```

You can apply the same amount of `tension` energy but a higher `friction` will cause the spring to stop faster.

## Loop

This is used when an animation needs to keep repeating.

One thing to note here is that the `loop` will reset the `Animated.Value` back to it's original value before starting the animation over.

So unless your animation ends back where it started you will see a jump. For example

```javascript
this._animation = new Animated.Value(0);

Animated.loop(
  Animated.timing(this._animation, {
    toValue: 100,
    duration: 500,
  })
).start();

const animatedStyle = {
  transform: [
    {
      translateY: this._animation,
    },
  ],
};
```

This animation will start at `0`, translate to `100` then revert back to `0`.

This is not a typical use of `Animated.loop`. Something a little more typical may be a constantly spinning view.

```javascript
this._animation = new Animated.Value(0);

Animated.loop(
  Animated.timing(this._animation, {
    toValue: 1,
    duration: 500,
  })
).start();

const interpolated = this._animation.interpolate({
  inputRange: [0, 1],
  outputRange: ["0deg", "360deg"],
});

const animatedStyle = {
  transform: [
    {
      rotate: interpolated,
    },
  ],
};
```

Here you can see we are interpolating from `0deg` to `360deg`. This is a complete rotation and then the animation will restart at the same point. Thus creating a smooth, looping animation. If you need something that animates smoothly in reverse you will need to craft this yourself.

It can be done using the `start` function. This is not something that will be covered, merely a warning/recommendation.

Additionally in the configuration of `loop` you can specify the number of `iterations` that the animation should loop.

## Event

The `Animated.event` is a utility method to automatically set a value on an `Animated.Value` given an array/keys to traverse. Typically this would be used with the `onScroll` or `onPanResponderMove`. It receives an array of instructions. `Animated.event` returns a function, when the function is called the arguments it is called with are applied to the instructions in the array you provided. Once those instructions are traversed when ever the function is called it just does a `setValue` with the provided value on to the `Animated.Value`.

The typical callback signature of React is `event` first, then additional properties like `gestureState` for `PanResponders`. On the event `nativeEvent` contains all the content you need.

Because a function would be called with `(event, gestureState) => {}`, the instructions to get data from event would need to be placed into the first array spot in `Animated.event`

In the case of an `onScroll` from a `ScrollView` you need to provide a few levels of instructions.

```javascript
Animated.event([
  {
    nativeEvent: {
      contentOffset: {
        y: this._animation,
      },
    },
  },
]);
```

If you don't need to reference anything off an event simply pass in `null` so that the argument call signature matches the array of instructions.

In the case of a `PanResponder` you would skip the `event` piece with `null` and only provide instructions to automatically set animated values from `gestureState`

```javascript
Animated.event([
  null,
  {
    dx: this._animation.x,
    dy: this._animation.y,
  },
]);
```

## Decay

The `Animated.decay` call is primarily used for dragging and gesture animations.

All it requires is you to provide a velocity in an `x` and `y` direction as well as a friction to slow it down. This means you can create realistic throwing animations, etc.

The primary use case is for gesture animations after a user has released their finger.

## Math

Previously `Animated` had no way to do simple math for animations. In order to do any sort of math you would have had to use a listener with `addListener` to track the current value and then call `setValue`. Additionally you could have used `setOffset`.

The only issue is that this is cumbersome, inflexible, async, and isn't declarative. To help with this `Animated` had basic math options added. Including `add`, `divide`, `multiply` and `moduolo`. These can all be used in conjunction with each other as many times as you'd like.

They also can operate on any `Animated.Value` or simple numbers can used in place of an `Animated.Value`.

The math functions don't always seem immediately valuable on first glance but because you can compose them you can build out formulas with them.

Also because you are combining 2 different `Animated.Values` they are able to be animated separately, in conjunction, or whatever is required.

## Add

Add 2 values.

```javascript
const position = new Animated.Value(100);
const offset = new Animated.Value(50);

const positionWithOffset = Animated.add(position, offset);

// value = 150;
```

The `positionWithOffset` is a new `Animated.Value`.

Now you could even theoretically compose them deeper.

```javascript
const position = new Animated.Value(100);
const offset = new Animated.Value(50);

const otherNumber = new Animated.Value(400);

const positionWithOffset = Animated.add(position, offset);

const positionOffsetWithRandomNumber = Animated.add(
  positionWithOffset,
  otherNumber
);

// value = 550;
```

## Divide

Divide 2 values.

```javascript
const position = new Animated.Value(100);
const cutIt = new Animated.Value(50);

const positionWithOffset = Animated.divide(position, cutIt);

// value = 2;
```

## Multiply

Multiply 2 values.

```javascript
const position = new Animated.Value(100);
const doubleIt = new Animated.Value(2);

const positionWithOffset = Animated.divide(position, doubleIt);

// value = 200;
```

## Modulo

Returns the non-negative modulo of the 2 values.

Modulo is the remainder after division.

The modulo JavaScript operator is the `%`.

Modular arithmetic is commonly used in time calculations, but there are many other usages as well.

Here is a quick math demo of the `%` in action.

Essentially, you do the division of the 2 values. Take the result multiplied by the divisor (bottom number), then take the dividend (top number) and subtract out the resulting number.

That values is the modulus.

```javascript
16 % 6 = 4

//OR

16 \ 6 = 2
2 * 6 = 12
16 - 12 = 4
```

```javascript
const dividend = new Animated.Value(16);
const divisor = new Animated.Value(6);

const modulo = Animated.modulo(dividend, divisor);

// value = 4;
```

## Formulas

User `rastapasta` has already built some great examples of how these math functions can be used to create different, and useful math logic.

[react-native-animated-math](https://github.com/rastapasta/react-native-animated-math)

> Animated API math extension - approximates sin, cos and tan by combining Animated Nodes with full Native Driver support

**Examples**

```javascript
import React, { PureComponent } from "react";
import { View, Animated, StyleSheet } from "react-native";
import AnimatedMath from "react-native-animated-math";

export default class Rotator extends PureComponent {
  state = {
    angle: new Animated.Value(0),
  };

  componentDidMount() {
    this.animate();
  }

  animate(rotation = 1) {
    Animated.timing(this.state.angle, {
      toValue: rotation * 2 * Math.PI,
      duration: 4000,
      useNativeDriver: true,
    }).start(() => this.animate(rotation + 1));
  }

  render() {
    let { angle } = this.state,
      radius = 130;

    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.dot,
            {
              transform: [
                {
                  translateX: Animated.multiply(
                    AnimatedMath.sin(angle),
                    radius
                  ),
                },
                {
                  translateY: Animated.multiply(
                    AnimatedMath.cos(angle),
                    -radius
                  ),
                },
              ],
            },
          ]}
        />
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
  dot: {
    position: "absolute",
    backgroundColor: "red",
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});
```
