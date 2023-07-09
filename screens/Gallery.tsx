import { useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  FlatList,
  Image,
  useWindowDimensions,
  View,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

export function GalleryScreen() {
  const [images, setImages] = useState([]);
  const isFocused = useIsFocused();
  const { width, height } = useWindowDimensions();

  const IMAGE_SIZE = useMemo(() => {
    return width / 3;
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
        showsVerticalScrollIndicator={false}
        numColumns={3}
        renderItem={({ item }) => {
          if (!item.uri) {
            return null;
          }

          return (
            <View style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}>
              <Image
                source={{
                  uri: item.uri,
                  width: IMAGE_SIZE,
                  height: IMAGE_SIZE,
                }}
                style={{
                  resizeMode: "cover",
                }}
              />
            </View>
          );
        }}
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
