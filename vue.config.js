module.exports = {
  productionSourceMap: true,
  lintOnSave: false,
  configureWebpack: {
    mode: 'production',
    devServer: {
      proxy: process.env.VUE_APP_API_URL,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      disableHostCheck: true,
      sockPort: 8505,
      sockHost: "localhost",
      // https: true,
      port: 8505
    },
    externals: ["vue", "vue-router", /^@vue-mf\/.+/]
  },
  filenameHashing: false
};
