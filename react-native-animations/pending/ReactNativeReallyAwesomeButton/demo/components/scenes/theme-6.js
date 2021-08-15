import React from "react";
import AwesomeButton from "react-native-really-awesome-button/src/themes/red";
// import AwesomeButton from "../../src/themes/red";
import Example from "../example";

function example() {
  return <Example ButtonComponent={AwesomeButton} />;
}

example.navigationOptions = ({ navigation }) => {
  return {
    title: "Red Theme",
    headerStyle: {
      backgroundColor: "#E82F3A"
    },
    headerTintColor: "#FFF",
    headerTitleStyle: {
      fontWeight: "bold"
    },
    headerLeft: (
      <AwesomeButton
        size="small"
        type="primaryFlat"
        backgroundActive="rgba(0,0,0,0)"
        activeOpacity={0.75}
        textColor="#FFF"
        width={80}
        onPress={() => navigation.goBack()}
      >
        Back
      </AwesomeButton>
    )
  };
};

export default example;
