import { StyleSheet, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";
import Button, { ProcessingButton } from "../components/Button";
import { Typography } from "../components/Typography";
import { useEffect, useMemo, useState } from "react";
import Input from "../components/Input";

export function AccountScreen() {
  const { user, signOut, updateUserData } = useAuth();
  const { width } = useWindowDimensions();

  const [username, setUsername] = useState<string | null>(null);
  const [draftUsername, setDraftUsername] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  async function onSave() {
    if (draftUsername) {
      await updateUserData({ username: draftUsername });
      setDraftUsername(null);
      setUsername(draftUsername);
    }
  }

  const userEmail = useMemo<string | null>(() => {
    return user?.email;
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <Typography variant="h1" style={{ margin: 20 }}>
        Ustawienia konta
      </Typography>
      <View style={styles.userData}>
        <Input
          onChange={setUsername}
          value={userEmail}
          placeholder=""
          disabled
          label="Adres email"
          style={{ width: width * 0.8 }}
        />
        <Input
          onChange={setDraftUsername}
          value={draftUsername ?? username}
          placeholder="Adam Nowak"
          label="Nazwa użytkownika"
          style={{ width: width * 0.8 }}
        />
        {draftUsername && draftUsername !== username ? (
          <ProcessingButton onPress={onSave} style={{ borderRadius: 25 }}>
            <Typography variant="body" style={{ color: "#fff" }}>
              Zapisz
            </Typography>
          </ProcessingButton>
        ) : null}
      </View>
      <View style={styles.actionButtons}>
        <ProcessingButton onPress={signOut} style={{ borderRadius: 25 }}>
          <Typography variant="body" style={{ color: "#fff" }}>
            Wyloguj się
          </Typography>
        </ProcessingButton>
        <Button
          onPress={signOut}
          style={{ borderRadius: 25, marginTop: 20 }}
          variant="secondary"
        >
          <Typography variant="bodySmall" style={{ color: "#354396" }}>
            Polityka prywatności
          </Typography>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionButtons: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  userData: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
