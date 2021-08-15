import React, { PureComponent } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default class Section09UsingAndUnderstandingSetNativeProps extends PureComponent {
  // BEGIN: Khai báo giá trị State cho Animated
  state = {
    animation: new Animated.Value(0), // Set giá trị Animated ban đầu là 0
  };
  // END: Khai báo giá trị State cho Animated

  // Set giá trị enabled là true
  _enabled = true;

  // BEGIN: Khai báo hàm toggle khi thực hiện bấm vào sẽ triển khai các tác vụ bên trong
  handleToggle = () => {
    this._enabled = !this._enabled;
    let style = [styles.scroll];

    if (!this._enabled) {
      style.push(styles.hide);
    } else {
      // style.push(styles.show)
    }

    this._scroll.setNativeProps({
      scrollEnabled: this._enabled,
      style,
    });
  };
  // END: Khai báo hàm toggle khi thực hiện bấm vào sẽ triển khai các tác vụ bên trong

  render() {
    // BEGIN: Khi báo Animated sử dụng Interpolate
    const bgInterpolate = this.state.animation.interpolate({
      inputRange: [0, 3000],
      outputRange: ["rgb(255,99,71)", "rgb(99,71,255)"],
    });
    // END: Khi báo Animated sử dụng Interpolate

    // BEGIN: Khai báo giá trị style áp dụng Interpolate
    const scrollStyle = {
      backgroundColor: bgInterpolate,
    };
    // END: Khai báo giá trị style áp dụng Interpolate

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.handleToggle}>
          <Text>Toggle</Text>
        </TouchableOpacity>

        <ScrollView
          style={styles.scroll}
          ref={(scroll) => (this._scroll = scroll)}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  y: this.state.animation,
                },
              },
            },
          ])}
        >
          <Animated.View style={[styles.fakeContent, scrollStyle]} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  scroll: {
    flex: 1,
    opacity: 1,
  },
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
  fakeContent: {
    height: 3000,
    backgroundColor: "tomato",
  },
});
