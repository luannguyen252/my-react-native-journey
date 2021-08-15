/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { Animated, View } from 'react-native';
import PropTypes from 'prop-types';
import { SCREEN_WIDTH } from './utils';
import { Slides, Progress } from './components';

/**
 * PromoSlider component
 */
class PromoSlider extends Component {
  static propTypes = {
    /**
     * Array of slide components
     */
    slides: PropTypes.array.isRequired,
    /**
     * Configure styles for wrapper of progress dots
     */
    progressStyles: PropTypes.object,
    /**
     * Define stationary and active dot color
     */
    dotColor: PropTypes.string,
    /**
     * Callback function provided from parent
     * in case close action is used
     */
    onClose: PropTypes.func,
    /**
     * Boolean which indicates weather or not to show close button
     */
    withoutClose: PropTypes.bool,
  };

  static defaultProps = {
    progressStyles: {},
    dotColor: '#000',
    onClose: () => {},
    withoutClose: null,
  };

  state = {
    isVisible: true,
    xOffset: new Animated.Value(0),
  };

  onCloseNative = () => {
    const { isVisible } = this.state;
    const { onClose = () => {} } = this.props;
    this.setState({
      isVisible: !isVisible
    }, () => onClose());
  };

  scrollToIndex = slide => {
    this.flatListRef.getNode().scrollTo({ x: slide * SCREEN_WIDTH, animated: true });
  };

  render() {
    const { slides, progressStyles, dotColor, withoutClose } = this.props;
    const { isVisible, xOffset } = this.state;

    if (!isVisible) return null;

    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Animated.ScrollView
          ref={ref => {
            this.flatListRef = ref;
          }}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          bounces={false}
          horizontal
          pagingEnabled
          style={{ flexDirection: 'row' }}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: xOffset } } }], {
            useNativeDriver: true,
          })}
        >
          <Slides
            slides={slides}
            withoutClose={withoutClose}
            onCloseNative={this.onCloseNative}
            isVisible={isVisible}
          />
        </Animated.ScrollView>
        <Progress
          xOffset={xOffset}
          progressStyles={progressStyles}
          dotColor={dotColor}
          slides={slides}
          onDotPress={this.scrollToIndex}
        />
      </View>
    );
  }
}

export default PromoSlider;
