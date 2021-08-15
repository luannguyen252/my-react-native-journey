import { StatusBar } from "expo-status-bar";
import React, { PureComponent } from "react";
import {
  ScrollView,
  View,
  Text,
  SafeAreaView,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import globalStyles from "../../../assets/styles/globalStyles";
import colors from "../../../assets/styles/colors";

// BEGIN: Styles
const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  box: {
    backgroundColor: colors.orange600,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
// END: Styles

// BEGIN: createAnimatedComponent
// Khởi tạo giá trị Button cùng với Animated sử dụng createAnimatedComponent()
const AnimatedButton = Animated.createAnimatedComponent(Button);

class CreateAnimatedComponent extends PureComponent {
  // BEGIN: Khai báo giá trị State cho Animated
  state = {
    animation: new Animated.Value(0), // Set giá trị ban đầu là 0
  };
  // END: Khai báo giá trị State cho Animated

  // BEGIN: Khởi tạo hàm để thực hiện Animated
  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 1, // Thực hiện Animated với giá trị là 1
      duration: 1500, // Thực hiện Animated trong thời gian là 1,5 giây
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(this.state.animation, {
        toValue: 0, // Thực hiện Animated với giá trị là 0
        duration: 300, // Thực hiện Animated trong thời gian là 300 milliseconds
        useNativeDriver: false,
      }).start();
    });
  };
  // END: Khởi tạo hàm để thực hiện Animated

  render() {
    // BEGIN: Khởi tạo giá trị Style cho Animated cùng với Interpolate
    const animatedColor = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgb(255, 99, 71)", "rgb(99, 71, 255)"],
    });
    // END: Khởi tạo giá trị Style cho Animated cùng với Interpolate

    return (
      <View style={styles.container}>
        <AnimatedButton
          title="Press Me"
          onPress={this.startAnimation}
          color={animatedColor}
        />
      </View>
    );
  }
}
// END: createAnimatedComponent

export default class Section09UnderstandingHowAnimatedWorks extends PureComponent {
  render() {
    return (
      <View style={globalStyles.container}>
        <ScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          <SafeAreaView>
            <StatusBar style="auto" />
            <CreateAnimatedComponent />

            {/* BEGIN: Section 09 - Using and Understanding setNativeProps */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                this.props.navigation.navigate(
                  "Section 09 Using and Understanding setNativeProps"
                )
              }
              style={{
                paddingTop: 8,
                paddingLeft: 16,
                paddingRight: 16,
                paddingBottom: 8,
              }}
            >
              <Text style={globalStyles.bodyText}>
                Section 09 - Using and Understanding setNativeProps →
              </Text>
            </TouchableOpacity>
            {/* END: Section 09 - Using and Understanding setNativeProps */}

            {/* BEGIN: Section 09 - Using D3 Interpolate With Animated */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                this.props.navigation.navigate(
                  "Section 09 Using D3 Interpolate With Animated"
                )
              }
              style={{
                paddingTop: 8,
                paddingLeft: 16,
                paddingRight: 16,
                paddingBottom: 8,
              }}
            >
              <Text style={globalStyles.bodyText}>
                Section 09 - Using D3 Interpolate With Animated →
              </Text>
            </TouchableOpacity>
            {/* END: Section 09 - Using D3 Interpolate With Animated */}

            {/* BEGIN: Section 09 - Using D3 Interpolate Path And Animated To Animate SVG Paths */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                this.props.navigation.navigate(
                  "Section 09 Using D3 Interpolate Path And Animated To Animate SVG Paths"
                )
              }
              style={{
                paddingTop: 8,
                paddingLeft: 16,
                paddingRight: 16,
                paddingBottom: 8,
              }}
            >
              <Text style={globalStyles.bodyText}>
                Section 09 - Using D3 Interpolate Path And Animated To Animate
                SVG Paths →
              </Text>
            </TouchableOpacity>
            {/* END: Section 09 - Using D3 Interpolate Path And Animated To Animate SVG Paths */}

            {/* BEGIN: Section 09 - Using Art Morph Tween Animate Complex SVG Paths */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                this.props.navigation.navigate(
                  "Section 09 Using Art Morph Tween Animate Complex SVG Paths"
                )
              }
              style={{
                paddingTop: 8,
                paddingLeft: 16,
                paddingRight: 16,
                paddingBottom: 8,
              }}
            >
              <Text style={globalStyles.bodyText}>
                Section 09 - Using Art Morph Tween Animate Complex SVG Paths →
              </Text>
            </TouchableOpacity>
            {/* END: Section 09 - Using Art Morph Tween Animate Complex SVG Paths */}

            {/* BEGIN: Section 09 - Using Flubber And Animated SVG Path Morphing */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                this.props.navigation.navigate(
                  "Section 09 Using Flubber And Animated SVG Path Morphing"
                )
              }
              style={{
                paddingTop: 8,
                paddingLeft: 16,
                paddingRight: 16,
                paddingBottom: 8,
              }}
            >
              <Text style={globalStyles.bodyText}>
                Section 09 - Using Flubber And Animated SVG Path Morphing →
              </Text>
            </TouchableOpacity>
            {/* END: Section 09 - Using Flubber And Animated SVG Path Morphing */}
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}
