import React from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { Box, ProductCard, StackHeader, theme } from '../components';
import { HomeNavParamList, Product } from '../../types';
import { products } from '../data';
import { CARD_MARGIN } from '../components/card/ProductCard';
import { TouchableOpacity } from 'react-native-gesture-handler';

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

interface FavoritesProps {
  product: Product;
}

const Favorites = ({
  navigation,
}: StackScreenProps<HomeNavParamList, 'Favorites'>) => {
  return (
    <SafeAreaView style={styles.container}>
      <StackHeader title="Favorite Products" back={() => navigation.goBack()} />
      <Box style={styles.products}>
        <Box>
          <FlatList
            numColumns={2}
            showsVerticalScrollIndicator={false}
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('ProductDetail', { product: item })
                }
              >
                <ProductCard
                  product={item}
                  trash={() => alert('Delete Item')}
                />
              </TouchableOpacity>
            )}
          />
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default Favorites;
