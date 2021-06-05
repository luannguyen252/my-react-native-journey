import React from "react";
import { StyleSheet, View, Text, Dimensions, Alert } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  TouchableOpacity,
  FlatList,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

const windowDimensions = Dimensions.get("window");
const BUTTON_WIDTH = 80;
const MAX_TRANSLATE = -BUTTON_WIDTH;

type Data = {
  id: string;
  title: string;
};

const data: Data[] = [
  {
    id: "1",
    title: "Nguyễn Văn A",
  },
  {
    id: "2",
    title: "Nguyễn Văn B",
  },
  {
    id: "3",
    title: "Nguyễn Văn C",
  },
  {
    id: "4",
    title: "Nguyễn Văn D",
  },
  {
    id: "5",
    title: "Nguyễn Văn E",
  },
  {
    id: "6",
    title: "Nguyễn Văn F",
  },
  {
    id: "7",
    title: "Nguyễn Văn G",
  },
  {
    id: "8",
    title: "Nguyễn Văn G",
  },
  {
    id: "9",
    title: "Nguyễn Văn H",
  },
  {
    id: "10",
    title: "Nguyễn Văn I",
  },
  {
    id: "11",
    title: "Nguyễn Văn J",
  },
];

export default function SwipeableListExample(): React.ReactElement {
  function onRemove() {
    Alert.alert("Removed");
  }

  return (
    <View style={s.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <ListItem item={item} onRemove={onRemove} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const springConfig = (velocity: number) => {
  "worklet";

  return {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
    velocity,
  };
};

const timingConfig = {
  duration: 400,
  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
};

type ListItemProps = {
  item: Data;
  onRemove: () => void;
};

function ListItem({ item, onRemove }: ListItemProps) {
  const isRemoving = useSharedValue(false);
  const translateX = useSharedValue(0);

  type AnimatedGHContext = {
    startX: number;
  };

  const handler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    AnimatedGHContext
  >({
    onStart: (_evt, ctx) => {
      ctx.startX = translateX.value;
    },

    onActive: (evt, ctx) => {
      const nextTranslate = evt.translationX + ctx.startX;
      translateX.value = Math.min(0, Math.max(nextTranslate, MAX_TRANSLATE));
    },

    onEnd: (evt) => {
      if (evt.velocityX < -20) {
        translateX.value = withSpring(
          MAX_TRANSLATE,
          springConfig(evt.velocityX)
        );
      } else {
        translateX.value = withSpring(0, springConfig(evt.velocityX));
      }
    },
  });

  const styles = useAnimatedStyle(() => {
    if (isRemoving.value) {
      return {
        height: withTiming(0, timingConfig, () => {
          runOnJS(onRemove)();
        }),
        transform: [
          {
            translateX: withTiming(-windowDimensions.width, timingConfig),
          },
        ],
      };
    }

    return {
      height: 78,
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  function handleRemove() {
    isRemoving.value = true;
  }

  const removeButton = {
    title: "Delete",
    backgroundColor: "#DC2626",
    color: "#FFFFFF",
    onPress: handleRemove,
  };

  return (
    <View style={s.item}>
      <PanGestureHandler activeOffsetX={[-10, 10]} onGestureEvent={handler}>
        <Animated.View style={styles}>
          <ListItemContent item={item} />
          <View style={s.buttonsContainer}>
            <Button item={removeButton} />
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

type ButtonData = {
  title: string;
  backgroundColor: string;
  color: string;
  onPress: () => void;
};

function Button({ item }: { item: ButtonData }) {
  return (
    <View style={[s.button, { backgroundColor: item.backgroundColor }]}>
      <TouchableOpacity onPress={item.onPress} style={s.buttonInner}>
        <Text style={{ color: item.color }}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );
}

function ListItemContent({ item }: { item: Data }) {
  return (
    <View style={s.itemContainer}>
      <View style={s.avatarContainer}>
        <Text style={s.avatarText}>{item.title[0]}</Text>
      </View>
      <Text style={s.title}>{item.title}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  item: {
    justifyContent: "center",
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
    color: "#111827",
  },
  title: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "500",
    marginLeft: 16,
    color: "#111827",
  },
  button: {
    width: windowDimensions.width,
    paddingRight: windowDimensions.width - BUTTON_WIDTH,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonInner: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: BUTTON_WIDTH,
  },
  buttonsContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: windowDimensions.width,
    width: windowDimensions.width,
  },
});
