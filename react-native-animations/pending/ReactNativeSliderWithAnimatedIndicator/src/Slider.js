import React, { useEffect, useRef, useState } from "react";
import { ScrollView, View, Dimensions } from "react-native";
import { PagerBullets } from "./PagerBullets";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "../../../../../helpers/iPhoneXHelper";

const { width, height } = Dimensions.get("window");

const panelHeight = height - getBottomSpace() - getStatusBarHeight() - 116;

const items = [
  {
    color: "blue",
    id: "0",
  },
  {
    color: "red",
    id: "1",
  },
  {
    color: "white",
    id: "2",
  },
  {
    color: "green",
    id: "3",
  },
  {
    color: "black",
    id: "4",
  },
  {
    color: "yellow",
    id: "5",
  },
];

export default function Slider() {
  const scrollView = useRef(null);
  const currentIndexRef = useRef(0);
  const [swipeIndex, setSwipeIndex] = useState(0);

  const w = ~~width - 52;
  useEffect(() => {
    const x = swipeIndex * w;
    if (swipeIndex < items.length) {
      scrollView.current.scrollTo({ x });
    }
  }, []);
  return (
    <>
      <View style={{ height: 100, width: "100%", backgroundColor: "#fff" }} />
      <View
        style={{
          width: "100%",
          marginTop: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PagerBullets
          pages={items}
          swipeIndex={swipeIndex}
          style={{ marginBottom: 0 }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView
          ref={scrollView}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          decelerationRate={"fast"}
          snapToInterval={width - 52}
          onMomentumScrollEnd={({ nativeEvent }) => {
            const index = Math.floor(nativeEvent.contentOffset.x / w);
            currentIndexRef.current = index;
            setSwipeIndex(index);
          }}
        >
          {items.map((item, i) => (
            <View
              key={i.toString()}
              style={{
                height: panelHeight,
                width: width - 64,
                marginHorizontal: 6,
                marginLeft: i.toString() === "0" ? 32 : 6,
                marginRight: i === items.length - 1 ? 32 : 6,
                marginBottom: 24,
                marginTop: 8,
                backgroundColor: item.color,
                borderRadius: 6,
                padding: 16,
                elevation: 6,
                shadowOpacity: 1,
                shadowRadius: 5,
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowOffset: {
                  height: 2,
                  width: 0,
                },
              }}
            />
          ))}
        </ScrollView>
      </View>
    </>
  );
}
