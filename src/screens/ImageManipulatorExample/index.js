import React, { useState, useEffect } from "react";
import { Button, View, Image } from "react-native";
import { Asset } from "expo-asset";
import * as ImageManipulator from "expo-image-manipulator";

export default function ImageManipulatorExample() {
  const [ready, setReady] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const image = Asset.fromModule(require("./assets/snack-icon.png"));
      await image.downloadAsync();
      setImage(image);
      setReady(true);
    })();
  }, []);

  const _rotate90andFlip = async () => {
    const manipResult = await ImageManipulator.manipulateAsync(
      image.localUri || image.uri,
      [{ rotate: 90 }, { flip: ImageManipulator.FlipType.Vertical }],
      { compress: 1, format: ImageManipulator.SaveFormat.PNG }
    );
    setImage(manipResult);
  };

  const _renderImage = () => {
    return (
      <View
        style={{
          marginVertical: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={{ uri: image.localUri || image.uri }}
          style={{ width: 300, height: 300, resizeMode: "contain" }}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      {ready && image && _renderImage()}
      <Button title="Rotate and Flip" onPress={_rotate90andFlip} />
    </View>
  );
}
