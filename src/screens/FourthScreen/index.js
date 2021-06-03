import React, { PureComponent } from "react";
import { View, Text, SafeAreaView, Button, Animated } from "react-native";
import { StatusBar } from "expo-status-bar";
import globalStyles from "../../assets/styles/globalStyles";
import styles from "./styles";

export default class FourthScreen extends PureComponent {
  render() {
    return (
      <View style={globalStyles.container}>
        <SafeAreaView>
          <StatusBar style="auto" />
          <Text style={globalStyles.title}>Fourth Screen</Text>
          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 96 }}
          >
            <Text
              style={[
                globalStyles.bodyText,
                { paddingLeft: 16, paddingRight: 16 },
              ]}
            >
              Examples in Fourth Screen will appear here.
            </Text>
            <Button
              title="Native Base Example"
              onPress={() => this.props.navigation.navigate("Native Base")}
            />
            <Button
              title="Scrollable Tab View Example"
              onPress={() =>
                this.props.navigation.navigate("Scrollable Tab View Example")
              }
            />
          </Animated.ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
