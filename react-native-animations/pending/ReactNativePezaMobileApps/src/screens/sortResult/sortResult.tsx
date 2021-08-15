/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { View } from 'moti';

import { Box, theme, Text } from '../../components';
import { SortNavParamList } from '../../types/navigation.types';
import { StackHeader } from '../../components/StackHeader';
import { Listing } from '../../components/ListingItem';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
    flex: 1,
    alignItems: 'center',
    paddingBottom: 50,
  },
});

const SortResult = ({ navigation, route }: StackScreenProps<SortNavParamList, 'SortResult'>) => {
  return (
    <Box style={styles.container}>
      <StackHeader onPressBack={() => navigation.goBack()} padding title="Search Result" />

      <Box style={{ width: '100%', marginTop: 20, alignItems: 'center' }}>
        <FlatList
          data={route.params.listings}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={() => (
            <Text mt="xxxl" variant="b1B" color="dark">
              No listing found matching your search
            </Text>
          )}
          renderItem={({ item }) => (
            <View
              from={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: 'timing',
                duration: 750,
              }}>
              <Listing
                width={theme.constants.screenWidth}
                listing={item}
                onPress={() => navigation.navigate('ListingDetail', { listing: item })}
              />
            </View>
          )}
        />
      </Box>
    </Box>
  );
};

export default SortResult;
