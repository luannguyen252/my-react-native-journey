Since `react-native-navigation-container` is an extension of the original react navigation `NavigationContainer`, it works in a similar fashion as [react navigation - navigation container](https://reactnavigation.org/docs/navigation-container/).

1. Import react-native-navigation-container:

```javascript
import NavigationContainer from 'react-native-navigation-container';
```

2. Wrap root navigation with Navigation container:

```javascript
export default function App() {
  return (
    <NavigationContainer>
      <RootNav />
    </NavigationContainer>
  );
}
```

3. Prepare fonts and assets to be loaded:

```javascript
const fonts = {
  'SofiaPro-Black': require('../../assets/fonts/SofiaProBlack.otf'),
  'SofiaPro-BlackItalic': require('../../assets/fonts/SofiaProBlackItalic.otf'),
};

const assets = [
  require('../../assets/images/img1.png'),
  require('../../assets/images/img2.png'),
];
```

4. Add fonts and assets to navigation container:

```javascript
export default function App() {
  return (
    <NavigationContainer fonts={fonts} assets={assets}>
      <RootNav />
    </NavigationContainer>
  );
}
```

5. Optionally set the `stickyNav` prop:

```javascript
export default function App() {
  return (
    <NavigationContainer fonts={fonts} assets={assets} stickyNav={true}>
      <RootNav />
    </NavigationContainer>
  );
}
```

## A complete example

```javascript
import React from 'react';
import NavigationContainer from 'react-native-navigation-container;

import { RootNav } from './src/navigation';

export default function App() {
  return (
    <NavigationContainer fonts={fonts} assets={assets} stickyNav={true}>
        <RootNav />
    </NavigationContainer>
  );
}
```

## Available props

| Name      | type   | Description                                                     |
| --------- | ------ | --------------------------------------------------------------- |
| fonts     | object | Fonts to be loaded into app                                     |
| assets    | array  | Static assets to be loaded into app                             |
| stickyNav | bool   | Maintains navigation state after app refresh - only in dev mode |
