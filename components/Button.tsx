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
};

type ProcessingButtonProps = ButtonProps & { onPress: () => Promise<void> };

export function ProcessingButton(props: ButtonProps) {
  const [processing, setProcessing] = useState(false);

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
        props.style,
        { flexDirection: "row" },
      ])}
    >
      {processing && (
        <ActivityIndicator
          animating={processing}
          size="small"
          color={props.variant === "secondary" ? "#354396" : "#fff"}
        />
      )}
      {props.children}
    </TouchableOpacity>
  );
}

export default function Button(props: ButtonProps) {
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
  secondary: {
    color: "#354396",
    borderColor: "#354396",
  },
});
