import ParallaxScroll from "@monterosa/react-native-parallax-scroll";

export default function ReactNativeParallaxScroll() {
  return (
    <ParallaxScroll
      renderHeader={({ animatedValue }) => (
        <Header animatedValue={animatedValue} />
      )}
      headerHeight={50}
      isHeaderFixed={false}
      parallaxHeight={250}
      renderParallaxBackground={({ animatedValue }) => (
        <Background animatedValue={animatedValue} />
      )}
      renderParallaxForeground={({ animatedValue }) => (
        <Foreground animatedValue={animatedValue} />
      )}
      parallaxBackgroundScrollSpeed={5}
      parallaxForegroundScrollSpeed={2.5}
    >
      <Welcome />
    </ParallaxScroll>
  );
}
