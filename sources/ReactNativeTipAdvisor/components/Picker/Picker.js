import React, { Component } from "react";
import { connect } from "react-redux";
import { changeCountry, calculateTip } from "../../actions";
import { countries } from "../../countryList";
import ModalSelector from "react-native-modal-selector";
import styles from "./styles";
import PropTypes from "prop-types";

class CountryPicker extends Component {
  //country was changed
  handleChange = event => {
    this.props.changeCountry(event);
  };

  render() {
    //prepare the list of countries to be displayed in the modal selector
    const pickerItems = countries.map((val, i) => {
      return { key: i, label: String(val.name) };
    });

    return (
      <ModalSelector
        data={pickerItems}
        initValue={this.props.country.name}
        onChange={value => this.handleChange(value.label)}
        style={styles.style}
        selectStyle={styles.selectStyle}
        selectTextStyle={styles.selectTextStyle}
        optionTextStyle={styles.optionTextStyle}
      />
    );
  }
}

CountryPicker.propTypes = {
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

CountryPicker.defaultProps = {
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
    changeCountry: country => {
      dispatch(changeCountry(country));
    },
    calculateTip: amount => {
      dispatch(calculateTip(amount));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountryPicker);
