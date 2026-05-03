// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
  eslintPluginPrettierRecommended,
  expoConfig,
  {
    ignores: ['dist/*', 'app-example/**'],
    files: ['babel.config.js'],
  },
]);
