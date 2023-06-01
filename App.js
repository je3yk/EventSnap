import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { registerRootComponent } from "expo";
import { CameraScreen, GalleryScreen, TimetableScreen } from "./screens";

const Tab = createBottomTabNavigator();

function App() {
  return (
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
  );
}

export default registerRootComponent(App);
