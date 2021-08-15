import React, { Component } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { getImage } from '../config'

export default class CartItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View
        style={[
          styles.itemContainer,
          this.props.item.isPosted ? styles.postedRow : null
        ]}
      >
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
          <Text style={styles.itemPriceText}>{`₦${this.props.item.newPrice}`}</Text>
        </View>
        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>
            {this.props.item.noInCheckOut}
          </Text>
        </View>
      </View>
    )
  }
}

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
  postedRow: {
    opacity: 0.3
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
    // justifyContent: 'space-between'
  },
  counterText: {
    fontSize: 20,
    borderColor: 'transparent',
    justifyContent: 'center',
    textAlign: 'center'
  }
})
