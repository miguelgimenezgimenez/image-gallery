const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const baseConfig = require('./webpack.base')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const config = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
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
