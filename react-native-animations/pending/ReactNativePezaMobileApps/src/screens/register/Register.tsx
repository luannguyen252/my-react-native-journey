/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, KeyboardAvoidingView, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';
import { Formik } from 'formik';
import Toast from 'react-native-toast-message';
import * as yup from 'yup';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { theme, Box, Text } from '../../components';
import TextInput from '../../components/TextInput/TextInput';
import Button from '../../components/Button/Button';
import { CommonActions } from '@react-navigation/native';
import { ProfileNavParamList } from '../../types/navigation.types';
import ActivityIndicator from '../../components/ActivityIndicator';
import firebaseAuthApi from '../../firebase/auth';
import store from '../../utils/storage';
import firebase from 'firebase';
import authApi from '../../firebase/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.secondary,
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: theme.constants.screenWidth,
    marginTop: theme.constants.screenPadding,
  },
  headingContainer: {
    flexDirection: 'row',
    width: theme.constants.screenWidth,
    marginVertical: hp(3),
  },
  formContainer: {
    height: hp(40),
    justifyContent: 'space-between',
  },
  termsOfUseContainer: {
    alignItems: 'center',
    marginBottom: hp(3),
  },
});

const Register = ({ navigation }: StackScreenProps<ProfileNavParamList, 'Register'>) => {
  const [loading, setLoading] = useState<boolean>(false);

  const registerSchema = yup.object().shape({
    fullName: yup.string().min(2).required(),
    email: yup.string().email().required(),
    phone: yup.string().min(10).required(),
    password: yup.string().required(),
  });

  interface RegisterProps {
    fullName: string;
    email: string;
    password: string;
    phone: string;
  }

  const onSubmit = async (values: RegisterProps) => {
    try {
      setLoading(true);
      await firebaseAuthApi.registerUser(
        values.email,
        values.password,
        values.fullName,
        values.phone,
      );
      const user = firebase.auth().currentUser;
      if (user) {
        const userDetails = await authApi.getUsersFullDetails(user.uid);
        const data = {
          id: user.uid,
          full_name: user.displayName,
          email: user.email,
          phoneNumber: userDetails?.phone,
        };
        await store.storeData('user', JSON.stringify(data));
      }
      navigation.dispatch(
        CommonActions.navigate({
          name: 'Home',
        }),
      );
      // navigation.navigate('Profile');
      setLoading(false);
      Toast.show({
        type: 'success',
        visibilityTime: 2000,
        autoHide: true,
        text1: 'Registeration Success',
        text2: 'You have been successfully registered',
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      Toast.show({
        type: 'error',
        visibilityTime: 5000,
        autoHide: true,
        text1: 'Sign up Error',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        text2: error.message,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator visible={loading} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={{ fullName: '', email: '', phone: '', password: '' }}
          validationSchema={registerSchema}
          onSubmit={onSubmit}>
          {({ errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <>
              <KeyboardAvoidingView behavior="position">
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.goBack()}
                  style={styles.backContainer}>
                  <Icon name="chevron-left" size={20} color={theme.colors.dark} />
                  <Text variant="h2B" color="dark">
                    Back
                  </Text>
                </TouchableOpacity>
                <Box style={styles.headingContainer}>
                  <Text variant="h1Max" color="dark">
                    Create Account
                  </Text>
                </Box>
                <Box style={styles.formContainer}>
                  <TextInput
                    placeholder="Full Name"
                    onChangeText={handleChange('fullName')}
                    onBlur={handleBlur('fullName')}
                    touched={touched.fullName}
                    error={errors.fullName}
                    keyboardType="default"
                    autoCapitalize="words"
                    autoCompleteType="name"
                  />
                  <TextInput
                    placeholder="Email"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    touched={touched.email}
                    error={errors.email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoCompleteType="email"
                  />
                  <TextInput
                    placeholder="Phone Number"
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    touched={touched.phone}
                    error={errors.phone}
                    keyboardType="phone-pad"
                    autoCapitalize="none"
                    autoCompleteType="tel"
                  />
                  <TextInput
                    placeholder="Password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    touched={touched.password}
                    error={errors.password}
                    keyboardType="default"
                    autoCapitalize="none"
                    secured={true}
                  />
                </Box>
              </KeyboardAvoidingView>
              <Box style={{ height: hp(10) }} />
              <Box mb="xxxl">
                <Button
                  label="Complete Registeration"
                  onPress={handleSubmit}
                  type="primary"
                  width={theme.constants.screenWidth}
                />
              </Box>
            </>
          )}
        </Formik>
        <Box style={styles.termsOfUseContainer}>
          <Text variant="b1" color="text">
            By creating an account you agree with our
          </Text>
          <TouchableOpacity onPress={() => true}>
            <Text mt="s" variant="b1" color="primary">
              Terms of Use and Privacy Policy
            </Text>
          </TouchableOpacity>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
