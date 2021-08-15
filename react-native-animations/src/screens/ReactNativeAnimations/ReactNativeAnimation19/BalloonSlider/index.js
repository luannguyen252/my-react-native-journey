import React, { useRef } from "react";
import {
  Dimensions,
  View,
  ScrollView,
  Animated,
  Image,
  StyleSheet,
} from "react-native";
import debounce from "lodash.debounce";
import colors from "../../../../assets/styles/colors";

const windowWidth = Dimensions.get("window").width;
const contentWidth = windowWidth - 40;

const INITIAL_BALOON_X = contentWidth - 30;

const KNOB_SIZE = 30;
const OBJECT_SIZE = 72;

export default function BalloonSlider({
  image,
  sliderProcessColor,
  sliderBackgroundColor,
}) {
  const scrollView = useRef(null);
  const baloonX = new Animated.Value(INITIAL_BALOON_X);
  const baloonDragX = new Animated.Value(INITIAL_BALOON_X);

  let prevX = 0;

  const rotation = new Animated.Value(0);
  const visibleRotation = new Animated.Value(0);
  const tension = 0.8;
  const friction = 3;

  Animated.spring(baloonX, {
    toValue: baloonDragX,
    tension,
    friction,
    // useNativeDriver: true
  }).start();

  Animated.spring(visibleRotation, {
    toValue: rotation,
    tension: 1.5,
    friction: 5,
    // useNativeDriver: true
  }).start();

  const touchesEnded = () => {
    rotation.setValue(0);
  };

  const touchesEndedDelayed = debounce(touchesEnded, 50);

  const rotateZ = visibleRotation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ["-50deg", "0deg", "50deg"],
  });

  const translateX = visibleRotation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [-40, 0, 40],
  });

  return (
    <View style={styles.container}>
      {/* BEGIN: OBJECT & SLIDER */}
      <View style={{ height: 150 }}>
        {/* BEGIN: OBJECT */}
        <Animated.View
          style={{
            transform: [{ translateX: baloonX }],
          }}
        >
          <Animated.View
            style={{
              transform: [{ translateX }],
            }}
          >
            <Animated.View
              style={[styles.objectContainer, { transform: [{ rotateZ }] }]}
            >
              <Image
                style={{ height: OBJECT_SIZE, width: OBJECT_SIZE }}
                resizeMode="contain"
                source={image}
              />
            </Animated.View>
          </Animated.View>
        </Animated.View>
        {/* END: OBJECT */}

        {/* BEGIN: SLIDER */}
        <ScrollView
          ref={scrollView}
          scrollEventThrottle={50}
          decelerationRate={0}
          showsHorizontalScrollIndicator={false}
          onScroll={({ nativeEvent }) => {
            baloonDragX.setValue(
              INITIAL_BALOON_X - nativeEvent.contentOffset.x
            );

            const diff = prevX - nativeEvent.contentOffset.x;

            if (Math.abs(diff) > 10) {
              if (diff < 0) {
                rotation.setValue(1);
              } else {
                rotation.setValue(-1);
              }
            }
            prevX = nativeEvent.contentOffset.x;
            touchesEndedDelayed();
          }}
          horizontal
          bounces={false}
          contentContainerStyle={{
            alignItems: "center",
          }}
          style={{
            marginHorizontal: 20,
          }}
        >
          {/* Slider Process */}
          <View
            style={[
              styles.sliderProcess,
              { backgroundColor: sliderProcessColor },
            ]}
          ></View>

          {/* Slider Knob */}
          <View style={styles.sliderKnob}></View>

          {/* Slider Background */}
          <View
            style={[
              styles.sliderBackground,
              { backgroundColor: sliderBackgroundColor },
            ]}
          ></View>
        </ScrollView>
        {/* END: SLIDER */}
      </View>
      {/* END: OBJECT & SLIDER */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  objectContainer: {
    height: OBJECT_SIZE,
    width: OBJECT_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  sliderKnob: {
    height: KNOB_SIZE,
    width: KNOB_SIZE,
    borderRadius: KNOB_SIZE / 2,
    backgroundColor: colors.white,
    borderColor: colors.coolGray400,
    elevation: 3,
    shadowColor: colors.coolGray900,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  sliderProcess: {
    height: 2,
    width: contentWidth - KNOB_SIZE,
  },
  sliderBackground: {
    height: 2,
    width: contentWidth - KNOB_SIZE,
  },
});
