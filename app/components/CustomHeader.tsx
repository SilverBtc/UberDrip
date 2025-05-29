import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StatusBar,
  Platform,
  Modal,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../contexts/AuthContext";

export default function CustomHeader({ 
  onProfilePress 
}: { 
  onProfilePress?: () => void 
}) {
  const { user, signOut } = useAuth();
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign Out", onPress: signOut },
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
    >      <View className="h-16 flex-row items-center justify-between px-4">
        <View className="flex-row items-center">
          <Text className="text-2xl font-bold text-[#6c63ff]">UberDrip</Text>
        </View>

        <View className="flex-row items-center space-x-4">
          <TouchableOpacity className="p-2">
            <Ionicons name="notifications-outline" size={24} color="#6b7280" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowProfileModal(true)}
            className="flex-row items-center space-x-2"
          >
            <View className="relative">
              <Image
                source={{
                  uri: user?.user_metadata?.avatar_url || 'https://via.placeholder.com/32x32/6c63ff/white?text=U'
                }}
                className="w-8 h-8 rounded-full"
              />
              <View className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Quick Modal */}
      <Modal
        visible={showProfileModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowProfileModal(false)}
      >
        <TouchableOpacity 
          className="flex-1 bg-black/20"
          activeOpacity={1}
          onPress={() => setShowProfileModal(false)}
        >
          <View className="absolute top-20 right-4 bg-white rounded-2xl shadow-lg min-w-[200px]">
            <View className="p-4 border-b border-gray-100">
              <View className="flex-row items-center space-x-3">
                <Image
                  source={{
                    uri: user?.user_metadata?.avatar_url || 'https://via.placeholder.com/40x40/6c63ff/white?text=U'
                  }}
                  className="w-10 h-10 rounded-full"
                />
                <View className="flex-1">
                  <Text className="font-bold text-gray-800" numberOfLines={1}>
                    {user?.user_metadata?.full_name || 'User'}
                  </Text>
                  <Text className="text-sm text-gray-500" numberOfLines={1}>
                    {user?.email}
                  </Text>
                </View>
              </View>
            </View>

            <View className="p-2">
              <TouchableOpacity
                onPress={() => {
                  setShowProfileModal(false);
                  onProfilePress?.();
                }}
                className="flex-row items-center p-3 rounded-lg"
              >
                <Ionicons name="person-outline" size={20} color="#6c63ff" />
                <Text className="ml-3 text-gray-700">View Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center p-3 rounded-lg">
                <Ionicons name="settings-outline" size={20} color="#6c63ff" />
                <Text className="ml-3 text-gray-700">Settings</Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center p-3 rounded-lg">
                <Ionicons name="help-circle-outline" size={20} color="#6c63ff" />
                <Text className="ml-3 text-gray-700">Help</Text>
              </TouchableOpacity>

              <View className="border-t border-gray-100 mt-2 pt-2">
                <TouchableOpacity
                  onPress={() => {
                    setShowProfileModal(false);
                    handleSignOut();
                  }}
                  className="flex-row items-center p-3 rounded-lg"
                >
                  <Ionicons name="log-out-outline" size={20} color="#ef4444" />
                  <Text className="ml-3 text-red-500">Sign Out</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
