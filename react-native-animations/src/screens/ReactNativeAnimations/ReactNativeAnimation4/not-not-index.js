// https://www.youtube.com/watch?v=z9l5WXPKCpA
import { MotiView } from "moti";
import * as Animatable from "react-native-animatable";
import * as React from "react";
import {
  Vibration,
  StatusBar,
  Easing,
  TextInput,
  Dimensions,
  Animated,
  TouchableOpacity,
  FlatList,
  Text,
  View,
  StyleSheet,
} from "react-native";
import globalStyles from "../../../assets/styles/globalStyles";
import colors from "../../../assets/styles/colors";
// import styles from "./styles";

const { width, height } = Dimensions.get("window");
const timers = [...Array(13).keys()].map((i) => (i === 0 ? 1 : i * 5));
const ITEM_SIZE = width * 0.38;
const ITEM_SPACING = (width - ITEM_SIZE) / 2;

export default function ReactNativeAnimation4() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [duration, setDuration] = React.useState(timers[0]);
  const inputRef = React.useRef();
  const timerAnimation = React.useRef(new Animated.Value(height)).current;
  const buttonAnimation = React.useRef(new Animated.Value(0)).current;
  const animation = React.useCallback(() => {
    Animated.sequence([
      Animated.timing(buttonAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(timerAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(timerAnimation, {
        toValue: height,
        duration: duration * 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.timing(buttonAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  }, [duration]);

  const opacity = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const translateY = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  const textOpacity = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          position: "absolute",
          top: height / 3,
          left: 0,
          right: 0,
          flex: 1,
        }}
      >
        <Animated.View
          style={{
            position: "absolute",
            width: ITEM_SIZE,
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center",
            opacity: textOpacity,
          }}
        >
          <Text style={styles.text}>{duration}</Text>
        </Animated.View>
        <Animated.FlatList
          data={timers}
          keyExtractor={(item) => item.toString()}
          horizontal
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: true,
            }
          )}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(
              event.nativeEvent.contentOffset.x / ITEM_SIZE
            );
          }}
          showsHorizontalScrollIndicator={false}
          snapToInterval={ITEM_SIZE}
          decelerationRate="fast"
          style={{ flexGrow: 0, opacity }}
          contentContainerStyle={{ paddingHorizontal: ITEM_SPACING }}
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 1) * ITEM_SIZE,
              index * ITEM_SIZE,
              (index + 1) * ITEM_SIZE,
            ];

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.4, 1, 0.4],
            });

            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.7, 1, 0.7],
            });

            return (
              <View
                style={{
                  width: ITEM_SIZE,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Animated.Text
                  style={[styles.text, { opacity, transform: [{ scale }] }]}
                >
                  {item}
                </Animated.Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.coolGray900,
  },
  roundButton: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: colors.orange600,
  },
  text: {
    fontSize: ITEM_SIZE * 0.8,
    color: colors.coolGray100,
    fontWeight: "900",
  },
});
