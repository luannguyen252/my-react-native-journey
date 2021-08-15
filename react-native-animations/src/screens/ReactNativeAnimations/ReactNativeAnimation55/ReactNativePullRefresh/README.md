### Installation

1. Install the package using either:

```sh
$ npm install --save react-native-pull-refresh
# or
$ yarn add react-native-pull-refresh
```

2. Install and link the Lottie package (renders Adobe After Effect animations):
   https://github.com/airbnb/lottie-react-native

```sh
yarn add lottie-react-native
# or
npm i --save lottie-react-native

react-native link lottie-react-native
```

### Usage

This code is taken from `examples/SimpleAnimations/weatherAnimation` sample

You can find `< Header />` and `< ScrollItem />` components in the sample folder

```jsx
import PullToRefresh from "react-native-pull-refresh";

export default class weatherAnimation extends Component {
  constructor() {
    super();
    this.state = {
      isRefreshing: false,
    };
  }

  onRefresh() {
    this.setState({ isRefreshing: true });

    // Simulate fetching data from the server
    setTimeout(() => {
      this.setState({ isRefreshing: false });
    }, 5000);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header />
        <View style={{ flex: 7, backgroundColor: "#F8F4FC" }}>
          <PullToRefresh
            isRefreshing={this.state.isRefreshing}
            onRefresh={this.onRefresh.bind(this)}
            animationBackgroundColor={"#564A63"}
            pullHeight={180}
            contentView={
              <ScrollView>
                <ScrollItem />
                <ScrollItem />
                <ScrollItem />
                <ScrollItem />
                <ScrollItem />
                <ScrollItem />
                <ScrollItem />
                <ScrollItem />
                <ScrollItem />
              </ScrollView>
            }
            onPullAnimationSrc={require("./umbrella_pull.json")}
            onStartRefreshAnimationSrc={require("./umbrella_start.json")}
            onRefreshAnimationSrc={require("./umbrella_repeat.json")}
            onEndRefreshAnimationSrc={require("./umbrella_end.json")}
          />
        </View>
      </View>
    );
  }
}
```

#### Animation Files Format

Lottie JSON - https://github.com/airbnb/lottie-react-native

Lottie is a mobile library, developed by AirBnB for Android and iOS that parses Adobe After Effects animations exported as JSON with bodymovin and renders them natively on mobile.

Lottie allows to easily use animations in react-native apps. You just need to create an animation in Adobe After Effects and export it with bodymovin addon to AE https://github.com/bodymovin/bodymovin.

You can find file examples in `examples/SimpleAnimations/animations` folder

#### General Props

| Prop                           | Type       | Description                                     |
| ------------------------------ | ---------- | ----------------------------------------------- |
| **`isRefreshing`**             | `Boolean`  | Refresh state set by parent to trigger refresh. |
| **`pullHeight`**               | `Integer`  | Pull Distance _Default 180._                    |
| **`onRefresh`**                | `Function` | Callback after refresh event                    |
| **`contentView`**              | `Object`   | The content: ScrollView or ListView             |
| **`animationBackgroundColor`** | `string`   | Background color                                |
| **`onScroll`**                 | `Function` | Custom onScroll event                           |

#### Animation Source Files Props

| Prop                             | Description                                                                   |
| -------------------------------- | ----------------------------------------------------------------------------- |
| **`onPullAnimationSrc`**         | Animation JSON that runs when scroll view is pulled down                      |
| **`onStartRefreshAnimationSrc`** | Animation JSON that runs after view was pulled and released                   |
| **`onRefreshAnimationSrc`**      | Animation JSON that runs continuously until isRefreshing props is not changed |
| **`onEndRefreshAnimationSrc`**   | Animation JSON that runs after isRefreshing props is changed                  |
