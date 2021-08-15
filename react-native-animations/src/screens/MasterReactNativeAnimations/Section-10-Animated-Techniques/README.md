# Animated Techniques

## Start Callback

There is not necessarily a technique here, just a general pointer. When calling `start` to start an animation it takes a callback. That callback will receive an object with either `{ finished: true }` or `{ finished: false }` depending on whether or not the animation was completed, or interrupted. This is essential for developing solid animations.

## Position with Layout, Offset Animation Start

Most animations should use transforms so that animations stay performant. That means we can use our normal layout properties and position our items where we want them to end up. This means that we can use `interpolate` or set our default animated values to an offset to start. Then just animate to `0` and the element will animate to the correct location.

This is how many animations are done, and especially when applying to animation styles like shared elements.

This can be observed in our staggered form fields tutorial, or shared elements tutorial.

## .99 cliff

The .99 cliff is a great way to make animations happen instantly. This allows you to keep your animations declarative without having to use a hack to call `setValue` to make an animated value jump instantly to the value you desire.

This applies to any interpolation including colors, scale, translates, etc.

```javascript
this.state.animation.interpolate({
  inputRange: [0, 0.99, 1],
  outputRange: ["rgb(255,255,255)", "rgb(255,255,255)", "rgb(0,0,0)"],
});
```

This would cause your color to stay white until the very end and then switch to black.

Generally it's a .99 cliff but there are also .01 cliffs. This can be used to trigger the cliff at the beginning of an animation.

For example if you wanted a view to be hidden and immediately visible before other animations take place. You would setup your interpolation like so.

```javascript
this.state.animation.interpolate({
  inputRange: [0, 0.01, 1],
  outputRange: [0, 0, 1],
});
```

**Cliffs**

In general cliffs are a great way to generate a multi part animation. You can keep an from moving, or keep an element hidden, etc until you've completed a portion of a separate animation.

In the interpolation below we want our animation to trigger half way through the animation. So we specify our input range at `[0, .5]` and that maps to our output which we specify as `[0,0]`. When our animation is progressing from `0` to `.5` the interpolation will always output `0`. Once our animation exceeds `.5` our output value will now start progressing from `0` to `1`.

```javascript
this.state.animation.interpolate({
  inputRange: [0, .5, 1]
  outputRange: [0, 0, 1]
})
```

## Animate Hidden

Animated doesn't support unmounting animations, which means you need to manually control whether or not an item will stay mounted via state. However there are issues with this, in that an animation can be interrupted. Interrupted animations won't be the focus of this, but we need to manage them.

We start by setting up an `Animated.Value` and default it to `1` as we'll be passing it into `opacity`. We then also setup a `visible` of `true`. This will control whether or not the b`ox is mounted or unmounted.

```javascript
import React, { PureComponent } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";

export default class App extends PureComponent {
  state = {
    animation: new Animated.Value(1),
    visible: true,
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.visible && (
          <TouchableWithoutFeedback onPress={this.startAnimation}>
            <Animated.View style={[styles.box]} />
          </TouchableWithoutFeedback>
        )}
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

We add an interpolation to move the box off screen when tapped, and additionally pass in an opacity so it's fading at the same time.

```javascript
render() {
    const translateYInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [500, 0],
    });

    const animatedStyles = {
      opacity: this.state.animation,
      transform: [
        {
          translateY: translateYInterpolate,
        },
      ],
    };

    return (
      <View style={styles.container}>
        {this.state.visible &&
          <TouchableWithoutFeedback onPress={this.startAnimation}>
            <Animated.View style={[styles.box, animatedStyles]} />
          </TouchableWithoutFeedback>}
      </View>
    );
  }
```

When our box is pressed we will start our animation to `0` over `1500ms`. This gives us time to be able to still tap and interrupt our animation.

When an animation is interrupted our callback passed into `start` is called with an object that has a `key` of `finished` which is either true or false. If true it means our animation got to it's destination (in our case `0`) without be interrupted.

If the button is pressed again our `startAnimation` would be called again and thus our `Animated.timing` would be called again. Despite animating to the same value this would interrupt our first animation we declared. Meaning our `start` would be called with `finished` as `false`.

Now we can do our logic. Calling the same function may be unlikely, and rather than triggering the same animation (`toValue: 0`), you would likely change the code path. Whether via a `setState` to say something is happening, etc.

I'm not doing that and instead just calling the same animation. However this will cause issues for us. An animation towards `0` is already executing, then we'll call a new animation towards `0`. This will then cause an interrupted animation. When our animation is interrupted it will call our start callback of our previous animation with `{ finished: false }`. We SHOULDN'T trigger another animation on the same value. We would then be triggering an animation to start, at the same time our second `toValue: 0` animation would be animating.

This is why we have the `setTimeout`. This is a less than ideal solution! We should technically be tracking the animation if it's finished or not, or when an animation starts we toggle a function that is called.

We could do something like

```javascript
_finished = true; // on the instance

startAnimation = () => {
  if (this._finished) {
    Animated.timing(this.state.animation, {
      toValue: 0,
      duration: 1500,
    }).start(({ finished }) => {
      if (finished) {
        this.setState({ visible: false });
        this._finished = true;
      }
    });
  } else {
    Animated.spring(this.state.animation, {
      toValue: 1,
    }).start();
  }

  this._finished = false;
};
```

Another method we could use 2 different functions. This is the most likely scenario of how you may want to do it in your actually application.

```javascript
startAnimation = () => {
  this.setState(
    {
      started: true,
    },
    () => {
      Animated.timing(this.state.animation, {
        toValue: 0,
        duration: 1500,
      }).start(({ finished }) => {
        this.setState({
          visible: !finished,
          started: false,
        });
      });
    }
  );
};

resetAnimation = () => {
  this.setState({ started: false }, () => {
    Animated.spring(this.state.animation, {
      toValue: 1,
    }).start();
  });
};
```

Then in our render we need to toggle the function that is called based upon whether or not the animation is running.

```javascript
const onPress = this.state.started ? this.resetAnimation : this.startAnimation;

return (
  <View style={styles.container}>
    {this.state.visible && (
      <TouchableWithoutFeedback onPress={onPress}>
        <Animated.View style={[styles.box, animatedStyles]} />
      </TouchableWithoutFeedback>
    )}
  </View>
);
```

Out of some slight laziness, and to keep the code concise I'm going to just use `setTimeout`. This is slightly less efficient. How the animation would go would be

1. First click => animate to 0
2. Second Click Interrupt => start callback of first click, use `setTimeout` for next tick
3. Second Click => animate to 0
4. Next tick => animate to beginning again

If it was successfully finished we call `setState` and hide our box. However if it wasn't finished then we start a new animation and `spring` it back to where it started.

```javascript
startAnimation = () => {
  Animated.timing(this.state.animation, {
    toValue: 0,
    duration: 1500,
  }).start(({ finished }) => {
    setTimeout(() => {
      if (finished) {
        this.setState({ visible: false });
      } else {
        Animated.spring(this.state.animation, {
          toValue: 1,
        }).start();
      }
    }, 0);
  });
};
```

## Interrupted Animation

Handling interrupted animations is a crucial part of the user experience. Generally when animations are quick, or they are a single animation the chances of being interrupted is lower. However when dealing with more complex, and longer running animations you don't want to trap the user after they have made a mistake.

We've got our basic box, and 2 animated values. One will be for the translation of our box and the other will be for the opacity.

```javascript
import React, { PureComponent } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";

export default class App extends PureComponent {
  state = {
    animation: new Animated.Value(0),
    opacity: new Animated.Value(1),
  };

  startAnimation = () => {};

  render() {
    const animatedStyles = {
      opacity: this.state.opacity,
      transform: [{ translateY: this.state.animation }],
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

Here we setup our basic animation, it will translate to `300` and slowly fade away to `0` opacity. These both will happen over 1500 milliseconds. However you'll notice that we will reset our `opacity` to 1 with a `setTimeout` every time we tap on our box.

Because we are use a combination of animations, if one animation is effected an interruption will happen and they'll both stop.

Also realize, we are resetting ONLY the opacity. This means if we re-trigger our animation, the `this.state.animation` will retain it's current value. Which means we'll now animate from the value over the course of a NEW 1500 milliseconds. That means our animation will just continually get slower.

```javascript
startAnimation = () => {
  Animated.parallel([
    Animated.timing(this.state.animation, {
      toValue: 300,
      duration: 1500,
    }),
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: 1500,
    }),
  ]).start();

  setTimeout(() => {
    this.state.opacity.setValue(1);
  }, 500);
};
```

**Handle Finished**

The `start` callback is passed an object with `finished`. How you handle the interrupted animation depends on your use case. Sometimes you may just want to skip it all together as the user may want it to be gone, or maybe it was a mistake press and you want to reset it back to the start.

In our case we'll reset it back to the beginning if our `finished` is `false`.

To understand why we're using `setTimeout` refer to the Animate hidden tutorial.

```javascript
.start(({ finished }) => {
    if (!finished) {
    setTimeout(() => {
            Animated.spring(this.state.animation, {
                toValue: 0,
            }).start();
            Animated.spring(this.state.opacity, {
                toValue: 1,
            }).start();
        }, 0)
    }
});
```

**Stop Together**

In our case we are using `parallel`. Parallel gives you the option to not stop the animations at the same time. This isn't an option with `sequence` or `stagger`. However just know that `finished` in this case will always be true as at least one of the animations is allowed to complete.

If you were to add `this.state.animation.setValue(0);` and reset our animation for translate, all animations would have been interrupted and in that case `finished` would be false.

```javascript
// Animated.paralle
Animated.parallel(
  [
    Animated.timing(this.state.animation, {
      toValue: 300,
      duration: 1500,
    }),
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: 1500,
    }),
  ],
  { stopTogether: false }
);

// setTimeout
setTimeout(() => {
  this.state.opacity.setValue(1);
  this.state.animation.setValue(0);
}, 500);
```

**Ending** Handling interrupted animations is key to ensuring that your app and your animations provide the proper experience.

## Pointer Events

In many cases rendering and unrendering elements is troublesome as it usually requires storing values in state and toggling visible and hidden with `setState`. Then because you need to delay the animations until the elements are rendered you have to pass in a `componentDidUpdate` callback.

When rendering more views won't cause performance it may make more sense to render items hidden, and use the `pointerEvents` View prop to have touches pass ignored.

In animations of this sort we would provide an `opacity` animated style and set it to `0`. Then using a variable on state we would be toggling between `none` and `all`. When the view is hidden we pass in `<View pointerEvents="none">`. When we trigger our animation to show the view we can do our animation, and once it's complete using our `start` callback we can toggle to `<View pointerEvents="auto">`. Our view can now receive touch events.

Lets take a look at an example.

We'll start with a box. That box can be pressed to trigger an animation. The background color of the box will change every time the box is pressed.

```javascript
import React, { PureComponent } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

export default class App extends PureComponent {
  state = {
    animation: new Animated.Value(0),
    toggle: true,
  };

  _pressed = false;

  handlePress = () => {
    const toValue = this._pressed ? 0 : 1;
    Animated.timing(this.state.animation, {
      toValue,
    }).start();
    this._pressed = !this._pressed;
  };

  render() {
    const boxStyle = {
      backgroundColor: this.state.animation.interpolate({
        inputRange: [0, 1],
        outputRange: ["rgb(255,99,71)", "rgb(99,71,255)"],
      }),
    };

    return (
      <View style={styles.container}>
        <View>
          <TouchableWithoutFeedback onPress={this.handlePress}>
            <Animated.View style={[styles.box, boxStyle]} />
          </TouchableWithoutFeedback>
        </View>
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
    height: 100,
  },
  cover: {
    backgroundColor: "transparent",
  },
});
```

Now lets add in a little more. Lets add a toggle to toggle a variable.

```javascript
handleToggle = () => {
  this.setState((state) => ({
    toggle: !state.toggle,
  }));
};
```

Now our view looks like this. A button will `toggle` our `toggle` on state between `true` and `false`.

```javascript
return (
  <View style={styles.container}>
    <View>
      <TouchableWithoutFeedback onPress={this.handlePress}>
        <Animated.View style={[styles.box, boxStyle]} />
      </TouchableWithoutFeedback>
    </View>

    <TouchableOpacity onPress={this.handleToggle}>
      <View>
        <Text>Toggle Pointer Events</Text>
      </View>
    </TouchableOpacity>
  </View>
);
```

Now we add in a covering view and toggle our `pointerEvents`. When `this.state.toggle` is `true` as it is in the start. There are no `pointerEvents` on our covering view. This means you can press through it and trigger the animation.

However as soon as we toggle to `false` the `auto` `pointerEvents` is applied. This means our covering view will accept touch events, blocking all touch events from getting to anything underneath it. You will no longer be able to change the color until you toggle back to `true`.

```javascript
return (
  <View style={styles.container}>
    <View>
      <TouchableWithoutFeedback onPress={this.handlePress}>
        <Animated.View style={[styles.box, boxStyle]} />
      </TouchableWithoutFeedback>
      <View
        style={[StyleSheet.absoluteFill, styles.cover]}
        pointerEvents={this.state.toggle ? "none" : "auto"}
      />
    </View>

    <TouchableOpacity onPress={this.handleToggle}>
      <View>
        <Text>Toggle Pointer Events</Text>
      </View>
    </TouchableOpacity>
  </View>
);
```

This can allow you to hide elements in plain site, animate them as necessary and then enable touch events on whichever elements need to receive touches.
