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
        <Text>
          The constructor method is called, by React, every time you make a
          component
        </Text>
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
        <Text>
          The getDerivedStateFromProps method is called right before the render
          method
        </Text>
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
        <Text>
          The render() method is required, and is the method that actually
          outputs the HTML to the DOM
        </Text>
        <Text>This is the content of the Header component</Text>
      </View>
    );
  }
}

class ComponentDidMountExample extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { favoritecolor: "red" };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ favoritecolor: "yellow" });
    }, 1000);
  }

  render() {
    return (
      <View style={{ paddingTop: 16, paddingBottom: 16 }}>
        <Text>componentDidMount()</Text>
        <Text>
          The componentDidMount() method is called after the component is
          rendered
        </Text>
        <Text>My Favorite Color is {this.state.favoritecolor}</Text>
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
