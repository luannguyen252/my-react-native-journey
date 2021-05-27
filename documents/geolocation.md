# React Native Geolocation

## Methods of Geolocation

`getCurrentPosition()`

> It invokes the success callback once with latest location information.

`watchPosition()`

> It invokes the success callback whenever the location changes. It returns a `watchId` (number).

`clearWatch()`

> It clears the `watchId` of watchPosition().

`stopObserving()`

> It stops observing for device location changes as well as it removes all listeners previously registered.

`setRNConfiguration()`

> It sets the configuration options, which is used in all location requests.

`requestAuthorization()`

> It requests suitable Location permission based on the key configured on pList.

## React Native Geolocation Example 1

```javascript
import React from "react";
import { StyleSheet, Platform, Text, View } from "react-native";

export default class GeolocationExample1 extends React.Component {
  constructor() {
    super();
    this.state = {
      ready: false,
      where: { lat: null, lng: null },
      error: null,
    };
  }

  componentDidMount() {
    let geoOptions = {
      enableHighAccuracy: false,
      timeOut: 20000, //20 second
      //  maximumAge: 1000 //1 second
    };
    this.setState({ ready: false, error: null });
    navigator.geolocation.getCurrentPosition(
      this.geoSuccess,
      this.geoFailure,
      geoOptions
    );
  }

  geoSuccess = (position) => {
    console.log(position.coords.latitude);

    this.setState({
      ready: true,
      where: { lat: position.coords.latitude, lng: position.coords.longitude },
    });
  };

  geoFailure = (err) => {
    this.setState({ error: err.message });
  };

  render() {
    return (
      <View style={styles.container}>
        {!this.state.ready && (
          <Text style={styles.big}>Using Geolocation in React Native.</Text>
        )}
        {this.state.error && (
          <Text style={styles.big}>Error: {this.state.error}</Text>
        )}
        {this.state.ready && (
          <Text style={styles.big}>
            Latitude: {this.state.where.lat}
            Longitude: {this.state.where.lng}
          </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  big: {
    fontSize: 25,
  },
});
```

## React Native Geolocation Example 2

```javascript
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
  Button,
} from "react-native";
import Geolocation from "@react-native-community/geolocation";

const GeolocationExample2 = () => {
  const [currentLongitude, setCurrentLongitude] = useState("...");
  const [currentLatitude, setCurrentLatitude] = useState("...");
  const [locationStatus, setLocationStatus] = useState("");

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === "ios") {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Location Access Required",
              message: "This App needs to Access your location",
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus("Permission Denied");
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus("Getting Location ...");
    Geolocation.getCurrentPosition(
      // Will give you the current location
      (position) => {
        setLocationStatus("You are Here");
        const currentLongitude = JSON.stringify(position.coords.longitude);
        // getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        // Getting the Latitude from the location json
        setCurrentLongitude(currentLongitude);
        // Setting state Longitude to re re-render the Longitude Text
        setCurrentLatitude(currentLatitude);
        // Setting state Latitude to re re-render the Longitude Text
      },
      (error) => {
        setLocationStatus(error.message);
      },
      { enableHighAccuracy: false, timeout: 30000, maximumAge: 1000 }
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        setLocationStatus("You are Here");
        // Will give you the location on location change
        console.log(position);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        // Getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        // Getting the Latitude from the location json
        setCurrentLongitude(currentLongitude);
        // Setting state Longitude to re re-render the Longitude Text
        setCurrentLatitude(currentLatitude);
        // Setting state Latitude to re re-render the Longitude Text
      },
      (error) => {
        setLocationStatus(error.message);
      },
      { enableHighAccuracy: false, maximumAge: 1000 }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.container}>
          <Image
            source={{
              uri:
                "https://raw.githubusercontent.com/AboutReact/sampleresource/master/location.png",
            }}
            style={{ width: 100, height: 100 }}
          />
          <Text style={styles.boldText}>{locationStatus}</Text>
          <Text
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 16,
            }}
          >
            Longitude: {currentLongitude}
          </Text>
          <Text
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 16,
            }}
          >
            Latitude: {currentLatitude}
          </Text>
          <View style={{ marginTop: 20 }}>
            <Button title="Button" onPress={getOneTimeLocation} />
          </View>
        </View>
        <Text style={{ fontSize: 18, textAlign: "center", color: "grey" }}>
          React Native Geolocation
        </Text>
        <Text style={{ fontSize: 16, textAlign: "center", color: "grey" }}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  boldText: {
    fontSize: 25,
    color: "red",
    marginVertical: 16,
  },
});

export default GeolocationExample2;
```

## Calculate Distance between two Locations

```javascript
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from "react-native";

/*
 * 1. getDistance, Calculates the distance between two geo coordinates.
 * 2. getPreciseDistance, Calculates the distance between two geo coordinates.
 *    This method is more accurate then getDistance, especially for long distances
 *    but it is also slower. It is using the Vincenty inverse formula for ellipsoids.
 */
import { getDistance, getPreciseDistance } from "geolib";

const GeolocationExample3 = () => {
  const calculateDistance = () => {
    var dis = getDistance(
      { latitude: 20.0504188, longitude: 64.4139099 },
      { latitude: 51.528308, longitude: -0.3817765 }
    );
    alert(`Distance\n\n${dis} Meter\nOR\n${dis / 1000} KM`);
  };

  const calculatePreciseDistance = () => {
    var pdis = getPreciseDistance(
      { latitude: 20.0504188, longitude: 64.4139099 },
      { latitude: 51.528308, longitude: -0.3817765 }
    );
    alert(`Precise Distance\n\n${pdis} Meter\nOR\n${pdis / 1000} KM`);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.header}>
            Example to Calculate Distance Between Two Locations
          </Text>
          <Text style={styles.textStyle}>
            Distance between
            {"\n"}
            India(20.0504188, 64.4139099) and UK (51.528308, -0.3817765)
          </Text>
          <TouchableHighlight
            style={styles.buttonStyle}
            onPress={calculateDistance}
          >
            <Text>Get Distance</Text>
          </TouchableHighlight>
          <Text style={styles.textStyle}>
            Precise Distance between
            {"\n"}
            India(20.0504188, 64.4139099) and UK (51.528308, -0.3817765)
          </Text>
          <TouchableHighlight
            style={styles.buttonStyle}
            onPress={calculatePreciseDistance}
          >
            <Text>Get Precise Distance</Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    justifyContent: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "600",
    color: "black",
    textAlign: "center",
    paddingVertical: 20,
  },
  textStyle: {
    marginTop: 30,
    fontSize: 16,
    textAlign: "center",
    color: "black",
    paddingVertical: 20,
  },
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    backgroundColor: "#dddddd",
    margin: 10,
  },
});

export default GeolocationExample3;
```
