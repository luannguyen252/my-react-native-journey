import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import colors from '../../colors';
import fonts from '../../fonts';

const NoContentView = ({ image, title }) => {
  const {
    containerStyle,
    imageStyle,
    textStyle
  } = styles;

  return (
    <View style={containerStyle}>
      <Image style={imageStyle} source={image} />
      <Text style={textStyle}>{title}</Text>
    </View>
  );
};

const margin = 14;
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin
  },
  imageStyle: {
    height: 200,
    width: 200,
    margin
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 25,
    fontFamily: fonts.bold,
    color: colors.grayLight,
    margin
  }
});

export { NoContentView };
