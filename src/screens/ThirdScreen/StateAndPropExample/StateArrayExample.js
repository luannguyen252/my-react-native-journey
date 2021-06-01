// Read more: https://www.robinwieruch.de/react-state-array-add-update-remove
import React, { PureComponent } from "react";
import { View, Text, Button } from "react-native";

const persons = [
  {
    name: "Luan Nguyen",
    age: 30,
    job: "Designer",
  },
  {
    name: "Steve Jobs",
    age: 40,
    job: "CEO",
  },
  {
    name: "Craig Federighi",
    age: 35,
    job: "Software Engineer",
  },
];

const personsUpdate = [
  {
    name: "Luan Nguyen 2",
    age: 35,
    job: "Vice President of Design",
  },
  {
    name: "Steve Jobs 2",
    age: 45,
    job: "Board of Directors",
  },
  {
    name: "Craig Federighi 2",
    age: 40,
    job: "Vice President of Software Engineering",
  },
];

export default class StateArrayExample extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      persons,
      personsUpdate,
    };
  }

  clearPerson = () => {
    this.setState({ persons: [] });
  };

  resetPerson = () => {
    this.setState({ persons });
  };

  changePerson = (name, age, job) => {
    this.setState((state) => {
      const persons = state.personsUpdate.filter(
        (item) => (item.name !== name, item.age !== age, item.job !== job)
      );
      return { persons };
    });
  };

  render() {
    return (
      <View>
        {this.state.persons.map((item, index) => (
          <Text key={index}>
            My name is {item.name}, {item.age} year old, my job is {item.job}.
          </Text>
        ))}

        <Button title="Change Person" onPress={() => this.changePerson()} />
        <Button title="Clear Person" onPress={() => this.clearPerson()} />
        <Button title="Reset Person" onPress={() => this.resetPerson()} />
      </View>
    );
  }
}
