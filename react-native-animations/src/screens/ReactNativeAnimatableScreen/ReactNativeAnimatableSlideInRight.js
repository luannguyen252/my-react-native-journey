import * as Animatable from "react-native-animatable";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import globalStyles from "../../assets/styles/globalStyles";
import styles from "./styles";
import { fruits } from "../../data/";

export default function ReactNativeAnimatableSlideInRight() {
  return (
    <ScrollView style={globalStyles.container}>
      <SafeAreaView>
        <StatusBar style="auto" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.fruitContainerSlideInRight}>
            {fruits.map((fruit, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => alert(`${fruit.name} is selected.`)}
              >
                <Animatable.View
                  animation="slideInRight"
                  delay={index * 300}
                  style={[
                    styles.fruitItemSlideInRight,
                    { backgroundColor: fruit.color },
                  ]}
                >
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 16,
                      fontWeight: "700",
                    }}
                  >
                    {fruit.name}
                  </Text>
                </Animatable.View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScrollView>
  );
}
