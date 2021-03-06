import React, { Component } from "react";
import { Animated, Platform, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Wrapper,
  NavigationWrapper,
  HeroContentWrapper,
  Content,
  NavigationTitle,
  styles,
} from "./ScreenStyles";
import { HERO_MAX_HEIGHT, HERO_SCROLL_DISTANCE } from "./screenUtils";

class Screen extends Component {
  state = {
    scrollYPosition: new Animated.Value(
      Platform.OS === "ios" ? -HERO_MAX_HEIGHT : 0
    ),
  };

  render() {
    const { scrollYPosition } = this.state;
    const { children, heroImageUrl, heroContent, navigation, navigationTitle } =
      this.props;

    const scrollY = Animated.add(
      scrollYPosition,
      Platform.OS === "ios" ? HERO_MAX_HEIGHT : 0
    );

    const heroTranslate = scrollY.interpolate({
      inputRange: [0, HERO_SCROLL_DISTANCE],
      outputRange: [0, -HERO_SCROLL_DISTANCE],
      extrapolate: "clamp",
    });

    const tintOpacity = scrollY.interpolate({
      inputRange: [0, HERO_SCROLL_DISTANCE / 2, HERO_SCROLL_DISTANCE],
      outputRange: [0.8, 0.8, 1],
      extrapolate: "clamp",
    });

    const imageOpacity = scrollY.interpolate({
      inputRange: [0, HERO_SCROLL_DISTANCE / 2, HERO_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: "clamp",
    });

    const imageTranslate = scrollY.interpolate({
      inputRange: [0, HERO_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: "clamp",
    });

    const titleScale = scrollY.interpolate({
      inputRange: [0, HERO_SCROLL_DISTANCE / 2, HERO_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.8],
      extrapolate: "clamp",
    });

    const titleOpacity = scrollY.interpolate({
      inputRange: [0, HERO_SCROLL_DISTANCE / 2, HERO_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: "clamp",
    });

    const titleTranslate = scrollY.interpolate({
      inputRange: [0, HERO_SCROLL_DISTANCE / 2, HERO_SCROLL_DISTANCE],
      outputRange: [HERO_SCROLL_DISTANCE / 2, HERO_SCROLL_DISTANCE / 4, -5],
      extrapolate: "clamp",
    });

    const navigationTitleOpacity = scrollY.interpolate({
      inputRange: [0, HERO_SCROLL_DISTANCE, HERO_SCROLL_DISTANCE + 5],
      outputRange: [0, 0, 1],
      extrapolate: "clamp",
    });

    const navigationTitleTranslate = scrollY.interpolate({
      inputRange: [0, HERO_SCROLL_DISTANCE, HERO_SCROLL_DISTANCE + 5],
      outputRange: [-100, -50, 0],
      extrapolate: "clamp",
    });

    return (
      <Wrapper>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="rgba(0, 0, 0, 0.251)"
        />
        {navigation ? (
          <NavigationWrapper>{navigation}</NavigationWrapper>
        ) : null}
        <Animated.ScrollView
          style={styles.fill}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollYPosition } } }],
            { useNativeDriver: true }
          )}
          contentInset={{
            top: HERO_MAX_HEIGHT,
          }}
          contentOffset={{
            y: -HERO_MAX_HEIGHT,
          }}
        >
          <Content>{children}</Content>
        </Animated.ScrollView>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.absoluteFill,
            styles.hero,
            { transform: [{ translateY: heroTranslate }] },
          ]}
        >
          <Animated.View
            style={[
              styles.absoluteFill,
              {
                opacity: tintOpacity,
                zIndex: 2,
              },
            ]}
          >
            <LinearGradient
              start={{ x: 0, y: 0.75 }}
              end={{ x: 1, y: 0.25 }}
              colors={["#e371ff", "#800080"]}
              style={[styles.gradient, styles.absoluteFill]}
            />
          </Animated.View>
          <Animated.Image
            style={[
              styles.absoluteFill,
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }],
              },
            ]}
            source={heroImageUrl}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.absoluteFill,
            styles.bar,
            {
              opacity: titleOpacity,
              transform: [
                { scale: titleScale },
                { translateY: titleTranslate },
              ],
            },
          ]}
        >
          <HeroContentWrapper>{heroContent}</HeroContentWrapper>
        </Animated.View>
        <Animated.View
          style={[
            styles.navigationTitle,
            {
              opacity: navigationTitleOpacity,
              transform: [{ translateY: navigationTitleTranslate }],
            },
          ]}
        >
          <NavigationTitle numberOfLines={1}>{navigationTitle}</NavigationTitle>
        </Animated.View>
      </Wrapper>
    );
  }
}

export default Screen;
