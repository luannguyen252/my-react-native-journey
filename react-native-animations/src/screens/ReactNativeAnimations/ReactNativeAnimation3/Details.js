import { ifIphoneX } from "../../../helpers/iPhoneXHelper";
import * as Animatable from "react-native-animatable";
import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import globalStyles from "../../../assets/styles/globalStyles";
import colors from "../../../assets/styles/colors";

const DURATION = 300;
const { width, height } = Dimensions.get("screen");
const kilograms = [
  {
    amount: "1",
    isSelected: true,
  },
  {
    amount: "2",
    isSelected: false,
  },
  {
    amount: "3",
    isSelected: false,
  },
  {
    amount: "4",
    isSelected: false,
  },
];

export default function ReactNativeAnimation3Details({ route }) {
  const { item } = route.params;

  const [animation, setAnimation] = React.useState(new Animated.Value(0));

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: width,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  };

  React.useEffect(() => startAnimation());

  const animatedStyles = {
    width: animation,
  };

  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: colors.white,
        ...ifIphoneX(
          {
            paddingTop: 50,
          },
          {
            paddingTop: 16,
          }
        ),
      }}
    >
      <Animated.View
        style={[
          {
            height: height,
            backgroundColor: "red",
            position: "absolute",
            zIndex: -1,
            backgroundColor: item.bgColor,
          },
          animatedStyles,
        ]}
      ></Animated.View>
      <Animatable.View animation="fadeInRight" delay={DURATION + 1500}>
        <Image source={item.image} style={styles.image} />
      </Animatable.View>
      <View style={styles.meta}>
        <Animatable.View animation="fadeInUp" delay={DURATION + 400}>
          <Text
            style={[
              globalStyles.title,
              {
                color: item.txtColor,
                paddingTop: StatusBar.currentHeight + 104,
                paddingLeft: 16,
              },
            ]}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {item.name}
          </Text>
        </Animatable.View>
        <Animatable.View animation="fadeInUp" delay={DURATION + 800}>
          <Text
            style={[
              globalStyles.bodyText,
              {
                color: item.txtColor,
                opacity: 0.8,
                paddingTop: 8,
                paddingLeft: 16,
              },
            ]}
          >
            {item.description}
          </Text>
        </Animatable.View>
      </View>
      <Animatable.View
        animation="fadeInUp"
        delay={DURATION + 2000}
        style={{
          backgroundColor: colors.white,
          width: width,
          height: height / 2,
          position: "absolute",
          bottom: 0,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          shadowColor: item.txtColor,
          shadowOpacity: 0.25,
          shadowOffset: {
            width: 0,
            height: -8,
          },
          shadowRadius: 16,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Animatable.View
            animation="fadeInUp"
            delay={DURATION + 2800}
            style={{ paddingTop: 40 }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Animatable.Text
                animation="fadeInUp"
                delay={DURATION + 3000}
                style={[
                  globalStyles.title,
                  {
                    color: item.txtColor,
                    paddingLeft: 0,
                    paddingRight: 0,
                    fontSize: 40,
                    lineHeight: 48,
                  },
                ]}
              >
                {item.price}$
              </Animatable.Text>
              <Animatable.Text
                animation="fadeInUp"
                delay={DURATION + 3500}
                style={[
                  globalStyles.bodyText,
                  {
                    color: item.txtColor,
                    paddingLeft: 4,
                  },
                ]}
              >
                / KG
              </Animatable.Text>
            </View>
          </Animatable.View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              paddingLeft: 16,
              paddingRight: 16,
            }}
          >
            {kilograms.map((kg, index) => (
              <Animatable.View
                animation="bounceIn"
                delay={DURATION * index + 4000}
                key={index}
                style={[
                  {
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: kg.isSelected
                      ? item.txtColor
                      : item.bgColor,
                    marginLeft: 10,
                    marginRight: 10,
                  },
                ]}
              >
                <Text
                  style={[
                    globalStyles.bodyText,
                    {
                      fontWeight: "500",
                      color: kg.isSelected ? item.bgColor : item.txtColor,
                    },
                  ]}
                >
                  {kg.amount} KG
                </Text>
              </Animatable.View>
            ))}
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => alert(`1 KG ${item.name} is added to your cart.`)}
          >
            <Animatable.View
              animation="bounceIn"
              delay={DURATION + 5000}
              style={{
                width: width - 32,
                height: 56,
                backgroundColor: item.txtColor,
                borderRadius: 12,
                justifyContent: "center",
                alignItems: "center",
                ...ifIphoneX(
                  {
                    marginBottom: 50,
                  },
                  {
                    marginBottom: 16,
                  }
                ),
              }}
            >
              <Text
                style={[
                  globalStyles.bodyText,
                  { color: colors.white, fontWeight: "700" },
                ]}
              >
                Add 1 KG {item.name} to cart
              </Text>
            </Animatable.View>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </Animated.View>
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
