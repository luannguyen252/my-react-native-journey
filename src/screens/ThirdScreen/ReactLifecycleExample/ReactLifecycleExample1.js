import React, { PureComponent } from "react";
import { View, Text } from "react-native";

class ConstructorExample extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { favoritecolor: "red" };
  }

  render() {
    return (
      <View style={{ paddingTop: 16, paddingBottom: 16 }}>
        <Text>constructor()</Text>
        <Text>My Favorite Color is {this.state.favoritecolor}</Text>
      </View>
    );
  }
}

class GetDerivedStateFromPropsExample extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { favoritecolor: "red" };
  }

  static getDerivedStateFromProps(props, state) {
    return { favoritecolor: props.favcol };
  }

  render() {
    return (
      <View style={{ paddingTop: 16, paddingBottom: 16 }}>
        <Text>getDerivedStateFromProps()</Text>
        <Text>My Favorite Color is {this.state.favoritecolor}</Text>
      </View>
    );
  }
}

class RenderExample extends PureComponent {
  render() {
    return (
      <View style={{ paddingTop: 16, paddingBottom: 16 }}>
        <Text>render()</Text>
        <Text></Text>
      </View>
    );
  }
}

class ComponentDidMountExample extends PureComponent {
  render() {
    return (
      <View style={{ paddingTop: 16, paddingBottom: 16 }}>
        <Text>componentDidMount()</Text>
        <Text></Text>
      </View>
    );
  }
}

export default class ReactLifecycleExample1 extends PureComponent {
  render() {
    return (
      <View style={{ paddingTop: 16, paddingBottom: 16 }}>
        <Text>Mounting</Text>
        <ConstructorExample />
        <GetDerivedStateFromPropsExample favcol="violet" />
        <RenderExample />
        <ComponentDidMountExample />
      </View>
    );
  }
}
