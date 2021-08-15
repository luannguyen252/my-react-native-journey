import React, { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { Box, theme, Text } from '..';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: 'white',
    zIndex: 1,
  },
  buttonContainer: {
    padding: wp(1),
  },
});

interface Props {
  bgColor?: 'primary' | 'secondary' | 'white';
  color?: 'light';
  transparent?: boolean;
  onPressBack: () => void;
  option1?: ReactNode;
  onPressOption1?: () => void;
  title?: string;
  padding?: boolean;
}
const StackHeader = ({
  bgColor,
  color,
  onPressBack,
  option1,
  onPressOption1,
  title,
  transparent,
  padding,
}: Props) => {
  return (
    <Box
      style={[
        styles.container,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        {
          backgroundColor: transparent ? undefined : theme.colors[bgColor!],
          paddingHorizontal: padding ? theme.constants.screenPadding / 2 : 0,
          paddingTop: padding ? theme.constants.screenPadding : 0,
        },
      ]}>
      <TouchableOpacity onPress={onPressBack} style={styles.buttonContainer}>
        <Icon
          name="arrow-left"
          color={bgColor === 'primary' ? theme.colors.secondary : theme.colors.dark}
          size={22}
        />
      </TouchableOpacity>
      {title && (
        <Text
          style={{ marginLeft: -30 }}
          variant="h1"
          color={bgColor === 'primary' ? 'white' : 'dark'}>
          {title}
        </Text>
      )}
      <TouchableOpacity onPress={onPressOption1} style={styles.buttonContainer}>
        {option1}
      </TouchableOpacity>
    </Box>
  );
};

export default StackHeader;
