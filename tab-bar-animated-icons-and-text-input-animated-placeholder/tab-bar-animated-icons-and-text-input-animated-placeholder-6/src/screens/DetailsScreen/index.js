import React, { Component } from "react";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import globalStyles from "../../assets/styles/globalStyles";
import colors from "../../assets/styles/colors";
import styles from "./styles";

export default class DetailsScreen extends Component {
  render() {
    const { paramName } = this.props.route.params;

    return (
      <View
        style={[
          globalStyles.container,
          styles.container,
          { backgroundColor: colors.coolGray50 },
        ]}
      >
        <StatusBar style="auto" />
        <Text style={globalStyles.title}>{paramName}</Text>
      </View>
    );
  }
}
