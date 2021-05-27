import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';


const ImageButton = ({ style, size, source, onPress }) => {
  const {
    containerStyle,
    imageStyle
  } = styles;

  return (
    <TouchableOpacity style={[containerStyle, style]} onPress={onPress}>
      <Image style={[{ width: size, height: size }, imageStyle]} source={source} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerStyle: {

  },
  imageStyle: {
    margin: 5
  }
});

export { ImageButton };
