###### IMPORTANT! You need install them

```js
"@freakycoder/react-native-bounceable": ">= 0.2.5",
```

# Usage

## Import

```jsx
import RadioButton from "react-native-animated-radio-button";
```

## Basic Usage

You can check the example out 😏

```jsx
<RadioButton
  onPress={(isActive: boolean) =>
    console.log("RadioButton isActive: ", isActive)
  }
/>
```

## Customization Usage

```jsx
<RadioButton
  style={{
    marginTop: 32,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "#328da8",
  }}
  innerBackgroundColor="#328da8"
  innerContainerStyle={{ height: 35, width: 35, borderRadius: 10 }}
  onPress={(isActive: boolean) => console.log("isActive: ", isActive)}
/>
```

# Configuration - Props

| Property             |   Type   |  Default  | Description                                        |
| -------------------- | :------: | :-------: | -------------------------------------------------- |
| style                |  style   |  default  | set the main container's style (outer circle)      |
| innerContainerStyle  |  style   |  default  | set the inner container's style (inner circle)     |
| innerBackgroundColor |  color   |    red    | change the inner circle's background color         |
| initial              | boolean  | undefined | set the initial activation of the radio button     |
| isActive             | boolean  | undefined | this will disable the built-in state of activation |
| onPress              | function |  default  | set your own function when onPress is triggered    |
