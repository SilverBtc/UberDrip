import { useEffect } from "react";
import { View, Text } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { supabase } from "../../lib/supabase";

export default function AuthCallback() {
  const router = useRouter();
  const { code } = useLocalSearchParams();

  useEffect(() => {
    const handleAuthCallback = async () => {
      if (code && typeof code === "string") {
        try {
          const { data, error } = await supabase.auth.exchangeCodeForSession(
            code
          );

          if (error) {
            console.error("Error exchanging code for session:", error);
          } else {
            console.log("Auth successful:", data.user);
            // Rediriger vers l'écran principal
            router.replace("/");
          }
        } catch (error) {
          console.error("Auth callback error:", error);
        }
      } else {
        // Pas de code, rediriger vers login
        router.replace("/screens/welcome");
      }
    };

    handleAuthCallback();
  }, [code, router]);

  return (
    <View className="flex-1 justify-center items-center">
      <Text>Authentification en cours...</Text>
    </View>
  );
}
