import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { connect } from 'react-redux'
import {
  toggleAreYouSureModalVisibility,
  toggleCheckOutBottomSheet
} from '../store/actions/homeActions'

class Bottom extends Component {
  constructor() {
    super()
  }

  setModalVisible = () => {
    this.props.setModalVisible(!this.props.areYouSureModalIsVisible)
  }

  toggleCheckOutBottomSheet() {
    this.props.onBottomSheetStateChange()
  }

  render() {
    return (
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={() => this.toggleCheckOutBottomSheet()}>
          <View style={styles.noOfItemsContainer}>
            <Text style={styles.noOfItemsTextOne}>
              {Number(this.props.totalNumberOfItemsAddedFromBar) +
                Number(this.props.totalNumberOfItemsAddedFromRestaurant)}
            </Text>
            <Text style={styles.noOfItemsTextTwo}>Item(s)</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.totalAmountContainer}>
          <View>
            <Text style={styles.totalAmountTextOne}>Total Amount:</Text>
          </View>
          <View style={styles.totalIconAndAmountContainer}>
            <Text style={{ color: '#fff', marginRight: 2 }}>₦</Text>
            <Text style={styles.totalAmountTextTwo}>
              {Number(this.props.totalAmountOfItemsAddedFromBar) +
                Number(this.props.totalAmountOfItemsAddedFromRestaurant)}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => this.setModalVisible()}>
          <View style={styles.placeOrderContainer}>
            <FeatherIcon name="send" size={30} color="#fff" />
            <Text style={styles.placeOrderText}>Place Order</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

mapStateToProps = state => {
  return {
    areYouSureModalIsVisible: state.homeReducer.areYouSureModalIsVisible,
    totalNumberOfItemsAddedFromBar:
      state.barReducer.totalNumberOfItemsAddedFromBar,
    totalAmountOfItemsAddedFromBar:
      state.barReducer.totalAmountOfItemsAddedFromBar,
    barCheckOut: state.barReducer.barCheckOut,
    totalNumberOfItemsAddedFromRestaurant:
      state.restaurantReducer.totalNumberOfItemsAddedFromRestaurant,
    totalAmountOfItemsAddedFromRestaurant:
      state.restaurantReducer.totalAmountOfItemsAddedFromRestaurant,
    restaurantCheckOut: state.restaurantReducer.restaurantCheckOut,
    checkBottomSheetIsVisible: state.homeReducer.checkBottomSheetIsVisible
  }
}

mapDispatchToProps = dispatch => {
  return {
    setModalVisible: status => {
      dispatch(toggleAreYouSureModalVisibility(status))
    },
    toggleCheckOutBottomSheet: status => {
      dispatch(toggleCheckOutBottomSheet(status))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bottom)

const styles = StyleSheet.create({
  bottomContainer: {
    alignSelf: 'flex-end',
    height: 55,
    backgroundColor: '#2e88ce',
    borderColor: '#2e88ce',
    borderWidth: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 5,
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2
  },
  noOfItemsContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  noOfItemsTextOne: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#fff',
    textAlign: 'center'
  },
  noOfItemsTextTwo: {
    fontWeight: 'bold',
    color: '#fff'
  },
  totalAmountContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 7
  },
  totalIconAndAmountContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 0,
    margin: 0
  },
  nairaIconContent: {
    marginBottom: 10
  },
  totalAmountTextOne: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#fff'
  },
  totalAmountTextTwo: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center'
  },
  placeOrderContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  placeOrderText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#fff'
  }
})
