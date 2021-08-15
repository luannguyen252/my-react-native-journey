/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { FlatList, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';
import firebase from 'firebase';
import { View } from 'moti';

import { Box, theme, Text } from '../../components';
import { FavoriteItem } from '../../components/FavoriteItem';
import Status from '../../components/Status';
import { removeFavorite } from '../../redux/actions';
import { IListingFavorite } from '../../types/listing.type';
import { FavoritesNavParamList } from '../../types/navigation.types';
import favoritesApi from '../../firebase/favorite';
import ActivityIndicator from '../../components/ActivityIndicator';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    flex: 1,
    paddingTop: theme.constants.screenPadding,
    alignItems: 'center',
  },
});

// interface favoritesProps {}
const favorites = ({ navigation }: StackScreenProps<FavoritesNavParamList, 'Favorite'>) => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadFavorites = async () => {
    setIsLoading(true);
    const favs = await favoritesApi.getUserFavorites(user ? user.uid : '');
    setFavorites(favs);
    setIsLoading(false);
  };

  const user = firebase.auth().currentUser;

  const dispatch = useDispatch();

  const removeFromFavorite = (favorite: IListingFavorite) => {
    dispatch(removeFavorite(favorite));
  };

  const handleRemoveFavorite = async (favorite: IListingFavorite) => {
    removeFromFavorite(favorite);
    Toast.show({
      type: 'success',
      position: 'top',
      visibilityTime: 2000,
      autoHide: true,
      text1: 'Favorites',
      text2: 'Successfully removed from favorites.',
    });
    await loadFavorites();
  };

  useEffect(() => {
    void loadFavorites();
  }, []);

  return (
    <Box style={styles.container}>
      <ActivityIndicator visible={isLoading} opacity={1} />
      <Text variant="h1" mb="xl" ml="xl" style={{ alignSelf: 'flex-start' }}>
        Favorites
      </Text>
      {!user?.uid ? (
        <View
          from={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 750 }}>
          <Status
            image={require('../../../assets/images/noLogin.png')}
            text="Login to add favorites"
            onPress={false}
            bgColor="white"
          />
        </View>
      ) : (
        <Box
          mt="xl"
          style={{
            paddingBottom: 100,
            width: theme.constants.screenWidth,
            height: hp(75),
          }}>
          <FlatList
            data={favorites}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={() => (
              <View
                from={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'timing', duration: 750 }}
                style={{ alignItems: 'center' }}>
                <Status
                  image={require('../../../assets/images/noContent.png')}
                  text="Sorry, you have no favorites"
                  onPress={false}
                  bgColor="white"
                />
              </View>
            )}
            renderItem={({ item }) => (
              <View
                from={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'timing', duration: 750 }}>
                <FavoriteItem
                  listing={item}
                  bgColor="secondary"
                  onPressButton={() => handleRemoveFavorite(item)}
                  onPress={() => navigation.navigate('ListingDetail', { listing: item })}
                />
              </View>
            )}
          />
        </Box>
      )}
    </Box>
  );
};

export default favorites;
