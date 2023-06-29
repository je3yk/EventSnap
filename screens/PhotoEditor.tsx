import { View, StyleSheet, ImageBackground } from "react-native";
import Button from "../components/Button";
import NavButton from "../components/NavButton";
import * as MediaLibrary from "expo-media-library";
import { SafeAreaView } from "react-native-safe-area-context";
import config from "../utils/config";
import ShareButton from "../components/ShareButton";

export function PhotoEditorScreen({ navigation, route }) {
  const { photoData } = route.params;

  const imageViewPosition = {
    bottom: config.BOTTOM_BAR_HEIGHT + 30,
  };

  // async function using expo-media-library for saving image
  async function saveImage() {
    const asset = await MediaLibrary.createAssetAsync(photoData.uri);
    const album = await MediaLibrary.getAlbumAsync("EventSnaps");
    try {
      if (album) {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album.id);
      } else {
        await MediaLibrary.createAlbumAsync("EventSnaps", asset);
      }
      alert("Image saved!");
    } catch (error) {
      alert("Something went wrong");
      console.error(error);
    }
    navigation.pop();
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={photoData}
        style={[styles.imageView, imageViewPosition]}
      ></ImageBackground>
      <View style={styles.controls}>
        <NavButton
          color="#f1f1f1"
          icon="cancel"
          label="Anuluj"
          onPress={() => navigation.pop()}
        />
        <ShareButton onSelect={() => console.log("option selected")} />
        <NavButton
          color="#ff00ff"
          icon="send"
          label="Wyślij do galerii"
          onPress={saveImage}
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
  imageView: {
    width: "100%",
    aspectRatio: "9/16",
    position: "absolute",
  },
});
