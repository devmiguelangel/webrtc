const path = require('path');

module.exports = {
  mode: 'development',
  watch: true,
  entry: {
    app: path.join(__dirname, './src/app.js'),
  },
  output: {
    path: path.resolve(__dirname, './src/dist'),
    publicPath: '/static/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      name: true,
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          name: 'vendors',
          chunks: 'all',
          reuseExistingChunk: true,
          priority: 1,
          filename: 'js/vendor.js',
          enforce: true,
          test(module, chunks) {
            const name = module.nameForCondition && module.nameForCondition();
            return chunks.some(
              chunks => chunks.name !== 'vendor' && /[\\/]node_modules[\\/]/.test(name)
            );
          },
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
  },
  devtool: 'source-map',
}
