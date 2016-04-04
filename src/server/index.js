/* eslint-disable no-console */
import express from 'express'
import compression from 'compression'

import devMiddleware from './dev-middleware'
import renderStatic from './render-static'

const {
  HOSTNAME = 'localhost',
  PORT = '5050',
  NODE_ENV,
} = process.env

const production = NODE_ENV === 'production'
const url = `http://${ HOSTNAME }:${ PORT }`

const app = express()

if (!production) {
  app.use(devMiddleware({ url }))
}

app.use(compression())

app.use(renderStatic())
app.use(express.static('public'))
app.use(express.static('build'))

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(500).json({
    name: err.name,
    message: err.message,
  })

  throw err
})

app.listen(PORT, error => {
  if (error) {
    console.log('error', error)
  }

  console.log(`Serving at: \u001b[4m${ url }\n\u001b[0m`)
})
