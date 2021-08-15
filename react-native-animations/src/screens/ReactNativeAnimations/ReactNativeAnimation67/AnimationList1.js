import React, { useEffect } from 'react';
import { Animated } from 'react-native';
const timeline = new Animated.Value(0);

export default () => {
  useEffect(() => Animated.timing(timeline, { toValue: 1 }).start(), []);

  return (
    <>
      {Array(20).fill().map((_, i) => {
        const translateY = timeline.interpolate({
          inputRange: [0, 1],
          outputRange: [(i * 1) * 500, 0],
        });
        return <Animated.Text style={{ transform: [{ translateY }], backgroundColor: 'red', margin: 5, padding: 5, color: 'white' }}>{i}</Animated.Text>
      })}
    </>
  );
};
