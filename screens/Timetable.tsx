import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import EventCard, {
  CARD_CONTAINER_HEIGHT,
  CARD_HEIGHT,
} from "../components/EventCard";
import React from "react";

const Data = Array.from({ length: 12 }).map((_, index) => ({
  key: `data-key-${index}`,
  label: `Event ${index}`,
  time: `${index}:00`,
  toast:
    "Wypijmy za to, aby Młoda Para miała tyle zmartwień.\nIle kropli pozostanie w naszych kieliszkach",
}));

export function TimetableScreen() {
  const { height } = useWindowDimensions();
  const scrollRef = React.useRef<ScrollView>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        y: CARD_CONTAINER_HEIGHT * 5 - CARD_CONTAINER_HEIGHT / 2,
        animated: true,
      });
    }
  }, [scrollRef]);

  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        snapToInterval={CARD_CONTAINER_HEIGHT}
        decelerationRate={"fast"}
        contentContainerStyle={{
          paddingTop: height / 2 - CARD_HEIGHT,
          paddingBottom: height / 2 - CARD_HEIGHT,
        }}
      >
        {Data.map((item) => (
          <EventCard item={item} key={item.key} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
