import React, { Component } from "react";
import { Platform } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";
import { connect } from "react-redux";
import { deleteGuitar } from "../../actions";
import colors from "../../colors";
import NotifService from "../../NotifService";
import Dialog from "react-native-dialog";
import PropTypes from "prop-types";
import strings from "../../strings";

const iconColor = Platform.OS === "ios" ? colors.primary : colors.white;

function getGuitar(props) {
  return props.guitars.find(x => x.key === props.selectedForEditing).name;
}

/**
 * This options menu only has one option: delete
 */
class Delete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warningPopup: false
    };
    this.notif = new NotifService();
  }

  guitarName = getGuitar(this.props);

  warningString = () => {
    return `${strings.sureWantToDelete} ${this.guitarName}?`;
  };

  render() {
    return (
      <Menu>
        <MenuTrigger>
          <Icon
            color={iconColor}
            name="options-vertical"
            size={20}
            style={{ margin: 10 }}
          />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption
            style={{ padding: 15 }}
            onSelect={() => {
              //show warning
              this.setState({ warningPopup: true });
            }}
            text={strings.delete}
          />
        </MenuOptions>
        <Dialog.Container visible={this.state.warningPopup}>
          <Dialog.Title>{strings.warning}</Dialog.Title>
          <Dialog.Description>{this.warningString()}</Dialog.Description>
          <Dialog.Button
            label={strings.yes}
            onPress={() => {
              //delete guitar, cancel related notification, navigate home
              this.setState({ warningPopup: false });
              this.props.deleteGuitar(this.props.selectedForEditing);
              this.notif.cancelNotif(this.props.selectedForEditing);
              this.props.navigation.navigate("Home");
            }}
            color={"#f00"}
          />
          <Dialog.Button
            label={strings.no}
            onPress={() => {
              this.setState({ warningPopup: false });
            }}
            color={colors.primary}
          />
        </Dialog.Container>
      </Menu>
    );
  }
}

Delete.propTypes = {
  selectedForEditing: PropTypes.string.isRequired,
  guitars: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    selectedForEditing: state.selectedForEditing,
    guitars: state.guitars
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteGuitar: guitar => {
      dispatch(deleteGuitar(guitar));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Delete);
