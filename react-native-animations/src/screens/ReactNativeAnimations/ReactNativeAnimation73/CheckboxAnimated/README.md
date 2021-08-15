## Install

```sh
$ npm install --save react-native-checkbox-animated
```

## Usage

```js
import React, { useState } from "react";
import Checkbox from "react-native-checkbox-animated";

const App = () => {
  const [checked, setChecked] = useState(false);

  return (
    <View>
      <CheckBox
        label="your label here"
        onValueChange={(val) => setChecked(val)}
        checked={checked}
      />
    </View>
  );
};
```
