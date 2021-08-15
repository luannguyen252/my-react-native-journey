## Basic Usage

```javascript
//...
import React, { useState } from "react";
import { Rating } from "react-native-rating-component";

const app: React.FC = () => {
  const [rate, setRate] = useState(3);

  return <Rating initialValue={3} onChangeValue={(value) => setRate(value)} />;
};
export default app;
```

## Using CustomRatingComponent

<img src ="https://i.imgur.com/lFYBcXJ.gif" width="40%"/>

```javascript
import React, { useState, useRef } from "react";
import { View } from "react-native";
import { Rating } from "react-native-rating-component";

/** Make sure to use fill prop to apply the color of active/inactive rating */
const YourComponent = ({ fill }) => {
  return (
    <View
      style={{ backgroundColor: fill, height: 30, width: 30, borderRadius: 15 }}
    />
  );
};

const App = () => {
  const [rate, setRate] = useState(2);
  return (
    <Rating
      initialValue={rate}
      minimumStars={1}
      fillColorActive="red"
      fillColorInactive="blue"
      distance={5}
      CustomRatingComponent={<YourComponent />}
      onChangeValue={async (value) => {
        setRate(value);
      }}
    />
  );
};

export default App;
```

## Advanced Usage

```javascript
//...
import React, { useState, useRef } from "react";
import { Rating } from "react-native-rating-component";

const app: React.FC = () => {
  const [rate, setRate] = useState(3);

  return (
    <Rating
      // customHeight={30} // Sets the height of the default star. (number)
      // customWidth={30} // Sets the width of the default star. (number)
      // fillColorActive='yellow' // Sets the color of the active rating component (custom or default). (string or hex color)
      // fillColorInactive='gray'// Sets the color of the inactive rating component (custom or default). (string or hex color)
      // minimunStars={1} // Sets the minimun of stars can be selected by user. (number)
      // starCount={5} // Sets the ammount of stars listed. (number)
      // CustomRatingComponent={<YourComponent/>} // Set your component instead of the default svg stars.
      // distance={10} // Sets the distance between each star. (number)
      initialValue={rate}
      onChangeValue={(value) => setRate(value)}
    />
  );
};

export default app;
```
