import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import CustomHeader from '../components/CustomHeader'; // import your header
import 'react-native-gesture-handler';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <View style={{ flex: 1 }}>
            <CustomHeader />
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                    headerShown: false,
                    tabBarButton: HapticTab,
                    tabBarBackground: TabBarBackground,
                    tabBarStyle: Platform.select({
                        ios: {
                            position: 'absolute',
                        },
                        default: {},
                    }),
                }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="explore"
                    options={{
                        title: 'Explore',
                        tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="product"
                    options={{
                        title: 'Product',
                        tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="welcome"
                    options={{
                        title: 'Welcome',
                        tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
                    }}
                />
            </Tabs>
        </View>
    );
}
