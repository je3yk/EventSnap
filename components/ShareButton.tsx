import React from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "./CameraButton";

export default function ShareButton({ onSelect }) {
  const [shareOptionsVisible, setShareOptionsVisible] = React.useState(false);

  return (
    <TouchableOpacity
      onPress={() => setShareOptionsVisible(!shareOptionsVisible)}
      style={styles.container}
    >
      <MaterialCommunityIcons name="share" size={24} color="#fff" />
      <Text style={styles.text}>Udostępnij</Text>
      {shareOptionsVisible && (
        <View style={styles.shareOptions}>
          <Button
            icon="share-variant-outline"
            title="Share"
            onPress={onSelect}
            variant="normal wrapper"
          />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    position: "relative",
  },
  shareOptions: {
    width: "90%",
    position: "absolute",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    fontSize: 12,
    color: "#fff",
  },
});
