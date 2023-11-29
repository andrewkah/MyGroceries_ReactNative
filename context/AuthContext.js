import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../config';
import { userLogin } from './user_api';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    const login = (/*username, password*/) => {
      setIsLoading(true);
      // console.log(username, password);

      // userLogin({
      //   username: username,
      //   password: password
      // }).then((result) => {
      //   console.log(result)
      //   if(result.status == 200){
      //     AsyncStorage.setItem("Access Token", result.data)
      //   }
      // }).catch(error => {
      //   console.error(error);
      // })


      // axios.post(`http://localhost:8080/api/v1/auth/sigin`, {
      //   username,
      //   password
      // })
      // .then(response => {
      //   let userInfo = response.data;
      //   setUserInfo(userInfo);
      //   setUserToken(userInfo.token);
      //   AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      //   AsyncStorage.setItem('userToken', userInfo.token);

      //   console.log('userInfo' + userInfo);
      //   console.log(`User Token: ${response.data}`);
      // })
      // .catch(e => console.log(`Login error ${e}`));
      let userToken = "ytqwre325regf"
      setUserToken("userToken", userToken)
      AsyncStorage.setItem("userToken", userToken)
      

      setIsLoading(false);
    }

    const logout = () => {
      setIsLoading(true);
      setUserToken(null);
      AsyncStorage.removeItem('userInfo');
      AsyncStorage.removeItem('userToken');
      setIsLoading(false);
    }

    const isLoggedIn = async ()=> {
      try {
        setIsLoading(true);
        let userInfo = await AsyncStorage.getItem('userInfo');
        let userToken = await AsyncStorage.getItem('userToken');
        userInfo = JSON.stringify(userInfo);
        setUserToken(userToken);
        setIsLoading(false);
      } catch (error) {
        console.log(`isLogged in error ${error.message}`);
      }
    }

    useEffect(() => {
      isLoggedIn();
    }, []);

  return (
    <AuthContext.Provider value={{login, logout, isLoading, userToken}}>
        {children}
    </AuthContext.Provider>
  )
}
