import React from 'react';
import { StyleSheet, TextInput as Input, TextInputProps } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { Box, theme } from '..';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: hp(7),
    backgroundColor: theme.colors.white,
    borderRadius: wp(4),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: wp(5),
  },
  placeholder: {
    fontFamily: 'SofiaPro-Regular',
    fontSize: wp(3.5),
    width: '95%',
    height: '100%',
  },
});

interface Props extends TextInputProps {
  width?: string;
  onFocus?: () => void;
}
const SearchInput = ({ placeholder, onFocus }: Props) => {
  return (
    <Box style={styles.container}>
      <Icon name="search" color={theme.colors.lightGrey} size={wp(6)} />
      <Box style={{ width: wp(3) }} />
      <Input
        placeholder={placeholder}
        style={styles.placeholder}
        placeholderTextColor={theme.colors.text}
        onFocus={onFocus}
      />
    </Box>
  );
};

export default SearchInput;
