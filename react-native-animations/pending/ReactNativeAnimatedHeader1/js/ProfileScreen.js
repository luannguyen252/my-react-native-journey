import React from 'react';
import { StyleSheet, View, Button, Animated, FlatList, Image, Dimensions } from 'react-native';
import withAnimatedHeader from './withAnimatedHeader';

const { width: deviceWidth } = Dimensions.get('window');

class ProfileScreen extends React.Component {
  constructor() {
    super();

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

  renderItem = ({ item }) => {
    return <Image style={styles.photo} source={{ uri: item.url }} />;
  };

  render() {
    const { navigation, onScroll } = this.props;
    return (
      <View style={styles.container}>
        <Button title="다음 페이지로..." onPress={() => navigation.navigate('Photo')} />
        <FlatList
          scrollEventThrottle={16}
          onScroll={onScroll()}
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

export default withAnimatedHeader(ProfileScreen);
