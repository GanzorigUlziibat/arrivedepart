import AsyncStorage from '@react-native-async-storage/async-storage';
export const urlArriveService = "http://arrive.mandakh.org/";

export const sendRequest = async (url, body) => {
  console.log(url);
  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw "Something went wrong.";
    }
    let data = await response.json();

    // Log the data to the console
    console.log(data);
    return data;
  } catch (error) {
    console.warn(error);
  }
};


export const _storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(
      key,
      value,
    );
    // const value1 = await AsyncStorage.getItem(key);
    // console.log(value1);
  } catch (error) {
    // Error saving data
    console.log("_storeData"+error)
  }
};

// Fetching data:
export const _retrieveData = async(key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // We have data!!
      console.log(value+"ret")
      return value;
    }
  } catch (error) {
    // Error retrieving data
    console.log("_retrieveData"+error)
  }
};