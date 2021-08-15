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
  TouchableOpacity,
} from "react-native";
import globalStyles from "../../../assets/styles/globalStyles";
import colors from "../../../assets/styles/colors";

// BEGIN: Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
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

// BEGIN: Timing
class Timing extends PureComponent {
  // BEGIN: Khai báo state có chứa thuộc tính Animated.Value
  state = {
    animation: new Animated.Value(0),
  };
  // END: Khai báo state có chứa thuộc tính Animated.Value

  // BEGIN: Tạo function startAnimation để thực hiện Animated
  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 300,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      this.state.animation.setValue(0);
    });
  };
  // END: Tạo function startAnimation để thực hiện Animated

  render() {
    // BEGIN: Khai báo thuộc tính animatedStyles muốn thực hiện Animated
    const animatedStyles = {
      transform: [{ translateY: this.state.animation }],
    };
    // END: Khai báo thuộc tính animatedStyles muốn thực hiện Animated

    return (
      <View style={styles.container}>
        <Text style={[globalStyles.subTitle, { paddingBottom: 16 }]}>
          Timing
        </Text>
        {/* BEGIN: Thực hiện hành động Animated khi bấm vào sẽ thực hiện function startAnimation */}
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          {/* BEGIN: Gán giá trị của animatedStyles vào thành phần trên UI muốn thực hiện Animated */}
          {/* Trường hợp object box đã có style color thì sẽ được replace bằng thông số từ inputRange và outputRange */}
          <Animated.View
            style={[styles.box, animatedStyles, { width: 120, height: 120 }]}
          />
          {/* END: Gán giá trị của animatedStyles vào thành phần trên UI muốn thực hiện Animated */}
        </TouchableWithoutFeedback>
        {/* END: Thực hiện hành động Animated khi bấm vào sẽ thực hiện function startAnimation */}
      </View>
    );
  }
}
// END: Timing

// BEGIN: Spring
class Spring extends PureComponent {
  // BEGIN: Khai báo state có chứa thuộc tính Animated.Value
  state = {
    animation: new Animated.Value(1),
  };
  // END: Khai báo state có chứa thuộc tính Animated.Value

  // BEGIN: Tạo function startAnimation để thực hiện Animated
  startAnimation = () => {
    Animated.spring(this.state.animation, {
      toValue: 2,
      friction: 2,
      tension: 160,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
    });
  };
  // END: Tạo function startAnimation để thực hiện Animated

  render() {
    // BEGIN: Khai báo thuộc tính animatedStyles muốn thực hiện Animated
    const animatedStyles = {
      transform: [{ scale: this.state.animation }],
    };
    // END: Khai báo thuộc tính animatedStyles muốn thực hiện Animated

    return (
      <View style={styles.container}>
        <Text style={[globalStyles.subTitle, { paddingBottom: 16 }]}>
          Spring
        </Text>
        {/* BEGIN: Thực hiện hành động Animated khi bấm vào sẽ thực hiện function startAnimation */}
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          {/* BEGIN: Gán giá trị của animatedStyles vào thành phần trên UI muốn thực hiện Animated */}
          {/* Trường hợp object box đã có style color thì sẽ được replace bằng thông số từ inputRange và outputRange */}
          <Animated.View
            style={[styles.box, animatedStyles, { width: 120, height: 120 }]}
          />
          {/* END: Gán giá trị của animatedStyles vào thành phần trên UI muốn thực hiện Animated */}
        </TouchableWithoutFeedback>
        {/* END: Thực hiện hành động Animated khi bấm vào sẽ thực hiện function startAnimation */}
      </View>
    );
  }
}
// END: Spring

export default class Section07NativeAnimations extends PureComponent {
  render() {
    return (
      <View style={globalStyles.container}>
        <ScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          <SafeAreaView>
            <StatusBar style="auto" />
            {/* BEGIN: Section 07 - Native Animations Timing Event */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                this.props.navigation.navigate(
                  "Section 07 Native Animations Timing Event"
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
                Section 07 - Native Animations Timing Event →
              </Text>
            </TouchableOpacity>
            {/* END: Section 07 - Native Animations Timing Event */}
            <Timing />
            <Spring />
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}
