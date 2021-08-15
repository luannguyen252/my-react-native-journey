import React from 'react';
import {
  StyleSheet,
  Animated,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import { StackScreenProps } from '@react-navigation/stack';

import {
  Box,
  HomeHeader,
  theme,
  BannerSlider,
  Text,
  HomeLink,
  Banner,
  ProductCard,
  HomeCategory,
} from '../components';
import { SLIDE_HEIGHT } from '../components/home/BannerSlider';
import { CARD_MARGIN } from '../components/card/ProductCard';
import { categories, products } from '../data';
import { HomeNavParamList } from '../../types';
import { HEADER_HEIGHT } from '../components/home/HomeHeader';
import homeBanners from '../data/homeBanner';

const NEW_HEADER_HEIGHT = HEADER_HEIGHT + Constants.statusBarHeight;
const CARD_WIDTH = 141;
const CARD_HEIGHT = 238;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  banner: {
    marginTop: NEW_HEADER_HEIGHT,
    marginBottom: 30,
    height: SLIDE_HEIGHT,
    alignItems: 'center',
  },
  linkText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: theme.spacing.xl,
    paddingRight: theme.spacing.xl,
    marginBottom: 15,
  },
  products: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: theme.spacing.xl,
    marginTop: 20,
    marginRight: -CARD_MARGIN,
    paddingBottom: 30,
  },
});

interface HomeProps {}

const Home = ({ navigation }: StackScreenProps<HomeNavParamList, 'Home'>) => {
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, NEW_HEADER_HEIGHT);
  const translateY = diffClamp.interpolate({
    inputRange: [0, NEW_HEADER_HEIGHT],
    outputRange: [0, -NEW_HEADER_HEIGHT],
  });
  return (
    <SafeAreaView style={styles.container}>
      <Box>
        <Animated.View
          style={{
            zIndex: 1000,
            elevation: 1000,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            transform: [{ translateY: translateY }],
          }}
        >
          <HomeHeader
            favorite={() => navigation.navigate('Favorites')}
            notification={() => navigation.navigate('Notifications')}
          />
        </Animated.View>
        <Animated.ScrollView
          scrollEventThrottle={16}
          bounces={false}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { y: scrollY } },
              },
            ],
            { useNativeDriver: false }
          )}
        >
          <Box style={styles.banner}>
            <BannerSlider banners={homeBanners} />
          </Box>
          <Box style={styles.linkText}>
            <Text variant="h5" color="primary">
              Category
            </Text>
            <Box style={{ flex: 1 }} />
            <HomeLink
              label="All categories"
              onPress={() => navigation.navigate('Categories')}
            />
          </Box>
          <Box
            style={{
              marginBottom: 15,
              alignItems: 'center',
              paddingLeft: 20,
              marginRight: 20,
            }}
          >
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={categories}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('CategoryDetail', { category: item })
                  }
                >
                  <HomeCategory category={item} />
                </TouchableOpacity>
              )}
            />
          </Box>
          <Box style={styles.linkText}>
            <Text variant="h5" color="primary">
              Sale
            </Text>
            <Box style={{ flex: 1 }} />
            <HomeLink
              label="See more"
              onPress={() => navigation.navigate('Sale')}
            />
          </Box>
          <Box style={{ paddingLeft: 20, paddingRight: 20 }}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={products}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProductDetail', { product: item })
                  }
                >
                  <ProductCard
                    product={item}
                    width={CARD_WIDTH}
                    height={CARD_HEIGHT}
                    noRating
                    marginRight={20}
                  />
                </TouchableOpacity>
              )}
            />
          </Box>
          <Box
            style={{ alignItems: 'center', marginRight: -20, marginTop: 20 }}
          >
            <Banner image={require('../../assets/offer/offer1.jpg')} margin />
          </Box>
          <Box style={styles.products}>
            {products.map((product, index) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProductDetail', { product: product })
                  }
                >
                  <ProductCard key={index} product={product} />
                </TouchableOpacity>
              );
            })}
          </Box>
        </Animated.ScrollView>
      </Box>
    </SafeAreaView>
  );
};

export default Home;

// TODO
// Refactor linkText to its own component
// Consider using flatlist to render home page for performance reasons
