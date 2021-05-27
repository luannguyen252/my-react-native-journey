import React, { useState } from "react";
import { Button, Settings, StyleSheet, Text, View } from "react-native";

const SettingsExample = () => {
  const [data, setData] = useState(Settings.get("data"));

  const storeData = (data) => {
    Settings.set(data);
    setData(Settings.get("data"));
  };

  return (
    <View style={styles.container}>
      <Text>Stored value:</Text>
      <Text style={styles.value}>{data}</Text>
      <Button
        onPress={() => storeData({ data: "React" })}
        title="Store 'React'"
      />
      <Button
        onPress={() => storeData({ data: "Native" })}
        title="Store 'Native'"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  value: {
    fontSize: 24,
    marginVertical: 12,
  },
});

export default SettingsExample;
