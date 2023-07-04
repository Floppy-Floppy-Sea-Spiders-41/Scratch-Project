// require the path
const path = require('path');
// require html webpack plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack')

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      
      {
        test: /\.s?css/,
        use: [
          'style-loader',
          'css-loader',
          // 'sass-loader'
        ],
      },
    ],
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: 'index.html',
      
    }),
    new Dotenv(),
  ],
  //declare devServer
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'build'),
    },
    proxy: { '/api': 'http://localhost:3000' },
    
  },
};
