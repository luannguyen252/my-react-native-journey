import React, { useRef } from "react";
import { StyleSheet, Linking, Text, Platform } from "react-native";

import { useHover, useFocus, useActive } from "react-native-web-hooks";

export default function Link({ children, href = "#" }) {
  const ref = useRef(null);

  const { isHovered } = useHover(ref);
  const { isFocused } = useFocus(ref);
  const { isActive } = useActive(ref);

  return (
    <Text
      accessibilityRole="link"
      href={href}
      draggable={false}
      onPress={() => Linking.openURL(href)}
      tabIndex={0}
      ref={ref}
      style={[
        styles.text,
        isHovered && styles.hover,
        isFocused && styles.focused,
        isActive && styles.active,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    ...Platform.select({
      web: {
        marginLeft: 24,
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        cursor: "pointer",
        outlineStyle: "none",
        color: "white",
        borderBottomWidth: 1,
        borderBottomColor: "transparent",
        transitionDuration: "200ms",
      },
      default: {},
    }),
  },
  active: {
    color: "orange",
    borderBottomColor: "orange",
    opacity: 1.0,
  },
  hover: {
    transform: [{ scale: 1.1 }],
    // opacity: 0.6,
  },
  focused: {
    borderBottomColor: "white",
  },
});
