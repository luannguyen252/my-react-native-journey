import React, { useState } from 'react';
import { StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { StackScreenProps } from '@react-navigation/stack';

import theme, { Box, Text } from '../components/Theme';
import {
  Button,
  ErrorMessage,
  Link,
  LoginButton,
  TextInput,
} from '../components';
import { AuthParamList } from '../../types';
import { useAppContext } from '../context/context';
import { CloseEye, Eye } from '../Svg';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
const SCREEN_PADDING = theme.spacing.xl * 2;
const SEPERATOR_TEXT_WIDTH = 60;
const SEPERATOR_WIDTH = (width - SCREEN_PADDING - SEPERATOR_TEXT_WIDTH) / 2;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 72,
    height: 72,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.spacing.s,
    marginBottom: theme.spacing.xl,
  },
  inputs: {
    marginTop: 25,
  },
  button: {
    marginTop: theme.spacing.l,
  },
  seperator: {
    flexDirection: 'row',
    marginTop: theme.spacing.l,
    marginBottom: theme.spacing.l,
  },
});

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(4, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

interface WelcomeProps {}

const Welcome = ({
  navigation,
}: StackScreenProps<AuthParamList, 'Welcome'>) => {
  const [passwordVissible, setPasswordVissible] = useState<boolean>(false);
  const { user, setUserState } = useAppContext();
  const [errorVisible, setErrorVisible] = useState<boolean>(false);
  return (
    <SafeAreaView style={styles.container}>
      <Box style={styles.logo}>
        <Text color="white">Logo</Text>
      </Box>
      <Text variant="h4" color="primary">
        Welcome to Astanah
      </Text>
      <Text variant="b3" color="grey" style={{ marginTop: 10 }}>
        Sign in to continue
      </Text>
      <Formik
        validationSchema={LoginSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => {
          setUserState(true);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <Box style={styles.inputs}>
            <Box style={{ marginBottom: 7 }}>
              <Box>
                <ErrorMessage
                  error="Invalid email and/or password"
                  visible={errorVisible}
                />
              </Box>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                textContentType="emailAddress"
                icon="mail"
                placeholder="Your Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={errors.email}
                touched={touched.email}
              />
            </Box>
            <Box style={{ flexDirection: 'row' }}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={!passwordVissible}
                textContentType="password"
                icon="lock"
                placeholder="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={errors.password}
                touched={touched.password}
              />
              <Box style={{ position: 'absolute', left: width - 80, top: 14 }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setPasswordVissible(!passwordVissible)}
                >
                  {passwordVissible ? (
                    <Eye width={18} />
                  ) : (
                    <CloseEye width={18} />
                  )}
                </TouchableOpacity>
              </Box>
            </Box>
            <Box style={styles.button}>
              <Button label="Sign In" onPress={handleSubmit} />
            </Box>
          </Box>
        )}
      </Formik>
      <Box style={styles.seperator}>
        <Box
          borderBottomWidth={1}
          borderBottomColor="light"
          width={SEPERATOR_WIDTH}
          height={20}
        />
        <Box
          style={{
            marginTop: 10,
            width: SEPERATOR_TEXT_WIDTH,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text variant="h5" color="grey" paddingLeft="m" paddingRight="m">
            OR
          </Text>
        </Box>
        <Box
          borderBottomWidth={1}
          borderBottomColor="light"
          width={SEPERATOR_WIDTH}
          height={20}
        />
      </Box>
      <Box style={{ marginBottom: 10, marginTop: 7 }}>
        <LoginButton type="Google" onPress={() => alert('Login with Google')} />
      </Box>
      <LoginButton
        type="Facebook"
        onPress={() => alert('Login with Facebook')}
      />
      <Box marginTop="l">
        <Link
          label="Forgot password?"
          onPress={() => navigation.navigate('ForgotPassword')}
        />
      </Box>
      <Box style={{ flexDirection: 'row', marginTop: 8 }}>
        <Text variant="b3" color="grey">
          Don't have an account?{' '}
        </Text>
        <Link
          label="Register"
          onPress={() => navigation.navigate('Register')}
        />
      </Box>
    </SafeAreaView>
  );
};

export default Welcome;

// TODO

// Factorize seperator into its own component
