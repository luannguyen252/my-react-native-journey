import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../../../assets/styles/globalStyles";

export default function CellTimKiemGanDay({ onPress, name, onDeletePress }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity
        style={{ paddingBottom: 16 }}
        activeOpacity={0.8}
        onPress={onPress}
      >
        <Text style={globalStyles.bodyText}>{name} →</Text>
      </TouchableOpacity>

      {/* BEGIN: Delete Action */}
      <TouchableOpacity
        style={{ paddingBottom: 16 }}
        activeOpacity={0.8}
        onPress={onDeletePress}
      >
        <Text style={[globalStyles.bodyText, { color: "#EE0033" }]}>Xóa</Text>
      </TouchableOpacity>
      {/* END: Delete Action */}
    </View>
  );
}
