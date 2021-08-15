import React, { Component } from "react";
import { connect } from "react-redux";
import { View, StyleSheet, ScrollView, FlatList, Text } from "react-native";
import axios from "axios";
import GridItem from "../components/GridItem";
import GridItem1 from "../components/GridItem1";
import {
  updateNoOfItemInRestaurant,
  populateItemsInRestaurant,
  toggleRestaurantItemsLoading
} from "../store/actions/restaurantActions";
import { populateMoreItemsInRestaurant } from "../store/actions/moreItemsToOrderActions";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { Spinner } from "react-native-ui-kitten";
import { appUrl } from "../config";

class Restaurant extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.fetchItemsFromOnline();
  }

  fetchItemsFromOnline = () => {
    let url = appUrl + "/getItemsFromBranch";
    axios
      .post(url, {
        Branch: "Restaurant",
      })
      .then(async (response) => {
        if (response.data.hasItems) {
          this.props.populateItemsInRestaurant(response.data.items);
        }
        this.props.toggleRestaurantItemsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderGridItem = ({ item, index }) => (
    <GridItem
      item={item}
      index={index}
      onChange={(value, eventType, itemId) => {
        this.props.updateNoOfItemInRestaurant(value, index, itemId);
      }}
    />
  );

  renderGridItem1 = ({ item, index }) => (
    <GridItem1
      item={item}
      index={index}
      onChange={(value, eventType, itemId) => {
        this.props.updateNoOfItemInBar(value, index, itemId);
      }}
    />
  );

  render() {
    let dataRest = this.props.restaurant;
    return (
      <View style={styles.gridContainer}>
        {this.props.isLoadingRestaurantItems ? (
          <View style={styles.emptyContainer}>
            <Spinner size="giant" status="alternative" />
          </View>
        ) : this.props.restaurant.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialIcon name="hourglass-empty" size={50} color="gray" />
            <Text style={styles.emptyText}>None Found.</Text>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flex: 1 }}
          >
            {/* {Number(this.props.totalNumberOfItemsAddedFromBar) +
              Number(this.props.totalNumberOfItemsAddedFromRestaurant) ===
            0 ? (
              <FlatList
                data={dataRest}
                extraData={this.props}
                keyExtractor={item => item.itemId}
                renderItem={this.renderGridItem1}
                horizontal={false}
                numColumns={2}
                contentContainerStyle={styles.gridLayout}
                // onEndReached={this.loadMore.bind(this)}
              />
            ) : ( */}
            <FlatList
              data={dataRest}
              extraData={this.props}
              keyExtractor={(item) => item.itemId}
              renderItem={this.renderGridItem}
              horizontal={false}
              numColumns={2}
              contentContainerStyle={styles.gridLayout}
              // onEndReached={this.loadMore.bind(this)}
            />
            {/* )} */}
          </ScrollView>
        )}
      </View>
    );
  }
}

mapStateToProps = (state) => {
  return {
    restaurant: state.restaurantReducer.restaurant,
    restaurantCheckOut: state.restaurantReducer.restaurantCheckOut,
    totalNumberOfItemsAddedFromBar:
      state.barReducer.totalNumberOfItemsAddedFromBar,
    totalNumberOfItemsAddedFromRestaurant:
      state.restaurantReducer.totalNumberOfItemsAddedFromRestaurant,
    isLoadingRestaurantItems: state.restaurantReducer.isLoadingRestaurantItems,
  };
};

mapDispatchToProps = (dispatch) => {
  return {
    updateNoOfItemInRestaurant: (value, index, itemId) => {
      dispatch(updateNoOfItemInRestaurant(value, index, itemId));
    },
    populateItemsInRestaurant: (value) => {
      dispatch(populateItemsInRestaurant(value));
      dispatch(populateMoreItemsInRestaurant(value));
    },
    toggleRestaurantItemsLoading: (value) => {
      dispatch(toggleRestaurantItemsLoading(value));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);

const styles = StyleSheet.create({
  gridContainer: {
    flex: 1,
    backgroundColor: "#eee",
    flexDirection: "column",
    marginTop: 15,
    paddingLeft: 5,
    paddingRight: 5,
  },
  gridLayout: {
    // flex: 1,
    // marginBottom: 30,
    display: "flex",
    // flexWrap: 'wrap',
    // flexDirection: 'row',
    justifyContent: "space-between",
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
});
