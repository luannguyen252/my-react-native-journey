# React Native Audio and Video

```bash
npm install react-native-sound
```

## To play the sound from remote URL

```javascript
var sound1 = new Sound(
  "https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/pew2.aac",
  "",
  (error, sound) => {
    if (error) {
      alert("error" + error.message);
      return;
    }
    sound1.play(() => {
      sound1.release();
    });
  }
);
```

## From the local project directory

```javascript
var sound1 = new Sound(require("./pew2.aac"), (error, sound) => {
  if (error) {
    alert("error" + error.message);
    return;
  }
  sound1.play(() => {
    sound1.release();
  });
});
```

## To stop the sound

```javascript
sound4.stop(() => {
  console.log("Stop");
});
```

## React Native Audio and Video Example

```javascript
import React, { useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import Sound from "react-native-sound";

const AudioVideoExample = () => {
  let sound1, sound2, sound3, sound4, sound5, sound6;

  useEffect(() => {
    Sound.setCategory("Playback", true); // true = mixWithOthers
    return () => {
      if (sound1) sound1.release();
      if (sound2) sound2.release();
      if (sound3) sound3.release();
      if (sound4) sound4.release();
      if (sound5) sound5.release();
      if (sound6) sound6.release();
    };
  }, []);

  // List of the dummy sound track
  const audioList = [
    {
      title: "Play mp3 sound from Local",
      isRequire: true,
      url: require("./resource/advertising.mp3"),
    },
    {
      title: "Play mp3 sound from remote URL",
      url:
        "https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3",
    },
    {
      title: "Play aac sound from Local",
      isRequire: true,
      url: require("./resource/pew2.aac"),
    },
    {
      title: "Play aac sound from remote URL",
      url:
        "https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/pew2.aac",
    },
    {
      title: "Play wav sound from Local",
      isRequire: true,
      url: require("./resource/frog.wav"),
    },
    {
      title: "Play wav sound from remote URL",
      url:
        "https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/frog.wav",
    },
  ];

  const playSound = (item, index) => {
    if (index == 0) {
      sound1 = new Sound(item.url, (error, _sound) => {
        if (error) {
          alert("error" + error.message);
          return;
        }
        sound1.play(() => {
          sound1.release();
        });
      });
    } else if (index == 1) {
      sound2 = new Sound(item.url, "", (error, _sound) => {
        if (error) {
          alert("error" + error.message);
          return;
        }
        sound2.play(() => {
          sound2.release();
        });
      });
    } else if (index == 2) {
      sound3 = new Sound(item.url, (error, _sound) => {
        if (error) {
          alert("error" + error.message);
          return;
        }
        sound3.play(() => {
          sound3.release();
        });
      });
    } else if (index == 3) {
      sound4 = new Sound(item.url, "", (error, _sound) => {
        if (error) {
          alert("error" + error.message);
          return;
        }
        sound4.play(() => {
          sound4.release();
        });
      });
    } else if (index == 4) {
      sound5 = new Sound(item.url, (error, _sound) => {
        if (error) {
          alert("error" + error.message);
          return;
        }
        sound5.play(() => {
          sound5.release();
        });
      });
    } else if (index == 5) {
      sound6 = new Sound(item.url, "", (error, _sound) => {
        if (error) {
          alert("error" + error.message);
          return;
        }
        sound6.play(() => {
          sound6.release();
        });
      });
    }
  };

  const stopSound = (_item, index) => {
    if (index == 0 && sound1) {
      sound1.stop(() => {
        console.log("Stop");
      });
    } else if (index == 1 && sound2) {
      sound2.stop(() => {
        console.log("Stop");
      });
    } else if (index == 2 && sound3) {
      sound3.stop(() => {
        console.log("Stop");
      });
    } else if (index == 3 && sound4) {
      sound4.stop(() => {
        console.log("Stop");
      });
    } else if (index == 4 && sound5) {
      sound5.stop(() => {
        console.log("Stop");
      });
    } else if (index == 5 && sound6) {
      sound6.stop(() => {
        console.log("Stop");
      });
    }
  };

  const ItemView = (item, index) => {
    return (
      <View style={styles.feature} key={index}>
        <Text style={styles.textStyle}>{item.title}</Text>
        <TouchableOpacity onPress={() => playSound(item, index)}>
          <Text style={styles.buttonPlay}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => stopSound(item, index)}>
          <Text style={styles.buttonStop}>Stop</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Play Music / Sound in React Native App for Android and iOS
        </Text>
        <ScrollView style={{ flex: 1 }}>{audioList.map(ItemView)}</ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AudioVideoExample;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  titleText: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
  },
  textStyle: {
    flex: 1,
    padding: 5,
  },
  buttonPlay: {
    fontSize: 16,
    color: "white",
    backgroundColor: "rgba(00,80,00,1)",
    borderWidth: 1,
    borderColor: "rgba(80,80,80,0.5)",
    overflow: "hidden",
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  buttonStop: {
    fontSize: 16,
    color: "white",
    backgroundColor: "rgba(80,00,00,1)",
    borderWidth: 1,
    borderColor: "rgba(80,80,80,0.5)",
    overflow: "hidden",
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  feature: {
    flexDirection: "row",
    padding: 5,
    marginTop: 7,
    alignSelf: "stretch",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgb(180,180,180)",
  },
});
```

## React Native Play Video

```bash
# 1.
npm install react-native-video
# 2.
npm install react-native-media-controls
```

```javascript
// 1. VideoComponent.js
<Video
  onEnd={this.onEnd}
  onLoad={this.onLoad}
  onLoadStart={this.onLoadStart}
  onProgress={this.onProgress}
  paused={this.state.paused}
  ref={(videoPlayer) => (this.videoPlayer = videoPlayer)}
  resizeMode={this.state.screenType}
  onFullScreen={this.state.isFullScreen}
  source={{
    uri:
      "https://assets.mixkit.co/videos/download/mixkit-countryside-meadow-4075.mp4",
  }}
  style={styles.mediaPlayer}
  volume={10}
/>

// 2. MediaControls.js
<MediaControls
    duration={this.state.duration}
    isLoading={this.state.isLoading}
    mainColor="#333"
    onFullScreen={this.onFullScreen}
    onPaused={this.onPaused}
    onReplay={this.onReplay}
    onSeek={this.onSeek}
    onSeeking={this.onSeeking}
    playerState={this.state.playerState}
    progress={this.state.currentTime}
    toolbar={this.renderToolbar()}
/>
```

```javascript
import React, { useState, useRef } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Video from "react-native-video";
import MediaControls, { PLAYER_STATES } from "react-native-media-controls";

const PlayVideoExample = () => {
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState("content");

  const onSeek = (seek) => {
    // Handler for change in seekbar
    videoPlayer.current.seek(seek);
  };

  const onPaused = (playerState) => {
    // Handler for Video Pause
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onReplay = () => {
    // Handler for Replay
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
  };

  const onProgress = (data) => {
    // Video Player will progress continue even if it ends
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data) => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = (data) => setIsLoading(true);

  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

  const onError = () => alert("Oh! ", error);

  const exitFullScreen = () => {
    alert("Exit full screen");
  };

  const enterFullScreen = () => {};

  const onFullScreen = () => {
    setIsFullScreen(isFullScreen);
    if (screenType == "content") setScreenType("cover");
    else setScreenType("content");
  };

  const renderToolbar = () => (
    <View>
      <Text style={styles.toolbar}> toolbar </Text>
    </View>
  );

  const onSeeking = (currentTime) => setCurrentTime(currentTime);

  return (
    <View style={{ flex: 1 }}>
      <Video
        onEnd={onEnd}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        paused={paused}
        ref={videoPlayer}
        resizeMode={screenType}
        onFullScreen={isFullScreen}
        source={{
          uri:
            "https://assets.mixkit.co/videos/download/mixkit-countryside-meadow-4075.mp4",
        }}
        style={styles.mediaPlayer}
        volume={10}
      />
      <MediaControls
        duration={duration}
        isLoading={isLoading}
        mainColor="#333"
        onFullScreen={onFullScreen}
        onPaused={onPaused}
        onReplay={onReplay}
        onSeek={onSeek}
        onSeeking={onSeeking}
        playerState={playerState}
        progress={currentTime}
        toolbar={renderToolbar()}
      />
    </View>
  );
};

export default PlayVideoExample;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "black",
    justifyContent: "center",
  },
});
```

## Text to Speech Conversion

```bash
# 1.
npm install react-native-tts
# 2.
npm install @react-native-community/slider
```

**To get Different Voices**

```javascript
const voices = await Tts.voices();
const availableVoices = voices
  .filter((v) => !v.networkConnectionRequired && !v.notInstalled)
  .map((v) => {
    return { id: v.id, name: v.name, language: v.language };
  });
```

**Add different Listeners**

```javascript
Tts.addEventListener("tts-start", (_event) => setTtsStatus("started"));
Tts.addEventListener("tts-finish", (_event) => setTtsStatus("finished"));
Tts.addEventListener("tts-cancel", (_event) => setTtsStatus("cancelled"));
```

```javascript
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import Slider from "@react-native-community/slider";
import Tts from "react-native-tts";

const TextToSpeechExample = () => {
  const [voices, setVoices] = useState([]);
  const [ttsStatus, setTtsStatus] = useState("initiliazing");
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [speechRate, setSpeechRate] = useState(0.5);
  const [speechPitch, setSpeechPitch] = useState(1);
  const [text, setText] = useState("Enter Text like Hello About React");

  useEffect(() => {
    Tts.addEventListener("tts-start", (_event) => setTtsStatus("started"));
    Tts.addEventListener("tts-finish", (_event) => setTtsStatus("finished"));
    Tts.addEventListener("tts-cancel", (_event) => setTtsStatus("cancelled"));
    Tts.setDefaultRate(speechRate);
    Tts.setDefaultPitch(speechPitch);
    Tts.getInitStatus().then(initTts);
    return () => {
      Tts.removeEventListener("tts-start", (_event) => setTtsStatus("started"));
      Tts.removeEventListener("tts-finish", (_event) =>
        setTtsStatus("finished")
      );
      Tts.removeEventListener("tts-cancel", (_event) =>
        setTtsStatus("cancelled")
      );
    };
  }, []);

  const initTts = async () => {
    const voices = await Tts.voices();
    const availableVoices = voices
      .filter((v) => !v.networkConnectionRequired && !v.notInstalled)
      .map((v) => {
        return { id: v.id, name: v.name, language: v.language };
      });
    let selectedVoice = null;
    if (voices && voices.length > 0) {
      selectedVoice = voices[0].id;
      try {
        await Tts.setDefaultLanguage(voices[0].language);
      } catch (err) {
        // Samsung S9 has always this error:
        // "Language is not supported"
        console.log(`setDefaultLanguage error `, err);
      }
      await Tts.setDefaultVoice(voices[0].id);
      setVoices(availableVoices);
      setSelectedVoice(selectedVoice);
      setTtsStatus("initialized");
    } else {
      setTtsStatus("initialized");
    }
  };

  const readText = async () => {
    Tts.stop();
    Tts.speak(text);
  };

  const updateSpeechRate = async (rate) => {
    await Tts.setDefaultRate(rate);
    setSpeechRate(rate);
  };

  const updateSpeechPitch = async (rate) => {
    await Tts.setDefaultPitch(rate);
    setSpeechPitch(rate);
  };

  const onVoicePress = async (voice) => {
    try {
      await Tts.setDefaultLanguage(voice.language);
    } catch (err) {
      // Samsung S9 has always this error:
      // "Language is not supported"
      console.log(`setDefaultLanguage error `, err);
    }
    await Tts.setDefaultVoice(voice.id);
    setSelectedVoice(voice.id);
  };

  const renderVoiceItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: selectedVoice === item.id ? "#DDA0DD" : "#5F9EA0",
        }}
        onPress={() => onVoicePress(item)}
      >
        <Text style={styles.buttonTextStyle}>
          {`${item.language} - ${item.name || item.id}`}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Text to Speech Conversion with Natural Voices
        </Text>
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>
            {`Speed: ${speechRate.toFixed(2)}`}
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={0.01}
            maximumValue={0.99}
            value={speechRate}
            onSlidingComplete={updateSpeechRate}
          />
        </View>
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>
            {`Pitch: ${speechPitch.toFixed(2)}`}
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={0.5}
            maximumValue={2}
            value={speechPitch}
            onSlidingComplete={updateSpeechPitch}
          />
        </View>
        <Text style={styles.sliderContainer}>
          {`Selected Voice: ${selectedVoice || ""}`}
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setText(text)}
          value={text}
          onSubmitEditing={Keyboard.dismiss}
        />
        <TouchableOpacity style={styles.buttonStyle} onPress={readText}>
          <Text style={styles.buttonTextStyle}>
            Click to Read Text ({`Status: ${ttsStatus || ""}`})
          </Text>
        </TouchableOpacity>
        <Text style={styles.sliderLabel}>Select the Voice from below</Text>
        <FlatList
          style={{ width: "100%", marginTop: 5 }}
          keyExtractor={(item) => item.id}
          renderItem={renderVoiceItem}
          extraData={selectedVoice}
          data={voices}
        />
      </View>
    </SafeAreaView>
  );
};

export default TextToSpeechExample;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 5,
  },
  titleText: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonStyle: {
    justifyContent: "center",
    marginTop: 15,
    padding: 10,
    backgroundColor: "#8ad24e",
  },
  buttonTextStyle: {
    color: "#fff",
    textAlign: "center",
  },
  sliderContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    padding: 5,
  },
  sliderLabel: {
    textAlign: "center",
    marginRight: 20,
  },
  slider: {
    flex: 1,
  },
  textInput: {
    borderColor: "gray",
    borderWidth: 1,
    color: "black",
    width: "100%",
    textAlign: "center",
    height: 40,
  },
});
```

## Speech to Text Conversion in React Native – Voice Recognition

```bash
npm install react-native-voice
```

**Voice Recognition in React Native**

```javascript
Voice.onSpeechStart = this.onSpeechStart;
Voice.onSpeechEnd = this.onSpeechEnd;
Voice.onSpeechError = this.onSpeechError;
Voice.onSpeechResults = this.onSpeechResults;
Voice.onSpeechPartialResults = this.onSpeechPartialResults;
Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
```

**Start Voice Recognition**

```javascript
const startRecognizing = async () => {
  this.setState({
    pitch: "",
    error: "",
    started: "",
    results: [],
    partialResults: [],
    end: "",
  });

  try {
    await Voice.start("en-US");
  } catch (e) {
    console.error(e);
  }
};
```

**Stop Voice Recognition**

```javascript
const stopRecognizing = async () => {
  try {
    await Voice.stop();
  } catch (e) {
    console.error(e);
  }
};
```

**Cancel Voice Recognition**

```javascript
const cancelRecognizing = async () => {
  try {
    await Voice.cancel();
  } catch (e) {
    console.error(e);
  }
};
```

**Destroy the session of Voice Recognition**

```javascript
const destroyRecognizer = async () => {
  try {
    await Voice.destroy();
  } catch (e) {
    console.error(e);
  }
  this.setState({
    pitch: "",
    error: "",
    started: "",
    results: [],
    partialResults: [],
    end: "",
  });
};
```

```javascript
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import Voice from "react-native-voice";

const ConvertSpeechTextExample = () => {
  const [pitch, setPitch] = useState("");
  const [error, setError] = useState("");
  const [end, setEnd] = useState("");
  const [started, setStarted] = useState("");
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);

  useEffect(() => {
    // Setting callbacks for the process status
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    return () => {
      // destroy the process after switching the screen
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = (e) => {
    // Invoked when .start() is called without error
    console.log("onSpeechStart: ", e);
    setStarted("√");
  };

  const onSpeechEnd = (e) => {
    // Invoked when SpeechRecognizer stops recognition
    console.log("onSpeechEnd: ", e);
    setEnd("√");
  };

  const onSpeechError = (e) => {
    // Invoked when an error occurs.
    console.log("onSpeechError: ", e);
    setError(JSON.stringify(e.error));
  };

  const onSpeechResults = (e) => {
    // Invoked when SpeechRecognizer is finished recognizing
    console.log("onSpeechResults: ", e);
    setResults(e.value);
  };

  const onSpeechPartialResults = (e) => {
    // Invoked when any results are computed
    console.log("onSpeechPartialResults: ", e);
    setPartialResults(e.value);
  };

  const onSpeechVolumeChanged = (e) => {
    // Invoked when pitch that is recognized changed
    console.log("onSpeechVolumeChanged: ", e);
    setPitch(e.value);
  };

  const startRecognizing = async () => {
    // Starts listening for speech for a specific locale
    try {
      await Voice.start("en-US");
      setPitch("");
      setError("");
      setStarted("");
      setResults([]);
      setPartialResults([]);
      setEnd("");
    } catch (e) {
      console.error(e);
    }
  };

  const stopRecognizing = async () => {
    // Stops listening for speech
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  const cancelRecognizing = async () => {
    // Cancels the speech recognition
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  const destroyRecognizer = async () => {
    // Destroys the current SpeechRecognizer instance
    try {
      await Voice.destroy();
      setPitch("");
      setError("");
      setStarted("");
      setResults([]);
      setPartialResults([]);
      setEnd("");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Speech to Text Conversion in React Native | Voice Recognition
        </Text>
        <Text style={styles.textStyle}>Press mike to start Recognition</Text>
        <View style={styles.headerContainer}>
          <Text style={styles.textWithSpaceStyle}>{`Started: ${started}`}</Text>
          <Text style={styles.textWithSpaceStyle}>{`End: ${end}`}</Text>
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.textWithSpaceStyle}>{`Pitch: \n ${pitch}`}</Text>
          <Text style={styles.textWithSpaceStyle}>{`Error: \n ${error}`}</Text>
        </View>
        <TouchableHighlight onPress={startRecognizing}>
          <Image
            style={styles.imageButton}
            source={{
              uri:
                "https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png",
            }}
          />
        </TouchableHighlight>
        <Text style={styles.textStyle}>Partial Results</Text>
        <ScrollView>
          {partialResults.map((result, index) => {
            return (
              <Text key={`partial-result-${index}`} style={styles.textStyle}>
                {result}
              </Text>
            );
          })}
        </ScrollView>
        <Text style={styles.textStyle}>Results</Text>
        <ScrollView style={{ marginBottom: 42 }}>
          {results.map((result, index) => {
            return (
              <Text key={`result-${index}`} style={styles.textStyle}>
                {result}
              </Text>
            );
          })}
        </ScrollView>
        <View style={styles.horizontalView}>
          <TouchableHighlight
            onPress={stopRecognizing}
            style={styles.buttonStyle}
          >
            <Text style={styles.buttonTextStyle}>Stop</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={cancelRecognizing}
            style={styles.buttonStyle}
          >
            <Text style={styles.buttonTextStyle}>Cancel</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={destroyRecognizer}
            style={styles.buttonStyle}
          >
            <Text style={styles.buttonTextStyle}>Destroy</Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ConvertSpeechTextExample;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    padding: 5,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  titleText: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonStyle: {
    flex: 1,
    justifyContent: "center",
    marginTop: 15,
    padding: 10,
    backgroundColor: "#8ad24e",
    marginRight: 2,
    marginLeft: 2,
  },
  buttonTextStyle: {
    color: "#fff",
    textAlign: "center",
  },
  horizontalView: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
  },
  textStyle: {
    textAlign: "center",
    padding: 12,
  },
  imageButton: {
    width: 50,
    height: 50,
  },
  textWithSpaceStyle: {
    flex: 1,
    textAlign: "center",
    color: "#B0171F",
  },
});
```
