const withTM = require("next-transpile-modules")([
  "react-aleph-ui",
  "react-aleph-cli",
]);

module.exports = withTM({
  reactStrictMode: true,
});
