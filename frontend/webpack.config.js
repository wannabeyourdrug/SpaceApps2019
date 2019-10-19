module.exports = {
    context: __dirname,
    devtool: "source-map",
    entry: "./index.js",
    output: {
      path: __dirname + "/../backend/public",
      filename: "app.js"
      
    },
    module:{
        loaders: [
          {test : /\.css$/, loader: 'style!css!'}
        ]
    }
  }