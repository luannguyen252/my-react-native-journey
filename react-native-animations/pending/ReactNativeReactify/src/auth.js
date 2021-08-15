
import { AsyncStorage } from "react-native";
import config, { printLog } from "./config";

export const isSignedIn = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(config.constants.LOGIN)
        .then(res => {
          if (res !== null) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(err => reject(err));
    });
  };