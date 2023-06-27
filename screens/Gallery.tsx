import { useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { Dimensions } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import config from "../utils/config";

export function GalleryScreen() {
  const [images, setImages] = useState([]);
  const isFocused = useIsFocused();

  const IMAGE_SIZE = useMemo(() => {
    return config.WIDTH / 3 - 2;
  }, []);

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
    <SafeAreaView style={styles.container}>
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
            <TouchableOpacity
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
            </TouchableOpacity>
          );
        }}
        numColumns={3}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
