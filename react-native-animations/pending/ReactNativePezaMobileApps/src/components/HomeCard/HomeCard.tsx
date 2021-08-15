import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { View } from 'moti';

import { Box, Text, theme } from '..';
import { CardActiveDots } from '../../svg/homeIcons';

const styles = StyleSheet.create({
  container: {
    borderRadius: wp(4),
    padding: wp(4),
    justifyContent: 'space-between',
  },
  animationContainer: {
    padding: 10,
    // backgroundColor: 'red',
  },
});

interface Props {
  width?: number;
  height?: number;
  icon: ReactNode;
  info?: string;
  label: string;
  active: boolean;
}
const HomeCard = ({ width, icon, info, label, active, height }: Props) => {
  return (
    <View
      from={{ scale: 1 }}
      animate={{ scale: active ? 1.1 : 1 }}
      style={styles.animationContainer}>
      <Box
        style={[
          styles.container,
          {
            width: width ? width : 144,
            height: height ? height : 147,
            backgroundColor: active ? theme.colors.primary : theme.colors.white,
          },
        ]}>
        {active && (
          <View from={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <CardActiveDots />
          </View>
        )}
        {icon}
        {info && active && (
          <Text variant="h2" color="yellow">
            {info}
          </Text>
        )}
        <Text variant="b1" color={active ? 'lightGrey' : 'dark'}>
          {label}
        </Text>
      </Box>
    </View>
  );
};

export default HomeCard;
