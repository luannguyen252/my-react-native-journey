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

// BEGIN: Parallel
class Parallel extends PureComponent {
  // BEGIN: Khai báo state có chứa thuộc tính Animated.Value
  state = {
    colorAnimation: new Animated.Value(0), // Khai báo giá trị Animated đầu tiên là color
    scaleAnimation: new Animated.Value(1), // Khai báo giá trị Animated tiếp theo là scale
  };
  // END: Khai báo state có chứa thuộc tính Animated.Value

  // BEGIN: Tạo function startAnimation để thực hiện Animated
  startAnimation = () => {
    // Sử dụng thư viện animated là parallel kèm theo các giá trị timing trong đó theo một dạng Array Animated
    Animated.parallel([
      // Giá trị timing đầu tiên được gán cho color
      Animated.timing(this.state.colorAnimation, {
        toValue: 1, // Thực hiện với giá trị là 1
        duration: 500, // Thực hiện trong thời gian là 500ms
        useNativeDriver: false,
      }),
      // Giá trị timing tiếp theo được gán cho scale
      Animated.timing(this.state.scaleAnimation, {
        toValue: 2, // Thực hiện với giá trị là 2
        duration: 300, // Thực hiện trong thời gian là 300ms
        useNativeDriver: false,
      }),
    ]).start(() => {
      alert("Animation Complete"); // Sau thi thực hiện hết cả 2 giá trị animated timing sẽ kết thúc bằng thông báo
    });
  };
  // END: Tạo function startAnimation để thực hiện Animated

  render() {
    // BEGIN: Khai báo thuộc tính animated styles muốn thực hiện Animated
    // Khai báo giá trị trong thuộc tính animated interpolate cho background color cùng input range và output range
    const backgroundColorInterpolate = this.state.colorAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgb(255,99,71)", "rgb(99,71,255)"],
    });

    // Khai báp giá trị trong thuộc tính animated styles được gán cho object cùng interpolate phía trên và một khai báo animated scale trước đó
    const boxStyles = {
      backgroundColor: backgroundColorInterpolate,
      transform: [{ scale: this.state.scaleAnimation }],
    };
    // END: Khai báo thuộc tính animated styles muốn thực hiện Animated

    return (
      <View style={styles.container}>
        <Text style={[globalStyles.subTitle, { paddingBottom: 16 }]}>
          Parallel
        </Text>
        {/* BEGIN: Thực hiện hành động Animated khi bấm vào sẽ thực hiện function startAnimation */}
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          {/* BEGIN: Gán giá trị của animatedStyles vào thành phần trên UI muốn thực hiện Animated */}
          {/* Trường hợp object box đã có style color thì sẽ được replace bằng thông số từ inputRange và outputRange */}
          <Animated.View
            style={[styles.box, boxStyles, { width: 120, height: 120 }]}
          />
          {/* END: Gán giá trị của animatedStyles vào thành phần trên UI muốn thực hiện Animated */}
        </TouchableWithoutFeedback>
        {/* END: Thực hiện hành động Animated khi bấm vào sẽ thực hiện function startAnimation */}
      </View>
    );
  }
}
// END: Parallel

// BEGIN: Sequence
class Sequence extends PureComponent {
  // BEGIN: Khai báo state có chứa thuộc tính Animated.Value
  state = {
    colorAnimation: new Animated.Value(0), // Khai báo giá trị Animated đầu tiên là color
    scaleAnimation: new Animated.Value(1), // Khai báo giá trị Animated tiếp theo là scale
  };
  // END: Khai báo state có chứa thuộc tính Animated.Value

  // BEGIN: Tạo function startAnimation để thực hiện Animated
  startAnimation = () => {
    // Sử dụng thư viện animated là sequence kèm theo các giá trị timing trong đó theo một dạng Array Animated
    Animated.sequence([
      // Giá trị timing đầu tiên được gán cho color
      Animated.timing(this.state.colorAnimation, {
        toValue: 1, // Thực hiện với giá trị là 1
        duration: 500, // Thực hiện trong thời gian là 500ms
        useNativeDriver: false,
      }),
      // Giá trị timing đồng thời giống với timing đầu tiên cũng được gán cho color
      Animated.timing(this.state.colorAnimation, {
        toValue: 0, // Thực hiện với giá trị là 1
        duration: 500, // Thực hiện trong thời gian là 500ms
        useNativeDriver: false,
      }),
      // Giá trị timing tiếp theo được gán cho scale
      Animated.timing(this.state.scaleAnimation, {
        toValue: 2, // Thực hiện với giá trị là 2
        duration: 300, // Thực hiện trong thời gian là 300ms
        useNativeDriver: false,
      }),
    ]).start(() => {
      alert("Animation Complete"); // Sau thi thực hiện hết cả 2 giá trị animated timing sẽ kết thúc bằng thông báo
    });
  };
  // END: Tạo function startAnimation để thực hiện Animated

  render() {
    // BEGIN: Khai báo thuộc tính animated styles muốn thực hiện Animated
    // Khai báo giá trị trong thuộc tính animated interpolate cho background color cùng input range và output range
    const backgroundColorInterpolate = this.state.colorAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgb(255,99,71)", "rgb(99,71,255)"],
    });

    // Khai báp giá trị trong thuộc tính animated styles được gán cho object cùng interpolate phía trên và một khai báo animated scale trước đó
    const boxStyles = {
      backgroundColor: backgroundColorInterpolate,
      transform: [{ scale: this.state.scaleAnimation }],
    };
    // END: Khai báo thuộc tính animated styles muốn thực hiện Animated

    return (
      <View style={styles.container}>
        <Text style={[globalStyles.subTitle, { paddingBottom: 16 }]}>
          Sequence
        </Text>
        {/* BEGIN: Thực hiện hành động Animated khi bấm vào sẽ thực hiện function startAnimation */}
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          {/* BEGIN: Gán giá trị của animatedStyles vào thành phần trên UI muốn thực hiện Animated */}
          {/* Trường hợp object box đã có style color thì sẽ được replace bằng thông số từ inputRange và outputRange */}
          <Animated.View
            style={[styles.box, boxStyles, { width: 120, height: 120 }]}
          />
          {/* END: Gán giá trị của animatedStyles vào thành phần trên UI muốn thực hiện Animated */}
        </TouchableWithoutFeedback>
        {/* END: Thực hiện hành động Animated khi bấm vào sẽ thực hiện function startAnimation */}
      </View>
    );
  }
}
// END: Sequence

// BEGIN: Stagger
class Stagger extends PureComponent {
  // BEGIN: Khai báo state có chứa thuộc tính Animated.Value
  state = {
    colorAnimation: new Animated.Value(0), // Khai báo giá trị Animated đầu tiên là color
    scaleAnimation: new Animated.Value(1), // Khai báo giá trị Animated tiếp theo là scale
  };
  // END: Khai báo state có chứa thuộc tính Animated.Value

  // BEGIN: Tạo function startAnimation để thực hiện Animated cùng set time out
  startAnimationSetTimeOut = () => {
    // Gán giá trị timing đầu tiên cho color sử dụng animated
    Animated.timing(this.state.colorAnimation, {
      toValue: 1, // Thực hiện animated với giá trị là 1
      duration: 500, // Thực hiện animated trong vongg 500 milliseconds
    }).start();

    // Sau khi thực hiện sau animated timing bên trên thì sau 200 milliseconds sau sẽ thực hiện tiếp một animated khác
    setTimeout(() => {
      // Gán giá trị timing sử dụng tiếp theo cho scale sử dụng animated
      Animated.timing(this.state.scaleAnimation, {
        toValue: 2, // Thực hiện animated với giá trị là 1
        duration: 300, // Thực hiện animated trong vongg 300 milliseconds
      }).start();
    }, 200); // Sau 200 milliseconds sẽ thực hiện
  };
  // END: Tạo function startAnimation để thực hiện Animated cùng set time out

  // BEGIN: Tạo function startAnimation để thực hiện Animated cùng stagger
  startAnimation = () => {
    // Thiết lập animated stagger cho chuỗi xử lý animated bên trong
    Animated.stagger(200, [
      Animated.timing(this.state.colorAnimation, {
        toValue: 1, // Thực hiện animated với giá trị là 1
        duration: 500, // Thực hiện animated trong vongg 500 milliseconds
      }),
      Animated.timing(this.state.scaleAnimation, {
        toValue: 2, // Thực hiện animated với giá trị là 1
        duration: 300, // Thực hiện animated trong vongg 300 milliseconds
      }),
    ]).start();
  };
  // END: Tạo function startAnimation để thực hiện Animated cùng stagger

  render() {
    // BEGIN: Khai báo thuộc tính animated styles muốn thực hiện Animated
    // Khai báo giá trị trong thuộc tính animated interpolate cho background color cùng input range và output range
    const backgroundColorInterpolate = this.state.colorAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgb(255,99,71)", "rgb(99,71,255)"],
    });

    // Khai báp giá trị trong thuộc tính animated styles được gán cho object cùng interpolate phía trên và một khai báo animated scale trước đó
    const boxStyles = {
      backgroundColor: backgroundColorInterpolate,
      transform: [{ scale: this.state.scaleAnimation }],
    };
    // END: Khai báo thuộc tính animated styles muốn thực hiện Animated

    return (
      <View style={styles.container}>
        <Text style={[globalStyles.subTitle, { paddingBottom: 16 }]}>
          Stagger
        </Text>
        {/* BEGIN: Thực hiện hành động Animated khi bấm vào sẽ thực hiện function startAnimation */}
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          {/* BEGIN: Gán giá trị của animatedStyles vào thành phần trên UI muốn thực hiện Animated */}
          {/* Trường hợp object box đã có style color thì sẽ được replace bằng thông số từ inputRange và outputRange */}
          <Animated.View
            style={[styles.box, boxStyles, { width: 120, height: 120 }]}
          />
          {/* END: Gán giá trị của animatedStyles vào thành phần trên UI muốn thực hiện Animated */}
        </TouchableWithoutFeedback>
        {/* END: Thực hiện hành động Animated khi bấm vào sẽ thực hiện function startAnimation */}
      </View>
    );
  }
}
// END: Stagger

// BEGIN: Delay
class Delay extends PureComponent {
  // BEGIN: Khai báo state có chứa thuộc tính Animated.Value
  state = {
    colorAnimation: new Animated.Value(0), // Khai báo giá trị Animated đầu tiên là color
    scaleAnimation: new Animated.Value(1), // Khai báo giá trị Animated tiếp theo là scale
  };
  // END: Khai báo state có chứa thuộc tính Animated.Value

  // BEGIN: Tạo function startAnimation để thực hiện Animated
  startAnimation = () => {
    // Thiết lập animated sequence cho các thành phần bên trong khi triển khai animated
    Animated.sequence([
      // Thiết lập giá trị animated đầu tiên với animated timing
      Animated.timing(this.state.colorAnimation, {
        toValue: 1, // Thực hiện animated với giá trị là 1
        duration: 500, // Thực hiện animated trong vòng 500 milliseconds
      }),
      // Thiết lập giá trị animated tiếp theo với animated timing
      Animated.timing(this.state.scaleAnimation, {
        toValue: 2, // Thực hiện animated với giá trị là 2
        duration: 300, // Thực hiện animated trong vòng 300 milliseconds
      }),
      // Thiết lập giá trị animated delay, sau 1,5 giây sẽ triển khai các giá trị animated tiếp đó
      Animated.delay(1500),
      // Thiết lập animated parallel cho các thành phần bên trong khi triển khai animated
      Animated.parallel([
        // Thiết lập giá trị animated đầu tiên với animated timing
        Animated.timing(this.state.colorAnimation, {
          toValue: 0, // Thực hiện animated với giá trị là 0
          duration: 500, // Thực hiện animated trong vòng 500 milliseconds
        }),
        // Thiết lập giá trị animated tiếp theo với animated timing
        Animated.timing(this.state.scaleAnimation, {
          toValue: 1, // Thực hiện animated với giá trị là 1
          duration: 300, // Thực hiện animated trong vòng 300 milliseconds
        }),
      ]),
    ]).start();
  };
  // END: Tạo function startAnimation để thực hiện Animated

  render() {
    // BEGIN: Khai báo thuộc tính animated styles muốn thực hiện Animated
    // Khai báo giá trị trong thuộc tính animated interpolate cho background color cùng input range và output range
    const backgroundColorInterpolate = this.state.colorAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgb(255,99,71)", "rgb(99,71,255)"],
    });

    // Khai báp giá trị trong thuộc tính animated styles được gán cho object cùng interpolate phía trên và một khai báo animated scale trước đó
    const boxStyles = {
      backgroundColor: backgroundColorInterpolate,
      transform: [{ scale: this.state.scaleAnimation }],
    };
    // END: Khai báo thuộc tính animated styles muốn thực hiện Animated

    return (
      <View style={styles.container}>
        <Text style={[globalStyles.subTitle, { paddingBottom: 16 }]}>
          Delay
        </Text>
        {/* BEGIN: Thực hiện hành động Animated khi bấm vào sẽ thực hiện function startAnimation */}
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          {/* BEGIN: Gán giá trị của animatedStyles vào thành phần trên UI muốn thực hiện Animated */}
          {/* Trường hợp object box đã có style color thì sẽ được replace bằng thông số từ inputRange và outputRange */}
          <Animated.View
            style={[styles.box, boxStyles, { width: 120, height: 120 }]}
          />
          {/* END: Gán giá trị của animatedStyles vào thành phần trên UI muốn thực hiện Animated */}
        </TouchableWithoutFeedback>
        {/* END: Thực hiện hành động Animated khi bấm vào sẽ thực hiện function startAnimation */}
      </View>
    );
  }
}
// END: Delay

export default class Section05CombiningAnimations extends PureComponent {
  render() {
    return (
      <View style={globalStyles.container}>
        <ScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          <SafeAreaView>
            <StatusBar style="auto" />
            <Parallel />
            <Sequence />
            <Stagger />
            <Delay />
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}
