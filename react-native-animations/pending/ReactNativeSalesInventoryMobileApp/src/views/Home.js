import React, { Component, Fragment } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  ToastAndroid,
  Picker,
  Modal,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Overlay } from "react-native-elements";
import RBSheet from "react-native-raw-bottom-sheet";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FeatherIcon from "react-native-vector-icons/Feather";
import Header from "../components/Header";
import Bottom from "../components/Bottom";
import {
  toggleAreYouSureModalVisibility,
  toggleCheckOutBottomSheet,
  changeTab,
  setCustomers,
  toggleDrawer,
} from "../store/actions/homeActions";
import {
  clearItemsInBar,
  filterItemsInBarByCategory,
} from "../store/actions/barActions";
import {
  clearItemsInRestaurant,
  filterItemsInRestaurantByCategory,
} from "../store/actions/restaurantActions";
import { addNewDataToCart } from "../store/actions/cartActions";
import BarAPI from "./BarAPI";
import Restaurant from "./Restaurant";
import Cart from "./Cart";
import CheckOut from "./CheckOut";
import { TextInput } from "react-native-gesture-handler";
import { socket } from "../services/socketIO";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      routes: [
        { key: "bar", title: "Bar" },
        { key: "restaurant", title: "Restaurant" },
        { key: "cart", title: "Cart" },
      ],
      tableNumber: "",
      customer: {},
      processingOrder: false,
      activeCategory: "All",
    };
  }

  componentDidMount() {
    socket.emit("getAllCustomers", (data) => {
      this.props.setCustomers(data);
    });
  }

  itemsInCheckOut = () => {
    return [...this.props.barCheckOut, ...this.props.restaurantCheckOut];
  };

  placeOrder = () => {
    if (socket.connected) {
      this.setState({
        processingOrder: true,
      });
      this.props.setModalVisible();
      const transactionTotalAmount =
        Number(this.props.totalAmountOfItemsAddedFromBar) +
        Number(this.props.totalAmountOfItemsAddedFromRestaurant);
      const transactionTotalNumber =
        Number(this.props.totalNumberOfItemsAddedFromBar) +
        Number(this.props.totalNumberOfItemsAddedFromRestaurant);
      const transactionDetails = [];
      const transactionDetailsObject = {};

      let customerName = this.state.customer.customerName;
      let Cust_ID = this.state.customer.Cust_ID;
      if (!customerName || customerName === "Choose Customer") {
        customerName = "Walk-In";
        Cust_ID = "000101";
      }

      transactionDetailsObject.barCheckOut = this.props.barCheckOut;
      transactionDetailsObject.restaurantCheckOut = this.props.restaurantCheckOut;
      transactionDetails.push(transactionDetailsObject);
      const dataToSend = {
        transactionId: new Date().valueOf(),
        tableNumber: this.state.tableNumber ? this.state.tableNumber : "None",
        transactionTotalAmount,
        transactionTotalNumber,
        updatedTransactionTotalAmount: 0,
        updatedTransactionTotalNumberOfItems: 0,
        transactionDetails: JSON.stringify(transactionDetails),
        customerName: customerName,
        Cust_ID: Cust_ID,
        staffData: JSON.stringify(this.props.staffData),
        Staff_ID: this.props.staffData.Staff_ID,
        Branch: this.props.staffData.Branch,
      };

      socket.emit("newOrder", dataToSend, (response) => {
        let showToast = false;

        if (response.message === "Order Received") {
          dataToSend.transactionDetails = JSON.parse(
            dataToSend.transactionDetails
          );
          this.props.addNewDataToCart(dataToSend);
          showToast = true;
        }
        if (showToast) {
          ToastAndroid.show("Order sent successfully.", ToastAndroid.SHORT);
        }
        this.setState({
          processingOrder: false,
          tableNumber: "",
          customer: {},
        });
        this.props.clearCart();
      });
    } else {
      ToastAndroid.show(
        "Please check your network connection.",
        ToastAndroid.SHORT
      );
    }
  };

  viewOrder = () => {
    this.showCheckOutModal();
    this.props.setModalVisible();
  };

  openClearModal = () => {
    return Alert.alert(
      "Delete Items to Order",
      "Are you sure you want to delete all items ?",
      [
        {
          text: "Cancel",
          onPress: () => null,
        },
        {},
        {
          text: "OK",
          onPress: () => {
            this.hideCheckOutModal();
            this.props.clearCart();
          },
        },
      ],
      { cancelable: true }
    );
  };

  showConfirmationDialog = () => {
    const totalAmount =
      Number(this.props.totalAmountOfItemsAddedFromBar) +
      Number(this.props.totalAmountOfItemsAddedFromRestaurant);
    if (this.props.areYouSureModalIsVisible && totalAmount <= 0) {
      ToastAndroid.show(
        "Please, select items before you order.",
        ToastAndroid.SHORT
      );
      this.props.setModalVisible();
    } else {
      if (this.props.areYouSureModalIsVisible) {
        return (
          <Overlay
            isVisible={true}
            windowBackgroundColor="rgba(0, 0, 0, .5)"
            overlayBackgroundColor="#fff"
            width="90%"
            height="auto"
            onBackdropPress={() => {
              if (!this.state.processingOrder) {
                this.props.setModalVisible();
                this.setState({
                  processingOrder: false,
                });
              }
            }}
          >
            {/* {this.state.processingOrder ? (
              <View
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  paddingTop: 5,
                  paddingBottom: 20,
                  alignItems: 'center'
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    marginBottom: 30,
                    textAlign: 'center',
                    fontWeight: 'bold'
                  }}
                >
                  Sending your Order...
                </Text>
                <Spinner size="giant" status="info" />
              </View>
            ) : ( */}
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                padding: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginBottom: 10,
                  textAlign: "center",
                }}
              >
                Confirm Order
              </Text>
              <Text style={{ fontSize: 15, marginBottom: 40 }}>
                Are you sure you want to place this order ?
              </Text>
              <TextInput
                placeholder="Table Number"
                style={styles.textInputStyle}
                keyboardType={"numeric"}
                onChangeText={(tableNumber) =>
                  this.setState({
                    tableNumber: tableNumber,
                  })
                }
              />
              <TextInput
                placeholder="Customer Name(Optional)"
                style={styles.textInputStyle}
                onChangeText={(customerName) =>
                  this.setState({
                    customer: {
                      Cust_ID: new Date().valueOf(),
                      customerName,
                    },
                  })
                }
              />
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  marginBottom: 15,
                }}
              >
                OR
              </Text>
              <Picker
                selectedValue={this.state.customer}
                style={styles.textInputStyle}
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({ customer: itemValue });
                }}
              >
                {this.props.customers && this.props.customers.length > 0
                  ? this.props.customers.map((customer, index) => {
                      return (
                        <Picker.Item
                          label={customer.customerName}
                          value={customer}
                          key={index}
                        />
                      );
                    })
                  : null}
              </Picker>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 25,
                }}
              >
                <TouchableOpacity onPress={() => this.viewOrder()}>
                  <Text
                    style={[
                      styles.bottomControls2,
                      {
                        borderColor: "#2e88ce",
                        borderWidth: 1,
                      },
                    ]}
                  >
                    View
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.placeOrder()}>
                  <Text
                    style={[
                      styles.bottomControls,
                      { backgroundColor: "#2e88ce" },
                    ]}
                  >
                    Send
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* )} */}
          </Overlay>
        );
      } else {
        return null;
      }
    }
  };

  showCheckOutModal = () => {
    this.RBSheet.open();
  };

  hideCheckOutModal = () => {
    this.RBSheet.close();
  };

  setModalVisible = () => {
    this.props.setModalVisible(!this.props.areYouSureModalIsVisible);
  };

  toggleActiveTab = (index) => {
    this.setState({ index });
    let tab = "";
    index === 0 ? (tab = "bar") : index === 1 ? (tab = "restaurant") : "";
    this.props.toggleActiveTab(tab);
    // if (index === 0 || index === 1) {
    //   this.props.clearCart()
    // }
  };

  renderIcon = ({ route, focused, color }) => {
    return route.key === "bar" ? (
      <View>
        {focused && (
          <FontAwesome5Icon name="wine-bottle" size={15} color="#2e88ce" />
        )}
        {!focused && (
          <FontAwesome5Icon name="wine-bottle" size={15} color="gray" />
        )}
      </View>
    ) : route.key === "restaurant" ? (
      <View>
        {focused && (
          <MaterialCommunityIcon
            name="food-variant"
            size={15}
            color="#2e88ce"
          />
        )}
        {!focused && (
          <MaterialCommunityIcon name="food-variant" size={15} color="gray" />
        )}
      </View>
    ) : route.key === "cart" ? (
      <View>
        {focused && (
          <MaterialCommunityIcon name="cart" size={15} color="#2e88ce" />
        )}
        {!focused && (
          <MaterialCommunityIcon name="cart" size={15} color="gray" />
        )}
      </View>
    ) : null;
  };

  toggleCheckOutBottomSheet = () => {
    this.props.toggleCheckOutBottomSheet(!this.props.checkBottomSheetIsVisible);
  };

  renderLabel = ({ route, focused, color }) => {
    return (
      <View>
        <Text
          style={[
            styles.tabText,
            focused ? styles.activeTabTextColor : styles.tabTextColor,
          ]}
        >
          {route.title}
        </Text>
      </View>
    );
  };

  barRoute = () => {
    return <BarAPI />;
  };

  restaurantRoute = () => {
    return <Restaurant />;
  };

  cartRoute = () => {
    return <Cart />;
  };

  render() {
    let barRoute = this.barRoute,
      restaurantRoute = this.restaurantRoute,
      cartRoute = this.cartRoute;
    return (
      <View style={{ flex: 1 }}>
        {this.showConfirmationDialog()}
        {this.props.isDrawerVisible && (
          <Modal
            animationType="none"
            transparent
            isVisible={this.props.isDrawerVisible}
            onRequestClose={() => this.props.toggleDrawer(false)}
          >
            <View style={styles.drawerModalContainer}>
              <View style={styles.drawerItemsContainer}>
                <View style={styles.categoriesContainer}>
                  <Text style={styles.categoriesHeaderText}>Categories</Text>
                  <ScrollView>
                    <View>
                      {this.props.drawerItems.map((drawerItem, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              this.props.toggleDrawer(false);
                              this.setState({ activeCategory: drawerItem });
                              this.props.filterItemsByCategory(
                                drawerItem,
                                this.props.currentTab
                              );
                            }}
                          >
                            <Text
                              style={[
                                {
                                  paddingTop: 15,
                                  paddingBottom: 15,
                                  fontSize: 14,
                                },
                                this.state.activeCategory === drawerItem
                                  ? {
                                      color: "#2e88ce",
                                    }
                                  : null,
                              ]}
                            >
                              {drawerItem}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </ScrollView>
                </View>
              </View>
              <View
                style={styles.drawerItemsOverlay}
                onTouchStart={() => this.props.toggleDrawer(false)}
              ></View>
            </View>
          </Modal>
        )}
        <RBSheet
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          height={400}
          duration={150}
        >
          <View style={styles.bottomSheetContainer}>
            <View style={styles.bottomSheetHeader}>
              <TouchableOpacity
                onPress={() => {
                  this.hideCheckOutModal();
                  this.setModalVisible();
                }}
              >
                <FeatherIcon name="send" size={25} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.bottomSheetHeaderText}>Items to Order</Text>
              {this.itemsInCheckOut().length > 0 && (
                <TouchableOpacity onPress={() => this.openClearModal()}>
                  <MaterialCommunityIcon
                    name="delete"
                    size={25}
                    color="#fff"
                    style={{ marginLeft: "auto" }}
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => this.hideCheckOutModal()}>
                <AntDesignIcon
                  style={{ marginLeft: 25 }}
                  name="close"
                  size={25}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
            <CheckOut />
          </View>
        </RBSheet>
        <Header screen="bar" />
        <View style={styles.layoutContainer}>
          <TabView
            navigationState={this.state}
            renderScene={SceneMap({
              bar: barRoute,
              restaurant: restaurantRoute,
              cart: cartRoute,
            })}
            onIndexChange={(index) => this.toggleActiveTab(index)}
            initialLayout={{ width: Dimensions.get("window").width }}
            renderTabBar={(props) => (
              <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: "#2e88ce" }}
                style={{ backgroundColor: "#f4f4f4", height: 55 }}
                renderIcon={this.renderIcon}
                indicatorStyle={{ backgroundColor: "#2e88ce", height: 5 }}
                renderLabel={this.renderLabel}
              />
            )}
          />
          <Bottom
            onBottomSheetStateChange={() => {
              this.showCheckOutModal();
            }}
          />
        </View>
      </View>
    );
  }
}

mapStateToProps = (state) => {
  return {
    currentTab: state.homeReducer.currentTab,
    areYouSureModalIsVisible: state.homeReducer.areYouSureModalIsVisible,
    checkBottomSheetIsVisible: state.homeReducer.checkBottomSheetIsVisible,
    barCheckOut: state.barReducer.barCheckOut,
    restaurantCheckOut: state.restaurantReducer.restaurantCheckOut,
    totalNumberOfItemsAddedFromBar:
      state.barReducer.totalNumberOfItemsAddedFromBar,
    totalNumberOfItemsAddedFromRestaurant:
      state.restaurantReducer.totalNumberOfItemsAddedFromRestaurant,
    totalAmountOfItemsAddedFromBar:
      state.barReducer.totalAmountOfItemsAddedFromBar,
    totalAmountOfItemsAddedFromRestaurant:
      state.restaurantReducer.totalAmountOfItemsAddedFromRestaurant,
    staffData: state.homeReducer.staffData,
    customers: state.homeReducer.customers,
    isDrawerVisible: state.homeReducer.isDrawerVisible,
    drawerItems: state.homeReducer.drawerItems,
  };
};

mapDispatchToProps = (dispatch) => {
  return {
    setModalVisible: (status) => {
      dispatch(toggleAreYouSureModalVisibility(status));
    },
    toggleActiveTab: (tab) => {
      dispatch(changeTab(tab));
    },
    toggleCheckOutBottomSheet: (status) => {
      dispatch(toggleCheckOutBottomSheet(status));
    },
    clearCart: () => {
      dispatch(clearItemsInBar());
      dispatch(clearItemsInRestaurant());
    },
    addNewDataToCart: (aTransaction) => {
      dispatch(addNewDataToCart(aTransaction));
    },
    setCustomers: (data) => {
      dispatch(setCustomers(data));
    },
    toggleDrawer: (value) => {
      dispatch(toggleDrawer(value));
    },
    filterItemsByCategory: (value, currentTab) => {
      if (currentTab === "bar") {
        dispatch(filterItemsInBarByCategory(value));
      } else if (currentTab === "restaurant") {
        dispatch(filterItemsInRestaurantByCategory(value));
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  layoutContainer: {
    flex: 1,
    backgroundColor: "#eee",
  },
  tabContainer: {
    backgroundColor: "#fff",
  },
  activeTabTextColor: {
    color: "#2e88ce",
  },
  tabTextColor: {
    color: "gray",
  },
  tabText: {
    fontWeight: "bold",
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    height: "70%",
    alignSelf: "flex-end",
  },
  modalHeader: {
    display: "flex",
    flexDirection: "row",
  },
  bottomSheetContainer: {
    flex: 1,
    flexDirection: "column",
  },
  bottomSheetHeader: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#2e88ce",
  },
  bottomSheetHeaderText: {
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 17,
    color: "#fff",
    fontWeight: "bold",
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 16,
    marginBottom: 20,
    padding: 7,
    borderRadius: 3,
  },
  bottomControls: {
    fontSize: 17,
    color: "#fff",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 3,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  bottomControls2: {
    fontSize: 17,
    color: "#2e88ce",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 3,
    shadowColor: "#2e88ce",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  drawerModalContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
  drawerItemsContainer: {
    display: "flex",
    width: "65%",
    height: "100%",
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  categoriesContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 40,
  },
  categoriesHeaderText: {
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 10,
  },
  drawerItemsOverlay: {
    width: "35%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, .5)",
  },
});
