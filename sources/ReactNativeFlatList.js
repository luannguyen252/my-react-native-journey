import React, { useRef } from "react";
import {
  Button,
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";

const DATA = [...Array(100).keys()].map((item) => {
  return { title: "Hello World !! Id: " + item, id: item };
});

const ListItem = ({ title }) => (
  <View style={styles.listItem}>
    <Text style={styles.listTitle}>{title}</Text>
  </View>
);

const ReactNativeFlatList = () => {
  const flatList = useRef();

  const moveToTop = () => flatList.current.scrollToIndex({ index: 0 });

  const renderItem = ({ item }) => <ListItem title={item.title} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatList}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Button title="Press me" onPress={moveToTop} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  listItem: {
    padding: 5,
    alignItems: "center",
    marginVertical: 5,
  },
  listTitle: {
    fontSize: 20,
  },
});

export default ReactNativeFlatList;
