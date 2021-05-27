# React Native Modal

## Modal Props

`visible`

`supportedOritentions`: portrait, portrait-upside-down, landscape, landscape-left, landscape-right

`onRequestClose`

`onShow`

`transparent`

`animationType`: slide, fade, none

`hardwareAccelerated`

`onDismiss`

`onOrientationChange`: portrait, landscape

`presentationStyle`: fullScreen, pageSheet, fromSheet, overFullScreen

`animated`

## React Native Modal Example

```javascript
import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button, Modal } from "react-native";

export default class App extends Component<Props> {
  state = {
    isVisible: false, // State of modal default false
  };

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType={"fade"}
          transparent={false}
          visible={this.state.isVisible}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
        >
          {/* All views of Modal */}
          <View style={styles.modal}>
            <Text style={styles.text}>Modal is open!</Text>
            <Button
              title="Click To Close Modal"
              onPress={() => {
                this.setState({ isVisible: !this.state.isVisible });
              }}
            />
          </View>
        </Modal>
        {/* Button will change state to true and view will re-render */}
        <Button
          title="Click To Open Modal"
          onPress={() => {
            this.setState({ isVisible: true });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00BCD4",
    height: 300,
    width: "80%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    marginTop: 80,
    marginLeft: 40,
  },
  text: {
    color: "#3f2949",
    marginTop: 10,
  },
});
```
