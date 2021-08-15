import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';

import { Box, theme, Text } from '..';

const styles = StyleSheet.create({
  container: {
    width: theme.constants.screenWidth,
    height: 50,
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    flexDirection: 'row',
  },
  tab: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerTab: {
    width: '95%',
    height: '85%',
    backgroundColor: theme.colors.primary,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface Props {
  text1: string;
  text2: string;
  value1: string;
  value2: string;
  setSelected: (value: string) => void;
  onChange?: () => void;
}

const Tabs = ({ text1, text2, setSelected, value1, value2, onChange }: Props) => {
  const [active, setActive] = useState<string>(value1);

  return (
    <Box style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          setActive(value1);
          setSelected(value1);
          onChange && onChange();
        }}
        activeOpacity={1}
        style={styles.tab}>
        <Box style={active === value1 && styles.innerTab}>
          <Text variant="b1" color={active === value1 ? 'white' : 'dark'}>
            {text1}
          </Text>
        </Box>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          setActive(value2);
          setSelected(value2);
          onChange && onChange();
        }}
        activeOpacity={1}
        style={styles.tab}>
        <Box style={active === value2 && styles.innerTab}>
          <Text variant="b1" color={active === value2 ? 'white' : 'dark'}>
            {text2}
          </Text>
        </Box>
      </TouchableOpacity>
    </Box>
  );
};

export default Tabs;
