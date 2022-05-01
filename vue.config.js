const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  outputDir: 'dist',
  assetsDir: 'assets',
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'))
  }
  // 配置跨域
  // devServer: {
  //   open: false,
  //   host: '0.0.0.0',
  //   port: '8080',
  //   https: false,
  //   hotOnly: true,
  //   proxy: {
  //     '^/blog': {
  //       target: 'http://192.168.1.19:8081',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '/blog': ''
  //       }
  //     }
  //   }
  // }
}