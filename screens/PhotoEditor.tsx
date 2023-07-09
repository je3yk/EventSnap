import { View, StyleSheet, ImageBackground } from "react-native";
import NavButton from "../components/NavButton";
import * as MediaLibrary from "expo-media-library";
import { SafeAreaView } from "react-native-safe-area-context";
import config from "../utils/config";
import React, { useState } from "react";
import ImageView, { CARD_HEIGHT, CARD_WIDTH } from "../components/ImageView";
import { captureRef } from "react-native-view-shot";

export function PhotoEditorScreen({ navigation, route }) {
  const [hideCaption, setHideCaption] = useState(false);
  const { photoData } = route.params;
  const imageRef = React.useRef(null);

  const imageViewPosition = {
    bottom: config.BOTTOM_BAR_HEIGHT + 10,
  };

  // async function using expo-media-library for saving image
  async function saveImage() {
    try {
      const asset = await MediaLibrary.createAssetAsync(photoData.uri);
      const album = await MediaLibrary.getAlbumAsync("EventSnapsOriginals");
      if (album) {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album.id);
      } else {
        await MediaLibrary.createAlbumAsync("EventSnapsOriginals", asset);
      }
    } catch (error) {
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
  }

  async function onSave() {
    try {
      await Promise.all([saveImage(), saveCard()]);
      alert("Image saved!");
    } catch (error) {
      alert("Something went wrong");
      console.error(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        ref={imageRef}
        collapsable={false}
        style={[{ height: CARD_HEIGHT, width: CARD_WIDTH }]}
      >
        <ImageView source={photoData} hideCaption={hideCaption} />
      </View>
      <View style={styles.controls}>
        <NavButton
          color="#f1f1f1"
          icon="cancel"
          label="Anuluj"
          onPress={() => navigation.pop()}
        />
        {/* <ShareButton onSelect={() => console.log("option selected")} /> */}
        <NavButton
          color="#354396"
          icon="send"
          label="Wyślij"
          onPress={onSave}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(45,45,45)",
    position: "relative",
    alignItems: "center",
  },
  controls: {
    padding: 5,
    backgroundColor: "rgba(0,0,0,0.4)",
    flexDirection: "row",
    width: "90%",
    borderRadius: 50,
    borderColor: "gray",
    borderWidth: 1,
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 25,
  },
});
