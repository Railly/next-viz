const withTM = require("next-transpile-modules")([
  "@next-viz/cli",
]);

module.exports = withTM({
  reactStrictMode: true,
});
