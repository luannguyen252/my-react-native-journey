# React Native Picker

## Props of Picker

`onValueChange(itemValue, itemPosition)`

`selectedValue`

`style`

`testID`

`enabled`

`mode`

`prompt`

`itemStyle`

## React Native Picker Example

```javascript
import React, { Component } from "react";
import { StyleSheet, View, Text, Picker } from "react-native";

export default class PickerExample extends Component {
  state = {
    choosenIndex: 0,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>Picker Example</Text>
        <Picker
          style={styles.pickerStyle}
          selectedValue={this.state.language}
          onValueChange={(itemValue, itemPosition) =>
            this.setState({ language: itemValue, choosenIndex: itemPosition })
          }
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
          <Picker.Item label="React Native" value="rn" />
        </Picker>
        <Text style={styles.textStyle}>
          {"Index =" + this.state.choosenIndex}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    margin: 24,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  pickerStyle: {
    height: 150,
    width: "80%",
    color: "#344953",
    justifyContent: "center",
  },
});
```
