import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import { Animated, View, StyleSheet, SafeAreaView } from "react-native";

const MARGIN = 30; // Khoảng cách để kích hoạt hiển thị bottom tab

export default class HomeScreen extends Component {
  scroll = new Animated.Value(0);
  headerY = Animated.AnimatedDiffClamp;
  isShowSearchView = true;

  constructor(props) {
    super(props);
    this.headerY = Animated.diffClamp(this.scroll, 0, MARGIN);
  }

  setTabBarVisible = (isShow) => {
    if (this.isShowSearchView === isShow) {
      return;
    }
    this.isShowSearchView = isShow;
    this.props.navigation?.dangerouslyGetParent()?.setOptions({
      tabBarVisible: isShow,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />

        <Animated.ScrollView
          style={styles.scrollViewContainer}
          scrollEventThrottle={1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 16 }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.scroll } } }],
            {
              useNativeDriver: false,
              listener: () => {
                this.setTabBarVisible(this.headerY.__getValue() < 0.5 * MARGIN);
              },
            }
          )}
          bounces={false}
        >
          <SafeAreaView>
            <View style={[styles.viewItem, { backgroundColor: "red" }]} />
            <View style={[styles.viewItem, { backgroundColor: "green" }]} />
            <View style={[styles.viewItem, { backgroundColor: "yellow" }]} />
            <View style={[styles.viewItem, { backgroundColor: "orange" }]} />
            <View style={[styles.viewItem, { backgroundColor: "red" }]} />
            <View style={[styles.viewItem, { backgroundColor: "yellow" }]} />
          </SafeAreaView>
        </Animated.ScrollView>
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    width: "100%",
  },
  contentContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
  },
  viewItem: {
    height: 200,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "red",
    marginBottom: 16,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
