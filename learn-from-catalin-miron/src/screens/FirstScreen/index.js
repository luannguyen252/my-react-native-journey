import React, { PureComponent } from "react";
import { View, Text, SafeAreaView, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import globalStyles from "../../assets/styles/globalStyles";
import styles from "./styles";

export default class FirstScreen extends PureComponent {
  render() {
    return (
      <View style={globalStyles.container}>
        <SafeAreaView>
          <StatusBar style="auto" />
          <Text style={globalStyles.title}>First Screen</Text>
          <Button
            title="Details"
            onPress={() =>
              this.props.navigation.navigate("Details", {
                paramName: "Hello World",
              })
            }
          />
          <Button
            title="Carousel FlatList Animation"
            onPress={() =>
              this.props.navigation.navigate("Carousel FlatList Animation")
            }
          />
          <Button
            title="Shared Element Transition React Navigation"
            onPress={() =>
              this.props.navigation.navigate(
                "Shared Element Transition React Navigation"
              )
            }
          />
          <Button
            title="Shared Element Transition"
            onPress={() =>
              this.props.navigation.navigate("Shared Element Transition")
            }
          />
          <Button
            title="Shared Element Example"
            onPress={() =>
              this.props.navigation.navigate("Shared Element Example")
            }
          />
        </SafeAreaView>
      </View>
    );
  }
}
