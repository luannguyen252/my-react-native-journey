import React from 'react';
import { View, StyleSheet } from 'react-native';
import Link from '../../components/Link';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Link onPress={() => navigation.navigate('Example1')} label="Example 1" />
      <Link onPress={() => navigation.navigate('Example2')} label="Example 2" />
      <Link onPress={() => navigation.navigate('Example3')} label="Example 3" />
      <Link onPress={() => navigation.navigate('Example4')} label="Example 4" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.4,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default HomeScreen;
