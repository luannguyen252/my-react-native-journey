import React, { PureComponent } from "react";
import { View, Text, SafeAreaView, Animated, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import globalStyles from "../../assets/styles/globalStyles";
import styles from "./styles";

export default class ThirdScreen extends PureComponent {
  render() {
    return (
      <View style={globalStyles.container}>
        <SafeAreaView>
          <StatusBar style="auto" />
          <Text style={globalStyles.title}>Third Screen</Text>
          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 96 }}
          >
            <Button
              title="API Example"
              onPress={() => this.props.navigation.navigate("API Example")}
            />
            <Button
              title="State and Prop Example"
              onPress={() =>
                this.props.navigation.navigate("State and Prop Example")
              }
            />
            <Button
              title="React Lifecycle Example"
              onPress={() =>
                this.props.navigation.navigate("React Lifecycle Example")
              }
            />
            <Button
              title="React Events Example"
              onPress={() =>
                this.props.navigation.navigate("React Events Example")
              }
            />
          </Animated.ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
