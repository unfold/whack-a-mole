import React, { Component, PropTypes } from 'react'
import map from 'lodash/map'
import findKey from 'lodash/findKey'
import { connect } from 'react-firebase'
import mapValues from 'lodash/mapValues'

const GOAL = 5

@connect(() => ({
  participants: 'participants',
}), firebase => ({
  announceWinner: winner => firebase.child('status').child('winner').set(winner),
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

export default class Dashboard extends Component {
  static propTypes = {
    announceWinner: PropTypes.func.isRequired,
    resetGame: PropTypes.func.isRequired,
    participants: PropTypes.object,
  }

  componentDidUpdate() {
    const winnerId = findKey(this.props.participants, participant => participant.score >= GOAL)
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
        {participants}
      </div>
    )
  }
}
