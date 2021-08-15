# Advanced Real World

## Photo Grid Shared Element

The shared element idea is a multi stage process, but it follows a general guideline.

1. Get the position of the item (width/height/x/y)
2. Set animated values with those values
3. Render shared item using animated values so it appears in the same spot as our start item
4. Get the destination dimensions (width/height/x/y) (wrapping container positions)
5. Animate the animated values to final destination

There is another method without a wrapping container

1. Get the position/size of the item (width/height/x/y)
2. Render destination item hidden with opacity
3. Get the position/size of the destination item (width/height/x/y)
4. Set animated values with the values of the start item
5. Animate the animated values to final destination

Same number of steps but it mostly depends on if you have a view that will conform to the dimensions we want to fill in. Like in our photo grid we'll show that we have a `flex: 1` container in our destination view that we can measure to get our available space for our image.

However the second method we would need to measure the actual destination item first.

**Setup**

First off we need a grid of pretty images. I went on Unsplash and got a bunch then resized them to be smaller in size. The size is crucial here as we don't want to pipe in 20 5mb photos into any mobile device.

We also setup `this.gridImages = {}` in our `componentWillMount`. This will be used to store all of our refs. We'll use these refs to get the page location, and dimensions of each image.

```javascript
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";

import images from "./images";

export default class App extends Component {
  state = {
    activeImage: null,
    animation: new Animated.Value(0),
    position: new Animated.ValueXY(),
    size: new Animated.ValueXY(),
  };

  componentWillMount() {
    this._gridImages = {};
  }

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

**Build a Grid**

Here we create a `ScrollView`, we could use a `FlatList` if you're worried about performance, but the concepts still apply.

If we currently have an active image we'll toggle the opacity so it really looks like the image is being blown up into it's final position.

```javascript
const activeIndexStyle = {
  opacity: this.state.activeImage ? 0 : 1,
};
```

We map over them, and apply our opacity style if we have found our active index. Additionally we save off the ref to the image so we can measure the size of our image later.

```javascript
<ScrollView style={styles.container}>
  <View style={styles.grid}>
    {images.map((src, index) => {
      const style =
        index === this.state.activeIndex ? activeIndexStyle : undefined;

      return (
        <TouchableWithoutFeedback
          key={index}
          onPress={() => this.handleOpenImage(index)}
        >
          <Animated.Image
            source={src}
            style={[styles.gridImage, style]}
            resizeMode="cover"
            ref={(image) => (this._gridImages[index] = image)}
          />
        </TouchableWithoutFeedback>
      );
    })}
  </View>
</ScrollView>
```

The grid just uses `flexDirection: "row"` and tells the container to wrap the content. Then each image is given a width of `33%` so we can fit 3 images on each row. You can use this technique with one, two, or any number of images.

```javascript
container: {
    flex: 1,
},
grid: {
    flexDirection: "row",
    flexWrap: "wrap",
},
gridImage: {
    width: "33%",
    height: 150,
},
```

**Add a Modal View**

The next thing we need to do is create our target modal view. This will consist of a top image, and a lower view of text.

The key to this whole thing working is using our `pointerEvents` toggle technique. This view is always active, the only piece that is hidden is the lower content that has an opacity when it is in active. Additionally when we don't have an activeImage there is nothing in the space.

This allows for your view to always be present, but until we have an `activeImage` it can't be interacted with and all touches will pass through to the underlying grid.

```javascript
<View
  style={StyleSheet.absoluteFill}
  pointerEvents={this.state.activeImage ? "auto" : "none"}
>
  <View style={styles.topContent} ref={(image) => (this._viewImage = image)}>
    <Animated.Image
      key={this.state.activeImage}
      source={this.state.activeImage}
      resizeMode="cover"
      style={[styles.viewImage, activeImageStyle]}
    />
  </View>
  <Animated.View
    style={[styles.content, animtedContentStyles]}
    ref={(content) => (this._content = content)}
  >
    <Text style={styles.title}>Pretty Image from Unsplash</Text>
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis
      interdum porttitor. Nam lorem justo, aliquam id feugiat quis, malesuada
      sit amet massa. Sed fringilla lorem sit amet metus convallis, et vulputate
      mauris convallis. Donec venenatis tincidunt elit, sed molestie massa.
      Fusce scelerisque nulla vitae mollis lobortis. Ut bibendum risus ac rutrum
      lacinia. Proin vel viverra tellus, et venenatis massa. Maecenas ac gravida
      purus, in porttitor nulla. Integer vitae dui tincidunt, blandit felis eu,
      fermentum lorem. Mauris condimentum, lorem id convallis fringilla, purus
      orci viverra metus, eget finibus neque turpis sed turpis.
    </Text>
  </Animated.View>
  <TouchableWithoutFeedback onPress={this.handleClose}>
    <Animated.View style={[styles.close, animatedClose]}>
      <Text style={styles.closeText}>X</Text>
    </Animated.View>
  </TouchableWithoutFeedback>
</View>
```

**Animate To The Modal Open**

Alright now we need to talk about executing the shared element. The process will be

1. Measure the dimensions of the current image
2. Adjust our animated values that are applying to our destination image in our modal.
3. Measure our destination image dimension wrapper (position, width and height).
4. Rendered image will appear at the grid spot
5. Animate to it's position it should be at.

The key to point out here is we are measuring the view wrapping the image. This is the space that the image will occupy but it will allow us to get the dimensions and simplify the rendering of the image in the correct spot over the correct grid item that was pressed.

So first measure the dimensions of the index of the image that was pressed. We are dealing with animated views so we need to call `getNode()` to access the actual view ref so we can call measure.

```javascript
this._gridImages[index]
  .getNode()
  .measure((x, y, width, height, pageX, pageY) => {});
```

Save off our values for later animating, and set the position and the size. I'm using 2 `Animated.ValueXY`s here, and the x/y will just be mapped to the width/height.

```javascript
(this._x = pageX), (this._y = pageY);
this._width = width;
this._height = height;

this.state.position.setValue({
  x: pageX,
  y: pageY,
});

this.state.size.setValue({
  x: width,
  y: height,
});
```

Now that we have our dimensions calculated, and our animated values all set we can set our activeIndex and the image that we want. Once this is rendered it will appear in the exact spot that our grid image was at because of how we setup our styling.

```javascript
this.setState({
  activeImage: images[index],
  activeIndex: index,
});
```

The next piece is to measure the view destination. We need to measure the destination space so we know where to animate the image to. This is measuring the wrapping `View` container, however it is set to `flex: 1`. So it will have a dynamic space depending on screen size of the device.

We need to execute these animations all at the same time. We'll use spring to make it look like it exploded from it's spot up to the top. Our x position is plugged by the `tPageX` which because our view is at the top of the screen will just be 0, and same goes for the `tPageY`. However your destination for your app may be different.

Then we need to animate the `width/height` from the grid sized image, to the `width/height` of the destination space. Also we will animate a simple animated value to 1 which will control the opacity fade in of the close button, and also the bottom text piece.

```javascript
this.setState(
  {
    activeImage: images[index],
    activeIndex: index,
  },
  () => {
    this._viewImage.measure((tX, tY, tWidth, tHeight, tPageX, tPageY) => {
      Animated.parallel([
        Animated.spring(this.state.position.x, {
          toValue: tPageX,
        }),
        Animated.spring(this.state.position.y, {
          toValue: tPageY,
        }),
        Animated.spring(this.state.size.x, {
          toValue: tWidth,
        }),
        Animated.spring(this.state.size.y, {
          toValue: tHeight,
        }),
        Animated.spring(this.state.animation, {
          toValue: 1,
        }),
      ]).start();
    });
  }
);
```

All together the code looks like this. It is a bit daunting and is also one reason why making reusable shared element transitions can be difficult.

```javascript
handleOpenImage = (index) => {
  this._gridImages[index]
    .getNode()
    .measure((x, y, width, height, pageX, pageY) => {
      (this._x = pageX), (this._y = pageY);
      this._width = width;
      this._height = height;

      this.state.position.setValue({
        x: pageX,
        y: pageY,
      });

      this.state.size.setValue({
        x: width,
        y: height,
      });

      this.setState(
        {
          activeImage: images[index],
          activeIndex: index,
        },
        () => {
          this._viewImage.measure((tX, tY, tWidth, tHeight, tPageX, tPageY) => {
            Animated.parallel([
              Animated.spring(this.state.position.x, {
                toValue: 0,
              }),
              Animated.spring(this.state.position.y, {
                toValue: 0,
              }),
              Animated.spring(this.state.size.x, {
                toValue: tWidth,
              }),
              Animated.spring(this.state.size.y, {
                toValue: tHeight,
              }),
              Animated.spring(this.state.animation, {
                toValue: 1,
              }),
            ]).start();
          });
        }
      );
    });
};
```

The other important aspect is the styling and interpolation. Our animated content will listen on our value going from 0 to 1. It'll start with a translateY offset of 300, and also just an opacity fade in. That way it will look like it's rising to meet the image as it sprung to the top.

Our `activeImageStyle` takes into account both our size and position animated values. They are passed into width/height, and top/left.

```javascript
const animatedContentTranslate = this.state.animation.interpolate({
  inputRange: [0, 1],
  outputRange: [300, 0],
});

const animatedContentStyles = {
  opacity: this.state.animation,
  transform: [
    {
      translateY: animatedContentTranslate,
    },
  ],
};

const animatedClose = {
  opacity: this.state.animation,
};

const activeImageStyle = {
  width: this.state.size.x,
  height: this.state.size.y,
  top: this.state.position.y,
  left: this.state.position.x,
};
```

**Animate Backwards**

Now in our modal we had a close button and when we opened up our modal we saved off the position of the grid where our image was at. Now we just need to reverse everything.

We'll animate our position x/y to `this._x` and `this._y`. Our size, back down to it's original size, and then also our content animation back to 0.

Once our animation is complete we will toggle our `activeImage` to null. This will hide our image that we animated, and then additionally will return the opacity of our `gridImage` to 1. Completing the effect.

```javascript
handleClose = () => {
  Animated.parallel([
    Animated.timing(this.state.position.x, {
      toValue: this._x,
      duration: 250,
    }),
    Animated.timing(this.state.position.y, {
      toValue: this._y,
      duration: 250,
    }),
    Animated.timing(this.state.size.x, {
      toValue: this._width,
      duration: 250,
    }),
    Animated.timing(this.state.size.y, {
      toValue: this._height,
      duration: 250,
    }),
    Animated.timing(this.state.animation, {
      toValue: 0,
      duration: 250,
    }),
  ]).start(() => {
    this.setState({
      activeImage: null,
    });
  });
};
```

**Android Caveat**

On Android there is no `overflow: "visible"` support. That means that if our image is inside of our `Modal` view that it won't actually be able to appear at the grid level.

To make this work we'll need our image to be outside of our modal view. There is also a bug in Android where measure doesn't return any values unless we provide an `onLayout` function.

Additionally we'll need our X to be outside as well and below our image otherwise it won't appear.

This technique is basically creating an empty `View` which is our `topContent` view. Then measuring and animating our Image to cover the space that our view is holding for us.

```javascript
<View
  style={StyleSheet.absoluteFill}
  pointerEvents={this.state.activeImage ? "auto" : "none"}
>
  <View
    style={styles.topContent}
    ref={image => (this._viewImage = image)}
    onLayout={() => {}}
  />
  <Animated.View
    style={[styles.content, animatedContentStyles]}
    ref={content => (this._content = content)}
  >
    <Text style={styles.title}>Pretty Image from Unsplash</Text>
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis interdum
      porttitor. Nam lorem justo, aliquam id feugiat quis, malesuada sit amet massa. Sed
      fringilla lorem sit amet metus convallis, et vulputate mauris convallis. Donec
      venenatis tincidunt elit, sed molestie massa. Fusce scelerisque nulla vitae mollis
      lobortis. Ut bibendum risus ac rutrum lacinia. Proin vel viverra tellus, et venenatis
      massa. Maecenas ac gravida purus, in porttitor nulla. Integer vitae dui tincidunt,
      blandit felis eu, fermentum lorem. Mauris condimentum, lorem id convallis fringilla,
      purus orci viverra metus, eget finibus neque turpis sed turpis.
    </Text>
  </Animated.View>
  <TouchableWithoutFeedback onPress={this.handleClose}>
    <Animated.View style={[styles.close, animatedClose]}>
      <Text style={styles.closeText}>X</Text>
    </Animated.View>
  </TouchableWithoutFeedback>
</View>
<Animated.Image
  key={this.state.activeImage}
  source={this.state.activeImage}
  resizeMode="cover"
  style={[styles.viewImage, activeImageStyle]}
/>
```

This works well for images, however there are cases where you want to do text, etc. This gets even more complicated but is still possible. The simple naive solution that a lot of people use is to snapshot a view (turn it into an image), and then morph it to it's destination and then swap in the actual content.

## Animated Color Picker

This tutorial will focus on constructing an animation piece by piece. When dealing with one view transitioning to another view in the same space it's easier to construct one view without animation. Construct the second view across the top of it. Then figure out the animation to transition one to the other. Focusing on building the views and the animation at the same time just makes things more difficult.

We setup a few things will use. First off we create an `AnimatedTextInput` and an `AnimatedIcon` so that we can run animations on both as they aren't provided by default.

We'll setup 2 animations. The first will be for the general opening and closing when the user hits the toggle button. The second will be for toggling the input and button visible to adjust the color.

```javascript
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import Icon from "react-native-vector-icons/Foundation";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export default class App extends Component {
  state = {
    animation: new Animated.Value(0),
    buttonAnimation: new Animated.Value(0),
    color: "#000",
    inputOpen: false,
  };

  handleToggle = () => {};

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.handleToggle} style={styles.button}>
          <Text>Toggle Open/Closed</Text>
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
});
```

Add The Color Icon and Wrapping Container

Now we'll add our wrapping view that's our `rowWrap` and then our `colorBall` as well. We'll craft a background color that will just be directly controlled by our state.

```javascript
const colorStyle = {
    backgroundColor: this.state.color,
  };

  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.rowWrap]}>
          <TouchableWithoutFeedback onPress={this.toggleInput}>
            <Animated.View style={[styles.colorBall, colorStyle]} />
          </TouchableWithoutFeedback>
        </Animated.View>

        <TouchableOpacity onPress={this.handleToggle} style={styles.button}>
          <Text>Toggle Open/Closed</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
```

Our `rowWrap` just aligns and centers our. We want our items to be laid out in a row and centered in the vertical center and then we do some general styling on the shadow, and some padding. If you want to have a shadow on Android be sure and add an `elevation` here.

```javascript
rowWrap: {
  flexDirection: "row",
  alignItems: "center",
  minWidth: "50%",
  backgroundColor: "#FFF",
  borderRadius: 20,
  shadowColor: "#333",
  shadowOpacity: 0.2,
  shadowOffset: { x: 2, y: 2 },
  shadowRadius: 3,
  paddingVertical: 5,
  paddingHorizontal: 10,
},
colorBall: {
  width: 15,
  height: 15,
  borderRadius: 8,
},
```

**Animate it In and Out**

The first animation we need to take care of is to animate the view in and out whenever we press our button. This is a purely animation driven toggle, aka the view is always rendered. You may not want this and in that case you'd want to use `setState` but we'll focus on it always being rendered.

We track whether it's open with `this._open` and decide whether we need to animate to 0 or 1. This means we'll have heavy interpolation. When you are dealing with animations that are 0 <=> 1 and are interpolation based makes it very easy for creating reversible animations.

```javascript
handleToggle = () => {
  const toValue = this._open ? 0 : 1;

  Animated.spring(this.state.animation, {
    toValue,
  }).start();

  this._open = !this._open;
};
```

We setup our interpolation with a few stages. Our `scaleY` will continue at it's normal pace just going from 0 to 1. However we don't want our `scaleX` to start happening until half way through the animation. We want it to have some movement and size on the `scaleY` before it starts it's scale outwards. This means that it will grow faster since it only has half the animation to get from 0 to 1.

Only scaling the X will cause an expanding animation from the center.

This delayed animation is another technique similar to the .99 cliff technique. If you want an animation to only happen after half the animation is completed then kick in, you can specify 2 outputRanges to be exactly the same next to each other. Then define your inputRange of when you want it to start. Once it hits the last value is when the interpolation will start.

Our `translateY` will be animating the entire time but we just specify that it'll start with an offset of 150. Finally we'll pipe our animation directly into `opacity` and `scaleY` as we both want our end values to be 1.

```javascript
const scaleXInterpolate = this.state.animation.interpolate({
  inputRange: [0, 0.5, 1],
  outputRange: [0, 0, 1],
});

const translateYInterpolate = this.state.animation.interpolate({
  inputRange: [0, 1],
  outputRange: [150, 0],
});

const rowStyle = {
  opacity: this.state.animation,
  transform: [
    {
      translateY: translateYInterpolate,
    },
    {
      scaleX: scaleXInterpolates,
    },
    {
      scaleY: this.state.animation,
    },
  ],
};
```

Then we need to apply to our row.

```javascript
<Animated.View style={[rowStyle, styles.rowWrap]} />
```

**Add The Other Buttons**

Because the color picker button is a shared component we will need to create another row view to house the buttons and eventually our input toggle/button. The `TouchableOpacity` is just so that we have a notification to ourselves that the buttons are indeed touchable. We'll also use the `AnimatedIcon` we crafted earlier.

```javascript
<Animated.View style={[styles.rowWrap]}>
  <TouchableWithoutFeedback onPress={this.toggleInput}>
    <Animated.View style={[styles.colorBall, colorStyle]} />
  </TouchableWithoutFeedback>

  <View style={styles.row}>
    <TouchableOpacity>
      <AnimatedIcon name="bold" size={30} color="#555" />
    </TouchableOpacity>
    <TouchableOpacity>
      <AnimatedIcon name="italic" size={30} color="#555" />
    </TouchableOpacity>
    <TouchableOpacity>
      <AnimatedIcon name="align-center" size={30} color="#555" />
    </TouchableOpacity>
    <TouchableOpacity>
      <AnimatedIcon name="link" size={30} color="#555" />
    </TouchableOpacity>
  </View>
</Animated.View>
```

We'll have our row take up the entire row, as well as the entire height with our `flex: 1`. Then we'll center them, and spread them evenly using our `justifyContent: "space-around"`.

```javascript
row: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    overflow: "hidden",
},
```

**Add the Input and Button**

Now without worrying about animations we are going to build our input and button over the top of the other buttons. We create an `Animated.Vie`w and use `StyleSheet.absoluteFill` to cover the entire row we just created.

We'll then use our `pointerEvents` technique. We'll toggle a piece of state when the animation is completed that will enable our view to be interacted with. Otherwise it won't be able to be interacted with. We Do that on the wrapping view `pointerEvents={this.state.inputOpen ? "auto" : "none"}`

We also need to get a ref to our input so we can focus and blur it whenever it's open or closed.

```javascript
<Animated.View style={[rowStyle, styles.rowWrap]}>
  <TouchableWithoutFeedback onPress={this.toggleInput}>
    <Animated.View style={[styles.colorBall, colorStyle]} />
  </TouchableWithoutFeedback>

  <View style={styles.row}>
    <TouchableOpacity>
      <AnimatedIcon name="bold" size={30} color="#555" style={iconStyle} />
    </TouchableOpacity>
    <TouchableOpacity>
      <AnimatedIcon name="italic" size={30} color="#555" style={iconStyle} />
    </TouchableOpacity>
    <TouchableOpacity>
      <AnimatedIcon
        name="align-center"
        size={30}
        color="#555"
        style={iconStyle}
      />
    </TouchableOpacity>
    <TouchableOpacity>
      <AnimatedIcon name="link" size={30} color="#555" style={iconStyle} />
    </TouchableOpacity>

    <Animated.View
      style={[StyleSheet.absoluteFill, styles.colorRowWrap]}
      pointerEvents={this.state.inputOpen ? "auto" : "none"}
    >
      <AnimatedTextInput
        value={this.state.color}
        style={[styles.input]}
        onChangeText={(color) => this.setState({ color })}
        ref={(input) => (this._input = input)}
      />
      <TouchableWithoutFeedback onPress={this.toggleInput}>
        <Animated.View style={[styles.okayButton]}>
          <Text style={styles.okayText}>OK</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Animated.View>
  </View>
</Animated.View>
```

Our `colorRowWrap` follows many of the same stylings as the row but with no positioning. We'll use `flex` on our input to tell it to take up the rest of the space, then define a set width on our button. We'll center the text of it in the middle of our button.

```javascript
colorRowWrap: {
    flexDirection: "row",
    flex: 1,
    paddingLeft: 5,
},
input: {
    flex: 1,
},
okayButton: {
    borderRadius: 20,
    height: "100%",
    width: 40,
    backgroundColor: "#309EEB",
    alignItems: "center",
    justifyContent: "center",
},
okayText: {
    color: "#FFF",
},
```

**Animate our input**

Again we'll use a 0 to 1 animation so it's a reversible animation. We'll need to toggle our `inputOpen` and link it to whether or not our animation is being open or closed.

The login in our `setState` is a little odd but the value we are setting on the `inputOpen` is the result of the `!` on the `_inputOpen`.

So when the `inputOpen` on state is no longer `true`, that means it's closed and we want to blur. Otherwise we want to focus on the input so the user can just start typing.

```javascript
toggleInput = () => {
  const toValue = this._inputOpen ? 0 : 1;
  Animated.timing(this.state.buttonAnimation, {
    toValue,
    duration: 350,
  }).start();

  this._inputOpen = !this._inputOpen;
  this.setState({ inputOpen: this._inputOpen }, () => {
    !this.state.inputOpen
      ? this._input.getNode().blur()
      : this._input.getNode().focus();
  });
};
```

Our first is the `moveInterpolate` on our button. We offset it -150 to the left and translate it across the input. We also want it scaling from 0 to 1 so we'll just pass our `buttonAnimation` right into the scale.

A key piece to notice is that we want our row to appear immediately or else we won't see our scaling button. So we interpolate on the buttonAnimation and make the `inputRange [0, .01]`. This means it will appear almost immediately, but when at 0 still be able to be hidden.

Our `input` animation will take advantage of a similar cliff to our `scaleX` on the container view. We will wait until the animation is 80% complete before we'll fade it in. This will allow the button to animate almost entirely to it's position before the hex values appear.

Finally we have our button animations. You may not have expected us to animate them because they're being covered and won't be visible anyway. However giving something a slight opacity and shift makes it look like it's a part of the animation and disappearing underneath the view. We want to craft an effect that the button is wiping away each of the views.

Finally we have our button animations. You may not have expected us to animate them because they're being covered and won't be visible anyway. However giving something a slight opacity and shift makes it look like it's a part of the animation and disappearing underneath the view. We want to craft an effect that the button is wiping away each of the views.

```javascript
const moveInterpolate = this.state.buttonAnimation.interpolate({
  inputRange: [0, 1],
  outputRange: [-150, 0],
});

const buttonStyle = {
  transform: [
    {
      translateX: moveInterpolate,
    },
    {
      scale: this.state.buttonAnimation,
    },
  ],
};

const colorRowInterpolate = this.state.buttonAnimation.interpolate({
  inputRange: [0, 0.01],
  outputRange: [0, 1],
  extrapolate: "clamp",
});

const colorRowStyles = {
  opacity: colorRowInterpolate,
};

const inputOpacityInterpolate = this.state.buttonAnimation.interpolate({
  inputRange: [0, 0.8, 1],
  outputRange: [0, 0, 1],
});

const inputStyle = {
  opacity: inputOpacityInterpolate,
};

const iconTranslate = this.state.buttonAnimation.interpolate({
  inputRange: [0, 1],
  outputRange: [0, -20],
});

const opacityIconInterpolate = this.state.buttonAnimation.interpolate({
  inputRange: [0, 0.2],
  outputRange: [1, 0],
  extrapolate: "clamp",
});

const iconStyle = {
  opacity: opacityIconInterpolate,
  transform: [
    {
      translateX: iconTranslate,
    },
  ],
};
```

## Floating Action Button with Menu

A common design paradigm popularized by Material design(?) is a floating action button in the bottom right corner of the screen. In our case we'll be rebuilding the starbucks app pay button. Not only does this have a floating button, it has 2 other floating buttons, and a circular background cover that shoots out to allow you to focus on the options.

If you need to emphasize a specific piece of content having an animated black background with some opacity that allows you to still see through and keep your context is a great method.

**Setup**

A standard setup, we have our vector icons, and an animated value. This animated value will only go from 0 to 1 so we can keep our animation reversible.

```javascript
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class App extends Component {
  state = {
    animation: new Animated.Value(0),
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

**Add Bottom Button**

So first we need to add our main floating action button (FAB). We won't be animating this button, but we will be animating the text.

```javascript
return (
  <View style={styles.container}>
    <TouchableWithoutFeedback onPress={this.toggleOpen}>
      <View style={[styles.button, styles.pay]}>
        <Animated.Text style={[styles.label]}>Pay</Animated.Text>
        <Text style={styles.payText}>$5.00</Text>
      </View>
    </TouchableWithoutFeedback>
  </View>
);
```

We'll position our button in the corner and create a reusable style so all of our buttons will be the same shape and size. This will allow us to hide them behind our button then animate them visible. Then to make our button green we just add our pay style to add a background color.

Additionally we position our text absolutely and render it inside of our button. Without adding any `top/left/bottom/right` values it'll float freely but still stay centered.

```javascript
label: {
  color: "#FFF",
  position: "absolute",
  fontSize: 18,
  backgroundColor: "transparent",
},
button: {
  width: 60,
  height: 60,
  alignItems: "center",
  justifyContent: "center",
  shadowColor: "#333",
  shadowOpacity: 0.1,
  shadowOffset: { x: 2, y: 0 },
  shadowRadius: 2,
  borderRadius: 30,
  position: "absolute",
  bottom: 20,
  right: 20,
},
payText: {
  color: "#FFF",
},
pay: {
  backgroundColor: "#00B15E",
},
```

**Add More Buttons**

Now lets add our other buttons. These will need to be animated so we use an `Animated.View` and choose the appropriate icons. Because our button class is positioning everything in the same spot, and we have placed these buttons above our pay button in the render they will be rendered behind our pay button.

```javascript
return (
  <View style={styles.container}>
    <TouchableWithoutFeedback>
      <Animated.View style={[styles.button, styles.other]}>
        <Animated.Text style={[styles.label]}>Order</Animated.Text>
        <Icon name="food-fork-drink" size={20} color="#555" />
      </Animated.View>
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback>
      <Animated.View style={[styles.button, styles.other]}>
        <Animated.Text style={[styles.label]}>Reload</Animated.Text>
        <Icon name="reload" size={20} color="#555" />
      </Animated.View>
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback onPress={this.toggleOpen}>
      <View style={[styles.button, styles.pay]}>
        <Animated.Text style={[styles.label]}>Pay</Animated.Text>
        <Text style={styles.payText}>$5.00</Text>
      </View>
    </TouchableWithoutFeedback>
  </View>
);
```

The only thing we need to do is specify their background color.

```javascript
other: {
  backgroundColor: "#FFF",
},
```

**Add Hidden Background**

We want a circular animated black opaque background, however rather than making it hidden via opacity we'll just treat it like another button and tuck it behind the rest of the buttons.

```javascript
return (
  <View style={styles.container}>
    <Animated.View style={[styles.background, bgStyle]} />
    <TouchableWithoutFeedback>
      <Animated.View style={[styles.button, styles.other, orderStyle]}>
        <Animated.Text style={[styles.label, labelStyle]}>Order</Animated.Text>
        <Icon name="food-fork-drink" size={20} color="#555" />
      </Animated.View>
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback>
      <Animated.View style={[styles.button, styles.other, reloadStyle]}>
        <Animated.Text style={[styles.label, labelStyle]}>Reload</Animated.Text>
        <Icon name="reload" size={20} color="#555" />
      </Animated.View>
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback onPress={this.toggleOpen}>
      <View style={[styles.button, styles.pay]}>
        <Animated.Text style={[styles.label, labelStyle]}>Pay</Animated.Text>
        <Text style={styles.payText}>$5.00</Text>
      </View>
    </TouchableWithoutFeedback>
  </View>
);
```

Basically the same as the button styling.

```javascript
background: {
  backgroundColor: "rgba(0,0,0,.2)",
  position: "absolute",
  width: 60,
  height: 60,
  bottom: 20,
  right: 20,
  borderRadius: 30,
},
```

**Setup Animation on Press**

Because we don't need to toggle pointer events on this animation we just need to save off on the instance whether or not our menu is opened or closed. Then decide to animate to 0 or 1. This will produce a reversible animation that also can be interrupted at any point.

```javascript
toggleOpen = () => {
  const toValue = this._open ? 0 : 1;

  Animated.timing(this.state.animation, {
    toValue,
    duration: 200,
  }).start();

  this._open = !this._open;
};
```

**Animate Buttons**

We'll craft each button animation specifically. This however could be derived if you had any number of button items in the menu.

Our reload button will be closest so we'll offset it by -70 giving us some padding from the pay button. Our order button will be the last button so we just need to offset it by -140 so it will bypass the reload button and also have some padding.

Additionally we'll pass in our 0<=>1 animated value into scale so it will be moving and growing at the same time.

```javascript
const reloadInterpolate = this.state.animation.interpolate({
  inputRange: [0, 1],
  outputRange: [0, -70],
});

const orderInterpolate = this.state.animation.interpolate({
  inputRange: [0, 1],
  outputRange: [0, -140],
});

const reloadStyle = {
  transform: [
    {
      scale: this.state.animation,
    },
    {
      translateY: reloadInterpolate,
    },
  ],
};

const orderStyle = {
  transform: [
    {
      scale: this.state.animation,
    },
    {
      translateY: orderInterpolate,
    },
  ],
};
```

**Animate Labels**

The label animations are the more difficult of the animations. They start hidden in the center of each individual button. However we don't want the text to appear over our icons and transition out. This would look bad.

However what we can do is keep it hidden and keep animating it's location. Then once we know it's cleared the buttons of any overlap we'll fade it in. The text will always be offset by -30 and animate to an offset of -90 but to accomplish our fade in we'll have it happen after our animation is 80% complete. So we'll make a cliff at that point and then quickly fade it in to 1 over the last 20% of the animation.

We also want all of our labels to do the same thing so we can pass the same label style into all of our labels.

```javascript
const labelPositionInterpolate = this.state.animation.interpolate({
  inputRange: [0, 1],
  outputRange: [-30, -90],
});

const opacityInterpolate = this.state.animation.interpolate({
  inputRange: [0, 0.8, 1],
  outputRange: [0, 0, 1],
});

const labelStyle = {
  opacity: opacityInterpolate,
  transform: [
    {
      translateX: labelPositionInterpolate,
    },
  ],
};
```

**Animate Background**

Finally our animated background is simply a scale of our small box. This is an arbitrary number selected, however you could use math to calculate how many times the background needs to scale before it covers the entire view. I picked a large enough number to cover the screen and then some.

```javascript
const scaleInterpolate = this.state.animation.interpolate({
  inputRange: [0, 1],
  outputRange: [0, 30],
});

const bgStyle = {
  transform: [
    {
      scale: scaleInterpolate,
    },
  ],
};
```

## Application Intro Screen

There is already a library that helps with this, called [react-native-app-intro](https://github.com/FuYaoDe/react-native-app-intro). The key for all of this is that we setup our interpolations based upon the contentOffset of our scroll view. On our x axis since we will be scrolling horizontal.

This is how parallax side scrolling and twitter moments can be created in React Native.

The basic concept is that we will craft our screens for their exact position. Then based upon the scroll position we will apply our animations to move it around. When it snaps into place we'll make our animations all set to 0 or defaults so the items are in their specific places as specified by the layout.

Generally we would handle this in an array of items and derive our inputRange for each screen dynamically but we're going to build out each inputRange by hand so we understand exactly what is happening.

**Setup**

We import our images

```javascript
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  ScrollView,
  Dimensions,
  PixelRatio,
} from "react-native";

import * as Images from "./images";

export default class App extends Component {
  state = {
    animation: new Animated.Value(0),
  };

  render() {
    const { width, height } = Dimensions.get("window");

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          pagingEnabled
          horizontal
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: this.state.animation,
                },
              },
            },
          ])}
        ></ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenHeader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  screenText: {
    flex: 1,
  },
});
```

**Screen 1/2/3**

I will only talk about a single screen as all the others are exactly the same. Yeah you would probably want to change this but I'm focusing on the animations. To ensure that the images will be the same size regardless of the size of the phone we'll use the `PixelRatio.getPixelSizeForLayoutSiz`e call. This will multiply the value you give it by the pixel density of the device. You can check out which devices have which densities in [the docs](http://facebook.github.io/react-native/releases/0.46/docs/pixelratio.html#get).

We basically have an anchored background image, which is our Image1. Then the rest are absolutely positioned on top of it. We will be able to animate all of the images. Each screen will have different animations with the same images.

```javascript
<View style={{ width, height, backgroundColor: "#F89E20" }}>
  <View style={styles.screenHeader}>
    <Animated.Image
      source={Images.Image1}
      style={{
        width: PixelRatio.getPixelSizeForLayoutSize(75),
        height: PixelRatio.getPixelSizeForLayoutSize(63),
      }}
      resizeMode="contain"
    />

    <Animated.Image
      source={Images.Image2}
      style={[
        {
          width: PixelRatio.getPixelSizeForLayoutSize(46),
          height: PixelRatio.getPixelSizeForLayoutSize(28),
          position: "absolute",
          top: 200,
          left: 60,
        },
        screen1Styles.image2,
      ]}
      resizeMode="contain"
    />
    <Animated.Image
      source={Images.Image3}
      style={{
        width: PixelRatio.getPixelSizeForLayoutSize(23),
        height: PixelRatio.getPixelSizeForLayoutSize(17),
        position: "absolute",
        top: 150,
        left: 60,
      }}
      resizeMode="contain"
    />
  </View>
  <View style={styles.screenText}>
    <Text>Screen 1</Text>
  </View>
</View>
```

**Animate 1**

In the top of our render we'll setup our first call. We will pass in the animation to interpolate off of which will be the x offset of our `ScrollView`. Additionally we'll pass in our width. Technically this is just the device width, however if your `ScrollView` doesn't take up the entire screen we should have our functions setup to receive and derive from any width.

```javascript
const screen1Styles = getScreen1Styles(this.state.animation, width);
```

Our first interpolation is the first, and thus our inputRange will be from 0 (no scroll) to the full width of the width. What this means is that at rest nothing will happen, but as we scroll greater than 0 (scrolling to the next page), we'll move our image2 the opposite direction by -100.

This also means that as you swipe back to the first screen from the second that it will animate from it's -100 offset to 0 which is it's normal position.

```javascript
const getScreen1Styles = (animation, width) => {
  const image2TranslateX = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, -100],
    extrapolate: "clamp",
  });

  return {
    image2: {
      transform: [
        {
          translateX: image2TranslateX,
        },
      ],
    },
  };
};
```

**Animate 2**

The previous animation was just the same backwards and forwards. However if we define an input range for when we're swiping to the screen, then also when we're swiping away to the next screen we can make different entering and exiting animations.

Each screen is the width of what we've given it and since we're on the second screen that means that we want to define our entrance animation when the previous screen is at rest.

Our inputRange will be structured like so `[previousScreenAtRest, myScreenAtRest, myNextScreenAtRest]`. In our case our previous screen was at rest when it was at 0, our current screen will be at rest when we've scrolled one full width, and our next screen will be at rest when it's on the 3rd screen (0 based index so \* 2).

Our `image2TranslateY` if we are scrolling from the first screen will animate from the bottom as it has an offset of 100, however as we scroll to the next screen it will move itself to -100 instead. So it will animate out towards the top of the screen. The reverse will then happen as you scroll back from the 3rd screen to this screen. It will animate from the top down, then if we move back to the first screen it will animate out towards the bottom.

The opacity fade is just fading out from 0, and when active it'll be 1 and again fade back out to 0.

```javascript
const getScreen2Styles = (animation, width) => {
  const inputRange = [0, width, width * 2];

  const image2TranslateY = animation.interpolate({
    inputRange,
    outputRange: [100, 0, -100],
    extrapolate: "clamp",
  });
  const image2Opacity = animation.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
    extrapolate: "clamp",
  });

  return {
    image2: {
      opacity: image2Opacity,
      transform: [
        {
          translateY: image2TranslateY,
        },
      ],
    },
  };
};
```

**Animate 3**

We only have 3 screens so why are we calculating the position of the 4th? Well on iOS there is a bounce. So as you extend past the right and or left side of ScrollView it wil extend further. This is actually a perfect use case for not using `extrapolate: "clamp"`.

Without the extrapolate clamp the `image1Scale`, and the `image2Rotate` would automatically figure out the interpolation steps that it is on even though we would have only defined a `[width, width * 2]` but no 4th screen.

Our scale outputRange would then just be `[0, 1]`, and our rotate would just be `["-180deg", "0deg"]`. However we don't want our scale potentially heading greater than 1 and getting super huge, additionally we want to lock our rotation to 180deg.

I generally lean towards being very explicit about the animations I want to happen vs letting `interpolate` run free.

So here we actually return our scale for both Image1 and Image2, so it will start hidden at scale of 0 and move towards 1 which is just normal. Then change the rotation to start negatively turned and move towards 0 at rest. Then for our bounce the animation would continue the rotation around.

```javascript
const getScreen3Styles = (animation, width) => {
  const inputRange = [width, width * 2, width * 3];

  const image1Scale = animation.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
    extrapolate: "clamp",
  });

  const image2Rotate = animation.interpolate({
    inputRange,
    outputRange: ["-180deg", "0deg", "180deg"],
    extrapolate: "clamp",
  });

  return {
    image1: {
      transform: [
        {
          scale: image1Scale,
        },
      ],
    },
    image2: {
      transform: [
        {
          scale: image1Scale,
        },
        {
          rotate: image2Rotate,
        },
      ],
    },
  };
};
```

In a real world example you would be deriving your `inputRange` based upon the index of the screen and not explicitly building it out. However building it manually was done to show case exactly what is happening behind the scenes. We're emphasizing dynamic interpolation input ranges while still emphasizing that you can produce normal output range effects.

## Evolving Write Button

Sometimes it makes sense to start with the view you are attempting to animate to. Here we will start with our end editor animation and slowly work it down to a button. Using a single animated value we'll be able to craft a reversible animation.

**Setup**

Standard setup, bring in some icons, and animated value, and additionally a state to toggle whether or not we're open. This will be used to do our pointerEvents technique.

```javascript
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TextInput,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class App extends Component {
  state = {
    animation: new Animated.Value(0),
    open: false,
  };

  render() {
    const { width, height } = Dimensions.get("window");

    return <View style={styles.container}></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
});
```

On iOS we'll wrap our view in an a `KeyboardAvoidingView`.

```javascript
return (
  <View style={styles.container}>
    <KeyboardAvoidingView
      style={styles.center}
      behavior="padding"
    ></KeyboardAvoidingView>
  </View>
);
```

**Edit and Bar**

Because we've centered our content when our animation happens it will appear as if it is animating from the center of the screen. With this outputRange in combination with our centering it will leave a padding of 20 on either side. Also note that our `inputRange` only goes to .5 which means this will be a 2 stage animation. An expanding bar of content, and then our editor area dropping down will be the second piece.

```javascript
const { width, height } = Dimensions.get("window");

const widthInterpolate = this.state.animation.interpolate({
  inputRange: [0, 0.5],
  outputRange: [100, width - 40],
  extrapolate: "clamp",
});
```

Here is our new view setup.

```javascript
return (
  <View style={styles.container}>
    <KeyboardAvoidingView style={styles.center} behavior="padding">
      <Animated.View style={[styles.editor, { width: widthInterpolate }]}>
        <Animated.View style={styles.bar}></Animated.View>
      </Animated.View>
    </KeyboardAvoidingView>
  </View>
);
```

We have a bar with a set height, and a background color that will be the same color for both the bar and the button.

```javascript
editor: {
  borderWidth: 1,
  borderColor: "rgba(0,0, 0, .1)",
},
bar: {
  backgroundColor: "#2979FF",
  height: 50,
  justifyContent: "center",
},
```

**Icons**

Now because we have uniqueish layout constraints where a set of buttons is on the left and another set is on the right we add an additional `rightInnerBar` view wrap so we can apply styling.

```javascript
return (
  <View style={styles.container}>
    <KeyboardAvoidingView style={styles.center} behavior="padding">
      <Animated.View style={[styles.editor, { width: widthInterpolate }]}>
        <Animated.View style={styles.bar}>
          <Animated.View style={[styles.toolbar]}>
            <Icon name="format-bold" color="#FFF" size={20} />
            <Icon name="format-italic" color="#FFF" size={20} />
            <Icon name="format-underline" color="#FFF" size={20} />
            <Icon name="format-list-bulleted" color="#FFF" size={20} />
            <Icon name="format-list-numbers" color="#FFF" size={20} />
            <View style={styles.rightInnerBar}>
              <Icon name="link" color="#FFF" size={20} />
              <Icon name="image" color="#FFF" size={20} />
              <Icon name="arrow-down-bold-box" color="#FFF" size={20} />
            </View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </KeyboardAvoidingView>
  </View>
);
```

Our toolbar is setup to be a row, and we'll tell our icons to be `flex-start`. This will start the rendering from left and move right. Then for our `rightInnerBar` which will also be a row, we'll tell it do the opposite and start rendering at `flex-end`. This will give us the desired 2 separate sides of icons.

```javascript
toolbar: {
  flexDirection: "row",
  paddingHorizontal: 10,
  alignItems: "center",
  justifyContent: "flex-start",
  overflow: "hidden",
},
rightInnerBar: {
  flexDirection: "row",
  alignItems: "center",
  flex: 1,
  justifyContent: "flex-end",
},
```

**Editor Bottom**

Now we need to setup our actual editor. We give our `TextInput` the `StyleSheet.absoluteFill` so it will cover it's parent view which will be our `Animated.View`. This is where the expanding height of our animation will take place and the `TextInput` will respond accordingly.

Additionally we get a `ref` to our input so when it expands or collapses we can focus or blur it.

```javascript
return (
  <View style={styles.container}>
    <KeyboardAvoidingView style={styles.center} behavior="padding">
      <Animated.View style={[styles.editor, { width: widthInterpolate }]}>
        <Animated.View style={styles.bar}>
          <Animated.View style={[styles.toolbar, toolbarStyles]}>
            <Icon name="format-bold" color="#FFF" size={20} />
            <Icon name="format-italic" color="#FFF" size={20} />
            <Icon name="format-underline" color="#FFF" size={20} />
            <Icon name="format-list-bulleted" color="#FFF" size={20} />
            <Icon name="format-list-numbers" color="#FFF" size={20} />
            <View style={styles.rightInnerBar}>
              <Icon name="link" color="#FFF" size={20} />
              <Icon name="image" color="#FFF" size={20} />
              <Icon name="arrow-down-bold-box" color="#FFF" size={20} />
            </View>
          </Animated.View>
        </Animated.View>

        <Animated.View style={[styles.lowerView]}>
          <TextInput
            placeholder="Start writing..."
            style={[StyleSheet.absoluteFill, styles.input]}
            multiline
            ref={(input) => (this._input = input)}
          />
        </Animated.View>
      </Animated.View>
    </KeyboardAvoidingView>
  </View>
);
```

We give our `lowerView` which is our wrapping view a default height here, but this will be overridden by our animation.

```javascript
lowerView: {
  height: 150,
  overflow: "hidden",
},
input: {
  padding: 10,
  fontSize: 20,
},
```

**Add Writer Button In Bar**

We'll then use our pointerEvents technique and cover the entire bar so that we have a blue background for our write button. This gives us a same dimension view but a new ability to layout a single text item in the middle of the bar.

```javascript
<Animated.View style={styles.bar}>
  <Animated.View style={[styles.toolbar, toolbarStyles]}>
    <Icon name="format-bold" color="#FFF" size={20} />
    <Icon name="format-italic" color="#FFF" size={20} />
    <Icon name="format-underline" color="#FFF" size={20} />
    <Icon name="format-list-bulleted" color="#FFF" size={20} />
    <Icon name="format-list-numbers" color="#FFF" size={20} />
    <View style={styles.rightInnerBar}>
      <Icon name="link" color="#FFF" size={20} />
      <Icon name="image" color="#FFF" size={20} />
      <Icon name="arrow-down-bold-box" color="#FFF" size={20} />
    </View>
  </Animated.View>

  <Animated.View
    style={[StyleSheet.absoluteFill, styles.center]}
    pointerEvents={this.state.open ? "none" : "auto"}
  >
    <TouchableWithoutFeedback onPress={this.toggleTransform}>
      <View>
        <Text style={styles.buttonText}>Write</Text>
      </View>
    </TouchableWithoutFeedback>
  </Animated.View>
</Animated.View>
```

```javascript
buttonText: {
  color: "#FFF",
},
```

**Execute our Animation**

Now it's a matter of executing the animation and managing our focus. Here we toggle our open state inside of start callback. This will execute if our animation is interrupted or complete so we can toggle the open state, and handle the input correctly.

```javascript
toggleTransform = () => {
  const toValue = this._open ? 0 : 1;

  Animated.timing(this.state.animation, {
    toValue,
    duration: 550,
  }).start(() => {
    this._open ? this._input.blur() : this._input.focus();
    this._open = !this._open;
    this.setState({
      open: this._open,
    });
  });
};
```

**Transform the Input Height**

We started with the expanded view first so that means we need to craft our animation backwards. We are in a multi-stage animation our editor expanding will either be the last piece when expanding, or the first piece to animate when collapsing. So we'll setup our `inputRange` with `extrapolate: "clamp"` so the height values don't go less than 0. Then we craft our editor style and pass it into our animated view.

```javascript
const editorHeightInputInterpolate = this.state.animation.interpolate({
  inputRange: [0.7, 1],
  outputRange: [0, 150],
  extrapolate: "clamp",
});

const editorStyle = {
  opacity: this.state.animation,
  height: editorHeightInputInterpolate,
};
```

```javascript
<Animated.View style={[styles.lowerView, editorStyle]}>
  <TextInput
    placeholder="Start writing..."
    style={[StyleSheet.absoluteFill, styles.input]}
    multiline
    ref={(input) => (this._input = input)}
  />
</Animated.View>
```

**Transform Toolbar and Buttons**

Now that we have our first stage of our animation complete now we need to hide the editor icons. Again we're dealing with a multi-stage reversed animation. The opacity of the toolbar of buttons will be the first thing to slowly show up when expanding, but also the second piece of the animation. The reason this is starting at .5 instead of .7 is we want a slight pause before a new animation kicks in. This will also align the fade in of our buttons with expanding and collapsing of the bar.

```javascript
const opacityToolbarInterpolate = this.state.animation.interpolate({
  inputRange: [0, 0.5],
  outputRange: [0, 1],
  extrapolate: "clamp",
});

const toolbarStyles = {
  opacity: opacityToolbarInterpolate,
};
```

**Animate the Write Button Opacity**

Finally we get to the opacity of our write button. When we aren't animating (at 0) we want our button to be visible, but once we hit the 50% mark of our animation we should be completely gone because our button bar above will now be visible.

```javascript
const opacityButtonInterpolate = this.state.animation.interpolate({
  inputRange: [0, 0.5],
  outputRange: [1, 0],
  extrapolate: "clamp",
});

const buttonStyles = {
  opacity: opacityButtonInterpolate,
};
```

Sometimes it's easier to start at the end of your animation and work backwards to figure out the appropriate steps to produce the desired start state. Also note that this animation is using width/height transforms. This is generally less performant. If you implement this and are seeing performance issues you would need to fallback to using transforms, and opacity to craft the desired effect.
