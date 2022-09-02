module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["@babel/plugin-transform-spread","react-native-reanimated/plugin"]
  };
};
