/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState, useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import firebase from 'firebase';
import * as yup from 'yup';
import { Formik } from 'formik';
import { CommonActions } from '@react-navigation/routers';
import Toast from 'react-native-toast-message';

import { Box, theme } from '../../components';
import { Button } from '../../components/Button';
import { StackHeader } from '../../components/StackHeader';
import TextInput from '../../components/TextInput';
import { ProfileNavParamList } from '../../types/navigation.types';
import ActivityIndicator from '../../components/ActivityIndicator';
import storage from '../../utils/storage';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
    flex: 1,
    alignItems: 'center',
  },
  profileImg: {
    width: wp(30),
    height: wp(30),
    borderRadius: wp(15),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(5),
    zIndex: 1,
  },
  svg: {
    position: 'absolute',
    marginTop: hp(10),
  },
  inputContainer: {
    justifyContent: 'space-between',
    height: 130,
  },
});

const EditAccount = ({ navigation }: StackScreenProps<ProfileNavParamList, 'EditAccount'>) => {
  const userData = firebase.auth().currentUser;

  const [userDetails, setUserDatails] = useState<any>({});

  const getUser = async () => {
    const user = await storage.getData('user');
    if (user) {
      setUserDatails(JSON.parse(user));
    }
  };

  const [loading, setLoading] = useState<boolean>(false);

  const updateAccountSchema = yup.object().shape({
    full_name: yup.string(),
    email: yup.string().email(),
    phone: yup.string(),
  });

  const avatarUpdate = async (values: any) => {
    try {
      const userRef = firebase.firestore().collection('user').doc(userData?.uid);
      setLoading(true);
      const data = {
        full_name: values.full_name ? values.full_name : userDetails.full_name,
        phone: values.phone ? values.phone : userDetails.phoneNumber,
      };
      const storageData = {
        id: userDetails.id,
        full_name: values.full_name ? values.full_name : userDetails.full_name,
        email: userDetails.email,
        phoneNumber: values.phone ? values.phone : userDetails.phoneNumber,
      };
      await storage.storeData('user', JSON.stringify(storageData));
      userData?.updateProfile({
        displayName: values.full_name !== '' ? values.full_name : userData.displayName,
      });
      await userRef.update(data);
      navigation.dispatch(
        CommonActions.navigate({
          name: 'Home',
        }),
      );
      setLoading(false);
      Toast.show({
        type: 'success',
        autoHide: true,
        visibilityTime: 2000,
        text1: 'Account update',
        text2: 'Account updated successfuly',
      });
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        autoHide: true,
        visibilityTime: 2000,
        text1: 'Account update',
        text2: 'Error updating account, try again',
      });
    }
  };

  useEffect(() => {
    void getUser();
  }, []);

  return (
    <Box style={styles.container}>
      <StackHeader onPressBack={() => navigation.goBack()} title="My Account" padding />
      <ActivityIndicator visible={loading} />
      <TouchableOpacity
        activeOpacity={1}
        onPress={Keyboard.dismiss}
        style={{ alignItems: 'center', flex: 1 }}>
        <Formik
          initialValues={{ full_name: '', phone: '' }}
          validationSchema={updateAccountSchema}
          onSubmit={avatarUpdate}>
          {({ errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <>
              <Box mt="xxl" mb="xxl" style={styles.inputContainer}>
                <TextInput
                  placeholder={`Full Name - ${
                    userDetails.full_name ? userDetails.full_name : 'loading...'
                  }`}
                  onChangeText={handleChange('full_name')}
                  onBlur={handleBlur('full_name')}
                  touched={touched.full_name}
                  error={errors.full_name}
                  keyboardType="default"
                  autoCapitalize="words"
                  autoCompleteType="name"
                />

                <TextInput
                  placeholder={`Phone Number - ${
                    userDetails.phoneNumber ? userDetails.phoneNumber : 'loading...'
                  }`}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  touched={touched.phone}
                  error={errors.phone}
                  keyboardType="phone-pad"
                />
              </Box>

              <Button
                type="purple"
                onPress={handleSubmit}
                label="Update Details"
                width={theme.constants.screenWidth}
              />
            </>
          )}
        </Formik>
      </TouchableOpacity>
    </Box>
  );
};

export default EditAccount;
