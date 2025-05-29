import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

import { useColorScheme } from "@/hooks/useColorScheme";
import CustomHeader from "./components/CustomHeader";
import { AuthProvider } from "../contexts/AuthContext";
import { AuthGuard } from "../components/AuthGuard";

import Home from "./screens";
import Explore from "./screens/explore";
import Product from "./screens/product";
import Profile from "./screens/profile";

import "../global.css";

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();

function AppContent() {
    const colorScheme = useColorScheme();

    return (<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <StatusBar style="auto" />
        <AuthGuard>
            <Tab.Navigator
                screenOptions={({ route, navigation }) => ({
                    header: () => <CustomHeader onProfilePress={() => navigation.navigate('Profile' as never)} />,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName: keyof typeof Ionicons.glyphMap;

                        if (route.name === "Home") {
                            iconName = focused ? "home" : "home-outline";
                        } else if (route.name === "Explore") {
                            iconName = focused ? "search" : "search-outline";
                        } else if (route.name === "Product") {
                            iconName = focused ? "shirt" : "shirt-outline";
                        } else if (route.name === "Profile") {
                            iconName = focused ? "person" : "person-outline";
                        } else {
                            iconName = "ellipse-outline";
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: "#6c63ff",
                    tabBarInactiveTintColor: "gray",
                    tabBarStyle: {
                        backgroundColor: "white",
                        borderTopWidth: 1,
                        borderTopColor: "#e0e0e0",
                        height: 60,
                        paddingBottom: 8,
                        paddingTop: 8,
                    },
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: "600",
                        paddingBottom: 40,
                    },
                })}
            >
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarLabel: "Home",
                    }}
                />
                <Tab.Screen
                    name="Explore"
                    component={Explore}
                    options={{
                        tabBarLabel: "Explore",
                    }}
                />
                <Tab.Screen
                    name="Product"
                    component={Product}
                    options={{
                        headerShown: false,
                        tabBarLabel: "Products",
                        tabBarStyle: { display: "none" },
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        tabBarLabel: "Profile",
                    }}
                />
            </Tab.Navigator>
        </AuthGuard>
    </ThemeProvider>
    );
}

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}
