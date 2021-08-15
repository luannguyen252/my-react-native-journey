/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, Image as RNImage, FlatList, Alert, ActivityIndicator } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useQuery } from 'react-query';
import { Feather as Icon } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { View } from 'moti';

import { Box, theme, Text } from '../../components';
import { ProfileNavParamList } from '../../types/navigation.types';
import { StackHeader } from '../../components/StackHeader';
import { Button } from '../../components/Button';
import listingsApi from '../../firebase/listing';
import { FavoriteItem } from '../../components/FavoriteItem';
import { TouchableOpacity } from 'react-native-gesture-handler';
import store from '../../utils/storage';
import { useEffect } from 'react';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    flex: 1,
    paddingHorizontal: theme.constants.screenPadding / 2,
    paddingTop: theme.constants.screenPadding,
    alignItems: 'center',
  },
  lowerContainer: {
    backgroundColor: theme.colors.white,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    height: hp(80),
    width: wp(100),
    top: wp(15),
    padding: 20,
  },
  userProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
  },
  displayImg: {
    width: wp(12),
    height: wp(12),
    backgroundColor: theme.colors.dark,
    borderRadius: wp(6),
    marginRight: wp(5),
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// interface MyListingsProps {}

const MyListings = ({ navigation }: StackScreenProps<ProfileNavParamList, 'MyListings'>) => {
  const [user, setUser] = useState<any>({});

  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const getUser = async () => {
    const user = await store.getData('user');
    if (user) {
      setUser(JSON.parse(user));
    }
  };

  const { data, isLoading } = useQuery(
    ['my-listing', user.id],
    () => listingsApi.getUserListings(user.id),
    {
      enabled: !!user.id,
      refetchInterval: 5000,
    },
  );

  const handleRemoveListing = (listing_id: string) => {
    Alert.alert('Delete Listing', 'Are you sure you want to delete this listing?', [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: async () => {
          setDeleteLoading(true);
          await listingsApi.deleteUserListing(user ? user?.id : '', listing_id);
          setDeleteLoading(false);
          navigation.navigate('Profile');
          Toast.show({
            type: 'success',
            position: 'top',
            visibilityTime: 2000,
            autoHide: true,
            text1: 'Listings',
            text2: 'Successfully removed listing.',
          });
        },
      },
    ]);
  };

  useEffect(() => {
    void getUser();
  }, []);

  return (
    <Box style={styles.container}>
      <StackHeader onPressBack={() => navigation.goBack()} bgColor="primary" title="Listings" />

      <Box style={styles.lowerContainer}>
        <Box style={styles.userProfile}>
          <Box>
            <Text variant="b1" color="text" mb="m">
              Welcome,
            </Text>
            <Text variant="h2" color="dark">
              {user.full_name}
            </Text>
          </Box>
          {data && data.length > 0 && (
            <>
              <Box style={{ flex: 1 }} />
              <TouchableOpacity onPress={() => navigation.navigate('NewListingInfo')}>
                <Icon name="plus-circle" size={34} color={theme.colors.veryLightPurple} />
              </TouchableOpacity>
            </>
          )}
        </Box>

        {isLoading || deleteLoading ? (
          <Box style={{ marginTop: hp(30) }}>
            <ActivityIndicator />
          </Box>
        ) : (
          <Box
            mt="xl"
            style={{
              paddingBottom: 100,
              width: theme.constants.screenWidth,
              height: hp(75),
            }}>
            <FlatList
              data={data}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              ListEmptyComponent={() => (
                <>
                  <Box style={styles.image}>
                    <RNImage
                      source={require('../../../assets/images/underConstruction.png')}
                      style={{ width: 323.6, height: 216.5 }}
                    />

                    <Text mt="l" variant="h1" color="dark">
                      Lets set up your listing
                    </Text>

                    <Text mt="l" mb="xxl" variant="h3" color="text">
                      List your home in a few steps
                    </Text>

                    <Button
                      type="purple"
                      onPress={() => navigation.navigate('NewListingInfo')}
                      label="Add New Listing"
                      width={theme.constants.screenWidth}
                    />
                  </Box>
                </>
              )}
              renderItem={({ item }) => (
                <View
                  from={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'timing', duration: 750 }}>
                  <FavoriteItem
                    listing={item}
                    bgColor="secondary"
                    onPressButton={() => handleRemoveListing(item.id)}
                    showVerified
                  />
                </View>
              )}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MyListings;
