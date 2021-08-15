/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState, useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Feather as Icon } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import { Box, theme, Text } from '../../components';
import ProfileItem from '../../components/ProfileItem';
import { ProfileNavParamList } from '../../types/navigation.types';
import firebaseAuthApi from '../../firebase/auth';
import { CommonActions } from '@react-navigation/routers';
import Logo from '../../svg/logo';
import store from '../../utils/storage';
import firebase from 'firebase';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
    flex: 1,
    paddingHorizontal: theme.constants.screenPadding / 2,
    paddingTop: theme.constants.screenPadding,
    alignItems: 'center',
  },
  profileImg: {
    width: wp(30),
    height: wp(30),
    borderRadius: wp(15),
    alignSelf: 'center',
    marginTop: hp(5),
    zIndex: 1,
  },
  svg: {
    position: 'absolute',
    marginTop: hp(15),
  },
  lowerContainer: {
    marginTop: hp(10),
    width: '100%',
    alignItems: 'center',
  },
  noLoginContainer: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
});

const Profile = ({ navigation }: StackScreenProps<ProfileNavParamList, 'Profile'>) => {
  const [userDetails, setUserDetails] = useState<any>({});

  const fetchUserDetails = async () => {
    const user = await store.getData('user');
    if (user) {
      setUserDetails(JSON.parse(user));
    }
  };

  useEffect(() => {
    void fetchUserDetails();
  }, []);

  const handleAuth = async () => {
    try {
      if (userDetails.id) {
        await firebaseAuthApi.logOutUser();
        await store.storeData('user', JSON.stringify({}));
        navigation.dispatch(
          CommonActions.navigate({
            name: 'Home',
          }),
        );
        Toast.show({
          type: 'success',
          visibilityTime: 2000,
          autoHide: true,
          text1: 'Logout Success',
          text2: 'You have been succesfully logged out',
        });
      } else {
        navigation.navigate('Login');
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        visibilityTime: 5000,
        autoHide: true,
        text1: 'Logout Error',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        text2: error.message,
      });
    }
  };

  return (
    <Box style={styles.container}>
      {userDetails.id ? (
        <>
          <Box style={{ alignItems: 'center' }}>
            <Text variant="b1" color="dark" mt="xl">
              Logged in as:
            </Text>

            <Text variant="h1M" color="dark" mt="xl">
              {userDetails.full_name}
            </Text>

            <Text variant="b2" color="lightGrey" mt="m">
              {userDetails.email}
            </Text>

            <Text variant="b2" color="lightGrey" mt="m">
              {userDetails.phoneNumber}
            </Text>
          </Box>
        </>
      ) : (
        <Box style={styles.noLoginContainer}>
          <Logo width={147.2} height={94} />
        </Box>
      )}

      <Box style={styles.lowerContainer}>
        {userDetails.id && (
          <ProfileItem
            icon={<Icon name="user" color={theme.colors.veryLightPurple} size={24} />}
            label="My Account"
            onPress={() => navigation.navigate('EditAccount')}
          />
        )}

        <ProfileItem
          icon={<Icon name="home" color={theme.colors.veryLightPurple} size={24} />}
          label="My Listings"
          onPress={() => {
            if (userDetails.id) {
              navigation.navigate('MyListings');
            } else {
              Toast.show({
                type: 'info',
                position: 'top',
                visibilityTime: 2000,
                autoHide: true,
                text1: 'Login required',
                text2: 'Please login/sign up to access listings',
              });
            }
          }}
        />

        {/* <ProfileItem
          icon={<Icon name="info" color={theme.colors.veryLightPurple} size={24} />}
          label="About"
          onPress={() => navigation.navigate('About')}
        /> */}

        <ProfileItem
          icon={<Icon name="book" color={theme.colors.veryLightPurple} size={24} />}
          label="Terms & Conditions"
          onPress={() => navigation.navigate('Terms')}
        />

        <ProfileItem
          icon={
            <Icon
              name={userDetails.id ? 'log-out' : 'log-in'}
              color={userDetails.id ? theme.colors.red : theme.colors.green}
              size={24}
            />
          }
          label={userDetails.id ? 'Logout' : 'Login/Register'}
          onPress={handleAuth}
        />

        <Text variant="b1" color="dark" marginVertical="xl">
          Version: 1.1.0
        </Text>
      </Box>
    </Box>
  );
};

export default Profile;
