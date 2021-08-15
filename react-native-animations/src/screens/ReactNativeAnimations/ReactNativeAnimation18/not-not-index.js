import faker from "faker";
import { MotiView } from "moti";
import * as Animatable from "react-native-animatable";
import * as React from "react";
import {
  FlatList,
  Image,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
  StyleSheet,
  StatusBar,
  Animated,
} from "react-native";
import globalStyles from "../../../assets/styles/globalStyles";
import colors from "../../../assets/styles/colors";
// import styles from "./styles";

const { width, height } = Dimensions.get("screen");
const DURATION = 500;

const Progress = ({ step, steps, height }) => {
  const animatedValue = React.useRef(new Animated.Value(-1000)).current;
  const reactive = React.useRef(new Animated.Value(-1000)).current;
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  React.useEffect(() => {
    reactive.setValue(-width + (width * step) / steps);
  }, [step, width]);

  return (
    <>
      <Text style={{ fontSize: 12, fontWeight: "700", marginBottom: 8 }}>
        {step}/{steps}
      </Text>
      <View
        style={{
          height,
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          borderRadius: height,
          overflow: "hidden",
        }}
      >
        <Animated.View
          onLayout={(event) => {
            const newWidth = event.nativeEvent.layout.width;
            setWidth(newWidth);
          }}
          style={{
            height,
            width: "100%",
            borderRadius: height,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            position: "absolute",
            left: 0,
            top: 0,
            transform: [
              {
                translateX: animatedValue,
              },
            ],
          }}
        />
      </View>
    </>
  );
};

export default function ReactNativeAnimation18() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index + 1) % (10 + 1));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [index]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Progress step={index} steps={10} height={20} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    padding: 20,
  },
});
