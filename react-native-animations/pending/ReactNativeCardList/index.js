import React, { PureComponent } from "react";
import { StyleSheet, View, Text, Dimensions, Alert } from "react-native";
import CardList from "./CardList";

var { width, height } = Dimensions.get("screen");

var LIST = [
  { color: "red" },
  { color: "blue" },
  { color: "darkgray" },
  { color: "pink" },
  { color: "green" },
  { color: "yellow" },
  { color: "red" },
  { color: "blue" },
  { color: "darkgray" },
  { color: "pink" },
  { color: "green" },
  { color: "yellow" },
  { color: "red" },
  { color: "blue" },
  { color: "darkgray" },
  { color: "pink" },
  { color: "green" },
  { color: "yellow" },
];

export default class ReactNativeCardList extends PureComponent {
  onClickCard(i) {
    Alert.alert(i + "");
  }

  renderRow(data, i, width, height) {
    return (
      <View
        style={{
          width,
          height,
          backgroundColor: data.color,
          alignItems: "center",
        }}
      >
        <Text>{i}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <CardList
          list={LIST}
          renderRow={this.renderRow}
          height={300}
          scrollOffset={1000}
          panelHeight={height - 100}
          panelWidth={width - 100}
          offsetTop={50}
          offsetLeft={50}
          onClickCard={this.onClickCard}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
});
