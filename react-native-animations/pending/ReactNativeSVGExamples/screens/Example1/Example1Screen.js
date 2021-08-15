import React from 'react';
import { Text, StyleSheet, FlatList, View } from 'react-native';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from './selection.json';

const Icon = createIconSetFromIcoMoon(icoMoonConfig, 'IcoMoon-Free', 'IcoMoon-Free.ttf');

const Example1Screen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <Text style={styles.title}>{'Using IcoMoon &\nreact-native-vector-icons'}</Text>
        }
        data={icoMoonConfig.icons}
        renderItem={({ item }) => (
          <View style={styles.iconContainer}>
            <Icon name={item.properties.name} size={32} key={item.properties.name} />
            <Text>{item.properties.name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.properties.name}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    flexWrap: 'wrap',
  },
  title: {
    fontWeight: '500',
    fontSize: 32,
    marginBottom: 16,
  },
  iconContainer: {
    margin: 4,
    flexDirection: 'row',
  },
});

export default Example1Screen;
