import React, { PureComponent } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Button,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import globalStyles from "../../assets/styles/globalStyles";
import styles from "./styles";

export default class SecondScreen extends PureComponent {
  // static navigationOptions = {
  //   title: "Second Screen",
  //   headerLeft: () => (
  //     <TouchableOpacity onPress={() => alert("Second Screen")}>
  //       <Text style={{}}>Back</Text>
  //     </TouchableOpacity>
  //   ),
  // };

  render() {
    return (
      <View style={globalStyles.container}>
        <SafeAreaView>
          <StatusBar style="auto" />
          <Text style={globalStyles.title}>Second Screen</Text>
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
              Examples in Second Screen will appear here.
            </Text>
            <Button
              title="Easing Example"
              onPress={() => this.props.navigation.navigate("Easing Example")}
            />
            <Button
              title="Map View Example"
              onPress={() => this.props.navigation.navigate("Map View Example")}
            />
            <Button
              title="Location Example"
              onPress={() => this.props.navigation.navigate("Location Example")}
            />
            <Button
              title="Keyboard API Example"
              onPress={() =>
                this.props.navigation.navigate("Keyboard API Example")
              }
            />
            <Button
              title="UseKeyboard Hook Example"
              onPress={() =>
                this.props.navigation.navigate("UseKeyboard Hook Example")
              }
            />
            <Button
              title="React Native Location Tracking Examples"
              onPress={() =>
                this.props.navigation.navigate(
                  "React Native Location Tracking Examples"
                )
              }
            />
            <Button
              title="React Native Modal Examples"
              onPress={() =>
                this.props.navigation.navigate("React Native Modal Examples")
              }
            />
            <Button
              title="React Native Circular Progress Example"
              onPress={() =>
                this.props.navigation.navigate(
                  "React Native Circular Progress Example"
                )
              }
            />
            <Button
              title="React Native Simple Radio Button"
              onPress={() =>
                this.props.navigation.navigate(
                  "React Native Simple Radio Button"
                )
              }
            />
          </Animated.ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
