import Geolocation from '@react-native-community/geolocation';
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

Geolocation.setRNConfiguration({skipPermissionRequests: true});

const App = () => {
  const [permissionStatus, setPermissionStatus] = React.useState(null);

  const [region, setRegion] = React.useState({
    latitude: 37.78825,
    latitudeDelta: 0.0922,
    longitude: -122.4324,
    longitudeDelta: 0.0421,
  });

  React.useEffect(() => {
    if (permissionStatus === null) {
      // initial check
      check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(setPermissionStatus);
    }

    if (permissionStatus === RESULTS.GRANTED) {
      Geolocation.watchPosition(({coords}) =>
        setRegion(prevRegion => ({
          ...prevRegion,
          latitude: coords.latitude,
          longitude: coords.longitude,
        })),
      );
    }

    return () => {
      Geolocation.stopObserving();
    };
  }, [permissionStatus]);

  return (
    <>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView style={{flex: 1, padding: 16}}>
        <View style={{padding: 16, paddingBottom: 0}}>
          <Text>
            Permission status:{' '}
            {permissionStatus != null && (
              <Text style={{fontWeight: '700'}}>{permissionStatus}</Text>
            )}
          </Text>

          <TouchableOpacity
            style={{paddingVertical: 16}}
            onPress={() => {
              request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(
                setPermissionStatus,
              );
            }}>
            <Text>👉 Ask permission</Text>
          </TouchableOpacity>
        </View>

        <MapView
          style={{flex: 1}}
          region={region}
          showsUserLocation={true}
          followsUserLocation={true}>
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
          />
        </MapView>
      </SafeAreaView>
    </>
  );
};

export default App;
