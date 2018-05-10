const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    },
    {
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: true
        }
      }]
    },
    {
      test: /\.s?css$/,
      use: [{
        loader: 'style-loader'
      },

      {
        loader: 'css-loader',
        options: {
          modules: true,
          sourceMap: true,
          localIdentName: '[name]_[local]_[hash:base64:5]'
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }
      ]
    }
    ]
  },
  devtool: 'eval-source-map',

  plugins: [
    new HtmlWebPackPlugin({
      template: './www/index.html',
      filename: './index.html'
    })
  ]
}
