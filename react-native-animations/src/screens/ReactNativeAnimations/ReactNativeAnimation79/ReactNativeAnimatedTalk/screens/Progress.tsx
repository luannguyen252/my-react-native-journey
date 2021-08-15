import React, { useState } from "react";
import CircularProgress from "../components/CircularProgress";
import { View, Button, Text } from "react-native";

export default function App() {
  const [done, setDone] = useState(0);

  return (
    <>
      <View style={{ margin: 40, flexDirection: "row", flexWrap: "wrap" }}>
        <Text style={{ fontSize: 20, marginBottom: 30 }}>
          Click `progress` percentage and see the donut animate
        </Text>
        <View style={{ margin: 2, width: 100, display: "flex" }}>
          <Button onPress={() => setDone(20)} title="20" />
        </View>
        <View style={{ margin: 2, width: 100 }}>
          <Button onPress={() => setDone(90)} title="90" />
        </View>
        <View style={{ margin: 2, width: 100 }}>
          <Button onPress={() => setDone(15)} title="15" />
        </View>
        <View style={{ margin: 2, width: 100 }}>
          <Button onPress={() => setDone(25)} title="25" />
        </View>
        <View style={{ margin: 2, width: 100 }}>
          <Button onPress={() => setDone(78)} title="78" />
        </View>
        <View style={{ margin: 2, width: 100 }}>
          <Button onPress={() => setDone(33)} title="33" />
        </View>
        <View style={{ margin: 2, width: 100 }}>
          <Button onPress={() => setDone(0)} title="0" />
        </View>
        <View style={{ margin: 2, width: 100 }}>
          <Button onPress={() => setDone(50)} title="50" />
        </View>
        <View style={{ margin: 2, width: 100 }}>
          <Button onPress={() => setDone(100)} title="100" />
        </View>
      </View>
      <CircularProgress
        activeColor="darkviolet"
        passiveColor="darkgrey"
        baseColor="white"
        width={50}
        done={done}
        radius={100}
        duration={1200}
      >
        <Text>Wow!</Text>
      </CircularProgress>
    </>
  );
}
