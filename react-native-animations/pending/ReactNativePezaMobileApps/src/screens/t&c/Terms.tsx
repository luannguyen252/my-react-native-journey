/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import * as Browser from 'expo-web-browser';

import { Box, theme } from '../../components';
import ProfileItem from '../../components/ProfileItem';
import { StackHeader } from '../../components/StackHeader';
import Logo from '../../svg/logo';
import { ProfileNavParamList } from '../../types/navigation.types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
    alignItems: 'center',
  },
  textContainer: {
    width: theme.constants.screenWidth,
  },
  itemContainer: {
    width: theme.constants.screenWidth,
    marginTop: 50,
  },
});

const TERMS_OF_USE_URL = 'https://pdfhost.io/v/kAexqHgPS_Peza_Terms_of_Usepdf.pdf';
const RENTAL_USER_TERMS_URL = 'https://pdfhost.io/v/4HdvmN6.Y_Rentals_User_Termspdf.pdf';
const LISTING_QUALITY_POLICY_URL = 'https://pdfhost.io/v/XEQtYchVW_Listings_Quality_Policypdf.pdf';
const GOOD_NEIGHBOR_POLICY_URL = 'https://pdfhost.io/v/i6loL4iV2_Good_Neighbor_Policypdf.pdf';
const RESPECTFUL_RENTING_PLEDGE_URL =
  'https://pdfhost.io/v/6y1Jnajl1_Respectful_Renting_Pledgepdf.pdf';

// interface Props {}

const Terms = ({ navigation }: StackScreenProps<ProfileNavParamList, 'About'>) => {
  return (
    <Box style={styles.container}>
      <StackHeader onPressBack={() => navigation.goBack()} padding />
      <Logo width={127.2} height={74} />

      <Box style={styles.itemContainer}>
        <ProfileItem
          icon={<Icon name="book" color={theme.colors.veryLightPurple} size={24} />}
          label="Rental User Terms"
          onPress={async () => await Browser.openBrowserAsync(RENTAL_USER_TERMS_URL)}
        />

        <ProfileItem
          icon={<Icon name="book" color={theme.colors.veryLightPurple} size={24} />}
          label="Listings Quality Policy"
          onPress={async () => await Browser.openBrowserAsync(LISTING_QUALITY_POLICY_URL)}
        />

        <ProfileItem
          icon={<Icon name="book" color={theme.colors.veryLightPurple} size={24} />}
          label="Good Neighbor Policy"
          onPress={async () => await Browser.openBrowserAsync(GOOD_NEIGHBOR_POLICY_URL)}
        />

        <ProfileItem
          icon={<Icon name="book" color={theme.colors.veryLightPurple} size={24} />}
          label="Terms of Use"
          onPress={async () => await Browser.openBrowserAsync(TERMS_OF_USE_URL)}
        />

        <ProfileItem
          icon={<Icon name="book" color={theme.colors.veryLightPurple} size={24} />}
          label="Respectful Renting Pledge"
          onPress={async () => await Browser.openBrowserAsync(RESPECTFUL_RENTING_PLEDGE_URL)}
        />
      </Box>
    </Box>
  );
};

export default Terms;
