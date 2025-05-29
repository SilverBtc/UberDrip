import { supabase } from "./supabase";
import { Platform, Alert, Linking } from "react-native";

export async function signInWithGoogle() {
  try {
    if (Platform.OS === "web") {
      // Get the current domain for redirect
      const currentDomain = typeof window !== 'undefined' 
        ? window.location.origin 
        : process.env.EXPO_PUBLIC_APP_URL || 'https://uberdrip.pages.dev';
      
      // Pour le web, utiliser la redirection avec le bon domaine
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${currentDomain}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
      if (error) throw error;
      return data;
    } else {
      // Pour React Native, on ouvre le navigateur externe
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "uberdrip://auth/callback",
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) throw error;

      // Ouvrir l'URL dans le navigateur
      if (data.url) {
        const supported = await Linking.canOpenURL(data.url);
        if (supported) {
          await Linking.openURL(data.url);
        } else {
          throw new Error("Impossible d'ouvrir le navigateur");
        }
      }

      return data;
    }
  } catch (error: any) {
    console.error("Erreur lors de la connexion Google:", error);
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error: any) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    return null;
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error: any) {
    console.error("Erreur lors de la déconnexion:", error);
    throw error;
  }
}
