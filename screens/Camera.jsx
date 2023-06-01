import { StyleSheet, Text, View } from "react-native";

export function CameraScreen() {
  return (
    <View style={styles.container}>
      <Text>Camera screen</Text>
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
