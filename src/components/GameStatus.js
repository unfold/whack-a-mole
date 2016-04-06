import React, { Component, PropTypes } from 'react'
import AvatarIcon from './AvatarIcon'
import { StyleSheet } from 'react-look'
import cssEase from 'css-ease'

import { GOAL } from '../constants'

let styles

export default class GameStatus extends Component {
  static propTypes = {
    score: PropTypes.number.isRequired,
    avatar: PropTypes.string.isRequired,
    countdown: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    gameStarted: PropTypes.bool,
  }

  getCountdown() {
    if (!this.props.gameStarted) {
      return 'Starting soon'
    }

    return this.props.countdown
  }

  render() {
    const { score, avatar, countdown } = this.props
    const countdownMessage = this.getCountdown()

    return (
      <div className={styles.gameStatus}>
        <AvatarIcon className={styles.avatar} id={avatar} />
        {countdownMessage
          ? <div className={styles.countdown}>{countdownMessage}</div>
          : (
            <div className={styles.progressTrack}>
              <div
                className={styles.progress}
                style={{
                  width: `${score / GOAL * 100}%`,
                }}
              />
            </div>
          )
        }
      </div>
    )
  }
}

styles = StyleSheet.create({
  gameStatus: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '7em',
    padding: '0 3em',
    maxWidth: '30em',
    flexGrow: 1,
    flexShrink: 0,
  },

  countdown: {
    fontSize: '1.6em',
    fontWeight: 300,
    textAlign: 'center',
  },

  avatar: {
    width: '2em',
    height: '2em',
    marginBottom: '.5em',
  },

  progressTrack: {
    marginTop: '1em',
    position: 'relative',
    background: '#F2F2F2',
    height: '1px',
    width: '100%',
  },

  progress: {
    height: '3px',
    marginTop: '-1px',
    backgroundImage: 'linear-gradient(90deg, #FF009A 2%, #FE0061 100%)',
    transition: `width .4s ${cssEase['ease-out-expo']}`,
  },

})
