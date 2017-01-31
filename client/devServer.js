import path from 'path'
import webpack from 'webpack'
import webpackDevServer from 'webpack-dev-server'
import config from './webpack.config.babel'

const host = '0.0.0.0'
const port = 3000

new webpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  historyApiFallback: true,
}).listen(port, host, (err) => {
  if (err) {
    return console.error(err)
  }

  console.log(`Listening at ${host}:${port}`)
})
