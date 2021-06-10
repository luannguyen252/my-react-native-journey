import React, { PureComponent } from "react";
import { View, Text, SafeAreaView, Button, Animated } from "react-native";
import { StatusBar } from "expo-status-bar";
import globalStyles from "../../assets/styles/globalStyles";
import styles from "./styles";
import ReactNativeTouchableScaleFeedbackExamples from "./ReactNativeTouchableScaleFeedbackExamples";
import ReactNativeFlatButtonExamples from "./ReactNativeFlatButtonExamples";
import ReactNativeTextTickerExamples1 from "./ReactNativeTextTickerExamples/ReactNativeTextTickerExamples1";
import ReactNativeTextTickerExamples2 from "./ReactNativeTextTickerExamples/ReactNativeTextTickerExamples2";

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

            {/* Button Touchable Scale Feedback  */}
            <ReactNativeTouchableScaleFeedbackExamples />
            <ReactNativeFlatButtonExamples />

            {/* Text Ticker / Marquee Label */}
            <ReactNativeTextTickerExamples1 />
            <ReactNativeTextTickerExamples2 />
          </Animated.ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
