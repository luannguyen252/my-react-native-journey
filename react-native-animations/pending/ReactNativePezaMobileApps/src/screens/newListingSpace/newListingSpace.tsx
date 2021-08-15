import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
// import Toast from 'react-native-toast-message';

import { Box, theme, Text } from '../../components';
import { StackHeader } from '../../components/StackHeader';
import { ProfileNavParamList } from '../../types/navigation.types';
import { Button } from '../../components/Button';
import IListing from '../../types/listing.type';
import TextInput from '../../components/TextInput';
import { Tabs } from '../../components/Tabs';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: theme.constants.screenPadding / 2,
    paddingTop: theme.constants.screenPadding,
    flex: 1,
  },
  headerText: {
    alignSelf: 'flex-start',
    width: '80%',
    lineHeight: 35,
    marginBottom: hp(4),
    paddingTop: theme.constants.screenPadding,
  },
  roomsContainer: {
    flexDirection: 'row',
  },
  roomOption: {
    width: 56,
    height: 48,
    borderRadius: 16,
    backgroundColor: theme.colors.white,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const roomOptions = ['1', '2', '3', '4', '5+'];
const bathroomOptions = ['1', '2', '3', '4', '5+'];

// interface Props {}

const NewListingSpace = ({
  navigation,
  route,
}: StackScreenProps<ProfileNavParamList, 'NewListingSpace'>) => {
  const [rooms, setRooms] = useState<string>(roomOptions[0]);
  const [bathrooms, setBathrooms] = useState<string>(bathroomOptions[0]);
  const [area, setArea] = useState<string>('');
  const [furnish, setFurnish] = useState<string>('furnished');
  const [party, setParty] = useState<string>('not_allowed');
  const [dailyLease, setDailyLease] = useState<string>('not_allowed');
  const [buildingType, setBuildingType] = useState<string>('standalone');
  const [floors, setFloors] = useState<string>('');
  const [buildYear, setBuildYear] = useState<string>('');

  const { listing } = route.params;

  const data: Partial<IListing> = {
    ...listing,
    floors,
    build_year: buildYear,
    furnish: furnish === 'furnished' ? true : false,
    baths: bathrooms,
    rooms,
    area,
    party_allowed: party === 'allowed' ? true : false,
    daily_lease: dailyLease === 'allowed' ? true : false,
    building_type: buildingType,
  };

  const handleNext = () => {
    // if (floors === '' || buildYear === '' || area === '') {
    //   return Toast.show({
    //     type: 'error',
    //     position: 'top',
    //     visibilityTime: 4000,
    //     autoHide: true,
    //     text1: 'Listing Info',
    //     text2: 'Complete all fields to continue.',
    //   });
    // }
    navigation.navigate('NewListingImg', { listing: data });
  };

  return (
    <Box style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'position' : 'height'}>
        <StackHeader onPressBack={() => navigation.goBack()} title="Step 2 of 4" />
        <ScrollView
          contentContainerStyle={{ alignItems: 'center' }}
          showsVerticalScrollIndicator={false}>
          <Text variant="h1Max" color="dark" style={styles.headerText}>
            Some more details...
          </Text>

          <Text mb="xxl" variant="h2B" color="dark" style={{ alignSelf: 'flex-start' }}>
            Number of bedrooms
          </Text>

          <Box style={styles.roomsContainer}>
            {roomOptions.map((r, index) => (
              <TouchableOpacity
                onPress={() => setRooms(r)}
                key={index}
                style={[
                  styles.roomOption,
                  { backgroundColor: rooms === r ? theme.colors.primary : theme.colors.white },
                ]}>
                <Text variant="b1" color={rooms === r ? 'white' : 'dark'}>
                  {r}
                </Text>
              </TouchableOpacity>
            ))}
          </Box>

          <Text mt="xxl" mb="xxl" variant="h2B" color="dark" style={{ alignSelf: 'flex-start' }}>
            Number of bathrooms
          </Text>

          <Box style={styles.roomsContainer}>
            {bathroomOptions.map((r, index) => (
              <TouchableOpacity
                onPress={() => setBathrooms(r)}
                key={index}
                style={[
                  styles.roomOption,
                  { backgroundColor: bathrooms === r ? theme.colors.primary : theme.colors.white },
                ]}>
                <Text variant="b1" color={bathrooms === r ? 'white' : 'dark'}>
                  {r}
                </Text>
              </TouchableOpacity>
            ))}
          </Box>

          <Text mt="xxl" mb="xxl" variant="h2B" color="dark" style={{ alignSelf: 'flex-start' }}>
            Area (m2)
          </Text>

          <TextInput
            placeholder="Add building area (optional)"
            onChange={(e) => setArea(e.nativeEvent.text)}
            keyboardType="number-pad"
          />

          <Text mt="xxl" mb="xxl" variant="h2B" color="dark" style={{ alignSelf: 'flex-start' }}>
            Floors
          </Text>

          <TextInput
            keyboardType="number-pad"
            placeholder="Number of floors (optional)"
            onChange={(e) => setFloors(e.nativeEvent.text)}
          />

          <Text mt="xxl" mb="xxl" variant="h2B" color="dark" style={{ alignSelf: 'flex-start' }}>
            Build Year
          </Text>

          <TextInput
            placeholder="Year property was completed (optional)"
            onChange={(e) => setBuildYear(e.nativeEvent.text)}
            keyboardType="number-pad"
          />

          <Text mt="xxl" mb="xxl" variant="h2B" color="dark" style={{ alignSelf: 'flex-start' }}>
            Furnishing
          </Text>

          <Tabs
            text1="Furnished"
            text2="Not Furnished"
            value1="furnished"
            value2="not_furnished"
            setSelected={setFurnish}
          />

          <Text mt="xxl" mb="xxl" variant="h2B" color="dark" style={{ alignSelf: 'flex-start' }}>
            Events
          </Text>

          <Tabs
            text1="Not Allowed"
            text2="Allowed"
            value1="not_allowed"
            value2="allowed"
            setSelected={setParty}
          />

          <Text mt="xxl" mb="xxl" variant="h2B" color="dark" style={{ alignSelf: 'flex-start' }}>
            Daily Stay
          </Text>

          <Tabs
            text1="Not Allowed"
            text2="Allowed"
            value1="not_allowed"
            value2="allowed"
            setSelected={setDailyLease}
          />

          <Text mt="xxl" mb="xxl" variant="h2B" color="dark" style={{ alignSelf: 'flex-start' }}>
            Building Type
          </Text>

          <Tabs
            text1="Standalone"
            text2="Semi-Detached"
            value1="standalone"
            value2="semi-detached"
            setSelected={setBuildingType}
          />

          <Box marginVertical="xxl" pb="xxxl">
            <Button
              type="purple"
              width={theme.constants.screenWidth}
              onPress={handleNext}
              label="Next Step"
            />
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </Box>
  );
};

export default NewListingSpace;
