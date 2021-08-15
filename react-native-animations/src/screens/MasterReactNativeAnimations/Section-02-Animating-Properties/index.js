import { StatusBar } from "expo-status-bar";
import React, { PureComponent } from "react";
import {
  ScrollView,
  View,
  Text,
  SafeAreaView,
  Animated,
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

// BEGIN: Opacity
class Opacity extends PureComponent {
  // BEGIN: Khai báo state có chứa thuộc tính Animated.Value
  state = {
    animation: new Animated.Value(1),
  };
  // END: Khai báo state có chứa thuộc tính Animated.Value

  // BEGIN: Tạo function startAnimation để thực hiện Animated
  startAnimation = () => {
    // Sử dụng thuộc tính Animated.timing để thực hiện Animated cho object dạng thời gian gồm có toValue là giá trị và duration là thời gian thực hiện
    Animated.timing(this.state.animation, {
      toValue: 0,
      duration: 350,
      useNativeDriver: false,
    }).start(() => {
      // Tạo thêm một thuộc tính Animated.timing nữa để khiến object quay lại giá trị ban đầu
      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: 500,
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
          Opacity
        </Text>
        {/* BEGIN: Thực hiện hành động Animated khi bấm vào sẽ thực hiện function startAnimation */}
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          {/* BEGIN: Gán giá trị của animatedStyles vào thành phần trên UI muốn thực hiện Animated */}
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
// END: Opacity

// BEGIN: Translate Position
class TranslatePosition extends PureComponent {
  // BEGIN: Khai báo state có chứa thuộc tính Animated.Value
  state = {
    animation: new Animated.Value(0),
  };
  // END: Khai báo state có chứa thuộc tính Animated.Value

  // BEGIN: Tạo function startAnimation để thực hiện Animated
  startAnimation = () => {
    // Sử dụng thuộc tính Animated.timing để thực hiện Animated cho object dạng thời gian gồm có toValue là giá trị và duration là thời gian thực hiện
    Animated.timing(this.state.animation, {
      toValue: 150,
      duration: 1500,
      useNativeDriver: false,
    }).start(() => {
      // Tạo thêm một thuộc tính Animated.timing nữa để khiến object quay lại giá trị ban đầu
      this.state.animation.setValue(0); // Khi object thực hiện Animated tới giá trị 150 thì sẽ quay về điểm ban đầu với giá trị là 0
    });
  };
  // END: Tạo function startAnimation để thực hiện Animated

  render() {
    // BEGIN: Khai báo thuộc tính animatedStyles muốn thực hiện Animated
    const animatedStyles = {
      transform: [
        {
          translateX: this.state.animation, // Sử dụng translateX (X axis) cho chuyển động ngang hoặc translateY (Y axis) cho chuyển động dọc
        },
      ],
    };
    // END: Khai báo thuộc tính animatedStyles muốn thực hiện Animated

    return (
      <View style={styles.container}>
        <Text style={[globalStyles.subTitle, { paddingBottom: 16 }]}>
          Translate Position
        </Text>
        {/* BEGIN: Thực hiện hành động Animated khi bấm vào sẽ thực hiện function startAnimation */}
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          {/* BEGIN: Gán giá trị của animatedStyles vào thành phần trên UI muốn thực hiện Animated */}
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
// END: Translate Position

// BEGIN: Scale
class Scale extends PureComponent {
  // BEGIN: Khai báo state có chứa thuộc tính Animated.Value
  state = {
    animation: new Animated.Value(1),
  };
  // END: Khai báo state có chứa thuộc tính Animated.Value

  // BEGIN: Tạo function startAnimation để thực hiện Animated
  startAnimation = () => {
    // Sử dụng thuộc tính Animated.timing để thực hiện Animated cho object dạng thời gian gồm có toValue là giá trị và duration là thời gian thực hiện
    Animated.timing(this.state.animation, {
      toValue: -2, // -2 để quay ngược lại object
      duration: 1500,
      useNativeDriver: false,
    }).start();
  };
  // END: Tạo function startAnimation để thực hiện Animated

  render() {
    // BEGIN: Khai báo thuộc tính animatedStyles muốn thực hiện Animated
    const animatedStyles = {
      transform: [
        {
          // Khai báo thuộc tính style là scale để thực hiện co giãn
          // Sử dụng scaleX (X axis) để co giãn theo chiều ngang
          // Sử dụng scaleY (Y axis) để co giãn theo chiều dọc
          scale: this.state.animation,
        },
      ],
    };
    // END: Khai báo thuộc tính animatedStyles muốn thực hiện Animated

    return (
      <View style={styles.container}>
        <Text style={[globalStyles.subTitle, { paddingBottom: 16 }]}>
          Scale
        </Text>
        {/* BEGIN: Thực hiện hành động Animated khi bấm vào sẽ thực hiện function startAnimation */}
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          {/* BEGIN: Gán giá trị của animatedStyles vào thành phần trên UI muốn thực hiện Animated */}
          <Animated.View
            style={[styles.box, animatedStyles, { width: 120, height: 120 }]}
          >
            <Text
              style={[
                globalStyles.bodyText,
                {
                  color: colors.orange50,
                  textAlign: "center",
                },
              ]}
            >
              This side forward
            </Text>
          </Animated.View>
          {/* END: Gán giá trị của animatedStyles vào thành phần trên UI muốn thực hiện Animated */}
        </TouchableWithoutFeedback>
        {/* END: Thực hiện hành động Animated khi bấm vào sẽ thực hiện function startAnimation */}
      </View>
    );
  }
}
// END: Scale

// BEGIN: Width/Height Values
class WidthHeightValues extends PureComponent {
  // BEGIN: Khai báo state có chứa thuộc tính Animated.Value
  state = {
    animation: new Animated.Value(120),
  };
  // END: Khai báo state có chứa thuộc tính Animated.Value

  // BEGIN: Tạo function startAnimation để thực hiện Animated
  startAnimation = () => {
    // Sử dụng thuộc tính Animated.timing để thực hiện Animated cho object dạng thời gian gồm có toValue là giá trị và duration là thời gian thực hiện
    Animated.timing(this.state.animation, {
      toValue: 300,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  };
  // END: Tạo function startAnimation để thực hiện Animated

  render() {
    // BEGIN: Khai báo thuộc tính animatedStyles muốn thực hiện Animated
    const animatedStyles = {
      width: this.state.animation, // Khai báo thuộc tính Animated cho Width của object
      height: this.state.animation, // Khai báo thuộc tính Animated cho Height của object
    };
    // END: Khai báo thuộc tính animatedStyles muốn thực hiện Animated

    return (
      <View style={styles.container}>
        <Text style={[globalStyles.subTitle, { paddingBottom: 16 }]}>
          Width/Height Values
        </Text>
        {/* BEGIN: Thực hiện hành động Animated khi bấm vào sẽ thực hiện function startAnimation */}
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          {/* BEGIN: Gán giá trị của animatedStyles vào thành phần trên UI muốn thực hiện Animated */}
          <Animated.View style={[styles.box, animatedStyles]}>
            <Text
              style={[
                globalStyles.bodyText,
                {
                  color: colors.orange50,
                  textAlign: "center",
                  paddingTop: 16,
                  paddingLeft: 16,
                  paddingRight: 16,
                  paddingBottom: 16,
                },
              ]}
            >
              "The quick brown fox jumps over the lazy dog" is an
              English-language pangram—a sentence that contains all of the
              letters of the English alphabet. Owing to its brevity and
              coherence, it has become widely known. The phrase is commonly used
              for touch-typing practice, testing typewriters and computer
              keyboards, displaying examples of fonts, and other applications
              involving text where the use of all letters in the alphabet is
              desired.
            </Text>
          </Animated.View>
          {/* END: Gán giá trị của animatedStyles vào thành phần trên UI muốn thực hiện Animated */}
        </TouchableWithoutFeedback>
        {/* END: Thực hiện hành động Animated khi bấm vào sẽ thực hiện function startAnimation */}
      </View>
    );
  }
}
// END: Width/Height Values

// BEGIN: Absolute Position
class AbsolutePosition extends PureComponent {
  // BEGIN: Khai báo state có chứa thuộc tính Animated.Value
  state = {
    animation: new Animated.Value(0),
  };
  // END: Khai báo state có chứa thuộc tính Animated.Value

  // BEGIN: Tạo function startAnimation để thực hiện Animated
  startAnimation = () => {
    // Sử dụng thuộc tính Animated.timing để thực hiện Animated cho object dạng thời gian gồm có toValue là giá trị và duration là thời gian thực hiện
    Animated.timing(this.state.animation, {
      toValue: 300,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  };
  // END: Tạo function startAnimation để thực hiện Animated

  render() {
    // BEGIN: Khai báo thuộc tính animatedStyles muốn thực hiện Animated
    const animatedStyles = {
      // top: this.state.animation, // Khai báo bị trí top cho object khi thực hiện Animated
      left: this.state.animation, // Khai báo bị trí left cho object khi thực hiện Animated
      // right: this.state.animation, // Khai báo bị trí right cho object khi thực hiện Animated
      bottom: this.state.animation, // Khai báo bị trí bottom cho object khi thực hiện Animated
    };
    // END: Khai báo thuộc tính animatedStyles muốn thực hiện Animated

    return (
      <View style={styles.container}>
        <Text style={[globalStyles.subTitle, { paddingBottom: 16 }]}>
          Absolute Position
        </Text>
        {/* BEGIN: Thực hiện hành động Animated khi bấm vào sẽ thực hiện function startAnimation */}
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          {/* BEGIN: Gán giá trị của animatedStyles vào thành phần trên UI muốn thực hiện Animated */}
          <Animated.View
            style={[
              styles.box,
              animatedStyles,
              {
                width: 120,
                height: 120,
                position: "absolute",
                // Có thể là bug khi set thuộc tính style trong object ban đầu khi không thực hiện được Animated
                // top: 0,
                // left: 0,
                // right: 0,
                // bottom: 0,
                zIndex: 1,
              },
            ]}
          />
          {/* END: Gán giá trị của animatedStyles vào thành phần trên UI muốn thực hiện Animated */}
        </TouchableWithoutFeedback>
        {/* END: Thực hiện hành động Animated khi bấm vào sẽ thực hiện function startAnimation */}
      </View>
    );
  }
}
// END: Absolute Position

// BEGIN: Color/Background Color
class ColorBackgroundColor extends PureComponent {
  // BEGIN: Khai báo state có chứa thuộc tính Animated.Value
  state = {
    animation: new Animated.Value(0), // Giá trị của Value = 0 thì tương ứng với inputRange [0] và giá trị đưa ra là outputRange[0]
  };
  // END: Khai báo state có chứa thuộc tính Animated.Value

  // BEGIN: Tạo function startAnimation để thực hiện Animated
  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 1, // Khi thực hiện startAnimation sẽ active inputRange [1] tương ứng với giá trị đưa ra là outputRange [1]
      duration: 1500, // Thực hiện Animated hoàn thành trong 1,5 giây
      useNativeDriver: false,
    }).start(() => {
      // Sau khi kết thúc Animated trước đó, sẽ tiếp đến thực hiện Animated tiếp theo
      Animated.timing(this.state.animation, {
        toValue: 0, // Quay trở về giá trị ban đầu là 0 tương ứng với inputRange [0] và outputRange[0]
        duration: 1500, // Thực hiện Animated hoàn thành trong 1,5 giây
        useNativeDriver: false,
      }).start();
    });
  };
  // END: Tạo function startAnimation để thực hiện Animated

  render() {
    // BEGIN: Khai báo thuộc tính interpolation muốn thực hiện Animated
    const boxInterpolation = this.state.animation.interpolate({
      // Khi sử dụng interpolation sẽ có 2 loại array truyền vào gồm có inputRange và outputRange
      inputRange: [0, 1], // Dải dữ liệu thông số được đưa vào inputRange
      outputRange: ["#16A34A", "#2563EB"], // Dải dữ liệu thông số được đưa ra outputRange
    });
    // END: Khai báo thuộc tính interpolation muốn thực hiện Animated

    // BEGIN: Khai báo thuộc tính interpolation khác
    const colorInterpolation = this.state.animation.interpolate({
      // Khi sử dụng interpolation sẽ có 2 loại array truyền vào gồm có inputRange và outputRange
      inputRange: [0, 1], // Dải dữ liệu thông số được đưa vào inputRange
      outputRange: ["#2563EB", "#16A34A"], // Dải dữ liệu thông số được đưa ra outputRange
    });
    // END: Khai báo thuộc tính interpolation khác

    // BEGIN: Khai báo thuộc tính styles muốn thực hiện Animated cho Box
    const boxAnimatedStyle = {
      backgroundColor: boxInterpolation, // Background color sẽ thay đổi theo thuộc tính outputRange
    };
    // END: Khai báo thuộc tính styles muốn thực hiện Animated cho Box

    // BEGIN: Khai báo thuộc tính styles muốn thực hiện Animated cho Text
    const textAnimatedStyle = {
      color: colorInterpolation, // Text color sẽ thay đổi theo thuộc tính outputRange
    };
    // END: Khai báo thuộc tính styles muốn thực hiện Animated cho Text

    return (
      <View style={styles.container}>
        <Text style={[globalStyles.subTitle, { paddingBottom: 16 }]}>
          Color/Background Color
        </Text>
        {/* BEGIN: Thực hiện hành động Animated khi bấm vào sẽ thực hiện function startAnimation */}
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          {/* BEGIN: Gán giá trị của animatedStyles vào thành phần trên UI muốn thực hiện Animated */}
          {/* Trường hợp object box đã có style color thì sẽ được replace bằng thông số từ inputRange và outputRange */}
          <Animated.View style={[styles.box, boxAnimatedStyle]}>
            <Animated.Text
              style={[
                globalStyles.bodyText,
                textAnimatedStyle,
                {
                  // color: "#FFFFFF", // Remove thuộc tính Color ở object vì sẽ không nhận thuộc tính khác từ khai báo colorInterpolation
                  textAlign: "center",
                  paddingTop: 16,
                  paddingLeft: 16,
                  paddingRight: 16,
                  paddingBottom: 16,
                },
              ]}
            >
              Hello World!
            </Animated.Text>
          </Animated.View>
          {/* END: Gán giá trị của animatedStyles vào thành phần trên UI muốn thực hiện Animated */}
        </TouchableWithoutFeedback>
        {/* END: Thực hiện hành động Animated khi bấm vào sẽ thực hiện function startAnimation */}
      </View>
    );
  }
}
// END: Color/Background Color

// BEGIN: Rotation
class Rotation extends PureComponent {
  // BEGIN: Khai báo state có chứa thuộc tính Animated.Value
  state = {
    animation: new Animated.Value(0),
  };
  // END: Khai báo state có chứa thuộc tính Animated.Value

  // BEGIN: Tạo function startAnimation để thực hiện Animated
  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 360, // Khi thực hiện startAnimation sẽ thực hiện giá trị ở inputRange[360] với giá trị là outputRange["360deg"]
      duration: 1500, // Thời gian thực hiện là 1,5 giây
      useNativeDriver: false,
    }).start();
  };
  // END: Tạo function startAnimation để thực hiện Animated

  render() {
    // BEGIN: Khai báo thuộc tính interpolate muốn thực hiện Animated
    const rotateInterpolate = this.state.animation.interpolate({
      inputRange: [0, 360], // Giá trị truyền vào gồm có 0 và 360
      outputRange: ["0deg", "360deg"], // Giá trị trả về cho 0 là 0deg và 360 tương ứng 360deg
    });
    // END: Khai báo thuộc tính interpolate muốn thực hiện Animated

    // BEGIN: Khai báo thuộc tính styles muốn thực hiện Animated
    const animatedStyles = {
      transform: [
        {
          // rotateX: rotateInterpolate, // Thực hiện rotate animated với X axis, theo chiều dọc
          // rotateY: rotateInterpolate, // Thực hiện rotate animated với Y axis, theo chiều ngang
          rotate: rotateInterpolate,
        },
      ],
    };
    // END: Khai báo thuộc tính styles muốn thực hiện Animated

    return (
      <View style={styles.container}>
        <Text style={[globalStyles.subTitle, { paddingBottom: 16 }]}>
          Rotation
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
// END: Rotation

// BEGIN: Width/Height Percentage
class WidthHeightPercentage extends PureComponent {
  // BEGIN: Khai báo state có chứa thuộc tính Animated.Value
  state = {
    animation: new Animated.Value(0), // Thực hiện giá trị ở inputRange[0]
  };
  // END: Khai báo state có chứa thuộc tính Animated.Value

  // BEGIN: Tạo function startAnimation để thực hiện Animated
  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 1, // Thực hiện giá trị ở inputRange[1]
      duration: 1500, // Thực hiện Animated trong thời gian là 1,5 giây
      useNativeDriver: false,
    }).start();
  };
  // END: Tạo function startAnimation để thực hiện Animated

  render() {
    // BEGIN: Khai báo thuộc tính interpolate muốn thực hiện Animated
    const widthInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1], // Gán 2 giá trị vào là 0 và 1
      outputRange: ["20%", "50%"], // Gán 2 giá trị ra là 0 tương ứng với 20% và 1 tương ứng với 50%
    });
    // END: Khai báo thuộc tính interpolate muốn thực hiện Animated

    // BEGIN: Khai báo thuộc tính interpolate muốn thực hiện Animated
    const heightInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1], // Gán 2 giá trị vào là 0 và 1
      outputRange: ["20%", "30%"], // Gán 2 giá trị ra là 0 tương ứng với 20% và 1 tương ứng với 30%
    });
    // END: Khai báo thuộc tính interpolate muốn thực hiện Animated

    // BEGIN: Khai báo thuộc tính animatedStyles muốn thực hiện Animated
    const animatedStyles = {
      width: widthInterpolate, // Tương ứng với width sẽ thực hiện các giá trị mà widthInterpolate trả về
      height: heightInterpolate, // Tương ứng với height sẽ thực hiện các giá trị mà heightInterpolate trả về
    };
    // END: Khai báo thuộc tính animatedStyles muốn thực hiện Animated

    return (
      <View style={styles.container}>
        <Text style={[globalStyles.subTitle, { paddingBottom: 16 }]}>
          Width/Height Percentage
        </Text>
        {/* BEGIN: Thực hiện hành động Animated khi bấm vào sẽ thực hiện function startAnimation */}
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          {/* BEGIN: Gán giá trị của animatedStyles vào thành phần trên UI muốn thực hiện Animated */}
          {/* Trường hợp object box đã có style color thì sẽ được replace bằng thông số từ inputRange và outputRange */}
          <Animated.View
            style={[
              styles.box,
              animatedStyles,
              // { width: "20%", height: "20%" }, // Không được gán giá trị cố định ban đầu, sẽ không thực hiện được Animated
            ]}
          />
          {/* END: Gán giá trị của animatedStyles vào thành phần trên UI muốn thực hiện Animated */}
        </TouchableWithoutFeedback>
        {/* END: Thực hiện hành động Animated khi bấm vào sẽ thực hiện function startAnimation */}
      </View>
    );
  }
}
// END: Width/Height Percentage

export default class Section02AnimatingProperties extends PureComponent {
  render() {
    return (
      <View style={globalStyles.container}>
        <ScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          <SafeAreaView>
            <StatusBar style="auto" />
            <Opacity />
            <TranslatePosition />
            <Scale />
            <WidthHeightValues />
            <AbsolutePosition />
            <ColorBackgroundColor />
            <Rotation />
            <WidthHeightPercentage />
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}
