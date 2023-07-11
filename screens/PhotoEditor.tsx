import { View, StyleSheet } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { SafeAreaView } from "react-native-safe-area-context";
import config from "../utils/config";
import React from "react";
import ImageView, { CARD_HEIGHT, CARD_WIDTH } from "../components/ImageView";
import { captureRef } from "react-native-view-shot";
import Button, { ProcessingButton } from "../components/Button";
import { Typography } from "../components/Typography";
import useStorage from "../hooks/useStorage";

export function PhotoEditorScreen({ navigation, route }) {
  const { uploadPhoto } = useStorage();
  const { photoData } = route.params;
  const imageRef = React.useRef(null);

  const imageViewPosition = {
    bottom: config.BOTTOM_BAR_HEIGHT + 10,
  };

  // async function using expo-media-library for saving image
  async function sendImage() {
    try {
      const formData = new FormData();
      formData.append("file", photoData);

      await uploadPhoto(formData);
      alert("File sent");
    } catch (error) {
      alert("Some error");
      throw error;
    }
    navigation.pop();
  }

  async function saveCard() {
    try {
      const localUri = await captureRef(imageRef, {
        quality: 1,
        height: CARD_HEIGHT - 60,
      });
      const asset = await MediaLibrary.createAssetAsync(localUri);
      const album = await MediaLibrary.getAlbumAsync("EventSnaps");
      if (album) {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album.id);
      } else {
        await MediaLibrary.createAlbumAsync("EventSnaps", asset);
      }
    } catch (error) {
      throw error;
    }
    alert("Zdjęcie zostało zapisane na Twoim urządzeniu");
  }

  async function onSend() {
    try {
      await Promise.all([sendImage()]);
      alert("Image saved!");
    } catch (error) {
      alert("Something went wrong");
      console.error(error);
    }
  }

  function onShare() {
    alert("onShare clicked!");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        ref={imageRef}
        collapsable={false}
        style={[{ height: CARD_HEIGHT, width: CARD_WIDTH }]}
      >
        <ImageView source={photoData} />
      </View>
      <View style={styles.controls}>
        <Button
          variant="secondary"
          icon={{
            type: "MaterialIcons",
            name: "cancel",
            color: "#f1f1f1",
            size: 24,
          }}
          style={{ flex: 1 }}
          onPress={() => navigation.pop()}
        >
          <Typography variant="buttonLabel" style={{ color: "#f1f1f1" }}>
            Anuluj
          </Typography>
        </Button>
        {/* <ShareButton onSelect={() => console.log("option selected")} /> */}
        <ProcessingButton
          variant="secondary"
          icon={{
            type: "MaterialCommunity",
            name: "download",
            color: "#f1f1f1",
            size: 24,
          }}
          style={{ flex: 1, flexDirection: "column" }}
          onPress={saveCard}
        >
          <Typography variant="buttonLabel" style={{ color: "#f1f1f1" }}>
            Pobierz
          </Typography>
        </ProcessingButton>
        <Button
          variant="secondary"
          icon={{
            type: "MaterialIcons",
            name: "share",
            color: "#f1f1f1",
            size: 24,
          }}
          style={{ flex: 1 }}
          onPress={onShare}
        >
          <Typography variant="buttonLabel" style={{ color: "#f1f1f1" }}>
            Udostępnij
          </Typography>
        </Button>
        <Button
          variant="secondary"
          icon={{
            type: "MaterialCommunity",
            name: "send",
            color: "#f1f1f1",
            size: 24,
          }}
          style={{ flex: 1 }}
          onPress={onSend}
        >
          <Typography variant="buttonLabel" style={{ color: "#f1f1f1" }}>
            Wyslij
          </Typography>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(45,45,45)",
    alignItems: "center",
  },
  controls: {
    backgroundColor: "rgba(0,0,0, 0.4)",
    flexDirection: "row",
    width: "90%",
    borderRadius: 50,
    borderColor: "gray",
    borderWidth: 1,
    alignSelf: "center",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
  },
});
