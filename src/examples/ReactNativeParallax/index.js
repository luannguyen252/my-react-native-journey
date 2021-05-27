import React from 'react';
import { Animated, StyleSheet, Text, View, Dimensions, Platform } from 'react-native';
import * as Font from 'expo-font';
import { PREVIEW_HEIGHT, ROW_HEIGHT } from './constants';
import Row from './Row';
import data from './data';

const isIOS = Platform.OS === 'ios';
const deviceHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    paddingTop: isIOS ? 0 : 230,
  },
  background: {
    height: deviceHeight - (PREVIEW_HEIGHT / 3),
    backgroundColor: '#0A212E',
  }
});

export default class App extends React.Component {
  scrollRef = React.createRef();
  scrollY = new Animated.Value(0);
  state = {
    height: 0,
  }

  state = {  
    assetLoaded: false,
  }

  componentDidMount() {
    this.loadAssets();
  }

  async loadAssets() {
    try {
      // try to load AvenirNextCondensed-DemiBold font family anyway
      await Font.loadAsync({
        'AvenirNextCondensed-DemiBold': require('../assets/fonts/AvenirNextCondensed-DemiBold.ttf'),
      })
    } catch (error) {
    } finally {
      this.setState({ assetLoaded: true });
    }
  }

  onLayout = e => {
    this.setState({
      height: e.nativeEvent.layout.height,
    });
  };

  scrollTo = (index) => {
    this.scrollRef.current._component.scrollTo({
      y: ROW_HEIGHT * index,
      animated: true,
    });
  }

  renderContent() {
    if (!this.state.assetLoaded) {
      return null;
    }
    return data.map((item, index) => (
      <Row
        key={item.title}
        scrollY={this.scrollY}
        title={item.title}
        image={item.image}
        index={index}
        onPress={() => {
          this.scrollTo(index);
        }}
      />
    ));
  }

  render() {
    return (
      <Animated.ScrollView
        ref={this.scrollRef}
        style={{ paddingTop: isIOS ? 230 : 0 }}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets
        bounces={false}
        snapToInterval={ROW_HEIGHT}
        decelerationRate="fast"
        scrollEventThrottle={1}
        onLayout={this.onLayout}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { y: this.scrollY },
              },
            },
          ],
          {
            useNativeDriver: true,
            listener: this.onScroll,
          }
        )}
      >
        {this.renderContent()}
        <View style={styles.background}/>
      </Animated.ScrollView>
    );
  }
}
