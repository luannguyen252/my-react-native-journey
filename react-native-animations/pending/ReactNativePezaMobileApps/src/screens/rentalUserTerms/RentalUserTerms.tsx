import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';

import { Box, theme, Text } from '../../components';
import { StackHeader } from '../../components/StackHeader';
import Logo from '../../svg/logo';
import { ProfileNavParamList } from '../../types/navigation.types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
  },
  textContainer: {
    width: theme.constants.screenWidth,
  },
});

// interface Props {}

const RentalUserTerms = ({ navigation }: StackScreenProps<ProfileNavParamList, 'About'>) => {
  return (
    <Box style={styles.container}>
      <StackHeader onPressBack={() => navigation.goBack()} padding />
      <Logo width={127.2} height={74} />

      <Box style={[styles.textContainer, { marginTop: 15 }]}>
        <Text variant="h2" color="dark" style={{ lineHeight: 40, textAlign: 'justify' }}>
          Peza is an online property portal that provides the fastest and most convinient means to
          access properties of different types, sizes, functions, costs, locations and more.
        </Text>
      </Box>

      <Box mt="xxl" style={styles.textContainer}>
        <Text variant="h2" color="dark" style={{ lineHeight: 40, textAlign: 'justify' }}>
          We do more than that. With Peza, any home owner can publish their home availablity and get
          PEZAs qualified agents to manage customer requests, viewing, scheduling and other tedious
          tasks
        </Text>
      </Box>

      <Box mt="xxl" style={styles.textContainer}>
        <Text variant="h2" color="dark" style={{ lineHeight: 40, textAlign: 'justify' }}>
          With PEZA, its convinience in real estate, whether buying or selling.
        </Text>
      </Box>
    </Box>
  );
};

export default RentalUserTerms;
