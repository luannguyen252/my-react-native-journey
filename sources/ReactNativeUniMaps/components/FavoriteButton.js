import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Icon } from 'react-native-elements';

class FavoriteButton extends Component {

  onPress = async item => {
    if (!this.props.favorites.has(item.id)) {
      await this.props.addFavorite(item.id);
    } else {
      await this.props.removeFavorite(item.id);
    }
  }

  render() {
    return ( 
      <Icon 
        name={this.props.favorites.has(this.props.item.id) ? 'star' : 'star-o'}
        onPress={() => this.onPress(this.props.item)}
        type='font-awesome' 
        color={this.props.favorites.has(this.props.item.id) ? '#CEB733' : 'lightgray'}
        containerStyle={{ paddingRight: 5 }}
      />
    )
  }
}

function mapStateToProps({ favorites }) {
  return { favorites };
}

export default connect(mapStateToProps, actions)(FavoriteButton);