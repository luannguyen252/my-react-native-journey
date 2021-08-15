/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Image } from 'react-native-expo-image-cache';
import { numberWithCommas } from '../../utils/numberWithComma';

import { Box, theme, Text } from '..';
import IListing from '../../types/listing.type';

const styles = StyleSheet.create({
  container: {
    height: hp(35),
    marginBottom: hp(5),
  },
  image: {
    width: '100%',
    height: hp(23),
    borderRadius: wp(4),
  },
  favButton: {
    position: 'absolute',
    left: wp(80),
    bottom: hp(16),
    padding: wp(1.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceContainer: {
    backgroundColor: theme.colors.primary,
    borderRadius: wp(3),
    height: hp(4.5),
    padding: wp(2),
    justifyContent: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    flexDirection: 'row',
    marginVertical: hp(1),
    alignItems: 'center',
  },
  listingType: {
    position: 'absolute',
    width: wp(20),
    height: hp(3.5),
    borderRadius: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.green,
    top: hp(17),
    left: wp(3),
  },
});

interface Props {
  listing: IListing;
  width?: number;
  onPress: () => void;
}
const Listing = ({ listing, onPress, width }: Props) => {
  return (
    <Box style={[styles.container, { width: width ? width : '100%' }]}>
      <Box>
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
          <Image
            {...{ uri: listing.images[0] }}
            style={styles.image}
            tint="light"
            transitionDuration={300}
          />
        </TouchableOpacity>
        <Box
          style={[
            styles.listingType,
            {
              backgroundColor: theme.colors.primary,
            },
          ]}>
          <Text variant="b1" color="white">
            {listing.type === 'for_sale' ? 'For Sale' : 'For Rent'}
          </Text>
        </Box>
      </Box>
      <Box style={styles.infoContainer}>
        <Box style={{ width: wp(65) }}>
          <Text numberOfLines={1} variant="h2" color="dark" mt="l">
            {listing.title}
          </Text>
          <Text numberOfLines={1} variant="b1B" color="text" mt="m">
            {listing.address}
          </Text>
        </Box>
        <Box style={styles.priceContainer}>
          <Text variant="b1" color="white">{`ZK ${numberWithCommas(
            listing.price.toString(),
          )}`}</Text>
        </Box>
      </Box>
      <Box style={styles.iconContainer}>
        <Text variant="b1" color="text" mr="s">
          {listing.rooms}
        </Text>
        <Text variant="b1" color="text">
          {`bedroom${listing.rooms === '1' ? '' : 's'}`}
        </Text>
        <Text variant="b1" color="text" mr="s" ml="l">
          {listing.baths}
        </Text>
        <Text variant="b1" color="text" mr="l">
          {`bathroom${listing.rooms === '1' ? '' : 's'}`}
        </Text>
      </Box>
    </Box>
  );
};

export default Listing;
