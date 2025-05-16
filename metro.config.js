const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const defaultConfig = getDefaultConfig(__dirname);

const config = withNativeWind(defaultConfig, { input: './global.css' });

// On retire 'svg' de assetExts et on l’ajoute à sourceExts pour le transformer SVG
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg');
config.resolver.sourceExts.push('svg');

// On configure le transformer pour utiliser react-native-svg-transformer
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');

module.exports = config;
