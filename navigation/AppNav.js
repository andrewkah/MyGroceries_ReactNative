import { View, Text, ActivityIndicator } from "react-native";
import React, { useContext } from "react";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { COLORS, FONTS, SIZES } from "../constants/theme";

export default function AppNav() {
  const { isLoading, userToken } = useContext(AuthContext);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={SIZES.h1} />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {userToken !== null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
