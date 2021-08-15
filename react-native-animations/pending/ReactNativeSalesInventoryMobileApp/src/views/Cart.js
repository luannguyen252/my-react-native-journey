import React, { Component } from "react";
import { List } from "react-native-ui-kitten";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  AsyncStorage,
  Button,
} from "react-native";
import { connect } from "react-redux";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import CartItemsContainer from "../components/CartItemsContainer";
import {
  updateNoOfItemInCart,
  populateOngoingTransactionsInCart,
  toggleCartItemsLoading,
} from "../store/actions/cartActions";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Spinner } from "react-native-ui-kitten";
import { socket } from "../services/socketIO";

class Cart extends Component {
  constructor() {
    super();
  }

  totalAmountInCart = () => {
    return (
      this.props.itemsInCart.reduce(
        (total, obj) => +obj.transactionTotalAmount + total,
        0
      ) || 0
    )
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem("cartItems");

      if (value !== null) {
        this.setState({
          staffData: value,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  updateNoOfItemInCart(transactionId, itemId, index, value, subIndex) {
    this.props.updateNoOfItemInCart(
      transactionId,
      itemId,
      index,
      value,
      subIndex
    );
  }

  renderItem = ({ item, index }) => (
    <CartItemsContainer
      item={item}
      onChange={(subItem, value, subIndex) => {
        this.updateNoOfItemInCart(
          item.transactionId,
          subItem.itemId,
          index,
          value,
          subIndex
        );
      }}
    />
  );

  refreshCart = () => {
    this.props.toggleCartItemsLoading(true);
    const { Staff_ID } = this.props.staffData;
    socket.emit("getOngoingTransactions", Staff_ID, (response) => {
      this.props.populateOngoingTransactionsInCart(response);
    });
  };

  render() {
    return (
      <View style={styles.listContainer}>
        {this.props.isLoadingCartItems ? (
          <View style={styles.emptyContainer}>
            <Spinner size="giant" status="alternative" />
          </View>
        ) : this.props.itemsInCart.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialIcon name="remove-shopping-cart" size={50} color="gray" />
            <Text style={styles.emptyText}>None Found.</Text>
          </View>
        ) : (
          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <TouchableOpacity onPress={() => this.refreshCart()}>
                <Text style={styles.refreshButton}>Refresh</Text>
              </TouchableOpacity>
              <View
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  maxWidth:'40%'
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  Total Amount:{" "}
                </Text>
                <Text
                  style={{ fontSize: 16, fontWeight: "bold" }}
                >{`₦${this.totalAmountInCart()}`}</Text>
              </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <List
                data={this.props.itemsInCart}
                renderItem={this.renderItem}
                style={styles.listLayout}
              />
            </ScrollView>
          </View>
        )}
      </View>
    );
  }
}

mapStateToProps = (state) => {
  return {
    itemsInCart: state.cartReducer.itemsInCart,
    isLoadingCartItems: state.cartReducer.isLoadingCartItems,
    staffData: state.homeReducer.staffData,
  };
};

mapDispatchToProps = (dispatch) => {
  return {
    updateNoOfItemInCart: (transactionId, itemId, index, value, subIndex) => {
      dispatch(
        updateNoOfItemInCart(transactionId, itemId, index, value, subIndex)
      );
    },
    populateOngoingTransactionsInCart: (ongoingTransactions) => {
      dispatch(populateOngoingTransactionsInCart(ongoingTransactions));
    },
    toggleCartItemsLoading: (value) => {
      dispatch(toggleCartItemsLoading(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: "#eee",
    flexDirection: "column",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    marginTop: 15,
  },
  listLayout: {
    marginBottom: 30,
    backgroundColor: "transparent",
  },
  emptyContainer: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "gray",
    marginTop: 10,
  },
  refreshButton: {
    backgroundColor: "#2e88ce",
    color: "#fff",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 3,
  },
});
