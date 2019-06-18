const path = require("path")
const webpack = require("webpack")

module.exports = {
  webpack: {
    mode: "production",
    entry: {
      a: "./src/index1",
      b: "./src/index2"
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      alias: {
        react: path.resolve(__dirname, "shims/react.js"),
        "react-native": path.resolve(__dirname, "shims/react-native.js")
      },
      extensions: [".tsx", ".ts", ".js", ".android.js"]
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist")
    },
    optimization: {
      minimize: false
    },
    plugins: [
      new webpack.DefinePlugin({
        __DEV__: process.env.NODE_ENV === "development",
        "process.env": {
          NODE_ENV: JSON.stringify("development"),
          PLATFORM_ENV: JSON.stringify("web")
        }
      })
    ],
    target: "webworker"
  }
}
