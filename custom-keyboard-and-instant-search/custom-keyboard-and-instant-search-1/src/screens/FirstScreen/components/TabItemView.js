import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "../styles";

export default function TabItemView({
  name,
  amount,
  isActive,
  onPress,
  onLayoutHandler,
  additionalStyle,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.tabItemViewContainer,
        // { borderBottomColor: isActive ? "#EE0033" : "#E9E9E9" }, //Loại bỏ vì sử dụng border của thư viện vì phục vụ cho việc kéo left-right,
        additionalStyle,
      ]}
      onLayout={onLayoutHandler}
    >
      <Text
        style={[
          styles.tabItemViewText,
          { color: isActive ? "#EE0033" : "#222222" },
        ]}
      >
        {name}
        {/* ({amount}) */}
      </Text>
    </TouchableOpacity>
  );
}
