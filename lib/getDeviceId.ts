import * as SecureStore from "expo-secure-store";
import { v4 as uuidv4 } from "uuid";

export async function getDeviceId(regenerate = false) {
  const storedUuid = await SecureStore.getItemAsync("deviceId");

  if (storedUuid && !regenerate) {
    return storedUuid;
  }

  const newUuid = uuidv4();

  await SecureStore.setItemAsync("deviceId", newUuid);

  return newUuid;
}
