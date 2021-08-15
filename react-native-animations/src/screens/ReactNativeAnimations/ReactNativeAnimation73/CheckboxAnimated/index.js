import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, StatusBar, View } from "react-native";
import CheckBox from "./CheckBox";

const CheckboxAnimated = () => {
  const [check1, setcheck1] = useState(false);
  const [check2, setcheck2] = useState(false);
  const [check3, setcheck3] = useState(false);
  const [check4, setcheck4] = useState(false);
  const [option, setoption] = useState(1);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={{ margin: 20 }}>
        <Text style={{ fontSize: 18, marginVertical: 20, textAlign: "center" }}>
          React Native Animated CheckBox
        </Text>

        <CheckBox
          label="CheckBox position left and no ripple effect"
          onValueChange={(val) => setcheck1(val)}
          checked={check1}
          // checkMarkSize={20}
          animationType="left"
          checkMarkColor="white"
          // boxContainerStyle={{ borderRadius: 10 }}
          rippleEffect={false}
        />

        <CheckBox
          label="CheckBox position right and custom size"
          onValueChange={(val) => setcheck2(val)}
          checked={check2}
          checkPosition="right"
          size={30}
          checkMarkSize={25}
        />

        <CheckBox
          label="CheckBox round and custom style"
          checkPosition="right"
          onValueChange={(val) => setcheck3(val)}
          checked={check3}
          size={25}
          checkMarkSize={15}
          checkMarkColor={"white"}
          checkedBackgroundColor={"green"}
          // checkedBackgroundColor={'white'}
          rounded
        />

        <CheckBox
          label="Custom marker"
          onValueChange={(val) => setcheck4(val)}
          checked={check4}
          size={30}
          checkedBackgroundColor="white"
          unCheckedBackgroundColor="transparent"
          customMarker={<Text style={{ fontSize: 22 }}>☺</Text>}
        />

        <View
          style={{
            borderRadius: 10,
            borderWidth: 1,
            padding: 10,
            marginVertical: 20,
          }}
        >
          <Text style={{ fontSize: 16 }}>Grouped checkboxes</Text>

          <CheckBox
            label="option 1"
            onValueChange={(val) => setoption(1)}
            checked={option === 1}
            containerStyle={{}}
            animationType="left"
          />

          <CheckBox
            label="option 2"
            onValueChange={(val) => setoption(2)}
            animationType="left"
            checked={option === 2}
          />

          <CheckBox
            label="option 3"
            onValueChange={(val) => setoption(3)}
            animationType="left"
            checked={option === 3}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CheckboxAnimated;
