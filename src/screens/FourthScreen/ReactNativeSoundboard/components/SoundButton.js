import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Audio } from "expo-av";

const SoundButton = (props) => {
  const [isPlaying, setPlaying] = useState(false);

  const playSound = async (pathToSound) => {
    // Play sound
    setPlaying(true);

    let soundObject = new Audio.Sound();

    try {
      await soundObject.loadAsync(props.soundBite);
      await soundObject.playAsync();
      soundObject.setOnPlaybackStatusUpdate(async (status) => {
        if (status.didJustFinish) {
          await soundObject.unloadAsync();
          setPlaying(false);
        }
      });
      // Your sound is playing!
      // await setTimeout(async ()=>{soundObject.stopAsync()}, 6000);
    } catch (error) {
      // An error occurred!
    }
  };

  if (isPlaying) {
    return (
      <TouchableOpacity style={styles.buttonStyle} onPress={playSound}>
        <ActivityIndicator />
        <Text style={styles.textStyle}>{props.title}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity style={styles.buttonStyle} onPress={playSound}>
      <Text style={styles.textStyle}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    marginHorizontal: 10,
    marginVertical: 20,
    width: 100,
    height: 100,
    backgroundColor: "#98ffcc",
    borderRadius: 10,
    elevation: 10,
    justifyContent: "flex-end",
    borderColor: "black",
    borderWidth: 2,
  },
  textStyle: {
    textAlign: "center",
    marginBottom: 5,
    color: "black",
  },
});

export default SoundButton;
