import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  AccountScreen,
  AuthScreen,
  CameraScreen,
  GalleryScreen,
  PhotoEditorScreen,
  TimetableScreen,
} from "./screens";
import CustomBottomTab from "./components/CustomBottomTab";
import { useAuth } from "./context/AuthContext";
import useSessionToken from "./hooks/useSessionToken";

const MainStack = createStackNavigator();

function BottomTabsStack() {
  const TabsStack = createBottomTabNavigator();
  return (
    <TabsStack.Navigator
      tabBar={(props) => <CustomBottomTab {...props} />}
      initialRouteName="Timetable"
      screenOptions={{
        headerShown: false,
      }}
    >
      <TabsStack.Screen
        name="Timetable"
        options={() => ({
          title: "Wydarzenia",
          icon: "event",
        })}
        component={TimetableScreen}
      />
      <TabsStack.Screen
        name="Camera"
        options={() => ({
          title: "Aparat",
          icon: "camera-alt",
          headerShown: false,
        })}
        component={CameraScreen}
      />
      <TabsStack.Screen
        name="Gallery"
        options={() => ({
          title: "Galeria",
          icon: "camera-roll",
        })}
        component={GalleryScreen}
      />
      <TabsStack.Screen
        name="Profile"
        options={() => ({
          title: "Profil",
          icon: "account-circle",
        })}
        component={AccountScreen}
      />
    </TabsStack.Navigator>
  );
}

export default function Navigation() {
  const { hasSession, fetchingSession } = useSessionToken();

  if (fetchingSession) {
    return null;
  }

  if (!hasSession) {
    return (
      <MainStack.Navigator
        initialRouteName="authorization"
        screenOptions={{
          headerShown: false,
        }}
      >
        <MainStack.Screen name="authorization" component={AuthScreen} />
      </MainStack.Navigator>
    );
  }

  return (
    <MainStack.Navigator
      initialRouteName="app"
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="app" component={BottomTabsStack} />
      <MainStack.Screen name="photoEditor" component={PhotoEditorScreen} />
    </MainStack.Navigator>
  );
}
