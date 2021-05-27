# React Native Text Input

## Example 1

```javascript
import React, { Component } from "react";
import { Text, TextInput, View } from "react-native";

export default class PizzaTranslator extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }

  render() {
    return (
      <View style={{ padding: 10 }}>
        <TextInput
          style={{ height: 40, backgroundColor: "azure", fontSize: 20 }}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.setState({ text })}
        />
        <Text style={{ padding: 100, fontSize: 50 }}>
          {this.state.text
            .split(" ")
            .map((word) => word && "🍕")
            .join(" ")}
        </Text>*
      </View>
    );
  }
}
```

## TextInput properties

`allowFontScaling`

`blurOnSubmit`

`contextMenuHidden`

`editable`

`keyboardAppearance`

`numberOfLines`

`onContentSizeChange`

`onLayout`

`placeholder`

`scrollEnabled`

`selectionColor`

`textContentType`

`autoCapitalize`

`caretHidden`

`dataDetectorTypes`

`enablesReturnKeyAutomatically`

`keyboardType`

`onBlur`

`onEndEditing`

`onScroll`

`placeholderTextColor`

`secureTextEntry`

`selectionState`

`style`

`autoCorrect`

`clearButtonMode`

`defaultValue`

`inlineImageLeft`

`maxLength`

`onChange`

`onFocus`

`onSelectionChange`

`returnKeyLabel`

`selection`

`selectTextOnFocus`

`textBreakStrategy`

`autoFocus`

`clearTextOnFocus`

`disableFullscreenUI`

`inlineImagePadding`

`multiline`

`onChangeText`

`onKeyPress`

`onSubmitEditing`

`returnKeyType`

`selectionColor`

`spellCheck`

`underlineColorAndroid`

## Multiline TextInput

```javascript
import React, { Component } from "react";
import { View, TextInput } from "react-native";

class UselessTextInput extends Component {
  render() {
    return (
      <TextInput
        {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        editable={true}
        maxLength={40}
      />
    );
  }
}

export default class UselessTextInputMultiline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Useless Multiline Placeholder",
    };
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: this.state.text,
          borderBottomColor: "#000000",
          borderBottomWidth: 1,
        }}
      >
        <UselessTextInput
          multiline={true}
          numberOfLines={10}
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
          style={{ fontSize: 20 }}
        />
      </View>
    );
  }
}
```
