import React, { Component } from "react";
import { BackAndroid, Navigator, ToastAndroid } from "react-native";

import { MainView } from "./MainView";
import { FlexboxView1 } from "./FlexboxView1";
import { FlexboxView2 } from "./FlexboxView2";
import { _ } from "lodash";

import * as styles from "../styles/Styles";

const routes = [
  {
    name: "main view",
    index: 0,
  },
  {
    name: "flexbox view 1",
    index: 1,
  },
  {
    name: "flexbox view 2",
    index: 2,
  },
];

let _navigator, _route;

class Router extends Component {
  constructor(props) {
    super(props);
    BackAndroid.addEventListener("hardwareBackPress", () => {
      let msg = "back press";
      let length = _navigator.getCurrentRoutes().length;
      if (!_.isNil(_navigator)) {
        msg = `${msg} length=${length}`;
      }
      if (!_.isNil(_route)) {
        msg = `${msg} index=${_route.index}, name=${_route.name}`;
      }
      ToastAndroid.show(msg, 10000);

      if (length === 1 || length === routes.length) {
        return false;
      }
      _navigator.pop();
      return true;
    });
  }

  render() {
    return (
      <Navigator
        configureScene={this.configureScene}
        style={styles.router_style.container}
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={this.renderScene}
      />
    );
  }

  configureScene() {
    return Navigator.SceneConfigs.FloatFromBottom;
  }

  renderScene(route, navigator) {
    _navigator = navigator;
    _route = route;
    switch (route.index) {
      case 0:
        return <MainView navigator={navigator} title={route.name} />;
      case 1:
        return <FlexboxView1 navigator={navigator} title={route.name} />;
      case 2:
        return <FlexboxView2 navigator={navigator} title={route.name} />;
    }
  }

  componentWillMount() {
    console.log(`Router component will mount`);
  }
}

export { Router };
