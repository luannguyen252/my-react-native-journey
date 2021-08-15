import * as Animatable from "react-native-animatable";
import React, { Component } from "react";
import { StyleSheet, View, Switch } from "react-native";
import {
  CreditCardInput,
  LiteCreditCardInput,
} from "react-native-credit-card-input";
import colors from "../../../../assets/styles/colors";

const s = StyleSheet.create({
  switch: {
    alignSelf: "center",
    marginBottom: 16,
  },
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
  state = { useLiteCreditCardInput: false };

  _onChange = (formData) => console.log(JSON.stringify(formData, null, " "));
  _onFocus = (field) => console.log("focusing", field);
  _setUseLiteCreditCardInput = (useLiteCreditCardInput) =>
    this.setState({ useLiteCreditCardInput });

  render() {
    return (
      <View style={s.container}>
        <Switch
          style={s.switch}
          onValueChange={this._setUseLiteCreditCardInput}
          value={this.state.useLiteCreditCardInput}
        />

        {this.state.useLiteCreditCardInput ? (
          <LiteCreditCardInput
            autoFocus
            inputStyle={s.input}
            validColor={"black"}
            invalidColor={"red"}
            placeholderColor={"darkgray"}
            onFocus={this._onFocus}
            onChange={this._onChange}
          />
        ) : (
          <CreditCardInput
            autoFocus
            requiresName
            requiresCVC
            requiresPostalCode
            labelStyle={s.label}
            inputStyle={s.input}
            validColor={"black"}
            invalidColor={"red"}
            placeholderColor={"darkgray"}
            onFocus={this._onFocus}
            onChange={this._onChange}
          />
        )}
      </View>
    );
  }
}
