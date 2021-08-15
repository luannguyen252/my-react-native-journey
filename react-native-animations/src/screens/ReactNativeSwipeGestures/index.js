import GestureRecognizer, { swipeDirections } from "./GestureRecognizer";
import React, { Component } from "react";
import { Text } from "react-native";
import globalStyles from "../../assets/styles/globalStyles";

export default class ReactNativeSwipeGestures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myText: "I'm ready to get swiped!",
      gestureName: "none",
      backgroundColor: "#F9FAFB",
    };
  }

  onSwipeUp(gestureState) {
    this.setState({ myText: "You swiped up!" });
  }

  onSwipeDown(gestureState) {
    this.setState({ myText: "You swiped down!" });
  }

  onSwipeLeft(gestureState) {
    this.setState({ myText: "You swiped left!" });
  }

  onSwipeRight(gestureState) {
    this.setState({ myText: "You swiped right!" });
  }

  onSwipe(gestureName, gestureState) {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    this.setState({ gestureName: gestureName });
    switch (gestureName) {
      case SWIPE_UP:
        this.setState({ backgroundColor: "#DCFCE7" });
        break;
      case SWIPE_DOWN:
        this.setState({ backgroundColor: "#FFEDD5" });
        break;
      case SWIPE_LEFT:
        this.setState({ backgroundColor: "#DBEAFE" });
        break;
      case SWIPE_RIGHT:
        this.setState({ backgroundColor: "#FAE8FF" });
        break;
    }
  }

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };

    return (
      <GestureRecognizer
        onSwipe={(direction, state) => this.onSwipe(direction, state)}
        onSwipeUp={(state) => this.onSwipeUp(state)}
        onSwipeDown={(state) => this.onSwipeDown(state)}
        onSwipeLeft={(state) => this.onSwipeLeft(state)}
        onSwipeRight={(state) => this.onSwipeRight(state)}
        config={config}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: this.state.backgroundColor,
        }}
      >
        <Text style={[globalStyles.title, { textAlign: "center" }]}>
          {this.state.myText}
        </Text>
        <Text style={[globalStyles.bodyText, { textAlign: "center" }]}>
          onSwipe callback received gesture: {this.state.gestureName}
        </Text>
      </GestureRecognizer>
    );
  }
}
