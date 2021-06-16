const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  devtool: process.env.NODE_ENV === 'production' ? false : 'sourcemap',
  context: path.resolve(__dirname, 'src'),
  entry: {
    content: './content/index.js',
    popup: './popup/index.js',
    background: './background/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /popup/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: 3
                }
              ],
              '@babel/preset-react'
            ]
          }
        }
      },
      {
        test: /\.js$/,
        include: /content/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: 3
                }
              ],
              [
                '@babel/preset-react',
                {
                  pragma: 'h',
                  useBuiltIns: true
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin(['*']),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  optimization: {
    concatenateModules: true,
    minimizer:
      process.env.NODE_ENV === 'production' ? [new UglifyJsPlugin()] : undefined
  }
}
