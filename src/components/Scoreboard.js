import React, { Component, PropTypes } from 'react'
import mapValues from 'lodash/mapValues'
import DashboardHeader from './DashboardHeader'
import { connect } from 'react-firebase'
import findKey from 'lodash/findKey'
import Button from './Button'

const GOAL = 20

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
export default class Lounge extends Component {
  static propTypes = {
    participants: PropTypes.object.isRequired,
    announceWinner: PropTypes.func.isRequired,
    resetGame: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
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
    return (
      <div>
        <DashboardHeader>
          Scoreboard
        </DashboardHeader>
        <Button onClick={this.props.resetGame}>Restart game</Button>
      </div>
    )
  }
}
