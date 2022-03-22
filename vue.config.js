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
        '^/updateProduct': {
          target: 'http://localhost:3030',
          changeOrigin: true,
          pathRewrite: { "^/updateProduct": "/updateProduct" }
        },
        '^/createProduct': {
          target: 'http://localhost:3030',
          changeOrigin: true,
          pathRewrite: { "^/createProduct": "/createProduct" }
        },
        '^/getNotDuplicateData': {
          target: 'http://localhost:3030',
          changeOrigin: true,
          pathRewrite: { "^/getNotDuplicateData": "/getNotDuplicateData" }
        },
        '^/updateGenre': {
          target: 'http://localhost:3030',
          changeOrigin: true,
          pathRewrite: { "^/updateGenre": "/updateGenre" }
        },
        '^/searchOrders': {
          target: 'http://localhost:3030',
          changeOrigin: true,
          pathRewrite: { "^/searchOrders": "/searchOrders" }
        },
        '^/getOrder': {
          target: 'http://localhost:3030',
          changeOrigin: true,
          pathRewrite: { "^/getOrder": "/getOrder" }
        },
        '^/getOrderProducts': {
          target: 'http://localhost:3030',
          changeOrigin: true,
          pathRewrite: { "^/getOrderProducts": "/getOrderProducts" }
        },
        '^/searchCustomers': {
          target: 'http://localhost:3030',
          changeOrigin: true,
          pathRewrite: { "^/searchCustomers": "/searchCustomers" }
        },
        '^/getCustomer': {
          target: 'http://localhost:3030',
          changeOrigin: true,
          pathRewrite: { "^/getCustomer": "/getCustomer" }
        },

      }
    }
  }