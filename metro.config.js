const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const defaultConfig = getDefaultConfig(__dirname);

const config = withNativeWind(defaultConfig, { input: './global.css' });

// On retire 'svg' de assetExts et on l’ajoute à sourceExts pour le transformer SVG
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg');
config.resolver.sourceExts.push('svg');

// Add support for font files in web builds
config.resolver.assetExts.push('ttf', 'woff', 'woff2', 'eot');

// On configure le transformer pour utiliser react-native-svg-transformer
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');

// Web-specific configuration for better font handling
if (config.resolver.platforms && config.resolver.platforms.includes('web')) {
  config.resolver.alias = {
    ...(config.resolver.alias || {}),
    'react-native-vector-icons/fonts': '@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts',
  };
}

module.exports = config;
