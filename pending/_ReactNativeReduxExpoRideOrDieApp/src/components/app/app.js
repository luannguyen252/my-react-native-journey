import { StyleSheet, Text, View } from 'react-native';

import React from 'react';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
});

export const App = () => {
  return (
    <View style={styles.container}>
      <Text>Open up app.js to start working on your app!</Text>
    </View>
  );
};
