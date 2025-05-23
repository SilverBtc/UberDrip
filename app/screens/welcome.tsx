import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import GoogleLogo from "../../assets/images/Google__G__logo.svg";
import { signInWithGoogle, getCurrentUser } from "../../lib/auth";
import { supabase } from "../../lib/supabase";

export default function LoginScreen() {
  const [login, setLogin] = useState("");
  const [mdp, setMdp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Écouter les changements d'état d'authentification
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        console.log("User signed in:", session.user);
        // Rediriger vers l'écran principal
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async () => {
    if (!login || !mdp) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: login,
        password: mdp,
      });

      if (error) throw error;

      console.log("Login successful:", data.user);
    } catch (error: any) {
      Alert.alert("Erreur de connexion", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    console.log("Register", "Redirection vers l'inscription");
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
    } catch (error: any) {
      Alert.alert("Erreur Google", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    console.log(
      "Mot de passe oublié",
      "Redirection pour récupérer le mot de passe"
    );
  };

  return (
    <View className="flex-1 bg-white justify-center px-5">
      <Text className="text-4xl font-bold text-center mb-10">Welcome</Text>

      <TextInput
        placeholder="Login"
        value={login}
        onChangeText={setLogin}
        autoCapitalize="none"
        keyboardType="email-address"
        className="border border-gray-400 rounded-lg px-4 py-3 mb-4 text-base"
      />

      <TextInput
        placeholder="MDP"
        value={mdp}
        onChangeText={setMdp}
        secureTextEntry
        className="border border-gray-400 rounded-lg px-4 py-3 mb-4 text-base"
      />

      <View className="flex-row justify-between mb-5">
        <TouchableOpacity
          onPress={handleRegister}
          className="bg-gray-400 py-3 px-6 rounded-lg"
          disabled={isLoading}
        >
          <Text className="text-white font-bold">Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogin}
          className="bg-blue-500 py-3 px-6 rounded-lg"
          disabled={isLoading}
        >
          <Text className="text-white font-bold">
            {isLoading ? "Connexion..." : "Login"}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text className="text-blue-500 text-center mb-6">Forget MDP ?</Text>
      </TouchableOpacity>

      <View className="flex-row items-center mb-6">
        <View className="flex-1 h-px bg-gray-300" />
        <Text className="mx-4 text-gray-500 font-semibold">OR</Text>
        <View className="flex-1 h-px bg-gray-300" />
      </View>

      <TouchableOpacity
        onPress={handleGoogleLogin}
        className="flex-row items-center justify-center border-2 border-[#D9F0FF] rounded-lg py-3"
        disabled={isLoading}
      >
        <GoogleLogo width={20} height={20} className="mr-2" />
        <Text className="text-base font-semibold">
          {isLoading ? "Connexion..." : "Log in with Google"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
