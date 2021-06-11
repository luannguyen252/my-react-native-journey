# react-native-micro-animated-button
<img src="https://raw.githubusercontent.com/sonaye/react-native-micro-animated-button/master/demo.gif" width="400">

# Installation
`yarn add react-native-micro-animated-button`

# Definition
```javascript
type button = {
  activeOpacity?: number,           // default = 1
  backgroundColor?: string,         // default = white
  bounce?: boolean,                 // default = false
  disabled?: boolean,               // default = false
  disabledBackgroundColor: string,  // default = gray
  disabledForegroundColor: string,  // default = white
  errorColor: string,               // default = red
  errorIconColor?: string,          // default = white
  errorIconName: string,
  foregroundColor?: string,         // default = black
  iconSize?: number,                // default = 17
  label: string,
  labelIcon?: string,               // default = <FontAwesome />
  labelStyle?: Object,              // default = defaultLabelStyle
  maxWidth?: number,                // default = 240
  minWidth?: number,                // default = 40
  noFill?: boolean,                 // default = false
  onError?: Function,               // default = () => null
  onPress?: Function,               // default = () => null
  onReset?: Function,               // default = () => null
  onSecondaryPress?: Function,      // default = () => null
  onSuccess?: Function,             // default = () => null
  renderIcon?: any,                 // default = <FontAwesome />
  renderIndicator?: any,            // default = <ActivityIndicator />
  scaleFactor?: number,             // default = 1.1
  scaleOnSuccess?: boolean,         // default = false
  shakeOnError?: boolean,           // default = false
  static?: boolean,                 // default = false
  style?: Object,                   // default = defaultStyle
  successColor?: string,            // default = green
  successIconColor?: string,        // default = white
  successIconName: string
};

const defaultStyle = {
  borderRadius: 25,
  borderWidth: 0.5,
  height: 40,
  marginBottom: 10,
  marginTop: 10
};

const defaultLabelStyle = {
  padding: 9
};

// Methods
button.error();   // Animates button to error state
button.reset();   // Animates button to initial/default state
button.success(); // Animates button to success state
```

## Examples
```javascript
import React, { Component } from 'react';
import { LayoutAnimation, StatusBar, Text, View } from 'react-native';

import ActivityIndicator from 'react-native-activity-indicator'; // optional
import Button from 'react-native-micro-animated-button';

const colors = {
  blue: '#4285f4',
  gray: '#d8d8d8',
  grayDark: '#444',
  green: '#0f9d58',
  red: '#db4437',
  white: 'white'
};

const Example1 = () => (
  <View style={{ alignItems: 'center' }}>
    <Button
      bounce
      foregroundColor={colors.green}
      label="Submit"
      onPress={() => this.b1.success()}
      ref={ref => (this.b1 = ref)}
      renderIndicator={<ActivityIndicator color={colors.green} />}
      successIconName="check"
    />

    <Button
      bounce
      foregroundColor={colors.blue}
      label="Retweet"
      onPress={() => this.b2.success()}
      ref={ref => (this.b2 = ref)}
      renderIndicator={<ActivityIndicator color={colors.blue} />}
      successIconName="retweet"
    />

    <Button
      bounce
      foregroundColor={colors.red}
      label="Favorite"
      onPress={() => this.b3.success()}
      ref={ref => (this.b3 = ref)}
      renderIndicator={<ActivityIndicator color={colors.red} />}
      successIconName="heart"
    />
  </View>
);

const Example2 = () => (
  <View style={{ alignItems: 'center' }}>
    <Button
      bounce
      errorColor={colors.red}
      errorIconName="thumbs-down"
      foregroundColor={colors.grayDark}
      label="Am I even?"
      onPress={() =>
        new Date().getSeconds() % 2 === 0 ? this.b4.success() : this.b4.error()}
      ref={ref => (this.b4 = ref)}
      renderIndicator={<ActivityIndicator color={colors.grayDark} />}
      successColor={colors.green}
      successIconName="thumbs-up"
    />

    <Button
      bounce
      errorColor={colors.red}
      errorIconName="thumbs-down"
      foregroundColor={colors.grayDark}
      label="Am I even?"
      onPress={() =>
        new Date().getSeconds() % 2 === 0 ? this.b5.success() : this.b5.error()}
      ref={ref => (this.b5 = ref)}
      renderIndicator={<ActivityIndicator color={colors.grayDark} />}
      successColor={colors.green}
      successIconName="thumbs-up"
    />
  </View>
);

const Example3 = () => (
  <View style={{ alignItems: 'center' }}>
    <Button
      backgroundColor={colors.blue}
      bounce
      errorColor={colors.red}
      errorIconName="warning"
      foregroundColor={colors.white}
      label="Simulate an error"
      onPress={() => this.b6.error()}
      ref={ref => (this.b6 = ref)}
      renderIndicator={<ActivityIndicator color={colors.white} />}
      shakeOnError
      style={{ borderRadius: 0 }}
    />

    <Button
      backgroundColor={colors.blue}
      bounce
      foregroundColor={colors.white}
      label="Smile at me"
      onPress={() => this.b7.success()}
      ref={ref => (this.b7 = ref)}
      renderIndicator={<ActivityIndicator color={colors.white} />}
      scaleOnSuccess
      style={{ borderRadius: 0 }}
      successColor={colors.green}
      successIconName="smile-o"
    />
  </View>
);

const Example4 = () => (
  <View style={{ alignItems: 'center' }}>
    <Button
      disabled
      disabledBackgroundColor={colors.gray}
      disabledForegroundColor={colors.white}
      label="Disabled Button"
      style={{ borderRadius: 0 }}
    />

    <Button
      activeOpacity={0.5}
      backgroundColor={colors.blue}
      foregroundColor={colors.white}
      label="Static Button"
      onPress={() => null}
      static
      style={{ borderRadius: 0 }}
    />
  </View>
);

class Example5 extends Component {
  state = { show: false };

  componentWillMount() {
    StatusBar.setHidden(true, 'fade');
  }

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  render() {
    return (
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
        <Button
          activeOpacity={0.5}
          foregroundColor={colors.blue}
          labelIcon="cloud-download"
          noFill
          onPress={() => {
            this.b8.success();
            this.setState({ show: true });
          }}
          onSecondaryPress={() => {
            this.b8.reset();
            this.setState({ show: false });
          }}
          ref={ref => (this.b8 = ref)}
          renderIndicator={<ActivityIndicator color={colors.blue} />}
          style={{ borderRadius: 0 }}
          successColor={colors.blue}
          successIconColor={colors.blue}
          successIconName="remove"
        />

        {this.state.show &&
          <Text style={{ color: colors.blue, marginLeft: 10 }}>
            I just got downloaded.
          </Text>}
      </View>
    );
  }
}

const Examples = () => (
  <View style={{ flex: 1, justifyContent: 'center' }}>
    <Example1 />
    <Example2 />
    <Example3 />
    <Example4 />
    <Example5 />
  </View>
);

export default Examples;
```
