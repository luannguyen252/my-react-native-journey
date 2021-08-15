import { State } from "react-native-gesture-handler";
import Animated, { Easing } from "react-native-reanimated";

const {
  eq,
  set,
  neq,
  and,
  call,
  cond,
  block,
  Value,
  timing,
  onChange,
  stopClock,
  startClock,
  interpolate,
  Extrapolate,
} = Animated;

export const runScaleTimer = (
  clock,
  gestureState,
  onPress,
  activeScale,
  inactiveScale
) => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 100,
    toValue: new Value(-1),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    onChange(
      gestureState,
      cond(eq(gestureState, State.END), call([], onPress))
    ),

    cond(and(eq(gestureState, State.BEGAN), neq(config.toValue, 1)), [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.frameTime, 0),
      set(config.toValue, 1),
      startClock(clock),
    ]),

    cond(and(eq(gestureState, State.END), neq(config.toValue, 0)), [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.frameTime, 0),
      set(config.toValue, 0),
      set(gestureState, -1),
      startClock(clock),
    ]),

    cond(and(eq(gestureState, State.FAILED), neq(config.toValue, 0)), [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.frameTime, 0),
      set(config.toValue, 0),
      startClock(clock),
    ]),

    cond(and(eq(gestureState, State.CANCELLED), neq(config.toValue, 0)), [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.frameTime, 0),
      set(config.toValue, 0),
      startClock(clock),
    ]),

    timing(clock, state, config),

    cond(state.finished, stopClock(clock)),

    interpolate(state.position, {
      inputRange: [0, 1],
      extrapolate: Extrapolate.CLAMP,
      outputRange: [inactiveScale, activeScale],
    }),
  ]);
};
