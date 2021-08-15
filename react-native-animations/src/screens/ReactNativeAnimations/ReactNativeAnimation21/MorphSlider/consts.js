import { Dimensions } from "react-native";

export const { width, height } = Dimensions.get("window");
export const BAR_HEIGHT = 50;
export const BALL_SIZE = 40;
export const BAR_WIDTH = 160;

export const P1_MAX_CURVE = 50;
export const P1_MIN_CURVE = 40;
export const P1_DIFF_CURVE = P1_MAX_CURVE - P1_MIN_CURVE;

export const P2_MAX_CURVE = 50;
export const P2_MIN_CURVE = 20;
export const P2_DIFF_CURVE = P2_MAX_CURVE - P2_MIN_CURVE;

export const VISIBLE_HOURS = [0, 4, 8, 12, 16, 20, 24];
export const COLORS = [
  "#EA580C",
  "#DC2626",
  "#4F46E5",
  "#7C3AED",
  "#9333EA",
  "#C026D3",
  "#DB2777",
  "#E11D48",
];

export const MIN_BAR_VALUE = -BAR_WIDTH / 2 + BALL_SIZE / 2;
export const MAX_BAR_VALUE = width - BAR_WIDTH / 2 - BALL_SIZE / 2;

export const VALUE_PADDING = BALL_SIZE / 2 - 10;
export const VALUE_ITEM_WIDTH = 20;
export const VALUE_LEFT_MARGIN =
  (width - 2 * VALUE_PADDING - VALUE_ITEM_WIDTH * VISIBLE_HOURS.length) /
  (VISIBLE_HOURS.length - 1);
export const DOT_WIDTH = 4;
export const RANGE_VALUE = VALUE_LEFT_MARGIN + VALUE_ITEM_WIDTH;
export const GRADIENT_HEIGHT = height * 0.7;

export const MIN_ABSOLUTE_X = VALUE_PADDING + 10 - DOT_WIDTH / 2;
export const MAX_ABSOLUTE_X = width - MIN_ABSOLUTE_X - DOT_WIDTH;
