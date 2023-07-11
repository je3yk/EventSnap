import {
  StyleSheet,
  View,
  Image,
  ViewStyle,
  StyleProp,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import Input from "./Input";
import { useState } from "react";

type ImageViewProps = {
  source: { uri: string };
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ViewStyle>;
};

const logo = require("../assets/adaptive-icon.png");

const width = Dimensions.get("window").width;

export const CARD_WIDTH = width * 0.95;
export const CARD_HEIGHT = (CARD_WIDTH * 16) / 9 + 60;
const IMAGE_WIDTH = CARD_WIDTH - 20;
const IMAGE_HEIGHT = (IMAGE_WIDTH * 16) / 9;

export default function ImageView(props: ImageViewProps) {
  const [caption, setCaption] = useState(
    "Wszystkiego najlpeszego Młodej Parze!"
  );

  return (
    <View style={[styles.card, { width: CARD_WIDTH, height: CARD_HEIGHT }]}>
      <ImageBackground
        source={props.source}
        style={StyleSheet.flatten([
          styles.imageView,
          { width: IMAGE_WIDTH, height: IMAGE_HEIGHT },
        ])}
        resizeMethod="scale"
      >
        <View style={styles.logoStamp}>
          <Image
            source={logo}
            style={{
              width: 80,
              height: 80,
            }}
          />
        </View>
      </ImageBackground>
      <KeyboardAvoidingView
        behavior="position"
        contentContainerStyle={{
          width: CARD_WIDTH,
          height: 60,
        }}
      >
        <Input
          placeholder=""
          onChange={setCaption}
          value={caption}
          disableUnderline
          maxLength={100}
          style={{}}
          textFieldStyle={{
            lineHeight: 26,
            fontSize: 22,
            fontFamily: "dancingScript",
            textAlign: "center",
            color: "#354396",
          }}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    padding: 10,
  },
  imageView: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  logoStamp: {
    width: 100,
    height: 100,
    borderRadius: 50,
    shadowRadius: 10,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    backgroundColor: "white",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    bottom: -55,
    marginBottom: 30,
  },
});
