import React, { useState } from 'react';
import {
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

import theme, { Box } from '../Theme';

interface TextInputProps extends RNTextInputProps {
  icon: string;
  error?: string;
  touched?: boolean;
}
const SIZE = theme.borderRadii.m * 2;

const TextInput = ({ icon, touched, error, ...props }: TextInputProps) => {
  const reColor = !touched ? 'text' : error ? 'danger' : 'primary';
  const color = theme.colors[reColor];

  return (
    <Box
      flexDirection="row"
      height={48}
      alignItems="center"
      borderRadius="s"
      borderWidth={StyleSheet.hairlineWidth}
      borderColor={reColor}
      padding="s"
    >
      <Box padding="s">
        <Icon name={icon} size={16} {...{ color }} />
      </Box>
      <Box flex={1}>
        <RNTextInput
          underlineColorAndroid="transparent"
          placeholderTextColor={color}
          {...props}
        />
      </Box>
      {touched && (
        <Box
          alignItems="center"
          justifyContent="center"
          height={SIZE}
          width={SIZE}
          borderRadius="m"
          backgroundColor={!error ? 'primary' : 'danger'}
        >
          <Icon name={!error ? 'check' : 'x'} color="white" size={15} />
        </Box>
      )}
    </Box>
  );
};

export default TextInput;
