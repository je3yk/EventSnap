import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  useWindowDimensions,
  Image,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { Typography } from "../components/Typography";
import { useMemo, useState } from "react";
import Button from "../components/Button";

const appIcon = require("../assets/adaptive-icon.png");

type StepProps = {
  state: "enterEmail" | "enterCode" | "success";
  style?: StyleProp<ViewStyle>;
  onContinue: (...params: any) => void;
  onRetry?: (...params: any) => void;
};

const EnterEmail = ({ state, style = {}, onContinue }: StepProps) => {
  const [email, setEmail] = useState<string | null>(null);
  return (
    <View style={[style, { alignItems: "center" }]}>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
        placeholder="jedrzej.zawojski@gmail.com"
      />
      {state === "enterEmail" && (
        <Button
          onPress={() => {
            onContinue(email);
          }}
          style={styles.button}
        >
          <Typography variant="body" style={{ color: "#fff" }}>
            Wyslij kod weryfikacyjny
          </Typography>
        </Button>
      )}
    </View>
  );
};

const EnterCode = ({ state, style = {}, onContinue, onRetry }: StepProps) => {
  const [code, setCode] = useState<string | null>(null);
  return (
    <View style={[style, { alignItems: "center" }]}>
      <TextInput
        style={styles.input}
        onChangeText={setCode}
        value={code}
        autoCapitalize="none"
        placeholder="123456"
        keyboardType="numeric"
      />
      {state === "enterCode" && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Button onPress={() => onRetry()} variant="secondary">
            <Typography variant="body" style={{ color: "#354396" }}>
              Wyślij ponownie
            </Typography>
          </Button>
          <Button
            onPress={() => {
              onContinue(code);
            }}
            style={styles.button}
          >
            <Typography variant="body" style={{ color: "#fff" }}>
              Zaloguj się
            </Typography>
          </Button>
        </View>
      )}
    </View>
  );
};

export function AuthScreen() {
  const { sendVerificationCode, setAuthorizationPayload } = useAuth();
  const [email, setEmail] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const [loginState, setLoginState] = useState<
    "enterEmail" | "enterCode" | "success"
  >("enterEmail");

  const { width } = useWindowDimensions();

  const logoWidth = width * 0.6;

  const instruction = useMemo(() => {
    switch (loginState) {
      case "enterEmail":
        return "Podaj adres email, aby się zalogować";
      case "enterCode":
        return "Podaj kod, który otrzymałeś na podany email";
      case "success":
        return "Zalogowano pomyślnie";
    }
  }, [loginState]);

  const sendOtp = async (email) => {
    if (!email) {
      return null;
    }

    setEmail(email);

    try {
      await sendVerificationCode(email);
      setLoginState("enterCode");
    } catch (error) {
      alert(`${loginState} ${error.message}`);
      setAuthError(error.message);
    }
  };

  const onAuthorize = async (token) => {
    if (!token) {
      return null;
    }

    try {
      await setAuthorizationPayload(email, token);
      setLoginState("success");
    } catch (error) {
      alert(`${loginState} ${error.message}`);
      setAuthError(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={appIcon}
        style={{ width: logoWidth, height: logoWidth, marginVertical: 10 }}
      />
      <Typography variant="h1">Witaj</Typography>
      <Typography variant="body" style={{ marginTop: 10 }}>
        {instruction}
      </Typography>

      <EnterEmail
        state={loginState}
        onContinue={sendOtp}
        style={{ width: width * 0.8 }}
      />
      {loginState === "enterCode" && (
        <EnterCode
          state={loginState}
          onContinue={onAuthorize}
          onRetry={sendOtp}
          style={{ width: width * 0.8 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  input: {
    marginVertical: 20,
    fontSize: 20,
    lineHeight: 24,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    textAlign: "center",
    paddingBottom: 5,
    paddingHorizontal: 5,
    width: "100%",
  },
  button: {
    borderRadius: 25,
  },
});
