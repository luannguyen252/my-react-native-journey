import React, { Component } from "react";
import {
  View,
  FlatList,
  TouchableHighlight,
  Alert,
  SafeAreaView
} from "react-native";
import Options from "../Options";
import { connect } from "react-redux";
import styles from "./styles";
import ListItem from "../ListItem";
import AsyncStorage from "@react-native-community/async-storage";
import constants from "../../constants";
import {
  showNotifications,
  initializeGuitars,
  initializeTheme
} from "../../actions";
import colors from "../../colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import appConfig from "../../../app.json";
import NotifService from "../../NotifService";
import * as Animatable from "react-native-animatable";
import PropTypes from "prop-types";
import strings from "../../strings";

//If there are no items in the FlatList then FAB should pulse to get the user's attention
let shouldPulse = "pulse";

class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("Title", strings.title),
      headerTitleStyle: {
        color: colors.primary
      },
      headerStyle: {
        backgroundColor: colors.darkDark
      },
      headerRight: <Options navigation={navigation} />
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      hideFab: false,
      senderId: appConfig.senderID
    };
    this.notif = new NotifService();
  }

  handlePerm(perms) {
    Alert.alert("Permissions", JSON.stringify(perms));
  }

  componentWillMount() {
    if (!this.state.initialized) {
      this.getPersistedData();
      this.setState({ initialized: true });
    }
  }

  getPersistedData = async () => {
    //getting theme from async storage
    // let theme = await AsyncStorage.getItem(constants.persistedTheme);
    // if (theme === null) {
    //   theme = "normal";
    // } else {
    //   theme = theme === "normal" ? "normal" : "nightShade";
    // }
    // this.props.initializeTheme(theme);
    //getting notification state from async storage
    let notifications = await AsyncStorage.getItem(
      constants.persistedNotifications
    );
    if (notifications === null) {
      notifications = true;
    } else {
      notifications = notifications === "true" ? true : false;
    }
    if (this.props.notifications !== notifications) {
      this.props.showNotifications(notifications);
    }
    //getting guitars from async storage
    let guitars = await AsyncStorage.getItem(constants.persistedGuitars);
    this.props.initializeGuitars(JSON.parse(guitars));
    shouldPulse = this.props.guitars.length > 0 ? "pulse" : null;
  };

  handleRef = ref => (this.view = ref);
  //animate the fab then navigate to Add screen
  handleAdd = () => {
    this.view.bounce(500);
    setTimeout(() => {
      this.view.stopAnimation();
      this.props.navigation.navigate("Add");
    }, 500);
  };

  //the floating action button
  fab = scrolling => {
    return (
      !scrolling && (
        <Animatable.View
          animation="slideInRight"
          duration={500}
          style={styles.fabSlideAnimationWrapper}
        >
          <Animatable.View
            ref={this.handleRef}
            animation={shouldPulse}
            easing="ease-out"
            iterationCount="infinite"
            delay={500}
            style={styles.fabPulseAnimationWrapper}
          >
            <TouchableHighlight
              onPress={() => {
                this.handleAdd();
              }}
              style={styles.fab}
              underlayColor={colors.light}
            >
              <Icon name="add" color={colors.white} size={45} />
            </TouchableHighlight>
          </Animatable.View>
        </Animatable.View>
      )
    );
  };

  render() {
    //used for delaying every individual rendering of list items for a sweet animation effect
    let count = 0;
    return (
      <View style={styles.parent}>
        <SafeAreaView>
          <FlatList
            data={this.props.guitars}
            renderItem={({ item }) => (
              //animate every individual lit item
              <Animatable.View
                animation="bounceInDown"
                duration={1000}
                delay={count++ * 250}
              >
                <ListItem item={item} navigation={this.props.navigation} />
              </Animatable.View>
            )}
            onScrollBeginDrag={() => {
              this.setState({ hideFab: true });
            }}
            onScrollEndDrag={() => {
              setTimeout(() => {
                this.setState({ hideFab: false });
              }, 750);
            }}
          />
        </SafeAreaView>
        {this.fab(this.state.hideFab)}
      </View>
    );
  }
}

Home.propTypes = {
  guitars: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    guitars: state.guitars,
    notifications: state.notifications
    // theme: state.theme
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showNotifications: show => {
      dispatch(showNotifications(show));
    },
    initializeGuitars: guitars => {
      dispatch(initializeGuitars(guitars));
    },
    initializeTheme: theme => {
      dispatch(initializeTheme(theme));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
