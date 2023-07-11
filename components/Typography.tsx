import { Text, StyleSheet, TextStyle, StyleProp } from "react-native";

type variants = keyof typeof typographyStyles;

type TypographyProps = {
  children: React.ReactNode;
  variant: variants;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
};

export function Typography({
  children,
  style,
  variant,
  numberOfLines = 0,
}: TypographyProps) {
  return (
    <Text
      style={StyleSheet.flatten([typographyStyles[variant], style])}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
}

const typographyStyles = StyleSheet.create({
  h1: {
    fontSize: 40,
    lineHeight: 48,
    fontFamily: "dancingScriptBold",
  },
  label: {
    fontSize: 14,
    lineHeight: 28,
    fontFamily: "dancingScript",
  },
  labelSmall: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: "dancingScript",
  },
  body: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: "cormorantGaramond",
  },
  bodySmall: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "cormorantGaramond",
  },
  bodyItalic: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "cormorantGaramondItalic",
  },
  caption: {
    fontSize: 18,
    lineHeight: 20,
    fontFamily: "dancingScript",
  },
  captionSmall: {
    fontSize: 14,
    lineHeight: 16,
    fontFamily: "dancingScript",
  },
  buttonLabel: {
    fontSize: 10,
    lineHeight: 12,
  },
});
