import AsyncStorage from "@react-native-async-storage/async-storage";

export const AsyncStorageKeys = Object.freeze({
  theme: "theme_type",
});

const saveValue = async (key, value) => {
  try {
    if (typeof value === "string" && value !== "") {
      await AsyncStorage.setItem(key, value);
    } else {
      await AsyncStorage.removeItem(key);
    }
    return true;
  } catch (e) {
    return false;
  }
};

const loadValue = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    return null;
  }
};

export const saveTheme = async (themeType) =>
  saveValue(AsyncStorageKeys.theme, themeType);

export const loadTheme = async () => loadValue(AsyncStorageKeys.theme);
