const withTM = require("next-transpile-modules")([
  "@next-viz/cli",
]);

module.exports = withTM({
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login/",
        permanent: true,
      },
    ]
  },
});
