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
  PanResponder,
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

// BEGIN: Timing
class Timing extends PureComponent {
  // BEGIN: Khai báo state có chứa thuộc tính Animated.Value
  state = {
    animation: new Animated.Value(1),
  };
  // END: Khai báo state có chứa thuộc tính Animated.Value

  // BEGIN: Tạo function startAnimation để thực hiện Animated
  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 0, // Thực hiện Animated với giá trị là 0
      duration: 350, // Thực hiện Animated trong thời gian là 350 ms
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(this.state.animation, {
        toValue: 1, // Sau khi thực hiện Animated trước sau đó sẽ thực hiện Animated với giá trị là 1
        duration: 500, // Thực hiện Animated trong thời gian là 500 ms
        useNativeDriver: false,
      }).start();
    });
  };
  // END: Tạo function startAnimation để thực hiện Animated

  render() {
    // BEGIN: Khai báo thuộc tính animatedStyles muốn thực hiện Animated
    const animatedStyles = {
      opacity: this.state.animation,
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
    // Thêm Listener vào State Animation cho việc hiển thị giá trị Value
    this.state.animation.addListener(({ value }) => {
      console.log(value); // Hiển thị các thông số giá trị mà Animated trả về khi thực hiện Animation State
    });

    // Sử dụng thư viện Animated là Spring
    Animated.spring(this.state.animation, {
      toValue: 2, // Giá trị thực hiện Animated là 2
      friction: 2, // Controls "bounciness"/overshoot. Default 7.
      tension: 160, // Controls speed. Default 40.
      // speed: 12, // Controls speed of the animation. Default 12.
      // bounciness: 8, // Controls bounciness. Default 8.
      duration: 1500, // Thời gian thực hiện Animated là 1,5 giây
      // velocity: The initial velocity of the object attached to the spring. Default 0 (object is at rest).
      // overshootClamping: Boolean indicating whether the spring should be clamped and not bounce. Default false.
      // restDisplacementThreshold: The threshold of displacement from rest below which the spring should be considered at rest. Default 0.001.
      // restSpeedThreshold: The speed at which the spring should be considered at rest in pixels per second. Default 0.001.
      // delay: Start the animation after delay (milliseconds). Default 0.
      // isInteraction: Whether or not this animation creates an "interaction handle" on the InteractionManager. Default true.
      useNativeDriver: false, // useNativeDriver: Uses the native driver when true. Default false.
    }).start(() => {
      Animated.timing(this.state.animation, {
        toValue: 1, // Sau khi khi thực hiện Animated trước thì quay lại giá trị 1
        duration: 1500, // Thời gian thực hiện Animated là 1,5 giây
        useNativeDriver: false, // useNativeDriver: Uses the native driver when true. Default false.
      }).start();
    });
  };
  // END: Tạo function startAnimation để thực hiện Animated

  render() {
    // BEGIN: Khai báo thuộc tính animatedStyles muốn thực hiện Animated
    const animatedStyles = {
      transform: [{ scale: this.state.animation }], // Sử dụng thuộc tính scale cho Animated
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

// BEGIN: Loop
class Loop extends PureComponent {
  // BEGIN: Khai báo state có chứa thuộc tính Animated.Value
  state = {
    animation: new Animated.Value(0),
  };
  // END: Khai báo state có chứa thuộc tính Animated.Value

  // BEGIN: Tạo function startAnimation để thực hiện Animated Loop
  startAnimation = () => {
    // Sử dụng Loop cho Animated
    Animated.loop(
      // Sử dụng Timing cho Animated
      Animated.timing(this.state.animation, {
        toValue: 1, // Set giá trị khi thực hiện Animated là 1
        duration: 1500, // Set thời gian thực hiện Animated là 1,5 giây
        useNativeDriver: false,
      })
    ).start();
  };
  // END: Tạo function startAnimation để thực hiện Animated Loop

  render() {
    // END: Khai báo thuộc tính interpolate muốn thực hiện Animated
    const rotateInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });
    // END: Khai báo thuộc tính interpolate muốn thực hiện Animated

    // BEGIN: Khai báo thuộc tính animatedStyles muốn thực hiện Animated
    const animatedStyles = {
      transform: [{ rotate: rotateInterpolate }],
    };
    // END: Khai báo thuộc tính animatedStyles muốn thực hiện Animated

    return (
      <View style={styles.container}>
        <Text style={[globalStyles.subTitle, { paddingBottom: 16 }]}>Loop</Text>
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
// END: Loop

// BEGIN: Decay
class Decay extends PureComponent {
  // BEGIN: Khai báo state có chứa thuộc tính Animated.Value
  state = {
    animation: new Animated.ValueXY(0), // Sử dụng thư viện Animated.ValueXY
  };
  // END: Khai báo state có chứa thuộc tính Animated.Value

  // BEGIN: Sử dụng React Lifecyle là componentWillMount()
  UNSAFE_componentWillMount() {
    //
    this._x = 0;
    this._y = 0;

    //
    this.state.animation.addListener((value) => {
      this._x = value.x;
      this._y = value.y;
    });

    // Khởi tạo thư viện Pan Responder
    this._panResponder = PanResponder.create({
      //
      onStartShouldSetPanResponder: () => true,
      //
      onMoveShouldSetPanResponder: () => true,
      //
      onPanResponderGrant: () => {
        //
        this.state.animation.setOffset({
          x: this._x,
          y: this._y,
        });
        //
        this.state.animation.setValue({
          x: 0,
          y: 0,
        });
      },
      // onPanResponderGrant: (e, gestureState) => {
      //   this.state.animation.extractOffset();
      // },
      //
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.animation.x, //
          dy: this.state.animation.y, //
        },
      ]),
      //
      onPanResponderRelease: (e, { vx, vy }) => {
        Animated.decay(this.state.animation, {
          //
          velocity: {
            x: vx,
            y: vy,
          },
          //
          deceleration: 0.997,
        }).start();
      },
    });
  }
  // END: Sử dụng React Lifecyle là componentWillMount()

  render() {
    // BEGIN: Khai báo thuộc tính animatedStyles muốn thực hiện Animated
    const animatedStyles = {
      transform: this.state.animation.getTranslateTransform(),
    };
    // END: Khai báo thuộc tính animatedStyles muốn thực hiện Animated

    return (
      <View style={styles.container}>
        <Text style={[globalStyles.subTitle, { paddingBottom: 16 }]}>
          Decay
        </Text>
        {/* BEGIN: Có thể drag object di chuyển theo các hướng X axis hoặc Y axis, sử dụng pan responder */}
        <Animated.View
          style={[styles.box, animatedStyles, { width: 120, height: 120 }]}
          // Sử dụng spread operator cho pan responder, đồng thời áp dụng View làm object có thể áp dụng drag gesture
          {...this._panResponder.panHandlers}
        />
        {/* END: Có thể drag object di chuyển theo các hướng X axis hoặc Y axis, sử dụng pan responder */}
      </View>
    );
  }
}
// END: Decay

// BEGIN: Add
class Add extends PureComponent {
  // BEGIN: Khai báo state có chứa thuộc tính Animated.Value
  state = {
    animation: new Animated.Value(0), // Khởi tạo giá trị Animated ban đầu là 0
  };
  // END: Khai báo state có chứa thuộc tính Animated.Value

  // BEGIN: Tạo function startAnimation để thực hiện Animated
  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 300, // Chạy đến giá trị Animated là 300
      duration: 1500, // Với thời gian là 1,5 giây
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(this.state.animation, {
        toValue: 0, // Sau khi chạy xong 300 Animated sẽ quay lại về 0
        duration: 1500, // Với thời gian là 200 ms
        useNativeDriver: false,
      }).start();
    });
  };
  // END: Tạo function startAnimation để thực hiện Animated

  render() {
    // Khai báo biến tạo giá trị ngẫu nhiên
    const randomValue = new Animated.Value(50);

    // BEGIN: Thêm một Animated mới, sử dụng Animated.add()
    const newAnimation = Animated.add(this.state.animation, randomValue);
    // END: Thêm một Animated mới, sử dụng Animated.add()

    // BEGIN: Khai báo thuộc tính animatedStyles muốn thực hiện Animated
    const animatedStyles = {
      transform: [
        {
          // translateY: this.state.animation, // Áp dụng animated cho thuộc tính translate Y axis
          translateY: newAnimation, // Áp dụng animated mới từ Animated.add()
        },
      ],
    };
    // END: Khai báo thuộc tính animatedStyles muốn thực hiện Animated

    return (
      <View style={styles.container}>
        <Text style={[globalStyles.subTitle, { paddingBottom: 16 }]}>Add</Text>
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
// END: Add

// BEGIN: Divide
class Divide extends PureComponent {
  // BEGIN: Khai báo state có chứa thuộc tính Animated.Value
  state = {
    animation: new Animated.Value(0), // Khởi tạo giá trị Animated ban đầu là 0
  };
  // END: Khai báo state có chứa thuộc tính Animated.Value

  // BEGIN: Tạo function startAnimation để thực hiện Animated
  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 300, // Chạy đến giá trị Animated là 300
      duration: 1500, // Với thời gian là 1,5 giây
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(this.state.animation, {
        toValue: 0, // Sau khi chạy xong 300 Animated sẽ quay lại về 0
        duration: 1500, // Với thời gian là 200 ms
        useNativeDriver: false,
      }).start();
    });
  };
  // END: Tạo function startAnimation để thực hiện Animated

  render() {
    // BEGIN: Khai báo giá trị ngẫu nhiên
    const randomValue = new Animated.Value(2);
    // END: Khai báo giá trị ngẫu nhiên

    // BEGIN: Thêm một Animated mới, sử dụng Animated.divide()
    const newAnimation = Animated.divide(this.state.animation, randomValue);
    // END: Thêm một Animated mới, sử dụng Animated.divide()

    // BEGIN: Khai báo thuộc tính animatedStyles muốn thực hiện Animated
    const animatedStyles = {
      transform: [
        {
          translateY: newAnimation, // Áp dụng new animated đã được khai báo bên trên cho thuộc tính translate Y axis
        },
      ],
    };
    // END: Khai báo thuộc tính animatedStyles muốn thực hiện Animated

    return (
      <View style={styles.container}>
        <Text style={[globalStyles.subTitle, { paddingBottom: 16 }]}>
          Divide
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
// END: Divide

// BEGIN: Multiply
class Multiply extends PureComponent {
  // BEGIN: Khai báo state có chứa thuộc tính Animated.Value
  state = {
    animation: new Animated.Value(0), // Khởi tạo giá trị Animated ban đầu là 0
  };
  // END: Khai báo state có chứa thuộc tính Animated.Value

  // BEGIN: Tạo function startAnimation để thực hiện Animated
  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 300, // Chạy đến giá trị Animated là 300
      duration: 1500, // Với thời gian là 1,5 giây
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(this.state.animation, {
        toValue: 0, // Sau khi chạy xong 300 Animated sẽ quay lại về 0
        duration: 1500, // Với thời gian là 200 ms
        useNativeDriver: false,
      }).start();
    });
  };
  // END: Tạo function startAnimation để thực hiện Animated

  render() {
    // BEGIN: Khai báo giá trị ngẫu nhiên
    const randomValue = new Animated.Value(6);
    // END: Khai báo giá trị ngẫu nhiên

    // BEGIN: Thêm một Animated mới, sử dụng Animated.divide()
    const newAnimation = Animated.multiply(this.state.animation, randomValue);
    // END: Thêm một Animated mới, sử dụng Animated.divide()

    // BEGIN: Khai báo thuộc tính animatedStyles muốn thực hiện Animated
    const animatedStyles = {
      transform: [
        {
          translateY: newAnimation, // Áp dụng new animated đã được khai báo bên trên cho thuộc tính translate Y axis
        },
      ],
    };
    // END: Khai báo thuộc tính animatedStyles muốn thực hiện Animated

    return (
      <View style={styles.container}>
        <Text style={[globalStyles.subTitle, { paddingBottom: 16 }]}>
          Multiply
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
// END: Multiply

// BEGIN: Modulo
class Modulo extends PureComponent {
  // BEGIN: Khai báo state có chứa thuộc tính Animated.Value
  state = {
    animation: new Animated.Value(0), // Khởi tạo giá trị Animated ban đầu là 0
  };
  // END: Khai báo state có chứa thuộc tính Animated.Value

  // BEGIN: Tạo function startAnimation để thực hiện Animated
  startAnimation = () => {
    // Sử dụng thư viện parallel trong Animated
    Animated.parallel([
      Animated.timing(this.state.animation, {
        toValue: 12, // Thực thi Animated với giá trị gán vào là 12
        duration: 3500, /// Thực hiện Animated trong thời gian hoàn thành là 3,5 giây
      }).start(),
    ]);
  };
  // END: Tạo function startAnimation để thực hiện Animated

  render() {
    // BEGIN: Khai báo giá trị ngẫu nhiên
    const randomValue = 3;
    // END: Khai báo giá trị ngẫu nhiên

    // BEGIN: Thêm một Animated mới, sử dụng Animated.divide()
    const newAnimation = Animated.modulo(this.state.animation, randomValue);
    // END: Thêm một Animated mới, sử dụng Animated.divide()

    // BEGIN: Khai báo một Animated dạng Interpolate
    const interpolated = newAnimation.interpolate({
      inputRange: [0, 3], // Giá trị truyền vào cho input range là từ 0 cho đến 3
      outputRange: ["0deg", "270deg"], // Giá trị được gán cho 0 và 3 trong input range là "0deg" và "270deg"
    });
    // END: Khai báo một Animated dạng Interpolate

    // BEGIN: Khai báo thuộc tính animatedStyles muốn thực hiện Animated
    const animatedStyles = {
      transform: [
        {
          rotate: interpolated, // Áp dụng new animated đã được khai báo bên trên cho thuộc tính rotate
        },
      ],
    };
    // END: Khai báo thuộc tính animatedStyles muốn thực hiện Animated

    return (
      <View style={styles.container}>
        <Text style={[globalStyles.subTitle, { paddingBottom: 16 }]}>
          Modulo
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
// END: Modulo

export default class Section04AnimatedFunctions extends PureComponent {
  render() {
    return (
      <View style={globalStyles.container}>
        <ScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          <SafeAreaView>
            <StatusBar style="auto" />
            <Timing />
            <Spring />
            <Loop />
            {/* BEGIN: Section 04 - Animated Functions Event */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                this.props.navigation.navigate(
                  "Section 04 Animated Functions Event"
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
                Section 04 - Animated Functions Event →
              </Text>
            </TouchableOpacity>
            {/* END: Section 04 - Animated Functions Event */}
            <Decay />
            <Add />
            <Divide />
            <Multiply />
            <Modulo />
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}
