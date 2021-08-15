import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  Dimensions,
  FlatList,
  Image,
  Animated,
  Text
} from 'react-native';

const { width: deviceWidth } = Dimensions.get('window');

export default class PhotoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: '사진',
    headerStyle: {
      height: navigation.state.params ? navigation.state.params.height : 64,
      overflow: 'hidden'
    }
  });

  constructor() {
    super();

    this.animatedValue = new Animated.Value(0);

    const photos = Array.from({ length: 20 }, (v, k) => {
      return {
        key: k,
        url: 'https://unsplash.it/300/300/?random'
      };
    });

    this.state = {
      data: photos
    };
  }

  componentWillMount() {
    const MAX_HEIGHT = 64;
    const MIN_HEIGHT = 0;
    const SCROLL_DISTANCE = MAX_HEIGHT - MIN_HEIGHT;
    this.props.navigation.setParams({
      height: this.animatedValue.interpolate({
        inputRange: [0, SCROLL_DISTANCE],
        outputRange: [MAX_HEIGHT, MIN_HEIGHT],
        extrapolate: 'clamp'
      })
    });
  }

  renderItem = ({ item }) => {
    return <Image style={styles.photo} source={{ uri: item.url }} />;
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  y: this.animatedValue
                }
              }
            }
          ])}
          styel={{ flex: 1 }}
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap'
          }}
          data={this.state.data}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  photo: {
    width: deviceWidth / 3,
    height: deviceWidth / 3
  }
});
