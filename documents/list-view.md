# React Native ListView

## React Native ListView Example

```javascript
import React, { Component } from "react";
import { Text, ListView, StyleSheet } from "react-native";

export default class MyListComponent extends Component {
  constructor() {
    super();

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      dataSource: ds.cloneWithRows([
        "Android",
        "iOS",
        "Java",
        "Php",
        "Hadoop",
        "Sap",
        "Python",
        "Ajax",
        "C++",
        "Ruby",
        "Rails",
        ".Net",
        "Perl",
      ]),
    };
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Text style={{ fontSize: 20 }}>{rowData}</Text>}
      />
    );
  }
}
```

- getRowData(dataBlob, sectionID, rowID)
- getSectionHeaderData(dataBlob, sectionID)
- rowHasChanged(previousRowData, nextRowData)
- sectionHeaderHasChanged(previousSectionData, nextSectionData)

## Add separation and perform action on ListView items

```javascript
import React from "react";
import { View, ListView, StyleSheet, Text, Alert } from "react-native";

class ListViewDemo extends React.Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      dataSource: ds.cloneWithRows([
        "Android",
        "iOS",
        "Java",
        "Swift",
        "Php",
        "Hadoop",
        "Sap",
        "Python",
        "Ajax",
        "C++",
        "Ruby",
        "Rails",
        ".Net",
        "Perl",
      ]),
    };
  }

  // Handling onPress action
  getListViewItem = (rowData) => {
    Alert.alert(rowData);
  };

  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => (
          <Text
            style={styles.rowViewContainer}
            onPress={this.getListViewItem.bind(this, rowData)}
          >
            {rowData}
          </Text>
        )}
        renderSeparator={(sectionId, rowId) => (
          <View key={rowId} style={styles.separator} />
        )} // Adding separation
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
  },
  separator: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#000",
  },
  rowViewContainer: {
    flex: 1,
    paddingRight: 15,
    paddingTop: 13,
    paddingBottom: 13,
    borderBottomWidth: 0.5,
    borderColor: "#c9c9c9",
    flexDirection: "row",
    alignItems: "center",
    fontSize: 20,
    marginLeft: 10,
  },
});

export default ListViewDemo;
```
