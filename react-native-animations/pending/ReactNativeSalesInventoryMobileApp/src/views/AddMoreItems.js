import React, { PureComponent } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ToastAndroid
} from 'react-native'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import TabBar from '@mindinventory/react-native-tab-bar-interaction'
import { List } from 'react-native-ui-kitten'
import { connect } from 'react-redux'
import MoreGridItem from '../components/MoreGridItem'
import {
  updateNoOfItemInMoreBar,
  updateNoOfItemInMoreRestaurant
} from '../store/actions/moreItemsToOrderActions'
import FeatherIcon from 'react-native-vector-icons/Feather'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import CartItem from '../components/CartItem'
import MoreItemsSearchBar from '../components/MoreItemsSearchBar'
import { socket } from '../services/socketIO'
import { addMoreToCart } from '../store/actions/cartActions'

class AddMoreItems extends PureComponent {
  constructor(props) {
    super(props)
  }

  closeModal = () => {
    this.props.onCloseModal()
  }

  sendAddMoreItems = async () => {
    if (socket.connected) {
      const transactionId = this.props.selectedOrderTransactionId
      const barCheckOut = this.props.barCheckOut
      const restaurantCheckOut = this.props.restaurantCheckOut

      if (barCheckOut.length === 0 && restaurantCheckOut.length === 0) {
        ToastAndroid.show(
          'Please, select items before you order.',
          ToastAndroid.SHORT
        )
      } else {
        await this.props.addMoreToCart(
          transactionId,
          barCheckOut,
          restaurantCheckOut
        )
        const data = this.props.selectedItem
        ToastAndroid.show('Order sent successfully.', ToastAndroid.SHORT)
        socket.emit('moreAdded', data)
        this.closeModal()
      }
    } else {
      ToastAndroid.show(
        'Please check your network connection.',
        ToastAndroid.SHORT
      )
    }
  }

  renderMoreGridItemToBar = ({ item, index }) => (
    <MoreGridItem
      item={item}
      index={index}
      onChange={(value, eventType, itemId) => {
        this.props.updateNoOfItemInMoreBar(value, index, itemId)
      }}
    />
  )

  renderMoreGridItemToRestaurant = ({ item, index }) => (
    <MoreGridItem
      item={item}
      index={index}
      onChange={(value, eventType, itemId) => {
        this.props.updateNoOfItemInMoreRestaurant(value, index, itemId)
      }}
    />
  )

  renderItemsToOrderCart = ({ item, index }) => <CartItem item={item} />

  itemsToOrder = () => {
    return [...this.props.barCheckOut, ...this.props.restaurantCheckOut]
  }

  render() {
    let barData = this.props.bar, 
      restData = this.props.restaurant, 
      itemsToOrder = this.itemsToOrder();
    return (
      <View style={styles.container}>
        <View style={styles.container2}>
          <View style={styles.bottomSheetHeader}>
            <TouchableOpacity
              onPress={() => {
                this.sendAddMoreItems()
              }}
            >
              <FeatherIcon name="send" size={25} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.bottomSheetHeaderText}>
              Add more Items to Order
            </Text>
            <TouchableOpacity onPress={() => this.closeModal()}>
              <AntDesignIcon
                name="close"
                size={25}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
          <TabBar>
            <TabBar.Item
              icon={require('../assets/2325619-200.png')}
              selectedIcon={require('../assets/2325619-200.png')}
              title="Restaurant"
            >
              <View style={styles.gridContainer}>
                <View style={styles.searchContainer}>
                  <MoreItemsSearchBar tab='Restaurant' />
                </View>
                {this.props.restaurant.length === 0 ? (
                  <View style={styles.emptyContainer}>
                    <MaterialIcon
                      name="remove-shopping-cart"
                      size={50}
                      color="gray"
                    />
                    <Text style={styles.emptyText}>None Found.</Text>
                  </View>
                ) : (
                    <ScrollView showsVerticalScrollIndicator={false}>
                      <FlatList
                        data={restData}
                        extraData={this.props}
                        keyExtractor={item => item.itemId}
                        renderItem={this.renderMoreGridItemToRestaurant}
                        horizontal={false}
                        numColumns={2}
                        contentContainerStyle={styles.gridLayout}
                      />
                    </ScrollView>
                  )}
              </View>
            </TabBar.Item>
            <TabBar.Item
              icon={require('../assets/917640-200.png')}
              selectedIcon={require('../assets/917640-200.png')}
              title="Bar"
            >
              <View style={styles.gridContainer}>
                <View style={styles.searchContainer}>
                  <MoreItemsSearchBar tab='Bar' />
                </View>
                {this.props.bar.length === 0 ? (
                  <View style={styles.emptyContainer}>
                    <MaterialIcon
                      name="remove-shopping-cart"
                      size={50}
                      color="gray"
                    />
                    <Text style={styles.emptyText}>None Found.</Text>
                  </View>
                ) : (
                    <ScrollView showsVerticalScrollIndicator={false}>
                      <FlatList
                        data={barData}
                        extraData={this.props}
                        keyExtractor={item => item.itemId}
                        renderItem={this.renderMoreGridItemToBar}
                        horizontal={false}
                        numColumns={2}
                        contentContainerStyle={styles.gridLayout}
                      />
                    </ScrollView>
                  )}
              </View>
            </TabBar.Item>

            <TabBar.Item
              icon={require('../assets/1570216-200.png')}
              selectedIcon={require('../assets/1570216-200.png')}
              title="Cart"
            >
              <View style={styles.gridContainer}>
                {itemsToOrder.length === 0 ? (
                  <View style={styles.emptyContainer}>
                    <MaterialIcon name="hourglass-empty" size={50} color="gray" />
                    <Text style={styles.emptyText}>None Found.</Text>
                  </View>
                ) : (
                    <ScrollView showsVerticalScrollIndicator={false}>
                      <List
                        data={itemsToOrder}
                        renderItem={this.renderItemsToOrderCart}
                      />
                    </ScrollView>
                  )}
              </View>
            </TabBar.Item>
          </TabBar>
        </View>
      </View>
    )
  }
}

mapStateToProps = state => {
  return {
    bar: state.moreItemsToOrderReducer.bar,
    restaurant: state.moreItemsToOrderReducer.restaurant,
    moreItemsToOrderTab: state.moreItemsToOrderReducer.moreItemsToOrderTab,
    barCheckOut: state.moreItemsToOrderReducer.barCheckOut,
    restaurantCheckOut: state.moreItemsToOrderReducer.restaurantCheckOut,
    selectedOrderTransactionId:
      state.moreItemsToOrderReducer.selectedOrderTransactionId,
    selectedItem: state.cartReducer.selectedItem
  }
}

mapDispatchToProps = dispatch => {
  return {
    updateNoOfItemInMoreBar: (value, index, itemId) => {
      dispatch(updateNoOfItemInMoreBar(value, index, itemId))
    },
    updateNoOfItemInMoreRestaurant: (value, index, itemId) => {
      dispatch(updateNoOfItemInMoreRestaurant(value, index, itemId))
    },
    addMoreToCart: (transactionId, barCheckOut, restaurantCheckOut) => {
      dispatch(addMoreToCart(transactionId, barCheckOut, restaurantCheckOut))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMoreItems)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(0, 0, 0, .5)',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container2: {
    width: '90%',
    height: '90%',
    backgroundColor: '#fff',
    borderRadius: 3,
    display: 'flex',
    flexDirection: 'column'
  },
  bottomSheetHeader: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2e88ce',
    height: 50,
    padding: 10,
    justifyContent: 'space-between'
  },
  bottomSheetHeaderText: {
    fontSize: 17,
    color: '#fff',
    fontWeight: 'bold'
  },
  gridContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#eee',
    flexDirection: 'column'
  },
  gridLayout: {
    marginBottom: 30,
    display: 'flex',
    justifyContent: 'space-between'
  },
  emptyContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
    marginTop: 10
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#2e88ce',
  }
})
