import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

export default function useSessionToken() {
  const [session, setSession] = useState<Session | null>(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return {
    hasSession: !!session,
    fetchingSession: session === undefined,
    session,
  };
}
