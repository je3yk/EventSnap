import { registerRootComponent } from "expo";
import { Camera } from "expo-camera";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as MediaLibrary from "expo-media-library";
import Navigation from "./Navigation";
import useFonts from "./hooks/useFonts";
import * as SplashScreen from "expo-splash-screen";

import "react-native-get-random-values";
import { AuthProvider } from "./context/AuthContext";

SplashScreen.preventAutoHideAsync();

function App() {
  const fontsLoaded = useFonts();

  const [cameraPermission, setCameraPermission] = useState(null);
  const [mediaPermissionStatus, requestMediaPermission] =
    MediaLibrary.usePermissions();

  useEffect(() => {
    (async () => {
      if (cameraPermission === null) {
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setCameraPermission(cameraStatus.status === "granted");
      }
    })();

    if (mediaPermissionStatus === null) {
      requestMediaPermission();
    }
  }, [mediaPermissionStatus, requestMediaPermission]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default registerRootComponent(App);
