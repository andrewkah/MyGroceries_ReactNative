import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import instance, {
  getAuthToken,
  removeAuthToken,
  setAuthToken,
  setUsername,
} from "../config";
import { showAlert } from "../components/Alert";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [registrationData, setRegistrationData] = useState(null);

  const registerUser = async (username, email, password) => {
    setIsLoading(true);

    try {
      const response = await instance.post("/auth/signup", {
        username,
        email,
        password,
      });

      let result = response.data;
      setRegistrationData(result.username);
      setUserToken(result.token);
      setAuthToken(result.token, result.refreshToken);
      setUsername(result.username);
    } catch (error) {
      console.log(error);
      let errorMessage = error.response?.data || "Error signing up";
      showAlert(
        "danger",
        errorMessage,
        "Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username, password) => {
    setIsLoading(true);
    try {
      const response = await instance.post("/auth/signin", {
        username,
        password,
      });
      let userInfo = response.data;
      setRegistrationData(userInfo.username);
      setUserToken(userInfo.token);
      setAuthToken(userInfo.token, userInfo.refreshToken);
      setUsername(userInfo.username);
    } catch (error) {
      console.log(error);
      let errorMessage = error.response?.data || "Error logging in";
      showAlert("danger", errorMessage, "Sign up if you are not logged in");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("userInfo");
    removeAuthToken();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userToken = await getAuthToken();
      setUserToken(userToken);
      setIsLoading(false);
    } catch (error) {
      console.log(`isLogged in error ${error.message}`);
      logout();
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        registerUser,
        logout,
        isLoading,
        userToken,
        registrationData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
