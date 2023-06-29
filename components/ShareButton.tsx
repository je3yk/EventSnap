import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "./Button";
import { MotiView } from "moti";

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
        <MotiView
          from={{
            opacity: 0,
            bottom: 0,
          }}
          animate={{
            opacity: 1,
            bottom: 60,
          }}
          transition={{
            type: "timing",
          }}
          style={styles.shareOptions}
        >
          <Button
            icon="share"
            title="Share"
            onPress={onSelect}
            variant="normal"
          />
        </MotiView>
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
    backgroundColor: "#000",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 50,
    borderColor: "#fff",
    borderWidth: 1,
  },
  text: {
    fontSize: 12,
    color: "#fff",
  },
});
