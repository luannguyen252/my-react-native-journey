import React from "react";
import { Button } from "react-native";

const App = () => {
  const handlePress = () => false;

  return <Button onPress={handlePress} title="Red button!" color="red" />;
};

export default App;
