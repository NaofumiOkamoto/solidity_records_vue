module.exports = {
    devServer: {
      proxy: {
        '^/api': {
          target: 'http://localhost:3030',
          changeOrigin: true
        },
        '^/getApi': {
          target: 'http://localhost:3030',
          changeOrigin: true
        },
        '^/getCategory': {
          target: 'http://localhost:3030',
          changeOrigin: true
        },
      }
    }
  }