import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import Document from '../components/Document'

export default () => (req, res, next) => {
  if (!/\/[^.]*$/.test(req.url)) {
    return next()
  }

  const markup = renderToStaticMarkup(<Document />)
  res.send(`<!doctype html>${markup}`)
}
