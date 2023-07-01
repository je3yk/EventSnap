import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity, Text } from "react-native";

export default function NavButton({
  isFocused = false,
  label = null,
  onPress,
  color,
  icon,
}) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={label}
      style={{ alignItems: "center", flex: 1 }}
      onPress={onPress}
    >
      <MaterialIcons name={icon} color={color} size={24} />
      {label && <Text style={{ fontSize: 12, color }}>{label}</Text>}
    </TouchableOpacity>
  );
}
