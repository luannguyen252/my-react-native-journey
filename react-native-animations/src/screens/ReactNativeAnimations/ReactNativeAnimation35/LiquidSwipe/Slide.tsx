import * as Animatable from "react-native-animatable";
import Color from "color";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import Svg, { RadialGradient, Defs, Rect, Stop } from "react-native-svg";

const { width, height } = Dimensions.get("screen");
const SIZE = width - 72;
const ANIMATION_DELAY = 500;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    padding: 72,
    paddingTop: 96,
    alignItems: "center",
  },
  image: {
    width: SIZE,
    height: SIZE,
  },
  title: {
    fontSize: 40,
    lineHeight: 48,
    fontWeight: "900",
    color: "white",
    textAlign: "center",
    marginTop: 16,
    paddingLeft: 32,
    paddingRight: 32,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "400",
    color: "white",
    textAlign: "center",
    opacity: 0.8,
  },
});

interface SlideProps {
  slide: {
    color: string;
    btnColor: string;
    title: string;
    description: string;
    picture: ReturnType<typeof require>;
    price: string;
  };
}

const Slide = ({
  slide: { picture, color, btnColor, title, description, price },
}: SlideProps) => {
  const lighterColor = Color(color).lighten(0.8).toString();

  return (
    <>
      <Svg style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="gradient" cx="50%" cy="35%">
            <Stop offset="0%" stopColor={lighterColor} />
            <Stop offset="100%" stopColor={color} />
          </RadialGradient>
        </Defs>
        <Rect x={0} y={0} width={width} height={height} fill="url(#gradient)" />
      </Svg>
      <Animatable.View
        animation="fadeInUp"
        delay={ANIMATION_DELAY}
        style={[styles.container, { justifyContent: "space-evenly" }]}
      >
        <View style={{}}>
          <Animatable.View animation="fadeInUp" delay={ANIMATION_DELAY + 150}>
            <Image source={picture} style={styles.image} />
          </Animatable.View>
          <Animatable.View animation="fadeInUp" delay={ANIMATION_DELAY + 300}>
            <Animatable.Text
              animation="fadeInUp"
              delay={ANIMATION_DELAY + 450}
              style={styles.title}
            >
              {title}
            </Animatable.Text>
            <Animatable.Text
              animation="fadeInUp"
              delay={ANIMATION_DELAY + 600}
              style={styles.description}
            >
              {description}
            </Animatable.Text>
          </Animatable.View>
        </View>

        <Animatable.View
          animation="fadeInUp"
          delay={ANIMATION_DELAY + 900}
          style={{ marginTop: 40 }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => alert(`Try ${title}`)}
            style={{
              backgroundColor: btnColor,
              width: width - 112,
              height: 56,
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: 24,
              paddingRight: 24,
              borderRadius: 28,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                lineHeight: 22,
                fontWeight: "700",
                color: "white",
              }}
            >
              {`Try It Now (Only ${price})`}
            </Text>
          </TouchableOpacity>
          <Animatable.Text
            animation="fadeInUp"
            delay={ANIMATION_DELAY + 1050}
            style={{
              fontSize: 12,
              lineHeight: 18,
              fontWeight: "400",
              fontStyle: "italic",
              color: "white",
              textAlign: "center",
              paddingTop: 4,
            }}
          >
            (*) Price including the standard rate of VAT (10%)
          </Animatable.Text>
        </Animatable.View>
      </Animatable.View>
    </>
  );
};

export default Slide;
