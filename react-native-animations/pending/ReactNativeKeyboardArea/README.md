# react-native-keyboard-area

This library will address these problems:

- When set **windowSoftInputMode** to `adjustNothing`, the React Native Keyboard events, `keyboardDidHide` and `keyboardDidShow`, will stop working ([see issue #2852](https://github.com/facebook/react-native/issues/2852#issuecomment-141712317)).

- When Keyboard appear the entire app content will **move up** (iOS and Android).

- For chat application than needs to keep the bottom text input in the same position when dismiss the Keyboard and show some actions, the switch will not be that smooth.

## Getting started

`$ yarn add react-native-keyboard-area`

Is recommend to use React Native > 0.60, the autolinking will install this library native `RNKeyboard` module for iOS and Android.

## Introduction

- On iOS:
  React Native provides a component called `KeyboardAvoidingView`, wrap your page with that and it will move up the content when the keyboard appears.

- On Android:
  By default in the **AndroidManifest.xml** we have the **windowSoftInputMode** set to `adjustResize`, the entire app content will move up when the keyboard appears so we don't need the `KeyboardAvoidingView` component.

In both way, the entire page content will move up or down then the Keyboard appear or disappear.

But sometimes we don't need to whole app to move up, the most common example is a Chat application, we might want to switch to a _Custom View_ when the keyboard disappear.

## Here comes this Library

This library **solve the problem by creating** a wrapper component `KeyboardArea`, this component will adjust his height then the keyboard appear or disappear.

In addition is also possible **to control** the state with `isOpen` props or with the exposed `open()` and `close()` methods.

Another benefit is that the ReactNaive will **not repaint** the whole app when the keyboard appears since main view will not change is size.

### Real world example: before and after

<div style="text-align: center">
<table>
  <tr>
    <td style="text-align: center" width="50%">
        <a href=".github/before.gif"><img src=".github/before.gif" width="200" alt="Before"/></a>
    </td>
    <td style="text-align: center" width="50%">
        <a href=".github/after.gif"><img src=".github/after.gif" width="200" alt="After"/></a>
    </td>
  </tr>
  <tr>
    <td style="text-align: center" width="50%">
        <p><b>Before</b>: Using ReactNative KeyboardAvoidingView and adjustResize, the result is not very good, the page "jumps" when the keyboard disappear after the switch</p>
    </td>
    <td style="text-align: center" width="50%">
        <p><b>After</b>: Using this library, the entire view will not move, and the keyboard area under the input will keep the same height during the switch</p>
    </td>
  </tr>
</table>
</div>

## How it works?

This library have some iOS and Android native code to notify, through an event named `KeyboardSizeChanges`, the `KeyboardArea` component when the keyboard height changes.

- On iOS we just use the `UIResponder` keyboardWillShowNotification and keyboardWillHideNotification to then emit the event with the current height.

- On Android we need to set the **windowSoftInputMode** to `adjustNothing`, to avoid the keyboard to move up the entire view, then we create a invisible `PopupWindow` to listen the layout changes and measure the keyboard height.

## Usage

Most of the logic is inside the `KeyboardArea` component, we just need to wrap the content we want to show when the keyboard disappear and then set the **isOpen** props when we need to show, in follow example case, the **ChatActionsInput** component.

** this is a simplified version of the above screenshots **

```tsx
import { KeyboardArea, KeyboardAreaRef } from 'react-native-keyboard-area';

/// ...
keyboardSpacerRef = createRef<KeyboardSpacerRef>();

handleUserClick = () => {
    this.keyboardSpacerRef.current?.close();
}

handleChangeMode = () => {
    this.setState(prev => ({
      inputMode:
        prev.inputMode === ChatInputModes.Actions
          ? ChatInputModes.Text
          : ChatInputModes.Actions,
    }));
}

keyboardAreaHeightChanged = (isOpen: boolean, currentHeight: number) => {
  // Your logic
};

render() {

    return (
        <PageContent>
            <ChatMessageList />
            <ChatTextInput onChangeMode={this.handleChangeMode} />
            <KeyboardSpacer
                ref={this.keyboardSpacerRef}
                isOpen={inputMode === ChatInputModes.Actions}
                onChange={this.keyboardAreaHeightChanged}
            >
                <ChatActionsInput />
            </KeyboardSpacer>
        </PageContent>
    );
}
```

## Android notes

Since on android we might want use adjustResize for the others page, we can use this library `setWindowSoftInputMode` to dynamically change the SoftInput mode only for the pages that we need, for example:

```tsx
import { RNKeyboard, SoftInputMode } from 'react-native-keyboard-area';

// Example with react-navigation page focus/blur events

componentDidMount() {
  navigation.addListener('blur', this.componentDidExit);
  navigation.addListener('focus', this.componentDidEnter);
}

componentDidEnter = () => {
  if (Platform.OS === 'android') {
    RNKeyboard.setWindowSoftInputMode(SoftInputMode.SOFT_INPUT_ADJUST_NOTHING,);
  }
};

componentDidExit = () => {
  if (Platform.OS === 'android') {
    RNKeyboard.setWindowSoftInputMode(SoftInputMode.SOFT_INPUT_ADJUST_RESIZE);
  }
};

componentWillUnmount() {
  navigation.removeListener('blur', this.componentDidExit);
  navigation.removeListener('focus', this.componentDidEnter);
}
```

### Credits

For Android all credits goes to [Cristian Holdunu](https://github.com/Crysis21) and [Siebe Brouwer](https://github.com/siebeprojects) for the `PopupWindow` idea implementation and to calculate the keyboard height, I just port it in the React Native module system.
