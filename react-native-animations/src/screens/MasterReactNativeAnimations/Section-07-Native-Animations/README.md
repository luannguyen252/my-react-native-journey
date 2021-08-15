# Native Animations

`Animated` operates on the JavaScript side of React Native and sends new style and updates across the bridge with `setNativeProps`. This works for most animations but sometimes your animations may not be performing smoothly. This is where the `useNativeDriver` option comes in.

The main downside is that it is not support on all animations yet. At this time it's support for `timing` and `spring` and `Animated.event` when it is combined with `Animated.ScrollView`.

The reason that it's only supported on a handful of methods is that the entire logic behind `Animated` needs to be re-implemented on the native side. The values you pass in (`duration`, `tension`, `friction`, etc) get serialized and passed over to the native side. If your `Animated.View` is given a native driven animation then the native world will use an `AnimatedNode`.

When you call start the animation will tell the native world to start executing the animation. Since the animation is executing on the native side the JavaScript won't be blocked by the animation calculations and also won't have to continually send calculations over the bridge.

NOTE: At this time `opacity` and the various `transform` properties are supported. More values will be supported as the native portion of `Animated` is improved.

**Timing**

In order to execute a native animation with timing you would add the `useNativeDriver: true` to your configuration like so.

```javascript
Animated.timing(this._animation, {
  duration: 500,
  toValue: 1,
  useNativeDriver: true,
}).start();
```

**Spring**

Just like `timing`, pass in `useNativeDriver: true`.

```javascript
Animated.spring(this._animation, {
  toValue: 1,
  useNativeDriver: true,
}).start();
```

**Event**

One thing to note is that we should use a `scrollEventThrottle` of `1` here instead of `16`. Throttling events to `16` ensures that we are running at 60 FPS. However when running natively we shouldn't be dropping frames and want to get notified as frequently as possible so our `Animated.Value` updates.

```javascript
<Animated.ScrollView
  scrollEventThrottle={1}
  onScroll={Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            y: this._animation,
          },
        },
      },
    ],
    { useNativeDriver: true }
  )}
/>
```
