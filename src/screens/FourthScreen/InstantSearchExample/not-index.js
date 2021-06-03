// Read more: https://dev.to/iam_timsmith/lets-build-a-search-bar-in-react-120j
import React, { PureComponent } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";

class List extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filtered: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      filtered: this.props.items,
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      filtered: nextProps.items,
    });
  }

  handleChange(e) {
    // Variable to hold the original version of the list
    let currentList = [];
    // Variable to hold the filtered list before putting into state
    let newList = [];

    // If the search bar isn't empty
    if (e.target.value !== "") {
      // Assign the original list to currentList
      currentList = this.props.items;
      // Use .filter() to determine which items should be displayed
      // based on the search terms
      newList = currentList.filter((item) => {
        // change current item to lowercase
        const lc = item.toLowerCase();
        // change search term to lowercase
        const filter = e.target.value.toLowerCase();
        // check to see if the current list item includes the search term
        // If it does, it will be added to newList. Using lowercase eliminates
        // issues with capitalization in search terms and search content
        return lc.includes(filter);
      });
    } else {
      // If the search bar is empty, set newList to original task list
      newList = this.props.items;
    }
    // Set the filtered state based on what our rules added to newList
    this.setState({
      filtered: newList,
    });
  }

  render() {
    return (
      <View>
        <TextInput
          style={styles.input}
          onChangeText={(value) => this.handleChange(value)}
        />
        {this.state.filtered.map((item, index) => (
          <Text key={index}>{item}</Text>
        ))}
      </View>
    );
  }
}

export default class InstantSearchExample extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      list: ["Go to the store", "Wash the dishes", "Learn some code"],
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <StatusBar style="auto" />
          <Text style={styles.text}>Instant Search Example</Text>
          <List items={this.state.list} />
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  text: {},
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
