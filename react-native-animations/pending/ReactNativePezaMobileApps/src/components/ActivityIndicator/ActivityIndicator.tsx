import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    zIndex: 1,
  },
});

interface Props {
  visible: boolean;
  opacity?: number;
}

const ActivityIndicator = ({ visible, opacity }: Props) => {
  if (!visible) return null;

  return (
    <View style={[styles.container, { opacity: opacity ? opacity : 0.8 }]}>
      <LottieView
        autoPlay
        loop
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        source={require('../../../assets/loading_dots.json')}
      />
    </View>
  );
};

export default ActivityIndicator;
