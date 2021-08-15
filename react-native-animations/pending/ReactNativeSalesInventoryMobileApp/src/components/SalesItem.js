import React, { Component } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { getImage } from '../config'

class SalesItem extends Component {
  constructor(props) {
    super(props)
  }

  onUpdate = (type, value) => {
    let amount = this.props.item.noInCart
    switch (type) {
      case 'increment':
        amount = amount + 1
        break
      case 'decrement':
        amount = amount - (amount ? 1 : 0)
        break
      case 'input':
        amount = value
        break
      default:
        break
    }
    this.props.onChange(amount, type)
  }

  render() {
    return (
      <View style={styles.itemContainer}>
        <Image
          source={{ uri: getImage(this.props.item.image.url) }}
          style={styles.itemBgImage}
          resizeMode="contain"
        />
        <View style={styles.itemAndPriceContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.itemNameText}
          >
            {this.props.item.name}
          </Text>
          <Text
            style={styles.itemPriceText}
          >{`₦${this.props.item.price}`}</Text>
        </View>
        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>
            {this.props.item.noInCheckOut.toString()}
          </Text>
        </View>
      </View>
    )
  }
}


export default SalesItem

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 110,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingTop: 3,
    paddingBottom: 3
  },
  itemBgImage: {
    height: '100%',
    width: '25%',
    marginRight: 10
  },
  itemAndPriceContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '55%',
    marginRight: 10
  },
  itemNameText: {
    display: 'flex',
    fontSize: 17,
    marginBottom: 7
  },
  itemPriceText: {
    color: 'gray'
  },
  counterContainer: {
    display: 'flex',
    height: '100%',
    width: '15%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  counterText: {
    fontSize: 20,
    borderColor: 'transparent',
    justifyContent: 'center',
    textAlign: 'center'
  }
})
