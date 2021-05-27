import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Platform } from 'react-native';
import { fetchBadges, setIndex } from '../actions';

import Badge from '../components/Badge';

class HomeScreen extends Component {
  static navigationOptions = () => {
    return {
      headerTitle: 'Badges',
      headerStyle: {
        marginTop: Platform.OS === 'android' ? 24 : 0
      },
      headerBackTitle: 'Back'
    }
  }

  async componentDidMount() {
    this.props.fetchBadges();
  }

  shortenName = badge => {
    const { title } = badge.details;
    const lastIndex = title.lastIndexOf(' ');
    return title.substring(0, lastIndex);
  }

  onPress = (badge, index) => {
    // set current badge index to the index of the 
    // badge that has just been clicked
    this.props.setIndex(index);

    this.props.navigation.navigate({
      routeName: 'badge',
      params: {
        title: this.shortenName(badge)
      }
    });
  }

  renderBadge = ({ item, index }) => {
    return (
      <Badge 
        badge={item} 
        onPress={this.onPress} 
        index={index}
      />
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.props.badges}  
          keyExtractor={badge => badge.id}
          renderItem={this.renderBadge}
        />
      </View>
    );
  }
}

function mapStateToProps({ badges }) {
  return { badges };
}

export default connect(mapStateToProps, { fetchBadges, setIndex })(HomeScreen);
