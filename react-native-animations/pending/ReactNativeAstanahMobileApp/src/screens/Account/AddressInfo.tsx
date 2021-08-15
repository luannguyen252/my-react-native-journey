import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AccountNavParamList } from '../../../types';

import {
  AddressItem,
  Box,
  Button,
  StackHeader,
  Text,
  theme,
} from '../../components';
import { addresses } from '../../data';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
  },
});

interface AddressInfoProps {}

const AddressInfo = ({
  navigation,
}: StackScreenProps<AccountNavParamList, 'AddressInfo'>) => {
  return (
    <SafeAreaView style={styles.container}>
      <Box style={{ alignItems: 'center' }}>
        <StackHeader title="Address" back={() => navigation.goBack()} />
        <Box
          marginTop="s"
          marginBottom="m"
          style={{ height: '75%', paddingBottom: 10 }}
        >
          <ScrollView
            decelerationRate={16}
            showsVerticalScrollIndicator={false}
          >
            {addresses.map((address, index) => (
              <AddressItem
                key={index}
                address={address}
                trash={() => alert('Trash')}
              />
            ))}
          </ScrollView>
        </Box>
        <Button
          label="Add Address"
          onPress={() => navigation.navigate('AddAddress')}
        />
      </Box>
    </SafeAreaView>
  );
};

export default AddressInfo;
