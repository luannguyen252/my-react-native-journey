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

export default class Section12AdvancedRealWorld extends PureComponent {
  render() {
    return (
      <View style={globalStyles.container}>
        <ScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          <SafeAreaView>
            <StatusBar style="auto" />
            {/* BEGIN: Section 12 - Advanced Real World Photo Grid Shared Element */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                this.props.navigation.navigate(
                  "Section 12 Advanced Real World Photo Grid Shared Element"
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
                Section 12 - Advanced Real World Photo Grid Shared Element →
              </Text>
            </TouchableOpacity>
            {/* END: Section 12 - Advanced Real World Photo Grid Shared Element */}

            {/* BEGIN: Section 12 - Advanced Real World Animated Color Picker */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                this.props.navigation.navigate(
                  "Section 12 Advanced Real World Animated Color Picker"
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
                Section 12 - Advanced Real World Animated Color Picker →
              </Text>
            </TouchableOpacity>
            {/* END: Section 12 - Advanced Real World Animated Color Picker */}

            {/* BEGIN: Section 12 - Advanced Real World Floating Action Button With Menu */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                this.props.navigation.navigate(
                  "Section 12 Advanced Real World Floating Action Button With Menu"
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
                Section 12 - Advanced Real World Floating Action Button With
                Menu →
              </Text>
            </TouchableOpacity>
            {/* END: Section 12 - Advanced Real World Floating Action Button With Menu */}

            {/* BEGIN: Section 12 - Advanced Real World Application Intro Screen */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                this.props.navigation.navigate(
                  "Section 12 Advanced Real World Application Intro Screen"
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
                Section 12 - Advanced Real World Application Intro Screen →
              </Text>
            </TouchableOpacity>
            {/* END: Section 12 - Advanced Real World Application Intro Screen */}

            {/* BEGIN: Section 12 - Advanced Real World Evolving Write Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                this.props.navigation.navigate(
                  "Section 12 Advanced Real World Evolving Write Button"
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
                Section 12 - Advanced Real World Evolving Write Button →
              </Text>
            </TouchableOpacity>
            {/* END: Section 12 - Advanced Real World Evolving Write Button */}

            {/* BEGIN: Section 12 - Advanced Real World Social Comment Modal Animated Swipe Away */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                this.props.navigation.navigate(
                  "Section 12 Advanced Real World Social Comment Modal Animated Swipe Away"
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
                Section 12 - Advanced Real World Social Comment Modal Animated
                Swipe Away →
              </Text>
            </TouchableOpacity>
            {/* END: Section 12 - Advanced Real World Social Comment Modal Animated Swipe Away */}

            {/* BEGIN: Section 12 - Advanced Real World Horizontal Parallax ScrollView */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                this.props.navigation.navigate(
                  "Section 12 Advanced Real World Horizontal Parallax ScrollView"
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
                Section 12 - Advanced Real World Horizontal Parallax ScrollView
                →
              </Text>
            </TouchableOpacity>
            {/* END: Section 12 - Advanced Real World Horizontal Parallax ScrollView */}

            {/* BEGIN: Section 12 - Advanced Real World Tap Show Love Floating Hearts */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                this.props.navigation.navigate(
                  "Section 12 Advanced Real World Tap Show Love Floating Hearts"
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
                Section 12 - Advanced Real World Tap Show Love Floating Hearts →
              </Text>
            </TouchableOpacity>
            {/* END: Section 12 - Advanced Real World Tap Show Love Floating Hearts */}

            {/* BEGIN: Section 12 - Advanced Real World Bouncing Heart Shaped Like Button OnPress */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                this.props.navigation.navigate(
                  "Section 12 Advanced Real World Bouncing Heart Shaped Like Button OnPress"
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
                Section 12 - Advanced Real World Bouncing Heart Shaped Like
                Button OnPress →
              </Text>
            </TouchableOpacity>
            {/* END: Section 12 - Advanced Real World Bouncing Heart Shaped Like Button OnPress */}

            {/* BEGIN: Section 12 - Advanced Real World Exploding Heart Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                this.props.navigation.navigate(
                  "Section 12 Advanced Real World Exploding Heart Button"
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
                Section 12 - Advanced Real World Exploding Heart Button →
              </Text>
            </TouchableOpacity>
            {/* END: Section 12 - Advanced Real World Exploding Heart Button */}

            {/* BEGIN: Section 12 - Advanced Real World Expanding Notify Input With Success Message */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                this.props.navigation.navigate(
                  "Section 12 Advanced Real World Expanding Notify Input With Success Message"
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
                Section 12 - Advanced Real World Expanding Notify Input With
                Success Message →
              </Text>
            </TouchableOpacity>
            {/* END: Section 12 - Advanced Real World Expanding Notify Input With Success Message */}
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}
