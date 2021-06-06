import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import globalStyles from "../../assets/styles/globalStyles";
import colors from "../../assets/styles/colors";
import styles from "./styles";
import { Button } from "../../components";
import AnimatedExample from "./AnimatedExample";

export default function FirstScreen() {
  const navigation = useNavigation();

  return (
    <View
      style={[globalStyles.container, { backgroundColor: colors.coolGray50 }]}
    >
      <SafeAreaView>
        <StatusBar style="auto" />
        <Text style={globalStyles.title}>Trang chủ</Text>
        <View style={styles.container}>
          {/* BEGIN: Featured */}
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: 0,
              paddingLeft: 16,
              paddingRight: 0,
              paddingBottom: 16,
            }}
          >
            {featureData.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => alert(item.name)}
              >
                <View
                  style={[
                    styles.cardContainer,
                    { backgroundColor: item.color },
                  ]}
                >
                  <Text style={styles.cardTitle}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          {/* END: Featured */}

          {/* BEGIN: Call To Action */}
          <View
            style={{
              paddingTop: 0,
              paddingLeft: 16,
              paddingRight: 16,
              paddingBottom: 0,
            }}
          >
            <Button
              title="Xem chi tiết"
              onPress={() =>
                navigation.navigate("Details", {
                  paramName: "Thông tin chi tiết",
                })
              }
            />
          </View>
          {/* BEGIN: Call To Action */}

          <AnimatedExample />
        </View>
      </SafeAreaView>
    </View>
  );
}

const featureData = [
  {
    name: "HTML",
    color: "#EA580C",
  },
  {
    name: "CSS",
    color: "#2563EB",
  },
  {
    name: "JavaScript",
    color: "#EAB308",
  },
  {
    name: "React",
    color: "#4F46E5",
  },
  {
    name: "React Native",
    color: "#9333EA",
  },
];
