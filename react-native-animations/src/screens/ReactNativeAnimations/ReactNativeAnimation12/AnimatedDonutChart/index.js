import * as React from "react";
import { StatusBar, View, StyleSheet } from "react-native";
import colors from "../../../../assets/styles/colors";
import Donut from "./Donut";

const data = [
  {
    percentage: 8,
    color: colors.orange500,
    max: 10,
  },
  {
    percentage: 14,
    color: colors.cyan500,
    max: 20,
  },
  {
    percentage: 92,
    color: colors.red500,
    max: 100,
  },
  {
    percentage: 240,
    color: colors.violet500,
    max: 500,
  },
];

export default function AnimatedDonutChart() {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.donutContainer}>
        {data.map((p, i) => {
          return (
            <Donut
              key={i}
              percentage={p.percentage}
              color={p.color}
              delay={500 + 100 * i}
              max={p.max}
            />
          );
        })}
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
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  donutContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    alignItems: "center",
    width: "100%",
  },
});
