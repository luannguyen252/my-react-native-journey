import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  PanResponder,
  PanResponderInstance,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Platform,
  StyleSheet,
  ScrollView,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const PULL_SHOW_SEARCH_VIEW_MARGIN = 100; //Khoảng cách để kích hoạt hiển thị search view
const PULL_SHOW_BOTTOM_TAB_MARGIN = 30; //Khoảng cách để kích hoạt hiển thị bottom tab

const TEXT_INPUT_MARGIN_TOP = 30;

interface Props {}
interface State {}

export default class NotificationScreen extends Component<Props, State> {
  //searchview config
  inputRef: React.RefObject<TextInput> = React.createRef();
  searchViewOpacity: Animated.Value = new Animated.Value(0);
  blueViewTranslateY: Animated.Value = new Animated.Value(0);
  isShowSearchView: boolean = false;
  panResponder: PanResponderInstance;
  scrollOnTop: boolean = true;

  //bottomTab config
  scroll = new Animated.Value(0);
  diffY: Animated.AnimatedDiffClamp;
  isShowingBottomTab: boolean = true;

  constructor(props: Props) {
    super(props);

    //searchview
    this.panResponder = this.createPanResponder();

    //bottom tab
    this.diffY = Animated.diffClamp(
      this.scroll,
      0,
      2 * PULL_SHOW_BOTTOM_TAB_MARGIN
    );
  }
  createPanResponder = (): PanResponderInstance => {
    return PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        console.log(gestureState.dx);

        if (
          (!this.isShowSearchView && gestureState.dy <= 0) ||
          Math.abs(gestureState.dx) > 10
        ) {
          return false;
        }

        if (gestureState.dy === 0 && gestureState.dx === 0) {
          return false;
        }

        return this.scrollOnTop;
      },
      onPanResponderMove: (_, gestureState) => {
        const { dy } = gestureState;
        let opacity;

        //Chưa vuốt
        if (dy === 0) {
          return;
        }

        //Vuốt xuống dy
        if (dy > 0) {
          opacity = dy / PULL_SHOW_SEARCH_VIEW_MARGIN;
          //Nếu searchview ở trạng thái ẩn thì áp dụng opacity tăng dần 0->(dy/MARGIN)
          if (!this.isShowSearchView) {
            this.searchViewOpacity.setValue(opacity);
          } else {
            //Nếu searchview ở trạng thái hiện thì dịch chuyển view xanh (giống ios) 0.5*dy
            this.blueViewTranslateY.setValue(0.5 * dy);
          }
          return;
        }

        //Vuốt lên |dy|
        if (dy < 0) {
          opacity =
            -dy / PULL_SHOW_SEARCH_VIEW_MARGIN > 1
              ? 0
              : 1 + dy / PULL_SHOW_SEARCH_VIEW_MARGIN;
          //Nếu searchview ở trạng thái hiện thì áp dụng opacity tiến về 0
          if (this.isShowSearchView) {
            // Ẩn bàn phím nếu có vuốt lên trong trường hợp đang mở searchview (this.isShowSearchView === true)
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

        if (dy > PULL_SHOW_SEARCH_VIEW_MARGIN && dy > 0) {
          this.showSearchView();
          this.inputRef.current?.focus();
          return;
        }

        if (
          dy < 0 ||
          (dy > 0 &&
            dy <= PULL_SHOW_SEARCH_VIEW_MARGIN &&
            !this.isShowSearchView)
        ) {
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

  //bottom tab
  setTabBarVisible = (isShow: boolean) => {
    if (this.isShowingBottomTab === isShow) {
      return;
    }
    this.isShowingBottomTab = isShow;
    this.props.navigation?.dangerouslyGetParent()?.setOptions({
      tabBarVisible: isShow,
    });
  };

  onPress = () => {
    //[option] ẩn searchview
    this.hideSearchView(1000);

    //[option]
    this.inputRef.current?.blur();

    //xử lí onPress
    // {
    //   ex. navigate đến các navigator.screen khác
    // }
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
          <TouchableHighlight style={styles.button} onPress={this.onPress}>
            <Text>Ẩn search view</Text>
          </TouchableHighlight>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );

  _renderContent = () => {
    const contentTranslateY = this.searchViewOpacity.interpolate({
      //content dịch chuyển Y theo khi kích hoạt searchview (giống ios)
      inputRange: [0, 1],
      outputRange: [0, 70],
    });

    const contentScaleX = this.searchViewOpacity.interpolate({
      //content co lai 1->0.95 theo khi kích hoạt searchview (giống ios)
      inputRange: [0, 1],
      outputRange: [1, 0.95],
    });

    return (
      <Animated.ScrollView
        nestedScrollEnabled={true}
        style={styles.scrollViewContainer}
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 70, paddingBottom: 100 }}
        // onScroll={this.handleScroll}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.scroll } } }],
          {
            useNativeDriver: false,
            listener: (event) => {
              //searchview
              this.handleScroll(event);
            },
          }
        )}
        bounces={false}
      >
        <Animated.View
          style={{
            transform: [
              {
                translateY: contentTranslateY,
              },
              { scaleX: contentScaleX },
            ],
          }}
        >
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={[styles.scrollViewItem, { backgroundColor: "white" }]}
          >
            <View
              style={[styles.viewItemInScroll, { backgroundColor: "yellow" }]}
            >
              <Text style={styles.contentText}>
                Khi scroll vị trí 0, kéo xuống để mở search view (feature 1)
              </Text>
            </View>
            <View
              style={[styles.viewItemInScroll, { backgroundColor: "hotpink" }]}
            >
              <Text style={styles.contentText}>{"Có thể\ncuộn ngang"}</Text>
            </View>
            <View
              style={[styles.viewItemInScroll, { backgroundColor: "blue" }]}
            />
          </ScrollView>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={[styles.scrollViewItem, { backgroundColor: "white" }]}
          >
            <View
              style={[styles.viewItemInScroll, { backgroundColor: "orange" }]}
            >
              <Text style={styles.contentText}>
                {"Kéo lên để đóng bottom tab \n(feature 2)"}
              </Text>
            </View>
            <View
              style={[styles.viewItemInScroll, { backgroundColor: "blue" }]}
            />
            <View
              style={[styles.viewItemInScroll, { backgroundColor: "green" }]}
            />
          </ScrollView>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={[styles.scrollViewItem, { backgroundColor: "white" }]}
          >
            <View
              style={[styles.viewItemInScroll, { backgroundColor: "red" }]}
            />
            <View
              style={[styles.viewItemInScroll, { backgroundColor: "pink" }]}
            />
            <View
              style={[styles.viewItemInScroll, { backgroundColor: "black" }]}
            />
          </ScrollView>

          <View style={[styles.viewItem, { backgroundColor: "yellow" }]} />
          <View style={[styles.viewItem, { backgroundColor: "white" }]} />
          <View style={[styles.viewItem, { backgroundColor: "pink" }]}>
            <Text style={styles.contentText}>
              {"Kéo xuống để mở bottom tab \n(feature 2)"}
            </Text>
          </View>
          <View style={[styles.viewItem, { backgroundColor: "yellow" }]} />
          <View style={[styles.viewItem, { backgroundColor: "white" }]} />
          <View style={[styles.viewItem, { backgroundColor: "red" }]} />

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={[styles.scrollViewItem, { backgroundColor: "white" }]}
          >
            <View
              style={[styles.viewItemInScroll, { backgroundColor: "red" }]}
            />
            <View
              style={[styles.viewItemInScroll, { backgroundColor: "black" }]}
            />
            <View
              style={[styles.viewItemInScroll, { backgroundColor: "blue" }]}
            />
          </ScrollView>
        </Animated.View>
      </Animated.ScrollView>
    );
  };

  handleScroll = (event: any) => {
    this.scrollOnTop = event.nativeEvent.contentOffset.y <= 0;

    //bottom tab
    this.setTabBarVisible(
      this.diffY.__getValue() < PULL_SHOW_BOTTOM_TAB_MARGIN || this.scrollOnTop //scroll đang ở top thì buộc phải hiển thị bottom tab
    );
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
  pan_container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "dodgerblue",
    opacity: 0,
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
  contentText: {
    fontSize: 18,
    marginHorizontal: 20,
    textAlign: "center",
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
  viewItem: {
    height: 200,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "red",
    marginTop: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewItem: {
    height: 200,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "red",
    marginTop: 20,
    borderRadius: 10,
  },
  viewItemInScroll: {
    height: 200,
    width: 200,
    alignSelf: "center",
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  flatlistItem: {
    height: 50,
    width: 300,
    alignSelf: "center",
    backgroundColor: "orange",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
