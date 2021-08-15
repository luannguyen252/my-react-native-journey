/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Image } from 'react-native-expo-image-cache';
import { useQuery } from 'react-query';
import * as Linking from 'expo-linking';

import { Box, theme, Text } from '../../components';
import { StackHeader } from '../../components/StackHeader';
import { HomeNavParamList } from '../../types/navigation.types';
import agentsApi from '../../firebase/agent';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
    flex: 1,
    alignItems: 'center',
  },
  amenityTab: {
    width: 95,
    height: 48,
    backgroundColor: theme.colors.primary,
    marginHorizontal: 12,
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 16,
  },
  amenityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: theme.constants.screenWidth,
  },
  buttomContact: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    height: hp(12),
    padding: 20,
  },
  displayImg: {
    width: wp(12),
    height: wp(12),
    backgroundColor: theme.colors.dark,
    borderRadius: wp(6),
    marginRight: wp(5),
  },
  contactContainer: {
    bottom: hp(17),
    left: hp(2),
    position: 'absolute',
    flexDirection: 'row',
    width: wp(25),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contactItem: {
    backgroundColor: theme.colors.secondary,
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    justifyContent: 'center',
    alignItems: 'center',
    top: hp(14),
    left: wp(60),
  },
});

// interface ListingDetailsExtraProps {}

const ListingDetailsExtra = ({
  navigation,
  route,
}: StackScreenProps<HomeNavParamList, 'ListingDetailExtra'>) => {
  const { listing } = route.params;

  const { data } = useQuery('my-agent', () => agentsApi.getAgent(listing.agent_id));

  return (
    <Box style={styles.container}>
      <StackHeader padding onPressBack={() => navigation.goBack()} transparent />

      <ScrollView>
        <Box style={{ paddingHorizontal: theme.constants.screenPadding / 2, width: '100%' }}>
          <Text numberOfLines={4} variant="h2B" color="dark" mt="xxl">
            Description
          </Text>

          <Text
            variant="b1"
            color="lightGrey"
            mt="l"
            style={{ alignSelf: 'flex-start', lineHeight: 28 }}>
            {listing.description}
          </Text>

          <Text variant="h2B" color="dark" mt="xxl">
            Amenities
          </Text>

          <Box mt="l" style={styles.amenityContainer}>
            {listing.amenities.map((a) => (
              <Box style={styles.amenityTab} key={a}>
                <Text variant="b1" color="white">
                  {a}
                </Text>
              </Box>
            ))}
          </Box>

          <Text variant="h2B" color="dark" mt="xxl">
            Others
          </Text>

          <Box
            style={{
              flexDirection: 'row',
              width: theme.constants.screenWidth,
              justifyContent: 'space-between',
            }}
            mt="l">
            <Box>
              <Text variant="b1" color="lightGrey">
                Type
              </Text>
              <Text variant="h3" color="dark" mt="m">
                {listing.type === 'for_sale' ? 'For Sale' : 'For Rent'}
              </Text>
            </Box>

            <Box>
              <Text variant="b1" color="lightGrey" textAlign="right">
                Property Type
              </Text>
              <Text variant="h3" color="dark" mt="m" textAlign="right">
                {listing.property_type}
              </Text>
            </Box>
          </Box>

          <Box
            style={{
              flexDirection: 'row',
              width: theme.constants.screenWidth,
              justifyContent: 'space-between',
            }}
            mt="xxl">
            <Box>
              <Text variant="b1" color="lightGrey">
                Area
              </Text>
              <Text variant="h3" color="dark" mt="m">
                {listing.address_area}
              </Text>
            </Box>

            <Box>
              <Text variant="b1" color="lightGrey" textAlign="right">
                Furnishing
              </Text>
              <Text variant="h3" color="dark" mt="m" textAlign="right">
                {listing.furnish ? 'Furnished' : 'Not Furnished'}
              </Text>
            </Box>
          </Box>

          <Box
            style={{
              flexDirection: 'row',
              width: theme.constants.screenWidth,
              justifyContent: 'space-between',
            }}
            mt="xxl"
            pb="xxxl">
            <Box>
              <Text variant="b1" color="lightGrey">
                Build Year
              </Text>
              <Text variant="h3" color="dark" mt="m">
                {listing.build_year == '' ? 'n/a' : listing.build_year}
              </Text>
            </Box>

            {/* <Box>
              <Text variant="b1" color="lightGrey">
                Furnishing
              </Text>
              <Text variant="h3" color="dark" mt="m">
                {listing.furnish ? 'Furnished' : 'Not Furnished'}
              </Text>
            </Box> */}
          </Box>
        </Box>
      </ScrollView>

      <Box style={{ flex: 1 }} />

      <Box style={styles.buttomContact}>
        <Box style={styles.displayImg}>
          <Image
            {...{ uri: data ? data[0].avatar : '' }}
            style={{
              width: wp(12),
              height: wp(12),
              borderRadius: wp(6),
              marginRight: wp(5),
            }}
            transitionDuration={300}
            tint="dark"
          />
        </Box>
        <Box>
          <Text variant="h3" color="white" mb="m">
            {data ? data[0].full_name : ''}
          </Text>

          <Text variant="b1" color="lightGrey">
            Agent
          </Text>
        </Box>
        <Box style={{ flex: 1 }} />

        <Box style={styles.contactContainer}>
          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${data ? data[0].phone : ''}`)}
            style={styles.contactItem}>
            <Icon name="phone" color={theme.colors.veryLightPurple} size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL(data ? data[0].whatsapp_link : '')}
            style={styles.contactItem}>
            <Icon name="message-circle" color={theme.colors.veryLightPurple} size={24} />
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
};

export default ListingDetailsExtra;
