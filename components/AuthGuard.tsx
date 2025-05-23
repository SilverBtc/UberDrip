import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import Welcome from "../app/screens/welcome";

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="mt-4 text-gray-600">Chargement...</Text>
      </View>
    );
  }

  if (!user) {
    return <Welcome />;
  }

  return <>{children}</>;
};
