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

// BEGIN: EasingAnimated
class EasingAnimated extends PureComponent {
  // BEGIN: Khai báo state có chứa thuộc tính Animated.Value
  state = {
    animation: new Animated.Value(0),
  };
  // END: Khai báo state có chứa thuộc tính Animated.Value

  // BEGIN: Tạo function startAnimation để thực hiện Animated
  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 300, // Thực hiện Animated với giá trị là 300
      duration: 500, // Thực hiện Animated trong thời gian là 500 ms
      // easing: Easing.back(5), // Object quay lại 5 rồi mới thực hiện Animated
      // easing: Easing.bounce, // Object sẽ thực hiện Animated xong rồi sẽ đến effect Bounce sau đó
      // easing: Easing.elastic(3), // Object sẽ thực hiện Animated xong rồi sử dụng effect Elastic = 3
      easing: Easing.bezier(0.06, 1, 0.86, 0.23), // Object sẽ thực hiện Animated dạng Bezier lần lượt theo các thông số đưa ra bên trong nó
      useNativeDriver: false,
    }).start();
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
          Easing Animated
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
// END: Easing Animated

export default class Section03AnimatedValue extends PureComponent {
  render() {
    return (
      <View style={globalStyles.container}>
        <ScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          <SafeAreaView>
            <StatusBar style="auto" />
            <EasingAnimated />
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}
