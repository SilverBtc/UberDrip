import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Platform,
  StatusBar,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { InstallButton } from '../../components/InstallButton';

interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  username?: string;
  bio?: string;
  avatar_url?: string;
  phone?: string;
  date_of_birth?: string;
  location?: string;
  website?: string;
  created_at?: string;
  updated_at?: string;
  preferences?: {
    notifications: boolean;
    email_marketing: boolean;
    dark_mode: boolean;
    language: string;
  };
  stats?: {
    orders_count: number;
    wishlist_count: number;
    reviews_count: number;
    points: number;
  };
}

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);  const [editing, setEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  
  const [editForm, setEditForm] = useState({
    full_name: '',
    username: '',
    bio: '',
    phone: '',
    location: '',
    website: '',
  });
  const statusBarHeight = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0;

  const initializeEditForm = (profileData: UserProfile) => {
    setEditForm({
      full_name: profileData.full_name || '',
      username: profileData.username || '',
      bio: profileData.bio || '',
      phone: profileData.phone || '',
      location: profileData.location || '',
      website: profileData.website || '',
    });
  };

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      
      // Fetch user profile from Supabase
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          preferences:user_preferences(*),
          stats:user_stats(*)
        `)
        .eq('id', user?.id)
        .single();      if (error && error.code === 'PGRST116') {
        // Profile doesn't exist, create a basic one
        if (!isCreating) {
          console.log('Profile not found, creating new profile...');
          setIsCreating(true);
          await createProfile();
        }      } else if (error) {
        console.error('Error loading profile:', error);
        Alert.alert('Error', 'Failed to load profile');      } else if (data) {
        setProfile(data);
        initializeEditForm(data);
      } else {
        // This shouldn't happen, but just in case
        console.log('No data returned but no error either');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };
  const createProfile = async () => {
    try {
      console.log('Creating new profile for user:', user?.id);
      
      const profileData = {
        id: user?.id,
        email: user?.email,
        full_name: user?.user_metadata?.full_name || '',
        username: user?.user_metadata?.username || '',
        avatar_url: user?.user_metadata?.avatar_url || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Create profile
      const { data: profileResult, error: profileError } = await supabase
        .from('profiles')
        .insert([profileData])
        .select()
        .single();

      if (profileError) throw profileError;

      // Create default preferences
      const { error: preferencesError } = await supabase
        .from('user_preferences')
        .insert([{
          user_id: user?.id,
          notifications: true,
          email_marketing: false,
          dark_mode: false,
          language: 'en',
        }]);

      if (preferencesError) console.warn('Error creating preferences:', preferencesError);

      // Create default stats
      const { error: statsError } = await supabase
        .from('user_stats')
        .insert([{
          user_id: user?.id,
          orders_count: 0,
          wishlist_count: 0,
          reviews_count: 0,
          points: 0,
        }]);

      if (statsError) console.warn('Error creating stats:', statsError);      // Reload the complete profile with all relations
      await loadProfile();
      
      console.log('Profile created successfully');
    } catch (error) {
      console.error('Error creating profile:', error);
      Alert.alert('Error', 'Failed to create profile. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const updateProfile = async () => {
    try {
      setLoading(true);
      
      const updates = {
        ...editForm,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user?.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, ...updates } : null);
      setEditing(false);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        await uploadAvatar(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const uploadAvatar = async (uri: string) => {
    try {
      setUploading(true);
      
      const fileName = `${user?.id}-${Date.now()}.jpg`;
      const response = await fetch(uri);
      const blob = await response.blob();

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, blob);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user?.id);

      if (updateError) throw updateError;

      setProfile(prev => prev ? { ...prev, avatar_url: publicUrl } : null);
      Alert.alert('Success', 'Avatar updated successfully!');
    } catch (error) {
      console.error('Error uploading avatar:', error);
      Alert.alert('Error', 'Failed to upload avatar');
    } finally {
      setUploading(false);
    }
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: signOut },
      ]
    );
  };

  if (loading && !profile) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#6c63ff" />
        <Text className="mt-4 text-gray-600">Loading profile...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View 
        className="bg-white shadow-sm border-b border-gray-100"
        style={{ paddingTop: statusBarHeight }}
      >
        <View className="px-4 py-4 flex-row items-center justify-between">
          <Text className="text-xl font-bold text-gray-800">Profile</Text>          <TouchableOpacity
            onPress={() => setEditing(!editing)}
            className="bg-[#6c63ff] rounded-lg px-4 py-2"
          >
            <Text className="text-white font-medium">
              {editing ? 'Cancel' : 'Edit'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View className="bg-white mx-4 mt-4 rounded-2xl p-6 shadow-sm">
          <View className="items-center">
            {/* Avatar */}
            <TouchableOpacity 
              onPress={() => setShowImageModal(true)}
              className="relative"
            >
              <Image
                source={{
                  uri: profile?.avatar_url || 'https://via.placeholder.com/120x120/6c63ff/white?text=U'
                }}
                className="w-24 h-24 rounded-full"
              />
              {uploading && (
                <View className="absolute inset-0 bg-black/50 rounded-full justify-center items-center">
                  <ActivityIndicator color="white" />
                </View>
              )}              <View className="absolute -bottom-1 -right-1 bg-[#6c63ff] rounded-full p-2">
                <Ionicons name="camera" size={16} color="white" />
              </View>
            </TouchableOpacity>

            {/* User Info */}
            <View className="items-center mt-4">
              <Text className="text-xl font-bold text-gray-800">
                {profile?.full_name || profile?.username || 'User'}
              </Text>
              <Text className="text-gray-500 mt-1">@{profile?.username || 'username'}</Text>
              <Text className="text-gray-600 text-center mt-2 leading-5">
                {profile?.bio || 'No bio available'}
              </Text>
            </View>

            {/* Stats */}            <View className="flex-row justify-around w-full mt-6 pt-4 border-t border-gray-100">
              <View className="items-center">
                <Text className="text-lg font-bold text-[#6c63ff]">
                  {profile?.stats?.orders_count || 0}
                </Text>
                <Text className="text-gray-500 text-sm">Orders</Text>
              </View>
              <View className="items-center">
                <Text className="text-lg font-bold text-[#6c63ff]">
                  {profile?.stats?.wishlist_count || 0}
                </Text>
                <Text className="text-gray-500 text-sm">Wishlist</Text>
              </View>
              <View className="items-center">
                <Text className="text-lg font-bold text-[#6c63ff]">
                  {profile?.stats?.reviews_count || 0}
                </Text>
                <Text className="text-gray-500 text-sm">Reviews</Text>
              </View>
              <View className="items-center">
                <Text className="text-lg font-bold text-[#6c63ff]">
                  {profile?.stats?.points || 0}
                </Text>
                <Text className="text-gray-500 text-sm">Points</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Edit Form */}
        {editing && (
          <View className="bg-white mx-4 mt-4 rounded-2xl p-6 shadow-sm">
            <Text className="text-lg font-bold text-gray-800 mb-4">Edit Profile</Text>
            
            <View className="space-y-4">
              <View>
                <Text className="text-gray-700 font-medium mb-2">Full Name</Text>
                <TextInput
                  value={editForm.full_name}
                  onChangeText={(text) => setEditForm(prev => ({ ...prev, full_name: text }))}
                  className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                  placeholder="Enter your full name"
                />
              </View>

              <View>
                <Text className="text-gray-700 font-medium mb-2">Username</Text>
                <TextInput
                  value={editForm.username}
                  onChangeText={(text) => setEditForm(prev => ({ ...prev, username: text }))}
                  className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                  placeholder="Enter your username"
                />
              </View>

              <View>
                <Text className="text-gray-700 font-medium mb-2">Bio</Text>
                <TextInput
                  value={editForm.bio}
                  onChangeText={(text) => setEditForm(prev => ({ ...prev, bio: text }))}
                  className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                  placeholder="Tell us about yourself"
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
              </View>

              <View>
                <Text className="text-gray-700 font-medium mb-2">Phone</Text>
                <TextInput
                  value={editForm.phone}
                  onChangeText={(text) => setEditForm(prev => ({ ...prev, phone: text }))}
                  className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                />
              </View>

              <View>
                <Text className="text-gray-700 font-medium mb-2">Location</Text>
                <TextInput
                  value={editForm.location}
                  onChangeText={(text) => setEditForm(prev => ({ ...prev, location: text }))}
                  className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                  placeholder="Enter your location"
                />
              </View>

              <View>
                <Text className="text-gray-700 font-medium mb-2">Website</Text>
                <TextInput
                  value={editForm.website}
                  onChangeText={(text) => setEditForm(prev => ({ ...prev, website: text }))}
                  className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                  placeholder="Enter your website URL"
                  keyboardType="url"
                />
              </View>
            </View>            <TouchableOpacity
              onPress={updateProfile}
              className="bg-[#6c63ff] rounded-lg py-3 mt-6"
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold text-center">Save Changes</Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        {/* Account Info */}
        <View className="bg-white mx-4 mt-4 rounded-2xl shadow-sm">
          <View className="p-4 border-b border-gray-100">
            <Text className="text-lg font-bold text-gray-800">Account Information</Text>
          </View>
          
          <View className="p-4 space-y-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons name="mail-outline" size={20} color="#6c63ff" />
                <Text className="ml-3 text-gray-700">Email</Text>
              </View>
              <Text className="text-gray-500">{profile?.email}</Text>
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons name="call-outline" size={20} color="#6c63ff" />
                <Text className="ml-3 text-gray-700">Phone</Text>
              </View>
              <Text className="text-gray-500">{profile?.phone || 'Not set'}</Text>
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons name="location-outline" size={20} color="#6c63ff" />
                <Text className="ml-3 text-gray-700">Location</Text>
              </View>
              <Text className="text-gray-500">{profile?.location || 'Not set'}</Text>
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons name="globe-outline" size={20} color="#6c63ff" />
                <Text className="ml-3 text-gray-700">Website</Text>
              </View>
              <Text className="text-gray-500">{profile?.website || 'Not set'}</Text>
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons name="calendar-outline" size={20} color="#6c63ff" />
                <Text className="ml-3 text-gray-700">Member since</Text>
              </View>
              <Text className="text-gray-500">
                {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'Unknown'}
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="bg-white mx-4 mt-4 rounded-2xl shadow-sm">
          <View className="p-4 border-b border-gray-100">
            <Text className="text-lg font-bold text-gray-800">Quick Actions</Text>
          </View>
          
          <View className="p-2">
            <TouchableOpacity className="flex-row items-center justify-between p-4 rounded-lg">
              <View className="flex-row items-center">
                <Ionicons name="heart-outline" size={20} color="#6c63ff" />
                <Text className="ml-3 text-gray-700">My Wishlist</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between p-4 rounded-lg">
              <View className="flex-row items-center">
                <Ionicons name="bag-outline" size={20} color="#6c63ff" />
                <Text className="ml-3 text-gray-700">Order History</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between p-4 rounded-lg">
              <View className="flex-row items-center">
                <Ionicons name="star-outline" size={20} color="#6c63ff" />
                <Text className="ml-3 text-gray-700">My Reviews</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between p-4 rounded-lg">
              <View className="flex-row items-center">
                <Ionicons name="settings-outline" size={20} color="#6c63ff" />
                <Text className="ml-3 text-gray-700">Settings</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between p-4 rounded-lg">
              <View className="flex-row items-center">
                <Ionicons name="help-circle-outline" size={20} color="#6c63ff" />
                <Text className="ml-3 text-gray-700">Help & Support</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>          </View>
        </View>

        {/* PWA Install Section */}
        <View className="bg-white mx-4 mt-4 rounded-2xl p-4 shadow-sm">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <Ionicons name="download-outline" size={20} color="#6c63ff" />
              <View className="ml-3 flex-1">
                <Text className="text-gray-700 font-medium">Install App</Text>
                <Text className="text-gray-500 text-sm">Get the full app experience</Text>
              </View>
            </View>
            <InstallButton />
          </View>
        </View>

        {/* Sign Out */}
        <TouchableOpacity
          onPress={handleSignOut}
          className="bg-red-500 mx-4 mt-4 mb-8 rounded-2xl p-4 shadow-sm"
        >
          <View className="flex-row items-center justify-center">
            <Ionicons name="log-out-outline" size={20} color="white" />
            <Text className="ml-2 text-white font-bold">Sign Out</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Avatar Image Modal */}
      <Modal
        visible={showImageModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowImageModal(false)}
      >
        <View className="flex-1 bg-black/80 justify-center items-center">
          <View className="bg-white rounded-2xl p-6 mx-8 w-4/5">
            <Text className="text-lg font-bold text-center mb-4">Update Avatar</Text>
              <TouchableOpacity
              onPress={() => {
                setShowImageModal(false);
                pickImage();
              }}
              className="bg-[#6c63ff] rounded-lg py-3 mb-3"
            >
              <Text className="text-white font-medium text-center">Choose from Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowImageModal(false)}
              className="bg-gray-300 rounded-lg py-3"
            >
              <Text className="text-gray-700 font-medium text-center">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
