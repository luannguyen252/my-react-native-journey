import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import colors from '../../colors';

const LoadingView = ({ overlay = false }) => {
  const backgroundColor = (overlay) ? colors.black : colors.transparent;
  const opacity = (overlay) ? 0.5 : 1;

  const { containerStyle } = styles;

  return (
    <View style={[{ backgroundColor, opacity }, containerStyle]}>
      <ActivityIndicator size="large" color={colors.gray} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
});

export { LoadingView };
