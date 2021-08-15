[react-native-super-grid](https://github.com/saleel/react-native-super-grid)

`renderItem`: Function
`data (for FlatGrid) sections (for SectionGrid)`: Array
`itemDimension`: Number
`fixed`: Boolean
`spacing`: Number
`style`: FlatList - styles (Object)
`additionalRowStyle`: styles (Object)
`itemContainerStyle`: styles (Object)
`staticDimension`: Number
`maxDimension`: Number
`horizontal`: boolean
`onLayout`: Function
`listKey`: String
`keyExtractor`: Function - `(item, rowItemIndex) => {String}`

```javascript
import { FlatGrid } from "react-native-super-grid";
<FlatGrid
  itemDimension={130}
  data={[1, 2, 3, 4, 5, 6]}
  renderItem={({ item }) => <Text>{item}</Text>}
/>;
```

```javascript
import { SectionGrid } from "react-native-super-grid";
<SectionGrid
  itemDimension={130}
  sections={[
    {
      title: "Numbers",
      data: [1, 2, 3, 4, 5, 6],
    },
    {
      title: "Alphabets",
      data: ["A", "B", "C", "D", "E"],
    },
  ]}
  renderItem={({ item }) => <Text>{item}</Text>}
  renderSectionHeader={({ section }) => (
    <Text style={{ fontSize: 20 }}>{section.title}</Text>
  )}
/>;
```

## FlatGrid Example

```javascript
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { FlatGrid } from "react-native-super-grid";

export default function Example() {
  const [items, setItems] = React.useState([
    { name: "TURQUOISE", code: "#1abc9c" },
    { name: "EMERALD", code: "#2ecc71" },
    { name: "PETER RIVER", code: "#3498db" },
    { name: "AMETHYST", code: "#9b59b6" },
    { name: "WET ASPHALT", code: "#34495e" },
    { name: "GREEN SEA", code: "#16a085" },
    { name: "NEPHRITIS", code: "#27ae60" },
    { name: "BELIZE HOLE", code: "#2980b9" },
    { name: "WISTERIA", code: "#8e44ad" },
    { name: "MIDNIGHT BLUE", code: "#2c3e50" },
    { name: "SUN FLOWER", code: "#f1c40f" },
    { name: "CARROT", code: "#e67e22" },
    { name: "ALIZARIN", code: "#e74c3c" },
    { name: "CLOUDS", code: "#ecf0f1" },
    { name: "CONCRETE", code: "#95a5a6" },
    { name: "ORANGE", code: "#f39c12" },
    { name: "PUMPKIN", code: "#d35400" },
    { name: "POMEGRANATE", code: "#c0392b" },
    { name: "SILVER", code: "#bdc3c7" },
    { name: "ASBESTOS", code: "#7f8c8d" },
  ]);

  return (
    <FlatGrid
      itemDimension={130}
      data={items}
      style={styles.gridView}
      // staticDimension={300}
      // fixed
      spacing={10}
      renderItem={({ item }) => (
        <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemCode}>{item.code}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff",
  },
});
```

## SectionGrid Example

```javascript
import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { SectionGrid } from "react-native-super-grid";

export default function Example() {
  const [items, setItems] = React.useState([
    { name: "TURQUOISE", code: "#1abc9c" },
    { name: "EMERALD", code: "#2ecc71" },
    { name: "PETER RIVER", code: "#3498db" },
    { name: "AMETHYST", code: "#9b59b6" },
    { name: "WET ASPHALT", code: "#34495e" },
    { name: "GREEN SEA", code: "#16a085" },
    { name: "NEPHRITIS", code: "#27ae60" },
    { name: "BELIZE HOLE", code: "#2980b9" },
    { name: "WISTERIA", code: "#8e44ad" },
    { name: "MIDNIGHT BLUE", code: "#2c3e50" },
    { name: "SUN FLOWER", code: "#f1c40f" },
    { name: "CARROT", code: "#e67e22" },
    { name: "ALIZARIN", code: "#e74c3c" },
    { name: "CLOUDS", code: "#ecf0f1" },
    { name: "CONCRETE", code: "#95a5a6" },
    { name: "ORANGE", code: "#f39c12" },
    { name: "PUMPKIN", code: "#d35400" },
    { name: "POMEGRANATE", code: "#c0392b" },
    { name: "SILVER", code: "#bdc3c7" },
    { name: "ASBESTOS", code: "#7f8c8d" },
  ]);

  return (
    <SectionGrid
      itemDimension={90}
      // staticDimension={300}
      // fixed
      // spacing={20}
      sections={[
        {
          title: "Title1",
          data: items.slice(0, 6),
        },
        {
          title: "Title2",
          data: items.slice(6, 12),
        },
        {
          title: "Title3",
          data: items.slice(12, 20),
        },
      ]}
      style={styles.gridView}
      renderItem={({ item, section, index }) => (
        <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemCode}>{item.code}</Text>
        </View>
      )}
      renderSectionHeader={({ section }) => (
        <Text style={styles.sectionHeader}>{section.title}</Text>
      )}
    />
  );
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff",
  },
  sectionHeader: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    alignItems: "center",
    backgroundColor: "#636e72",
    color: "white",
    padding: 10,
  },
});
```
