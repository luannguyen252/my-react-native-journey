# Combining Animations

Building out connected animations can be done with `interpolate` however there are times where you need multiple `Animated.Value`s to control your animations.

In order for these to be connected, or to develop complex animations you need to use the various methods provided by the `Animated` library.

The real power here is being able to combine various `timing`, `spring`, and other methods to generate the animation you want. This helps cover bases when `interpolate` isn't enough, or different animated values need different animations.

## Parallel

The `parallel` call will take an array of animations and start them all at the same time.

A good example of this is when you might have a separate animated value for `opacity` and a separate animated value for a position of an element.

The opacity would be on a strict `Animated.timing`, but you might want the position to `Animated.spring` out of the way.

Also if you just have multiple timed animations and you need them to animate at the same time you can do that as well.

The `start` callback won't be called until the last animation is finished. Which would be the `scaleAnimation` that runs for 500 milliseconds.

```javascript
handlePress = () => {
  Animated.parallel([
    Animated.timing(this.state.colorAnimation, {
      toValue: 1,
      duration: 500,
    }),
    Animated.timing(this.state.scaleAnimation, {
      toValue: 2,
      duration: 300,
    }),
  ]).start();
};
```

This can be used in conjunction with any interpolates like so.

```javascript
const backgroundColorInterpolate = this.state.colorAnimation.interpolate({
  inputRange: [0, 1],
  outputRange: ["rgb(255,99,71)", "rgb(99,71,255)"],
});
const boxStyle = {
  backgroundColor: backgroundColorInterpolate,
  transform: [{ scale: this.state.scaleAnimation }],
};
```

## Sequence

This is used to run a set of animations one after the other.

Once an animation is finished the next one is run.

So as we see here we run first a color animation, then we scale.

Our `start` callback won't be run until they both finish, so in `800` milliseconds.

```javascript
Animated.sequence([
  Animated.timing(this.state.colorAnimation, {
    toValue: 1,
    duration: 500,
  }),
  Animated.timing(this.state.scaleAnimation, {
    toValue: 2,
    duration: 300,
  }),
]).start();
```

You can additionally animate the same animated values inside of sequences.

```javascript
Animated.sequence([
  Animated.timing(this.state.colorAnimation, {
    toValue: 1,
    duration: 500,
  }),
  Animated.timing(this.state.colorAnimation, {
    toValue: 0,
    duration: 500,
  }),
  Animated.timing(this.state.scaleAnimation, {
    toValue: 2,
    duration: 300,
  }),
]).start();
```

## Stagger

Staggering animations is a great way to have consistent animations with a small space in between them.

Typically the animations are going to be the same but they don't have to be.

One of the best examples of staggered animations is draggable chat heads.

Every time the lead head is dragged to a position the others follow suit using the exact same animation path and velocity.

Another example is staggering the visibility/rendering of form items, or other elements upon rendering.

```javascript
Animated.stagger(200, [
  Animated.timing(this._opacityAnimation, {
    toValue: 1,
    duration: 500,
  }),
  Animated.timing(this._positionAnimation, {
    toValue: 0,
    duration: 150,
  }),
]).start();
```

## Delay

The only time `delay` is used is when combining with animations.

Typically used in conjunction with `sequence` to cause a delay before a second set of animations is run.

This can also be used with super complex animations using `sequence` and `parallel`.

Like so

```javascript
Animated.sequence([
  Animated.timing(this.state.colorAnimation, {
    toValue: 1,
    duration: 500,
  }),
  Animated.timing(this.state.scaleAnimation, {
    toValue: 2,
    duration: 300,
  }),
  Animated.delay(1500),
  Animated.parallel([
    Animated.timing(this.state.colorAnimation, {
      toValue: 0,
      duration: 500,
    }),
    Animated.timing(this.state.scaleAnimation, {
      toValue: 1,
      duration: 300,
    }),
  ]),
]).start();
```

## Combining Multiple Combined Animations

Our delay animation is a great example of a complex animation with multiple combined animations.

These can all be nested in any fashion as deep as you want.

Including `timing`, `stagger`, `spring`, `parallel`, `delay`, `sequence`, etc.

However do not that the `start` callback will not be called until ALL animations are completed.

So here with our delay animation, these run sequentially.

This animation would last for `500 + 300 + 1500 + 500`, and then our `start` would be called.

```javascript
Animated.sequence([
  Animated.timing(this.state.colorAnimation, {
    toValue: 1,
    duration: 500,
  }),
  Animated.timing(this.state.scaleAnimation, {
    toValue: 2,
    duration: 300,
  }),
  Animated.delay(1500),
  Animated.parallel([
    Animated.timing(this.state.colorAnimation, {
      toValue: 0,
      duration: 500,
    }),
    Animated.timing(this.state.scaleAnimation, {
      toValue: 1,
      duration: 300,
    }),
  ]),
]).start();
```
