import React, { Component } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import {
  filterItemsInMoreBar,
  filterItemsInMoreRestaurant
} from '../store/actions/moreItemsToOrderActions'
import { connect } from 'react-redux'

class MoreItemsSearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: ''
    }
  }

  searchLogic = async userInput => {
    await this.setState({
      searchText: userInput
    })
    const tab = this.props.tab
    if (tab == 'Bar') {
      this.props.handleFilterItemsInMoreBar(this.state.searchText)
    } else if (tab == 'Restaurant') {
      this.props.handleFilterItemsInMoreRestaurant(this.state.searchText)
    }
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

mapDispatchToProps = dispatch => {
  return {
    handleFilterItemsInMoreBar: (value) => {
      dispatch(filterItemsInMoreBar(value))
    },
    handleFilterItemsInMoreRestaurant: (value) => {
      dispatch(filterItemsInMoreRestaurant(value))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(MoreItemsSearchBar)

const styles = StyleSheet.create({
  searchBarStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 35,
    width: 250,
    backgroundColor: '#fff',
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 20,
    paddingRight: 10,
    paddingLeft: 10,
    justifyContent: 'space-between'
  },
  searchInputStyle: {
    fontSize: 15,
    width: 200
  }
})
