import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  View,
} from 'react-native';
import {Colors} from '../Assets';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Button = React.memo(
  ({
    disabled,
    onPress,
    Customstyle,
    activeOpacity,
    IconLeftName,
    title,
    BtnTitleStyle,
    IconSize,
    IconColor,
    numberOfLines,
    IconsRightName,
    IconsRightColor,
    IconsRightSize,
    IconsImage,
  }) => {
    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={[styles.buttonStyle, Customstyle]}
        activeOpacity={activeOpacity ? activeOpacity : 0.3}>
        {IconLeftName && (
          <View>
            <Icon color={IconColor} size={IconSize} name={IconLeftName} />
          </View>
        )}
        {IconsImage && <Image source={IconsImage} style={styles.IconImage} />}
        {title && (
          <Text
            style={[styles.buttonTextStyle, BtnTitleStyle]}
            numberOfLines={numberOfLines ? numberOfLines : null}>
            {title}
          </Text>
        )}
        {IconsRightName && (
          <View
            style={{
              alignItems: 'flex-end',
            }}>
            <Icon
              color={IconsRightColor}
              size={IconsRightSize}
              name={IconsRightName}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  buttonStyle: {
    height: 40.3,
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      android: {
        backgroundColor: Colors.MainColor,
      },
      ios: {
        backgroundColor: Colors.White,
      },
    }),
  },
  buttonTextStyle: {
    textAlign: 'center',
    ...Platform.select({
      ios: {
        color: Colors.MainColor,
      },
      android: {
        color: Colors.RelativeMainColor,
      },
    }),
    fontSize: 18,
    padding: 5,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  IconImage: {
    width: 24,
    height: 24,
  },
});
export {Button};
