import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import FirstExample from "./FirstExample";
import SecondExample from "./SecondExample";
import styles from "./styles";

function ReactNativeSkeletonPlaceholderWithView() {
  return (
    <SkeletonPlaceholder>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
        <View style={{ marginLeft: 20 }}>
          <View style={{ width: 120, height: 20, borderRadius: 4 }} />
          <View
            style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
          />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
}

function ReactNativeSkeletonPlaceholderWithoutView() {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
        <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
        <SkeletonPlaceholder.Item marginLeft={20}>
          <SkeletonPlaceholder.Item width={120} height={20} borderRadius={4} />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={80}
            height={20}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
}

const ReactNativeSkeletonPlaceholder = ({}) => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.heading}>First example</Text>
    <FirstExample />
    <View style={styles.separator} />
    <Text style={styles.heading}>Second example</Text>
    <SecondExample />
  </SafeAreaView>
);

App.propTypes = {};
App.defaultProps = {};

export default ReactNativeSkeletonPlaceholder;
