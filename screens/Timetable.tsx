import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { MotiView } from "moti";

const TimetableItems = [
  { time: "9:00", label: "Start of the event" },
  { time: "12:00", label: "Something really exciting" },
  { time: "22:00", label: "End of the event" },
];

// function ItemComponent({ item }) {
//   return (
//     <View style={styles.item}>
//       <Text style={styles.time}>{item.time}</Text>
//       <Text>{item.label}</Text>
//     </View>
//   );
// }

function Shape() {
  return (
    <MotiView
      from={{
        opacity: 0,
        scale: 0.5,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        type: "timing",
      }}
      style={styles.shape}
    />
  );
}

export function TimetableScreen() {
  const [visible, toggle] = useState(false);
  return (
    <Pressable onPress={() => toggle(!visible)} style={styles.container}>
      {visible && <Shape />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  // item: {
  //   backgroundColor: "#fff",
  //   padding: 10,
  //   marginVertical: 10,
  //   flexDirection: "row",
  //   alignItems: "flex-start",
  //   gap: 10,
  // },
  shape: {
    justifyContent: "center",
    height: 250,
    width: 250,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "green",
  },
  time: {
    minWidth: 50,
    textAlign: "right",
    fontWeight: "700",
  },
});
