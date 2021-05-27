import { Alert } from "react-native";
import constants from "./constants";

export function changeCountry(country) {
  return {
    type: constants.changeCountry,
    payload: country
  };
}

export function calculateTip(amount) {
  return {
    type: constants.calculateTip,
    payload: amount
  };
}

export function setSelectedIndex(index) {
  return {
    type: constants.setIndex,
    payload: index
  };
}

export function setError(error) {
  return {
    type: constants.setError,
    payload: error
  };
}
