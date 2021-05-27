import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Button } from 'react-native-elements';
import ItemList from '../components/ItemList';

class CategoryScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.state.params.title,
      headerRight: (
        <Button 
          title="Map" 
          onPress={() => navigation.navigate({
            routeName: 'map',
            params: { title: navigation.state.params.title, 
                      places: navigation.state.params.places,
                      initialRegion: navigation.state.params.initialRegion } 
          })}
          backgroundColor="rgba(0,0,0,0)"
          color="rgba(0, 122, 255, 1)"
        />
      ),
      headerStyle: {
        marginTop: Platform.OS === 'android' ? 24 : 0
      }
    }
  }

  state = { data: [] }

  componentDidMount() {
    this.setState({ data: this.props.navigation.state.params.places });
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

  render() {
    return (
      <ItemList
        onItemPress={this.onItemPress}
        places={this.props.navigation.state.params.places}
      />
    )
  }
}

export default CategoryScreen;