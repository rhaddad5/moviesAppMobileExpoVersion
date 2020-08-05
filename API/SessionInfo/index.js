import AsyncStorage from "@react-native-community/async-storage";

export const getAccessToken = async () => {
  try {
    const value = await AsyncStorage.getItem("accessToken")
    if(value !== null) {
      return value;
    } else {
      console.log("Token not found");
      return undefined;
    }
  } catch(e) {
    console.log("Error getting access token", e);
  }
};

export const storeAccessToken = async (value) => {
  try {
    await AsyncStorage.setItem("accessToken", value)
  } catch (e) {
    console.log("Error storing access token", e)
  }
}

export const removeAccessToken = async () => {
  try {
    await AsyncStorage.removeItem("accessToken")
  } catch (e) {
    console.log("Error removing access token", e)
  }
}

export const removeUsername = async () => {
  try {
    await AsyncStorage.removeItem("username")
  } catch (e) {
    console.log("Error removing username", e)
  }
}

export const getUsername = async () => {
  try {
    const value = await AsyncStorage.getItem("username")
    if(value !== null) {
      return value;
    } else {
      console.log("Username not found");
      return undefined;
    }
  } catch(e) {
    console.log("Error getting username", e);
  }
};

export const storeUsername = async (value) => {
  try {
    await AsyncStorage.setItem("username", value)
  } catch (e) {
    console.log("Error storing username", e)
  }
}

export const clearAsyncStorage = async() => {
  try {
    await AsyncStorage.removeItem("username")
    console.log("Username cleared from storage")
    await AsyncStorage.removeItem("accessToken")
    console.log("Token cleared from storage")
  } catch (e) {
    console.log("Error clearing storage", e)
  }
}

