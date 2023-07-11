import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

export default function useStorage() {
  const { user } = useAuth();

  async function uploadPhoto(fileData) {
    console.log("uploadPhoto", user, fileData);
    if (!user) {
      throw new Error("Musisz być zalogowany, żeby móc wgrać zdjęcie");
    }

    const filePath = `public/${user.id}.png`;
    try {
      const { data, error } = await supabase.storage
        .from("event-images")
        .upload(filePath, fileData, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error(error);
        throw error;
      }

      console.log("uplad-results", data);
    } catch (err) {
      console.log("uploadError", err);
      throw err;
    }
  }

  return {
    uploadPhoto,
  };
}
