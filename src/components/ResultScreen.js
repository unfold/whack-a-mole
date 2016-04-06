import React, { Component, PropTypes } from 'react'
import { StyleSheet } from 'react-look'
import WinSVG from '../assets/win.svg'
import AvatarIcon from './AvatarIcon'

import sample from 'lodash/sample'

const sadGifs = [
  'http://i.giphy.com/oEXFlyrPRBOE0.gif',
  'http://i.giphy.com/yoJC2KnYJqPdUU3sPe.gif',
]

let styles

export default class ResultScreen extends Component {
  static propTypes = {
    winner: PropTypes.object.isRequired,
    participantWon: PropTypes.bool,
  }

  renderWinningScreen() {
    return (
      <div className={styles.screen}>
        <div className={styles.avatarWrapper}>
          <WinSVG className={styles.winnerSVG} />
          <AvatarIcon className={styles.avatar} id={this.props.winner.avatar} />
        </div>
        <div className={styles.winnerTitle}>Winner!</div>
      </div>
    )
  }

  renderLoserScreen() {
    return (
      <div className={styles.screen}>
        <image className={styles.gif} src={sample(sadGifs)} />
        <div className={styles.loserTitle}>Loser!</div>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.container}>
        {this.props.participantWon
          ? this.renderWinningScreen()
          : this.renderLoserScreen()
        }
      </div>
    )
  }
}

styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },

  screen: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },

  winnerTitle: {
    marginTop: '.4em',
    textAlign: 'center',
    fontSize: '2em',
    fontWeight: 700,
    color: '#FE0058',
  },

  avatarWrapper: {
    margin: '0 4em',
    position: 'relative',
  },

  avatar: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-4em',
    marginLeft: '-4em',
    width: '8em',
    height: '8em',
  },

  winnerSVG: {
    transform: 'rotateZ(20deg)',
    width: '100%',
  },

  gif: {
    maxWidth: '100%',
    flexGrow: 1,
  },

  loserTitle: {
    marginTop: '.4em',
    textAlign: 'center',
    fontSize: '2em',
    fontWeight: 700,
    color: '#333',
  },
})
