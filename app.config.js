const IS_DEV = process.env.APP_VARIANT === 'development';

export default {
  expo: {
    name: IS_DEV ? 'UberDrip (Dev)' : 'UberDrip',
    slug: 'uberdrip',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'uberdrip',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: IS_DEV ? 'com.uberdrip.app.dev' : 'com.uberdrip.app'
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff'
      },
      package: IS_DEV ? 'com.uberdrip.app.dev' : 'com.uberdrip.app'
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
      // Ensure proper font loading for @expo/vector-icons
      fontDisplay: 'swap',
      build: {
        babel: {
          include: ['@expo/vector-icons']
        }
      }
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff'
        }
      ],
      [
        'expo-font',
        {
          fonts: ['@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf']
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    }
  }
};
