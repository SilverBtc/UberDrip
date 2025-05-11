import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { View } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import CustomHeader from './components/CustomHeader'; // Custom header with drawer, uberdrip

import Home from './screens';
import Explore from './screens/explore';
import Product from './screens/product';
import Welcome from './screens/welcome';


import { Stack } from 'expo-router';

import "../global.css";

SplashScreen.preventAutoHideAsync();

const Drawer = createDrawerNavigator();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
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
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar style="auto" />
        <Drawer.Navigator
            screenOptions={{
              header: () => <CustomHeader />, // Your custom header here
            }}
        >
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Explore" component={Explore} />
          <Drawer.Screen name="Product" component={Product} options={{ headerShown: false }} />
          <Drawer.Screen name="Welcome" component={Welcome}/>
        </Drawer.Navigator>
      </ThemeProvider>
  );
}
