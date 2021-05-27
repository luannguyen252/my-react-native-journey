import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import colors from '../../colors';
import fonts from '../../fonts';

const SocialButton = ({ style, color, icon, title, onPress }) => {
  const {
    containerStyle,
    textStyle,
    imageViewStyle,
    imageStyle
  } = styles;

  return (
    <TouchableOpacity
        style={[{ backgroundColor: color }, containerStyle, style]}
        onPress={onPress}
    >
      <View style={imageViewStyle}>
        <Image style={imageStyle} source={icon} />
      </View>

      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    margin: 14,
    height: 50
  },
  textStyle: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.white,
    marginRight: 30
  },
  imageViewStyle: {
    backgroundColor: colors.white,
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 30,
  },
  imageStyle: {
    height: 30,
    width: 30,
    margin: 5
  }
});

export { SocialButton };
