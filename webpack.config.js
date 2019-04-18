var path = require("path");
var htmlPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: ["./src/index"],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },

  plugins: [
    new htmlPlugin({
      template: "./public/index.html"
    })
  ],

  module: {
    rules: [
      {
        use: ["style-loader", "css-loader"],
        test: /\.css$/
      },
      {
        use: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
};
