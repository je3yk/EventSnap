import { FlatList, StyleSheet, Text, View } from "react-native";

const TimetableItems = [
  { time: "9:00", label: "Start of the event" },
  { time: "12:00", label: "Something really exciting" },
  { time: "22:00", label: "End of the event" },
];

function ItemComponent({ item }) {
  return (
    <View style={styles.item}>
      <Text style={styles.time}>{item.time}</Text>
      <Text>{item.label}</Text>
    </View>
  );
}

export function TimetableScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={TimetableItems}
        renderItem={({ item }) => {
          return <ItemComponent item={item} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 5,
  },
  item: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: "10px",
  },
  time: {
    minWidth: 50,
    textAlign: "right",
    fontWeight: "700",
  },
});
