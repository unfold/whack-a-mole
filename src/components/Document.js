import React from 'react'

const documentStyles = `
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  body {
    font-family: sans-serif;
    font-size: 100%;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  input,
  textarea,
  button {
    margin: 0;
    padding: 0;
    border: none;
    background-color: transparent;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    color: inherit;
    text-align: inherit;
    vertical-align: inherit;
    -webkit-font-smoothing: inherit;
    letter-spacing: inherit;
    overflow: visible;
    border-radius: 0;
    box-shadow: inherit;
  }

  button:not([disabled]) {
    cursor: pointer;
  }

  input[type="text"],
  input[type="email"],
  input[type="month"],
  input[type="week"],
  input[type="number"],
  input[type="password"],
  input[type="tel"],
  input[type="search"] {
    -webkit-appearance: none;
  }

  input[type="search"] {
     -moz-appearance:    textfield;
     -webkit-appearance: textfield;
     appearance: textfield;
  }

  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="search"]::-webkit-search-cancel-button{
    -webkit-appearance: none;
  }

  input[type="search"]::-webkit-search-decoration{
    display: none;
  }

  input::-ms-clear {
      display: none;
  }

  /* IE11 does not recognise main element */
  main {
    display: block;
  }
`

export default function Document({ styles, children }) {
  return (
    <html>
      <head>
        <title>Whack a mole</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style dangerouslySetInnerHTML={{ __html: documentStyles }} />
        <style id="react-styles" dangerouslySetInnerHTML={{ __html: styles }} />
        <link href="https://fonts.googleapis.com/css?family=Lato:300,400" rel="stylesheet" type="text/css" />
      </head>

      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: children }} />
        <script src="/bundle.js"></script>
      </body>
    </html>
  )
}
