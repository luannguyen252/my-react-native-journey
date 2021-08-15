import AccordionItem from "./AccordionContent";
import React, { PureComponent } from "react";
import { ScrollView, SafeAreaView } from "react-native";

export default class ReactNativeReanimatedCollapsible extends PureComponent {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "grey" }}>
        <ScrollView style={{ paddingTop: 20 }}>
          {[0, 1].map((i) => (
            <AccordionItem key={i} />
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
