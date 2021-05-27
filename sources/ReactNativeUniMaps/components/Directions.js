import React, { Component } from 'react';
import { 
  View, 
  Text, 
  Linking,
  Dimensions,
  StyleSheet
} from 'react-native';
import { Header } from 'react-navigation';
import { Button } from 'react-native-elements';
import BottomDrawer from 'rn-bottom-drawer';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const CONTAINER_HEIGHT = SCREEN_HEIGHT / 5.5;
const TAB_BAR_HEIGHT = 49;

class Directions extends Component{
  renderContent = () => {
    const { name, latitude, longitude } = this.props.locationInfo;
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.text}>Get directions to {name}</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Google Maps"
            onPress={() => Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${latitude}%2C${longitude}`)}
          />
          <Button
            title="Apple Maps"
            onPress={() => Linking.openURL(`http://maps.apple.com/?daddr=${latitude}%2C${longitude}`)}
          />
        </View>
      </View>
    )
  }

  render() {
    return (
      <BottomDrawer
        containerHeight={CONTAINER_HEIGHT}
        offset={TAB_BAR_HEIGHT + Header.HEIGHT}
      >
        {this.renderContent()}
      </BottomDrawer>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  text: {
    paddingHorizontal: 5
  }
});

export default Directions;