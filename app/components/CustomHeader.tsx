import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StatusBar,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../contexts/AuthContext";

export default function CustomHeader() {
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    Alert.alert("Déconnexion", "Êtes-vous sûr de vouloir vous déconnecter ?", [
      { text: "Annuler", style: "cancel" },
      { text: "Déconnexion", onPress: signOut },
    ]);
  };

  const statusBarHeight =
    Platform.OS === "ios" ? 44 : StatusBar.currentHeight || 0;

  return (
    <View
      style={{
        paddingTop: statusBarHeight,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <View className="h-16 flex-row items-center justify-between px-4">
        <View className="flex-row items-center">
          <Text className="text-2xl font-bold text-purple-600">UberDrip</Text>
          <Text className="text-xs text-gray-500 ml-2">✨</Text>
        </View>

        <View className="flex-row items-center space-x-4">
          <TouchableOpacity className="p-2">
            <Ionicons name="notifications-outline" size={24} color="#6b7280" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSignOut}
            className="flex-row items-center space-x-2"
          >
            <Ionicons name="person-circle-outline" size={28} color="#6c63ff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
