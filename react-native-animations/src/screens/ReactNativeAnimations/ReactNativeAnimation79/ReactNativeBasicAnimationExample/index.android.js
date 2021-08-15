/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

var React = require("react-native");
var clamp = require("clamp");
var window = require("Dimensions").get("window");

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
  Component,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
} = React;

const People = [
  "http://hdwallpapersfit.com/wp-content/uploads/2015/02/Most-Beautiful-Girl-in-World-Wallpapers-HD.jpg",
  "http://fotonin.com/data_images/out/2/747596-beautiful-girls.jpg",
  "http://7-themes.com/data_images/out/63/6985933-beautiful-girl-sunglasses-ice-cream-photo.jpg",
  "http://allhdwallpapers.com/wp-content/uploads/2015/05/Kristen-Stewart-7.jpg",
];

class AnimationTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panImage: new Animated.ValueXY(0),
      enter: new Animated.Value(0),
      personUri: People[0],
      menu: "inactive",
      panMusic: new Animated.Value(0),
      rotation: new Animated.Value(0),
    };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        this.state.panImage.setOffset({
          x: this.state.panImage.x._value,
          y: this.state.panImage.y._value,
        });
        this.state.panImage.setValue({ x: 0, y: 0 });
      },

      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.panImage.x, dy: this.state.panImage.y },
      ]),

      onPanResponderRelease: (e, { vx, vy }) => {
        this.state.panImage.flattenOffset();
        var velocity;

        if (vx >= 0) {
          velocity = clamp(vx, 3, 5);
        } else if (vx < 0) {
          velocity = clamp(vx * -1, 3, 5) * -1;
        }

        if (Math.abs(this.state.panImage.x._value) > 120) {
          Animated.decay(this.state.panImage, {
            velocity: { x: velocity, y: vy },
            deceleration: 0.98,
          }).start(this._resetState.bind(this));
        } else {
          Animated.parallel([
            Animated.spring(this.state.panImage, {
              toValue: { x: 0, y: 0 },
              friction: 4,
            }),
            Animated.spring(this.state.enter, {
              toValue: this.state.enter._value === 0.5 ? 1 : 0.5,
              friction: 5,
            }),
          ]).start();
        }
      },
    });
  }

  _goToNextPerson() {
    let currIdx = People.indexOf(this.state.personUri);
    let newIdx = currIdx + 1;

    this.setState({
      personUri: People[newIdx > People.length - 1 ? 0 : newIdx],
    });
  }

  _resetState() {
    this.state.panImage.setValue({ x: 0, y: 0 });
    this.state.enter.setValue(0);
    this._goToNextPerson();
    this._animateEntrance();
  }

  componentDidMount() {
    this._animateEntrance();
  }

  _onPressButton() {
    if (this.state.menu === "active") {
      Animated.sequence([
        Animated.timing(this.state.rotation, {
          toValue: 0,
          duration: 400,
        }),
        Animated.timing(this.state.panMusic, {
          toValue: 0,
          duration: 50,
        }),
      ]).start();
      this.setState({ menu: "inactive" });
    } else {
      Animated.parallel([
        Animated.spring(this.state.panMusic, {
          toValue: 1,
          friction: 5,
          tension: 100,
        }),
        Animated.timing(this.state.rotation, {
          toValue: 1,
          duration: 400,
        }),
      ]).start();
      this.setState({ menu: "active" });
    }
  }

  _animateEntrance() {
    Animated.spring(this.state.enter, { toValue: 1, friction: 5 }).start();
  }

  render() {
    let { panImage, enter, menu, panMusic, rotation, personUri } = this.state;

    let addRotation = rotation.interpolate({
      inputRange: [0, 0.5],
      outputRange: ["0deg", "45deg"],
      extrapolate: "clamp",
    });

    // 45 degree rotation for menu (plus) button.
    let addButtonRotation = { transform: [{ rotate: addRotation }] };

    //
    let iconRotation = rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "-360deg"],
    });
    let translateIconY = panMusic.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -80],
    });
    let menuStyles = {
      transform: [{ translateY: translateIconY }, { rotate: iconRotation }],
    };
    let menuItems = (
      <Animated.Image
        source={{
          uri: "http://www.patentlyapple.com/.a/6a0120a5580826970c01bb07efa879970d-800wi",
        }}
        style={[styles.music, menuStyles]}
      />
    );

    let [translateXImage, translateYImage] = [panImage.x, panImage.y];

    let rotateImage = panImage.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ["-60deg", "0deg", "60deg"],
    });
    let opacityImage = panImage.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: [0.1, 1, 0.1],
    });
    let scaleImage = enter;
    let animatedCardStyles = {
      transform: [
        { translateX: translateXImage },
        { translateY: translateYImage },
        { scale: scaleImage },
        { rotate: rotateImage },
      ],
      opacity: opacityImage,
    };
    return (
      <Animated.View style={[styles.container]}>
        <Animated.View
          style={[
            styles.square,
            animatedCardStyles,
            { backgroundColor: "transparent" },
          ]}
          {...this._panResponder.panHandlers}
        >
          <Image
            source={{ uri: this.state.personUri }}
            style={{
              flex: 1,
              borderRadius: 10,
              marginLeft: 10,
              marginRight: 10,
            }}
          ></Image>
        </Animated.View>
        <View
          style={{
            position: "absolute",
            bottom: 20,
            left: window.width / 2 - 20,
          }}
        >
          <Animated.View>{menuItems}</Animated.View>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={this._onPressButton.bind(this)}
          >
            <Animated.View>
              <Animated.Image
                source={{
                  uri: "https://image.freepik.com/free-icon/add-button--thin-line--ios-7-interface-symbol_318-33624.jpg",
                }}
                style={[styles.add, addButtonRotation]}
              />
            </Animated.View>
          </TouchableHighlight>
        </View>
      </Animated.View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00ffff",
  },
  square: {
    width: window.width,
    height: 200,
    borderRadius: 10,
  },
  add: {
    backgroundColor: "transparent",
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  music: {
    position: "absolute",
    backgroundColor: "transparent",
    height: 30,
    width: 30,
    borderRadius: 15,
  },
});

AppRegistry.registerComponent("AnimationTest", () => AnimationTest);
