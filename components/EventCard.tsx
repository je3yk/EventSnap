import { Dimensions, StyleSheet, View, Image } from "react-native";
import { Typography } from "./Typography";

const flowerCircle = require("../assets/flower-circle-small.png");

const MARGIN = 30;
const { width } = Dimensions.get("window");
const ratio = 1 / 1;
const CARD_WIDTH = width * 0.85;
export const CARD_HEIGHT = CARD_WIDTH * 0.5 + 40; //* ratio;
export const CARD_CONTAINER_HEIGHT = CARD_HEIGHT + MARGIN * 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height: CARD_CONTAINER_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginVertical: MARGIN,
    marginLeft: 30,
    borderRadius: 15,
    shadowRadius: 15,
    shadowOpacity: 0.3,
    elevation: 15,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: "black",
    position: "relative",
  },
  clock: {
    flex: 1,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    left: 30, // CARD_WIDTH / 2 - 30,
    borderRadius: 50,
  },
});

export default function EventCard({ item }) {
  // const [isOpen, setIsOpen] = useState(false);
  return (
    <View style={[styles.container]}>
      <View style={[styles.card]}>
        <Typography variant="h1" style={{ color: "#354396", flex: 1 }}>
          Event title
        </Typography>
        <Typography variant="bodyItalic" style={{ color: "black", flex: 1 }}>
          Some details
        </Typography>
        <View
          style={{
            width: "90%",
            alignItems: "center",
            justifyContent: "center",
            borderTopColor: "lightgray",
            paddingTop: 5,
            borderTopWidth: 1,
            flex: 1,
          }}
        >
          <Typography
            variant="captionSmall"
            style={{
              textAlign: "center",
              color: "gray",
            }}
            numberOfLines={3}
          >
            {item.toast}
          </Typography>
        </View>
      </View>
      <View style={styles.clock}>
        <Image
          source={flowerCircle}
          style={{ width: 90, height: 90, position: "absolute" }}
        />
        <Typography variant="labelSmall">{item.time}</Typography>
      </View>
    </View>
  );
}
