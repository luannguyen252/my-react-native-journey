import React, { Component } from "react";

import { Image } from "react-native";
import { mainview_style_image } from "../styles/Styles";

class ImageView extends Component {
  render() {
    let { uri, width, height } = this.props;

    const styles = mainview_style_image(width, height);

    return (
      <Image source={{ uri }} style={[styles.imageSize, styles.padding]} />
    );
  }
}

ImageView.propTypes = {
  uri: React.PropTypes.string.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
};

export { ImageView };
