import React, { Component, PropTypes } from 'react'
import { connect } from 'react-firebase'
import loader from '../decorators/loader'
import Holes from './Holes'
import look, { StyleSheet } from 'react-look'
import FillViewportHeight from './FillViewportHeight'
import analytics from '../utils/analytics'
import GameStatus from './GameStatus'
import ResultScreen from './ResultScreen'

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

  componentDidMount() {
    analytics.page('Game')
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
      this.setState({ countdown: 'GO!' })
    , 5000)
    setTimeout(() =>
      this.setState({ countdown: null })
    , 6000)
  }

  onWhackCorrectHole() {
    if (!this.props.winner && this.props.gameStarted) {
      this.props.incrementScore()
    }
  }

  render() {
    return (
      <FillViewportHeight>
        <div className={styles.game}>
          <GameStatus
            gameStarted={this.props.gameStarted}
            countdown={this.state.countdown}
            avatar={this.props.participant.avatar}
            score={this.props.participant.score}
          />

          { this.props.winner
            ? <ResultScreen
              winner={this.props.winner}
              participantWon={this.props.participantId === this.props.winner.id}
            />
            : <Holes
              hibernating={!this.props.gameStarted || !!this.state.countdown}
              isRunning={!this.props.winner}
              onWhackCorrectHole={this.onWhackCorrectHole}
            />
          }
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
