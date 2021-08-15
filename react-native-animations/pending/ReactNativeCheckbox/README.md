![npm](https://img.shields.io/npm/v/react-native?color=%232fa90f&label=react-native&style=plastic)
![npm](https://img.shields.io/npm/dm/react-native-customizable-checkbox?style=plastic)

# About

This is a React-Native Checkbox component that you can freely modify its styles.

## Instalation

To install just input the following command:

```bash
npm i react-native-customizable-checkbox
```

or

```bash
yarn add react-native-customizable-checkbox
```

## Basic Usage

```javascript
//...

state = {
  check: false,
}

handleChange = () => {
  console.log("check!")
}

render(){
  return (
    <CheckBox
      label="Check"
      value={this.state.check} // required
      onChangeValue={() => this.handleChange()} //required
    />
  )
}
```

## Advanced Usage

```javascript
//...

state = {
  check: false,
}

handleChange = () => {
  console.log("check!")
}

render(){
  return (
    <Checkbox
        label="Check"
        // isContainerClickable={true} // (default false), when true, clicks on checkbox container will change it's state
        // useNativeDriver={true} // (default false)
        // checkImage={pathToImage} image for check mark
        // colorActive={"#0ff"} hex color when checkbox is marked
        // colorInactive={"#fff"} hex color when checkbox is unmarked
        // boxStyle={yourBoxStyles} your custom style to the box
        // containerStyle={yourContainerStyles} your custom style for the whole container
        // textStyle={yourTextStyles} your custom style for the label
        value={this.state.check} // required
        onChangeValue={() => this.handleChange()} //required
      />
  )
}
```

- All commented options above are optional.
- If you want to use the "checkImage" prop, provide a image path, for example:

```javascript
import check from '../assets/images/yourImage';
// ...
checkImage = {check};
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
