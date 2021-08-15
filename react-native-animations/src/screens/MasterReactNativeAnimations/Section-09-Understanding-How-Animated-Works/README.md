# Understanding How Animated Works

## createAnimatedComponent

The `createAnimatedComponent` call can wrap any component and intercept any prop that it detects is an `Animated.Value` of some sort. It has special case built in to look at the `style` prop, flatten it, and determine what is an `Animated.Value` that needs to be updated.

The Animated value passed has listeners attached inside `createAnimatedComponent` and when an animation is triggered those listeners will call `setNativeProps` directly for us. Now because we have props being managed internally if a `setState` happens (even mid animation), the render cycle will happen as usual and the props that are passed over to the native world will be the same as whatever the animated value would be sending over.

[Christopher Chedeau - Animated](https://www.youtube.com/watch?v=xtqUJVqpKNo)

[React Rally: Animated -- React Performance Toolbox](https://speakerdeck.com/vjeux/react-rally-animated-react-performance-toolbox)

## Using and Understanding setNativeProps

To understand how animated works you must first understand `setNativeProps`. This is what Animated uses to bypass `setState`. It sends new properties over the bridge directly to the native world.

DO NOTE: if you use `setNativeProps` to set a prop on the native side, and then a `setState` happens and the prop you've set natively is set on the particular element it will be overridden, or unless you pass back the value you set on the native side.

We'll be looking at trivial cases, however this is how Animated works. In the render it always derives the current prop values which are the same values it's already sent to the native world using `setNativeProps`.

Lets take a look at some code first. We setup a `ScrollView` with an animated background on scroll. In order to call `setNativeProps` we need to get access to the view instance and we do that by getting a ref.

```javascript
import React, { PureComponent } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default class App extends PureComponent {
  state = {
    animation: new Animated.Value(0),
  };

  _enabled = true;

  render() {
    const bgInterpolate = this.state.animation.interpolate({
      inputRange: [0, 3000],
      outputRange: ["rgb(255,99,71)", "rgb(99,71,255)"],
    });

    const scrollStyle = {
      backgroundColor: bgInterpolate,
    };

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.handleToggle}>
          <Text>Toggle</Text>
        </TouchableOpacity>

        <ScrollView
          style={styles.scroll}
          ref={(scroll) => (this._scroll = scroll)}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  y: this.state.animation,
                },
              },
            },
          ])}
        >
          <Animated.View style={[styles.fakeContent, scrollStyle]} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  scroll: {
    flex: 1,
    opacity: 1,
  },
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
  fakeContent: {
    height: 3000,
    backgroundColor: "tomato",
  },
});
```

Lets start first with just one `setNativeProp` call.

```javascript
handleToggle = () => {
  this._enabled = !this._enabled;
  this._scroll.setNativeProps({
    scrollEnabled: this._enabled,
  });
};
```

We have `this._enabled` default to true on our component instance. We then toggle it and call `setNativeProps` and pass in an object of props we want to set. In our case we are just setting a single one and that's `scrollEnabled`. This will allow us to lock scrolling capabilities.

We can see it in action here, we lock the scroll without passing in a prop to our `ScrollView`, and without causing a `setState` to happen.

We can additionally override more than one prop at once, including the style prop. Understand though that you are REPLACING the prop in the native side. So if you have specific styling you need to preserve you will need to manage and send the entire new style, including the values you aren't overriding.

You can see that here, we create a `style` tag and pass in our `styles.scroll`, then whether or not we are disabled we pass in a hide or show styling which will toggle the opacity. We'll also still disable the scroll. This whole concept is foundational to how the JavaScript version of Animated works and how we can craft our own animations.

```javascript
handleToggle = () => {
  this._enabled = !this._enabled;
  let style = [styles.scroll];

  if (!this._enabled) {
    style.push(styles.hide);
  } else {
    style.push(styles.show);
  }

  this._scroll.setNativeProps({
    scrollEnabled: this._enabled,
    style,
  });
};
```

## Using d3-interpolate with Animated

Lets recreate an animation that we can typically use Animated for but do the interpolating ourselves using `d3-interpolate`.

We need to `npm install d3-interpolate` first. Or just execute an `npm install` as it should already be in our `package.json`. We'll pull in 2 different interpolators. We'll bring in `interpolateNumber` and `interpolateRgb`.

When we press our button we will animation our `this.state.animation` to 1. However we haven't hooked it up to anything, or any styling.

```javascript
import React, { PureComponent } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";

import { interpolateNumber, interpolateRgb } from "d3-interpolate";

export default class App extends PureComponent {
  state = {
    animation: new Animated.Value(0),
  };
  handlePress = () => {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 500,
    }).start();
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.handlePress}>
          <View style={styles.box} ref={(view) => (this._view = view)} />
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
    width: 50,
    height: 50,
    backgroundColor: "tomato",
  },
});
```

Rather than hooking up our normal styling and using an `Animated.View` we setup a listener on our animated value.

We first need to craft our interpolations which we do very similar to `interpolate` in animated. The only difference here is that `inputRange` is always assumed to be `[0, 1]`.

```javascript
const positionInterpolate = interpolateNumber(0, 200);
const colorInterpolate = interpolateRgb("rgb(255,99,71)", "rgb(99,71,255)");
```

Then we attach our listener.

```javascript
this.state.animation.addListener(({ value }) => {
  const position = positionInterpolate(value);
  const color = colorInterpolate(value);
});
```

And when our animation is triggered our callback gets called with an object with a key called `value` that has the value. Then we can call our interpolators to get the values.

```javascript
this.state.animation.addListener(({ value }) => {
  const position = positionInterpolate(value);
  const color = colorInterpolate(value);
});
```

Then finally it's a matter of calling `setNativeProps` and updating our style accordingly.

```javascript
const style = [
  styles.box,
  {
    backgroundColor: color,
    transform: [{ translateY: position }],
  },
];
this._view.setNativeProps({ style });
```

Here is what the complete code would look like all put together.

```javascript
componentWillMount() {
    const positionInterpolate = interpolateNumber(0, 200);
    const colorInterpolate = interpolateRgb("rgb(255,99,71)", "rgb(99,71,255)");

    this.state.animation.addListener(({value}) => {
      const position = positionInterpolate(value);
      const color = colorInterpolate(value);

      const style = [
        styles.box,
        {
          backgroundColor: color,
          transform: [
            {translateY: position}
          ]
        }
      ];
      this._view.setNativeProps({ style });
    });
  }
```

## Using d3-interpolate-path and Animated to Animate Simple SVG Paths

The `d3-interpolate` SVG path interpolation requires the DOM in order to parse the path. We don't have access to it since we are in React Native. There is however `d3-interpolate-path` which operates on strings alone. I do not recommend using this module necessarily as it doesn't work well, but we'll use it to show the same technique we used before but for SVGs.

Here we are using `react-native-svg` to render SVGs. We have 2 paths, one is a small circle, and the second is a larger circle. We can use the same technique as before and use our listener callback to animate from one path to the next.

```javascript
import React, { PureComponent } from "react";
import Svg, { Path } from "react-native-svg";
import { interpolatePath } from "d3-interpolate-path";

const startPath = `M45,50a5,5 0 1,0 10,0a5,5 0 1,0 -10,0`;
const endPath = `M20,50a30,30 0 1,0 60,0a30,30 0 1,0 -60,0`;

export default class App extends PureComponent {
  state = {
    animation: new Animated.Value(0),
  };

  handlePress = () => {
    Animated.sequence([
      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: 500,
      }),
      Animated.delay(1500),
      Animated.timing(this.state.animation, {
        toValue: 0,
        duration: 500,
      }),
    ]).start();
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.handlePress}>
          <Svg width={150} height={150}>
            <Path
              d={startPath}
              stroke="black"
              ref={(path) => (this._path = path)}
            />
          </Svg>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
```

Just like before we have a listener and we do our `path` interpolation. The listener will always call us back regardless of which direction the animation is moving. So we have a `sequence` that will animate forward to `1`, delay, and then animate backwards. We'll have our `path` interpolated to a larger circle, and then animate back to it's start.

```javascript
componentWillMount() {
    const pathInterpolate = interpolatePath(startPath, endPath);

    this.state.animation.addListener(({ value }) => {
      const path = pathInterpolate(value);
      this._path.setNativeProps({
        d: path,
      });
    });
  }
```

# Using Art, Morph.Tween, and Animated to Animate Complex SVG Paths

Art is a library maintained by Facebook. The same API can be used across the web and native, and additionally on the web can point to SVG or Canvas. It has not gained popularity as it diverges from web SVG naming conventions but it is a very powerful tool for cross platform drawing.

However much of it's power comes from the `art` library it self and not necessarily using the React Native views that come standard in React Native core.

`npm install art`

It has path tweening built in and is actually generates a relatively good transformation. Also because there are multiple modes in `art` (canvas/svg/vml) we need to grab the appropriate path builder. We will import `SVGPath` from `"art/modes/svg/path"` so that it will return an svg path string. Additionally there is a generic `Tween` from `"art/morph/path"`.

Our SVGs are an arrow, that will transform to a check mark and then back.

```javascript
import React, { PureComponent } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import SVGPath from "art/modes/svg/path";
import { Tween } from "art/morph/path";

const startPath = `M32,16.009c0-0.267-0.11-0.522-0.293-0.714  l-9.899-9.999c-0.391-0.395-1.024-0.394-1.414,0c-0.391,0.394-0.391,1.034,0,1.428l8.193,8.275H1c-0.552,0-1,0.452-1,1.01  s0.448,1.01,1,1.01h27.586l-8.192,8.275c-0.391,0.394-0.39,1.034,0,1.428c0.391,0.394,1.024,0.394,1.414,0l9.899-9.999  C31.894,16.534,31.997,16.274,32,16.009z`;
const endPath = `M27.704,8.397c-0.394-0.391-1.034-0.391-1.428,0  L11.988,22.59l-6.282-6.193c-0.394-0.391-1.034-0.391-1.428,0c-0.394,0.391-0.394,1.024,0,1.414l6.999,6.899  c0.39,0.386,1.039,0.386,1.429,0L27.704,9.811C28.099,9.421,28.099,8.787,27.704,8.397C27.31,8.006,28.099,8.787,27.704,8.397z`;

export default class App extends PureComponent {
  state = {
    animation: new Animated.Value(0),
  };

  handlePress = () => {
    Animated.sequence([
      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: 500,
      }),
      Animated.delay(1500),
      Animated.timing(this.state.animation, {
        toValue: 0,
        duration: 500,
      }),
    ]).start();
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.handlePress}>
          <Svg width={150} height={150}>
            <Path
              d={startPath}
              stroke="black"
              ref={(path) => (this._path = path)}
            />
          </Svg>
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
});
```

Here we create a Tween with our 2 paths we've defined. Also we create an instance of an `SVGPath`. We will use this to tween our path with `pathInterpolate.tween(value)` passing in our value that is a number between `0` and `1`. Then we apply it to our path instance `pathInterpolate.applyToPath(p);` which will mutate the internal path.

Finally we call `toSVG()` on our path and pass that to `setNativeProps`.

```javascript
componentWillMount() {
    const pathInterpolate = Tween(startPath, endPath);
    const p = new SVGPath();

    this.state.animation.addListener(({ value }) => {
      pathInterpolate.tween(value);
      pathInterpolate.applyToPath(p);

      this._path.setNativeProps({
        d: p.toSVG()
      })
    });
  }
```

## Using Flubber and Animated for Better SVG Path Morphing

[Flubber](https://github.com/veltman/flubber/) is a great library for interpolating SVG paths that will transform more naturally. It can work with both singular paths or multiple svg paths.

Nothing new about this setup, we have 2 paths, however this time we are pulling in `interpolate` from `flubber`. I ran into issues installing it due to some weird babel plugin configuration. If you attempt to use this in your own project, check the dev dependencies of the branch and that should help fix any issues.

```javascript
import React, { PureComponent } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { interpolate } from "flubber";

const startPath = `M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z`;
const endPath = `M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z`;

export default class App extends PureComponent {
  state = {
    animation: new Animated.Value(0),
  };

  handlePress = () => {
    Animated.sequence([
      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: 500,
      }),
      Animated.delay(1500),
      Animated.timing(this.state.animation, {
        toValue: 0,
        duration: 500,
      }),
    ]).start();
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.handlePress}>
          <Svg width={150} height={150}>
            <Path
              scale={3}
              d={startPath}
              stroke="black"
              ref={(path) => (this._path = path)}
            />
          </Svg>
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
});
```

We create our `pathInterpolate` passing in the desired `startPath` and `endPath`. Then pass in our `value` between `0` and `1` to the interpolator and it will spit out a new path for us to pass along to `setNativeProps`.

```javascript
componentWillMount() {
    const pathInterpolate = interpolate(startPath, endPath, {
      maxSegmentLength: 1,
    });

    this.state.animation.addListener(({ value }) => {
      const path = pathInterpolate(value);
      this._path.setNativeProps({
        d: path,
      });
    });
  }
```
