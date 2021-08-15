import React from 'react';
import { StyleSheet } from 'react-native';
import { State } from 'react-native-gesture-handler';
import Animated, { eq } from 'react-native-reanimated';
import { ReText } from 'react-native-redash/lib/module/v1';

import { Box, theme, Text } from '..';

export const KNOB_SIZE = 30;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  icon: {
    width: KNOB_SIZE,
    height: KNOB_SIZE,
    borderRadius: KNOB_SIZE / 2,
    backgroundColor: theme.colors.primary,
    marginBottom: 2,
  },
});

interface Props {
  state: Animated.Node<State>;
  label: Animated.Node<string>;
}

const Knob = ({ state, label }: Props) => {
  return (
    <Box style={styles.container}>
      <Animated.View style={styles.icon} />
      <ReText text={label} />
    </Box>
  );
};

export default Knob;
