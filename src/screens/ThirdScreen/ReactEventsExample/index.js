// Read more: https://www.w3schools.com/react/react_events.asp
// Read more: https://www.tutorialspoint.com/reactjs/reactjs_events.htm
// Read more: https://www.javatpoint.com/react-events
import React, { PureComponent } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import globalStyles from "../../../assets/styles/globalStyles";
import ReactEventsExample1 from "./ReactEventsExample1";
import ReactEventsExample2 from "./ReactEventsExample2";
import ReactEventsExample3 from "./ReactEventsExample3";
import ReactEventsExample4 from "./ReactEventsExample4";
import ReactEventsExample5 from "./ReactEventsExample5";

export default class ReactEventsExample extends PureComponent {
  render() {
    return (
      <View style={[globalStyles.container, { backgroundColor: "#F9FAFB" }]}>
        <SafeAreaView>
          <StatusBar style="auto" />
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: 16,
              paddingLeft: 16,
              paddingRight: 16,
              paddingBottom: 200,
            }}
          >
            <ReactEventsExample1 />
            <ReactEventsExample2 />
            <ReactEventsExample3 />
            <ReactEventsExample4 />
            <ReactEventsExample5 />
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
