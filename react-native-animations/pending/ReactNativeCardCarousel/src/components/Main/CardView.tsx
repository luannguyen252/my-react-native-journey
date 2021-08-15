import * as React from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
} from 'react-native';

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  .replace('.', '')
  .replace(',', '')
  .split(' ');

export const CardView = () => {
  const pan = React.useRef(new Animated.ValueXY()).current;

  const [scrollViewWidth, setScrollViewWidth] = React.useState(0);

  const boxWidth = scrollViewWidth * 0.8;
  const boxDistance = scrollViewWidth - boxWidth;
  const halfBoxDistance = boxDistance / 2;
  const snapWidth = boxWidth;

  return (
    <View style={styles.container}>
      <StatusBar animated hidden />
      <View style={{ width: '100%' }}>
        <Text
          numberOfLines={3}
          style={[styles.boxText, { textAlign: 'center', marginBottom: 24 }]}>
          React Native{'\n'}Card Carousel
        </Text>

        <FlatList
          horizontal
          data={lorem}
          style={styles.flatList}
          contentContainerStyle={styles.flatListContainer}
          contentInsetAdjustmentBehavior="never"
          snapToAlignment="center"
          decelerationRate="fast"
          snapToInterval={snapWidth}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
          contentInset={{
            left: halfBoxDistance,
            right: halfBoxDistance,
          }}
          contentOffset={{ x: halfBoxDistance * -1, y: 0 }}
          onLayout={(e) => {
            setScrollViewWidth(e.nativeEvent.layout.width);
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: pan.x } } }],
            {
              useNativeDriver: false,
            },
          )}
          keyExtractor={(item, index) => `${index}-${item}`}
          renderItem={(props) => {
            const { index, item } = props;

            return (
              <Animated.View
                style={{
                  transform: [
                    {
                      scale: pan.x.interpolate({
                        inputRange: [
                          (index - 1) * snapWidth - halfBoxDistance,
                          index * snapWidth - halfBoxDistance,
                          (index + 1) * snapWidth - halfBoxDistance,
                        ],
                        outputRange: [0.8, 1, 0.8],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                }}>
                <View
                  key={item}
                  style={[
                    styles.box,
                    {
                      width: boxWidth,
                      backgroundColor: `rgba(${(index * 13) % 255}, ${
                        (index * 35) % 255
                      }, ${(index * 4) % 255}, .5)`,
                    },
                  ]}>
                  <Text style={styles.boxText}>{item}</Text>
                </View>
              </Animated.View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#242424',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  boxText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 28,
  },
  box: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },
  flatList: { backgroundColor: '#6b6b6b', height: 250 },
  flatListContainer: { paddingVertical: 16 },
});
