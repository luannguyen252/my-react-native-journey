import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import * as expoBattery from "expo-battery";
import Batteryy from "./components/Battery";

export default function App() {
  const [batteryPercentage, setBatteryPercentage] = useState(0);
  const [batteryState, setBatteryState] = useState(0);

  async function getLevel() {
    const batteryLevel = await expoBattery.getBatteryLevelAsync();
    setBatteryPercentage(Math.round(batteryLevel * 100));
  }

  useEffect(() => {
    async function subscribe() {
      const batteryLevel = await expoBattery.getBatteryLevelAsync();
      setBatteryPercentage(Math.round(batteryLevel * 100));

      const batterySta = await expoBattery.getBatteryStateAsync();
      setBatteryState(batterySta);

      expoBattery.addBatteryStateListener((res) => {
        setBatteryState(res.batteryState);
      });
    }
    subscribe();
    setInterval(() => getLevel(), 10000);
  }, []);

  return (
    <View style={styles.container}>
      <Batteryy nb={batteryPercentage} batteryState={batteryState}></Batteryy>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    resizeMode: "cover",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
