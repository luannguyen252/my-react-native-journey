import React from 'react';
import { SCHOOL_SELECT, INFO } from './modals/constants';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../actions'; 
import { View } from 'react-native';
import { Icon } from 'react-native-elements'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import InfoModal from './modals/InfoModal';
import SchoolSelectModal from './modals/SchoolSelectModal';
 
class HomeMenu extends React.Component {
  _menu = null;

  state = { modal: null }

  openModal = () => {
    if (this.state.modal) {
      this.props.openModal(this.state.modal);
      this.setState({ modal: null });
    }
  }

  prepareModal = modal => {
    this.setState({ modal });
    this.hideMenu();
  }

  setMenuRef = ref => {
    this._menu = ref;
  };
 
  hideMenu = () => {
    this._menu.hide();
  };
 
  showMenu = () => {
    this._menu.show();
  };
 
  render() {
    return (
      <View style={{ paddingRight: 20 }}>
        <Menu
          ref={this.setMenuRef}
          button={
            <Icon 
              name='menu' 
              type='simple-line-icon'
              color='gray'
              size={22}
              onPress={this.showMenu}
            />
          }
          onHidden={() => this.openModal()} // need this callback for animation to work
          style={{ marginTop: 25 }}
        >
          <MenuItem onPress={() => this.prepareModal(SCHOOL_SELECT)}>Change School</MenuItem>
          <MenuDivider />
          <MenuItem onPress={() => this.prepareModal(INFO)}>Info</MenuItem>
        </Menu>

        <InfoModal />
        <SchoolSelectModal />
      </View>
    );
  }
}
 
export default connect(null, { openModal, closeModal })(HomeMenu);