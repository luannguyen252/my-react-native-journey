import React, { PureComponent } from "react";
import { View, Text, SafeAreaView, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import globalStyles from "../../assets/styles/globalStyles";
import styles from "./styles";

export default class FifthScreen extends PureComponent {
  render() {
    return (
      <View style={globalStyles.container}>
        <SafeAreaView>
          <StatusBar style="auto" />
          <Text style={globalStyles.title}>Fifth Screen</Text>
          <Button
            title="Details"
            onPress={() =>
              this.props.navigation.navigate("Details", {
                paramName: "Hello World",
              })
            }
          />
        </SafeAreaView>
      </View>
    );
  }
}
