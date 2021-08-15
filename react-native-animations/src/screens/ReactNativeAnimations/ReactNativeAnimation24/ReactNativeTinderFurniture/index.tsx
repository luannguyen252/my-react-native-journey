import * as Animatable from "react-native-animatable";
import Swiper from "./ReactNativeDeckSwiper/Swiper";
import { Transitioning, Transition } from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
} from "react-native";
import data from "./data";
import colors from "../../../../assets/styles/colors";

const { width, height } = Dimensions.get("screen");

const stackSize = 4;
const ANIMATION_DURATION = 200;

const transition = (
  <Transition.Sequence>
    <Transition.Out
      type="slide-bottom"
      durationMs={ANIMATION_DURATION}
      interpolation="easeIn"
    />
    <Transition.Together>
      <Transition.In
        type="fade"
        durationMs={ANIMATION_DURATION}
        delayMs={ANIMATION_DURATION / 2}
      />
      <Transition.In
        type="slide-bottom"
        durationMs={ANIMATION_DURATION}
        delayMs={ANIMATION_DURATION / 2}
        interpolation="easeOut"
      />
    </Transition.Together>
  </Transition.Sequence>
);

const swiperRef = React.createRef();
const transitionRef = React.createRef();

const Card = ({ card }) => {
  return (
    <Animatable.View
      animation="slideInUp"
      delay={ANIMATION_DURATION + 250}
      style={styles.card}
    >
      <Animatable.View animation="zoomIn" delay={ANIMATION_DURATION + 350}>
        <Image source={{ uri: card.image }} style={styles.cardImage} />
      </Animatable.View>
    </Animatable.View>
  );
};

const CardDetails = ({ index }) => (
  <Animatable.View
    animation="fadeInUp"
    delay={ANIMATION_DURATION + 450}
    key={data[index].id}
    style={{ alignItems: "center" }}
  >
    <Animatable.View animation="fadeInUp" delay={ANIMATION_DURATION + 650}>
      <Text style={[styles.text, styles.heading]} numberOfLines={2}>
        {data[index].name}
      </Text>
    </Animatable.View>
    <Animatable.View animation="fadeInUp" delay={ANIMATION_DURATION + 850}>
      <Text style={[styles.text, styles.price]}>{data[index].price}</Text>
    </Animatable.View>
  </Animatable.View>
);

export default function ReactNativeTinderFurniture() {
  const [index, setIndex] = React.useState(0);
  const onSwiped = () => {
    transitionRef.current.animateNextTransition();
    setIndex((index + 1) % data.length);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.swiperContainer}>
        <Swiper
          ref={swiperRef}
          cards={data}
          cardIndex={index}
          renderCard={(card) => <Card card={card} />}
          infinite
          backgroundColor={"transparent"}
          onSwiped={onSwiped}
          onTapCard={() => swiperRef.current.swipeLeft()}
          cardVerticalMargin={50}
          stackSize={stackSize}
          stackScale={10}
          stackSeparation={14}
          animateOverlayLabelsOpacity
          animateCardOpacity
          disableTopSwipe
          disableBottomSwipe
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  backgroundColor: colors.red600,
                  borderColor: colors.red700,
                  color: colors.white,
                  borderWidth: 1,
                  fontSize: 24,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                  marginTop: 20,
                  marginLeft: -20,
                },
              },
            },
            right: {
              title: "LIKE",
              style: {
                label: {
                  backgroundColor: colors.green600,
                  borderColor: colors.green700,
                  color: colors.white,
                  borderWidth: 1,
                  fontSize: 24,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  marginTop: 20,
                  marginLeft: 20,
                },
              },
            },
          }}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Transitioning.View
          ref={transitionRef}
          transition={transition}
          style={styles.bottomContainerMeta}
        >
          <CardDetails index={index} />
        </Transitioning.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.coolGray100,
  },
  swiperContainer: {
    flex: 0.5,
  },
  bottomContainer: {
    flex: 0.5,
    justifyContent: "space-evenly",
  },
  bottomContainerMeta: {
    alignContent: "flex-end",
    alignItems: "center",
  },
  cardImage: {
    width: 160,
    flex: 1,
    resizeMode: "contain",
  },
  card: {
    flex: 0.45,
    borderRadius: 8,
    shadowRadius: 24,
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 0 },
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent",
  },
  done: {
    textAlign: "center",
    fontSize: 30,
    color: colors.white,
    backgroundColor: "transparent",
  },
  heading: {
    fontSize: 24,
    lineHeight: 32,
    marginBottom: 16,
    color: colors.coolGray900,
  },
  price: {
    color: colors.violet600,
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "900",
  },
});
