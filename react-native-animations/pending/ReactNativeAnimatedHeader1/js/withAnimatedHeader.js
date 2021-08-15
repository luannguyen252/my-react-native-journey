/**
 * @flow
 */
import React from 'react';
import { Animated, Text, View, Dimensions, Platform } from 'react-native';
import hoistNonReactStatics from 'hoist-non-react-statics';

const { width: deviceWidth } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = Platform.OS === 'ios' ? 64 : 54;
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function withAnimatedHeader<T: *>(WrappedComponent: ReactClass<T>): ReactClass<T> {
  class Wrapper extends React.Component {
    props: T;

    animatedHeight: Animated.Value;

    static displayName = `withAnimatedHeader(${WrappedComponent.displayName || WrappedComponent.name})`;
    static navigationOptions = ({ navigation }) => {
      const params = navigation.state.params || {};
      const { animatedHeight } = params;
      console.log(animatedHeight && animatedHeight.toJSON());
      return {
        headerTitle: (
          <View
            style={{
              width: deviceWidth,
              justifyContent: 'center',
              flexDirection: 'row'
            }}
          >
            <Text style={{ fontSize: 16 }}>
              <Text>타이틀</Text>
            </Text>
          </View>
        ),
        headerStyle: {
          height: animatedHeight || HEADER_MAX_HEIGHT,
          overflow: 'hidden'
        }
      };
    };

    constructor(props) {
      super(props);

      this.animatedHeight = new Animated.Value(0);
    }

    componentWillMount() {
      this.props.navigation.setParams({
        animatedHeight: this.animatedHeight.interpolate({
          inputRange: [0, HEADER_SCROLL_DISTANCE],
          outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
          extrapolate: 'clamp'
        })
      });
    }

    onScroll = () => {
      console.log('asdasf');
      console.log(this.animatedHeight.toJSON());
      return Animated.event([
        {
          nativeEvent: {
            contentOffset: {
              y: this.animatedHeight
            }
          }
        }
      ]);
    };

    render() {
      return <WrappedComponent {...this.props} onScroll={this.onScroll} />;
    }
  }

  return hoistNonReactStatics(Wrapper, WrappedComponent);
}
