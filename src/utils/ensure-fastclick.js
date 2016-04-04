if ('touchAction' in document.body.style) {
  document.body.style.touchAction = 'manipulation'
} else {
  require.ensure(['fastclick'], (require) => {
    const FastClick = require('fastclick')

    window.addEventListener('load', () => {
      FastClick.attach(document.body)
    })
  }, 'fastclick')
}
