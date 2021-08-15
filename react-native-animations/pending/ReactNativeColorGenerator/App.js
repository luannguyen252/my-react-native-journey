import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import usePrevious from "react-use-previous";
import hexToHsl from "hex-to-hsl";
import randomColor from "randomcolor";

const getHSLString = (color) => {
  const [h, s, l] = hexToHsl(color);
  return "hsl(" + h + "," + s + "%," + l + "%)";
};

const ColorCard = ({ color, onPress }) => {
  const [animation] = useState(new Animated.Value(0));
  const prevColor = usePrevious(color)?.current || color;

  useLayoutEffect(() => {
    animation.setValue(0);
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [color]);

  return (
    <TouchableOpacity
      style={{
        width: "50%",
        height: 180,
        padding: 5,
      }}
      onPress={onPress}
    >
      <View
        style={{
          padding: 5,
          backgroundColor: "#FFF",
          borderRadius: 15,
          height: "100%",
        }}
      >
        <Animated.View
          style={{
            backgroundColor: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [getHSLString(prevColor), getHSLString(color)],
            }),
            padding: 10,
            borderRadius: 10,
            flex: 1,
          }}
        />
        <View
          style={{
            paddingVertical: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
            }}
          >
            {color}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ToastBar = ({ color }) => {
  return (
    <View style={styles.toast}>
      <Text
        style={{
          color: "#FFF",
        }}
      >
        Color {color} copied to your clipboard
      </Text>
    </View>
  );
};

const getColor = () => {
  return randomColor({
    luminosity: "light",
    hue: "random",
  });
};

const get5New = () => {
  return [getColor(), getColor(), getColor(), getColor(), getColor()];
};

export default function App() {
  const [colors, setColors] = useState(get5New());
  const [selectedColor, setSelectedColor] = useState();
  const [animatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    if (selectedColor) {
      animatedValue.setValue(0);
      Animated.sequence([
        Animated.spring(animatedValue, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.delay(1000),
        Animated.spring(animatedValue, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [selectedColor]);
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.toastPosition,
          {
            transform: [
              {
                translateY: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-100, 0],
                }),
              },
            ],
          },
        ]}
      >
        <ToastBar color={selectedColor} />
      </Animated.View>
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Text style={styles.title}>Color palette generator</Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {colors.map((color, index) => {
              return (
                <ColorCard
                  key={index}
                  color={color}
                  onPress={() => {
                    setSelectedColor(color);
                  }}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
      <View>
        <TouchableOpacity
          style={styles.generateButton}
          onPress={() => {
            setColors(get5New());
          }}
        >
          <Text style={{ color: "#FFF", fontSize: 18 }}>Generate palette</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: "#E8ECF3",
  },
  toastPosition: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    zIndex: 10,
  },
  toast: {
    backgroundColor: "#0C1226",
    shadowColor: "#A8B2C3",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 15,
    shadowOpacity: 1,
    borderRadius: 29,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 34,
    color: "#0A102C",
    textAlign: "center",
    marginBottom: 30,
  },
  generateButton: {
    backgroundColor: "#7E6CCA",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
    shadowColor: "#7E6CCA",
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
