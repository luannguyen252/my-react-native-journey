import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { human, systemWeights } from 'react-native-typography';

export default function Meta({ caption, username = 'Bobby B' }) {
  return (
    <View style={styles.root}>
      <View style={styles.wrapper}>
        <Text style={styles.text}>
          Liked by <Text style={systemWeights.regular}>Jon Snow</Text> and{' '}
          <Text style={systemWeights.regular}>577 others</Text>
        </Text>
      </View>
      <View style={styles.wrapper}>
        <Text numberOfLines={2} style={styles.text}>
          <Text style={systemWeights.regular}>{username}</Text> {caption}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 16,
    minHeight: 50
  },
  wrapper: {
    flex: 1
  },
  text: {
    ...human.footnoteObject,
    ...systemWeights.light
  }
});
