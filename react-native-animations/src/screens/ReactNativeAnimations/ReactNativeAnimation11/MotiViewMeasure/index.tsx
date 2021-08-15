import faker from "faker";
import { MotiView } from "moti";
import * as Animatable from "react-native-animatable";
import React, { ComponentProps, useReducer, useState } from "react";
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
  Button,
} from "react-native";
import globalStyles from "../../../../assets/styles/globalStyles";
import colors from "../../../../assets/styles/colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const DURATION = 500;

function useLayout() {
  const [layout, setLayout] = useState({
    height: 0,
  });

  const onLayout: ComponentProps<typeof View>["onLayout"] = ({
    nativeEvent,
  }) => {
    setLayout(nativeEvent.layout);
  };

  return [layout, onLayout] as const;
}

function Measure() {
  const [{ height }, onLayout] = useLayout();

  const [open, toggle] = useReducer((s) => !s, false);

  return (
    <>
      <MotiView animate={{ height }} style={{ overflow: "hidden" }}>
        <View
          onLayout={onLayout}
          style={[
            { height: open ? windowHeight / 6 : windowHeight / 2 },
            styles.curtainsContainer,
          ]}
        />
      </MotiView>

      <TouchableOpacity
        onPress={toggle}
        activeOpacity={0.8}
        style={styles.buttonContainer}
      >
        <Text style={[globalStyles.subTitle, styles.buttonText]}>{`Toggle ${
          !open ? "Open" : "Off"
        }`}</Text>
      </TouchableOpacity>
    </>
  );
}

export default function MotiViewMeasure() {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Measure />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.orange100,
  },
  curtainsContainer: {
    backgroundColor: colors.orange600,
  },
  buttonContainer: {
    alignItems: "center",
    paddingTop: 16,
  },
  buttonText: {
    color: colors.orange600,
  },
});
