const path = require("path");

module.exports = {
  entry: "./src/index",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, "/src"), "node_modules/"],
    descriptionFiles: ["package.json"],
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
};

//https://webpack.js.org/guides/typescript/
