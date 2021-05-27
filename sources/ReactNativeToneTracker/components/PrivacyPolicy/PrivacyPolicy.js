import React, { Component } from "react";
import { Text, ScrollView, SafeAreaView, Animated } from "react-native";
import styles from "./styles";
import strings from "../../strings";

class PrivacyPolicy extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>{strings.privacyPolicyTitle}</Text>
          <Text style={styles.content}>{strings.privacyPolicy}</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default PrivacyPolicy;
