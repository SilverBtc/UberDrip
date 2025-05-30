import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import GoogleLogo from "../../assets/images/Google__G__logo.svg";
import { signInWithGoogle } from "../../lib/auth";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginScreen() {
  const [login, setLogin] = useState("");
  const [mdp, setMdp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { user } = useAuth();

  const handleLogin = async () => {
    if (!login || !mdp) {
      Alert.alert("Error", "Please fill in all fields");
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
      // La redirection sera automatique grâce au contexte d'authentification
    } catch (error: any) {
      Alert.alert("Connection Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    console.log("Register", "Redirect to registration");
  };
  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true);
      const result = await signInWithGoogle();
      console.log("Google login result:", result);
      // La redirection sera automatique grâce au contexte d'authentification
    } catch (error: any) {
      console.error("Google Error:", error);
      Alert.alert(
        "Google Error",
        error.message || "An error occurred while signing in with Google"
      );
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleForgotPassword = () => {
    console.log("Forgot Password", "Redirect to password recovery");
  };

  return (
    <View className="flex-1 bg-white justify-center px-5">
      <Text className="text-4xl font-bold text-center mb-10">Welcome</Text>

      <TextInput
        placeholder="Email"
        value={login}
        onChangeText={setLogin}
        autoCapitalize="none"
        keyboardType="email-address"
        className="border border-gray-400 rounded-lg px-4 py-3 mb-4 text-base"
      />

      <TextInput
        placeholder="Password"
        value={mdp}
        onChangeText={setMdp}
        secureTextEntry
        className="border border-gray-400 rounded-lg px-4 py-3 mb-4 text-base"
      />

      <View className="flex-row justify-between mb-5">
        <TouchableOpacity
          onPress={handleRegister}
          className="bg-gray-400 py-3 px-6 rounded-lg"
          disabled={isLoading || isGoogleLoading}
        >
          <Text className="text-white font-bold">Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogin}
          className="bg-blue-500 py-3 px-6 rounded-lg"
          disabled={isLoading || isGoogleLoading}
        >
          <Text className="text-white font-bold">
            {isLoading ? "Connecting..." : "Login"}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text className="text-blue-500 text-center mb-6">Forgot Password?</Text>
      </TouchableOpacity>

      <View className="flex-row items-center mb-6">
        <View className="flex-1 h-px bg-gray-300" />
        <Text className="mx-4 text-gray-500 font-semibold">OR</Text>
        <View className="flex-1 h-px bg-gray-300" />
      </View>

      <TouchableOpacity
        onPress={handleGoogleLogin}
        className="flex-row items-center justify-center border-2 border-[#D9F0FF] rounded-lg py-3"
        disabled={isLoading || isGoogleLoading}
      >
        <GoogleLogo width={20} height={20} className="mr-2" />        <Text className="text-base font-semibold">
          {isGoogleLoading ? "Signing in..." : "Log in with Google"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
