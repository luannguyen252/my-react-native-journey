import * as Animatable from "react-native-animatable";
import React, { Component } from "react";
import { Dimensions, View, ScrollView } from "react-native";
import PullToRefresh from "../PullToRefresh";

const WIDTH = Dimensions.get("window").width;
const ANIMATION_DELAY = 100;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
    };
    this.measureView = this.measureView.bind(this);
  }

  measureView(event) {
    this.setState({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
    });
  }

  render() {
    const mainStyle = {
      flex: 1,
      backgroundColor: "#F9FAFB",
      justifyContent: "center",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: "#D1D5DB",
    };

    const submenuStyle = {
      width: this.state.width / 2,
      height: this.state.height / 4,
      borderRadius: 50,
      backgroundColor: "#D1D5DB",
      marginTop: 24,
    };

    return (
      <Animatable.View
        animation="fadeInDown"
        delay={ANIMATION_DELAY}
        style={mainStyle}
        onLayout={(event) => this.measureView(event)}
      >
        <Animatable.View
          animation="fadeInDown"
          delay={ANIMATION_DELAY + 150}
          style={submenuStyle}
        />
      </Animatable.View>
    );
  }
}

class ScrollItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 100,
    };
  }

  render() {
    const mainStyle = {
      flex: 1,
      height: this.state.height,
      backgroundColor: "#F9FAFB",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: "#D1D5DB",
    };
    const imgContainer = {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    };
    const imgStyle = {
      width: this.state.height / 1.5,
      height: this.state.height / 1.5,
      backgroundColor: "#D1D5DB",
      borderRadius: 10,
    };
    const textContainer = {
      flex: 3,
      height: this.state.height / 1.5,
      flexDirection: "column",
      justifyContent: "flex-start",
    };
    const textStyle = {
      width: WIDTH / 1.8,
      marginBottom: 10,
      height: this.state.height / 8,
      backgroundColor: "#D1D5DB",
      borderRadius: 10,
    };
    const textStyleShort = {
      width: WIDTH / 3,
      marginBottom: 10,
      height: this.state.height / 9,
      backgroundColor: "#D1D5DB",
      borderRadius: 12,
    };

    return (
      <View style={mainStyle}>
        <Animatable.View
          animation="fadeInDown"
          delay={ANIMATION_DELAY + 250}
          style={imgContainer}
        >
          <Animatable.View
            animation="fadeInDown"
            delay={ANIMATION_DELAY + 350}
            style={imgStyle}
          />
        </Animatable.View>

        <Animatable.View
          animation="fadeInDown"
          delay={ANIMATION_DELAY + 350}
          style={textContainer}
        >
          <Animatable.View
            animation="fadeInDown"
            delay={ANIMATION_DELAY + 400}
            style={textStyle}
          />
          <Animatable.View
            animation="fadeInDown"
            delay={ANIMATION_DELAY + 450}
            style={textStyle}
          />
          <Animatable.View
            animation="fadeInDown"
            delay={ANIMATION_DELAY + 500}
            style={textStyleShort}
          />
        </Animatable.View>
      </View>
    );
  }
}

export default class WeatherAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
    };
  }

  onRefresh() {
    this.setState({ isRefreshing: true });
    setTimeout(() => {
      this.setState({ isRefreshing: false });
    }, 5000);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header />
        <View style={{ flex: 7, backgroundColor: "#111827" }}>
          <PullToRefresh
            isRefreshing={this.state.isRefreshing}
            onRefresh={this.onRefresh.bind(this)}
            animationBackgroundColor={"#111827"}
            pullHeight={180}
            contentView={
              <ScrollView>
                <ScrollItem />
                <ScrollItem />
                <ScrollItem />
                <ScrollItem />
                <ScrollItem />
                <ScrollItem />
                <ScrollItem />
                <ScrollItem />
                <ScrollItem />
              </ScrollView>
            }
            onPullAnimationSrc={require("../animations/umbrella_1.json")}
            onStartRefreshAnimationSrc={require("../animations/umbrella_start.json")}
            onRefreshAnimationSrc={require("../animations/umbrella_repeat.json")}
            onEndRefreshAnimationSrc={require("../animations/umbrella_end.json")}
          />
        </View>
      </View>
    );
  }
}
