import React, { ReactNode } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { Box, theme } from '..';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

interface Props {
  children: ReactNode;
  bgColor: 'primary' | 'secondary';
  horizontalPadding?: boolean;
  scrollable?: boolean;
  topPadding?: number;
  style?: ViewStyle;
}
const Screen = ({ children, bgColor, horizontalPadding, scrollable, style, topPadding }: Props) => {
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          paddingHorizontal: horizontalPadding ? 20 : 0,
          backgroundColor: bgColor && theme.colors[bgColor],
          ...style,
        },
      ]}>
      <StatusBar backgroundColor={theme.colors[bgColor]} />
      <Box style={{ height: topPadding ? topPadding : 30 }} />
      {children}
    </SafeAreaView>
  );
};

export default Screen;
