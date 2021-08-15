/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Feather as Icon } from '@expo/vector-icons';
import { Image } from 'react-native-expo-image-cache';
import * as Linking from 'expo-linking';

import { Box, theme, Text } from '../../components';
import { StackHeader } from '../../components/StackHeader';
import { HomeNavParamList } from '../../types/navigation.types';
import { Listing } from '../../components/ListingItem';
import ProfileSvg from './profileSvg';
import agentsApi from '../../firebase/agent';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
    flex: 1,
  },
  profileImg: {
    width: wp(30),
    height: wp(30),
    borderRadius: wp(15),
    alignSelf: 'center',
    marginTop: hp(5),
    zIndex: 1,
  },
  contactContainer: {
    flexDirection: 'row',
    width: wp(25),
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(3),
    marginBottom: hp(4),
  },
  contactItem: {
    backgroundColor: theme.colors.white,
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  svg: {
    position: 'absolute',
    marginTop: hp(8),
  },
});

// interface AgentDetailProps {}

const AgentDetail = ({ navigation, route }: StackScreenProps<HomeNavParamList, 'AgentDetail'>) => {
  const { full_name, email, phone, whatsapp_link, avatar, id } = route.params.agent;

  const [data, setData] = useState<any[]>([]);

  const loadData = async () => {
    const result = await agentsApi.getAllAgentListings(id);
    if (result) setData(result);
  };

  useEffect(() => {
    void loadData();
    return () => {
      void loadData();
    };
  }, []);

  return (
    <Box style={styles.container}>
      <StackHeader onPressBack={() => navigation.goBack()} padding />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginHorizontal: theme.constants.screenPadding / 2 }}>
        <Box style={{ alignItems: 'center' }}>
          <Box style={styles.profileImg}>
            <Image
              {...{ uri: avatar }}
              style={{
                width: wp(30),
                height: wp(30),
                borderRadius: wp(15),
                zIndex: 1,
              }}
              transitionDuration={300}
              tint="light"
            />
          </Box>

          <Box style={styles.svg}>
            <ProfileSvg />
          </Box>

          <Text variant="h1M" color="dark" mt="xl">
            {full_name}
          </Text>

          <Text variant="b2" color="lightGrey" mt="m">
            {email}
          </Text>

          <Box style={styles.contactContainer}>
            <TouchableOpacity
              style={styles.contactItem}
              onPress={() => Linking.openURL(`tel:${phone}`)}>
              <Icon name="phone" color={theme.colors.veryLightPurple} size={24} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Linking.openURL(whatsapp_link !== '' ? whatsapp_link : '')}
              style={styles.contactItem}>
              <Icon name="message-circle" color={theme.colors.veryLightPurple} size={24} />
            </TouchableOpacity>
          </Box>
        </Box>

        <Text variant="h1" color="dark" marginVertical="xl">
          Listings
        </Text>

        {data && data.length > 0 ? (
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Listing
                listing={item}
                onPress={() => navigation.navigate('ListingDetail', { listing: item })}
              />
            )}
          />
        ) : (
          <Text variant="h2B" color="dark" mt="xxl" style={{ alignSelf: 'center' }}>
            No listings posted yet
          </Text>
        )}
      </ScrollView>
    </Box>
  );
};

export default AgentDetail;
