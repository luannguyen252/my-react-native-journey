## Installation

```bash
npm install --save react-native-fade-view
```

## Usage

```javascript
import React, { Component } from 'react';
import { Image, Text } from 'react-native';
import FadeView from 'react-native-fade-view';

class Example extends Component {
  render() {
    let { active } = this.state;

    return (
      <FadeView active={active}>
        <Text>loading...</Text>
        <Image onLoad={() => this.setState({ active: true })} />
      </FadeView>
    );
  }
}
```

## Properties

 name                 | description               | type    | default
:-------------------- |:------------------------- | -------:|:------------
 animationDuration    | Fade animation duration   |  Number | 225
 active               | Fade view state           | Boolean | false
 removeHiddenSubviews | Remove invisible subviews | Boolean | true

## Example

```bash
git clone https://github.com/n4kz/react-native-fade-view
cd react-native-fade-view/example
npm install
react-native run-ios # or run-android
```