import { CameraType, Camera, FlashMode } from "expo-camera";
import { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View, useWindowDimensions, Image } from "react-native";
import CameraButton from "../components/CameraButton";
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import config from "../utils/config";
import * as Brightness from "expo-brightness";
import * as ImagePicker from "expo-image-picker";

const frontFlashFrame = require("../assets/flashFrame.png");

export function CameraScreen({ navigation }) {
  const [type, setType] = useState(CameraType.front);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const [defaultBrightness, setDefaultBrightness] = useState(null);
  const { width, height } = useWindowDimensions();
  const cameraRef = useRef(null);
  const isFocused = useIsFocused();

  const frontFlash = useMemo(() => {
    return flashMode === FlashMode.on && type === CameraType.front;
  }, [flashMode, type]);

  useEffect(() => {
    (async () => {
      if (frontFlash) {
        const brightness = await Brightness.getBrightnessAsync();
        setDefaultBrightness(brightness);
        await Brightness.setBrightnessAsync(1);
      } else if (defaultBrightness !== null) {
        await Brightness.setBrightnessAsync(defaultBrightness);
        setDefaultBrightness(null);
      }
    })();
  }, [frontFlash]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", async () => {
      if (flashMode === FlashMode.on) {
        toggleFlashMode();
      }
    });

    return unsubscribe;
  }, [navigation, flashMode]);

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
    if (cameraRef) {
      try {
        const photoData = await cameraRef.current.takePictureAsync();
        navigation.push("photoEditor", { photoData });
      } catch (e) {
        console.log(e);
      }
    }
  }

  async function pickImageAsync() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.canceled) {
      navigation.push("photoEditor", { photoData: result.assets[0] });
    } else {
      alert("You need to pick an image");
    }
  }

  return (
    <SafeAreaView
      style={[styles.container, frontFlash ? { backgroundColor: "#fff" } : {}]}
    >
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
        {frontFlash && (
          <Image source={frontFlashFrame} style={styles.frontFlash} />
        )}
        <View style={[styles.toolbarContainer]}>
          <CameraButton
            variant="normal wrapper"
            icon={flashMode === FlashMode.on ? "flash-off" : "flash"}
            onPress={toggleFlashMode}
          />
        </View>
      </View>
      <View style={[styles.buttonContainer, buttonsContainerPosition]}>
        <CameraButton
          icon="images"
          iconType="FontAwesome"
          onPress={pickImageAsync}
          variant="normal wrapper"
        />
        <CameraButton
          icon="camera"
          iconType="MaterialIcons"
          onPress={takePicture}
          variant="big wrapper"
        />
        <CameraButton
          variant="normal wrapper"
          icon="camera-flip-outline"
          onPress={toggleCameraType}
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
    width: "100%",
    height: "100%",
    position: "absolute",
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
  toolbarContainer: {
    width: "20%",
    backgroundColor: "transparent",
    position: "absolute",
    right: 0,
    top: 20,
  },
});
