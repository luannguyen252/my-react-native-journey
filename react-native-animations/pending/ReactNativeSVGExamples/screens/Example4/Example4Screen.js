import React from 'react';
import { ScrollView, StyleSheet, Image } from 'react-native';

const Example4Screen = () => {
  return (
    <ScrollView>
      <Image source={require('./040-file-picture.svg')} style={styles.icon} />
      <Image source={require('./filter-example.svg')} />
      <Image source={require('./homer-simpson.svg')} style={styles.homer} />
      <Image source={require('./graphic-mesh-network.svg')} style={styles.mesh} />
      <Image source={require('./tiger.svg')} style={styles.mesh} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    tintColor: '#ff0000',
    height: 64,
    width: 64,
  },
  homer: {
    height: 300,
    width: 300,
  },
  mesh: {
    height: 300,
    width: 300,
  },
});

export default Example4Screen;
