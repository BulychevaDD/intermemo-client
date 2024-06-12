const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (env) {
  const isProduction = Boolean(env.production);

  return {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? false : 'eval-source-map',
    context: path.resolve(__dirname),
    entry: './src/index.tsx',
    output: {
      clean: true,
      filename: '[contenthash:8].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        shared: path.resolve(__dirname, 'src/shared'),
        features: path.resolve(__dirname, 'src/features'),
        widgets: path.resolve(__dirname, 'src/widgets'),
        entities: path.resolve(__dirname, 'src/entities'),
        pages: path.resolve(__dirname, 'src/pages'),
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: ['autoprefixer', 'postcss-preset-env', 'postcss-nested'],
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/index.html'),
      }),
    ],
    optimization: {
      minimize: isProduction,
      minimizer: [new TerserPlugin()],
    },
    devServer: {
      open: false,
      port: 3010,
      historyApiFallback: true,
      proxy: [
        {
          context: ['/api'],
          target: 'http://localhost:8000',
        },
      ],
    },
  };
};
