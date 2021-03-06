const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.conf');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const TITLE = 'DEV - ';

module.exports = merge(base, {
  mode    : 'development',
  devtool : 'eval-source-map',
  output  : {
    filename   : 'app.js',
    publicPath : '/'
  },
  module: {
    rules: [{
      test : /(\.scss|\.css)$/,
      use  : ExtractTextPlugin.extract({
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader  : 'css-loader', // translates CSS into CommonJS
            options : {
              sourceMap: true
            }
          },
          {
            loader  : 'postcss-loader', // postprocesses CSS
            options : {
              sourceMap : true,
              ident     : 'postcss',
              plugins   : () => [
                autoprefixer()
              ]
            }
          },
          {
            // resolves relative paths based on the original source file.
            loader: 'resolve-url-loader'
          },
          {
            loader  : 'sass-loader', // compiles Sass to CSS
            options : {
              sourceMap: true
            }
          }
        ]
      })
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      disable: true
    }),
    new HtmlWebpackPlugin({
      template : 'src/index.ejs',
      favicon  : 'favicon.ico', // or use favicons-webpack-plugin
      title    : TITLE
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false)
    })
  ]
});
