import React, { PureComponent } from "react";
import { View, Text, SafeAreaView, Button, Animated } from "react-native";
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
              Examples in Fifth Screen will appear here.
            </Text>
            <Button title="Click Me" onPress={() => alert("Button Clicked!")} />
          </Animated.ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
