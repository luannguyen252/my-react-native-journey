import React from 'react';
import { StyleSheet, Image } from 'react-native';

import { Box, theme, Text } from '..';
import { Button } from '../Button';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.constants.screenPadding / 2,
    paddingTop: theme.constants.screenPadding,
    flex: 1,
  },
});

interface Props {
  image: number;
  text: string;
  onPress: any;
  bgColor: 'secondary' | 'white';
}

const Status = ({ onPress, image, text, bgColor }: Props) => {
  return (
    <Box style={[styles.container, { backgroundColor: theme.colors[bgColor] }]}>
      <Box style={{ marginVertical: 40 }}>
        <Image source={image} style={{ width: theme.constants.screenWidth, height: 300 }} />
      </Box>

      <Text variant="h2B" color="dark" style={{ textAlign: 'center', lineHeight: 30 }}>
        {text}
      </Text>

      {onPress !== false && (
        <Button
          type="purple"
          label="Add More"
          onPress={onPress}
          width={theme.constants.screenWidth}
        />
      )}
    </Box>
  );
};

export default Status;
