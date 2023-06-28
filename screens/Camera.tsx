import { CameraType, Camera, FlashMode } from "expo-camera";
import { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import Button from "../components/Button";
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import config from "../utils/config";
import * as Brightness from "expo-brightness";

export function CameraScreen({ navigation }) {
  const [type, setType] = useState(CameraType.front);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const [frontFlash, setFrontFlash] = useState(false);
  const [defaultBrightness, setDefaultBrightness] = useState(null);
  const { width, height } = useWindowDimensions();
  const cameraRef = useRef(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      if (
        type === CameraType.front &&
        flashMode === FlashMode.on &&
        isFocused
      ) {
        const brightness = await Brightness.getBrightnessAsync();
        setDefaultBrightness(brightness);
        Brightness.setBrightnessAsync(1);
      } else if (defaultBrightness !== null) {
        setDefaultBrightness(defaultBrightness);
      }
    })();
    return () => {
      if (defaultBrightness !== null) {
        Brightness.setBrightnessAsync(defaultBrightness);
        setDefaultBrightness(null);
      }
    };
  }, [type, flashMode, isFocused]);

  const buttonsContainerPosition = {
    bottom: config.BOTTOM_BAR_HEIGHT + 40,
  };

  const cameraViewPosition = {
    bottom: config.BOTTOM_BAR_HEIGHT + 30,
  };
  const viewHeight = (width * 9) / 16 + cameraViewPosition.bottom;

  if (viewHeight > height) {
    cameraViewPosition.bottom =
      cameraViewPosition.bottom - (viewHeight - height);
  }

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
    const isFrontFlash =
      type === CameraType.front && flashMode === FlashMode.on;
    if (cameraRef) {
      try {
        isFrontFlash && setFrontFlash(true);
        const photoData = await cameraRef.current.takePictureAsync();
        isFrontFlash && setFrontFlash(false);
        navigation.push("photo-edit", { photoData });
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {frontFlash && (
        <View
          style={[
            styles.frontFlash,
            { height: height + config.BOTTOM_BAR_HEIGHT + 40 },
          ]}
        />
      )}
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
  frontFlash: {
    position: "absolute",
    top: 0,
    zIndex: 1,
    width: "100%",
    backgroundColor: "rgba(255,255,255,20)",
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
