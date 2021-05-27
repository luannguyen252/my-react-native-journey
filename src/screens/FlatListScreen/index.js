import React, { PureComponent } from "react";
import { View, Text, SafeAreaView, FlatList, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import globalStyles from "../../assets/styles/globalStyles";
import FlatListExample1 from "./examples/FlatListExample1";
import FlatListExample2 from "./examples/FlatListExample2";

export default class FlatListScreen extends PureComponent {
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  };

  getListViewItem = (item) => {
    Alert.alert(item.key);
  };

  render() {
    return (
      <View style={globalStyles.container}>
        <SafeAreaView>
          <StatusBar style="auto" />
          {/* <FlatListExample2 /> */}
          <Text style={{}}>Flat List</Text>
          <FlatList
            data={[
              { key: "Android" },
              { key: "iOS" },
              { key: "Java" },
              { key: "Swift" },
              { key: "Php" },
              { key: "Hadoop" },
              { key: "Sap" },
              { key: "Python" },
              { key: "Ajax" },
              { key: "C++" },
              { key: "Ruby" },
              { key: "Rails" },
              { key: ".Net" },
              { key: "Perl" },
              { key: "Sap 2" },
              { key: "Python 2" },
              { key: "Ajax 2" },
              { key: "C++ 2" },
              { key: "Ruby 2" },
              { key: "Rails 2" },
              { key: ".Net 2" },
              { key: "Perl 2" },
            ]}
            renderItem={({ item }) => (
              <Text
                style={styles.item}
                onPress={this.getListViewItem.bind(this, item)}
              >
                {item.key}
              </Text>
            )}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
