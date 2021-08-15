# Slide View

[![Join the chat at https://gitter.im/Devnetik/react-native-slide-view](https://badges.gitter.im/Devnetik/react-native-slide-view.svg)](https://gitter.im/Devnetik/react-native-slide-view?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![npm](https://img.shields.io/npm/dm/react-native-slide-view.svg?maxAge=2592000)](https://www.npmjs.com/package/react-native-slide-view)
[![npm](https://img.shields.io/npm/v/react-native-slide-view.svg?maxAge=2592000)](https://www.npmjs.com/package/react-native-slide-view)
[![Beerpay](https://beerpay.io/Devnetik/react-native-slide-view/badge.svg?style=flat)](https://beerpay.io/Devnetik/react-native-slide-view)

## Getting started
```sh
npm install --save react-native-slide-view
```

## Example

```javascript
class Example extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slideViewVisible: false
    };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Text>Some content</Text>
        <SlideView visible={this.state.slideViewVisible}>
          <Text>Some content inside the slide view</Text>
        </SlideView>
      </View>
    )
  }
}
```

## Props

- `friction` animation friction
- `duration` animation duration in ms (default is `500`)
- `showDuration` show animation duration in ms (defaults to `duration`)
- `hideDuration` hide animation duration in ms(defaults to `duration`)
- `expandedHeight` view height when expanded (defaults to window height)
- `closeOnTap` if true, closes on tap
- `closing` function called when hiding
- `onClosed` function called after closing animations completed 
- `onOpened` function called after opening animations completed 

## Contribute

Comments, Issues and Pull Requests are welcomed!

## License (MIT)

Copyright (c) 2016 Devnetik

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
