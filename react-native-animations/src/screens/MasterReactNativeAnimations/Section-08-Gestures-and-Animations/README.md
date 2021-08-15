# Gestures and Animations

## Maintain Touchable Items with a Parent PanResponder in React Native

One of the issues I've noticed with `PanResponder` is that people assume it is an all or nothing. By that I mean adding a `PanResponder` in a parent view means it will steal all of your touches and `Touchable` items won't be touchable any longer.

[PanResponder - React Native Documentation](https://facebook.github.io/react-native/docs/panresponder.html)

This is far from the case. As always, React Native internal code is all built on the same components you are using so be sure and always read that code. Navigation is one example that uses a top level PanResponder and only deals with touches on the outer edge of the screen.

Real internal react native example code for [NavigationExperimental](https://github.com/facebook/react-native/blob/a2fb703bbb988038323c55b29b40e8f5ff52966d/Libraries/CustomComponents/NavigationExperimental/NavigationCardStackPanResponder.js#L97)

[react-native-parent-panresponder-touch](https://github.com/browniefed/react-native-parent-panresponder-touch)

```javascript
import React, { Component } from "react";
import {
  StatusBar,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PanResponder,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

const getDirectionAndColor = ({ moveX, moveY, dx, dy }) => {
  const draggedDown = dy > 30;
  const draggedUp = dy < -30;
  const draggedLeft = dx < -30;
  const draggedRight = dx > 30;
  const isRed = moveY < 90 && moveY > 40 && moveX > 0 && moveX < width;
  const isBlue = moveY > height - 50 && moveX > 0 && moveX < width;
  let dragDirection = "";

  if (draggedDown || draggedUp) {
    if (draggedDown) dragDirection += "dragged down ";
    if (draggedUp) dragDirection += "dragged up ";
  }

  if (draggedLeft || draggedRight) {
    if (draggedLeft) dragDirection += "dragged left ";
    if (draggedRight) dragDirection += "dragged right ";
  }

  if (isRed) return `red ${dragDirection}`;
  if (isBlue) return `blue ${dragDirection}`;
  if (dragDirection) return dragDirection;
};

export default class App extends Component {
  state = {
    zone: "Still Touchable",
  };

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) =>
        !!getDirectionAndColor(gestureState),
      onPanResponderMove: (evt, gestureState) => {
        const drag = getDirectionAndColor(gestureState);
        this.setState({
          zone: drag,
        });
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
    });
  }

  onPress = () => {
    this.setState({
      zone: "I got touched with a parent pan responder",
    });
  };

  render() {
    return (
      <View style={styles.container} {...this._panResponder.panHandlers}>
        <StatusBar hidden />
        <View style={styles.zone1} />
        <View style={styles.center}>
          <TouchableOpacity onPress={this.onPress}>
            <Text>{this.state.zone}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.zone2} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  zone1: {
    top: 40,
    left: 0,
    right: 0,
    height: 50,
    position: "absolute",
    backgroundColor: "red",
  },
  zone2: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
    position: "absolute",
    backgroundColor: "blue",
  },
});
```

**General PanResponder**

The React Native folk built the gesture responding system very similar to the web. The gesture system has a capture phase, just like the web. If you didn't know about the capture system on the web, there is one. The events go from a capture phase and back up through the bubble phase. You may have heard of "event bubbling" where the event starts at the inner most child then moves up each element. However before that the `capture` phase triggered and traversed from the top down to the element you clicked.

`top => #random_parent => #random_child2 => thing you clicked => #random_child2 => #random_parent => top`

The `capture` phase in React Native has two phases per `PanResponder`. It has `onStartShouldSetResponderCapture` and `onMoveShouldSetResponderCapture`. The `onStartShouldSetResponderCapture` is called on the beginning touch, and `onMoveShouldSetResponderCapture` is called on every time you move your finger.

After the capture phase the bottom level touched view will then move back up the chain. The `onStartShouldSetResponder` function will be called on initial press, then `onMoveShouldSetResponder` will be called each movement of the finger.

At any point that a capture phase, or non capture phase returns `true` that `PanResponder` will receive the gesture. In that case `onResponderGrant` will be called, then `onResponderMove`, then eventually when the user removes their finger `onResponderRelease`.

Now do remember the capture and bubble phase are happening on EACH finger movement. So that means if a parent view returns true in `onMoveShouldSetResponderCapture` phase then the touch will be taken away from the other active `PanResponder`

When that happens `onResponderTerminationRequest` is called on the active `PanResponder` if it returns true then `onResponderTerminate` is called. Basically you said "Sure whatever else wants the gesture they can have it".

Finally when the OS steals the gesture (like when you swipe down the notification center), the `onResponderTerminationRequest` function is called.

All of these are generally setup to just return `true` for you so that the generally appropriate actions are taken.

**PanResponder Best Practices**

All of that being said. Don't use the `capture` phase, you will rarely ever use it much like the web. Stick to the function calls without `capture`.

When you need something, you need to decide `do I want to do it on the first press or do I want to do it on every movement`. So that means you return true from `onStartShouldSetResponder` or `onMoveShouldSetResponder`

Mostly the reason you don't ever use these is as the default says "The deepest element gets focus". Aka a button you pressed gets pressed, typically that's what you want.

What the hell does this mean?

It means

```javascript
<SpecialViewToDoThings>
  <SomeCrazyScrollView>
    <TouchableOpacity>
      <Text>Look a button</Text>
    </TouchableOpacity>
  </SomeCrazyScrollView>
</SpecialViewToDoThings>
```

Without `capture` phases, `TouchableOpacity` `onPress` will get the touch. With a `capture` phase returning true `SpecialViewToDoThings` will get touch. `SomeCrazyScrollView` will get the scroll when someone doesn't press a `TouchableOpacity` and `SpecialViewToDoThings` doesn't return true from a capture phase.

**WHY DIDN'T THEY SAY ANY OF THIS!?!?!?**

Oh don't worry, none of this information is new, it's in the docs [Gesture Responder System - React Native Documentation](https://facebook.github.io/react-native/docs/gesture-responder-system.html)

Still not clear? Lets do some code. This will just show you how to make internal touchable things and still capture touches with a parent `PanResponder`.

**Create a PanResponder**

First we need to create a `PanResponder`. If you look at the documentation you'll notice many of the functions are not necessary, and or default to returning true. So we'll

```javascript
componentWillMount() {
    this._panResponder = PanResponder.create({
        onMoveShouldSetPanResponder:(evt, gestureState) => true,
        onPanResponderMove: (evt, gestureState) => {
            // DO JUNK HERE
        }
    });
}
```

All the available stuff

I won't type it all out. It's all in the documentation [PanResponder - React Native Documentation](https://facebook.github.io/react-native/docs/panresponder.html)

**Create a simple view**

We start by creating a `View` with some styles and setup some state for the button.

```javascript
class PanResponderTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zone: "Still Touchable",
    };

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.setState({
      zone: "I got touched with a parent pan responder",
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.zone1} />
        <View style={styles.center}>
          <TouchableOpacity onPress={this.onPress}>
            <Text>{this.state.zone}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.zone2} />
      </View>
    );
  }
}
```

We create a top level container (which will receive the `PanResponder`). 2 zones, one red, and one blue. These will be special zones for touch registering. Then finally a `TouchableOpacity` button. This will simulate some internal item you want pressed while having an external `PanResponder`.

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  zone1: {
    top: 40,
    left: 0,
    right: 0,
    height: 50,
    position: "absolute",
    backgroundColor: "red",
  },
  zone2: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
    position: "absolute",
    backgroundColor: "blue",
  },
});
```

We will center the button, and put our special zones at the top and bottom.

`TouchableOpacity` uses `PanResponder` to detect touches, so it will play into the bubble and capture phases. The zones have no `PanResponder` gestures registered so it won't play into the capture and bubble phases.

**Limit it to region**

This line `onMoveShouldSetPanResponder:(evt, gestureState) => true` always returns `true` so the element will always accept. Also we aren't using the `capture` phase so the `TouchableOpacity` will always be pressable. However our parent `PanResponder` will get triggered when we don't press the button.

**Limit it to distance moved**

`moveX` and `moveY` are the current coordinate positions of the `gestureState`. `dx` and `dy` are the distance change from where the initial finger was put down (delta X and delta Y).

```javascript
const getDirectionAndColor = ({ moveX, moveY, dx, dy }) => {
  const draggedDown = dy > 30;
  const draggedUp = dy < -30;
  const draggedLeft = dx < -30;
  const draggedRight = dx > 30;
  const isRed = moveY < 90 && moveY > 40 && moveX > 0 && moveX < width;
  const isBlue = moveY > height - 50 && moveX > 0 && moveX < width;
  let dragDirection = "";

  if (draggedDown || draggedUp) {
    if (draggedDown) dragDirection += "dragged down ";
    if (draggedUp) dragDirection += "dragged up ";
  }

  if (draggedLeft || draggedRight) {
    if (draggedLeft) dragDirection += "dragged left ";
    if (draggedRight) dragDirection += "dragged right ";
  }

  if (isRed) return `red ${dragDirection}`;
  if (isBlue) return `blue ${dragDirection}`;
  if (dragDirection) return dragDirection;
};
```

We define that if a user moves their finger in a direction further than 30 pixels than we'll trigger a direction. Also if they are within the absolutely positioned zones we'll tag them with `red` or `blue`.

This function will return nothing if we haven't dragged a finger greater than 30 pixels, and or we aren't in a particular zone.

**Where does this function go?**

Since our `getDirectionAndColor` function will return either truthy or falsy values we can pass that right into our `onMoveShouldSetPanResponder`. This means when it returns truthy our `onPanResponderMove`. We then recall the function and then call setState to update the button text.

```javascript
componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder:(evt, gestureState) => !!getDirectionAndColor(gestureState),
      onPanResponderMove: (evt, gestureState) => {
        const drag = getDirectionAndColor(gestureState);
        this.setState({
          zone: drag,
        })
      },
    });
  }
```

Finally we need to add our `PanResponder` to the parent `View` like so

```javascript
render() {
    return (
      <View style={styles.container} {...this._panResponder.panHandlers}>
        <View style={styles.zone1} />
        <View style={styles.center}>
          <TouchableOpacity onPress={this.onPress}>
            <Text>{this.state.zone}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.zone2} />
      </View>
    );
  }
```

**Potential uses**

You can use the `onLayout` callback from any component to then define your layout constraints for your `PanResponder`. You could position things off screen then drag them on screen by triggering an `Animated` value while your current view stays touchable.

There are all of the potential use cases, it's all about what you need to accomplish and or what your product manager wants.
