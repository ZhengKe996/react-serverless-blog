const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "serverless-blog.fanzhengke.top",
      changeOrigin: true,
    })
  );
};
