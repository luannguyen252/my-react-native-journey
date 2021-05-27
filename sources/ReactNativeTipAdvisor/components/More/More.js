import React, { Component } from "react";
import {
  Text,
  View,
  TouchableHighlight,
  Linking,
  Dimensions,
  Platform
} from "react-native";
import styles from "./styles";
import email from "react-native-email";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Title from "../Title";
import * as Animatable from "react-native-animatable";
import colors from "../../colors";
import strings from "../../strings";

//Contact email
const EMAIL = "violenthoboenterprises@gmail.com";

//link to store listing
const REVIEW =
  Platform.OS === "ios"
    ? "https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1464879497&mt=8"
    : "https://play.google.com/store/apps/details?id=com.tipadvisor";

//link to developer page
const MORE_APPS =
  Platform.OS === "ios"
    ? "https://itunes.apple.com/ph/developer/charlie-mcgregor/id1463597870?mt=8"
    : "https://play.google.com/store/apps/developer?id=ViolentHoboEnterprises";

class Contact extends Component {
  handleAnimation = ref => {
    //animate the button before doing anything else
    this.refs[ref].rubberBand(500).then(endState => {
      //carry out the button's purpose
      switch (ref) {
        case "review":
          Linking.openURL(REVIEW).catch(err =>
            console.error("An error occurred", err)
          );
          break;
        case "email":
          email(EMAIL, {}).catch(err => console.error("An error occured", err));
          break;
        case "moreApps":
          Linking.openURL(MORE_APPS).catch(err =>
            console.error("An error occurred", err)
          );
          break;
      }
    });
  };

  //setting icon size based on screen size
  getIconSize = () => {
    return Dimensions.get("window").width > 650 ? 80 : 50;
  };

  //content for each button on the screen
  getTouchContent = content => {
    return (
      <View style={styles.touchWrapper}>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{content.text}</Text>
        </View>
        <View style={styles.imgWrapper}>
          <Icon
            name={content.iconName}
            color={"#888"}
            size={this.getIconSize()}
          />
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Title />
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate("PrivacyPolicy")}
          style={styles.privacy}
          underlayColor="#ccc"
        >
          <Text
            style={{
              color: "#111",
              fontWeight: "bold"
            }}
          >
            {strings.privacy}
          </Text>
        </TouchableHighlight>

        <View style={styles.contactWrapper}>
          {/* review */}
          <Animatable.View ref="review" style={styles.touchableWrapper}>
            <TouchableHighlight
              onPress={() => this.handleAnimation("review")}
              underlayColor={colors.primary}
              style={{ borderRadius: 20 }}
            >
              {this.getTouchContent({
                text: strings.leaveReview,
                iconName: "star-face"
              })}
            </TouchableHighlight>
          </Animatable.View>

          {/* email */}
          <Animatable.View ref="email" style={styles.touchableWrapper}>
            <TouchableHighlight
              onPress={() => this.handleAnimation("email")}
              underlayColor={colors.primary}
              style={{ borderRadius: 20 }}
            >
              {this.getTouchContent({
                text: strings.contact,
                iconName: "email-outline"
              })}
            </TouchableHighlight>
          </Animatable.View>

          {/* more apps */}
          <Animatable.View ref="moreApps" style={styles.touchableWrapper}>
            <TouchableHighlight
              onPress={() => this.handleAnimation("moreApps")}
              underlayColor={colors.primary}
              style={{ borderRadius: 20 }}
            >
              {this.getTouchContent({
                text: strings.moreApps,
                iconName: "cellphone-arrow-down"
              })}
            </TouchableHighlight>
          </Animatable.View>
        </View>
        <View style={styles.credit}>
          <Text style={styles.creditText}>
            {strings.credit} - {new Date().getFullYear()}
          </Text>
        </View>
      </View>
    );
  }
}

export default Contact;
