import React, { Component } from "react";
import { Text, ScrollView, SafeAreaView } from "react-native";
import styles from "./styles";
import strings from "../../strings";

class PrivacyPolicy extends Component {
  render() {
    return (
      <SafeAreaView>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.text}>{strings.privacyPolicy}</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default PrivacyPolicy;
