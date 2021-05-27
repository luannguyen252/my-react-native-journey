import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  Alert
} from "react-native";
import styles from "./styles";
import { calculateTip, setSelectedIndex } from "../../actions";
import * as Animatable from "react-native-animatable";
import PropTypes from "prop-types";
import constants from "../../constants";
import colors from "../../colors";
import strings from "../../strings";

//If tipping is optional display this text
function IsOptional(value) {
  return value.country.tips[value.country.selectedTipIndex].optional ? (
    <Text style={styles.optional}>{strings.tippingOptional}</Text>
  ) : null;
}

//Inform user that the selected situation doesn't need tipping
function CheckForZeroTip(props) {
  if (props.tipAmount === 0) {
    return <Text style={styles.text}>{strings.noNeedToTip}</Text>;
  }
  return (
    <Text style={styles.text}>
      {props.currency}
      {props.amount}
    </Text>
  );
}

//Adjusting for names which are displayed differently in the modal selector
function checkName(name) {
  switch (name) {
    case "Congo, D.R.":
      return "D.R. Congo";
    case "Gambia, The":
      return "The Gambia";
    case "Korea, North":
      return "North Korea";
    case "Korea, South":
      return "South Korea";
    case "Sudan, South":
      return "South Sudan";
  }
  return name;
}

class ValidatedTip extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.country.name !== this.props.country.name) {
      try {
        this.props.calculateTip(this.props.enteredValue);
      } catch (e) {
        console.log(e);
      }
    }
    return true;
  }

  render() {
    const { name, tips, selectedTipIndex, currency } = this.props.country;
    let tipButtons =
      tips.length > 1 &&
      tips.map((item, i) => {
        let useThisButtonStyle = styles.tipType;
        let useThisTextStyle = styles.tipButtonText;
        if (i === selectedTipIndex) {
          useThisButtonStyle = styles.selectedTipType;
          useThisTextStyle = styles.selectedTipButtonText;
        }
        return (
          //cool staggered animation
          <Animatable.View
            key={i}
            animation="slideInRight"
            duration={300}
            delay={i * 100}
          >
            <TouchableHighlight
              style={useThisButtonStyle}
              onPress={() => {
                this.props.setSelectedIndex(i);
                this.props.calculateTip(this.props.enteredValue);
              }}
              underlayColor={colors.light}
            >
              <Text style={useThisTextStyle}>{item.type}</Text>
            </TouchableHighlight>
          </Animatable.View>
        );
      });

    switch (this.props.err) {
      //inform user to only input numbers
      case constants.notANumber:
        return (
          <View style={styles.textWrapper}>
            <Text style={styles.errorText}>{strings.useNumbers}</Text>
          </View>
        );
      //inform user that they can't input negative numbers
      case constants.negative:
        return (
          <View style={styles.textWrapper}>
            <Text style={styles.errorText}>{strings.dontUseNegatives}</Text>
          </View>
        );
      //no error detected.
      case null:
        if (tips.length === 1 && tips[selectedTipIndex] !== null) {
          //show tip amount
          return (
            <View>
              <View style={styles.tipExtras}>
                <Text style={styles.percentage}>
                  {strings.tip}: {tips[selectedTipIndex].percentage * 100}%
                </Text>
                <IsOptional country={this.props.country} />
              </View>
              <View style={styles.tipWrapper}>
                <Text style={styles.text}>
                  {currency}
                  {this.props.amount}
                </Text>
              </View>
            </View>
          );
        } else if (tips.length > 1) {
          //show tip amount along with the tip type buttons
          return (
            <View>
              <View style={styles.tipButtonWrapper}>
                <ScrollView horizontal={true}>{tipButtons}</ScrollView>
              </View>
              <View style={styles.tipExtras}>
                <Text style={styles.percentage}>
                  {strings.tip}: {tips[selectedTipIndex].percentage * 100}%
                </Text>
                <IsOptional country={this.props.country} />
              </View>
              <View style={styles.tipWrapper}>
                <CheckForZeroTip
                  currency={currency}
                  tipAmount={
                    this.props.country.tips[this.props.country.selectedTipIndex]
                      .percentage
                  }
                  amount={this.props.amount}
                />
              </View>
            </View>
          );
        } else if (
          name === "Japan" ||
          name === "Korea, South" ||
          name === "Georgia" ||
          name === "Iceland"
        ) {
          //inform user to not tip in the selected country
          return (
            <View style={styles.textWrapper}>
              <Text style={styles.text}>
                {strings.doNotTipIn} {checkName(name)}.
              </Text>
            </View>
          );
        } else {
          //inform user that they do not need to tip in the selected country
          return (
            <View style={styles.textWrapper}>
              <Text style={styles.text}>
                {strings.dontNeedToTip} {checkName(name)}.
              </Text>
            </View>
          );
        }
      default:
        //an error occured
        return <Text style={styles.errorText}>Something went wrong...</Text>;
    }
  }
}

ValidatedTip.propTypes = {
  country: PropTypes.shape({
    name: PropTypes.string.isRequired,
    flag: PropTypes.string.isRequired,
    tips: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        percentage: PropTypes.number,
        optional: PropTypes.bool
      })
    )
  }),
  selectedTipIndex: PropTypes.number,
  enteredValue: PropTypes.number,
  amount: PropTypes.number,
  err: PropTypes.string
};

ValidatedTip.defaultProps = {
  country: PropTypes.shape({
    tips: PropTypes.arrayOf(
      PropTypes.shape({
        type: null,
        percentage: 0,
        optional: true
      })
    )
  }),
  selectedTipIndex: 0,
  enteredValue: 0,
  amount: 0.0,
  err: null
};

const mapStateToProps = state => {
  return {
    country: state.country,
    enteredValue: state.enteredValue,
    amount: state.amount,
    err: state.err
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSelectedIndex: index => {
      dispatch(setSelectedIndex(index));
    },
    calculateTip: amount => {
      dispatch(calculateTip(amount));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ValidatedTip);
