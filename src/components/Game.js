import React, { Component, PropTypes } from 'react'
import { connect } from 'react-firebase'
import loader from '../decorators/loader'
import WinnerOverlay from './WinnerOverlay'
import AvatarIcon from './AvatarIcon'
import Holes from './Holes'
import look, { StyleSheet } from 'react-look'
import FillViewportHeight from './FillViewportHeight'

let styles

@connect(props => ({
  participant: `participants/${props.participantId}`,
  winner: 'status/winner',
  gameStarted: 'status/gameStarted',
}), (firebase, props) => ({
  incrementScore: () => {
    firebase
      .child(`participants/${props.participantId}/score`)
      .transaction(score => score + 1)
  },
}))

@loader()

@look
export default class Game extends Component {
  static propTypes = {
    participantId: PropTypes.string.isRequired,
    participant: PropTypes.object.isRequired,
    winner: PropTypes.any,
  }

  constructor(props) {
    super(props)
    this.onWhackCorrectHole = ::this.onWhackCorrectHole

    this.state = {
      countdown: null,
    }
  }

  componentWillUpdate(nextProps) {
    if (!this.props.gameStarted && nextProps.gameStarted) {
      this.onStartDowndown()
    }
  }

  onStartDowndown() {
    this.setState({ countdown: 'Get ready' })
    setTimeout(() =>
      this.setState({ countdown: '3' })
    , 2000)
    setTimeout(() =>
      this.setState({ countdown: '2' })
    , 3000)
    setTimeout(() =>
      this.setState({ countdown: '1' })
    , 4000)
    setTimeout(() =>
      this.setState({ countdown: null })
    , 5000)
  }

  onWhackCorrectHole() {
    if (!this.props.winner && this.props.gameStarted) {
      this.props.incrementScore()
    }
  }

  renderMessageboard() {
    const { score, avatar } = this.props.participant
    let label = this.state.countdown

    if (!this.props.gameStarted) {
      label = 'Waiting for presenter to start game'
    }

    if (!label && this.state.gameStarted) {
      label = 'GO!'
    }

    return (
      <div className={styles.messageBoard}>
        { (label)
          ? <div className={styles.label}>{label}</div>
          : (
            <div>
              <div className={styles.avatar}>
                <AvatarIcon id={avatar} />
              </div>
              <div className={styles.score}>
                {score}
              </div>
            </div>
            )
        }
      </div>
    )
  }

  render() {
    return (
      <FillViewportHeight>
        <div className={styles.game}>
          { this.props.winner &&
            <WinnerOverlay
              winner={this.props.winnerId}
              participantWon={this.props.participantId === this.props.winner.id}
            />
          }

          {this.renderMessageboard()}

          <Holes
            hibernating={!this.props.gameStarted || !!this.state.countdown}
            isRunning={!this.props.winner}
            onWhackCorrectHole={this.onWhackCorrectHole}
          />
        </div>
      </FillViewportHeight>
    )
  }
}

styles = StyleSheet.create({
  game: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '1em',
  },

  messageBoard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: '0 1.5em',
    maxWidth: '30em',
    flexGrow: 1,
    flexShrink: 0,

  },

  avatar: {
    fontSize: '2em',
  },

  label: {
    fontSize: '1.6em',
    fontWeight: 300,
    textAlign: 'center',
    margin: '.8em 0',
  },

  score: {
    fontSize: '1.6em',
    fontWeight: 300,
    textAlign: 'center',
  },
})
