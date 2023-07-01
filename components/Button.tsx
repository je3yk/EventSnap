import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type ButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

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
