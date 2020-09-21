const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WebpackPwaManifest = require("webpack-pwa-manifest");

module.exports =  {
  entry: {
    app: './assets/js/script.js',
    events: './assets/js/events.js',
    schedule: './assets/js/schedule.js',
    tickets: './assets/js/tickets'
  },
  // output: {
      // path.resolve(__dirname, '<dir/file>') resolves an absolute path to the <dir/file> from whatever the current directory (__dirname) is on any given machine the script is being run so the path does not have to be hard-coded.  Every Node script has __dirname loaded by default 
  //   path: path.resolve(__dirname, 'dist'),
  //   filename: 'main.bundle.js'
  // },
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/dist'
  },
  // loaders
  module: {
    rules: [
      {
        test: /\.jpg$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name (file) {
                return '[path][name].[ext]'
              },
              publicPath: function(url) {
                return url.replace('../', '/assets/')
              }
            }
          },
          {
            loader: 'image-webpack-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static', // the report outputs to an HTML file in the dist folder
    }),
    new WebpackPwaManifest({
      name: "Food Event", 
      short_name: "Foodies",
      description: "An app that allows you to view upcoming food events.",
      background_color: "#01579b",
      theme_color: "#ffffff",
      fingerprints: false,
      inject: false,
      icons: [{
        src: path.resolve("assets/img/icons/icon-512x512.png"),
        sizes: [96, 128, 192, 256, 384, 512],
        destination: path.join("assets", "icons")
      }]
    })
  ],
  mode: 'development'
};
