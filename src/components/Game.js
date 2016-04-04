import React, { Component, PropTypes } from 'react'
import times from 'lodash/times'
import { connect } from 'react-firebase'
import Hole from './Hole'
import WinnerOverlay from './WinnerOverlay'

const NUMBER_OF_HOLES = 6
const SWITCH_TIMER = 1500

@connect(props => ({
  score: `participants/${props.participantId}/score`,
  winner: 'status/winner',
}), (firebase, props) => ({
  incrementScore: () => {
    firebase
      .child('participants').child(props.participantId).child('score')
      .transaction(score => score + 1)
  },
}))

export default class Game extends Component {
  static propTypes = {
    participantId: PropTypes.string.isRequired,
    score: PropTypes.number,
    winner: PropTypes.any,
  }

  constructor(props) {
    super(props)

    this.setNewMoleHole = ::this.setNewMoleHole
    this.onWhack = ::this.onWhack

    this.state = {
      moleInHole: null,
    }
  }

  componentDidMount() {
    this.setNewMoleHole()
  }

  componentWillUnmount() {
    clearTimeout(this.switchMoleHoleTimeout)
  }

  onWhack(holeNumber) {
    if (this.state.moleInHole === holeNumber && !this.props.winner) {
      this.props.incrementScore()
      this.setNewMoleHole()
    }
  }

  setNewMoleHole() {
    const newMoleInHole = Math.floor(Math.random() * NUMBER_OF_HOLES)
    clearTimeout(this.switchMoleHoleTimeout)

    if (newMoleInHole === this.state.moleInHole) {
      return this.setNewMoleHole()
    }

    this.setState({
      moleInHole: newMoleInHole,
    })

    this.switchMoleHoleTimeout = setTimeout(this.setNewMoleHole, SWITCH_TIMER)
  }


  render() {
    const holes = times(NUMBER_OF_HOLES, nth => (
      <Hole
        key={nth}
        number={nth}
        hasMole={nth === this.state.moleInHole}
        onWhack={this.onWhack}
      />
    ))

    return (
      <div>
        { this.props.winner &&
          <WinnerOverlay
            winner={this.props.winnerId}
            participantWon={this.props.participantId === this.props.winner.id}
          />
        }

        <button onClick={this.props.incrementScore}>Increment score</button>
        Score: {this.props.score}
        <div>
          {holes}
        </div>
      </div>
    )
  }
}
