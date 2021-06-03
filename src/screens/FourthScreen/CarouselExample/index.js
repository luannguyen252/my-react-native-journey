import React, { PureComponent } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";

export default class CarouselExample extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <StatusBar style="auto" />
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 80 }}
          >
            <Text>Carousel Example</Text>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  text: {},
});
