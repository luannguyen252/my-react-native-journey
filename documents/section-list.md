# React Native SectionList

## Props of SectionList

`sections`

`renderSectionHeader`

`extraData`

`onViewableItemsChanged`

`SectionSeparatorComponent`

`renderItem`

`renderSectionFooter`

`onEndReached`

`refreshing`

`stickySectionHeadersEnabled`

`initialNumToRender`

`onRefresh`

`keyExtractor`

`removeClippedSubviews`

`onEndReachedThreshold`

`keyExtractor`

`inverted`

`legacyImplementation`

`ListHeaderComponent`

`ListEmptyComponent`

## React Native SectionList Example

```javascript
import React, { Component } from "react";
import { SectionList, StyleSheet, Text, View } from "react-native";

export default class SectionListBasics extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SectionList
          sections={[
            {
              title: "A",
              data: ["ALTERED", "ABBY", "ACTION U.S.A.", "AMUCK", "ANGUISH"],
            },
            {
              title: "B",
              data: [
                "BEST MEN",
                "BEYOND JUSTICE",
                "BLACK GUNN",
                "BLOOD RANCH",
                "BEASTIES",
              ],
            },
            {
              title: "C",
              data: [
                "CARTEL",
                "CASTLE OF EVIL",
                "CHANCE",
                "COP GAME",
                "CROSS FIRE",
              ],
            },
          ]}
          renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5ead97",
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#8fb1aa",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
```

## Adding Separator in SectionList

```javascript
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


ItemSeparatorComponent={this.renderSeparator}
```

## Performing action on SectionList items

```javascript
// Handling onPress action
getListViewItem = (item) => {
    alert(item);
}

renderItem={({item}) => <Text style={styles.item} onPress={this.getListViewItem.bind(this, item)}>{item}</Text>}
```
