import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const Link = ({ onPress, label }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {},
  text: {
    fontSize: 32,
    color: '#0055dd',
  },
});

export default Link;
