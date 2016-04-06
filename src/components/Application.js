import React, { Component } from 'react'
import ParticipantView from './ParticipantView'
import Dashboard from './Dashboard'
import { LookRoot, Presets, StyleSheet } from 'react-look'

let styles
const lookConfig = Presets['react-dom']
lookConfig.styleElementId = 'react-styles'

export default class Application extends Component {
  state = {
    admin: false,
  }

  componentDidMount() {
    window.addEventListener('keyup', ({ keyCode }) => {
      if (keyCode === 65) {
        this.setState({
          admin: !this.state.admin,
        })
      }
    })
  }

  render() {
    return (
      <LookRoot config={lookConfig}>
        <main className={styles.main}>
          {
            this.state.admin
            ? <Dashboard />
            : <ParticipantView />
          }
        </main>
      </LookRoot>
    )
  }
}

styles = StyleSheet.create({
  main: {
    fontFamily: 'Lato',
    fontSize: '20px',
    color: '#242424',
    lineHeight: 1.8,
    letterSpacing: '0.01em',
    WebkitFontSmoothing: 'antialiased',
    WebkitTextSizeAdjust: '100%',

    '@media(max-width: 700px)': {
      fontSize: '18px',
    },
  },

})
