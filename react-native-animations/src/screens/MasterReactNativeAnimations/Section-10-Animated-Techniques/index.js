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

export default class Section10AnimatedTechniques extends PureComponent {
  render() {
    return (
      <View style={globalStyles.container}>
        <ScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          <SafeAreaView>
            <StatusBar style="auto" />
            {/* BEGIN: Section 10 - Animated Techniques 99 Cliff */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                this.props.navigation.navigate(
                  "Section 10 Animated Techniques 99 Cliff"
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
                Section 10 - Animated Techniques 99 Cliff →
              </Text>
            </TouchableOpacity>
            {/* END: Section 10 - Animated Techniques 99 Cliff */}

            {/* BEGIN: Section 10 - Animated Techniques Animate Hidden */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                this.props.navigation.navigate(
                  "Section 10 Animated Techniques Animate Hidden"
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
                Section 10 - Animated Techniques Animate Hidden →
              </Text>
            </TouchableOpacity>
            {/* END: Section 10 - Animated Techniques Animate Hidden */}

            {/* BEGIN: Section 10 - Animated Techniques Interrupted Animation */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                this.props.navigation.navigate(
                  "Section 10 Animated Techniques Interrupted Animation"
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
                Section 10 - Animated Techniques Interrupted Animation →
              </Text>
            </TouchableOpacity>
            {/* END: Section 10 - Animated Techniques Interrupted Animation */}

            {/* BEGIN: Section 10 - Animated Techniques Pointer Events */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                this.props.navigation.navigate(
                  "Section 10 Animated Techniques Pointer Events"
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
                Section 10 - Animated Techniques Pointer Events →
              </Text>
            </TouchableOpacity>
            {/* END: Section 10 - Animated Techniques Pointer Events */}
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}
