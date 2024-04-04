import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useCallback, useEffect, useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import AppNav from "./navigation/AppNav";
import FlashMessage from "react-native-flash-message";
import { showAlert } from "./components/Alert";
import NetInfo from "@react-native-community/netinfo";

export default function App() {
  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    black: require("./assets/fonts/Poppins-Black.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    extraBold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      setTimeout(async () => {
        await SplashScreen.hideAsync();
      }, 3000);
    }
  }, [fontsLoaded]);

  NetInfo.addEventListener((networkState) => {
    if (networkState.isConnected) {
      showAlert("success", "Internet Connected");
    } else {
      showAlert(
        "danger",
        "No internet Connection!",
        "Please turn on your wifi connection."
      );
    }
  });

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <AuthProvider>
        <AppNav />
        <FlashMessage />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
