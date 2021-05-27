// special carousel component
// carousel + gradient backgrounds effect on scrolling

import React, { PureComponent } from 'react';
import { View, ScrollView, StyleSheet, Animated } from 'react-native';
import { isIphoneX, isIOS, deviceWidth } from './env';
import ScrollingIndicator from './ScrollingIndicator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    width: deviceWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  indicator: {
    position: "absolute",
    bottom: isIphoneX ? 70 : 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default class GradientBackgroundsCarousel extends PureComponent {
  static defaultProps = {
    data: [],
    backgroundColors: [],
  }

  scrollX = new Animated.Value(0);
  scrollOffset = new Animated.Value(0);

  onScroll = (e) => {
    this.scrollOffset.setValue(e.nativeEvent.contentOffset.x);
  }

  renderCards() {
    const { data, renderItem } = this.props;
    return data.map((item, index) => (
      <View
        key={`page-${index}`}
        style={styles.page}
      >
        {renderItem({ index, item, scrollX: this.scrollX })}
      </View>
    ));
  }

  render() {
    const { scrollEnabled, data, backgroundColors } = this.props;

    return (
      <View style={StyleSheet.flatten(styles.container)}>
        <View style={StyleSheet.flatten(StyleSheet.absoluteFill)}>
          {backgroundColors.map((backgroundColor, index) => (
            <Animated.View
              key={`gb-${index}`}
              style={StyleSheet.flatten([
                StyleSheet.absoluteFill,
                {
                  backgroundColor,
                  zIndex: -index,
                  opacity: this.scrollX.interpolate({
                    inputRange: [deviceWidth * index, deviceWidth * (index + 1)],
                    outputRange: isIOS ? [1, 0] : [1, 2],
                  }),
                },
              ])}
            />
          ))}
        </View>

        <Animated.ScrollView
          ref={this.scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          decelerationRate="fast"
          scrollEventThrottle={1}
          onLayout={this.onLayout}
          scrollEnabled={scrollEnabled}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { x: this.scrollX },
                },
              },
            ],
            {
              listener: this.onScroll,
              useNativeDriver: true,
            }
          )}
        >
          {this.renderCards()}
        </Animated.ScrollView>

        <ScrollingIndicator
          total={data.length}
          scrollOffset={this.scrollOffset}
          style={StyleSheet.flatten(styles.indicator)}
        />
      </View>
    );
  }
}