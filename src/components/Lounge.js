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
            <svg className={styles.unfoldLogo} viewBox="0 0 142 23" xmlns="http://www.w3.org/2000/svg">
              <path d="M32.022 1.054c-.003-.129.061-.313.362-.318l6.194-.008c.325 0 .325 0 .325.275l.013 7.922s8.315-5.438 13.871-8.691c.461-.248.427-.061.433.311l.034 20.917c.004.313.003.374-.361.376l-6.259.012c-.326.003-.295-.034-.295-.378l-.013-7.883s-8.741 5.686-13.908 8.781c-.227.151-.363.152-.362-.185-.012-8.278-.019-11.725-.036-21.131zM55.315 21.85c-.298 0-.33.03-.33-.435-.009-5.928-.022-13.405-.032-20.26-.005-.406-.003-.438.33-.441l15.885-.027c.291 0 .256.064.258.312.005 1.372.01 3.401.008 4.611 0 .253.032.28-.259.284l-8.552.014.044 4.083 7.667-.011c.256-.001.226.124.226.369 0 1.31.004 3.665.008 5.133.003.28.031.309-.26.312l-7.675.012s.011 3.318.012 5.591c.003.345-.031.435-.295.435l-7.037.016zM95.296 11.278c.008 6.604-5.652 11.262-12.009 11.271-7.009.011-12.031-4.904-12.041-11.264-.008-6.7 5.456-11.262 12.007-11.274 6.261-.008 12.031 4.315 12.044 11.266zm-16.184-.04c0 2.591 1.707 4.084 4.165 4.08 2.362-.006 4.161-1.571 4.153-4.091-.001-2.397-1.642-3.893-4.166-3.889-2.556.005-4.156 1.627-4.152 3.9zM112.345 21.471c.001.248-.028.28-.325.28l-15.328.025c-.33.003-.335.035-.338-.277 0-3.865-.01-7.046-.014-10.258l-.02-10.32c0-.31 0-.278.328-.28l6.981-.012c.295.004.326.032.326.282.005 2.432.022 15.061.022 15.061l7.998-.016c.296 0 .36.059.362.312l.007 5.203zM134.245 8.05c-.983-4.869-4.489-7.465-10.799-7.452l-9.595.015c-.297.001-.327.065-.326.31.014 7.919.021 12.629.037 20.547-.002.312.033.275.322.274l8.784-.012c3.682-.005 6.205-.891 8.45-2.227l10.203-6.472-.014-9.537-7.062 4.554zm-11.727 7.823l-1.503.005-.013-9.414 1.572-.005c2.326-.007 4.095 1.211 4.106 4.608.005 3.643-1.964 4.802-4.162 4.806zM.36 6.723l.016 9.514 9.095-5.813.005 3.747c.004 4.795 3.847 8.532 10.272 8.52 7.066-.015 10.767-3.229 10.758-8.248l-.023-13.464c0-.219 0-.219-.164-.222l-7.108.01c-.229 0-.232.035-.229.224l.02 12.092c.004 2.149-1.011 2.995-2.747 2.996-1.77.004-2.751-.864-2.761-2.984l-.018-12.066c0-.251-.227-.251-.227-.251l-7.645.015-9.245 5.929z" />
            </svg>
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
              <Button
                className={styles.button}
                onClick={this.props.simulatePlayers}
              >Simulate players</Button>
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
