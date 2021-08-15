/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import AnimatableTestView from "./AnimatableTestView";
import AnimatedTestView from "./AnimatedTestView";
import LottieTestView from "./LottieTestView";
import LayoutAnimationTestView from "./LayoutAnimationTestView";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      routes: [
        { key: "animatable", title: "Animatable" },
        { key: "animated", title: "Animated" },
        { key: "lottie", title: "Lottie" },
        { key: "layoutAnimation", title: "Layout Animation" },
      ],
    };
  }

  _renderTabBar(props) {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const color = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? "#D6356C" : "#222"
            ),
          });
          return (
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => this.setState({ index: i })}
            >
              <Animated.Text style={{ color, ...styles.tabItemText }}>
                {route.title}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          animatable: () => {
            return <AnimatableTestView />;
          },
          animated: () => {
            return <AnimatedTestView />;
          },
          lottie: () => {
            return <LottieTestView />;
          },
          layoutAnimation: () => {
            return <LayoutAnimationTestView />;
          },
        })}
        renderTabBar={this._renderTabBar.bind(this)}
        onIndexChange={(index) => this.setState({ index })}
        initialLayout={{ width: Dimensions.get("window").width }}
        tabBarPosition={"bottom"}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
  tabItemText: {
    textAlign: "center",
    fontSize: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  tabBar: {
    flexDirection: "row",
  },
});
