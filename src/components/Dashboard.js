import React, { Component, PropTypes } from 'react'
import map from 'lodash/map'
import findKey from 'lodash/findKey'
import { connect } from 'react-firebase'
import mapValues from 'lodash/mapValues'
import loader from '../decorators/loader'
import analytics from '../utils/analytics'

const GOAL = 20

@connect(() => ({
  participants: 'participants',
  gameStarted: 'status/startGame',
}), firebase => ({
  announceWinner: winner => firebase.child('status').child('winner').set(winner),
  startGame: () => firebase.child('status').child('gameStarted').set(true),
  resetGame: () => {
    firebase.child('status').set({
      gameStarted: false,
      winner: null,
    })
    firebase.child('participants').once('value', snapshot => {
      const updated = mapValues(snapshot.val(), participant => ({
        ...participant,
        score: 0,
      }))

      snapshot.ref().set(updated)
    })
  },
}))

@loader()

export default class Dashboard extends Component {
  static propTypes = {
    announceWinner: PropTypes.func.isRequired,
    resetGame: PropTypes.func.isRequired,
    startGame: PropTypes.func.isRequired,
    gameStarted: PropTypes.func,
    participants: PropTypes.object,
  }

  componentDidMount() {
    analytics.page('Dashboard')
  }

  componentWillUpdate(nextProps) {
    const winnerId = findKey(nextProps.participants, participant => participant.score >= GOAL)
    const winner = winnerId && this.props.participants[winnerId]

    if (winner) {
      this.props.announceWinner({
        id: winnerId,
        ...winner,
      })
    }
  }

  render() {
    const participants = map(this.props.participants, (participant, id) => (
      <div key={id}>
        <div>{participant.avatar}</div>
        <div>Score: {participant.score}</div>
      </div>
    ))


    return (
      <div>
        <button onClick={this.props.resetGame} type="button">RESET</button>
        { !this.props.gameStarted &&
          <button onClick={this.props.startGame} type="button">START GAME</button>
        }
        {participants}
      </div>
    )
  }
}
