import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { ExploreNavParamList } from '../../types';
import { Box, theme, HomeCategory, HomeHeader, Text } from '../components';
import { categories } from '../data';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 20,
    marginLeft: 20,
    width: width - 40,
  },
});

interface ExploreProps {}

const Explore = ({
  navigation,
}: StackScreenProps<ExploreNavParamList, 'Explore'>) => {
  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader
        favorite={() => navigation.navigate('Favorites')}
        notification={() => navigation.navigate('Notifications')}
      />
      <ScrollView decelerationRate={16} showsVerticalScrollIndicator={false}>
        <Text variant="h4" color="primary" marginLeft="xl" marginTop="xl">
          Main Categories
        </Text>
        <Box style={styles.categories}>
          {categories.map((category) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CategoryDetail', { category: category })
              }
            >
              <HomeCategory
                margin={13}
                key={category.id.toString()}
                category={category}
              />
            </TouchableOpacity>
          ))}
        </Box>
        <Text variant="h4" color="primary" marginLeft="xl">
          Other Categories
        </Text>
        <Box style={styles.categories}>
          {categories.map((category) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CategoryDetail', { category: category })
              }
            >
              <HomeCategory
                margin={13}
                key={category.id.toString()}
                category={category}
              />
            </TouchableOpacity>
          ))}
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Explore;
