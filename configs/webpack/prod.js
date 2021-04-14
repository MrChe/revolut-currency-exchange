// production config
const { merge } = require("webpack-merge");
const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const commonConfig = require("./common");

module.exports = merge(commonConfig, {
  mode: "production",
  entry: "./index.tsx",
  output: {
    filename: "js/bundle.[contenthash].min.js",
    path: resolve(__dirname, "../../dist"),
    publicPath: "/",
  },
  devtool: "source-map",
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.module\.s(a|c)ss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: {
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
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" },
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
