import React, { PureComponent } from "react";
import { View, Text, Animated } from "react-native";
import { StatusBar } from "expo-status-bar";
import { globalStyles, tokens } from "../../assets/styles";
import styles from "./styles";
import people from "./people.json";
import { familyAnimals, wildAnimals } from "./animals";

export default class GetDataScreen extends PureComponent {
  render() {
    return (
      <View style={globalStyles.container}>
        <Animated.ScrollView showsVerticalScrollIndicator={false}>
          <StatusBar style="auto" />
          {/* 1. */}
          <View style={styles.sectionContainer}>
            {people.map((item, index) => {
              return (
                <View key={index} style={{ paddingBottom: 8 }}>
                  <Text style={{ paddingBottom: 4 }}>
                    <Text
                      style={{
                        fontWeight: tokens.typography.tokenFontSizeBold,
                      }}
                    >
                      Name
                    </Text>
                    : {item.name}
                  </Text>
                  <Text style={{ paddingBottom: 4 }}>
                    <Text
                      style={{
                        fontWeight: tokens.typography.tokenFontSizeBold,
                      }}
                    >
                      Gender
                    </Text>
                    : {item.gender}
                  </Text>
                  <Text style={{ paddingBottom: 4 }}>
                    <Text
                      style={{
                        fontWeight: tokens.typography.tokenFontSizeBold,
                      }}
                    >
                      Country
                    </Text>
                    : {item.country}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* 2. */}
          <View style={styles.sectionContainer}>
            {fruits.map((item, index) => {
              return (
                <View key={index} style={{ paddingBottom: 8 }}>
                  <Text style={{ paddingBottom: 4 }}>
                    <Text
                      style={{
                        fontWeight: tokens.typography.tokenFontSizeBold,
                      }}
                    >
                      Name
                    </Text>
                    : {item.name}
                  </Text>
                  <Text style={{ paddingBottom: 4 }}>
                    <Text
                      style={{
                        fontWeight: tokens.typography.tokenFontSizeBold,
                      }}
                    >
                      Price
                    </Text>
                    : {item.price}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* 3. */}
          <View style={styles.sectionContainer}>
            {familyAnimals.map((item, index) => {
              return (
                <View key={index} style={{ paddingBottom: 8 }}>
                  <Text style={{ paddingBottom: 4 }}>
                    <Text
                      style={{
                        fontWeight: tokens.typography.tokenFontSizeBold,
                      }}
                    >
                      Name
                    </Text>
                    : {item.name}
                  </Text>
                  <Text style={{ paddingBottom: 4 }}>
                    <Text
                      style={{
                        fontWeight: tokens.typography.tokenFontSizeBold,
                      }}
                    >
                      Age
                    </Text>
                    : {item.age}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* 4. */}
          <View style={styles.sectionContainer}>
            {wildAnimals.map((item, index) => {
              return (
                <View key={index} style={{ paddingBottom: 8 }}>
                  <Text style={{ paddingBottom: 4 }}>
                    <Text
                      style={{
                        fontWeight: tokens.typography.tokenFontSizeBold,
                      }}
                    >
                      Name
                    </Text>
                    : {item.name}
                  </Text>
                  <Text style={{ paddingBottom: 4 }}>
                    <Text
                      style={{
                        fontWeight: tokens.typography.tokenFontSizeBold,
                      }}
                    >
                      Age
                    </Text>
                    : {item.age}
                  </Text>
                </View>
              );
            })}
          </View>
        </Animated.ScrollView>
      </View>
    );
  }
}

const fruits = [
  {
    name: "🍎",
    price: 0.25,
  },
  {
    name: "🍐",
    price: 0.15,
  },
  {
    name: "🍊",
    price: 0.1,
  },
  {
    name: "🍌",
    price: 0.12,
  },
];
