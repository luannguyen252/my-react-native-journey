import React, { Component } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'

export default class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: ''
    }
  }

  searchLogic = userInput => {
    this.setState({
      searchText: userInput
    })
    this.props.onChangeText(userInput)
  }

  render() {
    return (
      <View style={styles.searchBarStyle}>
        <TextInput
          style={styles.searchInputStyle}
          placeholder="Search"
          autoCapitalize="none"
          autoCorrect={true}
          onChangeText={userInput => this.searchLogic(userInput)}
          defaultValue={this.state.searchText}
        />
        {!this.state.searchText ? (
          <View>
            <TouchableOpacity>
              <AntDesignIcon name="search1" size={17} color="gray" />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity onPress={() => this.searchLogic('')}>
              <AntDesignIcon name="closecircleo" size={17} color="gray" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  searchBarStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 35,
    width: 200,
    backgroundColor: '#fff',
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 20,
    paddingRight: 10,
    paddingLeft: 10
  },
  searchInputStyle: {
    fontSize: 15,
    width: 160
  }
})
