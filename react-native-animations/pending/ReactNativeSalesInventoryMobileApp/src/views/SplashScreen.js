import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { socket } from "../services/socketIO";
import axios from "axios";
import AppLogo from "../assets/invex.png";
import {
  setStaffData,
  populateDrawerItems,
} from "../store/actions/homeActions";
import { populateOngoingTransactionsInCart } from "../store/actions/cartActions";
import { appUrl } from "../config";

class SplashScreen extends Component {
  constructor() {
    super();
  }

  initialRequests = () => {
    const { Staff_ID, Branch } = this.props.staffData;

    socket.emit("saveSocketId", { Staff_ID, Branch });

    socket.emit("getStaffUpdatedData", Staff_ID, (response) => {
      if (Staff_ID !== response.Staff_ID) {
      }
      this.props.setStaffData(response);
    });

    socket.emit("getOngoingTransactions", Staff_ID, (response) => {
      this.props.populateOngoingTransactionsInCart(response);
    });

    let url = appUrl + "/getBranchCategories";
    axios
      .post(url, {
        Branch,
      })
      .then(async (response) => {
        if (response.data.categories) {
          this.props.populateDrawerItems(response.data.categories);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    (staffData = async () => {
      await AsyncStorage.getItem("staffData").then(async (value) => {
        if (value) {
          let branches = await AsyncStorage.getItem("branches");
          branches = JSON.parse(branches);
          const staffData = JSON.parse(value);
          await this.props.setStaffData(staffData);
          const department = staffData.Department || "";
          if (department === "Admin") {
            this.props.navigation.replace("Summary", {
              params: { branches, staffData },
            });
          } else {
            this.initialRequests();
            this.props.navigation.replace("Home");
          }
        } else {
          this.props.navigation.replace("Login");
        }
      });
    })();
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#F5FCFF",
        }}
      >
        <View style={styles.container}>
          <Image source={AppLogo} />
        </View>
      </View>
    );
  }
}

mapStateToProps = (state) => {
  return { staffData: state.homeReducer.staffData };
};

mapDispatchToProps = (dispatch) => {
  return {
    setStaffData: (staffData) => {
      dispatch(setStaffData(staffData));
    },
    populateOngoingTransactionsInCart: (ongoingTransactions) => {
      dispatch(populateOngoingTransactionsInCart(ongoingTransactions));
    },
    populateDrawerItems: (value) => {
      dispatch(populateDrawerItems(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
