import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { HomeNavParamList, Product } from '../../types';

import { Banner, Box, StackHeader, theme } from '../components';
import { products } from '../data';
import ProductCard, { CARD_MARGIN } from '../components/card/ProductCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  products: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: theme.spacing.xl,
    marginTop: 20,
    marginBottom: 80,
  },
});

interface SaleProps {
  product: Product;
}

const Sale = ({ navigation }: StackScreenProps<HomeNavParamList>) => {
  return (
    <SafeAreaView style={styles.container}>
      <Box>
        <StackHeader title="Sales" back={() => navigation.goBack()} />
        <ScrollView
          scrollEventThrottle={16}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <Box style={{ alignItems: 'center', marginTop: 20 }}>
            <Banner
              image={require('../../assets/offer/offer4.jpg')}
              margin={false}
            />
          </Box>
          <Box style={styles.products}>
            {products.map((product) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProductDetail', { product: product })
                  }
                >
                  <ProductCard key={product.id} product={product} />
                </TouchableOpacity>
              );
            })}
          </Box>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
};

export default Sale;
