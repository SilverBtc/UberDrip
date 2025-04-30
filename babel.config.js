module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Ajouter les plugins nécessaires pour le traitement CSS
      ['react-native-platform-specific-extensions', { extensions: ['css'] }],
      'react-native-reanimated/plugin',
    ],
  };
};
