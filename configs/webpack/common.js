// shared config (dev and prod)
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  context: resolve(__dirname, "../../src"),
  entry: "./index.tsx",
  output: {
    filename: "js/bundle.[hash].min.js",
    pathinfo: true,
    path: resolve(__dirname, "../../dist"),
    publicPath: "/",
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
  plugins: [new HtmlWebpackPlugin({ template: "index.html.ejs" })],
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
