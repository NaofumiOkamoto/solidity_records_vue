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
        '^/getProductsLike': {
          target: 'http://localhost:3030',
          changeOrigin: true,
          pathRewrite: { "^/getProductsLike": "/getProductsLike" }
        },
        '^/getProductsGenreLike': {
          target: 'http://localhost:3030',
          changeOrigin: true,
          pathRewrite: { "^/getProductsGenreLike": "/getProductsGenreLike" }
        },
        '^/searchProducts': {
          target: 'http://localhost:3030',
          changeOrigin: true,
          pathRewrite: { "^/searchProducts": "/searchProducts" }
        },

      }
    }
  }