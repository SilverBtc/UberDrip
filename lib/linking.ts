import * as Linking from 'expo-linking';
import { supabase } from './supabase';

export const linking = {
  prefixes: [
    Linking.createURL('/'),
    'uberdrip://',
    'https://uberdrip.pages.dev',
  ],
  config: {
    screens: {
      'auth/callback': 'auth/callback',
    },
  },
  async getInitialURL() {
    // Handle URL when app is opened from a deep link
    const url = await Linking.getInitialURL();
    if (url) {
      return url;
    }
    return null;
  },
  subscribe(listener: (url: string) => void) {
    // Handle URL when app is already open
    const subscription = Linking.addEventListener('url', ({ url }) => {
      listener(url);
    });
    return () => subscription.remove();
  },
};

// Helper function to handle OAuth callback URLs
export async function handleAuthCallback(url: string) {
  try {
    const parsedUrl = new URL(url);
    const code = parsedUrl.searchParams.get('code');
    
    if (code) {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) {
        console.error('Error exchanging code for session:', error);
        return { success: false, error };
      }
      return { success: true, data };
    }
    
    return { success: false, error: new Error('No code found in URL') };
  } catch (error) {
    console.error('Error handling auth callback:', error);
    return { success: false, error };
  }
}
