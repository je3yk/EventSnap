import * as React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";

const variants = {
  normal: {
    padding: 10,
  },
  big: {
    padding: 1,
  },
  wrapper: {
    borderRadius: 50,
    backgroundColor: "rgba(0,0,0, 0.4)",
    borderColor: "rgba(125,125,125,0.8)",
    borderWidth: 1,
  },
};

type CameraButtonProps = {
  title?: string;
  onPress: () => void;
  iconType?: "MaterialCommunity" | "MaterialIcons" | "FontAwesome";
  buttonStyle?: StyleProp<ViewStyle>;
  color?: string;
  backgroundColor?: string;
  disabled?: boolean;
  variant: string;
  icon: string;
};

const iconComponents = {
  MaterialCommunity: MaterialCommunityIcons,
  MaterialIcons: MaterialIcons,
  FontAwesome: FontAwesome5,
};

export default function CameraButton({
  title = null,
  onPress,
  icon,
  iconType = "MaterialCommunity",
  color = "#fff",
  disabled = false,
  variant,
}: CameraButtonProps) {
  const wrapperStyles = variant.split(" ").map((v) => variants[v]);
  const iconSize = variant.includes("normal") ? 32 : 64;

  const IconComponent = iconComponents[iconType];

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={styles.button}
    >
      <View
        style={[
          { alignItems: "center", justifyContent: "center" },
          wrapperStyles,
        ]}
      >
        <IconComponent name={icon} size={iconSize} color={color} />
        {title && <Text style={{ ...styles.text, color: color }}>{title}</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
