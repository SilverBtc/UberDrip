import { supabase } from "./supabase";
import { Platform, Alert } from "react-native";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

// Complete WebBrowser authentication session when the app is opened via URL
WebBrowser.maybeCompleteAuthSession();

export async function signInWithGoogle() {
    try {
        if (Platform.OS === "web") {
            // Pour le web, utiliser la redirection standard
            const redirectUrl = process.env.EXPO_PUBLIC_REDIRECT_URL || "https://uberdrip.pages.dev/auth/callback";
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: redirectUrl,
                },
            });
            if (error) throw error;
            return data;        } else {
            // Pour React Native/Expo Go, utiliser expo-auth-session
            const redirectUrl = AuthSession.makeRedirectUri({
                scheme: 'exp'  // Use exp scheme for Expo Go
            });

            console.log('Redirect URL:', redirectUrl);

            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: redirectUrl,
                    queryParams: {
                        access_type: "offline",
                        prompt: "consent",
                    },
                },
            });

            if (error) throw error;

            if (data.url) {
                // Use expo-web-browser with proper completion handling
                const result = await WebBrowser.openAuthSessionAsync(
                    data.url,
                    redirectUrl,
                    {
                        showInRecents: false,
                        // This will automatically close the browser when redirected
                        dismissButtonStyle: 'close',
                        readerMode: false,
                        enableBarCollapsing: false,
                    }
                );

                console.log('WebBrowser result:', result);                if (result.type === 'success' && result.url) {
                    // Parse the URL to get tokens - Supabase returns tokens in URL fragment
                    const url = new URL(result.url);
                    
                    // Check for access_token in the URL fragment (after #)
                    const fragment = url.hash.substring(1); // Remove the # at the beginning
                    const params = new URLSearchParams(fragment);
                    
                    const accessToken = params.get('access_token');
                    const refreshToken = params.get('refresh_token');
                    const expiresIn = params.get('expires_in');
                    
                    console.log('OAuth tokens found:', { 
                        hasAccessToken: !!accessToken, 
                        hasRefreshToken: !!refreshToken,
                        expiresIn 
                    });
                    
                    if (accessToken && refreshToken) {
                        // Set the session with the tokens
                        const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
                            access_token: accessToken,
                            refresh_token: refreshToken
                        });
                        
                        if (sessionError) throw sessionError;
                        console.log('Session created successfully:', sessionData.user?.email);
                        return sessionData;
                    }
                    
                    // Fallback: check for authorization code
                    const code = url.searchParams.get('code');
                    if (code) {
                        const { data: sessionData, error: sessionError } = await supabase.auth.exchangeCodeForSession(code);
                        if (sessionError) throw sessionError;
                        console.log('Session created successfully via code:', sessionData.user?.email);
                        return sessionData;
                    }
                }else if (result.type === 'cancel') {
                    throw new Error('User cancelled Google login');
                } else if (result.type === 'dismiss') {
                    throw new Error('Google login was dismissed');
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
