import React, { Component } from 'react'
import { List } from 'react-native-ui-kitten'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { Content, DatePicker } from 'native-base'
import { connect } from 'react-redux'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import SalesItemsContainer from '../components/SalesItemsContainer'
import { appUrl } from '../config'
import { Spinner } from 'react-native-ui-kitten'
import axios from 'axios'
import { populateItemsInSales } from '../store/actions/homeActions'

class Sales extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      chosenDate: new Date(),
      totalSales: 0
    }
    this.setDate = this.setDate.bind(this)
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate, isLoading: true })
    this.fetchItemsFromOnline()
  }

  componentDidMount() {
    this.fetchItemsFromOnline()
  }

  fetchItemsFromOnline = () => {
    let url = appUrl + '/getStaffSales',
      Staff_ID = this.props.staffData.Staff_ID,
      chosenDate = this.state.chosenDate

    axios
      .post(url, { Staff_ID, chosenDate })
      .then(async response => {
        if (response.data.hasItems) {
          const sales = response.data.sales
          this.props.populateItemsInSales(sales)
          if (sales.length > 0) {
            const totalSales = sales.reduce(
              (total, obj) => +obj.transactionTotalAmount + total, 0)
            this.setState({
              totalSales
            })
          }
        }
        this.setState({
          isLoading: false
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  totalAmount = () => {
    return this.state.totalSales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0
  }

  renderItem = ({ item, index }) => <SalesItemsContainer item={item} />

  render() {
    let itemsInSales = this.props.itemsInSales;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.layoutContainer}>
          <DatePicker
            defaultDate={new Date()}
            minimumDate={new Date(2019, 1, 1)}
            maximumDate={new Date()}
            locale={'en'}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={'fade'}
            androidMode={'default'}
            placeHolderText={'Click here to choose a date'}
            textStyle={{ color: '#2e88ce', fontSize: 20 }}
            // placeHolderTextStyle={{ color: 'gray', fontWeight: 'bold' }}
            onDateChange={this.setDate}
            disabled={false}
          />
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Text style={{ marginLeft: 10, fontSize: 12 }}>
              Date: {this.state.chosenDate.toString().substr(4, 12)}
            </Text>
            <View
              style={{
                marginLeft: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row'
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                Total Amount:{' '}
              </Text>
              <Text
                style={{ fontSize: 16, fontWeight: 'bold' }}
              >{`₦${this.totalAmount()}`}</Text>
            </View>
          </View>

          <View style={styles.listContainer}>
            {this.state.isLoading ? (
              <View style={styles.emptyContainer}>
                <Spinner size="giant" status="alternative" />
              </View>
            ) : this.props.itemsInSales.length === 0 ? (
              <View style={styles.emptyContainer}>
                <MaterialIcon
                  name="remove-shopping-cart"
                  size={50}
                  color="gray"
                />
                <Text style={styles.emptyText}>No Sales.</Text>
              </View>
            ) : (
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <List
                      data={itemsInSales}
                      renderItem={this.renderItem}
                      style={styles.listLayout}
                    />
                  </ScrollView>
                )}
          </View>
        </View>
      </View>
    )
  }
}

mapStateToProps = state => {
  return {
    itemsInSales: state.homeReducer.sales,
    salesTotalAmount: state.homeReducer.salesTotalAmount,
    staffData: state.homeReducer.staffData
  }
}

mapDispatchToProps = dispatch => {
  return {
    populateItemsInSales: data => {
      dispatch(populateItemsInSales(data))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sales)

const styles = StyleSheet.create({
  layoutContainer: {
    flex: 1,
    marginTop: 5,
    backgroundColor: '#F5FCFF',
    paddingLeft: 5,
    paddingRight: 5
  },
  layoutTitleText: {
    fontSize: 17,
    marginTop: 7,
    marginBottom: 7,
    marginLeft: 10,
    fontWeight: 'bold'
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#eee',
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
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
    fontSize: 16,
    color: 'gray',
    marginTop: 10
  }
})
