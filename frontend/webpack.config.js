const {
  VueLoaderPlugin
} = require("vue-loader");

module.exports = {
  watch: true,
  context: __dirname,
  devtool: "source-map",
  entry: "./main.js",
  output: {
    path: __dirname + "/../backend/public",
    filename: "app.js"

  },
  plugins: [new VueLoaderPlugin()],
  module: {

    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            ts: 'ts-loader'
          },
          esModule: true
        },

      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      },
    ]
  }
};