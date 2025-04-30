const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Gérer correctement les transformations CSS asynchrones
config.transformer = {
  ...config.transformer,
  assetPlugins: ['expo-asset/tools/hashAssetFiles'],
};

// Ajouter la prise en charge des fichiers CSS et StyleSheet
config.resolver = {
  ...config.resolver,
  sourceExts: [...config.resolver.sourceExts, 'css'],
};

module.exports = config;
