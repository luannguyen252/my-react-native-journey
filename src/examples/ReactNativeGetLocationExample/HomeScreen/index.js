import React, { useState } from 'react';

import {
  View,
  Button,
  Text,
  Alert,
  Dimensions,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import Styles from './styles';

import Geolocation from 'react-native-geolocation-service';

import Geocoder from 'react-native-geocoder';

const HomeScreen = props => {
  let [Location, setLocation] = useState('Not Detected yet ');

  const { height, width } = Dimensions.get('window');

  const GetLocation = async () => {
    let perm = await requestLocationPermission();
    if (perm) {
      await Geolocation.getCurrentPosition(
        position => {
          var NY = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          Geocoder.geocodePosition(NY)
            .then(res => {
              setLocation(
                '*Address*: ' +
                  res[0].formattedAddress +
                  '\n \n' +
                  '*Your Country is*: ' +
                  res[0].country +
                  '\n \n' +
                  '*position latitude * : ' +
                  position.coords.latitude +
                  '\n*position longitude*: ' +
                  position.coords.longitude,
              );
            })
            .catch(err => console.log(err));
        },
        error => {
          Alert.alert(
            'Error',
            'something went wrong try again',
            [
              {
                text: 'ok',
                onPress: () => {
                  console.log('Cancel Pressed');
                },
              },
            ],
            { cancelable: false },
          );
          console.log(error.code, error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 30000,
          maximumAge: 2000,
        },
      );
    } else {
      Alert.alert(
        'sorry this app needs your location permission to work correctly',
      );
    }
  };

  async function requestLocationPermission() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'location Permission',
            message: ' App needs access to your location ',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        console.log(granted);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else {
          Alert.alert('location permission denied');
          return false;
        }
      } catch (err) {
        Alert.alert(
          'something went wrong in access your location please try again',
        );
        return false;
      }
    } else {
      return true;
    }
  }

  return (
    <View style={Styles.Contianer}>
      <View style={Styles.btn_Get_loca}>
        <Button title="Get My Location" onPress={GetLocation} />
      </View>
      <Text style={Styles.txt_info}>{Location}</Text>
    </View>
  );
};

export default HomeScreen;
