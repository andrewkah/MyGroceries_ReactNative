import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [registrationData, setRegistrationData] = useState(null);

  const registerUser = async (username, email, password, navigateCallback) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        `https://mygroceriesapp-springboot.onrender.com/api/v1/auth/signup`,
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
      console.log(`Sign up error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username, password) => {
    setIsLoading(true);
    console.log(username, password);
    try {
      const response = await axios.post(
        `https://mygroceriesapp-springboot.onrender.com/api/v1/auth/signin`,
        {
          username,
          password,
        }
      );
      let userInfo = response.data;
      setUserInfo(userInfo);
      setUserToken(userInfo.token);
      AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
      AsyncStorage.setItem("userToken", userInfo.token);
    } catch (error) {
      console.log(`Login error ${error.message}`);
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
