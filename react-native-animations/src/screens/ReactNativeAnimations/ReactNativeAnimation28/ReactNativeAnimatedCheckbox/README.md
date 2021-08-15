| Prop          | Type   | Default   | Description                                                                               |
| ------------- | ------ | --------- | ----------------------------------------------------------------------------------------- |
| checked       | bool   | false     | if true, renders the check Icon component                                                 |
| animated      | bool   | true      | if true, animates to opacity of the Icon as `checked`'s value changes                     |
| duration      | number | 300       | animation duration. Considered only if `animated` === true                                |
| style         |        |           | style of the CheckBox parent container View. Check below for the default style definition |
| color         | string | '#F26F6F' | color of the icon, and default color of the parent's `borderColor` style                  |
| iconName      | string | 'check'   | `name` prop of react-native-vector-icons                                                  |
| iconSize      | number | 15        | `size` prop of react-native-vector-icons                                                  |
| activeOpacity | number | 0.7       | `activeOpacity` prop of TouchableOpacity                                                  |
| onPress       | func   | null      | callback called when the CheckBox gets pressed.                                           |
| children      | Node   | null      | optional Icon component if react-native-vector-icons/FontAwesome doesn't suit your needs. |

```javascript
const defaultStyle = {
  backgroundColor: "transparent",
  margin: 2,
  padding: 1,
  borderRadius: 0,
  borderWidth: 2,
  borderColor: this.props.color,
};
```
