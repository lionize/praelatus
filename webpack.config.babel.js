import path from 'path'
import webpack from 'webpack'

export default {
  entry: [
    'babel-polyfill',
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    './app/index.js'
  ],

  output: {
    filename: 'index.js',
    publicPath: '/static/',
    path: process.env.NODE_ENV === 'production'
      ? path.resolve(__dirname, 'build', 'release', 'static')
      : path.resolve(__dirname, 'build', 'debug', 'static')
  },

  devtool: 'inline-source-map',
  debug: true,

  devServer: {
    historyApiFallback: {
      index: 'index.html'
    }
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },

  resolve: {
    root: [path.resolve(__dirname), path.resolve(__dirname, 'node_modules')],
    alias: {
      app: '/app'
    },
    extensions: ['', '.js']
  }

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
