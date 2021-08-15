/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState, useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';

import { Box, theme, Text } from '../../components';
import { SortNavParamList } from '../../types/navigation.types';
import { Tabs } from '../../components/Tabs';
import { Button } from '../../components/Button';
import TextInput from '../../components/TextInput';
import Multiselect from '../../components/Multiselect';
import ActivityIndicator from '../../components/ActivityIndicator';
import listingsApi from '../../firebase/listing';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: theme.constants.screenPadding / 2,
  },
  headerText: {
    width: '70%',
    lineHeight: 35,
    marginBottom: hp(4),
    paddingTop: theme.constants.screenPadding,
  },
  dash: {
    width: theme.constants.screenWidth,
    backgroundColor: theme.colors.lightGrey,
    height: 0.5,
    marginVertical: hp(3),
  },
  roomsContainer: {
    flexDirection: 'row',
    marginTop: 15,
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

const roomOptions = ['Any', '1', '2', '3', '4+'];
const bathroomOptions = ['Any', '1', '2', '3', '4+'];
export const amenities = [
  {
    id: 1,
    value: 'Air Con.',
  },
  {
    id: 2,
    value: 'Alarm',
  },
  {
    id: 3,
    value: 'Balcony',
  },
  {
    id: 4,
    value: 'Parking',
  },
  {
    id: 5,
    value: 'Pool',
  },
  {
    id: 6,
    value: 'CCTV',
  },
];
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
const Sort = ({ navigation }: StackScreenProps<SortNavParamList, 'Sort'>) => {
  const [listings, setListings] = useState<any[]>([]);
  const [rooms, setRooms] = useState<string>(roomOptions[0]);
  const [bathrooms, setBathrooms] = useState<string>(bathroomOptions[0]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedAmenity, setSelectedAmenity] = useState<string[]>([]);
  const [typeValue, setType] = useState<string>('for_sale');
  const [selectedType, setSelectedType] = useState<string>('');

  const [min, setMinValue] = useState<number>(0);
  const [max, setMaxValue] = useState<number>(0);

  // Dropdown Location
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<any>('Any');
  const [items, setItems] = useState([
    { label: 'All Areas', value: 'Any' },
    { label: 'Lusaka', value: 'lusaka' },
  ]);

  // Dropdown Building type
  const [openBT, setOpenBT] = useState<boolean>(false);
  const [valueBT, setValueBT] = useState<any>('Any');
  const [itemsBT, setItemsBT] = useState([
    { label: 'All', value: 'Any' },
    { label: 'Stand Alone', value: 'standalone' },
    { label: 'Semi Detached', value: 'semi-detached' },
  ]);

  // Sort params
  const minValue = min ? min : 0;
  const maxValue = max ? max : 1000000000000000000;
  const locationValue = value !== 'Any' ? value : '';
  const roomValue = rooms !== 'Any' ? rooms : '';
  const bathValue = bathrooms !== 'Any' ? bathrooms : '';
  const amenitiesValue = selectedAmenity.length > 0 ? selectedAmenity : [];
  const buildingTypeValue = valueBT !== 'Any' ? valueBT : '';

  function filterArray(array: any[], filters: any) {
    const filterKeys = Object.keys(filters);
    return array.filter((item) => {
      // validates all filter criteria
      return filterKeys.every((key) => {
        // ignores non-function predicates
        if (typeof filters[key] !== 'function') return true;
        return filters[key](item[key]);
      });
    });
  }

  const filterParams = {
    price: (price: number) => price > minValue && price < maxValue,
    type: (type: string) => type === typeValue,
    ...(locationValue !== '' && { address_area: (address_area: string) => address_area === value }),
    ...(roomValue !== '' && { rooms: (rooms: string) => rooms === roomValue }),
    ...(bathValue !== '' && { baths: (baths: string) => baths === bathValue }),
    ...(amenitiesValue.length > 0 && {
      amenities: (amenities: string[]) =>
        JSON.stringify(amenities) === JSON.stringify(amenitiesValue),
    }),
    ...(buildingTypeValue !== '' && {
      building_type: (building_type: string) => building_type === valueBT,
    }),
    ...(selectedType !== '' && {
      property_type: (property_type: string) => property_type === selectedType,
    }),
  };

  const handleSort = () => {
    try {
      setLoading(true);

      const result = filterArray(listings, filterParams);

      setLoading(false);
      navigation.navigate('SortResult', { listings: result });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const loadData = async () => {
    const result = await listingsApi.getAllListings();
    setListings(result);
  };

  useEffect(() => {
    void loadData();
    return () => {
      void loadData();
    };
  }, []);

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Box style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text variant="h1" color="dark" style={styles.headerText}>
            Filter for your perfect property
          </Text>
          <Tabs
            text1="For Sale"
            text2="For Rent"
            value1="for_sale"
            value2="for_rent"
            setSelected={setType}
          />
          <Box style={styles.dash} />

          <Text variant="b1B" color="dark" mb="m" mt="xl">
            Property Type
          </Text>

          <DropDownPicker
            open={openBT}
            items={itemsBT}
            value={valueBT}
            setOpen={setOpenBT}
            setValue={setValueBT}
            setItems={setItemsBT}
            style={{ borderColor: theme.colors.white }}
            textStyle={{ color: theme.colors.text }}
          />

          <Text variant="b1B" color="dark" mb="m" mt="xl">
            House Type
          </Text>

          <Multiselect items={propertyType} setSelection={setSelectedType} multiple={false} />

          <Text variant="b1B" color="dark" mb="m" mt="xl">
            Minimum Price
          </Text>

          <TextInput
            placeholder="Minimum Price"
            onChange={(e) => setMinValue(Number(e.nativeEvent.text))}
            keyboardType="number-pad"
          />

          <Text variant="b1B" color="dark" mb="m" mt="xl">
            Maximum Price
          </Text>

          <TextInput
            placeholder="Maximum Price"
            onChange={(e) => setMaxValue(Number(e.nativeEvent.text))}
            keyboardType="number-pad"
          />

          <Text variant="b1B" color="dark" mb="m" mt="xl">
            Location
          </Text>

          <DropDownPicker
            open={open}
            items={items}
            value={value}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={{ borderColor: theme.colors.white }}
            textStyle={{ color: theme.colors.text }}
          />

          {/* <Text variant="b1" color="text" mt="xxl" textAlign="center">
            The average price in this area is ZK 4000
          </Text> */}

          <Text variant="b1B" color="dark" mb="m" mt="xl">
            Bedrooms
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

          <Text variant="b1B" color="dark" mb="m" mt="xl">
            Bathrooms
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

          <Text variant="b1B" color="dark" mb="m" mt="xl">
            Amenities
          </Text>

          <Multiselect items={amenities} setSelection={setSelectedAmenity} multiple />

          <Box marginVertical="xxl">
            <Button
              type="primary"
              width={theme.constants.screenWidth}
              onPress={handleSort}
              label="Search"
            />
          </Box>
        </ScrollView>
      </Box>
    </>
  );
};

export default Sort;
