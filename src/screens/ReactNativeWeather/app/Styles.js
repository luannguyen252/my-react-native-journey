import React from "react";
import { StyleSheet } from "react-native";

export const colors = {
  secondary: "#0686E4",
  tertiary: "#ffffff",
  background_dark: "#F0F0F0",
  text_light: "#ffffff",
  text_medium: "#464646",
  text_dark: "#263238",
  weather_text_color: "#464646",
  transparent_white: "#FFFFFF00",
  separator_background: "#E2E2E2",
};

export const getFont = () => {
  if (require("react-native").Platform.OS === "ios") {
    return "NotoSans";
  } else {
    return "NotoSans-Regular";
  }
};

export const values = {
  font_body: getFont(),
  font_body_size: 14,
  font_title_size: 20,
  font_time_size: 12,
  font_place_size: 20,
  font_temp_size: 27,
  border_radius: 2,
  tiny_icon_size: 22,
  small_icon_size: 40,
  large_icon_size: 110,
};

export const addDegreesToEnd = (temp) => {
  return `${temp}${String.fromCharCode(176)}`;
};

export const home_screen_list = StyleSheet.create({
  container: {
    marginTop: 14,
    alignSelf: "stretch",
  },
  row: {
    elevation: 1,
    borderRadius: 2,
    backgroundColor: colors.tertiary,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 18,
    paddingRight: 16,
    marginLeft: 14,
    marginRight: 14,
    marginTop: 0,
    marginBottom: 6,
  },
  row_cell_timeplace: {
    flex: 1,
    flexDirection: "column",
  },
  row_cell_temp: {
    color: colors.weather_text_color,
    paddingLeft: 16,
    flex: 0,
    fontSize: values.font_temp_size,
    fontFamily: values.font_body,
  },
  row_time: {
    color: colors.weather_text_color,
    textAlignVertical: "bottom",
    includeFontPadding: false,
    flex: 0,
    fontSize: values.font_time_size,
    fontFamily: values.font_body,
  },
  row_place: {
    color: colors.weather_text_color,
    textAlignVertical: "top",
    includeFontPadding: false,
    flex: 0,
    fontSize: values.font_place_size,
    fontFamily: values.font_body,
  },
});

export const fab = {
  icon: "library-add",
  stylesheet: StyleSheet.create({
    container: {
      backgroundColor: colors.secondary,
    },
  }),
};

export const home_screen = StyleSheet.create({
  v_container: {
    flex: 1,
    padding: 8,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background_dark,
  },
});

export const details_screen_2 = StyleSheet.create({
  v_container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: colors.tertiary,
    padding: 8,
  },
  day: {
    fontSize: 14,
    color: colors.weather_text_color,
  },
  temp: {
    fontSize: 24,
    color: colors.weather_text_color,
  },
  row: {
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
  },
  list: {
    paddingTop: 20,
  },
});

export const details_screen_1 = StyleSheet.create({
  v_container: {
    flex: 1,
    padding: 8,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.tertiary,
  },
  separator: {
    alignSelf: "stretch",
    backgroundColor: colors.separator_background,
    height: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  place: {
    paddingTop: 20,
    paddingBottom: 20,
    color: colors.weather_text_color,
    fontFamily: values.font_body,
    fontSize: 35,
  },
  description: {
    color: colors.weather_text_color,
    fontFamily: values.font_body,
    fontSize: 14,
  },
  current_temp: {
    color: colors.weather_text_color,
    fontFamily: values.font_body,
    fontSize: 45,
  },
  list_container: {
    marginTop: 14,
    alignSelf: "stretch",
  },
  list_row: {
    flexDirection: "row",
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 12,
  },
  list_row_time: { flex: 1 },
  list_row_temp: { paddingLeft: 12 },
});

export const settings_screen = StyleSheet.create({
  v_container: {
    flex: 1,
    padding: 8,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.tertiary,
  },
  text: {
    color: colors.weather_text_color,
    fontFamily: values.font_body,
    fontSize: 20,
  },
});

export const header = {
  headerStyle: {
    backgroundColor: colors.secondary,
  },
  headerTintColor: colors.text_light,
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 8,
  },
  text: {
    paddingLeft: 8,
    color: colors.text_light,
    fontFamily: values.font_body,
    fontSize: values.font_title_size,
  },
};

export const tabs = {
  labelStyle: {
    fontFamily: values.font_body,
    fontSize: values.font_body_size,
  },
  activeTintColor: colors.secondary,
  inactiveTintColor: colors.text_medium,
  indicatorStyle: { backgroundColor: colors.secondary },
  style: {
    backgroundColor: colors.tertiary,
    borderTopColor: colors.tertiary,
  },
};

export const drawer = {
  activeBackgroundColor: colors.tertiary,
  inactiveBackgroundColor: colors.secondary,
  inactiveTintColor: colors.text_light,
  activeTintColor: colors.text_dark,
  labelStyle: {
    fontFamily: values.font_body,
    fontSize: values.font_title_size,
  },
  style: {
    backgroundColor: colors.secondary,
  },
};
