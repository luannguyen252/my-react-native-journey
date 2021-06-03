// Read more: https://github.com/algolia/react-instantsearch
import React, { PureComponent } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";

const searchClient = algoliasearch(
  "latency",
  "6be0576ff61c053d5f9a3225e2a90f76"
);

const AlgoliasearchExample = () => (
  <InstantSearch indexName="bestbuy" searchClient={searchClient}>
    <SearchBox />
    <Hits />
  </InstantSearch>
);

export default class InstantSearchExample extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <StatusBar style="auto" />
          <Text style={styles.text}>Instant Search Example</Text>
          <AlgoliasearchExample />
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
