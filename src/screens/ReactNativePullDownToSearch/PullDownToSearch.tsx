import React, { Component } from "react";

import {
  Alert,
  Animated,
  Dimensions,
  Easing,
  NativeScrollEvent,
  NativeSyntheticEvent,
  PanResponder,
  PanResponderInstance,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Platform,
  StyleSheet,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const MARGIN = 100; // Khoảng cách để kích hoạt hiển thị search view
const TEXT_INPUT_MARGIN_TOP = 30;

interface Props {}
interface State {}

export class PullDownToSearch extends Component<Props, State> {
  inputRef: React.RefObject<TextInput> = React.createRef();
  searchViewOpacity: Animated.Value = new Animated.Value(0);
  blueViewTranslateY: Animated.Value = new Animated.Value(0);
  isShowSearchView: boolean = false;
  panResponder: PanResponderInstance;
  scrollOnTop: boolean = true;

  constructor(props: Props) {
    super(props);

    this.panResponder = this.createPanResponder();
  }

  createPanResponder = (): PanResponderInstance => {
    return PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        if (!this.isShowSearchView && gestureState.dy <= 0) {
          return false;
        }

        return this.scrollOnTop;
      },

      onPanResponderMove: (_, gestureState) => {
        const { dy } = gestureState;
        let opacity;

        // Chưa vuốt
        if (dy === 0) {
          return;
        }

        // Vuốt xuống dy
        if (dy > 0) {
          opacity = dy / MARGIN;
          // Nếu searchview ở trạng thái ẩn thì áp dụng opacity tăng dần 0->(dy/MARGIN)
          if (!this.isShowSearchView) {
            this.searchViewOpacity.setValue(opacity);
          } else {
            // Nếu searchview ở trạng thái hiện thì dịch chuyển view xanh (giống ios) 0.5*dy
            this.blueViewTranslateY.setValue(0.5 * dy);
          }
          return;
        }

        // Vuốt lên |dy|
        if (dy < 0) {
          opacity = -dy / MARGIN > 1 ? 0 : 1 + dy / MARGIN;
          // Nếu searchview ở trạng thái hiện thì áp dụng opacity tiến về 0
          if (this.isShowSearchView) {
            //  Ẩn bàn phím nếu có vuốt lên trong trường hợp đang mở searchview (this.isShowSearchView === true)
            this.inputRef.current?.blur();
            this.searchViewOpacity.setValue(opacity);
          }
          return;
        }
      },

      onPanResponderRelease: (_, gestureState) => {
        const { dy } = gestureState;
        if (this.isShowSearchView) {
          Animated.timing(this.blueViewTranslateY, {
            duration: 500,
            toValue: 0,
            useNativeDriver: false,
            easing: Easing.elastic(0.8),
          }).start();
        }

        if (dy > MARGIN && dy > 0) {
          this.showSearchView();
          this.inputRef.current?.focus();
          return;
        }

        if (dy < 0 || (dy > 0 && dy <= MARGIN && !this.isShowSearchView)) {
          this.hideSearchView();
          return;
        }
      },
      onPanResponderTerminate: () => {
        this.showSearchView();
        this.inputRef.current?.focus();
      },
    });
  };

  showSearchView = (animationTime = 500) => {
    this.isShowSearchView = true;
    Animated.timing(this.searchViewOpacity, {
      duration: animationTime,
      toValue: 1,
      useNativeDriver: false,
      easing: Easing.elastic(0.8),
    }).start();
  };

  hideSearchView = (animationTime = 300) => {
    this.isShowSearchView = false;
    Animated.timing(this.searchViewOpacity, {
      duration: animationTime,
      toValue: 0,
      useNativeDriver: false,
      easing: Easing.out(Easing.exp),
    }).start();
  };

  _renderSearchView = () => (
    <Animated.View
      style={[
        styles.searchViewContainer,
        {
          opacity: this.searchViewOpacity,
          transform: [
            {
              translateX: this.searchViewOpacity.interpolate({
                inputRange: [0, 0.005, 0.01, 1],
                outputRange: [SCREEN_WIDTH, SCREEN_WIDTH, 0, 0],
              }),
            },
          ],
        },
      ]}
    >
      <Animated.View
        style={{
          opacity: this.searchViewOpacity.interpolate({
            inputRange: [0, 0.8, 1],
            outputRange: [0, 1, 1],
          }),
          transform: [
            {
              translateY: this.searchViewOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [0, TEXT_INPUT_MARGIN_TOP],
              }),
            },
          ],
        }}
      >
        <TextInput
          ref={this.inputRef}
          style={styles.input}
          placeholder="Nhập từ khoá để tìm kiếm"
        />

        <Animated.View
          style={[
            styles.blueView,
            {
              transform: [
                {
                  translateY: this.blueViewTranslateY,
                },
              ],
            },
          ]}
        >
          <Text style={styles.textInSearchView}>
            Đây là nội dung trong view Xanh
          </Text>
          <Text style={styles.textInSearchView}>
            View Xanh, TextInput là con của view đỏ
          </Text>
          <TouchableHighlight
            style={styles.button}
            onPress={() => Alert.alert("Thông báo", "onPress")}
          >
            <Text>Button</Text>
          </TouchableHighlight>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );

  _renderContent = () => (
    <Animated.ScrollView
      style={styles.scrollViewContainer}
      scrollEventThrottle={1}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: 50 }}
      onScroll={this.handleScroll}
      bounces={true}
    >
      {this.props.children}
    </Animated.ScrollView>
  );

  handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    this.scrollOnTop = event.nativeEvent.contentOffset.y <= 0;
  };

  render() {
    return (
      <View style={styles.container} {...this.panResponder.panHandlers}>
        {this._renderSearchView()}
        {this._renderContent()}
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
  },
  scrollViewContainer: {
    width: "100%",
    backgroundColor: "dodgerblue",
  },
  searchViewContainer: {
    height: "100%",
    width: "100%",
    position: "absolute",
    backgroundColor: "red",
    zIndex: 1,
    paddingTop: Platform.OS === "ios" ? 25 : 0,
  },
  contentContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: "white",
    height: 50,
    paddingHorizontal: 15,
    fontSize: 18,
    width: "90%",
    marginBottom: 25,
    alignSelf: "center",
    borderRadius: 10,
  },
  textInSearchView: {
    color: "white",
    fontSize: 16,
  },
  blueView: {
    backgroundColor: "dodgerblue",
    width: "90%",
    height: 200,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  button: {
    height: 50,
    width: 200,
    alignSelf: "center",
    backgroundColor: "orange",
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
