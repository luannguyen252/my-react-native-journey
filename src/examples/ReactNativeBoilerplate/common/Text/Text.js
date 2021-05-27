import React, { useContext } from "react";
import { Text as RNText, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { TYPOGRAPHY } from "../../constants";
import { ThemeContext } from "../../theme";

const HEADING = "heading";
const SUB_HEADING = "subheading";
const BODY = "body";

const Text = ({ type, bold, style, ...props }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <RNText
      style={StyleSheet.flatten([getTextStyle(type, bold, theme), style])}
      {...props}
    />
  );
};

const getTextStyle = (type, bold, theme) => {
  let style = "";
  switch (type) {
    case HEADING:
      style = "headingText";
      break;
    case SUB_HEADING:
      style = "subheadingText";
      break;
    default:
      style = "bodyText";
  }
  if (bold) {
    style += "Bold";
  }
  return TYPOGRAPHY[style](theme);
};

const styles = StyleSheet.create({});

Text.propTypes = {
  type: PropTypes.oneOf([HEADING, SUB_HEADING, BODY]),
  bold: PropTypes.bool,
  style: PropTypes.object,
};

Text.defaultProps = {
  type: BODY,
  bold: false,
  style: {},
};

export default Text;
