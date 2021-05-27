import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';
import FavoriteButton from './FavoriteButton';

class ItemList extends Component {
  state = { data: [], text: '' }

  componentDidMount() {
    this.setState({ data: this.props.places });
  }

  componentDidUpdate(prevProps) {
    if (this.props.places !== prevProps.places) {
      this.searchFilterFunction(this.state.text);
    }
  }

  renderItem = ({ item }) => {
    return (
      <ListItem
        title={item.name}
        onPress={() => this.props.onItemPress(item)}
        containerStyle={styles.separator}
        leftIcon={<FavoriteButton item={item}/>}
      />
    )
  }

  renderHeader = () => {
    return (
      <SearchBar
        lightTheme
        clearIcon
        placeholder='Search...'
        onChangeText={text => this.searchFilterFunction(text)}
        containerStyle={styles.searchBarContainer}
        inputStyle={styles.searchBarInput}
      />
    )
  }

  searchFilterFunction = text => {
    const newData = this.props.places.filter(place => {
      const itemData = place.name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({ data: newData });
    this.setState({ text });
  }

  render() {
    return (
      <List containerStyle={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.name}
          ListHeaderComponent={this.renderHeader}
        />
      </List>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    marginTop: 0,
    borderTopWidth: 0,
    flex: 1
  },
  separator: {
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  searchBarContainer: {
    backgroundColor: 'white',
    borderTopColor: 'white'
  },
  searchBarInput: {
    backgroundColor: '#d3d3d3'
  }
});

export default ItemList;