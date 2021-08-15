import React, { useEffect } from "react";
import { View, LayoutAnimation } from "react-native";

export const PagerBullets = ({ pages, swipeIndex = 0, style }) => {
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }, [swipeIndex]);

  const keys = { [swipeIndex.toString()]: "main" };
  let i = 0;
  pages.forEach((p, index) => {
    if (index !== swipeIndex) {
      keys[index.toString()] = i.toString();
      i++;
    }
  });

  return (
    <View style={style}>
      <View style={{ height: 8, flexDirection: "row" }}>
        {pages.map((_, i) => {
          if (i === swipeIndex) {
            return (
              <View
                key="main"
                style={{
                  marginLeft: i === 0 ? 0 : 10,
                  backgroundColor: "#919AAB",
                  height: 8,
                  width: 30,
                  borderRadius: 4,
                }}
              />
            );
          }

          return (
            <View
              key={keys[i.toString()]}
              style={{
                marginLeft: i === 0 ? 0 : 10,
                backgroundColor: "#919AAB",
                height: 8,
                width: 8,
                borderRadius: 4,
              }}
            />
          );
        })}
      </View>
    </View>
  );
};
