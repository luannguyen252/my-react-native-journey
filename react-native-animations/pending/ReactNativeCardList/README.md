### Example

```js
import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
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

module.exports = React.createClass({
  onClickCard(i) {
    Toast(i + "");
  },
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
  },
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
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
});
```

#### Props

- `list: PropTypes.list` card data list
- `height: PropTypes.number` card item height
- `panelHeight: propTypes.number` card container height
- `panelWidth: PropTypes.number` card container width
- `offsetTop: PropTypes.number` card container top offset of screen
- `offsetLeft: PropTypes.number` card container left offset of screen
- `scrollOffset: PropTypes.number` the offset of scroll
- `onClickCard: PropTypes.func [args: i]` the callback of click card, args i is card index of clicked card
- `renderRow: PropTypes.func [args: data, i, width, height]` row render function
