import * as Animatable from "react-native-animatable";
import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import globalStyles from "../../../assets/styles/globalStyles";
import colors from "../../../assets/styles/colors";

const DURATION = 300;
const { width, height } = Dimensions.get("screen");

export default function ReactNativeAnimation1Details({ route }) {
  const { item } = route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <Animatable.View animation="fadeInRight" delay={DURATION * 1.5}>
        <Image source={item.image} style={styles.image} />
      </Animatable.View>
      <View style={styles.meta}>
        <Animatable.View animation="fadeInUp" delay={DURATION * 1.25}>
          <Text
            style={[globalStyles.title, { color: item.txtColor }]}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {item.name}
          </Text>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={DURATION * 1.35}>
          <Text
            style={[
              globalStyles.bodyText,
              { color: item.txtColor, opacity: 0.8, paddingLeft: 16 },
            ]}
          >
            {item.description}
          </Text>
        </Animatable.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: width * 2.1,
    height: width,
    resizeMode: "contain",
  },
  meta: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width * 0.6,
  },
});
