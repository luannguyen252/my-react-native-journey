**Init value**

```javascript
import React, { useState } from "react";
import Toggle from "react-native-toggle-element";

const [toggleValue, setToggleValue] = useState(false);
```

**Toggle with default components**

```javascript
<Toggle value={toggleValue} onPress={(val) => setToggleValue(val)} />
```

**Toggle with left title**

```javascript
<Toggle
  value={toggleValue}
  onPress={(newState) => setToggleValue(newState)}
  leftTitle="On"
/>
```

**Toggle with right title**

```javascript
<Toggle
  value={toggleValue}
  onPress={(newState) => setToggleValue(newState)}
  leftTitle="Right"
/>
```

**Toggle with left title and right Title**

```javascript
<Toggle
  value={toggleValue}
  onPress={(newState) => setToggleValue(newState)}
  leftTitle="Left"
  rightTitle="Right"
/>
```

**Toggle with custom left component**

```javascript
<Toggle
  value={toggleValue}
  onPress={(newState) => setToggleValue(newState)}
  leftComponent={<Icon name="credit" width="30" height="30" fill={"#3BD2B5"} />}
/>
```

**Toggle with custom right component**

```javascript
<Toggle
  value={toggleValue}
  onPress={(newState) => setToggleValue(newState)}
  rightComponent={<Icon name="plus" width="30" height="30" fill={"#3BD2B5"} />}
/>
```

**Toggle with mixed left & right components**

```javascript
<Toggle
  value={toggleValue}
  onPress={(newState) => setToggleValue(newState)}
  disabled
  leftComponent={
    <Icon name="credit" width="30" height="30" fill={Colors.tabIconSelected} />
  }
  rightComponent={
    <Icon name="plus" width="30" height="30" fill={Colors.tabIconSelected} />
  }
/>
```

**Toggle with thumb button components**

```javascript
<ToggleButton
  value={toggleValue}
  onPress={(newState) => setToggleValue(newState)}
  thumbActiveComponent={
    <Icon name="sun" width="40" height="40" fill={"#3BD2B5"} />
  }
  thumbInActiveComponent={
    <Icon name="night" width="40" height="40" fill={"#03452C"} />
  }
  trackBar={{
    activeBackgroundColor: "#9ee3fb",
    inActiveBackgroundColor: "#3c4145",
    borderActiveColor: "#86c3d7",
    borderInActiveColor: "#1c1c1c",
    borderWidth: 5,
    width: 100,
  }}
/>
```

**Disabled Toggle**

```javascript
<Toggle
  disabled
  value={toggleValue}
  onPress={(newState) => setToggleValue(newState)}
  leftTitle="Left"
  rightTitle="Right"
/>
```

**Modify TrackBar Size**

```javascript
<Toggle
  value={toggleValue}
  onPress={(newState) => setToggleValue(newState)}
  leftTitle="Left"
  rightTitle="Right"
  trackBar={{
    width: 200,
    height: 50,
    radius: 25,
  }}
/>
```

**Modify TrackBar Style**

```javascript
<Toggle
  value={toggleValue}
  onPress={(newState) => setToggleValue(newState)}
  trackBarStyle={{
    borderColor: "green",
  }}
  trackBar={{
    borderWidth: 2,
  }}
/>
```

**Modify ThumbButton**

```javascript
<Toggle
  value={toggleValue}
  onPress={(newState) => setToggleValue(newState)}
  leftTitle="Left"
  rightTitle="Right"
  thumbButton={{
    width: 60,
    height: 60,
    radius: 30,
  }}
/>
```

**Modify Disabled Toggle**

```javascript
<Toggle
  disabled
  disabledTitleStyle={{ color: "red" }}
  disabledStyle={{ backgroundColor: "gray", opacity: 0.3 }}
  value={toggleValue}
  onPress={(newState) => setToggleValue(newState)}
  leftTitle="Left"
  rightTitle="Right"
/>
```
