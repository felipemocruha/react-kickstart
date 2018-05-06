var path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const ClosureCompilerPlugin = require('webpack-closure-compiler');
const isProd = process.env.NODE_ENV === 'production';
const BundleAnalyzerPlugin = require(
    'webpack-bundle-analyzer').BundleAnalyzerPlugin;

function getPlugins() {
  var plugins = [];
  plugins.push(
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') },
    }),
  );
  plugins.push(new webpack.optimize.AggressiveMergingPlugin());
  plugins.push(
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  );
  if (isProd) {
    plugins.push(
      new ClosureCompilerPlugin({
        options: {
          language_in: 'ECMASCRIPT6',
          language_out: 'ECMASCRIPT5',
          compilation_level: 'ADVANCED',
          warning_level: 'QUIET',
        },
        concurrency: 5,
      }),
    );
  } else {
    //plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
}

var BUILD_DIR = path.resolve(__dirname, './static');

function getPublicPath() {
  if (isProd) {
    return './static';
  } else {
    return 'http://localhost:8090/assets/';
  }
}

function getOutputFileName() {
  if (isProd) {
    return '[name].[chunkhash].bundle.js';
  } else {
    return '[name].bundle.js';
  }
}

module.exports = {
  entry: {
    index: './src/index.js',
    vendors: [
      'react',
      'react-dom',
      'styled-components',
      'react-redux',
      'axios',
      'history',
    ],
  },
  output: {
    filename: getOutputFileName(),
    publicPath: getPublicPath(),
    path: `${BUILD_DIR}/`,
  },
  optimization: {
    splitChunks: {
      name: 'vendors',
      chunks: 'all',
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['env', 'react', 'stage-2'],
          plugins: ['transform-object-rest-spread'],
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['src', 'node_modules'],
  },
  plugins: getPlugins(),
};
