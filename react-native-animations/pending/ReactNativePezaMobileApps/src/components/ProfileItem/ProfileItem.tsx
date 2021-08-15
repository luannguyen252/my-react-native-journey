import React, { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

import { Box, theme, Text } from '..';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface Props {
  icon: ReactNode;
  label: string;
  onPress: () => void;
}

const ProfileItem: React.FC<Props> = ({ icon, label, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.container}>
      <Box style={styles.iconContainer}>{icon}</Box>

      <Text variant="h2" color="dark" ml="xl">
        {label}
      </Text>

      <Box style={{ flex: 1 }} />

      <Icon name="chevron-right" color={theme.colors.text} size={24} />
    </TouchableOpacity>
  );
};

export default ProfileItem;
