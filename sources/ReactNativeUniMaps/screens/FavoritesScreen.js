import React, { Component } from 'react';
import _ from 'lodash';
import { Platform, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ItemList from '../components/ItemList';

class FavoritesScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Favorites',
      headerBackTitle: 'Back',
      headerStyle: {
        marginTop: Platform.OS === 'android' ? 24 : 0
      }
    }
  }

  onItemPress = place => {
    const initialRegion = {
      latitude: place.latitude,
      longitude: place.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    
    this.props.navigation.navigate({
      routeName: 'map',
      params: { title: place.name, places: [place], initialRegion, singleItem: true } 
    })
  }

  loadFavorites = () => {
    const favorites = [];
    for (const [key, value] of this.props.favorites) {
      const favorite = this.props.schoolInfo.places.find(place => place.id === key);
      if (favorite) { favorites.unshift(favorite); }
    };

    if (favorites.length === 0) {
      return (
        <Text style={styles.text}>No Favorites Yet</Text>
      );
    } else {
      return (
        <ItemList
          onItemPress={this.onItemPress}
          places={favorites}
        />
      );
    }
  }

  render() {
    return (
      this.loadFavorites()
    )
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    paddingTop: 40,
    fontSize: 18
  }
});

function mapStateToProps({ favorites, data }) {
  return { favorites, schoolInfo: data.schoolInfo };
}

export default connect(mapStateToProps)(FavoritesScreen);