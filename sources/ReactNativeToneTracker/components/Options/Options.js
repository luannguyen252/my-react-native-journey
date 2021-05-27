import React, { Component } from "react";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import email from "react-native-email";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";
import Share from "react-native-share";
import colors from "../../colors";
import { connect } from "react-redux";
import { toggleNightShade } from "../../actions";
import strings from "../../strings";

//developer email
const EMAIL = "violenthoboenterprises@gmail.com";

//link to store listing
const shareOptions = {
  url:
    "https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1464663060&mt=8"
};

class Options extends Component {
  //open email app and populate 'to' field with developer email
  handleEmail = () => {
    email(EMAIL, { subject: strings.emailSubject }).catch(err =>
      console.error("An error occured", err)
    );
  };

  render() {
    return (
      <Menu>
        <MenuTrigger>
          <Icon
            name="options-vertical"
            color={colors.primary}
            size={20}
            style={{ margin: 10 }}
          />
        </MenuTrigger>
        <MenuOptions>
          {/* <MenuOption
            style={{ padding: 12 }}
            //change theme
            onSelect={() => {
              this.props.toggleNightShade();
            }}
            text="Nightshade: off"
          /> */}
          <MenuOption
            style={{ padding: 12 }}
            //share this app
            onSelect={() => Share.open(shareOptions)}
            text={strings.share}
          />
          <MenuOption
            style={{ padding: 12 }}
            onSelect={() => this.handleEmail()}
            text={strings.contact}
          />
          <MenuOption
            style={{ padding: 12 }}
            onSelect={() => this.props.navigation.navigate(`Settings`)}
            text={strings.settings}
          />
          <MenuOption
            style={{ padding: 12 }}
            onSelect={() => this.props.navigation.navigate(`PrivacyPolicy`)}
            text={strings.privacyPolicyTitle}
          />
        </MenuOptions>
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  return {
    nightShade: state.nightShade
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleNightShade: () => {
      dispatch(toggleNightShade());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Options);
