import React, { Component } from "react";
import { withNavigation } from "react-navigation";
import {
  Text,
  StyleSheet,
  AsyncStorage,
  View,
  Modal,
  TouchableOpacity,
  Button
} from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { Header as NativeHeader } from "react-native-elements";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import { connect } from "react-redux";
import SearchBar from "./SearchBar";
import {
  filterItemsInBar,
  clearItemsInBar,
  populateItemsInBar,
  toggleBarItemsLoading,
  sortItemsInBar
} from "../store/actions/barActions";
import {
  filterItemsInRestaurant,
  clearItemsInRestaurant,
  populateItemsInRestaurant,
  toggleRestaurantItemsLoading,
  sortItemsInRestaurant
} from "../store/actions/restaurantActions";
import { filterTransactionsInCart } from "../store/actions/cartActions";
import PopupMenu from "./PopupMenu";
import { logOut, toggleSortedBy } from "../store/actions/homeActions";
import { appUrl } from "../config";
import { socket } from "../services/socketIO";
import {
  populateMoreItemsInBar,
  populateMoreItemsInRestaurant,
  sortMoreItemsInBar,
  sortMoreItemsInRestaurant
} from "../store/actions/moreItemsToOrderActions";
import axios from "axios";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      hasCameraPermission: null,
      isScannerOpen: false,
      scanned: false
    };
  }

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  };

  onPopupEvent = (eventName, index) => {
    const currentTab = this.props.currentTab;

    if (index === 0) {
      this.props.clearCart();
      (async () => {
        await AsyncStorage.setItem("staffData", "").then(value => {
          this.props.logOut();
          this.props.navigation.navigate("Login");
          socket;
        });
      })();
    } else if (index === 1) {
      this.props.navigation.navigate("Sales");
    } else if (index === 2) {
      this.props.navigation.navigate("RemovedItems");
    } else if (index === 3) {
      this.props.navigation.navigate("Profile");
    } else if (index === 4) {
      (async () => {
        this.props.toggleBarItemsLoading(true);
        await this.fetchItems("/getItemsFromBranch");
        this.props.toggleSortedBy("defaultItems");
      })();
    } else if (index === 5) {
      (async () => {
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
      })();
    } else if (index === 6) {
      (async () => {
        if (currentTab === "bar") {
          this.props.toggleBarItemsLoading(true);
          await this.fetchItems("/getTopSellingItemsFromBranch");
        } else if (currentTab === "restaurant") {
          this.props.toggleRestaurantItemsLoading(true);
          await this.fetchItems("/getTopSellingItemsFromBranch");
        }
      })();

      this.props.clearCart();
      this.props.toggleSortedBy("topSellingItems");
    }
  };

  handleBarCodeScanned = ({ type, data }) => {
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    this.setState({ scanned: true, isScannerOpen: false });
    console.log(this.props.barCheckOut)
  };

  fetchItems(location) {
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
        Branch
      })
      .then(response => {
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
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    Invex = () => <Text style={styles.invexText}>Invex</Text>;

    // const {
    //   hasCameraPermission,
    //   isModalOpen,
    //   isScannerOpen,
    //   scanned
    // } = this.state;

    // if (hasCameraPermission === null) {
    //   return <Text>Requesting for camera permission</Text>;
    // }
    // if (hasCameraPermission === false) {
    //   return <Text>No access to camera</Text>;
    // }

    const {
      hasCameraPermission,
      isModalOpen,
      isScannerOpen,
      scanned
    } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <>
        <NativeHeader
          leftComponent={<Invex />}
          centerComponent={
            <SearchBar
              currentTab={this.props.currentTab}
              onChangeText={userInput => {
                this.props.filterItems(userInput, this.props.currentTab);
              }}
            />
          }
          rightComponent={
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <TouchableOpacity
                style={{ marginRight: 5 }}
                onPress={() => {
                  this.setState({ isModalOpen: true, isScannerOpen: true });
                }}
              >
                <EntypoIcon name="camera" size={20} color="#fff" />
              </TouchableOpacity>
              <PopupMenu
                actions={[
                  "Log Out",
                  "Sales",
                  "Removed Items",
                  "Profile",
                  "Sort by default",
                  "Sort by pinned items",
                  "Sort by top selling"
                ]}
                onPress={this.onPopupEvent}
              />
            </View>
          }
          containerStyle={{
            backgroundColor: "#2e88ce",
            justifyContent: "space-around"
          }}
        />
        {isModalOpen && (
          <Modal
            animationType="slide"
            transparent
            visible={this.state.addMoreItemsModalIsVisible}
            onRequestClose={() => this.setState({ isModalOpen: false })}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeaderText}>Scan Item Barcode</Text>
                <TouchableOpacity
                  onPress={() => this.setState({ isModalOpen: false })}
                >
                  <AntDesignIcon
                    style={{ marginLeft: 25 }}
                    name="close"
                    size={25}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
              {isScannerOpen ? (
                <BarCodeScanner
                  onBarCodeScanned={
                    scanned ? undefined : this.handleBarCodeScanned
                  }
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={() => {
                      this.setState({ scanned: false, isScannerOpen: true });
                    }}
                  >
                    <View>

                    </View>
                    <Text style={styles.buttonTextStyle}>
                      Tap to Scan Again
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </Modal>
        )}
      </>
    );
  }
}

mapStateToProps = state => {
  return {
    currentTab: state.homeReducer.currentTab,
    staffData: state.homeReducer.staffData,
    barCheckOut: state.barReducer.barCheckOut,
  };
};

mapDispatchToProps = dispatch => {
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
    populateItemsInBar: value => {
      dispatch(populateItemsInBar(value));
      dispatch(populateMoreItemsInBar(value));
    },
    toggleBarItemsLoading: value => {
      dispatch(toggleBarItemsLoading(value));
    },
    populateItemsInRestaurant: value => {
      dispatch(populateItemsInRestaurant(value));
      dispatch(populateMoreItemsInRestaurant(value));
    },
    toggleRestaurantItemsLoading: value => {
      dispatch(toggleRestaurantItemsLoading(value));
    },
    toggleSortedBy: value => {
      dispatch(toggleSortedBy(value));
    },
    sortItemsInBar: value => {
      dispatch(sortItemsInBar(value));
      dispatch(sortMoreItemsInBar(value));
    },
    sortItemsInRestaurant: value => {
      dispatch(sortItemsInRestaurant(value));
      dispatch(sortMoreItemsInRestaurant(value));
    }
  };
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(Header)
);

const styles = StyleSheet.create({
  invexText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold"
  },
  modalBackground: {
    flex: 1,
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingTop: "10%",
    paddingBottom: "10%",
    backgroundColor: "rgba(0, 0, 0, 0.7)"
  },
  modalHeader: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2e88ce",
    height: 50,
    padding: 10,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3
  },
  modalHeaderText: {
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 17,
    color: "#fff",
    fontWeight: "bold"
  },
  buttonStyle: {
    marginTop: 'auto',
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: "#2e88ce",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#2e88ce",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2
  },
  buttonTextStyle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17
  }
});
