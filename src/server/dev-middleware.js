import webpack from 'webpack'
import webpackConfig from '../../webpack.config'
import devMiddleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'
import mapValues from 'lodash/mapValues'

export default ({ url }) => {
  const compiler = webpack({
    ...webpackConfig,
    plugins: [
      ...webpackConfig.plugins,
      new webpack.HotModuleReplacementPlugin(),
    ],
    entry: mapValues(webpackConfig.entry, entries => (
      [...entries, 'webpack-hot-middleware/client?noInfo=true']
    )),
  })

  return [
    devMiddleware(compiler, {
      noInfo: true,
      basePath: url,
      stats: {
        colors: true,
      },
    }),

    hotMiddleware(compiler),
  ]
}
