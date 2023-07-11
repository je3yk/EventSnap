import { View, StyleSheet } from "react-native";
import Button from "./Button";
import { Typography } from "./Typography";

export default function CustomBottomTab({ state, descriptors, navigation }) {
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

        const color = isFocused
          ? isCameraActive
            ? "#fff"
            : "#354396"
          : "#aaa";

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
          <Button
            key={route.key}
            variant="secondary"
            icon={{
              name: options.icon,
              type: "MaterialIcons",
              color: color,
              size: 24,
            }}
            style={{ flex: 1 }}
            onPress={onPress}
          >
            <Typography variant="buttonLabel" style={{ color }}>
              {label}
            </Typography>
          </Button>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    width: "90%",
    borderRadius: 50,
    borderColor: "gray",
    borderWidth: 1,
    alignSelf: "center",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
  },
});
