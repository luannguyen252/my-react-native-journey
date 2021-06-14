import * as React from "react";
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
const { width, height } = Dimensions.get("screen");

const data = [
  "https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg",
  "https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg",
  "https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/79ac1a4c5235f29f4f92cb5a4e44d8fc.jpg",
];

const imageW = width * 0.7;
const imageH = imageW * 1.54;

export default function CarouselFlatListAnimation() {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <StatusBar hidden />

      <View style={StyleSheet.absoluteFillObject}>
        {data.map((image, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });

          return (
            <Animated.Image
              key={`image-${index}`}
              source={{ uri: image }}
              style={[
                StyleSheet.absoluteFillObject,
                {
                  opacity,
                },
              ]}
              blurRadius={50}
            />
          );
        })}
      </View>

      <Animated.FlatList
        data={data}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {
            useNativeDriver: true,
          }
        )}
        keyExtrator={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        renderItem={({ item }) => {
          return (
            <View
              style={{
                width,
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000000",
                shadowOpacity: 1,
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowRadius: 20,
              }}
            >
              <Image
                source={{ uri: item }}
                style={{
                  width: imageW,
                  height: imageH,
                  resizeMode: "cover",
                  borderRadius: 16,
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
}
