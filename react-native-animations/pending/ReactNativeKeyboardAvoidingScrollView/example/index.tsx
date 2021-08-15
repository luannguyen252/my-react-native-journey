import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Text,
} from "react-native";
import { KeyboardAvoidingScrollView } from "../src";
import colors from "../../../../../assets/styles/colors";

export default () => {
  return (
    <View style={styles.container}>
      <KeyboardAvoidingScrollView
        containerStyle={styles.container}
        contentContainerStyle={styles.content}
        stickyFooter={
          <View style={styles.footer}>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                backgroundColor: colors.orange600,
                height: 56,
                paddingLeft: 16,
                paddingRight: 16,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                console.log("Create an account.");
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  lineHeight: 24,
                  fontWeight: "700",
                  color: colors.white,
                }}
              >
                Create an account
              </Text>
            </TouchableOpacity>
          </View>
        }
      >
        <Text style={styles.title}>Sign up with your email address</Text>
        <TextInput
          style={styles.textInput}
          placeholder="First name"
          textContentType="givenName"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Last name"
          textContentType="familyName"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          textContentType="emailAddress"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry
        />
        <TextInput
          style={styles.textInput}
          placeholder="What should we call you?"
          textContentType="nickname"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Address"
          textContentType="fullStreetAddress"
        />
        <TextInput
          style={styles.textInput}
          placeholder="City"
          textContentType="addressCity"
        />
        <TextInput
          style={styles.textInput}
          placeholder="State"
          textContentType="addressState"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Postal code"
          textContentType="postalCode"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Phone number"
          textContentType="telephoneNumber"
        />
      </KeyboardAvoidingScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {},
  title: {},
  textInput: {
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
    borderWidth: 1,
    padding: 16,
  },
  footer: {},
});
