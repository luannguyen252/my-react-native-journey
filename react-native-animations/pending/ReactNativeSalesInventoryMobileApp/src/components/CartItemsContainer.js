import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  ToastAndroid
} from 'react-native'
import { List } from 'react-native-ui-kitten'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import { connect } from 'react-redux'
import CartItem from './CartItem'
import AddMoreItems from '../views/AddMoreItems'
import { cancelTransactionInCart } from '../store/actions/cartActions'
import { socket } from '../services/socketIO'
import { changeSelectedOrderTransactionId } from '../store/actions/moreItemsToOrderActions'
import {
  clearItemsInMoreBar,
  clearItemsInMoreRestaurant
} from '../store/actions/moreItemsToOrderActions'
import { clearItemsInBar } from "../store/actions/barActions";
import { clearItemsInRestaurant } from "../store/actions/restaurantActions";

class CartItemsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemsVisibility: false,
      addMoreItemsModalIsVisible: false,
      cancelOrderIsVisible: false,
      finishTransactionIsVisible: false
    }
  }

  renderItem = ({ item, index }) => (
    <View style={styles.singleOrder}>
      <Text style={styles.orderNumberText}>Order {index + 1}</Text>
      {item.barCheckOut ? (
        <View>
          {item.barCheckOut.length > 0 ? (
            <View>
              {item.barCheckOut.map((el, index) => {
                return <CartItem item={el} key={index} />
              })}
            </View>
          ) : null}
        </View>
      ) : null}
      {item.restaurantCheckOut ? (
        <View>
          {item.restaurantCheckOut.length > 0 ? (
            <View>
              {item.restaurantCheckOut.map((el, index) => {
                return <CartItem item={el} key={index} />
              })}
            </View>
          ) : null}
        </View>
      ) : null}
    </View>
  )

  toggleItemsVisibility = () => {
    this.setState({
      itemsVisibility: !this.state.itemsVisibility
    })
  }

  finishTransaction = async () => {
    const transactionId = this.props.item.transactionId
    if (socket.connected) {
      socket.emit('finishTransaction', { transactionId }, response => {
        if (response.message === 'Transaction Finished') {
          this.props.cancelTransactionInCart(transactionId)
        }
      })
      this.setState({
        finishTransactionIsVisible: false,
        itemsVisibility: false
      })
    } else {
      ToastAndroid.show(
        'Please check your network connection.',
        ToastAndroid.SHORT
      )
    }
  }

  cancelDialog = () => {
    return this.state.cancelOrderIsVisible
      ? Alert.alert(
        'Cancel Order',
        'Are you sure you want to cancel this order ?',
        [
          {
            text: 'Cancel',
            onPress: () =>
              this.setState({
                cancelOrderIsVisible: false
              }),
            style: 'cancel'
          },
          { text: 'OK', onPress: () => this.cancelOrder() }
        ],
        {
          cancelable: true,
          onDismiss: () =>
            this.setState({
              cancelOrderIsVisible: false
            })
        }
      )
      : null
  }

  finishTransactionDialog = () => {
    return this.state.finishTransactionIsVisible
      ? Alert.alert(
        'Finish Transaction',
        'Are you sure you want to end this transaction ?',
        [
          {
            text: 'Cancel',
            onPress: () =>
              this.setState({
                finishTransactionIsVisible: false
              }),
            style: 'cancel'
          },
          { text: 'OK', onPress: () => this.finishTransaction() }
        ],
        {
          cancelable: true,
          onDismiss: () =>
            this.setState({
              finishTransactionIsVisible: false
            })
        }
      )
      : null
  }

  addMoreItems = () => {
    this.setState({
      addMoreItemsModalIsVisible: !this.state.addMoreItemsModalIsVisible
    })
    this.props.changeSelectedOrderTransactionId(this.props.item.transactionId)
  }

  onCloseModal = () => {
    this.setState({
      addMoreItemsModalIsVisible: !this.state.addMoreItemsModalIsVisible
    })
    this.props.clearItems();
  }

  render() {
    return (
      <View style={styles.cartItemsContainer}>
        {this.state.addMoreItemsModalIsVisible && (
          <Modal
            animationType="slide"
            transparent
            visible={this.state.addMoreItemsModalIsVisible}
            onRequestClose={() => {
              this.setState({
                addMoreItemsModalIsVisible: !this.state
                  .addMoreItemsModalIsVisible
              })
            }}
          >
            <AddMoreItems
              onCloseModal={() => {
                this.onCloseModal()
              }}
            />
          </Modal>
        )}
        <View style={styles.cartItemsContainerHeader}>
          <View>
            <Text style={styles.tIdBold}>Transaction Id:</Text>
            <Text style={styles.tIdNormal}>
              {this.props.item.transactionId}
            </Text>
          </View>
          <View>
            <Text style={styles.tIdBold}>Table No:</Text>
            <Text style={styles.tIdNormal}>{this.props.item.tableNumber}</Text>
          </View>
          <TouchableOpacity onPress={() => this.toggleItemsVisibility()}>
            <AntDesignIcon name="downcircleo" size={25} color="#2e88ce" />
          </TouchableOpacity>
        </View>

        {this.state.itemsVisibility && (
          <View style={styles.visibleContainer}>
            <List
              data={this.props.item.transactionDetails}
              renderItem={this.renderItem}
              style={styles.listLayout}
            />
            <View style={styles.bottomContainer}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: 20
                }}
              >
                <View style={styles.totalAmountAndTotalPrice}>
                  <View style={[styles.flexColumn, { padding: 7 }]}>
                    <Text style={styles.totalText}>Total Amount</Text>
                    <Text
                      style={styles.noOfText}
                    >{`₦${this.props.item.transactionTotalAmount}`}</Text>
                  </View>
                  <View style={[styles.flexColumn2, { padding: 7 }]}>
                    <Text style={styles.totalText}>No. of Items</Text>
                    <Text style={styles.noOfText}>
                      {this.props.item.transactionTotalNumber}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center'
                  // justifyContent: 'space-between'
                }}
              >
                <TouchableOpacity onPress={() => this.addMoreItems()}>
                  <Text
                    style={[
                      styles.orderControlButtons,
                      {
                        color: '#2e88ce',
                        fontWeight: 'bold',
                        fontSize: 17
                      }
                    ]}
                  >
                    Add More
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    )
  }
}

mapStateToProps = state => {
  return {
    staffData: state.homeReducer.staffData
  }
}

mapDispatchToProps = dispatch => {
  return {
    cancelTransactionInCart: transactionId => {
      dispatch(cancelTransactionInCart(transactionId))
    },
    changeSelectedOrderTransactionId: transactionId => {
      dispatch(changeSelectedOrderTransactionId(transactionId))
    },
    clearItems: () => {
      dispatch(clearItemsInBar())
      dispatch(clearItemsInRestaurant())
      dispatch(clearItemsInMoreBar())
      dispatch(clearItemsInMoreRestaurant())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartItemsContainer)

const styles = StyleSheet.create({
  cartItemsContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    marginBottom: 30,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 2,
    borderRadius: 3,
    backgroundColor: '#fff'
  },
  cartItemsContainerHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  tIdBold: {
    fontWeight: 'bold',
    color: 'gray'
  },
  tIdNormal: {
    color: 'gray',
    textAlign: 'center'
  },
  visibleContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20
  },
  listLayout: {
    marginBottom: 30,
    backgroundColor: 'transparent'
  },
  bottomContainer: {
    alignSelf: 'flex-end',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 5,
    paddingRight: 5
  },
  orderControlButtons: {
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 3,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 7,
    paddingBottom: 7
  },
  totalAmountAndTotalPrice: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row'
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    borderColor: '#ddd',
    borderWidth: 1
  },
  flexColumn2: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    borderTopColor: '#ddd',
    borderRightColor: '#ddd',
    borderBottomColor: '#ddd',
    borderLeftColor: 'transparent',
    borderWidth: 1
  },
  totalText: {
    color: 'gray',
    fontWeight: 'bold'
  },
  noOfText: {
    color: 'gray',
    textAlign: 'center'
  },
  singleOrder: {
    width: '100%',
    borderColor: '#eee',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 3
  },
  orderNumberText: {
    fontWeight: 'bold',
    margin: 10,
    color: 'gray'
  }
})
