import React, { useRef } from 'react';
import { StyleSheet, Animated, Dimensions } from 'react-native';
// import { Image } from 'react-native-expo-image-cache';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Image } from 'react-native-expo-image-cache';

import { Box, theme, Text } from '..';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  pagination: {
    position: 'absolute',
    top: hp(45),
    width: '100%',
    height: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    marginHorizontal: wp(0.7),
    width: wp(1.4),
    height: wp(1.4),
    borderRadius: wp(0.7),
    backgroundColor: theme.colors.white,
  },
  image: {
    width,
    height: height * 0.5,
    alignSelf: 'flex-start',
  },
});

interface Props {
  images: string[] | number[];
}
const ListingImgSlider = ({ images }: Props) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <Box style={styles.container}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        decelerationRate="fast"
        bounces={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: true,
        })}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {images.map((i: any, index: number) => (
          <Box key={index}>
            <Box
              style={{
                position: 'absolute',
                zIndex: 1,
                width: '100%',
                height: '100%',
                backgroundColor: theme.colors.dark,
                opacity: 0.4,
              }}
            />
            <Image {...{ uri: i }} style={styles.image} />
          </Box>
        ))}
      </Animated.ScrollView>
      <Box style={styles.pagination}>
        {images.map((_: unknown, index: number) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.2, 1, 0.2],
            extrapolate: 'clamp',
          });

          return <Animated.View key={index} style={{ ...styles.dot, opacity }} />;
        })}
      </Box>
    </Box>
  );
};

export default ListingImgSlider;
