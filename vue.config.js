module.exports = {
  outputDir: 'dist',
  assetsDir: 'assets',
  lintOnSave: true,
  // 配置跨域
  devServer: {
    open: false,
    host: '0.0.0.0',
    port: '8080',
    https: false,
    hotOnly: true,
    // proxy: {
    //   '/blog': {
    //     target: 'http://localhost:8081',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '/blog': ''
    //     }
    //   }
    // }
  }
}