import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { registerRootComponent } from "expo";
import { CameraScreen, GalleryScreen, TimetableScreen } from "./screens";
import { Camera } from "expo-camera";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import NavTabBar from "./components/NavTabBar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PhotoEditorScreen } from "./screens/PhotoEditor";
import * as MediaLibrary from "expo-media-library";

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      tabBar={(props) => <NavTabBar {...props} />}
      initialRouteName="Timetable"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Timetable"
        options={() => ({
          title: "Wydarzenia",
          icon: "event",
        })}
        component={TimetableScreen}
      />
      <Tab.Screen
        name="Camera"
        options={() => ({
          title: "Aparat",
          icon: "camera-alt",
        })}
        component={CameraScreen}
      />
      <Tab.Screen
        name="Gallery"
        options={() => ({
          title: "Galeria",
          icon: "camera-roll",
        })}
        component={GalleryScreen}
      />
    </Tab.Navigator>
  );
}

const MainStack = createStackNavigator();

function App() {
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

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MainStack.Navigator
          initialRouteName="app"
          screenOptions={{
            headerShown: false,
          }}
        >
          <MainStack.Screen name="app" component={BottomTab} />
          <MainStack.Screen name="photo-edit" component={PhotoEditorScreen} />
        </MainStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default registerRootComponent(App);
