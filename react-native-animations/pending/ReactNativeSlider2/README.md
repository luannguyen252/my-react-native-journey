```javascript
import { Slider } from "react-native";
```

to:

```javascript
import Slider from "@react-native-community/slider";
```

## Usage

### Example

```javascript
import Slider from "@react-native-community/slider";
```

```javascript
<Slider
  style={{ width: 200, height: 40 }}
  minimumValue={0}
  maximumValue={1}
  minimumTrackTintColor="#FFFFFF"
  maximumTrackTintColor="#000000"
/>
```

Check out the [example project](example) for more examples.

### Props

- [Inherited `View` props...](https://github.com/facebook/react-native-website/blob/master/docs/view.md#props)

* [`style`](#style)
* [`disabled`](#disabled)
* [`maximumValue`](#maximumvalue)
* [`minimumTrackTintColor`](#minimumtracktintcolor)
* [`minimumValue`](#minimumvalue)
* [`onSlidingStart`](#onslidingstart)
* [`onSlidingComplete`](#onslidingcomplete)
* [`onValueChange`](#onvaluechange)
* [`step`](#step)
* [`maximumTrackTintColor`](#maximumtracktintcolor)
* [`testID`](#testid)
* [`value`](#value)
* [`inverted`](#inverted)
* [`tapToSeek`](#tapToSeek)
* [`vertical`](#vertical)
* [`thumbTintColor`](#thumbtintcolor)
* [`maximumTrackImage`](#maximumtrackimage)
* [`minimumTrackImage`](#minimumtrackimage)
* [`thumbImage`](#thumbimage)
* [`trackImage`](#trackimage)
* [`ref`](#ref)

---

### `style`

Used to style and layout the `Slider`. See `StyleSheet.js` and `ViewStylePropTypes.js` for more info.

| Type       | Required |
| ---------- | -------- |
| View.style | No       |

---

### `disabled`

If true the user won't be able to move the slider. Default value is false.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `maximumValue`

Initial maximum value of the slider. Default value is 1.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `minimumTrackTintColor`

The color used for the track to the left of the button. Overrides the default blue gradient image on iOS.

| Type                                         | Required |
| -------------------------------------------- | -------- |
| [color](https://reactnative.dev/docs/colors) | No       |

---

### `minimumValue`

Initial minimum value of the slider. Default value is 0.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `onSlidingStart`

Callback that is called when the user picks up the slider. The initial value is passed as an argument to the callback handler.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onSlidingComplete`

Callback that is called when the user releases the slider, regardless if the value has changed. The current value is passed as an argument to the callback handler.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onValueChange`

Callback continuously called while the user is dragging the slider.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `step`

Step value of the slider. The value should be between 0 and (maximumValue - minimumValue). Default value is 0.

On Windows OS the default value is 1% of slider's range (from `minimumValue` to `maximumValue`).

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `maximumTrackTintColor`

The color used for the track to the right of the button. Overrides the default gray gradient image on iOS.

| Type                                         | Required |
| -------------------------------------------- | -------- |
| [color](https://reactnative.dev/docs/colors) | No       |

---

### `testID`

Used to locate this view in UI automation tests.

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `value`

Initial value of the slider. The value should be between minimumValue and maximumValue, which default to 0 and 1 respectively. Default value is 0.

_This is not a controlled component_, you don't need to update the value during dragging.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `tapToSeek`

Permits tapping on the slider track to set the thumb position. Defaults to false on iOS. No effect on Android or Windows.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

---

### `inverted`

Reverses the direction of the slider. Default value is false.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `vertical`

Changes the orientation of the slider to vertical, if set to `true`. Default value is false.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | Windows  |

---

### `thumbTintColor`

Color of the foreground switch grip.

| Type                                         | Required | Platform |
| -------------------------------------------- | -------- | -------- |
| [color](https://reactnative.dev/docs/colors) | No       | Android  |

---

### `maximumTrackImage`

Assigns a maximum track image. Only static images are supported. The leftmost pixel of the image will be stretched to fill the track.

| Type                   | Required | Platform |
| ---------------------- | -------- | -------- |
| Image.propTypes.source | No       | iOS      |

### `minimumTrackImage`

Assigns a minimum track image. Only static images are supported. The rightmost pixel of the image will be stretched to fill the track.

| Type                   | Required | Platform |
| ---------------------- | -------- | -------- |
| Image.propTypes.source | No       | iOS      |

---

### `thumbImage`

Sets an image for the thumb. Only static images are supported. Needs to be a URI of a local or network image; base64-encoded SVG is not supported.

| Type                   | Required |
| ---------------------- | -------- |
| Image.propTypes.source | No       |

---

### `trackImage`

Assigns a single image for the track. Only static images are supported. The center pixel of the image will be stretched to fill the track.

| Type                   | Required | Platform |
| ---------------------- | -------- | -------- |
| Image.propTypes.source | No       | iOS      |

---

### `ref`

Reference object.

| Type             | Required | Platform |
| ---------------- | -------- | -------- |
| MutableRefObject | No       | web      |
