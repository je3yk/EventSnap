import { CameraType, Camera, FlashMode } from "expo-camera";
import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../components/Button";
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import config from "../utils/config";

export function CameraScreen({ navigation }) {
  const [type, setType] = useState(CameraType.front);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const cameraRef = useRef(null);
  const isFocused = useIsFocused();

  const buttonsContainerPosition = {
    bottom: config.BOTTOM_BAR_HEIGHT + 40,
  };

  const cameraViewPosition = {
    bottom: config.BOTTOM_BAR_HEIGHT + 30,
  };

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.front ? CameraType.back : CameraType.front
    );
  }

  function toggleFlashMode() {
    setFlashMode((current) =>
      current === FlashMode.off ? FlashMode.on : FlashMode.off
    );
  }

  async function takePicture() {
    if (cameraRef) {
      try {
        const photoData = await cameraRef.current.takePictureAsync();
        navigation.push("photo-edit", { photoData });
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.cameraContainer, cameraViewPosition]}>
        {isFocused && (
          <Camera
            ref={cameraRef}
            style={styles.camera}
            type={type}
            flashMode={flashMode}
            ratio="16:9"
          ></Camera>
        )}
      </View>
      <View style={[styles.buttonContainer, buttonsContainerPosition]}>
        <Button
          variant="normal wrapper"
          icon="camera-flip-outline"
          onPress={toggleCameraType}
        />
        <Button
          icon="camera"
          iconType="MaterialIcons"
          onPress={takePicture}
          variant="big wrapper"
        />
        <Button
          variant="normal wrapper"
          icon={flashMode === FlashMode.on ? "flash-off" : "flash"}
          onPress={toggleFlashMode}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(45, 45, 45)",
    justifyContent: "flex-start",
    position: "relative",
  },
  cameraContainer: {
    width: "100%",
    borderRadius: 30,
    position: "absolute",
  },
  camera: {
    width: "100%",
    aspectRatio: "9/16",
  },
  buttonContainer: {
    width: "90%",
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
  },
});
