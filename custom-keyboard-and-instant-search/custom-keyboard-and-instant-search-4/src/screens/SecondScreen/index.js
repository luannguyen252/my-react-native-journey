import React, { PureComponent } from "react";
import { View, Text, SafeAreaView, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import globalStyles from "../../assets/styles/globalStyles";
import styles from "./styles";

export default class SecondScreen extends PureComponent {
  render() {
    return (
      <View style={globalStyles.container}>
        <SafeAreaView>
          <StatusBar style="auto" />
          <Text style={globalStyles.title}>Second Screen</Text>
          <Button
            title="Custom Keyboard"
            onPress={() => this.props.navigation.navigate("Custom Keyboard")}
          />
        </SafeAreaView>
      </View>
    );
  }
}
