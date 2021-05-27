import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { Bar } from 'react-native-progress';
import { progressBar } from '../styles/common';

// ex: 0.12345678 = 12.34
const calculatePercent = decimal => {
  return (100 * parseFloat(decimal)).toFixed(2);
}

const BadgeProgress = ({ progress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Badge Progress: {calculatePercent(progress)}%
      </Text>
      <Bar 
        progress={progress}
        color={progressBar.color}
        height={progressBar.height}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center',
    marginBottom: 15
  },
  text: {
    fontSize: 16, 
    marginVertical: 10
  }
});

BadgeProgress.propTypes = {
  progress: PropTypes.number,
}

export default BadgeProgress