import React, { Component,PureComponent } from "react";
import { View, StyleSheet, ScrollView, FlatList, Text } from "react-native";
import axios from "axios";
import { connect } from "react-redux";
import GridItem from "../components/GridItem";
import GridItem1 from "../components/GridItem1";
import { appUrl } from "../config";
import {
  updateNoOfItemInBar,
  populateItemsInBar,
  toggleBarItemsLoading
} from "../store/actions/barActions";
import { populateMoreItemsInBar } from "../store/actions/moreItemsToOrderActions";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { Spinner } from "react-native-ui-kitten";

class BarAPI extends PureComponent {
  constructor() {
    super();
  }

  componentWillMount() {
    this.fetchItemsFromOnline();
  }

  fetchItemsFromOnline() {
    let url = appUrl + "/getItemsFromBranch";

    axios
      .post(url, {
        Branch: this.props.staffData.Branch
      })
      .then(response => {
        if (response.data.hasItems) {
          this.props.populateItemsInBar(response.data.items);
        }
        this.props.toggleBarItemsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderGridItem = ({ item, index }) => (
    <GridItem
      item={item}
      index={index}
      onChange={(value, eventType, itemId) => {
        this.props.updateNoOfItemInBar(value, index, itemId);
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
    let dataBar = this.props.bar;

    return (
      <View style={styles.gridContainer}>
        {this.props.isLoadingBarItems ? (
          <View style={styles.emptyContainer}>
            <Spinner size="giant" status="alternative" />
          </View>
        ) : this.props.bar.length === 0 ? (
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
                data={dataBar}
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
              data={dataBar}
              extraData={this.props}
              keyExtractor={item => item.itemId}
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

mapStateToProps = state => {
  return {
    bar: state.barReducer.bar,
    barCheckOut: state.barReducer.barCheckOut,
    staffData: state.homeReducer.staffData,
    totalNumberOfItemsAddedFromBar:
      state.barReducer.totalNumberOfItemsAddedFromBar,
    totalNumberOfItemsAddedFromRestaurant:
      state.restaurantReducer.totalNumberOfItemsAddedFromRestaurant,
    isLoadingBarItems: state.barReducer.isLoadingBarItems
  };
};

mapDispatchToProps = dispatch => {
  return {
    updateNoOfItemInBar: (value, index, itemId) => {
      dispatch(updateNoOfItemInBar(value, index, itemId));
    },
    populateItemsInBar: value => {
      dispatch(populateItemsInBar(value));
      dispatch(populateMoreItemsInBar(value));
    },
    toggleBarItemsLoading: (value) => {
      dispatch(toggleBarItemsLoading(value));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BarAPI);

const styles = StyleSheet.create({
  gridContainer: {
    flex: 1,
    backgroundColor: "#eee",
    padding: 5
  },
  gridLayout: {
    display: "flex",
    justifyContent: "space-between"
  },
  emptyContainer: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  emptyText: {
    fontSize: 16,
    color: "gray",
    marginTop: 10
  }
});
