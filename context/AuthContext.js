import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import BASEURL from '../config'
import { showAlert } from "../components/Alert";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [registrationData, setRegistrationData] = useState(null);

  const registerUser = async (username, email, password) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${BASEURL}/auth/signup`,
        {
          username,
          email,
          password,
        }
      );

      let result = response.data;
      setRegistrationData(result.username);
      setUserInfo(result);
      setUserToken(result.token);
      AsyncStorage.setItem("userInfo", JSON.stringify(result));
      AsyncStorage.setItem("userToken", result.token);
    } catch (error) {
      showAlert("danger", "Error", `Sign up error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username, password) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BASEURL}/auth/signin`,
        {
          username,
          password,
        }
      );
      let userInfo = response.data;
      setRegistrationData(userInfo.username);
      setUserInfo(userInfo);
      setUserToken(userInfo.token);
      AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
      AsyncStorage.setItem("userToken", userInfo.token);
      AsyncStorage.setItem("User name", userInfo.username);
    } catch (error) {
      showAlert("danger", "Error", `login error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("userInfo");
    AsyncStorage.removeItem("userToken");
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userInfo = await AsyncStorage.getItem("userInfo");
      let userToken = await AsyncStorage.getItem("userToken");
      userInfo = JSON.stringify(userInfo);
      setUserToken(userToken);
      setIsLoading(false);
    } catch (error) {
      console.log(`isLogged in error ${error.message}`);
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
        userInfo,
        registrationData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
