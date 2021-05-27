import React, { Component } from "react";
import { View, Text, Switch } from "react-native";
import { connect } from "react-redux";
import { showNotifications } from "../../actions";
import styles from "./styles";
import PropTypes from "prop-types";
import strings from "../../strings";

/**
 * settings screen only has option to enable/disable notifications
 */
class Settings extends Component {
  onSwitchChanged = () => {
    this.props.showNotifications(!this.props.notifications);
  };

  render() {
    return (
      <View style={styles.parent}>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>
            {strings.remindWhenGuitarNeedsStrings}
          </Text>
        </View>
        <View style={styles.switchWrapper}>
          <Switch
            style={styles.switch}
            value={this.props.notifications}
            onValueChange={() => this.onSwitchChanged()}
          />
        </View>
      </View>
    );
  }
}

Settings.propTypes = {
  notifications: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    notifications: state.notifications
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showNotifications: show => {
      dispatch(showNotifications(show));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
