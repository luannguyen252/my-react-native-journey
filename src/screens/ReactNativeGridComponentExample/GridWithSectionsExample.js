import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Grid from "react-native-grid-component";

export default class GridWithSectionsExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        hello: generateRandomColorsArray(3),
        react: generateRandomColorsArray(1),
        world: generateRandomColorsArray(2),
      },
    };
  }

  _renderItem = (data, i) => (
    <View style={[{ backgroundColor: data }, styles.item]} key={i} />
  );

  _renderSectionHeader = (data, name) => {
    return (
      <Text key={name} style={styles.sectionHeader}>
        {name}
      </Text>
    );
  };

  _renderPlaceholder = (i) => <View style={styles.item} key={i} />;

  render() {
    return (
      <Grid
        sections
        renderSectionHeader={this._renderSectionHeader}
        style={styles.list}
        renderItem={this._renderItem}
        renderPlaceholder={this._renderPlaceholder}
        data={this.state.data}
        itemsPerRow={2}
        itemHasChanged={(d1, d2) => d1 !== d2}
      />
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: 160,
    margin: 1,
  },
  list: {
    flex: 1,
  },
  sectionHeader: {
    marginTop: 22,
  },
});

const colors = [
  "#F44336",
  "#E91E63",
  "#9C27B0",
  "#673AB7",
  "#3F51B5",
  "#2196F3",
  "#03A9F4",
  "#00BCD4",
  "#009688",
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  "#FFEB3B",
  "#FFC107",
  "#FF9800",
  "#FF5722",
  "#795548",
  "#9E9E9E",
  "#607D8B",
];

function generateRandomColorsArray(length) {
  return Array.from(Array(length)).map(
    () => colors[Math.floor(Math.random() * colors.length)]
  );
}
