import '../utils/ensure-fastclick'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-firebase'
import Firebase from 'firebase'
import Application from '../components/Application'

const firebaseUrl = 'https://unfold-whack-a-mole.firebaseio.com/'
const firebaseRef = new Firebase(firebaseUrl)

console.info(`View your data at: ${firebaseUrl}`) // eslint-disable-line no-console

render(
  <Provider firebase={firebaseRef}>
    <Application />
  </Provider>,
  document.getElementById('root')
)
