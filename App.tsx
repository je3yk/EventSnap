import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { registerRootComponent } from "expo";
import { CameraScreen, GalleryScreen, TimetableScreen } from "./screens";
import { Camera } from "expo-camera";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

function App() {
  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();

  if (!cameraPermission) {
    // TODO: handle permission
    requestCameraPermission();
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Events"
          screenOptions={() => ({
            headerShown: false,
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Timetable" component={TimetableScreen} />
          <Tab.Screen name="Camera" component={CameraScreen} />
          <Tab.Screen name="Details" component={GalleryScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default registerRootComponent(App);
