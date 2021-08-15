## Props

| Prop         | Type          | Default                                      | Note                                                      |
| ------------ | ------------- | -------------------------------------------- | --------------------------------------------------------- |
| `source`     | `ImageSource` |                                              | Same kind of `source` prop that `<Image />` component has |
| `svgXmlData` | `String`      |                                              | You can pass the SVG as String directly                   |
| `fill`       | `Color`       |                                              | Overrides all fill attributes of the svg file             |
| `fillAll`    | `Boolean`     | Adds the fill color to the entire svg object |

## <a name="Usage">Usage</a>

Here's a simple example:

```javascript
import SvgUri from "react-native-svg-uri";

const TestSvgUri = () => (
  <View style={styles.container}>
    <SvgUri
      width="200"
      height="200"
      source={{
        uri: "http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg",
      }}
    />
  </View>
);
```

or a static file

```javascript
<SvgUri width="200" height="200" source={require("./img/homer.svg")} />
```
