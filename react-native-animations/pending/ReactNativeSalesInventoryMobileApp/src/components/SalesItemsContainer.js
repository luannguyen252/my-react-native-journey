import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import { List, ListItem } from 'react-native-ui-kitten'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import SalesItem from './SalesItem'

class SalesItemsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemsVisibility: false
    }
  }

  toggleItemsVisibility = () => {
    this.setState({
      itemsVisibility: !this.state.itemsVisibility
    })
  }

  renderItem = ({ item, index }) => (
    <View style={styles.singleOrder}>
      <Text style={styles.orderNumberText}>Order {index + 1}</Text>
      {item.barCheckOut ? (
        <View>
          {item.barCheckOut.length > 0 ? (
            <View>
              {item.barCheckOut.map((el, index) => {
                return <SalesItem item={el} key={index} />
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
                return <SalesItem item={el} key={index} />
              })}
            </View>
          ) : null}
        </View>
      ) : null}
    </View>
  )

  render() {
    return (
      <View style={styles.cartItemsContainer}>
        <View style={styles.cartItemsContainerHeader}>
          <View>
            <Text style={styles.tIdBold}>Transaction Id:</Text>
            <Text style={styles.tIdNormal}>
              {this.props.item.transactionId}
            </Text>
          </View>
          <TouchableOpacity onPress={() => this.toggleItemsVisibility()}>
            <AntDesignIcon name="downcircleo" size={20} color="#2e88ce" />
          </TouchableOpacity>
        </View>
        {this.state.itemsVisibility && (
          <View style={styles.visibleContainer}>
            <List
              data={JSON.parse(this.props.item.transactionDetails)}
              renderItem={this.renderItem}
              style={styles.listLayout}
            />
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text
                style={{ fontWeight: 'bold', marginRight: 7, color: 'gray' }}
              >
                Total:
              </Text>
              <Text style={{ color: 'gray' }}>{`₦${this.props.item.transactionTotalAmount}`}</Text>
            </View>
          </View>
        )}
      </View>
    )
  }
}


export default SalesItemsContainer

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
    color: 'gray'
  },
  visibleContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20
  },
  listLayout: {
    marginBottom: 15,
    backgroundColor: 'transparent'
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
