import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
  TouchableHighlight,
} from 'react-native';

import {
  Box,
  StackHeader,
  theme,
  ProfileHead,
  ListItem,
} from '../../components';
import { StackScreenProps } from '@react-navigation/stack';
import { AccountNavParamList } from '../../../types';
import {
  CardTransferIcon,
  GenderIcon,
  LocationIcon,
  LockIcon,
} from '../../Svg';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});

interface ProfileProps {}

const Profile = ({
  navigation,
}: StackScreenProps<AccountNavParamList, 'Profile'>) => {
  return (
    <SafeAreaView style={styles.container}>
      <Box>
        <StackHeader title="Account" />
        <ProfileHead />
        <ScrollView
          decelerationRate={16}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <TouchableHighlight
            underlayColor={theme.colors.light}
            onPress={() => navigation.navigate('BasicInfo')}
          >
            <ListItem
              label="Basic Information"
              icon={<GenderIcon color={theme.colors.primary} />}
              chevron
            />
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor={theme.colors.light}
            onPress={() => navigation.navigate('AddressInfo')}
          >
            <ListItem
              label="Addresses"
              icon={<LocationIcon color={theme.colors.primary} />}
              chevron
            />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={theme.colors.light}
            onPress={() => navigation.navigate('PaymentInfo')}
          >
            <ListItem
              label="Payments"
              icon={<CardTransferIcon color={theme.colors.primary} />}
              chevron
            />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={theme.colors.light}
            onPress={() => navigation.navigate('Password')}
          >
            <ListItem
              label="Passwords"
              icon={<LockIcon color={theme.colors.primary} />}
              chevron
            />
          </TouchableHighlight>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
};

export default Profile;
