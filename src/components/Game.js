import React, { Component, PropTypes } from 'react'
import times from 'lodash/times'
import { connect } from 'react-firebase'
import loader from '../decorators/loader'
import AvatarIcon from './AvatarIcon'
import Hole from './Hole'
import WinnerOverlay from './WinnerOverlay'

const NUMBER_OF_HOLES = 6
const SWITCH_TIMER = 1500

@connect(props => ({
  participant: `participants/${props.participantId}`,
  winner: 'status/winner',
  gameStarted: 'status/gameStarted',
}), (firebase, props) => ({
  incrementScore: () => {
    firebase
      .child('participants').child(props.participantId).child('score')
      .transaction(score => score + 1)
  },
}))

@loader()

export default class Game extends Component {
  static propTypes = {
    participantId: PropTypes.string.isRequired,
    participant: PropTypes.object.isRequired,
    winner: PropTypes.any,
  }

  constructor(props) {
    super(props)

    this.onWhack = ::this.onWhack
    this.setNewMoleHole = ::this.setNewMoleHole

    this.state = {
      moleInHole: null,
    }

    this.allowInteraction = !this.props.winner && this.props.gameStarted

    if (this.allowInteraction) {
      this.setNewMoleHole()
    }
  }

  componentDidMount() {
    this.setNewMoleHole()
  }

  componentWillUpdate(nextProps) {
    this.allowInteraction = !nextProps.winner && nextProps.gameStarted
  }

  componentDidUpdate() {
    if (this.props.gameStarted && !this.switchMoleHoleTimeout) {
      this.setNewMoleHole()
    }
  }

  componentWillUnmount() {
    clearTimeout(this.switchMoleHoleTimeout)
  }

  onWhack(holeNumber) {
    const correctHole = this.state.moleInHole === holeNumber

    if (correctHole && this.allowInteraction) {
      this.props.incrementScore()
      this.setNewMoleHole()
    }
  }

  setNewMoleHole() {
    const newMoleInHole = Math.floor(Math.random() * NUMBER_OF_HOLES)
    clearTimeout(this.switchMoleHoleTimeout)

    if (this.allowInteraction) {
      if (newMoleInHole === this.state.moleInHole) {
        return this.setNewMoleHole()
      }

      this.setState({
        moleInHole: newMoleInHole,
      })

      this.switchMoleHoleTimeout = setTimeout(this.setNewMoleHole, SWITCH_TIMER)
    }
  }


  render() {
    const holes = times(NUMBER_OF_HOLES, nth => (
      <Hole
        key={nth}
        number={nth}
        hasMole={nth === this.state.moleInHole && this.allowInteraction}
        onWhack={this.onWhack}
      />
    ))

    const { score, avatar } = this.props.participant

    return (
      <div>
        { this.props.winner &&
          <WinnerOverlay
            winner={this.props.winnerId}
            participantWon={this.props.participantId === this.props.winner.id}
          />
        }

        <button onClick={this.props.incrementScore}>Increment score</button>
        <div>
          <AvatarIcon id={avatar} />
          Score: {score}
        </div>
        <div>
          {holes}
        </div>
      </div>
    )
  }
}
