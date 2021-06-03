// Read more: https://reactnativeforyou.com/how-to-use-filter-method-in-react-native/
import React, { useState, PureComponent } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  FlatList,
  Button,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const FilterMethodFunctionExample = () => {
  const [data, setData] = useState([
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "one",
    "one",
  ]);

  const onPress = () => {
    const newData = data.filter((item) => {
      return item !== "one";
    });
    setData(newData);
  };

  return (
    <View
      style={{ margin: 10, justifyContent: "center", alignItems: "center" }}
    >
      <FlatList data={data} renderItem={({ item }) => <Text>{item}</Text>} />
      <Button onPress={onPress} title="Click here to filter" color="#841584" />
    </View>
  );
};

export default class FilterMethodExample extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: ["one", "two", "three", "four", "five", "six", "one", "one"],
    };
  }

  onPress = () => {
    const newData = this.state.data.filter((item) => {
      return item !== "one";
    });
    this.setState({
      data: newData,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <StatusBar style="auto" />
          <View
            style={{
              margin: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FlatList
              data={this.state.data}
              renderItem={({ item, index }) => <Text key={index}>{item}</Text>}
              keyExtractor={(item) => item.id}
            />
            <Button
              onPress={this.onPress}
              title="Click here to filter"
              color="#841584"
            />
          </View>
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
