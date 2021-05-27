import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Platform, FlatList, ScrollView } from 'react-native';
import { updateProgress } from '../actions';
import { secondaryColor } from '../styles/common';
import Toast from 'react-native-easy-toast';

import Activity from '../components/Activity';
import BadgeProgress from '../components/BadgeProgress';

class BadgeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.state.params.title,
      headerStyle: {
        marginTop: Platform.OS === 'android' ? 24 : 0
      }
    }
  }

  /**
   * this.props.updateProgress takes two parameters:
   * 1. the id of the completed activity
   * 2. the callback function to be called after the action
   *    successfully dispatches to the Badges reducer
   */
  onPress = activity => {
    this.props.updateProgress(activity.id, () => {
      this.refs.toast.show(activity.details.title + ' Complete!');
    });
  }

  renderActivity = ({ item }) => {
    return (
      <Activity
        activity={item}
        onPress={this.onPress}
      />
    )
  }

  render() {
    const badge = this.props.badges[this.props.currentBadge];
    const activities = badge.relationships.recommendations;
    
    return (
      <View>
        <ScrollView>
          <BadgeProgress progress={badge.details.progress} />
          <FlatList
            data={activities}
            keyExtractor={item => item.id}
            renderItem={this.renderActivity}
          />
        </ScrollView>
        <Toast 
          ref="toast"
          style={{ backgroundColor: secondaryColor }}
        />
      </View>
    )
  }
}

function mapStateToProps({ badges, currentBadge }) {
  return { badges, currentBadge };
}

export default connect(mapStateToProps, { updateProgress })(BadgeScreen);