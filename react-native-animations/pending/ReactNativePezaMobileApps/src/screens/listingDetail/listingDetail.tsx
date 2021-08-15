/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Image as RNImage, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Feather as Icon } from '@expo/vector-icons';
import { AntDesign as AIcon } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as Linking from 'expo-linking';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import * as Haptics from 'expo-haptics';

import { Box, theme, Text } from '../../components';
import { ListingImgSlider } from '../../components/ListingImgSlider';
import { StackHeader } from '../../components/StackHeader';
import { HomeNavParamList } from '../../types/navigation.types';
import { IListingFavorite } from '../../types/listing.type';
import { addFavorite } from '../../redux/actions';
import favoritesApi from '../../firebase/favorite';
import { useQuery } from 'react-query';
import store from '../../utils/storage';
import { numberWithCommas } from '../../utils/numberWithComma';
import capitalize from '../../utils/capitalize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingBottom: 100,
  },
  imgSlider: {
    position: 'absolute',
  },
  lowerContainer: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    position: 'relative',
    marginTop: hp(45),
    padding: theme.constants.screenPadding / 2,
    backgroundColor: theme.colors.white,
  },
  title: {
    marginLeft: theme.constants.screenPadding / 2,
    position: 'absolute',
    top: hp(35),
  },
  addressContainer: {
    flexDirection: 'row',
    width: theme.constants.screenWidth,
    alignItems: 'center',
    marginTop: hp(1),
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -30,
  },
  displayImg: {
    width: wp(12),
    height: wp(12),
    backgroundColor: theme.colors.dark,
    borderRadius: wp(6),
    marginRight: wp(5),
  },
  asking: {},
  propertyDetail: {
    marginTop: hp(3),
  },
  amenities: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(3),
    marginBottom: hp(3),
  },
  contactContainer: {
    bottom: hp(15),
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
});

const listingDetail = ({
  route,
  navigation,
}: StackScreenProps<HomeNavParamList, 'ListingDetail'>) => {
  const {
    images,
    title,
    address,
    price,
    rooms,
    baths,
    area,
    type,
    furnish,
    address_area,
    property_type,
    description,
    build_year,
    party_allowed,
    daily_lease,
    building_type,
  } = route.params.listing;

  const WHATSAPP_MESSAGE = encodeURI(
    `Hello from Peza, I would like to know more about your listing ${
      type === 'for_rent' ? 'for rent' : 'for sale'
    } at ${address} going for ${`ZK ${numberWithCommas(price.toString())}`}.`,
  );

  const [user, setUser] = useState<any>({});

  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [reRun, setRerun] = useState<string>(Math.random().toString());

  const dispatch = useDispatch();

  // const removeFromFavorite = (favorite: IListingFavorite) => {
  //   dispatch(removeFavorite(favorite));
  // };

  const addToFavorite = (favorite: IListingFavorite) => {
    dispatch(addFavorite(favorite));
  };

  const handleFavorite = (listingToAdd: any) => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (!user.id)
      return Toast.show({
        text1: 'Login Required',
        text2: 'Sign up or login to add favorites',
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
        type: 'info',
      });
    setRerun(Math.random().toString());
    try {
      const newFav = {
        ...listingToAdd,
      };

      delete newFav.id;

      const fav: IListingFavorite = {
        ...newFav,
        user_id: user.id,
        product_id: route.params.listing.id,
      };

      if (isFavorite) {
        // const fav =
        //   favorites &&
        //   favorites.filter((f: IListingFavorite) => f.product_id == route.params.listing.id);
        // removeFromFavorite(fav && fav[0]);
        Toast.show({
          type: 'info',
          position: 'top',
          visibilityTime: 2000,
          autoHide: true,
          text1: 'Favorites',
          text2: 'Listing already in favorites.',
        });
      } else {
        addToFavorite(fav);
        Toast.show({
          type: 'success',
          position: 'top',
          visibilityTime: 2000,
          autoHide: true,
          text1: 'Favorites',
          text2: 'Successfully added to favorites.',
        });
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        position: 'top',
        visibilityTime: 2000,
        autoHide: true,
        text1: 'Favorites',
        text2: 'Error handling favorite.',
      });
    }
  };

  const { data: favorites } = useQuery(
    [reRun, user.id],
    () => favoritesApi.getUserFavorites(user.id),
    {
      enabled: !!user.id,
    },
  );

  const getUser = async () => {
    const user = await store.getData('user');
    if (user) {
      setUser(JSON.parse(user));
    }
  };

  const isFav = () => {
    const isFav = favorites && favorites.some((f: any) => f.product_id === route.params.listing.id);
    if (isFav) {
      setIsFavorite(true);
    }
  };

  useEffect(() => {
    void getUser();
    isFav();
  }, [favorites]);

  return (
    <ScrollView bounces style={styles.container} showsVerticalScrollIndicator={false}>
      <StackHeader
        padding
        onPressBack={() => navigation.goBack()}
        transparent
        bgColor="primary"
        option1={
          user && (
            <TouchableOpacity onPress={() => handleFavorite(route.params.listing)}>
              {isFavorite ? (
                <AIcon name="heart" color={theme.colors.red} size={24} />
              ) : (
                <AIcon name="hearto" color={theme.colors.white} size={24} />
              )}
            </TouchableOpacity>
          )
        }
        onPressOption1={() => handleFavorite(route.params.listing)}
      />

      <Box style={styles.imgSlider}>
        <ListingImgSlider images={images} />
      </Box>

      <Box style={styles.title}>
        <Text variant="h1" color="white">
          {title}
        </Text>

        <Box style={styles.addressContainer}>
          {/* <Icon name="map-pin" color={theme.colors.text} size={24} /> */}
          <Text variant="b1" color="white">
            {address}
          </Text>
        </Box>
      </Box>

      <Box style={styles.lowerContainer}>
        <Box style={styles.topContainer}>
          <Box style={styles.displayImg}>
            <RNImage
              source={require('../../../assets/icon.png')}
              style={{
                width: wp(12),
                height: wp(12),
                borderRadius: wp(6),
                marginRight: wp(5),
              }}
            />
          </Box>
          <Box>
            <Text variant="h3" color="dark" mb="m">
              PEZA Sarl
            </Text>

            <Box style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Box
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: theme.colors.green,
                }}
              />
              <Text variant="b1" color="text" ml="s">
                Available
              </Text>
            </Box>
          </Box>
          <Box style={{ flex: 1 }} />

          <Box style={styles.contactContainer}>
            <TouchableOpacity
              style={styles.contactItem}
              onPress={() => Linking.openURL(`tel:0977944910`)}>
              <Icon name="phone" color={theme.colors.veryLightPurple} size={24} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactItem}
              onPress={() =>
                Linking.openURL(`https://wa.me/+260977944910?text=${WHATSAPP_MESSAGE}`)
              }>
              <Icon name="message-circle" color={theme.colors.veryLightPurple} size={24} />
            </TouchableOpacity>
          </Box>
        </Box>

        <Box style={styles.propertyDetail}>
          <Box>
            <Text variant="h2B" color="dark">
              Price
            </Text>
            <Text variant="h2B" color="primary" mt="l">
              {`ZK ${numberWithCommas(price.toString())}`}
            </Text>
          </Box>

          <Text variant="h2B" color="dark" mt="xxl">
            Property detail
          </Text>

          <Box style={styles.amenities}>
            <Box>
              <Text variant="b1" color="lightGrey">
                Bedrooms
              </Text>
              <Text variant="b1B" color="dark" mt="s">
                {rooms}
              </Text>
            </Box>
            <Box>
              <Text variant="b1" color="lightGrey">
                Bathrooms
              </Text>
              <Text variant="b1B" color="dark" mt="s">
                {baths}
              </Text>
            </Box>
            <Box>
              <Text variant="b1" color="lightGrey">
                Area
              </Text>
              <Text variant="b1B" color="dark" mt="s">
                {area !== '' ? `${area} m2` : 'n/a'}
              </Text>
            </Box>
          </Box>

          <Box>
            <Text numberOfLines={4} variant="h2B" color="dark" mt="l">
              Description
            </Text>

            <Text
              variant="b1"
              color="lightGrey"
              mt="l"
              style={{ alignSelf: 'flex-start', lineHeight: 28 }}>
              {description}
            </Text>

            <Text variant="h2B" color="dark" mt="xxl">
              Amenities
            </Text>

            <Box mt="l" style={styles.amenityContainer}>
              {route.params.listing.amenities.map((a) => (
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
                  {type === 'for_sale' ? 'For Sale' : 'For Rent'}
                </Text>
              </Box>

              <Box>
                <Text variant="b1" color="lightGrey" textAlign="right">
                  Property Type
                </Text>
                <Text variant="h3" color="dark" mt="m" textAlign="right">
                  {property_type}
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
                  {capitalize(address_area)}
                </Text>
              </Box>

              <Box>
                <Text variant="b1" color="lightGrey" textAlign="right">
                  Furnishing
                </Text>
                <Text variant="h3" color="dark" mt="m" textAlign="right">
                  {furnish ? 'Furnished' : 'Not Furnished'}
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
                  Build Year
                </Text>
                <Text variant="h3" color="dark" mt="m">
                  {build_year == '' ? 'n/a' : build_year}
                </Text>
              </Box>

              <Box>
                <Text variant="b1" color="lightGrey" textAlign="right">
                  Events
                </Text>
                <Text variant="h3" color="dark" mt="m" textAlign="right">
                  {party_allowed ? 'Allowed' : 'Not Allowed'}
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
                  Building Type
                </Text>
                <Text variant="h3" color="dark" mt="m">
                  {building_type === 'standalone' ? 'Stand Alone' : 'Semi-Detached'}
                </Text>
              </Box>

              <Box>
                <Text variant="b1" color="lightGrey" textAlign="right">
                  Daily Lease
                </Text>
                <Text variant="h3" color="dark" mt="m" textAlign="right">
                  {daily_lease ? 'Allowed' : 'Not Allowed'}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default listingDetail;
