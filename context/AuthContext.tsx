import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import useSessionToken from "../hooks/useSessionToken";

type AuthContextType = {
  user: Record<string, unknown> | null;
  hasSession: boolean;
  sendVerificationCode: (email: string) => Promise<void>;
  setAuthorizationPayload: (email: string, token: string) => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState(null);
  const { session, hasSession, fetchingSession } = useSessionToken();

  useEffect(() => {
    async function getUser() {
      try {
        const { data, error, status } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session?.user.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }
        setUser({ ...data, email: session?.user.email });
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        }
      }
    }

    if (hasSession) {
      void getUser();
    }
  }, [hasSession, user, session]);

  async function sendVerificationCode(email) {
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      throw error;
    }
  }

  async function setAuthorizationPayload(email, token) {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });

    if (error) {
      throw error;
    }
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error signing out:", error.message);
    }
  }

  if (!!fetchingSession) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        hasSession,
        sendVerificationCode,
        setAuthorizationPayload,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("AuthProvider is missing");
  }

  return context;
}
