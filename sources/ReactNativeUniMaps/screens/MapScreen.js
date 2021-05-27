import React, { Component } from 'react';
import { View, Text, Linking } from 'react-native';
import { Button } from 'react-native-elements';
import { MapView } from 'expo';
import Directions from '../components/Directions';

class MapScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.state.params.title
    }
  }

  state = { region: null, calloutIsRendered: false, locationInfo: null };

  componentDidMount(){
    this.setState({ region: this.props.navigation.state.params.initialRegion });
  }

  // renders callout if singleItem 
  renderCallout = () => {
    if (!this.state.calloutIsRendered) {
      this.setState({calloutIsRendered: true});

      if (this.props.navigation.state.params.singleItem) {
        this.refs['marker'].showCallout();
        this.setState({ 
          locationInfo: {
            latitude: this.props.navigation.state.params.places[0].latitude,
            longitude: this.props.navigation.state.params.places[0].longitude,
            name: this.props.navigation.state.params.places[0].name
          }
        });
      }
    }
  }

  handleMarkerPress = event => {
    this.setState({
      locationInfo: {
        latitude: event.nativeEvent.coordinate.latitude,
        longitude: event.nativeEvent.coordinate.longitude,
        name: event.nativeEvent.id
      },
      region: {
        latitude: event.nativeEvent.coordinate.latitude,
        longitude: event.nativeEvent.coordinate.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
    });
  }

  renderDirections = () => {
    if (this.state.locationInfo) {
      return (
        <Directions
          locationInfo={this.state.locationInfo}
        />
      )
    }
  }
  
  render() {
    return (
      <View style={{ flex: 1}}>
        <MapView
          style={{ flex: 1 }}
          region={this.state.region || this.props.navigation.state.params.initialRegion}
          onRegionChangeComplete={this.renderCallout}
          //provider="google"
          showsUserLocation={true}
        >
          {this.props.navigation.state.params.places.map(place => (
            <MapView.Marker
              key={place.name}
              coordinate={{
                latitude: place.latitude,
                longitude: place.longitude
              }}
              title={place.name}
              description={place.description || 'description'}
              identifier={place.name}
              onPress={(event) => this.handleMarkerPress(event)}
              ref={this.props.navigation.state.params.singleItem ? 'marker' : null}
            />
          ))}
        </MapView>

        {this.renderDirections()}
      </View>
    )
  }
}

export default MapScreen;