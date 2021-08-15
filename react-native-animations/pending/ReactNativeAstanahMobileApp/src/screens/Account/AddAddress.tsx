// TODO
// Check KeyBoardAvoidingView, it removes the header when activated

import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import * as Yup from 'yup';
import { Formik } from 'formik';

import { AccountNavParamList } from '../../../types';
import {
  Box,
  Button,
  StackHeader,
  Text,
  TextInput,
  theme,
} from '../../components';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    flex: 1,
  },
  form: {
    alignItems: 'center',
    marginTop: 15,
  },
});

interface AddAddressProps {}

const { height } = Dimensions.get('window');

const AddressSchema = Yup.object().shape({
  firstName: Yup.string().min(2).max(50),
  lastName: Yup.string().min(2).max(50),
  streetAddress: Yup.string().min(2).max(50),
  city: Yup.string().min(2).max(50),
  state: Yup.string().min(2).max(50),
  zipcode: Yup.string().min(2).max(50),
  phone: Yup.string().min(2).max(50),
});

const AddAddress = ({
  navigation,
}: StackScreenProps<AccountNavParamList, 'AddAddress'>) => {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'position' : 'height'}
      >
        <StackHeader title="Add Address" back={() => navigation.goBack()} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          decelerationRate={16}
          bounces={false}
        >
          <Formik
            validationSchema={AddressSchema}
            initialValues={{
              firstName: '',
              lastName: '',
              streetAddress: '',
              city: '',
              state: '',
              zipcode: '',
              phone: '',
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
              <Box style={{ height: height * 1.35 }}>
                <Text
                  variant="h5"
                  color="primary"
                  marginLeft="xl"
                  marginTop="xl"
                >
                  First Name
                </Text>
                <Box style={styles.form}>
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="default"
                    textContentType="name"
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    error={errors.firstName}
                    touched={touched.firstName}
                  />
                  {errors && (
                    <Text variant="b3" color="red">
                      {errors.firstName}
                    </Text>
                  )}
                </Box>
                <Text variant="h5" color="primary" marginLeft="xl">
                  Last Name
                </Text>
                <Box style={styles.form}>
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="default"
                    textContentType="name"
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                    error={errors.lastName}
                    touched={touched.lastName}
                  />
                  {errors && (
                    <Text variant="b3" color="red">
                      {errors.lastName}
                    </Text>
                  )}
                </Box>
                <Text variant="h5" color="primary" marginLeft="xl">
                  Street Address
                </Text>
                <Box style={styles.form}>
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="default"
                    textContentType="streetAddressLine1"
                    onChangeText={handleChange('streetAddress')}
                    onBlur={handleBlur('streetAddress')}
                    error={errors.streetAddress}
                    touched={touched.streetAddress}
                    multiline
                  />
                  {errors && (
                    <Text variant="b3" color="red">
                      {errors.streetAddress}
                    </Text>
                  )}
                </Box>
                <Text variant="h5" color="primary" marginLeft="xl">
                  City
                </Text>
                <Box style={styles.form}>
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="default"
                    textContentType="addressCity"
                    onChangeText={handleChange('city')}
                    onBlur={handleBlur('city')}
                    error={errors.city}
                    touched={touched.city}
                  />
                  {errors && (
                    <Text variant="b3" color="red">
                      {errors.city}
                    </Text>
                  )}
                </Box>
                <Text variant="h5" color="primary" marginLeft="xl">
                  State/Province/Region
                </Text>
                <Box style={styles.form}>
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="default"
                    textContentType="addressState"
                    onChangeText={handleChange('state')}
                    onBlur={handleBlur('state')}
                    error={errors.state}
                    touched={touched.state}
                  />
                  {errors && (
                    <Text variant="b3" color="red">
                      {errors.state}
                    </Text>
                  )}
                </Box>
                <Text variant="h5" color="primary" marginLeft="xl">
                  Zip Code
                </Text>
                <Box style={styles.form}>
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="default"
                    textContentType="postalCode"
                    onChangeText={handleChange('zipcode')}
                    onBlur={handleBlur('zipcode')}
                    error={errors.zipcode}
                    touched={touched.zipcode}
                  />
                  {errors && (
                    <Text variant="b3" color="red">
                      {errors.zipcode}
                    </Text>
                  )}
                </Box>
                <Text variant="h5" color="primary" marginLeft="xl">
                  Phone Number
                </Text>
                <Box style={styles.form}>
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="name-phone-pad"
                    textContentType="telephoneNumber"
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    error={errors.phone}
                    touched={touched.phone}
                  />
                  {errors && (
                    <Text variant="b3" color="red">
                      {errors.phone}
                    </Text>
                  )}
                </Box>
                <Box style={styles.form}>
                  <Button label="Add Address" onPress={handleSubmit} />
                </Box>
              </Box>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddAddress;
