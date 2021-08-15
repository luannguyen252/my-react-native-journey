import TouchableScaleFeedback from "./TouchableScaleFeedback";
import React from "react";
import { View, Text, LogBox } from "react-native";
import styles from "./styles";
import colors from "../../../../assets/styles/colors";

LogBox.ignoreAllLogs();

export default function TouchableScaleFeedbackModified() {
  const [color, setColor] = React.useState("None");

  return (
    <View style={styles.container}>
      <View style={{}}>
        <Text
          style={{
            fontSize: 24,
            lineHeight: 32,
            fontWeight: "700",
            color: colors.coolGray900,
          }}
        >
          {color}
        </Text>
      </View>

      <View style={{}}>
        <TouchableScaleFeedback
          activeScale={0.9}
          inactiveScale={1}
          onPress={() => setColor("Red")}
        >
          <View style={[styles.button, { marginBottom: 16 }]}>
            <Text style={styles.buttonText}>Click Me</Text>
          </View>
        </TouchableScaleFeedback>

        <TouchableScaleFeedback
          inactiveScale={1}
          activeScale={0.9}
          onPress={() => setColor("Orange")}
        >
          <View
            style={[
              styles.button,
              { marginBottom: 16, backgroundColor: colors.orange600 },
            ]}
          >
            <Text style={styles.buttonText}>Click Me</Text>
          </View>
        </TouchableScaleFeedback>

        <TouchableScaleFeedback
          inactiveScale={1}
          activeScale={0.9}
          onPress={() => setColor("Purple")}
        >
          <View
            style={[
              styles.button,
              { marginBottom: 16, backgroundColor: colors.purple600 },
            ]}
          >
            <Text style={styles.buttonText}>Click Me</Text>
          </View>
        </TouchableScaleFeedback>
      </View>
    </View>
  );
}
