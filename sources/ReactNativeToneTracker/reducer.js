import constants from "./constants";
import AsyncStorage from "@react-native-community/async-storage";
import { Alert } from "react-native";

//placeholder state
getInitialState = () => {
  return {
    guitars: [],
    notifications: null,
    selectedForEditing: null,
    changeAge: null,
    theme: "normal"
  };
};

const reducer = (state = getInitialState(), action) => {
  switch (action.type) {
    //Adding all guitars as they are collected from async storage
    case constants.initializeGuitars:
      return {
        ...state,
        guitars: action.payload === null ? [] : action.payload
      };
    //This is the guitar selected for editing
    case constants.selectedGuitar:
      return {
        ...state,
        selectedForEditing: action.payload
      };
    //Determine if datepicker needs to be automatically displayed
    case constants.changeAge:
      return {
        ...state,
        changeAge: action.payload
      };
    //Pushing newly created guitar to the guitars list
    case constants.addGuitar:
      let newGuitarArr = [action.payload];
      let concatenatedArray = newGuitarArr.concat(state.guitars);
      //Persisting new guitar in AsyncStorage
      AsyncStorage.setItem(
        constants.persistedGuitars,
        JSON.stringify(concatenatedArray)
      );
      return {
        ...state,
        guitars: concatenatedArray
      };
    //Updating value(s) of an existing guitar
    case constants.editGuitar:
      let updatedArr = state.guitars;
      for (let i in updatedArr) {
        if (updatedArr[i].key === action.payload.key) {
          updatedArr[i] = action.payload;
          break;
        }
      }
      let dummy = [];
      let AnotherConcatenatedArray = dummy.concat(updatedArr);
      //Persisting new guitar in AsyncStorage
      AsyncStorage.setItem(
        constants.persistedGuitars,
        JSON.stringify(AnotherConcatenatedArray)
      );
      return {
        ...state,
        guitars: AnotherConcatenatedArray
      };
    //Removing specified guitar permanently
    case constants.deleteGuitar:
      let removedGuitarArr = state.guitars;
      for (let i in removedGuitarArr) {
        if (removedGuitarArr[i].key === action.payload) {
          removedGuitarArr.splice(i, 1);
          break;
        }
      }
      const dummyArr = [];
      removedGuitarArr = removedGuitarArr.concat(dummyArr);
      //Removing item from AsyncStorage
      AsyncStorage.setItem(
        constants.persistedGuitars,
        JSON.stringify(removedGuitarArr)
      );
      return {
        ...state,
        guitars: removedGuitarArr
      };
    //Boolean indicating whether or not to inform the user to get new strings
    case constants.showNotifications:
      //Persisting new notifications state in AsyncStorage
      AsyncStorage.setItem(
        constants.persistedNotifications,
        String(action.payload)
      );
      return {
        ...state,
        notifications: action.payload
      };
    //changingTheTheme
    case constants.toggleNightShade:
      //Persisting the theme
      AsyncStorage.setItem(
        constants.persistedTheme,
        state.theme === "normal" ? "nightShade" : "normal"
      );
      return {
        ...state,
        theme: state.theme === "normal" ? "nightShade" : "normal"
      };
    //Setting the persisted theme
    case constants.initializeTheme:
      return {
        ...state,
        theme: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
