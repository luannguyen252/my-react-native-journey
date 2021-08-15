import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';

import { OfferNavParamList } from '../../types';
import { Box, ProductCard, StackHeader, theme } from '../components';
import { products } from '../data';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  products: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 80,
  },
});

interface OfferDetailProps {}

const OfferDetail = ({
  navigation,
}: StackScreenProps<OfferNavParamList, 'OfferDetail'>) => {
  return (
    <SafeAreaView style={styles.container}>
      <StackHeader title="Offer Products" back={() => navigation.goBack()} />
      <Box style={styles.products}>
        <FlatList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ProductCard product={item} />}
        />
      </Box>
    </SafeAreaView>
  );
};

export default OfferDetail;
