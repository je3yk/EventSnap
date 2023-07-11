import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  View,
  TextInput,
  TextStyle,
} from "react-native";
import { Typography } from "./Typography";

type InputProps = {
  value: string;
  placeholder: string;
  disabled?: boolean;
  disableUnderline?: boolean;
  onChange: (value: string) => void;
  label?: string | null;
  keyboardType?: "default" | "numeric" | "email-address";
  style?: StyleProp<ViewStyle>;
  textFieldStyle?: StyleProp<TextStyle>;
  numberOfLines?: number;
  maxLength?: number;
};

export default function Input(props: InputProps) {
  return (
    <View style={[styles.container, props.style]}>
      {props.label && (
        <Typography variant="bodySmall" style={styles.label}>
          {props.label}
        </Typography>
      )}
      <TextInput
        editable={!props.disabled}
        value={props.value}
        onChangeText={props.onChange}
        style={[
          styles.input,
          props.textFieldStyle,
          !props.disableUnderline && styles.underline,
          props.disabled && styles.disabledInput,
        ]}
        numberOfLines={props.numberOfLines ?? 1}
        autoCapitalize="none"
        maxLength={props.maxLength ?? undefined}
        placeholder={props.placeholder}
        keyboardType={props.keyboardType ?? "default"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    alignItems: "flex-start",
    width: "100%",
  },
  label: {
    color: "#354396",
    paddingHorizontal: 5,
  },
  input: {
    fontSize: 18,
    lineHeight: 24,
    padding: 5,
    width: "100%",
  },
  disabledInput: {
    color: "gray",
    fontSize: 18,
  },
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: "#354396",
  },
});
