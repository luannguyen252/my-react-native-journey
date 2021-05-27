import React, { PureComponent } from "react";
import { View, Text, Button, SafeAreaView, Animated } from "react-native";
import { StatusBar } from "expo-status-bar";
import globalStyles from "../../assets/styles/globalStyles";

export default class FirstScreen extends PureComponent {
  render() {
    return (
      <View style={globalStyles.container}>
        <SafeAreaView>
          <StatusBar style="auto" />
          <View>
            <Text style={globalStyles.title}>First Screen</Text>
          </View>
          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 96 }}
          >
            <Text
              style={[
                globalStyles.bodyText,
                { paddingLeft: 16, paddingRight: 16 },
              ]}
            >
              Examples in First Screen will appear here.
            </Text>
            <Button
              title="Go to Details"
              onPress={() => this.props.navigation.navigate("Details")}
            />
            <Button
              title="Go to Animation"
              onPress={() => this.props.navigation.navigate("Animation")}
            />
            <Button
              title="Go to Blur"
              onPress={() => this.props.navigation.navigate("Blur")}
            />
            <Button
              title="Go to Camera"
              onPress={() => this.props.navigation.navigate("Camera")}
            />
            <Button
              title="Go to Get Data"
              onPress={() => this.props.navigation.navigate("Get Data")}
            />
            <Button
              title="Go to Bottom Sheet"
              onPress={() => this.props.navigation.navigate("Bottom Sheet")}
            />
            <Button
              title="Go to Parallax"
              onPress={() => this.props.navigation.navigate("Parallax")}
            />
            <Button
              title="Go to Modal"
              onPress={() => this.props.navigation.navigate("Modal")}
            />
            <Button
              title="Go to Keyboard"
              onPress={() => this.props.navigation.navigate("Keyboard")}
            />
            <Button
              title="Go to Overlay"
              onPress={() => this.props.navigation.navigate("Overlay")}
            />
            <Button
              title="Go to Activity Indicator"
              onPress={() =>
                this.props.navigation.navigate("Activity Indicator")
              }
            />
            <Button
              title="Go to Flat List"
              onPress={() => this.props.navigation.navigate("Flat List")}
            />
            <Button
              title="Go to Section List"
              onPress={() => this.props.navigation.navigate("Section List")}
            />
            <Button
              title="Go to Switch"
              onPress={() => this.props.navigation.navigate("Switch")}
            />
            <Button
              title="Go to Virtualized List"
              onPress={() => this.props.navigation.navigate("Virtualized List")}
            />
            <Button
              title="Go to Text Input"
              onPress={() => this.props.navigation.navigate("Text Input")}
            />
            <Button
              title="Go to Vibration"
              onPress={() => this.props.navigation.navigate("Vibration")}
            />
            <Button
              title="Go to Transforms"
              onPress={() => this.props.navigation.navigate("Transforms")}
            />
            <Button
              title="Go to Share"
              onPress={() => this.props.navigation.navigate("Share")}
            />
            <Button
              title="Go to Platform Color"
              onPress={() => this.props.navigation.navigate("Platform Color")}
            />
            <Button
              title="Go to Platform"
              onPress={() => this.props.navigation.navigate("Platform")}
            />
            <Button
              title="Go to Pixel Ratio"
              onPress={() => this.props.navigation.navigate("Pixel Ratio")}
            />
            <Button
              title="Go to Layout Animation"
              onPress={() => this.props.navigation.navigate("Layout Animation")}
            />
          </Animated.ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
