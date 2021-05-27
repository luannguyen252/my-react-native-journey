import React, { Component } from "react";
import { View, TouchableHighlight, Image } from "react-native";
import electricFadedImg from "../../images/electric_faded.png";
import electricSelectedImg from "../../images/electric_selected.png";
import bassFadedImg from "../../images/bass_faded.png";
import bassSelectedImg from "../../images/bass_selected.png";
import acousticFadedImg from "../../images/acoustic_faded.png";
import acousticSelectedImg from "../../images/acoustic_selected.png";
import styles from "./styles";
import constants from "../../constants";
import colors from "../../colors";
import * as Animatable from "react-native-animatable";
import PropTypes from "prop-types";

class InstrumentType extends Component {
  //animate the selection
  handlePress = guitar => {
    this.props.handleTypeChange(guitar);
    this.refs[guitar].swing(500);
  };

  render() {
    //show grayscale image if not selected, show colored image if selected
    electricImg =
      this.props.type === constants.electric
        ? electricSelectedImg
        : electricFadedImg;
    acousticImg =
      this.props.type === constants.acoustic
        ? acousticSelectedImg
        : acousticFadedImg;
    bassImg =
      this.props.type === constants.bass ? bassSelectedImg : bassFadedImg;

    //invalid row should have a red border
    imgRowStyle = this.props.validated
      ? styles.selectableImgRow
      : styles.invalidSelectableImgRow;

    return (
      <View style={imgRowStyle}>
        <Animatable.View ref={constants.electric}>
          <TouchableHighlight
            style={styles.imgWrapper}
            onPress={() => this.handlePress(constants.electric)}
            underlayColor={colors.evenLessWhite}
          >
            <Image
              source={electricImg}
              style={styles.img}
              resizeMode="contain"
            />
          </TouchableHighlight>
        </Animatable.View>
        <Animatable.View ref={constants.bass}>
          <TouchableHighlight
            style={styles.imgWrapper}
            onPress={() => this.handlePress(constants.bass)}
            underlayColor={colors.evenLessWhite}
          >
            <Image source={bassImg} style={styles.img} resizeMode="contain" />
          </TouchableHighlight>
        </Animatable.View>
        <Animatable.View ref={constants.acoustic}>
          <TouchableHighlight
            style={styles.imgWrapper}
            onPress={() => this.handlePress(constants.acoustic)}
            underlayColor={colors.evenLessWhite}
          >
            <Image
              source={acousticImg}
              style={styles.img}
              resizeMode="contain"
            />
          </TouchableHighlight>
        </Animatable.View>
      </View>
    );
  }
}

InstrumentType.propTypes = {
  type: PropTypes.string,
  validated: PropTypes.bool
};

InstrumentType.defaultProps = {
  type: null,
  validated: true
};

export default InstrumentType;
