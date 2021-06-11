import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  Text,
  ToastAndroid,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";

import { getUsers, followUser, unfollowUser } from "./store/users/actions";

export class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      isLoading: false
    };
  }

  componentDidMount() {
    const { getusers, user: users } = this.props;
    getusers();
    this.setState({ users });
  }

  componentWillReceiveProps(nextProps) {
    const { error, isLoading, user: users, online, outbox } = nextProps;
    console.log("TCL: index -> componentWillReceiveProps -> online", online);
    console.log("TCL: index -> componentWillReceiveProps -> outbox", outbox);

    this.setState({ users, isLoading });

    if (error)
      return this.setState({ isLoading }, () =>
        this.showToast("Error on refreshing")
      );
  }

  showToast = (message, delay = 3000) => ToastAndroid.show(message, delay);

  render() {
    const { users = [], isLoading } = this.state;
    const { getusers, followUser: follow, unfollowUser: unfollow } = this.props;

    return (
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={getusers} />
        }
      >
        <Text style={styles.headingText}>USERS</Text>
        {users.map(user => (
          <View key={user.id} style={styles.userContainer}>
            <View>
              <Text>Name: {user.name}</Text>
              <Text>ID: {user.id}</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() =>
                  user.following ? unfollow(user.id) : follow(user.id)
                }
              >
                <Text>{user.following ? "unfollow" : "Follow"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 400
  },
  headingText: {
    fontSize: 14,
    marginTop: "6%",
    marginLeft: "4%"
  },
  userContainer: {
    borderBottomColor: "#333",
    borderBottomWidth: 0.6,
    padding: "2%",
    paddingLeft: "4.2%",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

const mapStateToProps = ({ usersReducer, offline }) => ({
  ...usersReducer,
  ...offline
});

const mapDispatchToProps = dispatch => ({
  getusers: _ => dispatch(getUsers()),
  followUser: id => dispatch(followUser(id)),
  unfollowUser: id => dispatch(unfollowUser(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(index);
