```bash
npm install react-native-animated-searchbox --save
```

## Usage

```
// Call for the open
openSearchBox = () => this.refSearchBox.open();

// Call for the close
closeSearchBox = () => this.refSearchBox.close();

render() {
 return (
    <View>

        <ReactNativeAnimatedSearchbox
            ref={(ref) => this.refSearchBox = ref}
            placeholder={"Search..."}
        />

    </View>
 )}

```

## Properties

| Key                  | Description                                                                          | Value Type                   | Is Required | Default                |
| -------------------- | ------------------------------------------------------------------------------------ | ---------------------------- | ----------- | ---------------------- |
| height               | Height of the search box                                                             | `number`                     | false       | 48                     |
| borderRadius         | Border radius of the search box                                                      | `number`                     | false       | 48                     |
| fontSize             | Font size of the search box                                                          | `number`                     | false       | 20                     |
| backgroundColor      | Background color of the search box                                                   | `color codes (hex,rgb,rgba)` | false       | rgba(255,255,255,0.70) |
| placeholderTextColor | Placeholder text color                                                               | `color codes (hex,rgb,rgba)` | false       | #555555                |
| searchIconSize       | Search icon width and height size                                                    | `number`                     | false       | 20                     |
| searchIconColor      | Search icon color                                                                    | `color codes (hex,rgb,rgba)` | false       | #555555                |
| focusAfterOpened     | If true, keyboard will show after search box opened                                  | `boolean`                    | false       | false                  |
| shadowColor          | Box\-shadow color of the search box\. If you don't want to please type `transparent` | `color codes (hex,rgb,rgba)` | false       | rgba(0,0,0,0.12\)      |
| placeholder          | Placeholder text of the search box                                                   | `string/text`                | true        |                        |
| animationSpeed       | Animation speeds as miliseconds                                                      | `array ([number, number])`   | false       | [200, 250]             |

## Events

| Key       | Description                          |
| --------- | ------------------------------------ |
| onOpening | Trigger on search box start to open  |
| onClosing | Trigger on search box start to close |
| onOpened  | Trigger on search box fully opened   |
| onClosed  | Trigger on search box fully closed   |
