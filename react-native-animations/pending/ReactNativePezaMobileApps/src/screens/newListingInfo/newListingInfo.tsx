import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, ScrollView } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';

import { Box, theme, Text } from '../../components';
import { StackHeader } from '../../components/StackHeader';
import { ProfileNavParamList } from '../../types/navigation.types';
import { Tabs } from '../../components/Tabs';
import { amenities } from '../sort/sort';
import { Button } from '../../components/Button';
import Multiselect from '../../components/Multiselect';
import IListing from '../../types/listing.type';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: theme.constants.screenPadding / 2,
    paddingTop: theme.constants.screenPadding,
    flex: 1,
  },
  headerText: {
    alignSelf: 'flex-start',
    width: '70%',
    lineHeight: 35,
    marginBottom: hp(4),
    paddingTop: theme.constants.screenPadding,
  },
  amenityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: theme.constants.screenWidth,
  },
  amenity: {
    width: 100,
    height: 48,
    backgroundColor: theme.colors.white,
    marginHorizontal: 12,
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 16,
  },
});

const propertyType = [
  {
    id: 1,
    value: 'House',
  },

  {
    id: 3,
    value: 'Appartment',
  },
  {
    id: 4,
    value: 'Lots/Land',
  },

  {
    id: 6,
    value: 'Condos',
  },
  {
    id: 7,
    value: 'Office Space',
  },
  {
    id: 8,
    value: 'Event Space',
  },
];

// interface Props {}

const NewListingInfo = ({
  navigation,
}: StackScreenProps<ProfileNavParamList, 'NewListingInfo'>) => {
  const [selectedAmenity, setSelectedAmenity] = useState<string[]>([]);
  const [type, setType] = useState<string>('for_sale');
  const [listingType, setListingType] = useState<string>('');

  const data: Partial<IListing> = {
    type,
    amenities: selectedAmenity,
    property_type: listingType,
  };

  const handleNext = () => {
    if (listingType === '') {
      return Toast.show({
        type: 'error',
        position: 'top',
        visibilityTime: 4000,
        autoHide: true,
        text1: 'Listing Info',
        text2: 'Property type is empty, add to contiue.',
      });
    }
    navigation.navigate('NewListingSpace', { listing: data });
  };

  return (
    <Box style={styles.container}>
      <StackHeader onPressBack={() => navigation.goBack()} title="Step 1 of 4" />

      <ScrollView
        contentContainerStyle={{ alignItems: 'center' }}
        showsVerticalScrollIndicator={false}>
        <Text variant="h1Max" color="dark" style={styles.headerText}>
          Tell us about your place
        </Text>

        <Text mb="xl" variant="h2B" color="dark" style={{ alignSelf: 'flex-start' }}>
          First, set listing type
        </Text>

        <Tabs
          text1="For Sale"
          text2="For Rent"
          value1="for_sale"
          value2="for_rent"
          setSelected={setType}
        />

        <Text mb="xl" mt="xl" variant="h2B" color="dark" style={{ alignSelf: 'flex-start' }}>
          Now choose property type
        </Text>

        <Multiselect items={propertyType} setSelection={setListingType} multiple={false} />

        <Text mb="xl" mt="xl" variant="h2B" color="dark" style={{ alignSelf: 'flex-start' }}>
          Then, lets narrow things down
        </Text>

        <Multiselect items={amenities} setSelection={setSelectedAmenity} multiple />

        <Box marginVertical="xxl">
          <Button
            type="purple"
            width={theme.constants.screenWidth}
            onPress={handleNext}
            label="Next Step"
          />
        </Box>
      </ScrollView>
    </Box>
  );
};

export default NewListingInfo;
