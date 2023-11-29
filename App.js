import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useCallback, useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import AppNav from "./navigation/AppNav";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/Sen-Regular.ttf"),
    bold: require("./assets/fonts/Sen-Bold.ttf"),
    extraBold: require("./assets/fonts/Sen-ExtraBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      setTimeout(async () => {
        await SplashScreen.hideAsync();
      }, 3000);
    }
  }, [fontsLoaded]);
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
      </AuthProvider>
    </SafeAreaProvider>
  );
}
