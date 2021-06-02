import React, { Component, PureComponent } from "react";
import { View, Text, Button } from "react-native";

// getDerivedStateFromProps()
class Show extends PureComponent {
  constructor() {
    super();
    this.state = {
      email: "",
    };
  }

  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps method is called");
    return { email: props.email };
  }

  render() {
    return (
      <View>
        <Text>Email: {this.state.email}</Text>
      </View>
    );
  }
}

class GetDerivedStateFromPropsExample extends PureComponent {
  constructor() {
    super();
    this.state = {
      show: false,
    };
  }

  render() {
    return (
      <View style={{ paddingTop: 16, paddingBottom: 16 }}>
        <Text>getDerivedStateFromProps()</Text>
        <Text>
          If the component gets updated, the getDerivedStateFromProps() method
          is called
        </Text>
        <Text>User List</Text>
        <Button
          title="Fetch Users"
          onPress={() => this.setState({ show: true })}
        />
        {this.state.show ? <Show email="qwerty@gmail.com" /> : null}
      </View>
    );
  }
}

// getDerivedStateFromProps()
class GetDerivedStateFromPropsExample2 extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { favoriteColor: "red" };
  }

  static getDerivedStateFromProps(props, state) {
    return { favoriteColor: props.favcol };
  }

  changeColor = () => {
    this.setState({ favoriteColor: "blue" });
    console.log("Change color to blue");
  };

  render() {
    return (
      <View>
        <Text>My Favorite Color is {this.state.favoriteColor}</Text>
        <Button title="Change Color" onPress={() => this.changeColor()} />
      </View>
    );
  }
}

// shouldComponentUpdate()
class ShouldComponentUpdateExample extends Component {
  constructor(props) {
    super(props);
    this.state = { favoriteColor: "red" };
  }

  shouldComponentUpdate() {
    // return false;
    return true;
  }

  changeColor = () => {
    this.setState({ favoriteColor: "blue" });
    console.log("Change color to blue");
  };

  render() {
    return (
      <View style={{ paddingTop: 16, paddingBottom: 16 }}>
        <Text>shouldComponentUpdate()</Text>
        <Text>
          In the shouldComponentUpdate() method you can return a Boolean value
          that specifies whether React should continue with the rendering or
          not. The default value is true.
        </Text>
        <Text>
          The example below shows what happens when the shouldComponentUpdate()
          method returns false:
        </Text>
        <Text>My Favorite Color is {this.state.favoriteColor}</Text>
        <Button title="Change Color" onPress={() => this.changeColor()} />
      </View>
    );
  }
}

// render()
class RenderExample extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { favoriteColor: "red" };
  }

  changeColor = () => {
    this.setState({ favoriteColor: "blue" });
  };

  render() {
    return (
      <View style={{ paddingTop: 16, paddingBottom: 16 }}>
        <Text>render()</Text>
        <Text>
          The render() method is of course called when a component gets updated
        </Text>
        <Text>Click the button to make a change in the component's state</Text>
        <Text>My Favorite Color is {this.state.favoriteColor}</Text>
        <Button title="Change Color" onPress={() => this.changeColor()} />
      </View>
    );
  }
}

// getSnapshotBeforeUpdate()
class GetSnapshotBeforeUpdateExample extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { favoriteColor: "red" };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ favoriteColor: "yellow" });
    }, 1000);
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log(
      `Before the update, the favorite was ${prevState.favoriteColor}`
    );

    return prevState;
  }

  componentDidUpdate() {
    console.log(`The updated favorite is ${this.state.favoriteColor}`);
  }

  render() {
    return (
      <View style={{ paddingTop: 16, paddingBottom: 16 }}>
        <Text>getSnapshotBeforeUpdate()</Text>
        <Text>
          In the getSnapshotBeforeUpdate() method you have access to the props
          and state before the update, meaning that even after the update, you
          can check what the values were before the update.
        </Text>
        <Text>
          If the getSnapshotBeforeUpdate() method is present, you should also
          include the componentDidUpdate() method, otherwise you will get an
          error.
        </Text>
        <Text>
          When the component is mounting it is rendered with the favorite color
          "red".
        </Text>
        <Text>
          When the component has been mounted, a timer changes the state, and
          after one second, the favorite color becomes "yellow".
        </Text>
        <Text>My Favorite Color is {this.state.favoriteColor}</Text>
      </View>
    );
  }
}

// componentDidUpdate()
class ComponentDidUpdateExample extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { favoriteColor: "red" };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ favoriteColor: "yellow" });
    }, 1000);
  }

  componentDidUpdate() {
    console.log(`The updated favorite is ${this.state.favoriteColor}`);
  }

  render() {
    return (
      <View style={{ paddingTop: 16, paddingBottom: 16 }}>
        <Text>componentDidUpdate()</Text>
        <Text>
          The componentDidUpdate method is called after the component is updated
          in the DOM
        </Text>
        <Text>
          When the component is mounting it is rendered with the favorite color
          "red".
        </Text>
        <Text>
          When the component has been mounted, a timer changes the state, and
          the color becomes "yellow".
        </Text>
        <Text>My Favorite Color is {this.state.favoriteColor}</Text>
      </View>
    );
  }
}

export default class ReactLifecycleExample2 extends PureComponent {
  render() {
    return (
      <View>
        <Text>Updating</Text>
        <GetDerivedStateFromPropsExample />
        <GetDerivedStateFromPropsExample2 favcol="yellow" />
        <ShouldComponentUpdateExample />
        <RenderExample />
        <GetSnapshotBeforeUpdateExample />
        <ComponentDidUpdateExample />
      </View>
    );
  }
}
