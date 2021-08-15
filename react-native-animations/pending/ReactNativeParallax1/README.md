## Usage

_Note: `Parallax.Image` elements must be direct descendants of `Parallax.ScrollView`_

```js
var Parallax = require("react-native-parallax");

var ParallaxView = React.createClass({
  render: function () {
    return (
      <Parallax.ScrollView>
        <Parallax.Image
          style={{ height: 200 }}
          overlayStyle={{ backgroundColor: "rgba(0,0,0,0.3)" }}
          source={{ uri: "http://loremflickr.com/640/480" }}
        >
          <Text>This is optional overlay content</Text>
        </Parallax.Image>
      </Parallax.ScrollView>
    );
  },
});
```

## `Parallax.ScrollView` Properties

Any [`ScrollView` property](http://facebook.github.io/react-native/docs/scrollview.html) and the following:

| Prop                      | Description                                                                   | Default      |
| ------------------------- | ----------------------------------------------------------------------------- | ------------ |
| **`scrollViewComponent`** | What underlying component to compose around, must be `ScrollView` compatible. | `ScrollView` |

## `Parallax.Image` Properties

Any [`Image` property](http://facebook.github.io/react-native/docs/image.html) and the following:

| Prop                 | Description                                                                                      | Default |
| -------------------- | ------------------------------------------------------------------------------------------------ | ------- |
| **`onPress`**        | Fired when element is tapped.                                                                    | _None_  |
| **`imageStyle`**     | Optional image style, `width` and `height` styles are set automatically.                         | _None_  |
| **`overlayStyle`**   | Optional overlay style, might be useful if you want a shaded background for better readability.  | _None_  |
| **`parallaxFactor`** | The speed of the parallax effect. Larger values require taller images or they will be zoomed in. | `0.2`   |
