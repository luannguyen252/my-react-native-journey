import React, { Component } from 'react'
import { List } from 'react-native-ui-kitten'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import CheckOutItem from '../components/CheckOutItem'
import { updateNoOfItemForBarCheckOut } from '../store/actions/barActions'
import { updateNoOfItemForRestaurantCheckOut } from '../store/actions/restaurantActions'

class CheckOut extends Component {
  constructor() {
    super()
  }

  itemsInCheckOut = () => {
    this.props.barCheckOut.forEach(item => {
      item.outlet = 'bar'
    })
    this.props.restaurantCheckOut.forEach(item => {
      item.outlet = 'restaurant'
    })
    return [...this.props.barCheckOut, ...this.props.restaurantCheckOut]
  }

  renderItem = ({ item, index }) => (
    <CheckOutItem
      item={item}
      index={index}
      onChange={value => {
        if (item.outlet === 'bar') {
          this.props.updateNoOfItemForBarCheckOut(value, item.itemId)
        } else if (item.outlet === 'restaurant') {
          this.props.updateNoOfItemForRestaurantCheckOut(value, item.itemId)
        }
      }}
      onToBeDeleted={isSelected => {
        if (isSelected) {
          if (item.outlet === 'bar') {
            this.props.updateNoOfItemForBarCheckOut(0, item.itemId)
          } else if (item.outlet === 'restaurant') {
            this.props.updateNoOfItemForRestaurantCheckOut(0, item.itemId)
          }
        }
      }}
    />
  )

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.listContainer}>
          {this.itemsInCheckOut().length === 0 ? (
            <View style={styles.emptyContainer}>
              <MaterialIcon
                name="remove-shopping-cart"
                size={40}
                color="gray"
              />
              <Text style={styles.emptyText}>No item to Order.</Text>
            </View>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              <List
                data={this.itemsInCheckOut()}
                renderItem={this.renderItem}
                style={styles.listLayout}
              />
            </ScrollView>
          )}
        </View>
      </View>
    )
  }
}

mapStateToProps = state => {
  return {
    barCheckOut: state.barReducer.barCheckOut,
    restaurantCheckOut: state.restaurantReducer.restaurantCheckOut
  }
}

mapDispatchToProps = dispatch => {
  return {
    updateNoOfItemForBarCheckOut: (value, itemId) => {
      dispatch(updateNoOfItemForBarCheckOut(value, itemId))
    },
    updateNoOfItemForRestaurantCheckOut: (value, itemId) => {
      dispatch(updateNoOfItemForRestaurantCheckOut(value, itemId))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckOut)

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: '#eee',
    flexDirection: 'column',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15
  },
  listLayout: {
    marginBottom: 30,
    backgroundColor: 'transparent'
  },
  emptyContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyText: {
    fontSize: 17,
    color: 'gray',
    marginTop: 10
  }
})
