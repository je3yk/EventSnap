import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import NavButton from "./NavButton";

export default function NavTabBar({
  state,
  descriptors,
  navigation,
  ...props
}) {
  const isCameraActive =
    state.routes.findIndex((route) => route.name === "Camera") === state.index;

  return (
    <View
      style={{
        ...styles.tabBar,
        backgroundColor: isCameraActive ? "rgba(0,0,0, 0.4)" : "white",
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const color = isFocused ? (isCameraActive ? "#fff" : "#05f") : "#aaa";

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        return (
          <NavButton
            key={route.key}
            isFocused
            icon={options.icon}
            onPress={onPress}
            color={color}
            label={label}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    width: "90%",
    borderRadius: 50,
    borderColor: "gray",
    borderWidth: 1,
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 25,
  },
});
