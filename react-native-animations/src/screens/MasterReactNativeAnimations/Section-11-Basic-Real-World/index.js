import { StatusBar } from "expo-status-bar";
import React, { PureComponent } from "react";
import {
  ScrollView,
  View,
  Text,
  SafeAreaView,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import globalStyles from "../../../assets/styles/globalStyles";
import colors from "../../../assets/styles/colors";

// BEGIN: Styles
const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  box: {
    backgroundColor: colors.orange600,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
// END: Styles

export default class Section11BasicRealWorld extends PureComponent {
  render() {
    return (
      <View style={globalStyles.container}>
        <ScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          <SafeAreaView>
            <StatusBar style="auto" />
            {/* BEGIN: Section 11 - Basic Real World 4 Corners */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                this.props.navigation.navigate(
                  "Section 11 Basic Real World 4 Corners"
                )
              }
              style={{
                paddingTop: 8,
                paddingLeft: 16,
                paddingRight: 16,
                paddingBottom: 8,
              }}
            >
              <Text style={globalStyles.bodyText}>
                Section 11 - Basic Real World 4 Corners →
              </Text>
            </TouchableOpacity>
            {/* END: Section 11 - Basic Real World 4 Corners */}

            {/* BEGIN: Section 11 - Basic Real World Staggered Heads */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                this.props.navigation.navigate(
                  "Section 11 Basic Real World Staggered Heads"
                )
              }
              style={{
                paddingTop: 8,
                paddingLeft: 16,
                paddingRight: 16,
                paddingBottom: 8,
              }}
            >
              <Text style={globalStyles.bodyText}>
                Section 11 - Basic Real World Staggered Heads →
              </Text>
            </TouchableOpacity>
            {/* END: Section 11 - Basic Real World Staggered Heads */}

            {/* BEGIN: Section 11 - Basic Real World Kitten Cards */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                this.props.navigation.navigate(
                  "Section 11 Basic Real World Kitten Cards"
                )
              }
              style={{
                paddingTop: 8,
                paddingLeft: 16,
                paddingRight: 16,
                paddingBottom: 8,
              }}
            >
              <Text style={globalStyles.bodyText}>
                Section 11 - Basic Real World Kitten Cards →
              </Text>
            </TouchableOpacity>
            {/* END: Section 11 - Basic Real World Kitten Cards */}

            {/* BEGIN: Section 11 - Basic Real World Stagger Form Items Visibility On Mount */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                this.props.navigation.navigate(
                  "Section 11 Basic Real World Stagger Form Items Visibility On Mount"
                )
              }
              style={{
                paddingTop: 8,
                paddingLeft: 16,
                paddingRight: 16,
                paddingBottom: 8,
              }}
            >
              <Text style={globalStyles.bodyText}>
                Section 11 - Basic Real World Stagger Form Items Visibility On
                Mount →
              </Text>
            </TouchableOpacity>
            {/* END: Section 11 - Basic Real World Stagger Form Items Visibility On Mount */}

            {/* BEGIN: Section 11 - Basic Real World Animated Progress Bar Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                this.props.navigation.navigate(
                  "Section 11 Basic Real World Animated Progress Bar Button"
                )
              }
              style={{
                paddingTop: 8,
                paddingLeft: 16,
                paddingRight: 16,
                paddingBottom: 8,
              }}
            >
              <Text style={globalStyles.bodyText}>
                Section 11 - Basic Real World Animated Progress Bar Button →
              </Text>
            </TouchableOpacity>
            {/* END: Section 11 - Basic Real World Animated Progress Bar Button */}

            {/* BEGIN: Section 11 - Basic Real World Dynamic Animated Notifications */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                this.props.navigation.navigate(
                  "Section 11 Basic Real World Dynamic Animated Notifications"
                )
              }
              style={{
                paddingTop: 8,
                paddingLeft: 16,
                paddingRight: 16,
                paddingBottom: 8,
              }}
            >
              <Text style={globalStyles.bodyText}>
                Section 11 - Basic Real World Dynamic Animated Notifications →
              </Text>
            </TouchableOpacity>
            {/* END: Section 11 - Basic Real World Dynamic Animated Notifications */}

            {/* BEGIN: Section 11 - Basic Real World Animated Questionnaire With Progress Bar */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                this.props.navigation.navigate(
                  "Section 11 Basic Real World Animated Questionnaire With Progress Bar"
                )
              }
              style={{
                paddingTop: 8,
                paddingLeft: 16,
                paddingRight: 16,
                paddingBottom: 8,
              }}
            >
              <Text style={globalStyles.bodyText}>
                Section 11 - Basic Real World Animated Questionnaire With
                Progress Bar →
              </Text>
            </TouchableOpacity>
            {/* END: Section 11 - Basic Real World Animated Questionnaire With Progress Bar */}
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}
