import React, { Component } from "react";
import { View, Animated, Dimensions } from "react-native";
import Card from "./Card";
import Styles from "./Styles";

class AnimatedList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      xOffset: new Animated.Value(0),
    };
  }

  _rotateTransform(index) {
    const { height, width } = Dimensions.get("window");
    const cardwidth = 120;
    const margin = 10;
    const pointzero = index * cardwidth + index * margin;
    return {
      marginLeft: this.state.xOffset.interpolate({
        inputRange: [
          pointzero - width,
          pointzero,
          pointzero + width,
          pointzero + 2 * width,
        ],
        outputRange: [margin * 3, margin, margin, margin * 3],
        extrapolate: "clamp",
      }),
    };
  }

  _onScrollEventHandler = () => {
    return Animated.event([
      { nativeEvent: { contentOffset: { x: this.state.xOffset } } },
    ]);
  };

  render() {
    return (
      <View style={Styles.AnimatedList.scrollviewContainer}>
        <Animated.ScrollView
          style={Styles.AnimatedList.scrollview}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={Styles.AnimatedList.scrollviewContentContainer}
          scrollEventThrottle={16}
          onScroll={this._onScrollEventHandler()}
        >
          {this.props.data.map((item, index) => (
            <Card
              index
              key={item.id}
              imageThumbSrc={{
                uri: `https://image.tmdb.org/t/p/w92/${item.poster_path}`,
              }}
              imageSrc={{
                uri: `https://image.tmdb.org/t/p/w780/${item.poster_path}`,
              }}
              style={this._rotateTransform(index)}
            />
          ))}
        </Animated.ScrollView>
      </View>
    );
  }
}

export default AnimatedList;
