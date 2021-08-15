import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import * as Animatable from "react-native-animatable";
import RadioButton from "./lib/RadioButton";
import colors from "../../../../assets/styles/colors";

const { width, height } = Dimensions.get("screen");
const ITEM_SIZE = 72;
const ANIMATION_DELAY = 500;

export default function ReactNativeAnimatedRadioButton() {
  const [value1, setValue1] = React.useState(false);
  const [value2, setValue2] = React.useState(false);
  const [value3, setValue3] = React.useState(false);
  const [value4, setValue4] = React.useState(false);
  const [value5, setValue5] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.cellContainer}>
        <Animatable.View animation="bounceIn" delay={ANIMATION_DELAY}>
          <RadioButton
            style={{
              width: ITEM_SIZE,
              height: ITEM_SIZE,
              borderRadius: ITEM_SIZE,
              borderColor: colors.violet600,
            }}
            innerBackgroundColor={colors.violet600}
            innerContainerStyle={{ height: 48, width: 48, borderRadius: 24 }}
            onPress={() => setValue1(!value1)}
          />
        </Animatable.View>
        <Animatable.View animation="fadeInRight" delay={ANIMATION_DELAY + 50}>
          <Text style={styles.cellLabel}>{value1 ? `Active` : "Inactive"}</Text>
        </Animatable.View>
      </View>
      <View style={styles.cellContainer}>
        <Animatable.View animation="bounceIn" delay={ANIMATION_DELAY + 150}>
          <RadioButton
            style={{
              width: ITEM_SIZE,
              height: ITEM_SIZE,
              borderRadius: ITEM_SIZE,
              borderColor: colors.red600,
            }}
            innerBackgroundColor={colors.red600}
            innerContainerStyle={{ height: 48, width: 48, borderRadius: 24 }}
            onPress={() => setValue2(!value2)}
          />
        </Animatable.View>
        <Animatable.View animation="fadeInRight" delay={ANIMATION_DELAY + 200}>
          <Text style={styles.cellLabel}>{value2 ? `Active` : "Inactive"}</Text>
        </Animatable.View>
      </View>
      <View style={styles.cellContainer}>
        <Animatable.View animation="bounceIn" delay={ANIMATION_DELAY + 250}>
          <RadioButton
            style={{
              width: ITEM_SIZE,
              height: ITEM_SIZE,
              borderRadius: ITEM_SIZE,
              borderColor: colors.orange600,
            }}
            innerBackgroundColor={colors.orange600}
            innerContainerStyle={{ height: 48, width: 48, borderRadius: 24 }}
            onPress={() => setValue3(!value3)}
          />
        </Animatable.View>
        <Animatable.View animation="fadeInRight" delay={ANIMATION_DELAY + 300}>
          <Text style={styles.cellLabel}>{value3 ? `Active` : "Inactive"}</Text>
        </Animatable.View>
      </View>
      <View style={styles.cellContainer}>
        <Animatable.View animation="bounceIn" delay={ANIMATION_DELAY + 350}>
          <RadioButton
            style={{
              width: ITEM_SIZE,
              height: ITEM_SIZE,
              borderRadius: ITEM_SIZE,
              borderColor: colors.green600,
            }}
            innerBackgroundColor={colors.green600}
            innerContainerStyle={{ height: 48, width: 48, borderRadius: 24 }}
            onPress={() => setValue4(!value4)}
          />
        </Animatable.View>
        <Animatable.View animation="fadeInRight" delay={ANIMATION_DELAY + 400}>
          <Text style={styles.cellLabel}>{value4 ? `Active` : "Inactive"}</Text>
        </Animatable.View>
      </View>
      <View style={styles.cellContainer}>
        <Animatable.View animation="bounceIn" delay={ANIMATION_DELAY + 450}>
          <RadioButton
            style={{
              width: ITEM_SIZE,
              height: ITEM_SIZE,
              borderRadius: ITEM_SIZE,
              borderColor: colors.pink600,
            }}
            innerBackgroundColor={colors.pink600}
            innerContainerStyle={{ height: 48, width: 48, borderRadius: 24 }}
            onPress={() => setValue5(!value5)}
          />
        </Animatable.View>
        <Animatable.View animation="fadeInRight" delay={ANIMATION_DELAY + 500}>
          <Text style={styles.cellLabel}>{value5 ? `Active` : "Inactive"}</Text>
        </Animatable.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  cellContainer: {
    width: width,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 24,
  },
  cellLabel: {
    fontSize: 48,
    lineHeight: 56,
    fontWeight: "900",
    marginLeft: 24,
    color: colors.coolGray900,
  },
});
