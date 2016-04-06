import React, { Component, PropTypes } from 'react'
import { connect } from 'react-firebase'
import { StyleSheet } from 'react-look'
import DashboardHeader from './DashboardHeader'
import Button from './Button'
import size from 'lodash/size'
import { avatars } from './AvatarIcon'
import map from 'lodash/map'
import FillViewportHeight from './FillViewportHeight'
import AvatarIcon from './AvatarIcon'
import sample from 'lodash/sample'
import random from 'lodash/random'
import CSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'
import cssEase from 'css-ease'
import { GOAL } from '../constants'

let styles

@connect(null, firebase => ({
  startGame: () => firebase.child('status').child('gameStarted').set(true),
  simulatePlayers: () => {
    for (let i = 0; i < random(2, 80); i++) {
      const ref = firebase.child('participants').push({
        avatar: sample(avatars.keys()),
        score: random(0, GOAL),
      })
      ref.onDisconnect().remove()
    }
  },
}))
export default class Lounge extends Component {
  static propTypes = {
    participants: PropTypes.object,
    startGame: PropTypes.func.isRequired,
    simulatePlayers: PropTypes.func,
  }

  constructor(props) {
    super(props)
  }

  render() {
    const participantsCount = size(this.props.participants)

    return (
      <FillViewportHeight>
        <div className={styles.lounge}>
          <DashboardHeader>
            {location.origin.replace(/http:\/\//, '')}
          </DashboardHeader>

          <div className={styles.body}>
            <div className={styles.title}>
              {participantsCount
                ? `${participantsCount} people joined`
                : `None has joined yet`
              }
            </div>

            <CSSTransitionGroup
              className={styles.list}
              component="div"
              transitionName={{
                enter: styles.avatarEnter,
                enterActive: styles.avatarEnterActive,
                leave: styles.avatarLeave,
                leaveActive: styles.avatarLeaveActive,
              }}
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={1000}
            >
              {map(this.props.participants, (participant, key) => (
                <AvatarIcon
                  className={styles.avatar}
                  key={key}
                  id={participant.avatar}
                />
              ))}
            </CSSTransitionGroup>

            <div className={styles.buttonOverlay}>
              <Button
                className={styles.button}
                onClick={this.props.startGame}
              >Start game</Button>
              { process.env.NODE_ENV !== 'production' &&
                <Button
                  className={styles.button}
                  onClick={this.props.simulatePlayers}
                >Simulate players</Button>
              }
            </div>
          </div>
        </div>
      </FillViewportHeight>
    )
  }
}

styles = StyleSheet.create({
  body: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },

  unfoldLogo: {
    fill: '#FD0042',
    display: 'block',
    width: '6.2em',
    margin: 'auto',
  },

  title: {
    margin: '2em 0 .5em',
    textAlign: 'center',
    fontSize: '1.4em',
  },

  list: {
    flexGrow: 1,
    maxWidth: '40em',
    overflow: 'scroll',
    marginBottom: '6em',
  },

  avatar: {
    margin: '1em',
    width: '3em',
    height: '3em',
  },

  avatarEnter: {
    transform: 'scale(0.5)',
    opacity: 0,
  },

  avatarEnterActive: {
    transition: `.3s ${cssEase['ease-out-back']}`,
    transform: 'none',
    opacity: 1,
  },

  avatarLeave: {},

  avatarLeaveActive: {
    transition: `.3s ${cssEase['ease-in-cubic']}`,
    opacity: 0,
    transform: 'scale(0.5)',
  },

  button: {
    margin: '0 .5em',
  },

  buttonOverlay: {
    padding: '3em 0 2em',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    position: 'fixed',
    bottom: 0,
    backgroundImage: 'linear-gradient(-180deg, rgba(255,255,255,0.00) 0%, #FFFFFF 50%)',
  },
})
