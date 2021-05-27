import React, { Component } from "react";
import { View, TouchableHighlight, Image } from "react-native";
import dailyFadedImg from "../../images/calendar_daily_faded.png";
import dailySelectedImg from "../../images/calendar_daily_selected.png";
import somedaysFadedImg from "../../images/calendar_somedays_faded.png";
import somedaysSelectedImg from "../../images/calendar_somedays_selected.png";
import weeklyFadedImg from "../../images/calendar_weekly_faded.png";
import weeklySelectedImg from "../../images/calendar_weekly_selected.png";
import styles from "../InstrumentType/styles";
import constants from "../../constants";
import colors from "../../colors";
import * as Animatable from "react-native-animatable";
import PropTypes from "prop-types";

class InstrumentUse extends Component {
  //animate the selection
  handlePress = use => {
    this.props.handleUseChange(use);
    this.refs[use].swing(500);
  };

  render() {
    //show grayscale image if not selected, show colored image if selected
    dailyImg =
      this.props.use === constants.daily ? dailySelectedImg : dailyFadedImg;
    somedaysImg =
      this.props.use === constants.somedays
        ? somedaysSelectedImg
        : somedaysFadedImg;
    weeklyImg =
      this.props.use === constants.weekly ? weeklySelectedImg : weeklyFadedImg;

    //invalid row should have a red border
    imgRowStyle = this.props.validated
      ? styles.selectableImgRow
      : styles.invalidSelectableImgRow;

    return (
      <View style={imgRowStyle}>
        <Animatable.View ref={constants.daily}>
          <TouchableHighlight
            style={styles.imgWrapper}
            onPress={() => this.handlePress(constants.daily)}
            underlayColor={colors.evenLessWhite}
          >
            <Image source={dailyImg} style={styles.img} resizeMode="contain" />
          </TouchableHighlight>
        </Animatable.View>
        <Animatable.View ref={constants.somedays}>
          <TouchableHighlight
            style={styles.imgWrapper}
            onPress={() => this.handlePress(constants.somedays)}
            underlayColor={colors.evenLessWhite}
          >
            <Image
              source={somedaysImg}
              style={styles.img}
              resizeMode="contain"
            />
          </TouchableHighlight>
        </Animatable.View>
        <Animatable.View ref={constants.weekly}>
          <TouchableHighlight
            style={styles.imgWrapper}
            onPress={() => this.handlePress(constants.weekly)}
            underlayColor={colors.evenLessWhite}
          >
            <Image source={weeklyImg} style={styles.img} resizeMode="contain" />
          </TouchableHighlight>
        </Animatable.View>
      </View>
    );
  }
}

InstrumentUse.propTypes = {
  use: PropTypes.string,
  validated: PropTypes.bool
};

InstrumentUse.defaultProps = {
  use: null,
  validated: true
};

export default InstrumentUse;
