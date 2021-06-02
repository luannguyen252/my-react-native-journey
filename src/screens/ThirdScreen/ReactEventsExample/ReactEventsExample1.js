import React, { PureComponent } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

export default class ReactEventsExample1 extends PureComponent {
  render() {
    const onPress = (msg) => {
      alert("Alert for: " + msg);
    };

    return (
      <View style={{ paddingTop: 16, paddingBottom: 16 }}>
        <Text>Events Example 1</Text>

        {/* Button */}
        <Button
          title="Click to Button"
          onPress={() => alert("This is alert you click on Button!")}
        />

        {/* TouchableNativeFeedback */}
        <TouchableNativeFeedback
          onPress={() => onPress("TouchableNativeFeedback Pressed")}
          background={TouchableNativeFeedback.SelectableBackground()}
        >
          <View style={styles.button}>
            <Text>Click to Touchable Native Feedback</Text>
          </View>
        </TouchableNativeFeedback>

        {/* TouchableHighlight */}
        <TouchableHighlight
          style={styles.button}
          onPress={() => onPress("TouchableHighlight Pressed")}
        >
          <Text>Click to Touchable Highlight</Text>
        </TouchableHighlight>

        {/* TouchableOpacity */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => onPress("TouchableOpacity Pressed")}
        >
          <Text>Click to Touchable Opacity</Text>
        </TouchableOpacity>

        {/* TouchableWithoutFeedback */}
        <TouchableWithoutFeedback
          style={styles.button}
          onPress={() => onPress("TouchableWithoutFeedback Pressed")}
        >
          <View style={styles.button}>
            <Text>Click to Touchable Without Feedback</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});
