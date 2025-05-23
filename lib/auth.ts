import { supabase } from "./supabase";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { makeRedirectUri } from "expo-auth-session";

// Configuration pour Expo
WebBrowser.maybeCompleteAuthSession();

export const signInWithGoogle = async () => {
  const redirectUrl = makeRedirectUri({
    scheme: "uberdrip",
    path: "auth/callback",
  });

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectUrl,
    },
  });

  if (error) {
    console.error("Error signing in with Google:", error.message);
    throw error;
  }

  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error.message);
    throw error;
  }
};

export const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    console.error("Error getting user:", error.message);
    return null;
  }
  return user;
};
