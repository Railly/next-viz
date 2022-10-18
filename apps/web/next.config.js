const withTM = require("next-transpile-modules")(["@railly/react-aleph-ui"]);

module.exports = withTM({
  reactStrictMode: true,
});
