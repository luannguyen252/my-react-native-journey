import React from 'react';
import {SafeAreaView, StyleSheet, Platform, UIManager} from 'react-native';
import WatcherScreen from './src/Screens/Watcher';

// config animation collapse
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = () => {
  return (
    <SafeAreaView style={styles.MainContainer}>
      <WatcherScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  MainContainer: {flex: 1},
});
export default App;
