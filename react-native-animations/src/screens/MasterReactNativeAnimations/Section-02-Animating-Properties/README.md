# Animating Properties

## Basic Setup

```javascript
// BEGIN: Rotation
class Rotation extends PureComponent {
  // BEGIN: Khai báo state có chứa thuộc tính Animated.Value
  state = {
    animation: new Animated.Value(0),
  };
  // END: Khai báo state có chứa thuộc tính Animated.Value

  // BEGIN: Tạo function startAnimation để thực hiện Animated
  startAnimation = () => {};
  // END: Tạo function startAnimation để thực hiện Animated

  render() {
    // BEGIN: Khai báo thuộc tính animatedStyles muốn thực hiện Animated
    const animatedStyles = {};
    // END: Khai báo thuộc tính animatedStyles muốn thực hiện Animated

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
```

## Animated.timing

> Animated.timing will allow you to define an animation for a set duration. You will animate from one value to another.

**Basic Animated and Animated.timing**

Each `Animated` method generally follows the signature `Animated.timing(ANIMATED_VALUE, CONFIGURATION)`.

The `ANIMATED_VALUE` is an instance of `Animated.Value`.

This is an instance that can be passed around, and is typically passed into an `Animated.View`.

When using an `Animated.View` it will attach listeners onto the `Animated.Value` you provide it.

Once you trigger start an animation on the `Animated.Value` it will be notified and know when and what to update.

```javascript
new Animated.Value(0)

constructor(props) {
  super(props);

  this._animation = new Animated.Value(0)
}

constructor(props) {
  super(props);

  this.state = {
    snowflakes: [
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0)
    ]
  }
}

componentWillMount() {
  this._animation = new Animated.Value(0)
}
```

## Interpolation

Interpolation is a method of constructing data points from within a range of a discrete set of known data points.

What that means is given a value and at least 2 other numbers we can figure out where in the range we are.

This is great for deriving animations from a single animated value. When interpolating it allows us to connect animations. When the animations are connected with interpolate it requires you to control a singular value and drive a range of animations. Meaning less work for us, and better animations.
