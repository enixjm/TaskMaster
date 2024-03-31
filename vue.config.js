const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack');
module.exports = defineConfig({
  publicPath: '/TaskMaster/',
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
      })
    ]
  }
})
