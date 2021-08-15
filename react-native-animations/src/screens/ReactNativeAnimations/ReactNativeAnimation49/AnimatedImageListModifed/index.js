import * as Animatable from "react-native-animatable";
import * as React from "react";
import {
  Text,
  Animated,
  Dimensions,
  View,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";

const { width, height } = Dimensions.get("window");
const ANIMATION_DELAY = 300;

export default class AnimatedImageListModifed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollX: new Animated.Value(0),
    };
  }

  render() {
    const { scrollX } = this.state;
    const inputRange = [0, this.props.width];
    const translateX = this.state.scrollX.interpolate({
      inputRange,
      outputRange: [0, -width],
    });
    const backgroundColor = this.state.scrollX.interpolate({
      inputRange,
      outputRange: ["#FFFFFF", "#111827"],
    });

    return (
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: this.props.secondaryBackgroundColor },
        ]}
      >
        <StatusBar hidden />
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: width / 3,
            backgroundColor: this.props.primaryBackgroundColor,
            transform: [{ translateX: translateX }],
          }}
        />

        <View style={{ marginTop: 64, marginLeft: 64 }}>
          <Animatable.Text
            animation="fadeInUp"
            delay={ANIMATION_DELAY}
            style={{
              color: backgroundColor,
              fontSize: 16,
              lineHeight: 22,
              fontWeight: "500",
            }}
          >
            {this.props.title}
          </Animatable.Text>
          <Animatable.Text
            animation="fadeInUp"
            delay={ANIMATION_DELAY + 150}
            style={{
              color: backgroundColor,
              fontSize: 32,
              lineHeight: 40,
              fontWeight: "700",
            }}
          >
            {this.props.subTitle}
          </Animatable.Text>
        </View>
        <Animated.FlatList
          horizontal
          data={this.props.data}
          keyExtractor={(item, index) => item.name + index}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          snapToInterval={this.props.width}
          decelerationRate={0.2}
          renderItem={this.renderItem}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
        />
      </SafeAreaView>
    );
  }

  renderItem = ({ item, index }) => {
    console.log(this.state.scrollX);
    var ITEM_SIZE = this.props.width;
    let translateY = this.state.scrollX.interpolate({
      inputRange: [
        (index - 1) * ITEM_SIZE,
        index * ITEM_SIZE,
        (index + 1) * ITEM_SIZE,
      ],
      outputRange: [0.8, 1.1, 0.8],
    });

    const changeImageX = this.state.scrollX.interpolate({
      inputRange: [(index - 1) * ITEM_SIZE, index * ITEM_SIZE],
      outputRange: [-100, 0],
    });

    return (
      <Animated.View
        key={index + 1 + "ll"}
        style={{
          marginLeft: index == 0 ? (width - ITEM_SIZE) / 2 : 0,
          marginRight:
            index == this.props.data.length - 1 ? (width - ITEM_SIZE) / 2 : 0,
          marginHorizontal: 10,
          height: this.props.height,
          borderRadius: 8,
          overflow: "hidden",
          alignSelf: "center",
          width: ITEM_SIZE,
          transform: [{ scaleX: translateY }, { scaleY: translateY }],
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: "#F3F4F6",
            transform: [{ translateX: changeImageX }],
          }}
        >
          <ImageBackground
            resizeMode={"center"}
            style={{ flex: 1, width: "100%", borderRadius: 8 }}
            source={require("./images/placeholder.png")}
          >
            <Animated.Image
              style={{ flex: 1, width: "100%", borderRadius: 8 }}
              source={item.image}
            />
          </ImageBackground>
        </Animated.View>
        <View
          style={{
            position: "absolute",
            bottom: 24,
            justifyContent: "center",
            right: 0,
            left: 0,
            paddingHorizontal: 16,
          }}
        >
          <Animatable.Text
            animation="fadeInUp"
            delay={ANIMATION_DELAY + 250}
            style={{
              fontSize: 16,
              lineHeight: 22,
              fontWeight: "500",
              color: "#FFFFFF",
            }}
          >
            {item.subTitle}
          </Animatable.Text>
          <Animatable.Text
            animation="fadeInUp"
            delay={ANIMATION_DELAY + 350}
            style={{
              fontSize: 24,
              lineHeight: 32,
              fontWeight: "700",
              color: "#FFFFFF",
            }}
          >
            {item.title}
          </Animatable.Text>
        </View>
      </Animated.View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AnimatedImageListModifed.defaultProps = {
  data: [
    { title: "Title", subTitle: "Subtitle", image: require("./images/5.jpg") },
    { title: "Title", subTitle: "Subtitle", image: require("./images/4.jpg") },
    { title: "Title", subTitle: "Subtitle", image: require("./images/3.jpg") },
    { title: "Title", subTitle: "Subtitle", image: require("./images/2.jpg") },
    { title: "Title", subTitle: "Subtitle", image: require("./images/1.jpg") },
  ],
  height: height / 2,
  width: width - 120,
  title: "Title",
  subTitle: "Subtitle",
  primaryBackgroundColor: "#A855F7",
  secondaryBackgroundColor: "#FFFFFF",
  textPrimaryColor: "#FFFFFF",
  textSecondaryColor: "#111827",
};
