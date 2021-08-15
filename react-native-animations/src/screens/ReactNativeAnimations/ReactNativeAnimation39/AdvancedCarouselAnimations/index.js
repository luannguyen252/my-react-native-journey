import faker from "faker";
import { MotiView } from "moti";
import * as Animatable from "react-native-animatable";
import * as React from "react";
import {
  FlatList,
  Image,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
  StyleSheet,
  StatusBar,
  Animated,
} from "react-native";
import {
  FlingGestureHandler,
  Directions,
  State,
  FlingGestureHandlerStateChangeEvent,
} from "react-native-gesture-handler";
import { Easing, Transition, Transitioning } from "react-native-reanimated";
import data, { detailsList, iconsByType } from "./data";
import { SimpleLineIcons } from "@expo/vector-icons";
import globalStyles from "../../../../assets/styles/globalStyles";
import colors from "../../../../assets/styles/colors";
import posed, { Transition as PoseTransition } from "react-native-pose";

const { width, height } = Dimensions.get("screen");
const DURATION = 500;
const TITLE_SIZE = 40;
const SPACING = 80;
const IMAGE_SIZE = width * 0.8;

const myColors = {
  lightBg: colors.coolGray100,
  darkBg: colors.coolGray900,
  lightText: colors.coolGray400,
  darkText: colors.coolGray900,
};

const Item = ({ children, style }) => {
  return (
    <View
      style={[
        {
          justifyContent: "center",
          overflow: "hidden",
          backgroundColor: "transparent",
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const Icon = ({ type }) => {
  return (
    <SimpleLineIcons
      name={type}
      size={24}
      color={colors.coolGray400}
      style={{ height: 24 }}
    />
  );
};

const Description = ({ index, text, color }) => {
  return (
    <Item>
      <Animatable.Text
        animation="fadeInUp"
        delay={DURATION + 150}
        key={`description-${index}`}
        style={{
          color,
          fontSize: 16,
          lineHeight: 22,
          fontWeight: "400",
          opacity: 0.6,
        }}
      >
        {text}
      </Animatable.Text>
    </Item>
  );
};

const Title = ({ index, text, color }) => {
  return (
    <Item style={{ justifyContent: "flex-end" }}>
      <Animatable.Text
        animation="fadeInUp"
        delay={DURATION}
        key={`title-${index}`}
        style={{
          fontSize: TITLE_SIZE,
          lineHeight: 48,
          fontWeight: "900",
          color,
        }}
      >
        {text}
      </Animatable.Text>
    </Item>
  );
};

const Details = ({ index, color }) => {
  return (
    <View style={{ marginVertical: SPACING }}>
      {detailsList.map((key) => {
        return (
          <View
            key={key}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <Animatable.View animation="fadeInUp" delay={DURATION + 250}>
              <Icon type={iconsByType[key]} />
            </Animatable.View>
            <Item style={{ flex: 1, height: 24, justifyContent: "center" }}>
              <Animatable.Text
                animation="fadeInUp"
                delay={DURATION + 350}
                key={`${key}-${index}`}
                style={{
                  fontSize: 16,
                  lineHeight: 22,
                  fontWeight: "700",
                  color,
                  paddingLeft: 8,
                }}
              >
                {data[index][key]}
              </Animatable.Text>
            </Item>
          </View>
        );
      })}
    </View>
  );
};

const transition = (
  <Transition.Together>
    <Transition.Out
      type="slide-bottom"
      durationMs={DURATION}
      interpolation="easeIn"
    />
    <Transition.Change />
    <Transition.In
      type="slide-bottom"
      durationMs={DURATION}
      interpolation="easeOut"
    />
  </Transition.Together>
);

const config = {
  transition: {
    type: "tween",
    duration: DURATION,
    easing: Easing.elastic(0.9),
  },
};

const PosedView = posed.View({
  enter: { opacity: 1, rotate: "0deg", ...config },
  exit: { opacity: 0, rotate: "180deg", ...config },
});

export default function ReactNativeAdvancedCarouselAnimations() {
  const [index, setIndex] = React.useState(0);
  const color = index % 2 === 1 ? myColors.lightText : myColors.darkText;
  const headingColor = index % 2 === 1 ? myColors.lightText : myColors.darkBg;
  const activeIndex = React.useRef(new Animated.Value(0)).current;
  const animation = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: activeIndex,
      duration: DURATION * 0.7,
      useNativeDriver: true,
    }).start();

    StatusBar.setBarStyle(
      index % 2 === 0 ? "dark-content" : "light-content",
      true
    );
  });

  const setActiveIndex = React.useCallback((newIndex) => {
    activeIndex.setValue(newIndex);
    ref.current.animateNextTransition();
    setIndex(newIndex);
  });

  const translateY = animation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [height, 0, -height],
  });

  const ref = React.useRef();

  return (
    <FlingGestureHandler
      key="up"
      direction={Directions.UP}
      onHandlerStateChange={(event) => {
        if (event.nativeEvent.state === State.END) {
          if (index === data.length - 1) {
            return;
          }
          setActiveIndex(index + 1);
        }
      }}
    >
      <FlingGestureHandler
        key="down"
        direction={Directions.DOWN}
        onHandlerStateChange={(event) => {
          if (event.nativeEvent.state === State.END) {
            if (index === 0) {
              return;
            }
            setActiveIndex(index - 1);
          }
        }}
      >
        <SafeAreaView style={styles.container}>
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              {
                height: height * data.length,
                transform: [
                  {
                    translateY,
                  },
                ],
              },
            ]}
          >
            {data.map((_, i) => {
              return (
                <View
                  key={i}
                  style={{
                    height,
                    backgroundColor:
                      i % 2 === 0 ? myColors.lightBg : myColors.darkBg,
                  }}
                ></View>
              );
            })}
          </Animated.View>
          <PoseTransition>
            {index % 2 === 0 ? (
              <PosedView
                key={`image0`}
                style={[
                  styles.imageContainer,
                  {
                    borderColor:
                      index % 2 === 0 ? myColors.darkBg : myColors.lightBg,
                  },
                ]}
              >
                <Animatable.View animation="fadeInRight" delay={DURATION + 450}>
                  <Image source={data[index].image} style={styles.image} />
                </Animatable.View>
              </PosedView>
            ) : (
              <PosedView
                key={`image1`}
                style={[
                  styles.imageContainer,
                  {
                    borderColor:
                      index % 2 === 0 ? myColors.darkBg : myColors.lightBg,
                  },
                ]}
              >
                <Animatable.View animation="fadeInRight" delay={DURATION + 450}>
                  <Image source={data[index].image} style={styles.image} />
                </Animatable.View>
              </PosedView>
            )}
          </PoseTransition>
          <Transitioning.View
            ref={ref}
            transition={transition}
            style={{ padding: 16, flex: 1, justifyContent: "space-evenly" }}
          >
            <Title
              color={headingColor}
              index={index}
              text={data[index].title}
            />
            <Details color={color} index={index} />
            <Description
              color={headingColor}
              index={index}
              text={data[index].description}
            />
          </Transitioning.View>
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    position: "absolute",
    top: height / 4,
    right: -width / 6,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
});
