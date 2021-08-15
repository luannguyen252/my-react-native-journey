###### IMPORTANT! You need install them

```js
"react-native-animated-spinkit": "^1.4.1",
"@freakycoder/react-native-bounceable": ">= 0.2.2",
```

# Usage

## Import

```js
import SearchBar from "react-native-dynamic-search-bar";
```

## Component Options

There are two modes in the library:

<ul>
  <li><b>Search Button</b></li>
  <li><b>Search TextInput</b></li>
</ul>

## Basic Usage

```jsx
<SearchBar
  placeholder="Search here"
  onPress={() => alert("onPress")}
  onChangeText={(text) => console.log(text)}
/>
```

## Advanced Usage

You can check the example for the advanced usage

```jsx
<SearchBar
  fontColor="#c6c6c6"
  iconColor="#c6c6c6"
  shadowColor="#282828"
  cancelIconColor="#c6c6c6"
  backgroundColor="#353d5e"
  placeholder="Search here"
  onChangeText={(text) => this.filterList(text)}
  onSearchPress={() => console.log("Search Icon is pressed")}
  onClearPress={() => this.filterList("")}
  onPress={() => alert("onPress")}
/>
```

## Advanced Built-in Spinner Usage

You can check the example for the advanced built-in spinner usage

```js
import React, { Component } from "react";
import { View } from "react-native";
import SearchBar from "react-native-dynamic-search-bar";

export default class Test extends Component {
  handleOnChangeText = (text) => {
    // ? Visible the spinner
    this.setState({
      searchText: text,
      spinnerVisibility: true,
    });

    // ? After you've done to implement your use-case
    // ? Do not forget to set false to spinner's visibility
    this.setState({
      spinnerVisibility: false,
    });
  };

  render() {
    const { spinnerVisibility } = this.state;
    return (
      <View>
        <SearchBar
          height={50}
          fontSize={24}
          fontColor="#fdfdfd"
          iconColor="#fdfdfd"
          shadowColor="#282828"
          cancelIconColor="#fdfdfd"
          backgroundColor="#ba312f"
          spinnerVisibility={spinnerVisibility}
          placeholder="Search any cosmetics ..."
          fontFamily="BurbankBigCondensed-Black"
          shadowStyle={styles.searchBarShadowStyle}
          onChangeText={this.handleOnChangeText}
        />
      </View>
    );
  }
}
```

### Configuration - Props

| Property              |    Type    |     Default      | Description                                                              |
| --------------------- | :--------: | :--------------: | ------------------------------------------------------------------------ |
| style                 | ViewStyle  |     default      | set or override the style object for the main search view                |
| darkMode              |  boolean   |      false       | enable the dark mode                                                     |
| onChangeText          |  function  |     function     | set your own function for the onChangeText logic                         |
| onPress               |  function  |     function     | set your own function for the onPress functionality                      |
| onSearchPress         |  function  |     function     | set your own function for the **search** button's onPress functionality  |
| onClearPress          |  function  |     function     | set your own function for the **clear** button's onPress functionality   |
| onBlur                |  function  |     function     | set your own function for the text input's onBlur functionality          |
| onFocus               |  function  |     function     | set your own function for the text input's onBlur functionality          |
| textInputStyle        | TextStyle  |     default      | set or override the style object for the text input                      |
| searchIconImageStyle  | ImageStyle |     default      | set or override the style object for the search icon image style         |
| clearIconImageStyle   | ImageStyle |     default      | set or override the style object for the clear icon image style          |
| ImageComponent        | component  |      Image       | set your own Image component instead of react-native's default Image one |
| searchIconComponent   | component  |     default      | set your own component instead of Icon for the **search** component      |
| clearIconComponent    | component  |     default      | set your own component instead of Icon for the **clear** component       |
| searchIconImageSource |  ISource   |     default      | change the search icon image source                                      |
| clearIconImageSource  |  ISource   |     default      | change the clear icon image source                                       |
| clearIconImageSource  |  ISource   |     default      | change the clear icon image source                                       |
| placeholder           |   string   | "Search here..." | set your own placeholder string                                          |
| placeholderTextColor  |   color    |    undefined     | set placeholder text color                                               |
| spinnerColor          |   color    |     #fdfdfd      | change the spinner color                                                 |
| spinnerSize           |   number   |     default      | change the spinner size                                                  |
| SpinnerType           | component  |      Circle      | change the spinner type                                                  |
| spinnerVisibility     |  boolean   |      false       | change the spinner visibility                                            |

## Expo Compatibility

Dynamic Search Bar is usable with Expo. You just need to add a peer dependency:

```js
"react-native-dynamic-vector-icons": "WrathChaos/react-native-dynamic-vector-icons#expo"
```

## Known Issues

### Android

#### Vector Icons are not showing :O

-> You need to add this line of code into app/gradle

```java
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

#### Animations are not working on the Android like the example?

-> You need to enable experimental LayoutAnimation on the android. Here is how to do it:

```js
import { UIManager } from 'react-native';

constructor() {
    super();
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}
```
