import React, { Component } from "react";
import { TouchableOpacity, Animated } from "react-native";
import Styles from "./Styles";

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.imageThumbOpacity = new Animated.Value(0);
    this.imageOpacity = new Animated.Value(0);
  }

  _onImageThumbLoaded() {
    Animated.timing(this.imageThumbOpacity, {
      toValue: 1,
      duration: 250,
    }).start();
  }

  _onImageLoaded() {
    Animated.timing(this.imageOpacity, {
      toValue: 1,
      duration: 250,
    }).start();
  }

  render() {
    return (
      <Animated.View style={this.props.style}>
        <TouchableOpacity style={Styles.Card.container} activeOpacity={0.75}>
          <Animated.Image
            source={this.props.imageThumbSrc}
            style={[
              Styles.Card.imageThumb,
              { opacity: this.imageThumbOpacity },
            ]}
            onLoad={() => this._onImageThumbLoaded()}
            blurRadius={4}
          />
          <Animated.Image
            source={this.props.imageSrc}
            style={[Styles.Card.image, { opacity: this.imageOpacity }]}
            onLoad={() => this._onImageLoaded()}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}
