const merge = require('webpack-merge')
const os = require('os')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const baseConfig = require('./webpack.config.base')

module.exports = merge({
  customizeArray: merge.unique(
    'plugins',
    ['pic', 'ExtractTextPlugin'],
    plugin => {
      if (plugin.constructor && plugin.constructor.name) {
        if (plugin.constructor.name === 'HappyPlugin') {
          return plugin.id
        }
        return plugin.constructor.name
      }
    }
  )
})({
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].js'
  },
  plugins: [
    new HappyPack({
      id: 'pic',
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: 'file-loader',
          options: {
            name: '[hash:22].[ext]'
          }
        }
      ],
      verbose: true,
      verboseWhenProfiling: true
    }),
    new ExtractTextPlugin({
      filename: '[contenthash:22].css',
      allChunks: true
    }),
    new UglifyJsPlugin({
      parallel: true,
      sourceMap: false
    })
  ]
}, baseConfig)
