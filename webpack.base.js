module.exports = {
  resolve: {
    alias: {
      'isomorphic-fetch': 'fetch-mock-forwarder'
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }]
  }
}
