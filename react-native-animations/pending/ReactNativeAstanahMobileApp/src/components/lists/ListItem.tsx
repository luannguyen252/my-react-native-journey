import React, { ReactNode } from 'react';
import { Dimensions, StyleSheet } from 'react-native';

import { Box, Text } from '../Theme';
import { theme } from '..';
import { Feather as Icon } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width,
    height: 56,
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    paddingRight: 40,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
  },
});

interface ListItemProps {
  label: string;
  icon: ReactNode;
  chevron?: boolean;
}

const ListItem = ({ label, icon, chevron }: ListItemProps) => {
  return (
    <Box style={styles.container}>
      {icon ? <Box>{icon}</Box> : <Box style={styles.circle} />}
      <Text variant="b3B" color="primary" marginLeft="m">
        {label}
      </Text>
      <Box style={{ flex: 1 }} />
      {chevron && (
        <Icon name="chevron-right" size={18} color={theme.colors.primary} />
      )}
    </Box>
  );
};

export default ListItem;
