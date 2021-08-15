/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Image } from 'react-native-expo-image-cache';

import { Box, theme, Text } from '..';
import IListing from '../../types/listing.type';
import { numberWithCommas } from '../../utils/numberWithComma';
import capitalize from '../../utils/capitalize';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: theme.constants.screenWidth,
    height: 129,
    borderRadius: 16,
    backgroundColor: theme.colors.white,
    marginBottom: 20,
    padding: 20,
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 20,
    height: '80%',
    width: wp(40),
    justifyContent: 'space-between',
  },
  button: {
    width: wp(9),
    height: wp(9),
    backgroundColor: theme.colors.purple,
    borderRadius: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface Props {
  listing: IListing;
  bgColor: 'white' | 'secondary';
  onPressButton: () => void;
  onPress?: () => void;
  showVerified?: boolean;
}

const FavoriteItem = ({ listing, bgColor, onPressButton, onPress, showVerified }: Props) => {
  return (
    <Box style={[styles.container, { backgroundColor: theme.colors[bgColor] }]}>
      <Image {...{ uri: listing.images[0] }} style={{ width: 90, height: 70, borderRadius: 16 }} />

      <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.textContainer}>
        <Text numberOfLines={1} variant="b1B" color="dark">
          {listing.title}
        </Text>
        <Text numberOfLines={1} variant="b2" color="lightGrey">
          {listing.address}
        </Text>

        <Text numberOfLines={1} variant="b1B" color="dark">{`ZK ${numberWithCommas(
          listing.price.toString(),
        )}`}</Text>
        {showVerified && (
          <Text variant="b1" color={listing.verified === 'verified' ? 'green' : 'red'}>
            {capitalize(listing.verified)}
          </Text>
        )}
      </TouchableOpacity>

      <Box style={{ flex: 1 }} />

      <TouchableOpacity style={styles.button} onPress={onPressButton}>
        <Icon name="trash-2" color={theme.colors.white} size={22} />
      </TouchableOpacity>
    </Box>
  );
};

export default FavoriteItem;
