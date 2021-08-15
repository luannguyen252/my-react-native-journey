import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Image,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import axios from "axios";
import { Spinner } from "react-native-ui-kitten";
import { connect } from "react-redux";
import { socket } from "../services/socketIO";
import AppLogo from "../assets/invex.png";
import {
  setStaffData,
  populateDrawerItems,
} from "../store/actions/homeActions";
import { populateOngoingTransactionsInCart } from "../store/actions/cartActions";
import { appUrl } from "../config";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      usernameError: false,
      passwordError: false,
      appId: "invexBar&Restaurant",
      errorMessage: "",
      isLoading: false,
    };
  }

  handleSetUp = async (data) => {
    try {
      const staffData = data.staffData;
      const branches = data.branches;
      await AsyncStorage.setItem("staffData", JSON.stringify(staffData));
      await AsyncStorage.setItem("branches", JSON.stringify(branches));
      const department = staffData.Department || "";
      if (department === "Admin") {
        this.props.navigation.replace("Summary", { params: data });
      } else {
        this.props.navigation.replace("Home");
      }
    } catch (e) {
      console.error(e);
    }
  };

  initialRequests = () => {
    const { Staff_ID, Branch } = this.props.staffData;

    socket.emit("saveSocketId", Staff_ID);

    socket.emit("getStaffUpdatedData", Staff_ID, (response) => {
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

  handleLogin = () => {
    Keyboard.dismiss();
    this.setState({
      errorMessage: "",
    });
    let username = this.state.username,
      password = this.state.password,
      appId = this.state.appId;
    if (!username) {
      this.setState({ usernameError: true });
    } else if (!password) {
      this.setState({ passwordError: true });
    } else {
      this.setState({
        isLoading: true,
      });
      axios
        .post(appUrl + "/login", {
          username,
          password,
          appId,
        })
        .then((response) => {
          if (response.data.loginMessage === "success") {
            this.props.setStaffData(response.data.staffData);
            this.initialRequests();
            this.handleSetUp(response.data);
          } else if (response.data.loginMessage === "failed") {
            this.setState({
              errorMessage: "Invalid Login",
              isLoading: false,
            });
          }
        })
        .catch((err) => {
          this.setState({
            errorMessage: "An error occured. Please try again",
            isLoading: false,
          });
          console.log(err);
        });
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#F5FCFF",
        }}
      >
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled
        >
          <View style={styles.container2}>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Image source={AppLogo} />
            </View>
            <Text
              style={{
                color: "red",
                textAlign: "center",
                marginTop: 20,
              }}
            >
              {this.state.errorMessage}
            </Text>
            <View style={styles.textInputContainer}>
              {this.state.usernameError && (
                <Text style={styles.textErrorStyle}>
                  Username cannot be empty
                </Text>
              )}
              <TextInput
                onChangeText={(username) =>
                  this.setState({
                    usernameError: false,
                    username: username,
                    errorMessage: "",
                  })
                }
                style={styles.textInputStyle}
                placeholder="Username"
              />
            </View>
            <View style={styles.textInputContainer}>
              {this.state.passwordError && (
                <Text style={styles.textErrorStyle}>
                  Password cannot be empty
                </Text>
              )}

              <TextInput
                secureTextEntry={true}
                onChangeText={(password) =>
                  this.setState({
                    passwordError: false,
                    password: password,
                    errorMessage: "",
                  })
                }
                style={styles.textInputStyle}
                placeholder="Password"
              />
            </View>
          </View>
          <View style={styles.loginButtonContainer}>
            <TouchableOpacity
              style={styles.loginButtonStyle}
              activeOpacity={0.5}
              onPress={this.handleLogin}
            >
              {this.state.isLoading ? (
                <Spinner size="large" status="info" color="#fff" />
              ) : (
                <Text style={styles.loginTextStyle}> LOGIN </Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    alignItems: "stretch",
  },
  container2: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: 30,
    paddingRight: 30,
  },
  textInputContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: 25,
  },
  textErrorStyle: {
    color: "red",
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 3,
    fontSize: 16,
    marginTop: 5,
    padding: 7,
  },
  loginButtonStyle: {
    marginTop: 40,
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
    elevation: 2,
  },
  loginTextStyle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
  },
});
