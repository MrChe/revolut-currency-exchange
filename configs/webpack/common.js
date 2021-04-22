// shared config (dev and prod)
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const packageJSON = require("../../package.json");

module.exports = {
  context: resolve(__dirname, "../../src"),
  entry: "./index.tsx",
  output: {
    path: resolve(__dirname, "../../dist"),
    pathinfo: true,
    publicPath: "/",
    globalObject: "this",
  },
  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.tsx?$/],
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          "file-loader?hash=sha512&digest=hex&name=img/[contenthash].[ext]",
          "image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false",
        ],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: ["url-loader?limit=100000"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      filename: "index.html",
      template: "index.html.ejs",
      version: packageJSON.version,
      meta: {
        version: packageJSON.version,
      },
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  performance: {
    hints: false,
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".scss"],
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
};
