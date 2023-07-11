import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useState } from "react";
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type ButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  icon?: {
    type?: "MaterialCommunity" | "MaterialIcons" | "FontAwesome";
    name?: string;
    size?: number;
    color?: string;
  };
};

type ProcessingButtonProps = ButtonProps & { onPress: () => Promise<void> };

const iconComponents = {
  MaterialCommunity: MaterialCommunityIcons,
  MaterialIcons: MaterialIcons,
  FontAwesome: FontAwesome5,
};

export function ProcessingButton(props: ProcessingButtonProps) {
  const [processing, setProcessing] = useState(false);

  const { icon } = props;
  const IconComponent = icon ? iconComponents[props.icon.type] : null;

  async function onPress() {
    setProcessing(true);
    try {
      await props.onPress();
      setProcessing(false);
    } catch (error) {
      setProcessing(false);
      throw error;
    }
  }

  return (
    <TouchableOpacity
      disabled={processing || props.disabled}
      onPress={onPress}
      style={StyleSheet.flatten([
        styles.button,
        styles[props.variant ?? "primary"],
        { flexDirection: "row" },
        props.style,
      ])}
    >
      {processing ? (
        <ActivityIndicator
          animating={processing}
          size="small"
          color={props.variant === "secondary" ? "#354396" : "#fff"}
        />
      ) : (
        IconComponent && (
          <IconComponent name={icon.name} color={icon.color} size={icon.size} />
        )
      )}
      {props.children}
    </TouchableOpacity>
  );
}

export default function Button(props: ButtonProps) {
  const { icon } = props;
  const IconComponent = icon ? iconComponents[props.icon.type] : null;

  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={props.onPress}
      style={StyleSheet.flatten([
        styles.button,
        styles[props.variant ?? "primary"],
        props.style,
      ])}
    >
      {IconComponent && (
        <IconComponent name={icon.name} color={icon.color} size={icon.size} />
      )}
      {props.children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    paddingHorizontal: 15,
  },
  primary: {
    backgroundColor: "#354396",
  },
  secondary: {},
});
