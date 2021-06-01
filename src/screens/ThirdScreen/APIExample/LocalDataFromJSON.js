import React from "react";
import { Text, View } from "react-native";
import data from "./data.json";

export default function LocalDataFromJSON() {
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
      }}
    >
      {data.map((item, index) => (
        <View key={index} style={{ paddingBottom: 16 }}>
          <Text
            style={{
              fontSize: 16,
              lineHeight: 24,
              fontWeight: "700",
              color: "#111827",
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{
              fontSize: 14,
              lineHeight: 16,
              fontWeight: "400",
              color: "#111827",
            }}
          >
            {item.role}
          </Text>
          <Text
            style={{
              fontSize: 14,
              lineHeight: 16,
              fontWeight: "400",
              color: "#111827",
            }}
          >
            {item.introduction}
          </Text>
        </View>
      ))}
    </View>
  );
}
