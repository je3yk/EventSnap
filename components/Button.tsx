import * as React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

export default function Button({
  title = null,
  onPress,
  icon,
  iconType = "MaterialCommunity",
  buttonStyle = { color: "#f1f1f1" },
  disabled = false,
  variant = "normal",
}) {
  const IconComponent =
    iconType === "MaterialCommunity" ? MaterialCommunityIcons : MaterialIcons;
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,
        variant === "normal" ? styles.normalButton : styles.bigButton,
      ]}
    >
      <IconComponent
        name={icon}
        size={variant === "normal" ? 32 : 64}
        color={buttonStyle.color}
      />
      {title && (
        <Text style={{ ...styles.text, color: buttonStyle.color }}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  normalButton: {
    height: 40,
  },
  bigButton: {
    height: 80,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
