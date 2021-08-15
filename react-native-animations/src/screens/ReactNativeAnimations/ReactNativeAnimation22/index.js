import faker from "faker";
import { MotiView } from "moti";
import * as Animatable from "react-native-animatable";
import * as React from "react";
import {
  findNodeHandle,
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
import globalStyles from "../../../assets/styles/globalStyles";
import colors from "../../../assets/styles/colors";
import styles from "./styles";

const { width, height } = Dimensions.get("screen");
const DURATION = 500;
const images = {
  First: require("../../../assets/backgrounds/10.jpg"),
  Second: require("../../../assets/backgrounds/11.jpg"),
  Third: require("../../../assets/backgrounds/12.jpg"),
  Fourth: require("../../../assets/backgrounds/13.jpg"),
  Fifth: require("../../../assets/backgrounds/14.jpg"),
};
const data = Object.keys(images).map((i) => ({
  key: i,
  title: i,
  image: images[i],
  ref: React.createRef(),
}));

const Tab = React.forwardRef(({ item, onItemPress }, ref) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onItemPress}>
      <View style={{}} ref={ref}>
        <Text
          style={{
            color: colors.white,
            fontSize: 84 / data.length,
            fontWeight: "700",
            textTransform: "uppercase",
          }}
        >
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

const Indicator = ({ measures, scrollX }) => {
  const inputRange = data.map((_, i) => i * width);
  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.width),
  });
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.x),
  });

  return (
    <Animated.View
      style={{
        position: "absolute",
        height: 4,
        borderRadius: 2,
        // width: measures[0].width,
        // left: measures[0].x,
        width: indicatorWidth,
        left: 0,
        backgroundColor: colors.white,
        bottom: -10,
        transform: [
          {
            translateX,
          },
        ],
      }}
    />
  );
};

const Tabs = ({ data, scrollX, onItemPress }) => {
  const [measures, setMeasures] = React.useState([]);
  const containerRef = React.useRef();

  React.useEffect(() => {
    let m = [];

    data.forEach((item) => {
      item.ref.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          console.log(x, y, width, height);
          m.push({
            x,
            y,
            width,
            height,
          });

          if (m.length === data.length) {
            setMeasures(m);
          }
        }
      );
    });
  });

  // console.log(measures);

  return (
    <View
      style={{
        position: "absolute",
        top: 100,
      }}
    >
      <View
        ref={containerRef}
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          width,
          // backgroundColor: "red",
        }}
      >
        {data.map((item, index) => {
          return (
            <Tab
              key={item.key}
              item={item}
              ref={item.ref}
              onItemPress={() => onItemPress(index)}
            />
          );
        })}
      </View>
      {measures.length > 0 && (
        <Indicator measures={measures} scrollX={scrollX} />
      )}
    </View>
  );
};

export default function ReactNativeAnimation22() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const ref = React.useRef();
  const onItemPress = React.useCallback((itemIndex) => {
    ref?.current?.scrollToOffset({
      offset: itemIndex * width,
    });
  });

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Animated.FlatList
        ref={ref}
        data={data}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        bounces={false}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                width,
                height,
              }}
            >
              <Image
                source={item.image}
                style={{ flex: 1, resizeMode: "cover" }}
              />
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  {
                    backgroundColor: "rgba(0, 0, 0, 0.15)",
                  },
                ]}
              />
            </View>
          );
        }}
      />
      <Tabs scrollX={scrollX} data={data} onItemPress={onItemPress} />
    </View>
  );
}
