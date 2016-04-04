const webpack = require('webpack')
const path = require('path')

const production = process.env.NODE_ENV === 'production'
const devtool = production ? 'hidden-source-map' : 'eval-source-map'

const entry = {
  bundle: ['./src/client'],
}

const output = {
  path: path.join(__dirname, '/build'),
  filename: '[name].js',
  publicPath: '/',
  pathinfo: !production,
}

const loaders = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel',
    query: {
      cacheDirectory: false,
      plugins: ['transform-inline-environment-variables'],
      env: {
        development: {
          plugins: [['react-transform', {
            transforms: [
              {
                transform: 'react-transform-catch-errors',
                imports: ['react', 'redbox-react'],
              },
              {
                transform: 'react-transform-hmr',
                imports: ['react'],
                locals: ['module'],
              },
              // {
              //   // For debugging purposes
              //   transform: 'react-transform-render-visualizer',
              // },
            ],
          }]],
        },
      },
    },
  },
  {
    test: /\.json/,
    exclude: /node_modules/,
    loader: 'json',
  },
]

const plugins = [
  new webpack.PrefetchPlugin('react'),
]

if (production) {
  plugins.push(new webpack.optimize.DedupePlugin())
  plugins.push(new webpack.optimize.OccurenceOrderPlugin())
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    comments: false,
    compress: {
      warnings: false,
      drop_console: true,
      screw_ie8: true,
    },
  }))
}

const resolve = {
  modulesDirectories: ['node_modules', './src'],
  alias: {},
}

module.exports = {
  entry,
  output,
  devtool,
  plugins,
  module: {
    loaders,
  },
  resolve,
}
