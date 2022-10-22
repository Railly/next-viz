const withTM = require("next-transpile-modules")(["@next-viz/ui"]);

module.exports = withTM({
  reactStrictMode: true,
});
