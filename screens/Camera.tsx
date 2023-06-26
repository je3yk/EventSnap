import { CameraType, Camera, FlashMode } from "expo-camera";
import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../components/Button";
import { useIsFocused } from "@react-navigation/native";

export function CameraScreen({ navigation }) {
  const [type, setType] = useState(CameraType.back);
  const [isReady, setCameraReady] = useState(false);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const cameraRef = useRef(null);
  const isFocused = useIsFocused();

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  function toggleFlashMode() {
    setFlashMode((current) =>
      current === FlashMode.off ? FlashMode.on : FlashMode.off
    );
  }

  async function takePicture() {
    setCameraReady(false);
    if (cameraRef) {
      try {
        const photoData = await cameraRef.current.takePictureAsync();
        navigation.push("photo-edit", { photoData });
      } catch (e) {
        console.log(e);
      }
    }
    setCameraReady(true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        {isFocused && (
          <Camera
            ref={cameraRef}
            style={styles.camera}
            type={type}
            flashMode={flashMode}
            ratio="4:3"
            onCameraReady={() => setCameraReady(true)}
          ></Camera>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button icon="camera-flip-outline" onPress={toggleCameraType} />
        <Button
          icon="camera"
          iconType="MaterialIcons"
          onPress={takePicture}
          variant="big"
        />
        <Button
          icon={flashMode === FlashMode.on ? "flash-off" : "flash"}
          onPress={toggleFlashMode}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2d2d2d",
    justifyContent: "flex-start",
    position: "relative",
  },
  cameraContainer: {
    width: "100%",
    borderRadius: 30,
    marginTop: 80,
  },
  camera: {
    width: "100%",
    aspectRatio: "3/4",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  buttonContainer: {
    width: "90%",
    backgroundColor: "transparent",
    flexDirection: "row",
    padding: 10,
    bottom: 85,
    justifyContent: "space-between",
    alignItems: "flex-end",
    alignSelf: "center",
    position: "absolute",
  },
});
