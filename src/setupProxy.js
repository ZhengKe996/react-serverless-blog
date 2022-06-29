const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://all-serverlg-server-uuxkrgefgf.cn-hangzhou.fcapp.run",
      changeOrigin: true,
    })
  );
};
