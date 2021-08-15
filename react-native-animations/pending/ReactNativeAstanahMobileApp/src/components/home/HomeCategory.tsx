import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';

import { Box, Text, theme } from '..';
import { Category } from '../../../types';
import { CARD_MARGIN } from './Banner';

export const CIRCLE_WIDTH = 70;
export const CIRCLE_MARGIN = 10;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 109,
  },
  circle: {
    width: CIRCLE_WIDTH,
    height: CIRCLE_WIDTH,
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.light,
    borderWidth: 1,
    borderRadius: CIRCLE_WIDTH / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 7,
  },
  text: {
    width: CIRCLE_WIDTH,
    textAlign: 'center',
  },
});

interface HomeCategoryProps {
  category: Category;
  margin?: number;
}

const HomeCategory = ({ category, margin }: HomeCategoryProps) => {
  const marginValue = margin ? margin : CIRCLE_MARGIN;
  const { label, icon } = category;
  return (
    <Box style={[styles.container, { marginRight: marginValue }]}>
      <Box style={styles.circle}>
        {icon ? (
          icon
        ) : (
          <Text variant="b3" color="primary">
            no icon
          </Text>
        )}
      </Box>
      <Text variant="b4" color="grey" style={styles.text}>
        {label}
      </Text>
    </Box>
  );
};

export default HomeCategory;
