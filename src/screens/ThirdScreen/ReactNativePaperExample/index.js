import React, { PureComponent } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Card, Button, Chip } from "react-native-paper";
import DialogTitleExample from "./DialogTitleExample";

export default class ReactNativePaperExample extends PureComponent {
  render() {
    return (
      <View style={{}}>
        <SafeAreaView>
          <StatusBar style="auto" />
          <Text style={{}}>React Native Paper Example</Text>

          {/* Card */}
          <Card>
            <Card.Actions>
              <Button>Cancel</Button>
              <Button>Ok</Button>
            </Card.Actions>
          </Card>

          {/* Button */}
          <Button
            icon="camera"
            mode="contained"
            onPress={() => console.log("Pressed")}
          >
            Press me
          </Button>

          {/* Chip */}
          <Chip icon="information" onPress={() => console.log("Pressed")}>
            Example Chip
          </Chip>

          {/* Dialog Title */}
          <DialogTitleExample />
        </SafeAreaView>
      </View>
    );
  }
}
