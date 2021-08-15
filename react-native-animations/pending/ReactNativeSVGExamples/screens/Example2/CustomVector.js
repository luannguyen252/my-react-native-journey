import React from 'react';
import Svg, { LinearGradient, Stop, Rect } from 'react-native-svg';

const CustomVector = () => {
  return (
    <Svg width="120" height="120" viewBox="0 0 120 120">
      <LinearGradient id="Gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="120" y2="0">
        <Stop offset="0" stopColor="red" stopOpacity="0.5" />
        <Stop offset="0.5" stopColor="green" stopOpacity="0.2" />
        <Stop offset="1" stopColor="blue" stopOpacity="0.5" />
      </LinearGradient>
      <Rect x="0" y="0" width="120" height="120" fill="url(#Gradient)" />
    </Svg>
  );
};

export default CustomVector;
