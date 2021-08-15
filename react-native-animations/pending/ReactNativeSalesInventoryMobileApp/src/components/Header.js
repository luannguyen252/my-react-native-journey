import React, { Component } from "react";
import { withNavigation } from "react-navigation";
import { AsyncStorage, View, TouchableOpacity } from "react-native";
import { Header as NativeHeader } from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import SearchBar from "./SearchBar";
import {
  filterItemsInBar,
  clearItemsInBar,
  populateItemsInBar,
  toggleBarItemsLoading,
  sortItemsInBar,
} from "../store/actions/barActions";
import {
  filterItemsInRestaurant,
  clearItemsInRestaurant,
  populateItemsInRestaurant,
  toggleRestaurantItemsLoading,
  sortItemsInRestaurant,
} from "../store/actions/restaurantActions";
import { filterTransactionsInCart } from "../store/actions/cartActions";
import PopupMenu from "./PopupMenu";
import {
  logOut,
  toggleSortedBy,
  toggleDrawer,
} from "../store/actions/homeActions";
import { appUrl } from "../config";
import { socket } from "../services/socketIO";
import {
  populateMoreItemsInBar,
  populateMoreItemsInRestaurant,
  sortMoreItemsInBar,
  sortMoreItemsInRestaurant,
} from "../store/actions/moreItemsToOrderActions";
import axios from "axios";
import * as Permissions from "expo-permissions";
// import { BarCodeScanner } from "expo-barcode-scanner";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      hasCameraPermission: null,
      isScannerOpen: false,
      scanned: false,
    };
  }

  componentDidMount() {
    // this.getPermissionsAsync();
    AsyncStorage.getItem("barPinnedItems", "");
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  };

  onPopupEvent = async (eventName, index) => {
    const currentTab = this.props.currentTab;

    if (index === 0) {
      this.props.navigation.navigate("Sales");
    } else if (index === 1) {
      this.props.navigation.navigate("RemovedItems");
    } else if (index === 2) {
      this.props.navigation.navigate("Profile");
    } else if (index === 3) {
      this.props.toggleBarItemsLoading(true);
      await this.fetchItems("/getItemsFromBranch");
      this.props.toggleSortedBy("defaultItems");
    } else if (index === 4) {
      if (currentTab === "bar") {
        this.props.toggleBarItemsLoading(true);
        let pinnedItems = await AsyncStorage.getItem(
          `${currentTab}PinnedItems`
        );
        pinnedItems = JSON.parse(pinnedItems);
        if (!pinnedItems) {
          pinnedItems = [];
        }
        this.props.sortItemsInBar(pinnedItems);
      } else {
        this.props.toggleRestaurantItemsLoading(true);
        let pinnedItems = await AsyncStorage.getItem(
          `${currentTab}PinnedItems`
        );
        pinnedItems = JSON.parse(pinnedItems);
        if (!pinnedItems) {
          pinnedItems = [];
        }
        this.props.sortItemsInRestaurant(pinnedItems);
      }
      this.props.toggleSortedBy("pinnedItems");
    } else if (index === 5) {
      if (currentTab === "bar") {
        this.props.toggleBarItemsLoading(true);
        await this.fetchItems("/getTopSellingItemsFromBranch");
      } else if (currentTab === "restaurant") {
        this.props.toggleRestaurantItemsLoading(true);
        await this.fetchItems("/getTopSellingItemsFromBranch");
      }
      this.props.clearCart();
      this.props.toggleSortedBy("topSellingItems");
    } else if (index === 6) {
      this.props.clearCart();
      await AsyncStorage.setItem("branches", "");
      await AsyncStorage.setItem("staffData", "");
      this.props.logOut();
      this.props.navigation.replace("Login");
    }
  };

  handleBarCodeScanned = ({ type, data }) => {
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    this.setState({ scanned: true, isScannerOpen: false });
    console.log(this.props.barCheckOut);
  };

  fetchItems = (location) => {
    let url = appUrl + location,
      Branch = "",
      currentTab = this.props.currentTab;

    if (currentTab === "bar") {
      Branch = this.props.staffData.Branch;
    } else {
      Branch = "Restaurant";
    }

    axios
      .post(url, {
        Branch,
      })
      .then((response) => {
        if (response) {
          const itemsToLoad = response.data.items;
          if (currentTab === "bar") {
            if (location === "getTopSellingItemsFromBranch") {
              this.props.sortItemsInBar(itemsToLoad);
            } else {
              this.props.populateItemsInBar(itemsToLoad);
            }
          } else {
            if (location === "getTopSellingItemsFromBranch") {
              this.props.sortItemsInRestaurant(itemsToLoad);
            } else {
              this.props.populateItemsInRestaurant(itemsToLoad);
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    Menu = () => (
      <TouchableOpacity onPress={() => this.props.toggleDrawer(true)}>
        <MaterialCommunityIcons name="menu" size={30} color={"#fff"} />
      </TouchableOpacity>
    );

    return (
      <NativeHeader
        leftComponent={<Menu />}
        centerComponent={
          <SearchBar
            currentTab={this.props.currentTab}
            onChangeText={(userInput) => {
              this.props.filterItems(userInput, this.props.currentTab);
            }}
          />
        }
        rightComponent={
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <PopupMenu
              actions={[
                "Sales",
                "Removed Items",
                "Profile",
                "Sort by default",
                "Sort by pinned items",
                "Sort by top selling",
                "Log Out",
              ]}
              onPress={this.onPopupEvent}
            />
          </View>
        }
        containerStyle={{
          backgroundColor: "#2e88ce",
          justifyContent: "space-around",
        }}
      />
    );
  }
}

mapStateToProps = (state) => {
  return {
    currentTab: state.homeReducer.currentTab,
    staffData: state.homeReducer.staffData,
    barCheckOut: state.barReducer.barCheckOut,
  };
};

mapDispatchToProps = (dispatch) => {
  return {
    filterItems: (value, currentTab) => {
      if (currentTab === "bar") {
        dispatch(filterItemsInBar(value));
      } else if (currentTab === "restaurant") {
        dispatch(filterItemsInRestaurant(value));
      } else {
        dispatch(filterTransactionsInCart(value));
      }
    },
    clearCart: () => {
      dispatch(clearItemsInBar());
      dispatch(clearItemsInRestaurant());
    },
    logOut: () => {
      dispatch(logOut());
    },
    populateItemsInBar: (value) => {
      dispatch(populateItemsInBar(value));
      dispatch(populateMoreItemsInBar(value));
    },
    toggleBarItemsLoading: (value) => {
      dispatch(toggleBarItemsLoading(value));
    },
    populateItemsInRestaurant: (value) => {
      dispatch(populateItemsInRestaurant(value));
      dispatch(populateMoreItemsInRestaurant(value));
    },
    toggleRestaurantItemsLoading: (value) => {
      dispatch(toggleRestaurantItemsLoading(value));
    },
    toggleSortedBy: (value) => {
      dispatch(toggleSortedBy(value));
    },
    sortItemsInBar: (value) => {
      dispatch(sortItemsInBar(value));
      dispatch(sortMoreItemsInBar(value));
    },
    sortItemsInRestaurant: (value) => {
      dispatch(sortItemsInRestaurant(value));
      dispatch(sortMoreItemsInRestaurant(value));
    },
    toggleDrawer: (value) => {
      dispatch(toggleDrawer(value));
    },
  };
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(Header)
);
