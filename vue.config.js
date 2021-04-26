module.exports = {
    devServer: {
      proxy: {
        '^/api': {
          target: 'http://localhost:3030',
          changeOrigin: true,
          pathRewrite: { "^/api": "/api" }
        },
        '^/getApi': {
          target: 'http://localhost:3030',
          changeOrigin: true,
          pathRewrite: { "^/getApi": "/getApi" }
        },
        '^/getCategory': {
          target: 'http://localhost:3030',
          changeOrigin: true,
          pathRewrite: { "^/getCategory": "/getCategory" }
        },
        '^/getGenre': {
          target: 'http://localhost:3030',
          changeOrigin: true,
          pathRewrite: { "^/getGenre": "/getGenre" }
        },

      }
    }
  }