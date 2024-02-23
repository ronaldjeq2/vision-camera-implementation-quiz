import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (storageKey: string, value: any) => {
  try {
    await AsyncStorage.setItem(storageKey, value);
  } catch (e) {
    // saving error
  }
};

export const getData = async (storageKey: string) => {
  try {
    const value = await AsyncStorage.getItem(storageKey);
    return value;
  } catch (e) {
    return null;
    // error reading value
  }
};
