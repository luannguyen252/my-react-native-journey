import React from 'react';
import { StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import * as Yup from 'yup';
import { Formik } from 'formik';

import {
  Box,
  Button,
  StackHeader,
  Text,
  TextInput,
  theme,
} from '../../components';
import { StackScreenProps } from '@react-navigation/stack';
import { AccountNavParamList } from '../../../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  form: {
    alignItems: 'center',
    marginTop: 15,
  },
});

interface PasswordProps {}

const { height } = Dimensions.get('window');

const PasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().min(4).max(50).required(),
  newPassword: Yup.string().min(4).max(50).required(),
  newPasswordAgain: Yup.string().min(4).max(50).required(),
});

const Password = ({
  navigation,
}: StackScreenProps<AccountNavParamList, 'Password'>) => {
  return (
    <SafeAreaView style={styles.container}>
      <StackHeader title="Change Password" back={() => navigation.goBack()} />
      <Formik
        validationSchema={PasswordSchema}
        initialValues={{
          oldPassword: '',
          newPassword: '',
          newPasswordAgain: '',
        }}
        onSubmit={(values) => console.log(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <Box style={{ height }}>
            <Text variant="h5" color="primary" marginLeft="xl" marginTop="xl">
              Old Password
            </Text>
            <Box style={styles.form}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                icon="lock"
                onChangeText={handleChange('oldPassword')}
                onBlur={handleBlur('oldPassword')}
                error={errors.oldPassword}
                touched={touched.oldPassword}
              />
              {errors && (
                <Text variant="b3" color="red">
                  {errors.oldPassword}
                </Text>
              )}
            </Box>
            <Text variant="h5" color="primary" marginLeft="xl">
              New Password
            </Text>
            <Box style={styles.form}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                icon="lock"
                onChangeText={handleChange('newPassword')}
                onBlur={handleBlur('newPassword')}
                error={errors.newPassword}
                touched={touched.newPassword}
              />
              {errors && (
                <Text variant="b3" color="red">
                  {errors.newPassword}
                </Text>
              )}
            </Box>
            <Text variant="h5" color="primary" marginLeft="xl">
              New Password Again
            </Text>
            <Box style={styles.form}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                icon="lock"
                onChangeText={handleChange('newPasswordAgain')}
                onBlur={handleBlur('newPasswordAgain')}
                error={errors.newPasswordAgain}
                touched={touched.newPasswordAgain}
              />
              {errors && (
                <Text variant="b3" color="red">
                  {errors.newPasswordAgain}
                </Text>
              )}
            </Box>
            <Box style={[styles.form, { marginTop: height * 0.23 }]}>
              <Button label="Save" onPress={handleSubmit} />
            </Box>
          </Box>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default Password;
