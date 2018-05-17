const merge = require('webpack-merge')
const baseConfig = require('./webpack.client')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const config = {

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `"${process.env.NODE_ENV || 'production'}"`
      }
    }),
    new UglifyJSPlugin()
  ]
}

module.exports = merge(baseConfig, config)
