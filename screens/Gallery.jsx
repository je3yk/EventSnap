import { StyleSheet, Text, View } from "react-native";

export function GalleryScreen() {
  return (
    <View style={styles.container}>
      <Text>Gallery screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
