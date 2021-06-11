### Installation

#### Using npm:

```sh
$ npm install --save react-native-animated-list
```


### Usage

```jsx
import React, { Component } from 'react';

import AnimatedList from 'react-native-animated-list';

render() {
  return (
    <AnimatedList
        animation="scale"
        items={Data}
        duration={300}
        renderRow={this._renderRow}  
        onRemove={(item) => this._removeItem(item)}
    />
  );
}
```

#### Props

| Prop | Type | Description |
|---|---|---|
|**`animation`**|`string<opacity\|scale\|slideLeft\|slideRight>`|Animation preset.|
|**`duration`**|`number`|Length of animation in milliseconds. _Default 300._|
|**`animationFunc`**|`() => Animated animation object`|Function to define a custom animation.|
|**`renderRow`**|`() => ReactElement<any>`|Function to render a row.|
|**`onRemove`**|`() => ReactElement<any>`|Function to delete a row.|