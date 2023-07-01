import React, { useEffect } from "react";
import * as Font from "expo-font";

export default function useFonts() {
  const [fontsLoaded] = Font.useFonts({
    dancingScript: require("../assets/fonts/DancingScript-Regular.ttf"),
    dancingScriptBold: require("../assets/fonts/DancingScript-Bold.ttf"),
    cormorantGaramond: require("../assets/fonts/CormorantGaramond-Light.ttf"),
    cormorantGaramondItalic: require("../assets/fonts/CormorantGaramond-LightItalic.ttf"),
  });

  return fontsLoaded;
}
