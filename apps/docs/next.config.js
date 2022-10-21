const withTM = require("next-transpile-modules")(["react-aleph-ui"]);

module.exports = withTM({
  reactStrictMode: true,
});
