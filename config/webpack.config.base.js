const os = require('os')
const path = require('path')
const webpack = require('webpack')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const root = path.join(__dirname, '../')
const srcPath = path.join(root, 'app')
const buildPath = path.join(root, 'build')
const env = process.env.NODE_ENV || 'development'

module.exports = {
  context: srcPath,
  entry: {
    app: './index.js',
    vendors: './vendors.js'
  },
  output: {
    path: buildPath,
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  resolve: {
    alias: {
      com: path.join(srcPath, 'components'),
      con: path.join(srcPath, 'containers')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'happypack/loader',
        options: {
          id: 'js'
        }
      },
      {
        test: /\.njk$/,
        loader: 'happypack/loader',
        options: {
          id: 'njk'
        }
      },
      {
        test: /\.(less|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'happypack/loader',
              options: {
                id: 'less'
              }
            }
          ]
        })
      },
      {
        oneOf: [
          {
            test: /\.(png|gif|jpg|jpeg|svg|woff|ttf|eot)$/,
            resourceQuery: /\?.*/,
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          },
          {
            test: /\.(png|gif|jpg|jpeg|svg|woff|ttf|eot)$/,
            loader: 'file-loader',
            options: {
              name: '[name][hash:21].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      loaders: ['babel-loader'],
      verbose: true,
      verboseWhenProfiling: true
    }),
    new HappyPack({
      id: 'njk',
      threadPool: happyThreadPool,
      loaders: ['raw-loader'],
      verbose: true,
      verboseWhenProfiling: true
    }),
    new HappyPack({
      id: 'less',
      threadPool: happyThreadPool,
      loaders: ['css-loader', 'less-loader'],
      verbose: true,
      verboseWhenProfiling: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env)
      }
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendors', 'manifest'],
      filename: '[name].[chunkhash].js',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      async: true,
      minChunks: 3
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html'
    })
  ]
}
