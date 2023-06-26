import { useEffect, useState } from "react";
import { StyleSheet, FlatList, View, Image } from "react-native";
import { Dimensions } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { useIsFocused } from "@react-navigation/native";

const IMAGE_SIZE = Dimensions.get("window").width / 3;

export function GalleryScreen() {
  const [images, setImages] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchPhotos() {
      const album = await MediaLibrary.getAlbumAsync("EventSnaps");
      const { assets } = await MediaLibrary.getAssetsAsync({ album });
      if (assets.length !== images.length) {
        setImages(assets);
      }
    }

    void fetchPhotos();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 2 }}
        columnWrapperStyle={{ gap: 2 }}
        renderItem={({ item }) => {
          if (!item.uri) {
            return null;
          }

          return (
            <View
              style={{
                width: IMAGE_SIZE,
                height: IMAGE_SIZE,
              }}
            >
              <Image
                source={{
                  uri: item.uri,
                  width: IMAGE_SIZE,
                  height: IMAGE_SIZE,
                }}
              />
            </View>
          );
        }}
        numColumns={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 60,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
