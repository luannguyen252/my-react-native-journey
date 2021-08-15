import * as Animatable from "react-native-animatable";
import React, { Component } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { CreditCardInput, LiteCreditCardInput } from "./src";
import colors from "../../../../assets/styles/colors";

const { width: WIDTH_SCREEN, height: HEIGHT_SCREEN } = Dimensions.get("screen");
const ANIMATION_DELAY = 300;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 64,
  },
  label: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "500",
    color: colors.coolGray900,
  },
  input: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "400",
    color: colors.coolGray900,
  },
});

export default class ReactNativeCreditCardInput extends Component {
  _onChange = (formData) => console.log(JSON.stringify(formData, null, " "));
  _onFocus = (field) => console.log("focusing", field);

  render() {
    return (
      <View style={styles.container}>
        <Animatable.View animation="fadeInUp" delay={ANIMATION_DELAY}>
          <CreditCardInput
            autoFocus
            requiresName
            requiresCVC
            requiresPostalCode
            labelStyle={styles.label}
            inputStyle={styles.input}
            validColor={colors.coolGray900}
            invalidColor={colors.red500}
            placeholderColor={colors.coolGray400}
            onFocus={this._onFocus}
            onChange={this._onChange}
          />
        </Animatable.View>
      </View>
    );
  }
}
