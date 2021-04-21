// production config
const { merge } = require("webpack-merge");
const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const commonConfig = require("./common");

module.exports = merge(commonConfig, {
  mode: "production",
  devtool: false,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: {
                exportGlobals: true,
                auto: true,
                compileType: "module",
                localIdentName: "[name]-[hash:base64:8]",
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [
                  ["postcss-preset-env", {}],
                  ["autoprefixer", {}],
                ],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
});
