// Read more: https://blog.logicwind.com/search-with-algolia/
import React, { PureComponent } from "react";
import { StyleSheet, View, SafeAreaView, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  InstantSearch,
  connectRefinementList,
} from "react-instantsearch-native";
import Filters from "./Filters";
import SearchBox from "./SearchBox";
import InfiniteHits from "./InfiniteHits";

const VirtualRefinementList = connectRefinementList(() => null);

export default class InstantSearchExample extends PureComponent {
  root = {
    Root: View,
    props: {
      style: {
        flex: 1,
      },
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      searchState: {},
    };
  }

  toggleModal = () => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
    }));
  };

  onSearchStateChange = (searchState) => {
    this.setState(() => ({
      searchState,
    }));
  };

  render() {
    const { isModalOpen, searchState } = this.state;

    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar style="auto" />
        <View style={styles.container}>
          <InstantSearch
            appId="B1G2GM9NG0"
            apiKey="aadef574be1f9252bb48d4ea09b5cfe5"
            indexName="demo_ecommerce"
            root={this.root}
            searchState={searchState}
            onSearchStateChange={this.onSearchStateChange}
          >
            <VirtualRefinementList attribute="brand" />
            <Filters
              isModalOpen={isModalOpen}
              searchState={searchState}
              toggleModal={this.toggleModal}
              onSearchStateChange={this.onSearchStateChange}
            />
            <SearchBox />
            <Button
              title="Show Filters Modal"
              color="red"
              onPress={this.toggleModal}
            />
            <InfiniteHits />
          </InstantSearch>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#252b33",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
