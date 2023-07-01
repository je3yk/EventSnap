import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import { Typography } from "../components/Typography";

export function AccountScreen() {
  const { user, signOut } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <Typography variant="body">{JSON.stringify(user)}</Typography>
      <Button onPress={signOut} style={{ borderRadius: 25 }}>
        <Typography variant="body" style={{ color: "#fff" }}>
          Wyloguj się
        </Typography>
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
