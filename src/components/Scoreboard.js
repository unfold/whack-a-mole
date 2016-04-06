import React, { Component, PropTypes } from 'react'
import mapValues from 'lodash/mapValues'
import { StyleSheet } from 'react-look'
import DashboardHeader from './DashboardHeader'
import { connect } from 'react-firebase'
import findKey from 'lodash/findKey'
import Button from './Button'
import ScoreboardList from './ScoreboardList'
import ResultScreen from './ResultScreen'

let styles

import { GOAL } from '../constants'

@connect(() => ({
  winner: 'status/winner',
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
    winner: PropTypes.object,
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
        { this.props.winner &&
          <ResultScreen
            winner={this.props.winner}
            isDashboard
          />
        }
        <ScoreboardList participants={this.props.participants} />
        <div className={styles.buttonWrapper}>
          <Button onClick={this.props.resetGame}>Restart</Button>
        </div>
      </div>
    )
  }
}

styles = StyleSheet.create({
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    margin: '2em 0',
  },
})
