import React, { FunctionComponent, useRef, useEffect } from "react";
import { Text, View, Animated, Easing } from "react-native";

type Props = {
  children: string;
  duration: number;
};

const AnimatedText: FunctionComponent<Props> = ({ children, duration }) => {
  const text = children.split(" ");
  const animatedValues = useRef(text.map(() => new Animated.Value(0))).current;

  const start = () => {
    Animated.stagger(
      duration / 3,
      animatedValues.map(a =>
        Animated.timing(a, {
          toValue: 1,
          duration,
          useNativeDriver: true
        })
      )
    ).start();
  };

  useEffect(() => {
    start();
  }, []);

  return (
    <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {text.map((t, i) => (
        <Animated.Text
          key={i}
          style={[
            { marginLeft: 4 },
            { opacity: animatedValues[i] },
            { fontSize: 30, fontWeight: "bold" },
            {
              transform: [
                {
                  translateY: Animated.multiply(
                    animatedValues[i],
                    new Animated.Value(-5)
                  )
                }
              ]
            }
          ]}
        >
          {t}
        </Animated.Text>
      ))}
    </View>
  );
};

export default AnimatedText;
