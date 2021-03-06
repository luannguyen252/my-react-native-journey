import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  DeviceEventEmitter,
  Slider,
} from "react-native";
import Player from "react-native-audio-streaming-player";

const PLAYBACK_STATE = {
  STATE_NONE: 0,
  STATE_STOPPED: 1,
  STATE_PAUSED: 2,
  STATE_PLAYING: 3,
  STATE_FAST_FORWARDING: 4,
  STATE_REWINDING: 5,
  STATE_BUFFERING: 6,
  STATE_ERROR: 7,
  STATE_CONNECTING: 8,
  STATE_SKIPPING_TO_PREVIOUS: 9,
  STATE_SKIPPING_TO_NEXT: 10,
  STATE_SKIPPING_TO_QUEUE_ITEM: 11,
};

export default class Example extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTime: 0,
      index: 0,
      playlist: null,
      status: "STOPPED",
    };

    this.dragging = false;

    this.onPlaybackActionChanged = this.onPlaybackActionChanged.bind(this);
    this.onPlaybackPositionUpdated = this.onPlaybackPositionUpdated.bind(this);
    this.onPlaybackStateChanged = this.onPlaybackStateChanged.bind(this);
  }

  componentWillMount() {}

  componentDidMount() {
    DeviceEventEmitter.addListener(
      "onPlaybackPositionUpdated",
      this.onPlaybackPositionUpdated
    );
    DeviceEventEmitter.addListener(
      "onPlaybackStateChanged",
      this.onPlaybackStateChanged
    );
    DeviceEventEmitter.addListener(
      "onPlaybackActionChanged",
      this.onPlaybackActionChanged
    );
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeAllListeners();
  }

  onPlaybackPositionUpdated(event) {
    console.log("Current position: " + event.currentPosition);

    if (this.state.status === "PLAYING") {
      if (!this.dragging) {
        this.setState({
          currentTime: parseInt(event.currentPosition), // convert milisecond to second
        });
      }
    }
  }

  onPlaybackActionChanged(event) {
    console.log("Current Action: " + event.action);
  }

  onPlaybackStateChanged(event) {
    console.log("PlaybackState: " + event.state);
    this.setState({ status: event.state });
  }

  onPlay() {
    const { playlist, index } = this.state;

    Player.play("http://pianosolo.streamguys.net/live.m3u", {
      title: "Aaron",
      artist: "Celine Dion",
      album_art_uri: "https://unsplash.it/300/300",
    });
  }

  onPause() {
    Player.pause();
  }

  onStop() {
    this.setState({
      currentTime: 0,
    });
    Player.stop();
  }

  onNext() {
    const { playlist, index } = this.state;

    this.setState(
      {
        currentTime: 0,
        index: (index + 1) % playlist.length,
      },
      () => {
        this.onPlay();
      }
    );
  }

  onPrev() {
    const { playlist, index } = this.state;

    this.setState(
      {
        currentTime: 0,
        index: index === 0 ? playlist.length - 1 : index,
      },
      () => {
        this.onPlay();
      }
    );
  }

  onSeekTo(pos) {
    this.dragging = false;
    Player.seekTo(pos);
  }

  render() {
    const { playlist, index, currentTime } = this.state;

    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "stretch",
            justifyContent: "space-around",
          }}
        >
          <Button title="Play" onPress={() => this.onPlay()} color="red" />
          <Button title="Pause" onPress={() => this.onPause()} color="red" />
          <Button title="Stop" onPress={() => this.onStop()} color="red" />
        </View>
        <View style={{ alignSelf: "stretch", marginVertical: 10 }}>
          <Slider
            value={currentTime}
            minimumValue={0}
            maximumValue={playlist ? playlist[index].duration : 1}
            onValueChange={(value) => {
              this.dragging = true;
            }}
            step={1}
            onSlidingComplete={(value) => this.onSeekTo(value)}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 15,
            }}
          >
            <Text>{currentTime}</Text>
            <Text>{playlist ? playlist[index].duration : 1}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    borderWidth: 1,
    borderColor: "red",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
});
