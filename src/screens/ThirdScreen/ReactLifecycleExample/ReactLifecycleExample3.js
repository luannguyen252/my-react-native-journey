import React, { Component, PureComponent } from "react";
import { View, Text, Button } from "react-native";

// componentWillUnmount
class ComponentWillUnmountContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { show: true };
  }

  delHeader = () => {
    this.setState({ show: false });
  };

  render() {
    let myHeader;

    if (this.state.show) {
      myHeader = <Child />;
    }

    return (
      <View>
        {myHeader}
        <Button title="Delete Header" onPress={() => this.delHeader()} />
      </View>
    );
  }
}

class Child extends Component {
  componentWillUnmount() {
    alert("The component named Header is about to be unmounted.");
  }

  render() {
    return <Text>The component named Header is about to be unmounted.</Text>;
  }
}

class ComponentWillUnmountExample extends PureComponent {
  render() {
    return (
      <View style={{ paddingTop: 16, paddingBottom: 16 }}>
        <Text>componentWillUnmount()</Text>
        <Text>
          The next phase in the lifecycle is when a component is removed from
          the DOM, or unmounting as React likes to call it.
        </Text>
        <Text>
          React has only one built-in method that gets called when a component
          is unmounted: componentWillUnmount()
        </Text>
        <Text>
          The componentWillUnmount method is called when the component is about
          to be removed from the DOM
        </Text>
        <ComponentWillUnmountContainer />
      </View>
    );
  }
}

export default class ReactLifecycleExample3 extends PureComponent {
  render() {
    return (
      <View>
        <Text>Unmounting</Text>
        <ComponentWillUnmountExample />
      </View>
    );
  }
}
