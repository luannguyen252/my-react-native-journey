# React Native Take Screenshot

```bash
npm install react-native-view-shot
```

## Code to Take Screenshot Programmatically

```javascript
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { captureScreen } from "react-native-view-shot";

const App = () => {
  const [imageURI, setImageURI] = useState(
    "https://raw.githubusercontent.com/AboutReact/sampleresource/master/sample_img.png"
  );
  const [savedImagePath, setSavedImagePath] = useState("");

  const TakeScreenShotExample = () => {
    // To capture Screenshot
    captureScreen({
      // Either png or jpg (or webm Android Only), Defaults: png
      format: "jpg",
      // Quality 0.0 - 1.0 (only available for jpg)
      quality: 0.8,
    }).then(
      //callback function to get the result URL of the screnshot
      (uri) => {
        setSavedImagePath(uri);
        setImageURI(uri);
      },
      (error) => console.error("Oops, Something Went Wrong", error)
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          React Native Example to Take Screenshot Programmatically
        </Text>
        <Image
          source={{ uri: imageURI }}
          style={{
            width: 200,
            height: 300,
            resizeMode: "contain",
            marginTop: 5,
          }}
        />
        <TouchableOpacity style={styles.buttonStyle} onPress={takeScreenShot}>
          <Text style={styles.buttonTextStyle}>Take Screenshot</Text>
        </TouchableOpacity>
        <Text style={styles.textStyle}>
          {savedImagePath ? `Saved Image Path\n ${savedImagePath}` : ""}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default TakeScreenShotExample;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    alignItems: "center",
  },
  titleText: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
  },
  textStyle: {
    textAlign: "center",
    padding: 10,
  },
  buttonStyle: {
    fontSize: 16,
    color: "white",
    backgroundColor: "green",
    padding: 5,
    minWidth: 250,
  },
  buttonTextStyle: {
    padding: 5,
    color: "white",
    textAlign: "center",
  },
});
```
