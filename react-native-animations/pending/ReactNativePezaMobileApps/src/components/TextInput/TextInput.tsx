import React, { useState } from 'react';
import {
  View,
  TextInputProps,
  TextInput as RNTextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { theme } from '../../components';

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    paddingLeft: wp('5%'),
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: theme.constants.screenWidth - wp(15),
    height: '95%',
    color: theme.colors.text,
  },
  errorMessage: {
    position: 'absolute',
    bottom: 5,
    right: 10,
    fontFamily: 'SofiaPro-Medium',
    fontSize: 12,
    color: theme.colors.red,
  },
  eye: {
    zIndex: 1,
  },
});

interface Props extends TextInputProps {
  error?: string;
  touched?: boolean;
  width?: number;
  height?: number;
  secured?: boolean;
  bgColor?: string;
  multiline?: boolean;
}

const TextInput = ({
  error,
  touched,
  width,
  height,
  secured,
  bgColor,
  multiline,
  ...props
}: Props) => {
  const [visible, setVisible] = useState<boolean>(false);

  const reBorderColor = !touched ? 'white' : error ? 'red' : 'green';
  const reColor = !touched ? 'text' : error ? 'red' : 'green';
  const borderColor = theme.colors[reBorderColor];
  const color = theme.colors[reColor];
  const widthValue = width ? width : theme.constants.screenWidth;
  const heightValue = height ? height : 56;

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: borderColor,
          width: widthValue,
          height: heightValue,
          backgroundColor: bgColor ? bgColor : theme.colors.white,
        },
      ]}>
      <RNTextInput
        style={[
          styles.input,
          {
            backgroundColor: bgColor ? bgColor : theme.colors.white,
          },
        ]}
        underlineColorAndroid="transparent"
        placeholderTextColor={color}
        secureTextEntry={secured ? !visible : false}
        multiline={multiline}
        {...props}
      />
      {error && touched && <Text style={styles.errorMessage}>{error}</Text>}
      {secured && (
        <TouchableOpacity style={styles.eye} onPress={() => setVisible(!visible)}>
          {visible ? (
            <Icon name="eye-off" size={20} color={theme.colors.lightGrey} />
          ) : (
            <Icon name="eye" size={20} color={theme.colors.lightGrey} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TextInput;
