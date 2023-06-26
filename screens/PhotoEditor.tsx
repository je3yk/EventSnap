import { View, StyleSheet, ImageBackground } from "react-native";
import Button from "../components/Button";
import NavButton from "../components/NavButton";
import * as MediaLibrary from "expo-media-library";

export function PhotoEditorScreen({ navigation, route }) {
  const { photoData } = route.params;

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
    <View style={styles.container}>
      <ImageBackground
        source={photoData}
        style={styles.imageView}
      ></ImageBackground>
      <View style={styles.controls}>
        <NavButton
          color="#f1f1f1"
          icon="cancel"
          label="Anuluj"
          onPress={() => navigation.pop()}
        />
        <NavButton
          color="#f1f1f1"
          icon="save"
          label="Zapisz"
          onPress={saveImage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2d2d2d",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  controls: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "rgba(0,0,0, 0.4)",
    paddingVertical: 7,
    paddingHorizontal: 5,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-around",
    position: "absolute",
    width: "90%",
    flexDirection: "row",
    bottom: 25,
  },
  imageView: {
    width: "100%",
    aspectRatio: "3/4",
    flexDirection: "column",
  },
});
