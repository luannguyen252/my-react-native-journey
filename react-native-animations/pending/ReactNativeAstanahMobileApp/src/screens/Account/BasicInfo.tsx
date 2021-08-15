import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, SafeAreaView, Dimensions } from 'react-native';
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
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  form: {
    alignItems: 'center',
    marginTop: 15,
  },
});

interface BasicInfoProps {}
const { height } = Dimensions.get('window');

const BasicInfoSchema = Yup.object().shape({
  firstName: Yup.string().min(2).max(50),
  lastName: Yup.string().min(2).max(50),
});

const BasicInfo = ({
  navigation,
}: StackScreenProps<AccountNavParamList, 'BasicInfo'>) => {
  return (
    <SafeAreaView style={styles.container}>
      <StackHeader title="Basic Information" back={() => navigation.goBack()} />
      <Formik
        validationSchema={BasicInfoSchema}
        initialValues={{ firstName: '', lastName: '' }}
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
              First Name
            </Text>
            <Box style={styles.form}>
              <TextInput
                placeholder="David"
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
                placeholder="Tionge"
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
            <Box style={[styles.form, { marginTop: height * 0.35 }]}>
              <Button label="Save" onPress={handleSubmit} />
            </Box>
          </Box>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default BasicInfo;
