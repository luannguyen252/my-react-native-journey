# Basic Real World

## 4 Corners

In this demo we'll walk through sequence of animating to 4 corners of the screen. We'll take advantage of `Dimensions`, `Animated.ValueXY`, `Animated.sequence`, and `Animated.spring`. We will gather the layout dynamically and animate the view to all the corners.

We'll setup a basic React Native component. We'll add 3 additional imports, `Animated`, `TouchableWithoutFeedback`, and `Dimensions`.

We'll create a state variable called `animation` to hold our `Animated.ValueXY`.

```javascript
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

export default class App extends Component {
  state = {
    animation: new Animated.ValueXY(),
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback>
          <Animated.View style={[styles.box]} />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
```

Our `TouchableWithoutFeedback` will use the `React.cloneElement` command and apply properties to our child view without adding any additional layout items. This means that we should apply our box styling to the `Animated.View`. This is different than other `Touchable` elements as they usually wrap the child element in an `Animated.View` which will effect positioning.

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: "tomato",
    position: "absolute",
    top: 0,
    left: 0,
  },
});
```

**Get the Box Layout**

A key concept in animating some complex animations is having to know the current dimensions of a particular element and or a target element. There are a few methods but one of the most basic is using the `onLayout` prop. Due to the layout calculations occurring on the native side, we need to pass a callback so we can get the values once the view layout completes.

We will also need to pass them to our `TouchableWithoutFeedback` because of the way it is structured to use `React.cloneElement` and it explicitly overrides the `onLayout` of the child view. So if we passed it to our `Animated.View` it would never be called.

```javascript
<TouchableWithoutFeedback
  onPress={this.startAnimation}
  onLayout={this.saveDimensions}
></TouchableWithoutFeedback>
```

Here we simply save off the width and height so we can access it later.

```javascript
saveDimensions = (e) => {
  this._width = e.nativeEvent.layout.width;
  this._height = e.nativeEvent.layout.height;
};
```

**Animate to the corners**

Now we'll need to also know the height and width of the window, so we'll use our `Dimensions` import and get the `width` and `height` of our window.

For our first corner animation, we'll go down the left side of the screen. Meaning we'll need to animate the `y` value of our `Animated.ValueXY`. We need to animate to the `height` of the screen minus the size of our `box` which we put at `this._height`.

```javascript
startAnimation = () => {
  const { width, height } = Dimensions.get("window");

  Animated.spring(this.state.animation.y, {
    toValue: height - this._height,
  });
};
```

The next corner will be the bottom right. Which means we need to animate across our screen. We already animated our `y` position so now we just need to animate our `x` position. Just like height we'll need to use our screen width minus the `box` width we saved at `this._width`.

```javascript
Animated.spring(this.state.animation.x, {
  toValue: width - this._width,
});
```

Now we're in the bottom right, and we'll move our box back up to the top right. We don't need to know the height as we are just animating our `y` back to the beginning which is `0`.

```javascript
Animated.spring(this.state.animation.y, {
  toValue: 0,
});
```

Finally we animate our `x` back to `0` where it started and we're officially at the start.

```javascript
Animated.spring(this.state.animation.x, {
  toValue: 0,
});
```

Now to combine all of our animations to happen one after the other we can simply use `Animated.sequence` and pass the entire series of animations in as an array.

```javascript
startAnimation = () => {
  const { width, height } = Dimensions.get("window");

  Animated.sequence([
    Animated.spring(this.state.animation.y, {
      toValue: height - this._height,
    }),
    Animated.spring(this.state.animation.x, {
      toValue: width - this._width,
    }),
    Animated.spring(this.state.animation.y, {
      toValue: 0,
    }),
    Animated.spring(this.state.animation.x, {
      toValue: 0,
    }),
  ]).start();
};
```

**Apply Style**

We need to apply our style, and `Animated.ValueXY` comes with a handy transform shorthand. The `getTranslateTransform` will return an array of transforms for `translateX` and `translateY`.

The equivalent would be

```javascript
[
  { translateX: this.state.animation.x },
  { translateY: this.state.animation.y },
];
```

```javascript
render() {
    const animatedStyles = {
      transform: this.state.animation.getTranslateTransform()
    }

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={this.startAnimation}
          onLayout={this.saveDimensions}
        >
          <Animated.View style={[styles.box, animatedStyles]} />
        </TouchableWithoutFeedback>
      </View>
    );
  }
```

This demo is not complex by any means, the purpose is to focus on how we can use the Dimensions of the screen and dynamically measure the view so we can move it around the screen. The animation doesn't have to be completed all at the same time either. Using sequence and other animation combinators like parallel and stagger we can progressively move items around using the same animated value. This is a crucial concept to understand especially when it comes to dealing with interpolations.

## Kitten Cards

Dragging cards left/right has become the new way to quickly make decisions on apps. Adding draggable card stacks can take some fine tuning to get the ideal feeling for your app. We'll walk through how to implement the drag and additionally add an extra animation step to scale in the next card.

We'll need to gather a few images, and install a module from npm. I've provided the images but if you prefer non-cat related images you can pick your own set.

We'll use the `clamp` module from npm to be able to clamp our velocity so we don't throw cards off the screen.

```bash
npm install clamp
```

Now our basic setup will include some structure on our state, and also setting up a `SWIPE_THRESHOLD`. This threshold will define how far you want to be able to drag a card before it is considered a decision. This is an arbitrary number, but you may want to base it off of screen size, or something else.

Additionally we'll setup 3 animated values. One for the dragging of the card that is on top. The second for the fade out opacity of the card once a decision has been made. The third for the scale of the card behind the top card to add a subtle pop in effect.

We want to add a button bar on the bottom, so we'll add a wrapping container, and then an additional top container to hold our cards. This will keep space for our button bar on the bottom.

```javascript
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import clamp from "clamp";

import Cat1 from "./cat1.jpeg";
import Cat2 from "./cat2.jpeg";
import Cat3 from "./cat3.jpeg";
import Cat4 from "./cat4.jpeg";

const SWIPE_THRESHOLD = 120;
const { height } = Dimensions.get("window");

export default class App extends Component {
  state = {
    items: [
      {
        image: Cat1,
        id: 1,
        text: "Sweet Cat",
      },
      {
        image: Cat2,
        id: 2,
        text: "Sweeter Cat",
      },
      {
        image: Cat3,
        id: 3,
        text: "Sweetest Cat",
      },
      {
        image: Cat4,
        id: 4,
        text: "Aww",
      },
    ],
    animation: new Animated.ValueXY(),
    opacity: new Animated.Value(1),
    next: new Animated.Value(0.9),
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
```

**Add The Cards**

We will use `slice` and `reverse` to get the first 2 cat items. Then reverse so that the first one will be rendered on top and be touchable. Only rendering 2 items will allow us to handle any significant amount as we won't render all of the cards but we'll make it look like it's an infinite list with all rendered. Additionally this will allow us to focus our animations on a subset of views without worrying about other views.

```javascript
return (
  <View style={styles.container}>
    <View style={styles.top}>
      {this.state.items
        .slice(0, 2)
        .reverse()
        .map(({ image, id, text }, index, items) => {
          return (
            <Animated.View style={[styles.card]} key={id}>
              <Animated.Image
                source={image}
                style={[styles.image]}
                resizeMode="cover"
              />
              <View style={styles.lowerText}>
                <Text>{text}</Text>
              </View>
            </Animated.View>
          );
        })}
    </View>
  </View>
);
```

The key piece of styling here is the `position: "absolute"` on the card without `left/top` positioning. This means the `alignItems: "center"` and `justifyContent: "center"` will effect the cards and allow them to float freely on top of each other.

On Android you need to add an `elevation` to the card if you want a shadow to appear. Shadows do not work on Android yet.

Also rather than defining a set width/height of our image or text we can use `flex`. If we clear `width/height` to null, we can specify that our image should take up `3` times as much space as the lower text container.

```javascript
card: {
    width: 300,
    height: 300,
    position: "absolute",
    borderRadius: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { x: 0, y: 0 },
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: "#FFF",
  },
  lowerText: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 5,
  },
  image: {
    width: null,
    height: null,
    borderRadius: 2,
    flex: 3,
  },
```

**Drag a Card**

We setup a `PanResponder`, and because we don't intend for the cards to ever be dragged after they already were dragged we do not need to call `extractOffset`.

Then we will use `Animated.event` to map our `dx/dy` to our animated values for dragging.

Our release will be the key area as this is where the drag needs to be analyzed and a decision made.

We first need to figure out the velocity. If our velocity was 0 or positive then we will `clamp` it between `3` and `5` for our decay.

If it's negative we will use `Math.abs` to flip it to positive value, clamp it, and then multiply by `-1` to convert it back to a negative value.

Then we need to decide on if we met our threshold for a decision. We'll convert our `dx` drag to an always positive number with `Math.abs` and see if exceeded our threshold. If it did then we will continue our `decay` animation and the velocity that we had figured out. Then we can call our `transitionNext` function.

Otherwise it didn't meet our threshold we can animate back to `0`.

```javascript
componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.animation.x,
          dy: this.state.animation.y,
        },
      ]),
      onPanResponderRelease: (e, { dx, vx, vy }) => {
        let velocity;

        if (vx >= 0) {
          velocity = clamp(vx, 3, 5);
        } else if (vx < 0) {
          velocity = clamp(Math.abs(vx), 3, 5) * -1;
        }

        if (Math.abs(dx) > SWIPE_THRESHOLD) {
          Animated.decay(this.state.animation, {
            velocity: { x: velocity, y: vy },
            deceleration: 0.98,
          }).start(this.transitionNext);
        } else {
          Animated.spring(this.state.animation, {
            toValue: { x: 0, y: 0 },
            friction: 4,
          }).start();
        }
      },
    });
  }
```

This is an arbitrary function that can be called after a decision has been made. It can be used for the swipe, as well as the yes/no buttons.

Once our animation is complete then we will trigger a `setState` and remove our top card with `slice(1)`. Because we are referencing our previous state we'll use the `updater` method of `setState` which is a function that receives the existing state and will trigger a `setState` with returned object.

```javascript
transitionNext = () => {
  this.setState((state) => {
    return {
      items: state.items.slice(1),
    };
  });
};
```

Now we need to apply our panHandlers to the top view. We reversed the 2 items, so that means the view on top will be the last item in the list. So we just grab the 3rd argument which is the list of items we are mapping over and then see if it's the last item.

We can then either return our `panHandlers` or an empty object to make it easy to spread onto our view.

Our animation style is built using our `this.state.opacity` directly, as well as the `getTranslateTransform` transform helper.

We'll add in an arbitrary `200` on either side drag with an `outputRange` of `30deg` and clamp it so that our card cannot turn more than 30 degrees to either side.

We'll also apply an opacity with the same `200` range and fade out the image slightly as the card is being dragged in a particular direction. This will then allow us to emphasize the yes/no as it scales in and our image fades out.

```javascript
const { animation } = this.state;

const rotate = animation.x.interpolate({
  inputRange: [-200, 0, 200],
  outputRange: ["-30deg", "0deg", "30deg"],
  extrapolate: "clamp",
});

const opacity = animation.x.interpolate({
  inputRange: [-200, 0, 200],
  outputRange: [0.5, 1, 0.5],
});

const animatedCardStyles = {
  transform: [{ rotate }, ...this.state.animation.getTranslateTransform()],
  opacity: this.state.opacity,
};

const animatedImageStyles = {
  opacity,
};

{
  this.state.items
    .slice(0, 2)
    .reverse()
    .map(({ image, id, text }, index, items) => {
      const isLastItem = index === items.length - 1;
      const panHandlers = isLastItem ? this._panResponder.panHandlers : {};

      const imageStyle = isLastItem ? animatedImageStyles : undefined;
      const cardStyle = isLastItem ? animatedCardStyles : undefined;

      return (
        <Animated.View {...panHandlers} style={[styles.card]} key={id}>
          <Animated.Image
            source={image}
            style={[styles.image, imageStyle]}
            resizeMode="cover"
          />
          <View style={styles.lowerText}>
            <Text>{text}</Text>
          </View>
        </Animated.View>
      );
    });
}
```

**Yes/No**

The `yes/no` appearing are all controlled based upon the direction that the drag is happening. We will want to control the `scale` and `opacity` of the `yes/no` that is sitting inside the card, on top of the image. We will also just add a static `rotate` of `30deg`. This could be placed in our `StyleSheet` but you may want to make this dynamic so I've placed it here.

We'll only want to show them on top of the top card, aka the last item. So we will only render it if it's the last item using our `isLastItem` variable.

The ranges for the `yes/no` are again arbitrary, but it's key to note that the `inputRange` will correspond with the direction that the cards are dragged.

To the right (yes) will be positive values, so at `0` nothing is shown so we can see the `0` in the `inputRange` maps to a `0` in the output range. Then as we drag towards `150` on the right it will slowly scale in.

For our no, we need to handle when we drag to the left, aka going negative on our x animation. In our case we have `-150` as the first value because we start at `0`. `inputRange`s always need to be going in a ascending fashion. So from either (0 or negative) => greater value.

This is why we then need to flip out `outputRange`, because the `0` in is the second argument and at `0` we want no animation to be applied.

```javascript
const yesOpacity = animation.x.interpolate({
  inputRange: [0, 150],
  outputRange: [0, 1],
});
const yesScale = animation.x.interpolate({
  inputRange: [0, 150],
  outputRange: [0.5, 1],
  extrapolate: "clamp",
});
const animatedYupStyles = {
  transform: [{ scale: yesScale }, { rotate: "-30deg" }],
  opacity: yesOpacity,
};

const noOpacity = animation.x.interpolate({
  inputRange: [-150, 0],
  outputRange: [1, 0],
});
const noScale = animation.x.interpolate({
  inputRange: [-150, 0],
  outputRange: [1, 0.5],
  extrapolate: "clamp",
});
const animatedNopeStyles = {
  transform: [{ scale: noScale }, { rotate: "30deg" }],
  opacity: noOpacity,
};

{
  this.state.items
    .slice(0, 2)
    .reverse()
    .map(({ image, id, text }, index, items) => {
      const isLastItem = index === items.length - 1;
      const isSecondToLast = index === items.length - 2;

      const panHandlers = isLastItem ? this._panResponder.panHandlers : {};
      const cardStyle = isLastItem ? animatedCardStyles : undefined;

      return (
        <Animated.View
          {...panHandlers}
          style={[styles.card, cardStyle]}
          key={id}
        >
          <Animated.Image
            source={image}
            style={[styles.image, imageStyle]}
            resizeMode="cover"
          />
          <View style={styles.lowerText}>
            <Text>{text}</Text>
          </View>

          {isLastItem && (
            <Animated.View style={[styles.nope, animatedNopeStyles]}>
              <Text style={styles.nopeText}>Nope!</Text>
            </Animated.View>
          )}

          {isLastItem && (
            <Animated.View style={[styles.yup, animatedYupStyles]}>
              <Text style={styles.yupText}>Yup!</Text>
            </Animated.View>
          )}
        </Animated.View>
      );
    });
}
```

Then we do some styling, we setup a green border, with coloring, and position in the `top/left` for yes, and `top/right` for nope. These will be on the opposite directions of the drag so they can stay visible to the user.

```javascript
yup: {
    borderColor: "green",
    borderWidth: 2,
    position: "absolute",
    padding: 20,
    borderRadius: 5,
    top: 20,
    left: 20,
    backgroundColor: "#FFF",
  },
  yupText: {
    fontSize: 16,
    color: "green",
  },
  nope: {
    borderColor: "red",
    borderWidth: 2,
    position: "absolute",
    padding: 20,
    borderRadius: 5,
    right: 20,
    top: 20,
    backgroundColor: "#FFF",
  },
  nopeText: {
    fontSize: 16,
    color: "red",
  },
```

**Pop and Transition To Next Card**

The only addition here to the map is that we need to know if it's the `secondToLastItem` aka the card behind our top card. We could check if we're at the `0` index, but if you're rendering more than `1` card in the future this math will work.

Regardless we create a new transform and just pass our `this.state.next` animated value into scale and apply it to our card as `nextStyle`.

```javascript
{
  this.state.items
    .slice(0, 2)
    .reverse()
    .map(({ image, id, text }, index, items) => {
      const isLastItem = index === items.length - 1;
      const isSecondToLast = index === items.length - 2;

      const panHandlers = isLastItem ? this._panResponder.panHandlers : {};
      const cardStyle = isLastItem ? animatedCardStyles : undefined;
      const imageStyle = isLastItem ? animatedImageStyles : undefined;
      const nextStyle = isSecondToLast
        ? { transform: [{ scale: this.state.next }] }
        : undefined;

      return (
        <Animated.View
          {...panHandlers}
          style={[styles.card, cardStyle, nextStyle]}
          key={id}
        >
          <Animated.Image
            source={image}
            style={[styles.image, imageStyle]}
            resizeMode="cover"
          />
          <View style={styles.lowerText}>
            <Text>{text}</Text>
          </View>

          {isLastItem && (
            <Animated.View style={[styles.nope, animatedNopeStyles]}>
              <Text style={styles.nopeText}>Nope!</Text>
            </Animated.View>
          )}

          {isLastItem && (
            <Animated.View style={[styles.yup, animatedYupStyles]}>
              <Text style={styles.yupText}>Yup!</Text>
            </Animated.View>
          )}
        </Animated.View>
      );
    });
}
```

Here we do our pop and opacity fade out at the same time. Our opacity is for the front card that's been moved out of the way, and the `next` is the scale transition that will make the card look as if it's springing into place.

The key here is our callback to our `setState`. The callback is a `componentDidUpdate` callback. This means that we've removed the card that was swiped and now our previous card that popped into place will now officially be the card stacked on top.

We need to reset all our values now since it's a fresh card so we'll set our `opacity` to `1`, and then our `next` scale we'll reset back to `.9` to spring into place. Then finally we reset our drag position to be `0` again.

```javascript
transitionNext = () => {
  Animated.parallel([
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: 300,
    }),
    Animated.spring(this.state.next, {
      toValue: 1,
      friction: 4,
    }),
  ]).start(() => {
    this.setState(
      (state) => {
        return {
          items: state.items.slice(1),
        };
      },
      () => {
        this.state.next.setValue(0.9);
        this.state.opacity.setValue(1);
        this.state.animation.setValue({ x: 0, y: 0 });
      }
    );
  });
};
```

**Add Buttons**

Below our `top` container we add our button bar. These are just a few styled buttons for yes and no.

```javascript
<View style={styles.buttonBar}>
  <TouchableOpacity
    onPress={this.handleNo}
    style={[styles.button, styles.nopeButton]}
  >
    <Text style={styles.nopeText}>NO</Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={this.handleYes}
    style={[styles.button, styles.yupButton]}
  >
    <Text style={styles.yupText}>YES</Text>
  </TouchableOpacity>
</View>
```

The button bar is set to `flexDirection: "row"` and we center our buttons on the screen.

```javascript
buttonBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  button: {
    marginHorizontal: 10,
    padding: 20,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.3,
    shadowOffset: { x: 0, y: 0 },
    shadowRadius: 5,
  },
  yupButton: {
    shadowColor: "green",
  },
  nopeButton: {
    shadowColor: "red",
  },
```

Finally with our arbitrary `transitionNext` call setup we can emulate what a drag to the perfect position would have been. We simply animate our `x` position which has our `rotate`, and our `yes/no` values interpolated off of to our desired `SWIPE_THRESHOLD`.

For our no we need to animate to a negative `SWIPE_THRESHOLD`, and for yes a positive `SWIPE_THRESHOLD`.

```javascript
handleNo = () => {
  Animated.timing(this.state.animation.x, {
    toValue: -SWIPE_THRESHOLD,
  }).start(this.transitionNext);
};
handleYes = () => {
  Animated.timing(this.state.animation.x, {
    toValue: SWIPE_THRESHOLD,
  }).start(this.transitionNext);
};
```

**Ending**

Just understand that when you are dealing with drags, you can animate at any point depending on what you are attempting to accomplish.

You have `onPanResponderGrant`, `onPanResponderMove`, and `onPanResponderRelease` at your disposal. Think of these as life cycle methods of React, but for a drag.

The `onPanResponderGrant` will be called once per drag when it starts. This is where we do any setup necessary to prepare for the drag. Typically you'll be doing stuff for your animated values that will be effected by the `onPanResponderMove`. However you could imagine that you want to trigger a start animation.

The `onPanResponderMove` will be called for every drag operation that happens. You likely will be piping this into an `Animated.ValueXY`, however there could be case that you need to trigger an animation based upon the position of a drag. Do realize that using `Animated.event` is calling `setValue` which is technically triggering an animation. So don't hesitate to trigger animations in `onPanResponderMove`. Like animating a color if the drag goes too far, and we need that in real time.

The `onPanResponderRelease` is post-drag. This is generally going to be when you either reset an animation back to it's normal state. Like when a user doesn't drag far enough on our cards up above. Additionally this is also when you can do some sort of completion animation. This is where we can also use `setState` to effect layouts because this only called once.

There are even more `PanResponder` methods but these are the most important 3. Play around with executing animations in each function and see what you can do.

## Stagger Form Items Visibility on Mount

There may be times where you want to have an effect on mount. In some cases a subtle hidden => visible effect. This can be applied to many different elements for example google does a slight translate/fade for it's now cards. We'll apply it to inputs of a login form.

We'll start by importing the various components we'll need. The first key piece is the `Animated.createAnimatedComponent` call. `Animated` doesn't export a pre-wrapped `TextInput` for us so we need to create a `TextInput` that can handle animated values.

Then because we will have 3 pieces to this form, an email, password, and a button we need to setup an animated value for each.

```javascript
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Animated,
  KeyboardAvoidingView,
} from "react-native";

import Background from "./background.jpg";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default class App extends Component {
  state = {
    email: new Animated.Value(0),
    password: new Animated.Value(0),
    button: new Animated.Value(0),
  };

  render() {
    return <View style={styles.container}></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

**Add Background**

To set a background we will use `Image`, and use the `StyleSheet.absoluteFill` helper to make it cover the entire screen. We also need to set the `width` and `height` to `null` so that our child elements are laid out correctly.

```javascript
render() {
    return (
      <View style={styles.container}>
        <Image
          source={Background}
          resizeMode="cover"
          style={[StyleSheet.absoluteFill, { width: null, height: null }]}
        >

        </Image>
      </View>
    );
  }
```

**Center Some Content**

In order for our view to appear in the middle we will add 2 `View`s on either side that are both `flex: 1`. This will create even sized height on either side of our center view. We then use `KeyboardAvoidingView` so that on small screens our view will be moved upward and still be visible for users to type in content.

```javascript
render() {
    return (
      <View style={styles.container}>
        <Image
          source={Background}
          resizeMode="cover"
          style={[StyleSheet.absoluteFill, { width: null, height: null }]}
        >
          <View style={styles.container} />
          <KeyboardAvoidingView behavior="padding">

          </KeyboardAvoidingView>
          <View style={styles.container} />
        </Image>
      </View>
    );
  }
```

**Add Form Title and Styling**

We'll setup some form styling. The `KeyboardAvoidingView` is a `View` itself so we will apply our styling to it. We'll add a container, and a title.

```javascript
<KeyboardAvoidingView style={styles.form} behavior="padding">
  <View style={styles.container}>
    <Text style={styles.title}>Login</Text>
  </View>
</KeyboardAvoidingView>
```

Our styling for our form will be a light dark see through background with some padding on either side. We will also be sure and add `backgroundColor: "transparent"` to our title otherwise it will have a white background.

```javascript
title: {
    fontSize: 30,
    color: "#FFF",
    backgroundColor: "transparent",
    textAlign: "center",
    marginBottom: 10,
  },
  form: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,.25)",
    paddingVertical: 10,
  },
```

**Add Fields**

Next we'll add in our `TextInput`s, but we'll use the `AnimatedTextInput` that we created earlier. The other thing we need to do is get a `ref` to the element. This will allow us to focus on the input later when our animation is complete.

```javascript
<KeyboardAvoidingView style={styles.form} behavior="padding">
  <View style={styles.container}>
    <Text style={styles.title}>Login</Text>
    <AnimatedTextInput
      ref={(email) => (this._email = email)}
      style={[styles.input]}
      placeholder="Email"
      keyboardType="email-address"
    />
    <AnimatedTextInput
      placeholder="Password"
      style={[styles.input]}
      secureTextEntry
    />
  </View>
</KeyboardAvoidingView>
```

This is just some standard input styling, most importantly we need to define a `width` and `height`.

```javascript
input: {
    width: 250,
    height: 35,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#FFF",
    color: "#333",
    backgroundColor: "#FFF",
  },
```

**Add a Button**

We'll add our button bellow our inputs, and just use a `TouchableOpacity`. We'll need to use an `Animated.View` for our button to be able to transition.

```javascript
<KeyboardAvoidingView style={styles.form} behavior="padding">
  <View style={styles.container}>
    <Text style={styles.title}>Login</Text>
    <AnimatedTextInput
      ref={(email) => (this._email = email)}
      style={[styles.input]}
      placeholder="Email"
      keyboardType="email-address"
    />
    <AnimatedTextInput
      placeholder="Password"
      style={[styles.input]}
      secureTextEntry
    />
    <TouchableOpacity>
      <Animated.View style={[styles.button]}>
        <Text style={styles.buttonText}>Login</Text>
      </Animated.View>
    </TouchableOpacity>
  </View>
</KeyboardAvoidingView>
```

```javascript
button: {
    marginTop: 10,
    backgroundColor: "tomato",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 16,
  },
```

**Add Animated Styles**

Our animations will be exactly the same for each of our animated values so we'll create a function that will take each animated value and return styling.

In our case we will use `interpolate` to offset our view `-5`. This way it will start offset upwards 5 and then slowly descend to a `0` offset.

We'll just pass in our `animation` as the opacity as it will be animating from `0` to `1` which is the animation we want.

```javascript
const createAnimationStyle = (animation) => {
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-5, 0],
  });

  return {
    opacity: animation,
    transform: [
      {
        translateY,
      },
    ],
  };
};
```

Finally to use it we just call our function and pass in our animated values, then pass them into each of the corresponding views.

```javascript
render() {
    const emailStyle = createAnimationStyle(this.state.email);
    const passwordStyle = createAnimationStyle(this.state.password);
    const buttonStyle = createAnimationStyle(this.state.button);

    return (
      <View style={styles.container}>
        <Image
          source={Background}
          resizeMode="cover"
          style={[StyleSheet.absoluteFill, { width: null, height: null }]}
        >
          <View style={styles.container} />
          <KeyboardAvoidingView style={styles.form} behavior="padding">
            <View style={styles.container}>
              <Text style={styles.title}>Login</Text>
              <AnimatedTextInput
                ref={email => (this._email = email)}
                style={[styles.input, emailStyle]}
                placeholder="Email"
                keyboardType="email-address"
              />
              <AnimatedTextInput
                placeholder="Password"
                style={[styles.input, passwordStyle]}
                secureTextEntry
              />
              <TouchableOpacity>
                <Animated.View style={[styles.button, buttonStyle]}>
                  <Text style={styles.buttonText}>Login</Text>
                </Animated.View>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
          <View style={styles.container} />
        </Image>
      </View>
    );
  }
```

**Stagger Animation**

Our animation for each will be exactly the same, but if you desire a different animation you can customize each specifically. We'll use `stagger` and provide a `100ms` offset before each animation is executed.

The most important piece here is passing a callback to `start` so we can call `focus` on our email input so the user will be able to start typing into the field. Because we are referencing an animated value we need to call `getNode()` to get access to the internal ref of the actual `TextInput` instance so we can call `focus`.

```javascript
componentDidMount() {
    Animated.stagger(100, [
      Animated.timing(this.state.email, {
        toValue: 1,
        duration: 200,
      }),
      Animated.timing(this.state.password, {
        toValue: 1,
        duration: 200,
      }),
      Animated.timing(this.state.button, {
        toValue: 1,
        duration: 200,
      }),
    ]).start(() => {
      this._email.getNode().focus();
    });
  }
```

**Ending**

Staggering fade of certain elements can help direct the users focus towards specific elements while also giving you extra time you may need to load it's content. Also when dealing with forms, focus the form field for the users so they do not have to tap on the form field.

## Animated Progress Bar Button

We could potentially use a single animated value with interpolate. However you may want to make this a reusable component with a piped in user value. This could potentially make things complicated if you wanted a secondary animation after the value reached 100%.

So instead of one we'll start with 2 animated values. The first will be for progress the bar behind, and the second will be for fading out the animated background.

Also we setup a button that's a `TouchableWithoutFeedback`, with our button view and text. Our styling is just setting an arbitrary background color, centering our content which is just our text, and also ensuring we add a `backgroundColor: "transparent"` to the text.

```javascript
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";

export default class App extends Component {
  state = {
    animation: new Animated.Value(0),
    opacity: new Animated.Value(1),
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.handlePress}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Get it!</Text>
          </View>
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
  button: {
    backgroundColor: "#e6537d",
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 60,
    paddingVertical: 10,
    overflow: "hidden",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 24,
    backgroundColor: "transparent",
  },
});
```

**Add our Covering View**

We will add a covering view to contain our animation, this will just use the `StyleSheet.absoluteFill` to cover the existing space, and ensure that when we use our percentage based interpolation that it's values are accurate and don't go outside the bounds of our button.

```javascript
<View style={styles.button}>
  <View style={StyleSheet.absoluteFill}></View>
  <Text style={styles.buttonText}>Get it!</Text>
</View>
```

**Full Cover Background**

Now we'll setup our animated view inside of our wrapping container. We'll apply a partial progress styling. This will position our view absolutely so it'll be with in the bounds of our button, and then in the top left corner. However we'll use our dynamic styling next to be able to control the style of the progress animation.

```javascript
<View style={StyleSheet.absoluteFill}>
  <Animated.View style={[styles.progress, styles.opacityBackground]} />
</View>
```

```javascript
progress: {
    position: "absolute",
    left: 0,
    top: 0,
  },
```

**The Animation**

Depending on the requirements of your app will depend on how you handle a press on the button while an animation is happening. You may want to potentially disable the button, but we'll just reset our animation instead using `setValue`.

We'll animate to `1` over `1500` milliseconds. Then if we successfully finished our animation, meaning it wasn't interrupted by another button tap, then we'll trigger our second animation and animate our opacity to `0` for our progress bar.

```javascript
handlePress = () => {
  this.state.animation.setValue(0);
  this.state.opacity.setValue(1);

  Animated.timing(this.state.animation, {
    duration: 1500,
    toValue: 1,
  }).start(({ finished }) => {
    if (finished) {
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: 200,
      }).start();
    }
  });
};
```

**Interpolate**

Now to make our animation work we need to setup some interpolations. The first will be a progress interpolation that will out put a percentage. This will just interpolate from `0%` to `100%`, and clamp it so it will never go more than `100%` or less than `0%`.

Our color interpolation will also operate off of our `this.state.animation`. This could be user supplied as long as it was an rgba/rgb value, or any other non-hex color.

Then we finally pipe our color and our opacity animation into our styling.

```javascript
const progressInterpolate = this.state.animation.interpolate({
  inputRange: [0, 1],
  outputRange: ["0%", "100%"],
  extrapolate: "clamp",
});

const colorInterpolate = this.state.animation.interpolate({
  inputRange: [0, 1],
  outputRange: ["rgb(71,255,99)", "rgb(99,71,255)"],
});

const progressStyle = {
  opacity: this.state.opacity,
  backgroundColor: colorInterpolate,
};
```

Apply the style object to the view.

```javascript
<View style={StyleSheet.absoluteFill}>
  <Animated.View
    style={[styles.progress, progressStyle, styles.opacityBackground]}
  />
</View>
```

**Left to Right**

In order to control our animation style we will use our `progressInterpolate` in different ways. For a class left to right animation we need to add 2 values.

The first is our `width` which will be a percentage, and then our `bottom: 0` which will tell our progress view to expand all the way the bottom of the button. Remember our `progress` styling already has `top: 0, left: 0` on it.

```javascript
const progressStyle = {
  width: progressInterpolate,
  bottom: 0,
  opacity: this.state.opacity,
  backgroundColor: colorInterpolate,
};
```

**Top Down**

For a top down animation, we'll need to pipe our `progressInterpolate` into height. The width will always be the entire button so rather than a `bottom: 0` we can add in a `right: 0`. Then the height will be our percentage that goes from `0%` to `100%`.

```javascript
const progressStyle = {
  height: progressInterpolate,
  right: 0,
  opacity: this.state.opacity,
  backgroundColor: colorInterpolate,
};
```

**Small Bottom**

Finally what if we wanted a small progress bar at the bottom of the button. We already specified `top: 0` in our `progress` style so we can simply override that with `top: null` as long as we place our `progressStyle` object after our `styles.progress` in the array.

We'll then position it at the bottom, give it a small height, and pass in our `progressInterpolate` to width.

```javascript
const progressStyle = {
  top: null,
  bottom: 0,
  width: progressInterpolate,
  height: 5,
  opacity: this.state.opacity,
  backgroundColor: colorInterpolate,
};
```

**Opacity Background**

Rather than having a color we could also define a default white background color with 50% opacity, so that our pink background will be visible. This would be applied with any of the effects above and we could then ditch the `backgroundColor` interpolation, and just place the `opacityBackground` style in the array of the progress bar.

```javascript
opacityBackground: {
    backgroundColor: "rgba(255,255,255,.5)",
  },
```

```javascript
<Animated.View
  style={[styles.progress, progressStyle, styles.opacityBackground]}
/>
```

**Ending**

This demo takes advantage of a handy technique which is interpolating `%`. Do note that this is effecting a layout value. This is not ideal but just understand that animating layout values can effect performance but are sometimes necessary. Just be cognizant that if you are seeing performance issues you may need to switch to using `transform`s.

## Dynamic Animated Notifications

Adding a system for errors, and notifications to your app is crucial. It provides valuable feedback so your users can stay informed, and take necessary actions. React Native makes it easy to build a notification view that can be dynamically sized and animate so that feedback isn't jarring.

We'll walk through the few steps to setup a notification view, animate it into view, and finally animate it out of view.

We first need to do a little setup to help us create our notification. This likely won't be in your application but for us we need a way to type in some text, and trigger it with a push of a button.

Because we need to store our text value somewhere we need to create some state.

We'll do that using the class property syntax like so. This will create our state object for this instance and create a key called `value` with an empty string.

```javascript
export default class animated_notification extends Component {
  state = {
    value: "",
  };
}
```

Next up our render function.

```javascript
render() {
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.input}
            value={this.state.value}
            onChangeText={value => this.setState({ value })}
          />
          <TouchableOpacity onPress={this.handlePress}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Show Notification</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
```

Here we've setup a simple container that centers everything (we'll get to styling in a second). Inside of our container we have a wrapping `View` around 2 other components.

The first is our `TextInput`. This will be where we type in our notification. We pass in our `this.state.value` that we setup up above. Then use the `onChangeText` callback to update our `value` on state. This is a standard technique to have a controlled input in React. Anytime the `state` changes the `TextInput` will update it's value.

Finally we have our `TouchableOpacity`. This provides us an `onPress` callback to trigger our notification to show. We add a wrapping `View` and some `Text` so we can style our button.

It calls our `handlePress` function that is also utilizing class property syntax. This allows us to bind our function to the component instance automatically.

```javascript
handlePress = () => {};
```

Now our styling. Here is our initial styling.

`container` takes up the entire screen with the `flex: 1` and centers our items horizontal and vertically.

`button` is our inner button view, we just add some padding, a background color, and margin to have some separation between our input.

`buttonText` changes our text to white, and centers the text in the middle of our button.

`input` We setup up some basic dimensions (width/height), some padding which will indent our text, and finally add a light border.

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "tomato",
    padding: 15,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
  },
  input: {
    width: 250,
    height: 40,
    padding: 5,
    borderWidth: 1,
    borderColor: "#CCC",
  },
});
```

Our entire default setup looks like this.

```javascript
export default class App extends Component {
  state = {
    value: "",
  };

  handlePress = () => {};

  render() {
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.input}
            value={this.state.value}
            onChangeText={(value) => this.setState({ value })}
          />
          <TouchableOpacity onPress={this.handlePress}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Show Notification</Text>
            </View>
          </TouchableOpacity>
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
  button: {
    backgroundColor: "tomato",
    padding: 15,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
  },
  input: {
    width: 250,
    height: 40,
    padding: 5,
    borderWidth: 1,
    borderColor: "#CCC",
  },
});
```

**Setup Notification**

We need to setup another state variable to hold onto our notification text and clear our `value`. So lets edit our `state` to look like

```javascript
state = {
  value: "",
  notification: "",
};
```

Next we need to change over our `handlePress` to clear our `value` and place it onto our new `notification` state.

```javascript
handlePress = () => {
  this.setState({
    value: "",
    notification: this.state.value,
  });
};
```

Now it's time to craft what our notification looks like. We'll be animating the notification which means we need to use an `Animated.View` and not just a regular `View`.

We setup a ref `<Animated.View ref={notification => (this._notification = notification)}>` because we need to use the `measure` function on the ref eventually so we can actually craft a dynamic animation based upon the height of the of notification.

This will allow us to make a flexible notification component rather than specifying a specific height.

The final piece is the text that will render our `this.state.notification`.

```javascript
<View style={styles.container}>
  <Animated.View
    style={[styles.notification]}
    ref={(notification) => (this._notification = notification)}
  >
    <Text style={styles.notificationText}>{this.state.notification}</Text>
  </Animated.View>
  // TextInput and button code
</View>
```

We need to add our `notification` and `notificationText` style.

```javascript
notification: {
    position: "absolute",
    paddingHorizontal: 7,
    paddingVertical: 15,
    left: 0,
    top: 0,
    right: 0,
    backgroundColor: "tomato",
},
notificationText: {
    color: "#FFF",
},
```

The `notificationText` is merely adding a white color. The `notification` is what will position and style our notification. We use `position: "absolute"` so our notification won't be effected by our `container` styling. We add some padding so our internal notification text isn't right on the edge of our screen.

Finally we use `left: 0, right: 0, top: 0` to position the view at the top and across the screen. This will size the notification view to the edges of it's parent container. In our case the parent container is the `container` view which takes up the entire screen. So our notification view will stretch across the screen.

**Hide To Start**

We want the notification to start off hidden and animate visible. Which means we need to setup an animated value to control the opacity of our notification view. We can add this to our state.

```javascript
state = {
  value: "",
  notification: "",
  opacity: new Animated.Value(0),
};
```

Then we need to setup a dynamic style to apply to our `Animated.View`. We will do this at the top of our render function

```javascript
render() {
  const notificationStyle = {
    opacity: this.state.opacity,
  };
}
```

Then pass it in to our `Animated.View` using the array style notation. This allows us to apply multiple styles to a view.

```javascript
<Animated.View style={[styles.notification, notificationStyle]} />
```

**Dynamic Measurement**

When you get access to a `ref` on a `View` it has a few helpful functions. One such is the `measure` function. We needed to be sure to call `getNode` on our `ref`. `Animated.View` wraps a regular `View` and exposes the `getNode` function to get access to the internal `View` which has our `measure` function we need.

Our goal is to get the dynamic `height` of our view.

```javascript
this.setState(
  {
    value: "",
    notification: this.state.value,
  },
  () => {
    this._notification
      .getNode()
      .measure((x, y, width, height, pageX, pageY) => {});
  }
);
```

The syntax here may look odd. What is happening is we are calling `setState`. The second function we pass to `setState` is equivalent to `componentDidUpdate`. What this means is that the `notification` text has officially been rendered and updated. That means when we measure the notification view it will return accurate values.

The `measure` returns 6 different arguments, however the one we only care about is height.

**Animate In**

We need to control the offset of our notification view. This will always be set to the height of the view right before we animate it.

So we'll mutate our state to look like

```javascript
state = {
  value: "",
  notification: "",
  opacity: new Animated.Value(0),
  offset: new Animated.Value(0),
};
```

Our `handlePress` will now be setup to animate our notification in.

Once we have our height measurement of our notification we need to set it as a negative offset. We can do that using the `setValue` property on our `offset`.

```javascript
this.state.offset.setValue(height * -1);
```

Once we have done that we can do a parallel animation using `Animated.parallel`. This will allow us to do multiple animations at once. For us that means animating in our `opacity` and our `offset`.

```javascript
Animated.parallel([
  Animated.timing(this.state.opacity, {
    toValue: 1,
    duration: 300,
  }),
  Animated.timing(this.state.offset, {
    toValue: 0,
    duration: 300,
  }),
]).start();
```

You can see here the `Animated.parallel` takes an array of animations. Our first will use `Animated.timing` to animate our opacity to `1`. It's starting value was set to `0` in our state `opacity: new Animated.Value(0)`,. When opacity is `0` the view isn't visible.

The next is animating our `offset` to `0` as well. We'll explore why below.

Finally we need to setup our `notificationStyle` to transform our view so it responds to the `offset` animation we have.

```javascript
const notificationStyle = {
  opacity: this.state.opacity,
  transform: [
    {
      translateY: this.state.offset,
    },
  ],
};
```

When we set the `offset` animation to `-height` this will move the view on the Y axis negatively. Meaning it'll move it up the screen for the amount we've set. So in this case it will move it to the exact height of the view so it won't be visible. This will make our notification look like it's sliding in from off screen.

With our `offset` originally set at `0`, this makes the notification visibly in it's original position. This is why we our doing the `Animated.timing` animation to `0`.

**Animate Out**

The final step is to animate the notification away. The concept would be to do the reverse of the animation in.

```javascript
Animated.parallel([
  Animated.timing(this.state.opacity, {
    toValue: 0,
    duration: 300,
  }),
  Animated.timing(this.state.offset, {
    toValue: height * -1,
    duration: 300,
  }),
]);
```

We animate in parallel again, this time we animate our `opacity` back to `0` and animate the `offset` back to the `-height` of our notification. This will make it look like it is fading and moving off the screen at the same time.

We want these 2 animations to happen in sequence, so we will need to use the `Animated.sequence` command to combine them. Additionally so our user can see the notification we'll use `Animated.delay` to wait before moving on to the hide animation.

The `Animated.sequence` will execute each animation in order. Once the animation is complete it will move onto the next animation.

So in our code below. 1) We animate our notification into view using `Animated.parallel` to execute 2 animations at the same time. 2) We wait 1.5s 3) We do the reverse of our first animation and execute our 2 reverse animations at the same time.

```javascript
Animated.sequence([
  Animated.parallel([
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 300,
    }),
    Animated.timing(this.state.offset, {
      toValue: 0,
      duration: 300,
    }),
  ]),

  Animated.delay(1500),

  Animated.parallel([
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: 300,
    }),
    Animated.timing(this.state.offset, {
      toValue: height * -1,
      duration: 300,
    }),
  ]),
]).start();
```

It's crucial that you call `start()` here otherwise nothing will animate.

Our entire `handlePress` code looks like this.

```javascript
handlePress = () => {
  this.setState(
    {
      value: "",
      notification: this.state.value,
    },
    () => {
      this._notification
        .getNode()
        .measure((x, y, width, height, pageX, pageY) => {
          this.state.offset.setValue(height * -1);

          Animated.sequence([
            Animated.parallel([
              Animated.timing(this.state.opacity, {
                toValue: 1,
                duration: 300,
              }),
              Animated.timing(this.state.offset, {
                toValue: 0,
                duration: 300,
              }),
            ]),

            Animated.delay(1500),

            Animated.parallel([
              Animated.timing(this.state.opacity, {
                toValue: 0,
                duration: 300,
              }),
              Animated.timing(this.state.offset, {
                toValue: height * -1,
                duration: 300,
              }),
            ]),
          ]).start();
        });
    }
  );
};
```

These techniques can be applied to many different types of views and situations. So explore on your own and see what you can build.

If you switched the `height` to use the `width` you could create a toast like animation notification system where the notification slides in from the `left`, or `right`.

Additionally if you were to switch over the positioning of the notification to be `bottom: 0` you could have the notification slide in from the bottom.

## Animated Questionnaire with Progress Bar

This demo is going to show how we can use `state` and animations to make it look like we have a smooth rendering of items. It is less than ideal to render hundreds of items. We'll use something that I may consider a layout hack + a `setState` swap. Essentially animating an item to where it will appear on the next state.

We'll setup an array of questions, our active index which we'll default to 0, an animated value for our main animation, and then an animated value for our progress bar along the bottom. Our view will need to be `flexDirection: "row"`, this will allow us to lay our buttons out on the left and right sides.

```javascript
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Dimensions,
} from "react-native";

export default class App extends Component {
  state = {
    index: 0,
    questions: [
      "Do you tend to follow directions when given?",
      "Are you comfortable with the idea of standing and doing light physical activity most of the day?",
      "Would you enjoy making sure your customers leave happy?",
      "Are you willing to work nights and weekends (and possibly holidays)?",
    ],
    animation: new Animated.Value(0),
    progress: new Animated.Value(0),
  };

  render() {
    return <View style={styles.container}></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E22D4B",
    flexDirection: "row",
  },
});
```

**Add Buttons**

Now we need to setup 2 buttons. The one on top will be our No button which because we are in a "row" layout will now be on the left side. Additionally the Yes will be on the right side.

```javascript
return (
  <View style={styles.container}>
    <TouchableOpacity
      onPress={this.handleAnswer}
      style={styles.option}
      activeOpacity={0.7}
    >
      <Text style={styles.optionText}>No</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={this.handleAnswer}
      style={[styles.option, styles.yes]}
      activeOpacity={0.7}
    >
      <Text style={styles.optionText}>Yes</Text>
    </TouchableOpacity>
  </View>
);
```

Our `TouchableOpacity` is actually an `Animated.View` so that means we can apply styling to it. It is still in a column direction. So we will apply `flex: 1` to each button so they will take up each half of the space available. Then we center the content in the middle of the screen with `alignItems: "center"`, but justify it's content to the end of the screen.

The `yes` button will have an opaque background to it, so we do a rgba of white and a `.1` opacity.

Our `optionText` which is being justified to the end we can add some margin to bring it up slightly.

```javascript
option: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
},
yes: {
    backgroundColor: "rgba(255,255,255,.1)",
},
optionText: {
    fontSize: 30,
    color: "#FFF",
    marginBottom: 50,
},
```

**Add Questions**

Now we need to derive both the current question and the next question that should appear on the screen. This will allow us to simultaneously center one, and then offset one. When one is answered we can move one off the screen, move the next one to the middle. Once our animation is complete then we will swap the active index with the index of the question that we moved into the middle of the screen. Nothing will have visibly changed to the user, but we will have our next question waiting off screen.

To get this all setup we get both the current and next question if we have one.

```javascript
const question = questions[index];
let nextQuestion;
if (index + 1 < questions.length) {
  nextQuestion = questions[index + 1];
}
```

Then we render a view ABOVE our buttons. That way our buttons will be rendered above our question and still be interactable. However because they have transparent backgrounds the questions will appear.

```javascript
<View style={[styles.overlay, StyleSheet.absoluteFill]}>
  <Animated.Text style={[styles.questionText]}>{question}</Animated.Text>
  <Animated.Text style={[styles.questionText]}>{nextQuestion}</Animated.Text>
</View>
```

Our overlay just centers the question in the middle of the screen. We need to absolutely position our text questions because they are in the same container one will appear below the other. So when it animates into view it would be below, and not inline.

```javascript
overlay: {
    alignItems: "center",
    justifyContent: "center",
},
questionText: {
    fontSize: 30,
    color: "#FFF",
    textAlign: "center",
    position: "absolute",
},
```

**Add A Reset Button**

We'll just toss a simple `X` button at the end to reset everything. We'll need to reset our progress value, our animation, and our index back to their defaults.

```javascript
reset = () => {
  this.state.animation.setValue(0);
  this.state.progress.setValue(0);
  this.setState({
    index: 0,
  });
};
```

We put the Close button at the end because it needs to sit on top of our option buttons otherwise it won't be clickable.

```javascript
return (
  <View style={styles.container}>
    <View style={[styles.overlay, StyleSheet.absoluteFill]}>
      <Animated.Text style={[styles.questionText]}>{question}</Animated.Text>
      <Animated.Text style={[styles.questionText]}>
        {nextQuestion}
      </Animated.Text>
    </View>

    <TouchableOpacity
      onPress={this.handleAnswer}
      style={styles.option}
      activeOpacity={0.7}
    >
      <Text style={styles.optionText}>No</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={this.handleAnswer}
      style={[styles.option, styles.yes]}
      activeOpacity={0.7}
    >
      <Text style={styles.optionText}>Yes</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.close} onPress={this.reset}>
      <Text style={styles.closeText}>X</Text>
    </TouchableOpacity>
  </View>
);
```

```javascript
close: {
    position: "absolute",
    top: 30,
    right: 30,
    backgroundColor: "transparent",
},
closeText: {
    fontSize: 30,
    color: "#FFF",
},
```

**Animate Questions**

First up when our button is clicked we don't care whether it was a yes or no, we'll animate it off the screen. We'll trigger 2 animations to happen at the same time. One we aren't using yet and it's our progress bar, but we'll still animate it.

We animate it to the current index to the next index. Then our animated value to 1. Once it's complete and our next question is in the middle, we will swap the current question and next question. Then in our `componentDidUpdate` callback we need to reset our animated value back to 0 for our next question.

Basically it goes 1) Move current question out of screen and next question into middle 2) Make question in the middle now the active question 3) Next question is now off screen 4) Reset back to 0 so our active question while our new active question won't appear offset

```javascript
handleAnswer = () => {
  Animated.parallel([
    Animated.timing(this.state.progress, {
      toValue: this.state.index + 1,
      duration: 400,
    }),
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 400,
    }),
  ]).start(() => {
    this.setState(
      (state) => {
        return {
          index: state.index + 1,
        };
      },
      () => {
        this.state.animation.setValue(0);
      }
    );
  });
};
```

Our interpolates will be the reverse of each other. Both will take an `inputRange` of `[0, 1]`. However we need to craft our `outputRange` correctly.

Our main question at 0 needs to appear in the middle of the screen. Then when the animation moves to 1 it needs to animate the width of the screen. Because we want it to animate left, we need to move it in a negative direction.

Then our next interpolated question we want to render it but offset it the width of the screen to start. Then as we animate towards 1 it will reduce it to 0 and be in the middle of the screen.

Finally we craft up our styling for our `translateX` for each question.

```javascript
const { index, questions } = this.state;
const { width } = Dimensions.get("window");

const nextQuestionInterpolate = this.state.animation.interpolate({
  inputRange: [0, 1],
  outputRange: [width, 0],
});

const mainQuestionInterpolate = this.state.animation.interpolate({
  inputRange: [0, 1],
  outputRange: [0, -width],
});

const mainQuestionStyle = {
  transform: [
    {
      translateX: mainQuestionInterpolate,
    },
  ],
};

const nextQuestionStyle = {
  transform: [
    {
      translateX: nextQuestionInterpolate,
    },
  ],
};
```

Then we need to pass each style into their respective questions.

```javascript
<View style={[styles.overlay, StyleSheet.absoluteFill]}>
  <Animated.Text style={[styles.questionText, mainQuestionStyle]}>
    {question}
  </Animated.Text>
  <Animated.Text style={[styles.questionText, nextQuestionStyle]}>
    {nextQuestion}
  </Animated.Text>
</View>
```

**Progress Bar**

We need a progress indicator. It doesn't matter where this sits but putting it above the buttons so the buttons are always on top will allow the user to tap on the bar and still answer the question.

```javascript
<View style={styles.progress}>
  <Animated.View style={[styles.bar, progressStyle]} />
</View>
```

Our interpolations can be dynamic based upon state. In this case we set it up so that it starts at 0 and then won't fill up till we answer based on the length of the questions. This will interpolate automatically to filling up our bar using percentage width values.

```javascript
const progressInterpolate = this.state.progress.interpolate({
  inputRange: [0, questions.length],
  outputRange: ["0%", "100%"],
});
```

Finally our styling is a absolutely positioning view that we put at the bottom (no top value), and give it a height of 10. Then our inner bar will confine itself to the entire height of it's parent which is just 10 and the progressInterpolate will control the width.

```javascript
progress: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    height: 10,
},
bar: {
    height: "100%",
    backgroundColor: "#FFF",
},
```
