import { createClient } from "@supabase/supabase-js";
import { Platform } from "react-native";

const supabaseUrl = "https://jsqutcbjouulaypspvqt.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzcXV0Y2Jqb3V1bGF5cHNwdnF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNzM3NjQsImV4cCI6MjA2Mjk0OTc2NH0.tw94pFCbE1rmEj3gRhG_NoPlrZnzNgrCCY6UzXILYmI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Pour React Native, on n'utilise pas de redirect URL
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: Platform.OS === "web",
  },
});
