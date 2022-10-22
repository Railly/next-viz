const withTM = require("next-transpile-modules")([
  "@next-viz/ui",
  "@next-viz/cli",
]);

module.exports = withTM({
  reactStrictMode: true,
});
