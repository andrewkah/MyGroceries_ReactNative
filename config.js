import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://mygroceriesapp-production.up.railway.app/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const refreshTokens = async (token) => {
  try {
    const response = await axios.post(
      `https://mygroceriesapp-production.up.railway.app/api/v1/auth/refresh`,
      {
        token,
      }
    );
    let result = response.data;
    await setAuthToken(result.token, result.refreshToken);
    return result.token;
  } catch (error) {
    let errorMessage = error.response?.data || "Error retrieving refresh token";
    console.log(errorMessage);
  }
};

instance.interceptors.request.use(
  async (request) => {
    const token = await getAuthToken();
    if (token) {
      const isExpired = await checkExpiration();
      if (isExpired) {
        const refreshToken = await getRefreshAuthToken();
        const newAccessToken = await refreshTokens(refreshToken);
        if (newAccessToken) {
          request.headers.Authorization = `Bearer ${newAccessToken}`;
        } else {
          await removeAuthToken();
        }
      } else {
        request.headers.Authorization = `Bearer ${token}`;
      }
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to set the JWT token to AsyncStorage
export const setAuthToken = async (token, refreshToken) => {
  try {
    const time = (Date.now() + 1000 * 60 * 60 * 10).toString();
    await AsyncStorage.multiSet([
      ["jwtToken", token],
      ["jwtExpTime", time],
      ["jwtRefreshToken", refreshToken],
    ]);
  } catch (error) {
    console.error("Error storing JWT token:", error);
  }
};

// Function to get the JWT token from AsyncStorage
export const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem("jwtToken");
    return token;
  } catch (error) {
    console.error("Error getting JWT token:", error);
    return null;
  }
};

export const getRefreshAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem("jwtRefreshToken");
    return token;
  } catch (error) {
    console.error("Error getting JWT token:", error);
    return null;
  }
};

export const removeAuthToken = async () => {
  try {
    return await AsyncStorage.removeItem("jwtToken");
  } catch (error) {
    console.error("Error deleting JWT token:", error);
    return null;
  }
};

export const setUsername = async (token) => {
  try {
    await AsyncStorage.setItem("userName", token);
  } catch (error) {
    console.error("Error storing User name: ", error);
  }
};

export const getUsername = async () => {
  try {
    const name = await AsyncStorage.getItem("userName");
    return name;
  } catch (error) {
    console.error("Error getting User name", error);
    return null;
  }
};

export const checkExpiration = async () => {
  const expirationTime = await AsyncStorage.getItem("jwtExpTime");
  const expirationTimeInSec = parseInt(expirationTime, 10) / 1000;
  const currentTimeInSec = Math.floor(Date.now() / 1000);
  return currentTimeInSec >= expirationTimeInSec;
};
export default instance;
