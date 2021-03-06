import React from "react";
import { Text, StyleSheet, View } from "react-native";
import ContactList from "./ContactList";

const App = () => (
  <View style={styles.main}>
    <Text style={styles.toolbar}>Contacts</Text>
    <ContactList />
  </View>
);

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  toolbar: {
    backgroundColor: "#2c3e50",
    color: "#fff",
    fontSize: 22,
    padding: 20,
    textAlign: "center",
  },
});

export default App;
