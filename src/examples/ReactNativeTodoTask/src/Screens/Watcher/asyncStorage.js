import AsyncStorage from '@react-native-async-storage/async-storage';

export const getMultiple = async (keys) => {
  let values;
  try {
    values = await AsyncStorage.multiGet(keys);
    return values;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const multiSet = async (newValues) => {
  try {
    await AsyncStorage.multiSet(newValues);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const removeFew = async (keys) => {
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (e) {
    return Promise.reject(e);
  }
};
