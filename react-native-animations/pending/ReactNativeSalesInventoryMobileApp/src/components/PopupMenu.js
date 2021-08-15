import React, { Component } from 'react'
import { View, UIManager, findNodeHandle, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class PopupMenu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      icon: null,
      ICON_SIZE: 30
    }
  }

  onError() {
    console.log('Popup Error')
  }

  onPress = () => {
    if (this.state.icon) {
      UIManager.showPopupMenu(
        findNodeHandle(this.state.icon),
        this.props.actions,
        this.onError,
        this.props.onPress
      )
    }
  }


  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.onPress}>
          <Icon
            name="more-vert"
            size={this.state.ICON_SIZE}
            color={'#fff'}
            ref={this.onRef}
          />
        </TouchableOpacity>
      </View>
    )
  }

  onRef = icon => {
    if (!this.state.icon) {
      this.setState({ icon })
    }
  }
}
