var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.join(__dirname, 'client'),
  devtool: debug ? "inline-sourcemap" : false,
  entry: "./js/index.jsx",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      }
    ]
  },
  output: {
    path: __dirname + "./client/static/js",
    filename: "main.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      comments: false
    }),
    new(webpack.optimize.OccurenceOrderPlugin || webpack.optimize.OccurrenceOrderPlugin)(),
    new webpack.optimize.AggressiveMergingPlugin()
  ],
};
