/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import * as yup from 'yup';
import Toast from 'react-native-toast-message';
import { Formik } from 'formik';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import TextInput from '../../components/TextInput/TextInput';
import Button from '../../components/Button/Button';
import authApi from '../../firebase/auth';
import { theme } from '../../components';
import { StackScreenProps } from '@react-navigation/stack';
import { ProfileNavParamList } from '../../types/navigation.types';
import { StackHeader } from '../../components/StackHeader';

const WIDTH = 1200;
const HEIGHT = 995;
const FACTOR = 3.5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingTop: hp(10),
  },
  header: {
    fontFamily: 'SofiaPro-Bold',
    fontSize: wp(6),
    color: theme.colors.dark,
    marginBottom: hp(3),
  },
  buttonContainer: {
    marginTop: hp(2.5),
  },
});

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email().required(),
});

const ForgotPassword = ({
  navigation,
}: StackScreenProps<ProfileNavParamList, 'ForgotPassword'>) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (values: any, handleReset?: any) => {
    try {
      setLoading(true);
      await authApi.sendResetPasswordEmail(values.email);
      handleReset({
        values: {
          email: '',
        },
      });
      setLoading(false);
      Toast.show({
        type: 'success',
        visibilityTime: 2000,
        autoHide: true,
        text1: 'Success',
        text2: 'Reset email sent successfully',
      });
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        visibilityTime: 3000,
        autoHide: true,
        text1: 'Error',
        text2: 'Error sending reset email',
      });
    }
  };

  return (
    <>
      <StackHeader onPressBack={() => navigation.goBack()} padding bgColor="white" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../../../assets/images/forgotPassword.png')}
            style={{ width: WIDTH / FACTOR, height: HEIGHT / FACTOR }}
          />
          <Text style={styles.header}>Forgot Password?</Text>
          <Formik
            initialValues={{ email: '' }}
            validationSchema={forgotPasswordSchema}
            onSubmit={onSubmit}>
            {({ errors, touched, handleChange, handleBlur, values, handleReset }) => (
              <>
                <TextInput
                  placeholder="Enter your email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="default"
                  touched={touched.email}
                  error={errors.email}
                  value={values.email}
                  bgColor={theme.colors.secondary}
                />
                <View style={styles.buttonContainer}>
                  <Button
                    label="Recover password"
                    type="primary"
                    onPress={() => onSubmit(values, handleReset)}
                    width={theme.constants.screenWidth}
                    loading={loading}
                  />
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </>
  );
};

export default ForgotPassword;
