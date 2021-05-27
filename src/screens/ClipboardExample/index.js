import * as React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Clipboard from "expo-clipboard";

export default function ClipboardExample() {
  const [copiedText, setCopiedText] = React.useState("");

  const copyToClipboard = () => {
    Clipboard.setString("hello world");
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
  };

  return (
    <View style={styles.container}>
      <Button
        title="Click here to copy to Clipboard"
        onPress={copyToClipboard}
      />
      <Button title="View copied text" onPress={fetchCopiedText} />
      <Text style={styles.copiedText}>{copiedText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  copiedText: {
    marginTop: 10,
    color: "red",
  },
});
